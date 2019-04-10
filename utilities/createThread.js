const { Worker } = require('worker_threads')

const createThread = (threadFile, workerData) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(threadFile, { workerData });
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    })
  })
}

module.exports = createThread;