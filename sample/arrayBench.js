'use strict'


var Bench = require('..')
var bench = new Bench()


// parameters
bench.testDuration = 100    // ms to run each case
bench.pauseDuration = 10    // ms between cases
bench.maxMeasurements = 10  // how many data points to keep



// setup
var N = 1e5
var array = []
var intArray = new Int16Array(N)
for (var i = 0; i < N; i++) {
    array[i] = i % 100
    intArray[i] = i % 100
}


// create test cases
bench.testCases.push({
    name: 'Array',
    fn: () => {
        var sum = 0
        for (var i = 0; i < array.length; i++) {
            sum += array[i]
        }
        return sum
    },
})

bench.testCases.push({
    name: 'IntArray',
    fn: () => {
        var sum = 0
        for (var i = 0; i < intArray.length; i++) {
            sum += intArray[i]
        }
        return sum
    },
})

bench.testCases.push({
    name: 'Array / reduce',
    fn: () => {
        return array.reduce((accum, num) => accum + num, 0)
    },
})

bench.testCases.push({
    name: 'IntArray / reduce',
    fn: () => {
        return intArray.reduce((accum, num) => accum + num, 0)
    },
})



// run the tests
var iter = 0
bench.callback = () => {
    iter++
    if (iter % 5 === 0) {
        console.log('Iterations:', iter)
        console.log(bench.report() + '\n')
    }
    if (iter >= 25) {
        console.log('Raw values for test[0]')
        console.log('ops/sec:', bench.testCases[0].ops)
        console.log('std dev:', bench.testCases[0].dev)
        console.log('last measurement:', bench.testCases[0]._results[0])
        console.log('last test function returned:', bench.testCases[0].lastReturnValue)
        bench.stop()
    }
}

bench.start()
