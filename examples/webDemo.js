
/*
 * 
 *          benchmark init
 * 
*/

var Bench = require('../src')
var bench = new Bench()
var defaultProg = `var nums = []
while (nums.length < 1e5) nums.push(Math.random())

var arrForEach = () => {
    var sum = 0
    nums.forEach(n => { sum += n })
    return sum
}

var arrReduce = () => {
    return nums.reduce((sum, n) => sum + n, 0)
}
;[arrForEach, arrReduce]`



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

prog.value = defaultProg
var tests = eval(defaultProg)
var ok = Array.isArray(tests)
if (ok) tests.forEach(el => { ok = ok && (typeof el === 'function') })
if (ok) bench.testCases = tests

function toggle() {
    if (bench.running) {
        bench.stop()
        but.textContent = 'Start'
        but.classList.remove('redder')
    } else {
        bench.start()
        but.textContent = 'Stop'
        but.classList.add('redder')
    }
}

function tryToSetProgram(str) {
    if (bench.running) toggle()
    iter = 0
    var tests
    try { tests = eval(str) } catch { }
    var ok = Array.isArray(tests)
    if (ok) tests.forEach(el => { ok = ok && (typeof el === 'function') })
    if (ok) {
        prog.classList.remove('red')
        bench.testCases = tests
        log('')
    } else {
        prog.classList.add('red')
        log('(program text must evaluate to an array of functions)')
    }

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
        s += dev + '\n'
    })
    log(s + '\n  iterations'.padEnd(17) + (++iter))
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

