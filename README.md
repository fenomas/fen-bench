# fen-bench

A small, sane JS micro-benchmark library.

----

This library implements the only way I've found of getting 
consistent performance data about JS functions. 
It accounts for how modern JS engines work by 
measuring continuously and discarding old measurements.

YMMV, but for me measuring performance this way has solved the 
problem of getting wildly varying results over time or across 
page reloads, as tends to happen with other libraries.


## Usage:

```js
var Bench = require('fen-bench')
var bench = new Bench()

bench.testDuration = 100            // time for each measurement (ms)
bench.pauseDuration = 10            // pause between cases (ms)
bench.maxMeasurements = 10          // how much past data to keep

bench.testCases.push({              // add objects for each test case
    name: 'Test #1',
    fn: () => { /* ... */ },        // function to be measured
})

bench.start()                       // runs continuously until stopped
bench.callback = () => {            // called after each cycle of test cases
    console.log(bench.report())     // default pre-formatted report
}
```

For how to access the raw measurement data see `/sample/`.


## Installation:

```js
npm install --save-dev fen-bench
```

----

### Author: https://github.com/andyhall

### License: MIT

