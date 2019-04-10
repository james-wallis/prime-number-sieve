const { endNumber } = require('../../config');
const sieve = require(`./sieve`);

const main = async (n) => {
  console.log('Eratosthenes Sieve: Sequential');
  console.time('Eratosthenes Sieve - Sequential');
  const list = await sieve(n);
  console.log('\n', list, '\n');
  console.log('Number of Primes: ', list.length);
  console.timeEnd('Eratosthenes Sieve - Sequential');
}

main(endNumber);