# fen-bench

A small, sane JS micro-benchmark library.

----

This library implements the only way I've found of getting 
consistent performance data about JS functions. 
It attempts to account for how modern JS engines optimize, 
by carefully managing references, measuring continuously, and 
discarding old measurements.

[Browser demo here](https://andyhall.github.io/fen-bench/)

YMMV, but for me measuring performance this way has solved the 
problem of getting wildly varying results over time or across 
page reloads, as tends to happen with other libraries.


## Usage:

```shell
npm install --save-dev fen-bench
```

```js
var Bench = require('fen-bench')
var bench = new Bench()

// settings
bench.testDuration = 100            // ms to run each case
bench.pauseDuration = 15            // ms between cases
bench.maxMeasurements = 10          // how many data points to keep

// define test cases
bench.testCases.push(function testOne() {
    for (var sum = 0, i = 0; i < 1e6; i++) sum += i % 16
    // test cases must return a consistent value
    return sum
})

// runs continuously until stopped
bench.start()
setTimeout(() => bench.stop(), 5000)

// callback is called after each round of tests
bench.callback = () => {
    bench.results.forEach(res => {
        console.log(res.ops, 'calls/sec')
        console.log(res.dev, 'std. deviation')
    })
}
```

Standard disclaimers apply for test cases - they should return a 
consistent value that is derived from the work your function is doing. 
This prevents clever JS engines from marking the heavy part of your 
test case as dead code, and optimizing it into an empty function.

----

### Author: https://github.com/andyhall

### License: MIT

