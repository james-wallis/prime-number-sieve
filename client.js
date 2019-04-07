const port = process.argv[2] || 8080;
const socket = require('socket.io-client')(`http://localhost:${port}`);
const getAllPrimeNumbers = require('./simple-prime-sieve')

// Incase something goes wrong to ensure the process finishes
let timeout = setTimeout(() => socket.disconnect(), 30000);

socket.on('connect', function () {
  console.log('connection');
});

socket.on('calculate', async (start, end) => {
  console.log('data', start, end);
  const list = await getAllPrimeNumbers(start, end);
  console.log(list);
  socket.emit('results', list)
  clearTimeout(timeout);
  socket.disconnect();
})