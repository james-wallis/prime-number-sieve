const port = process.argv[2] || 8080;
const socket = require('socket.io-client')(`http://localhost:${port}`);
const sieve = require(`./sieve.js`);

socket.on('connect', function () {
  console.log('connection');
});

socket.on('calculate', async (rootPrimes, start, end) => {
  console.log('data', start, end);
  console.log(start, end);
  const list = await sieve(rootPrimes, start, end);
  // console.log(list);
  socket.emit('results', list)
  socket.disconnect();
})