const { endNumber } = require('../../config');
const sieve = require(`../common/sieve`);

const main = async (n) => {
  console.log('Simple Sieve: Sequential');
  console.time('Simple Sieve - Sequential');
  const list = await sieve(2, n);
  console.log('\n', list, '\n');
  console.log('Number of Primes: ', list.length);
  console.timeEnd('Simple Sieve - Sequential');
}

main(endNumber);