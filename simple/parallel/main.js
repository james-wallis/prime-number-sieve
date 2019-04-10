const createThread = require('../../utilities/createThread');
const orderArray = require('../../utilities/orderArray');
const { endNumber, worker } = require('../../config');

const main = async (n, noClients) =>  {
  console.log('Simple Sieve: Parallel');
  console.time('Simple Sieve - Parallel');
  const promises = [];
  let start = 2;
  let end = Math.floor(n / noClients);
  for (let i = 0; i < noClients; i++) {
    promises.push(createThread(`${__dirname}/service.js`, { start: start, end: end }));
    start = end;
    end += Math.floor(n / noClients);
  }
  const result = await Promise.all(promises);
  const primeNumberList = orderArray(result);
  
  console.log('\n', primeNumberList, '\n');
  console.log('Number of Primes: ', primeNumberList.length);
  console.timeEnd('Simple Sieve - Parallel');  
}

// prime number, number of socket clients
main(endNumber, worker.number)