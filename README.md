# prime-number-sieve
A prime number sieve made for University coursework (Final year Parallel Programming).

## Brief
Write a parallel version of a simple prime number sieve. To test a number n for primeness, just try dividing it by all numbers from 2 to sqrt(n). A fairly naive sieve tests all numbers from 2 to N in this way and returns a list of all prime numbers in this range.

## Purpose
This project has been created for my Final Year Parallel Programming coursework.
Using the different sieves and methods, I am able to calculate different parallel speed ups which can are discussed in the write up which accompanies this project.

## Sieves
There are two sieves that are available to use.
1. Simple sieve (Iterates through all numbers and adds them to the list if they are a Prime)
2. Eratosthenes sieve ([Wikipedia](https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes))

## Methods
There are three different methods for running the sieves
1. Sequential - Single threaded/One process
2. Web Sockets - Utilises Web Sockets to act as different threads/processes (Node.js Spawn is used to create socket clients)
3. Parallel - Uses Node.js "worker_threads" to run a multithreaded program

## Running
If you want to try out the Prime Sieve program yourself, git clone this repository and from inside its directory run any of the following:
`npm run simple-seq` - Simple sieve and Sequential
`npm run simple-socket` - Simple sieve and Web Sockets
`npm run simple-parallel` - Simple sieve and Parallel
`npm run erato-seq` - Eratosthenes sieve and Sequential
`npm run erato-socket` - Eratosthenes sieve and Web Sockets
`npm run erato-parallel` - Eratosthenes sieve and Parallel

### Changing the N value or number of threads
To change either the value of N or the number of threads, change their values in the `config.js` file.
* `endNumber` = N (The number to get the Primes up to)
* `worker.number` = Number of processes/threads
* `worker.logs` = When using Web Sockets, whether to display the logs from each process

Note: To run the parallel methods you must have atleast Node.js v10.5.0 or higher as it is experimental and uses `--experimental-worker` to run. 

## Benchmarking
Value of N: 
1. 1,000,000 (78,498 prime numbers)
2. 10,000,000 (664,579 prime numbers)
3. 100,000,000 (5,761,455 prime numbers)

Number of socket-clients/threads used: 2
| Sieve             | Method       |      1,000,000|      10,000,000 |                    100,000,000 |
|:------------------|:-------------|--------------:|----------------:|-------------------------------:|
| **Simple**        | Sequential   |     510.919ms |     10252.162ms |      270422.741ms (>4.5 minutes) |
|                   | Web Sockets  |     556.258ms |      7778.328ms |      163222.519ms (>2.5 minutes) |
|                   | Parallel     |     442.381ms |      6436.658ms |      154567.071ms (>2.5 minutes) |
| **Eratosthenes**  | Sequential   |     121.200ms |       688.525ms |                       9524.606ms |
|                   | Web Sockets  |     111.508ms |       734.562ms |                       8974.723ms |
|                   | Parallel     |     142.130ms |       445.349ms |                       3309.397ms |

Number of socket-clients/threads used: 4
| Sieve             | Method       |      1,000,000|      10,000,000 |                    100,000,000 |
|:------------------|:-------------|--------------:|----------------:|-------------------------------:|
| **Simple**        | Sequential   |     510.919ms |     10252.162ms |    270422.741ms (>4.5 minutes) |
|                   | Web Sockets  |     508.195ms |      5252.304ms |    140995.694ms (>2.5 minutes) |
|                   | Parallel     |     452.993ms |      5207.163ms |      123787.237ms (>2 minutes) |
| **Eratosthenes**  | Sequential   |     121.200ms |       688.525ms |                     9524.606ms |
|                   | Web Sockets  |     248.153ms |       633.511ms |                     7146.561ms |
|                   | Parallel     |     229.550ms |        429.023ms|                     2999.043ms |

Number of socket-clients/threads used: 8
_The number of threads used in the parallel implementation shouldn't make a difference as the benchmarking computer only has 4._
_It is of interest, however, to see how the Web Socket implementation fares with 8 socket-clients to use._
| Sieve             | Method       |      1,000,000|      10,000,000 |                    100,000,000 |
|:------------------|:-------------|--------------:|----------------:|-------------------------------:|
| **Simple**        | Sequential   |     510.919ms |     10252.162ms |    270422.741ms (>4.5 minutes) |
|                   | Web Sockets  |     688.403ms |      5281.018ms |      118286.530ms (<2 minutes) |
|                   | Parallel     |     639.959ms |      5310.920ms |      122829.183ms (>2 minutes) |
| **Eratosthenes**  | Sequential   |     121.200ms |       688.525ms |                     9524.606ms |
|                   | Web Sockets  |     292.007ms |       732.005ms |                     5483.382ms |
|                   | Parallel     |     367.499ms |       537.490ms |                     3335.598ms |

Note: Benchmark tests run on a MacBook Pro 2015, 2.9 GHz Intel Core i5 (2 Cores + 2 Virtual), 8GB RAM.