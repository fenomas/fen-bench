
var Bench = require('..')
var bench = new Bench()


// parameters
bench.testDuration = 100    // ms to run each case
bench.pauseDuration = 10    // ms between cases
bench.maxMeasurements = 20  // how many data points to keep
var maxIterations = 50


/*
 * 
 *          bench setup
 * 
*/

var N = 50000
var input = Array.from(Array(N)).map((v, i) => i * 37 % 13)



// test whether v8 removes calls to empty functions:
var DEBUG = 0
var debug = () => { }
if (DEBUG) debug = s => console.log(s)


function sum1(arr) {
    var ct = 0
    for (var i = 0; i < arr.length; i++) {
        ct += arr[i]
        if (ct > 10000) ct = 0
    }
    return ct
}

function sum2withDebug(arr) {
    var ct = 0
    for (var i = 0; i < arr.length; i++) {
        ct += arr[i]
        if (ct > 10000) ct = 0
    }
    debug('the count is', ct, 'and a string', Math.random())
    return ct
}






/*
 * 
 *          test cases
 * 
*/


bench.testCases.push({
    name: 'sum1',
    fn: () => sum1(input),
})
bench.testCases.push({
    name: 'sum2 with empty debug call',
    fn: () => sum2withDebug(input),
})







/*
 * 
 *          run the bench
 * 
*/


var iter = 0
bench.callback = () => {
    iter++
    if (iter % 10 === 0) {
        var rep = bench.report()
        log(`   Iterations:  ${iter} \n${rep} \n`)
    }
    if (iter >= maxIterations) bench.stop()
}

bench.start()


function log() {
    var s = Array.prototype.join.call(arguments, ' ')
    if (document) {
        document.body.innerHTML = `<pre>${s}</pre>` + document.body.innerHTML
    } else console.log(s)
}

