const sieve = async (start, end) => {
  const primeNumberList = [];
  // 0 and 1 are not prime numbers
  for (let i = start; i < end; i++) {
    if (await testPrime(i)) primeNumberList.push(i);
    // if (i % 1000000 === 0) console.log('i', i);
  }
  return primeNumberList;
}

// If the number is a prime number return true
const testPrime = (numberToTest) => {
  const root = Math.floor(Math.sqrt(numberToTest));
  let isPrime = true;
  let j = 2;
  while (j <= root && isPrime == true) {
    if (numberToTest % j === 0) isPrime = false;
    j++;
  }
  return isPrime;
}

module.exports = sieve;
