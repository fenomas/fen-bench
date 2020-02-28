
/*
 * 
 *          benchmark init
 * 
*/

var Bench = require('../src')
var bench = new Bench()
var defaultProg = `var N = 1e5

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

return [nopow, pow]`


/*
 * 
 *          UI bindings
 * 
*/

var $ = document.querySelector.bind(document)
var dur = $('#dur')
var pause = $('#pause')
var meas = $('#meas')
var durLabel = $('#durLabel')
var pauseLabel = $('#pauseLabel')
var measLabel = $('#measLabel')
var prog = $('#progText')
var but = $('#start')
var out = $('#output')

dur.oninput = ev => {
    bench.testDuration = dur.valueAsNumber
    durLabel.textContent = dur.value + ' ms'
}

pause.oninput = ev => {
    bench.pauseDuration = pause.valueAsNumber
    pauseLabel.textContent = pause.value + ' ms'
}

meas.oninput = ev => {
    bench.maxMeasurements = meas.valueAsNumber
    measLabel.textContent = meas.value + ' measurements'
}

dur.oninput()
pause.oninput()
meas.oninput()

prog.spellcheck = false
but.onclick = toggle
prog.oninput = ev => tryToSetProgram(prog.value)
var log = str => out.textContent = str
log('(output)')




/*
 * 
 *          wrap it all up
 * 
*/

var makeTests = null
prog.value = defaultProg
tryToSetProgram(defaultProg)

function toggle() {
    if (bench.running) {
        bench.stop()
        but.textContent = 'Start'
        but.classList.remove('redder')
    } else {
        if (typeof makeTests === 'function') {
            try {
                var tests = makeTests()
                if (!Array.isArray(tests)) throw 'Program must return an array of test functions'
                tests.forEach(fn => fn())
                bench.testCases = tests.slice()
                bench.results.length = 0
            } catch (err) {
                bench.testCases = []
                log(err)
                return
            }
        }
        bench.start()
        but.textContent = 'Stop'
        but.classList.add('redder')
    }
}

function tryToSetProgram(str) {
    if (bench.running) toggle()
    iter = 0
    makeTests = null
    try {
        makeTests = new Function(str)
    } catch (err) { makeTests = null }
    if (typeof makeTests === 'function') {
        prog.classList.remove('red')
    } else {
        prog.classList.add('red')
    }
    log('')
}


var iter = 0
bench.callback = function () {
    var s = ''
    bench.results.forEach((res, i) => {
        var fnName = bench.testCases[i].name || '(function)'
        var ops = format(res.ops) + ' ops/sec'
        // 95% confidence interval = 1.96 * stdev / sqrt(numObservarions)
        var ci = 1.96 * res.dev / Math.sqrt(bench.maxMeasurements)
        var pct = Math.round(100 * ci / res.ops)
        var dev = '±' + pct + '%'
        s += ' ' + fnName.padEnd(14).substr(0, 14) + ' '
        s += ops.padStart(14) + '  '
        s += dev
        if (natives.allowed) {
            var status = natives.status(bench.testCases[i])
            s += '       ' + status
            bench.testCases[i]
        }
        s += '\n'
    })
    log(s + '\n  iterations'.padEnd(17) + (++iter))

    if (natives.allowed && (iter % 10) === 0) {
        bench.testCases.forEach(fn => natives.optNext(fn))
    }
}


var format = num => {
    var exp = Math.floor(Math.log10(num))
    if (exp < 1 || exp > 11) return num.toPrecision(3)
    var suffix = ''
    if (exp >= 9) { num /= 1e9; exp -= 9; suffix = 'B' }
    if (exp >= 6) { num /= 1e6; exp -= 6; suffix = 'M' }
    if (exp >= 3) { num /= 1e3; exp -= 3; suffix = 'K' }
    return num.toPrecision(3) + suffix
}




// extras that work if you run chrome with:
//      chrome --js-flags='--allow-natives-syntax'
var natives = (() => {
    var allowed = true
    var statusNum = function () { return -1 }
    var optNext = function () { }
    try {
        statusNum = new Function('f', 'return %GetOptimizationStatus(f)')
        optNext = new Function('f', '%OptimizeFunctionOnNextCall(f)')
    } catch (e) {
        allowed = false
    }
    var status = (f) => {
        var num = statusNum(f)
        if (num < 0) return 'n/a'
        var s = ''
        if (num & (1 << 0)) s += 'fn '
        if (num & (1 << 1)) s += 'never-opt '
        if (num & (1 << 2)) s += 'always-opt '
        if (num & (1 << 3)) s += 'deopted? '
        if (num & (1 << 4)) s += 'opt '
        if (num & (1 << 5)) s += 'turbofan '
        if (num & (1 << 6)) s += 'interpreted '
        if (num & (1 << 7)) s += 'marked '
        if (num & (1 << 8)) s += 'marked-con '
        if (num & (1 << 9)) s += 'ex '
        if (num & (1 << 10)) s += 'topTF '
        return s
    }
    return { allowed, status, optNext }
})()


window.natives = natives
window.bench = bench

if (natives.allowed) $('#note').style.display = 'none'
