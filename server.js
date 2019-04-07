const server = require('http').createServer();
const io = require('socket.io')(server);
const port = process.argv[2] || 8080;
const createSocketClient = require('./createSocketClient')

const showSocketProcessLogs = false;

let primeNumberList = [];

const main = async (n, noClients) => {
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
      primeNumberList.push(data);
      if (primeNumberList.length === noClients) sortPrimeNumberList();
    })
  });
}

const createClients = async (noClients) => {
  const promises = [];
  for (let i = 0; i < noClients; i++) {
    promises.push(createSocketClient('node', ['client.js', port], showSocketProcessLogs));
  }
  Promise.all(promises);
}

const startPrimeCalculation = (n, clients, noClients) => {
  console.time('getAllPrimeNumbersWebSockets');
  let start = 2;
  let end = n / noClients;
  clients.forEach(client => {
    io.to(client).emit('calculate', start, end)
    start = end;
    end += n / noClients;
  });
}

const sortPrimeNumberList = () => {
  console.log('sortPrimeNumberList');
  let temp = primeNumberList[0];
  for (let i = 1; i < primeNumberList.length; i++) {
    if (temp[0] < primeNumberList[i][0]) temp = temp.concat(primeNumberList[i]);
    else temp = primeNumberList[i].concat(temp);
  }
  primeNumberList = temp;
  console.log(primeNumberList);
  console.timeEnd('getAllPrimeNumbersWebSockets'); 
}

// prime number, number of socket clients
main(10000000, 4);

