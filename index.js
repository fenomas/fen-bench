'use strict'

module.exports = Bench



function Bench() {
    var self = this


    /*
     * 
     *      API
     * 
    */

    this.testCases = []
    this.testDuration = 150
    this.pauseDuration = 10
    this.maxMeasurements = 10

    this.start = () => { if (self.running) return; self.running = true; runTests() }
    this.stop = () => { self.running = false }
    this.running = false

    this.callback = () => { }

    this.report = function () {
        var clip = (str, len) => str.substr(0, len - 1).padEnd(len)
        var fmt = (a, b, c) => clip(a, 25) + clip(b, 15) + c
        var str = fmt('Name', 'Avg ops/sec', 'plus/minus')
        self.testCases.forEach(item => {
            if (!item._results) return
            var speed = (parseFloat(item.ops.toPrecision(3)) + '').padStart(8)
            var devpct = (Math.round(200 * item.dev / item.ops) + '%').padStart(5)
            str += '\n' + fmt(item.name, speed, devpct)
        })
        return str
    }







    /*
     * 
     *      implementation 
     * 
    */


    // helpers
    var mean = arr => arr.reduce((prev, val) => prev + val, 0) / arr.length
    var deviation = arr => {
        var avg = mean(arr)
        return Math.sqrt(mean(arr.map(num => (num - avg) ** 2)))
    }
    var now = (() => {
        if (typeof performance === 'object') return () => performance.now()
        if (typeof process === 'object') return () => {
            var t = process.hrtime()
            return t[0] * 1e3 + t[1] / 1e6
        }
        return () => Date.now()
    })()



    function conformTestCase(item) {
        if (item._results) return
        item.name = item.name || 'Unnamed'
        item.fn = item.fn || (() => 0)
        item.lastReturnValue = undefined
        item._results = []
        item.ops = 0
        item.dev = 0
    }



    function runTests() {
        var list = self.testCases
        if (list.length === 0) throw 'Add some test cases!'

        listCounter %= list.length
        var item = list[listCounter]
        conformTestCase(item)
        listCounter++

        // synchronously run one battery on one function
        var res = battery(item.fn, self.testDuration)
        item._results.unshift(res.duration)
        item.lastReturnValue = res.lastReturnValue

        // recalc mean/stdev
        if (item._results.length > self.maxMeasurements) {
            item._results.length = self.maxMeasurements
        }
        item.ops = mean(item._results)
        item.dev = deviation(item._results)

        // callback after full cycle
        if (listCounter === list.length) self.callback()
        if (self.running) setTimeout(runTests, self.pauseDuration)
    }
    var listCounter = 0




    function battery(fn, dur) {
        var start = now()
        var ops = 0
        var result = fn()
        while (now() < start + dur) {
            result = fn()
            ops++
        }
        return {
            duration: 1000 * ops / (now() - start),
            lastReturnValue: result
        }
    }

}


