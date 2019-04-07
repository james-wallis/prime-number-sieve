const getAllPrimeNumbers = require('./simple-prime-sieve')

const main = async (n) => {
  console.time('getAllPrimeNumbers');
  const list = await getAllPrimeNumbers(2, n);
  console.timeEnd('getAllPrimeNumbers');
  console.log('\n', list, '\n');
}

main(10000000);