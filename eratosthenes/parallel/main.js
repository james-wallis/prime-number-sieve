const createThread = require('../../utilities/createThread')
const primes = require('../socket/primes')
const orderArray = require('../../utilities/orderArray')

const { endNumber, worker } = require('../../config');

const main = async (n, noClients) => {
  console.log('Eratosthenes Sieve: Parallel');
  console.time('Eratosthenes Sieve - Parallel');

  const promises = [];
  const split = Math.round(n / noClients);

  let sqRoot = Math.floor(Math.sqrt(n));
  if (sqRoot % 2 == 0) sqRoot = sqRoot + 1;

  // Get the first few primes to be used in the calculations
  const rootPrimes = primes(sqRoot);

  // Instruct workers to begin calculations and send variables
  for (var ctr = 0; ctr < noClients; ctr++) {
    let start = (ctr == 0) ? (sqRoot + 2) : (ctr * split + 1);
    // Ensure start number is odd
    if (start % 2 == 0) start += 1;
    const end = (ctr + 1) * split;
    // Create thread and pass its start and end values
    promises.push(createThread(`${__dirname}/service.js`, { rootPrimes: rootPrimes, start: start, end: end }));
  }
  // Begin calculations
  const result = await Promise.all(promises);
  let primeNumberList = orderArray(result);
  // Create the final list, adding 2 to the front
  primeNumberList = [2].concat(rootPrimes.concat(primeNumberList));
  console.log(primeNumberList);
  console.log('Number of Primes: ', primeNumberList.length);
  console.timeEnd('Eratosthenes Sieve - Parallel');
}

// prime number, number of socket clients
main(endNumber, worker.number);