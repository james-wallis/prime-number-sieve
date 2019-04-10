const sieve = (end) => {
  const primeNumberList = [];

  // Make an array from 2 to (end - 1)
  for (var i = 0; i < end; i++) {
    (i > 1) ? primeNumberList.push(i) : primeNumberList.push(false);
  }

  // Remove multiples of primes < Square Root of the end value
  for (var i = 2; i <= Math.floor(Math.sqrt(end)); i++) {
    if (primeNumberList[i]) {
      for (var j = i * i; j < end; j += i) {
        primeNumberList[j] = false;
      }
    }
  }

  // Remove all false values from Array leaving only the prime numbers
  return primeNumberList.filter(exists => exists);
};

module.exports = sieve;