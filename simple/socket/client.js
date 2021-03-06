const port = process.argv[2] || 8080;
const socket = require('socket.io-client')(`http://localhost:${port}`);
const sieve = require(`../common/sieve`);

socket.on('connect', function () {
  console.log('connection');
});

socket.on('calculate', async (start, end) => {
  console.log('data', start, end);
  const list = await sieve(start, end);
  socket.emit('results', list);
  socket.disconnect();
})