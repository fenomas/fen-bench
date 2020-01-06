'use strict'


var Bench = require('..')
var bench = new Bench()


// parameters
bench.testDuration = 100    // ms to run each case
bench.pauseDuration = 10    // ms between cases
bench.maxMeasurements = 10  // how many data points to keep



// setup
var N = 1e5
var inputs = []
for (var i = 0; i < N; i++) {
    inputs[i] = Math.PI * (1 + 4 * Math.random())
}


// create test cases
bench.testCases.push({
    name: 'modulo',
    fn: () => {
        var sum = 0
        var twopi = 2 * Math.PI
        for (var i = 0; i < inputs.length; i++) {
            sum = (sum + inputs[i] + twopi) % twopi
        }
        return sum
    },
})



bench.testCases.push({
    name: 'if/if',
    fn: () => {
        var sum = 0
        var twopi = 2 * Math.PI
        for (var i = 0; i < inputs.length; i++) {
            var n = inputs[i]
            if (n < 0) n += twopi
            sum += n
            if (sum > twopi) sum -= twopi
        }
        return sum
    },
})



bench.testCases.push({
    name: 'if/while',
    fn: () => {
        var sum = 0
        var twopi = 2 * Math.PI
        for (var i = 0; i < inputs.length; i++) {
            var n = inputs[i]
            if (n < 0) n += twopi
            sum += n
            while (sum > twopi) sum -= twopi
        }
        return sum
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
