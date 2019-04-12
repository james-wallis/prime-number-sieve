const server = require('http').createServer();
// Massive pingInterval and Timeout so the socket 
// client doesn't disconnect while doing calculations
const io = require('socket.io')(server, {
  pingInterval: 10000000,
  pingTimeout: 50000000,
});
const port = process.argv[2] || 8080;
const createWorker = require('../../utilities/createWorker')
const primes = require('./primes')
const orderArray = require('../../utilities/orderArray')

const { endNumber, worker } = require('../../config');

let primeNumberList = [];
let rootPrimes = [];

const main = async (n, noClients) => {
  console.log('Eratosthenes Sieve: Web Sockets');
  console.time('Eratosthenes Sieve - Web Sockets (Full program)');
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
      if (primeNumberList.length === noClients) sortPrimeNumberList(n);
    })
  });
}

const createClients = async (noClients) => {
  const promises = [];
  for (let i = 0; i < noClients; i++) {
    // showSocketProcessLogs
    promises.push(createWorker('node', ['./worker.js', port], __dirname, worker.logs));
  }
  Promise.all(promises);
}

const startPrimeCalculation = (n, clients, noClients) => {
  console.time('Eratosthenes Sieve - Web Sockets (Calculations only)');
  const split = Math.round(n / noClients);

  let sqRoot = Math.floor(Math.sqrt(n));
  if (sqRoot % 2 == 0) sqRoot = sqRoot + 1;

  // Get the first few primes to be used in the calculations
  rootPrimes = primes(sqRoot);

  // Instruct workers to begin calculations and send variables
  for (var ctr = 0; ctr < noClients; ctr++) {
    let start = (ctr == 0) ? (sqRoot + 2) : (ctr * split + 1);
    // Ensure start number is odd
    if (start % 2 == 0) start += 1;
    const end = (ctr + 1) * split;
    // Send start and end to worker so it can begin calculation
    io.to(clients[ctr]).emit('calculate', rootPrimes, start, end)
  }
}

const sortPrimeNumberList = (n) => {
  // Ensure array is in the correct order
  primeNumberList = orderArray(primeNumberList);
  // Create the first list of primes
  let sqRoot = Math.floor(Math.sqrt(n));
  if (sqRoot % 2 == 0) sqRoot = sqRoot + 1;
  // Create the final list, adding 2 to the front
  primeNumberList = [2].concat(rootPrimes.concat(primeNumberList));
  console.log(primeNumberList);
  console.log('Number of Primes: ', primeNumberList.length);
  console.timeEnd('Eratosthenes Sieve - Web Sockets (Calculations only)');
  console.timeEnd('Eratosthenes Sieve - Web Sockets (Full program)');
  server.close();
}

// prime number, number of socket clients
main(endNumber, worker.number);

