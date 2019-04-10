/**
 * Function primes
 * Return all the prime numbers from 2 to a given number (n)
 * @param {Int} n - The number to find all the primes up to
 * @returns Array of prime numbers up to n
 */
const primes = (n) => {
  const oddNumbers = [];

  // Create array of true values representing each odd
  // number from 3 until n (All even numbers are non-primes aside from 2)
  for (let number = 3; number <= n; number += 2) {
    oddNumbers.push(number);
  }

  // Determine whether oddNumber is a prime
  // x = odd number
  // xx = odd number squared
  for (let x = 3; x <= n; x += 2) {
    if (oddNumbers[(x - 3) / 2]) {
      for (let xx = x * x; xx <= n; xx += 2 * x) {
        oddNumbers[(xx - 3) / 2] = false;
      }
    }
  }

  // Remove all false entries from array
  return oddNumbers.filter(exists => exists);
}

module.exports = primes;