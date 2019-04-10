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
2. Eratosthenes sieve ( (Wikipedia)[https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes] )

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

### Benchmarking
Number of socket-clients/threads used: 4
Value of N: 
1. 10,000,000 (664,579 prime numbers)
2. 100,000,000 (5,761,455 prime numbers)

| Sieve             | Method       |      10,000,000 |                    100,000,000 |
| :-----------------|:-------------|----------------:|-------------------------------:|
| **Simple**        | Sequential   |     10252.162ms |      270422.741ms (>4 minutes) |
|                   | Web Sockets  |      5252.304ms |      140995.694ms (>2 minutes) |
|                   | Parallel     |      5207.163ms |      165514.748ms (>2 minutes) |
| **Eratosthenes**  | Sequential   |       688.525ms |  JavaScript heap out of memory |
|                   | Web Sockets  |       633.511ms |         7146.561ms (7 seconds) |
|                   | Parallel     |        429.023ms|          2999.043ms (3 seconds)|

