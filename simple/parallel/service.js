const { workerData, parentPort } = require('worker_threads');
const sieve = require(`../common/sieve`);

// You can do any heavy stuff here, in a synchronous way
// without blocking the "main thread"
const service = async () => {
  const { start, end } = workerData;
  const list = await sieve(start, end);
  parentPort.postMessage(list)
}

service();
