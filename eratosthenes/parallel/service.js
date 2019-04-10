const { workerData, parentPort } = require('worker_threads');
const sieve = require(`../socket/sieve`);

// You can do any heavy stuff here, in a synchronous way
// without blocking the "main thread"
const service = async () => {
  const { rootPrimes, start, end } = workerData;
  const list = await sieve(rootPrimes, start, end);
  parentPort.postMessage(list)
}

service();
