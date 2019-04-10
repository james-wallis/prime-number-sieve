const server = require('http').createServer();
// Massive pingInterval and Timeout so the socket 
// client doesn't disconnect while doing calculations
const io = require('socket.io')(server, {
  pingInterval: 10000000,
  pingTimeout: 50000000,
});
const port = process.argv[2] || 8080;
const createSocketClient = require('../../utilities/createWorker')
const orderArray = require('../../utilities/orderArray')

const { endNumber, worker } = require('../../config');

let primeNumberList = [];

const main = async (n, noClients) => {
  console.log('Simple Sieve: Sockets');
  console.time('Simple Sieve - Web Sockets (Full program)');
  createSocketEvents(n, noClients);
  server.listen(port);
  // Run client scripts to create socket.io-clients
  await createClients(noClients);
}

const createSocketEvents = (n, noClients) => {
  io.on('connection', socket => {
    console.log('socket connected');
    io.clients((error, clients) => {
      if (error) throw error;
      if (clients.length === noClients) startPrimeCalculation(n, clients, noClients);
    });

    socket.on('results', data => {
      console.log('result received')
      console.log(primeNumberList.length, noClients);
      primeNumberList.push(data);
      if (primeNumberList.length === noClients) sortPrimeNumberList();
    })
  });
}

const createClients = async (noClients) => {
  const promises = [];
  for (let i = 0; i < noClients; i++) {
    promises.push(createSocketClient('node', ['./client.js', port], __dirname, worker.logs));
  }
  Promise.all(promises);
}

const startPrimeCalculation = (n, clients, noClients) => {
  console.time('Simple Sieve - Web Sockets (Calculations only)')
  let start = 2;
  let end = Math.floor(n / noClients);
  clients.forEach(client => {
    io.to(client).emit('calculate', start, end)
    start = end;
    end += Math.floor(n / noClients);
  });
}

const sortPrimeNumberList = () => {
  console.log('sortPrimeNumberList');
  primeNumberList = orderArray(primeNumberList);
  console.log(primeNumberList);
  console.log('Number of Primes: ', primeNumberList.length);
  console.timeEnd('Simple Sieve - Web Sockets (Calculations only)')
  console.timeEnd('Simple Sieve - Web Sockets (Full program)')
  server.close();
}



// prime number, number of socket clients
main(endNumber, worker.number)

