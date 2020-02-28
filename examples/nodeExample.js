

var Bench = require('..')
var bench = new Bench()


// parameters
bench.testDuration = 100    // ms to run each case
bench.pauseDuration = 15    // ms between cases
bench.maxMeasurements = 10  // how many data points to keep




// make test cases
var N = 1e5

var nopow = () => {
    for (var sum = 0, i = 0; i < N; i++) {
        sum += (i * i * i) / N
    }
    return sum
}
var pow = () => {
    for (var sum = 0, i = 0; i < N; i++) {
        sum += Math.pow(i, 3) / N
    }
    return sum
}

bench.testCases = [nopow, pow]





// run the benchmark and occasionally report results

var iter = 0
bench.callback = () => {
    iter++
    if (iter % 5 === 0) {
        console.log('Iterations:', iter)
        bench.testCases.forEach((fn, i) => {
            var res = bench.results[i]
            var s1 = fn.name
            var s2 = res.ops.toFixed(0) + ' ops/sec '
            // 95% confidence interval = 1.96 * stdev / sqrt(numObservarions)
            var ci = 1.96 * res.dev / Math.sqrt(bench.maxMeasurements)
            var pct = Math.round(100 * ci / res.ops)
            var s3 = '±' + pct + '%'
            console.log(s1.padEnd(20), s2.padStart(10), s3)
        })
        console.log('\n')
    }
    if (iter > 30) bench.stop()
}

bench.start()

