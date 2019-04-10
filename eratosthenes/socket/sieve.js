/**
 * 
 * @param {Array} rootPrimes - Array of primes used in the sieve
 * @param {Int} start - Start number to find all prime numbers greater than
 * @param {Int} end - End number to find all prime numbers less than
 * @returns All prime numbers inbetween the given start and end values
 */
const sieve = (rootPrimes, start, end) => {
  const oddNumbers = [];

  // Create array of true values representing each odd
  // number from start value until end value
  // Note: All even numbers are non-primes aside from 2
  for (let i = start; i <= end; i += 2) {
    oddNumbers.push(i);
  }

  // p = prime number from rootPrimes list
  // pp = p squared
  for (let j = 0; j < rootPrimes.length; j++) {
    let p = rootPrimes[j];
    if (p * p >= start) {
      for (let pp = p * p; pp <= end; pp += 2 * p) {
        // Find pp's index in the oddNumber array and set to false
        const index = Math.floor((pp - start) / 2);
        if (index >= 0) oddNumbers[Math.floor(index)] = false;
      }
    } else {
      let l = Math.floor((start - p * p) / (2 * p));
      for (let k = p * p + 2 * l * p; k <= end; k += 2 * p) {
        // Find k's index in the oddNumber array and set to false
        const index = Math.floor((k - start) / 2);
        if (index >= 0) oddNumbers[Math.floor(index)] = false;
      }
    }
  }

  // Clean up list by removing false entries and return
  return oddNumbers.filter(bool => bool);
}

module.exports = sieve;