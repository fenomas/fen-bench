/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "../examples/webDemo.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../examples/webDemo.js":
/*!******************************!*\
  !*** ../examples/webDemo.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\n/*\n * \n *          benchmark init\n * \n*/\n\nvar Bench = __webpack_require__(/*! ../src */ \"../src/index.js\")\nvar bench = new Bench()\nvar defaultProg = `var nums = []\nwhile (nums.length < 1e5) nums.push(Math.random())\n\nvar arrForEach = () => {\n    var sum = 0\n    nums.forEach(n => { sum += n })\n    return sum\n}\n\nvar arrReduce = () => {\n    return nums.reduce((sum, n) => sum + n, 0)\n}\n;[arrForEach, arrReduce]`\n\n\n\n/*\n * \n *          UI bindings\n * \n*/\n\nvar $ = document.querySelector.bind(document)\nvar dur = $('#dur')\nvar pause = $('#pause')\nvar meas = $('#meas')\nvar durLabel = $('#durLabel')\nvar pauseLabel = $('#pauseLabel')\nvar measLabel = $('#measLabel')\nvar prog = $('#progText')\nvar but = $('#start')\nvar out = $('#output')\n\ndur.oninput = ev => {\n    bench.testDuration = dur.valueAsNumber\n    durLabel.textContent = dur.value + ' ms'\n}\n\npause.oninput = ev => {\n    bench.pauseDuration = pause.valueAsNumber\n    pauseLabel.textContent = pause.value + ' ms'\n}\n\nmeas.oninput = ev => {\n    bench.maxMeasurements = meas.valueAsNumber\n    measLabel.textContent = meas.value + ' measurements'\n}\n\ndur.oninput()\npause.oninput()\nmeas.oninput()\n\nprog.spellcheck = false\nbut.onclick = toggle\nprog.oninput = ev => tryToSetProgram(prog.value)\nvar log = str => out.textContent = str\nlog('(output)')\n\n\n\n\n/*\n * \n *          wrap it all up\n * \n*/\n\nprog.value = defaultProg\nvar tests = eval(defaultProg)\nvar ok = Array.isArray(tests)\nif (ok) tests.forEach(el => { ok = ok && (typeof el === 'function') })\nif (ok) bench.testCases = tests\n\nfunction toggle() {\n    if (bench.running) {\n        bench.stop()\n        but.textContent = 'Start'\n        but.classList.remove('redder')\n    } else {\n        bench.start()\n        but.textContent = 'Stop'\n        but.classList.add('redder')\n    }\n}\n\nfunction tryToSetProgram(str) {\n    if (bench.running) toggle()\n    iter = 0\n    var tests\n    try { tests = eval(str) } catch { }\n    var ok = Array.isArray(tests)\n    if (ok) tests.forEach(el => { ok = ok && (typeof el === 'function') })\n    if (ok) {\n        prog.classList.remove('red')\n        bench.testCases = tests\n        log('')\n    } else {\n        prog.classList.add('red')\n        log('(program text must evaluate to an array of functions)')\n    }\n\n}\n\nvar iter = 0\nbench.callback = function () {\n    var s = ''\n    bench.results.forEach((res, i) => {\n        var fnName = bench.testCases[i].name || '(function)'\n        var ops = format(res.ops) + ' ops/sec'\n        // 95% confidence interval = 1.96 * stdev / sqrt(numObservarions)\n        var ci = 1.96 * res.dev / Math.sqrt(bench.maxMeasurements)\n        var pct = Math.round(100 * ci / res.ops)\n        var dev = '±' + pct + '%'\n        s += ' ' + fnName.padEnd(14).substr(0, 14) + ' '\n        s += ops.padStart(14) + '  '\n        s += dev + '\\n'\n    })\n    log(s + '\\n  iterations'.padEnd(17) + (++iter))\n}\n\n\nvar format = num => {\n    var exp = Math.floor(Math.log10(num))\n    if (exp < 1 || exp > 11) return num.toPrecision(3)\n    var suffix = ''\n    if (exp >= 9) { num /= 1e9; exp -= 9; suffix = 'B' }\n    if (exp >= 6) { num /= 1e6; exp -= 6; suffix = 'M' }\n    if (exp >= 3) { num /= 1e3; exp -= 3; suffix = 'K' }\n    return num.toPrecision(3) + suffix\n}\n\n\n\n//# sourceURL=webpack:///../examples/webDemo.js?");

/***/ }),

/***/ "../src/index.js":
/*!***********************!*\
  !*** ../src/index.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\nmodule.exports = function Bench() {\n    var self = this\n\n\n    /*\n     * \n     *      API\n     * \n    */\n\n    this.testCases = []\n    this.results = []\n\n    this.testDuration = 150\n    this.pauseDuration = 10\n    this.maxMeasurements = 10\n\n    this.start = () => { if (self.running) return; self.running = true; runTests() }\n    this.stop = () => { self.running = false }\n    this.running = false\n\n    this.callback = () => { }\n\n\n\n\n    /*\n    * \n    *      implementation \n    * \n    */\n\n    var testObjects = []\n    var testIndex = 0\n\n\n    \n\n    function runTests() {\n        var tests = self.testCases\n        var results = self.results\n        if (tests.length === 0) return bail('No test cases defined')\n\n        // conform next test case & object\n        if (testIndex >= tests.length) testIndex = 0\n        var testFn = tests[testIndex]\n        if (testIndex >= testObjects.length ||\n            testObjects[testIndex].fn !== testFn) {\n            testObjects[testIndex] = makeTestObject(testFn)\n        }\n        var testObj = testObjects[testIndex]\n\n        // synchronously run one battery on one function\n        var returnVal = runBattery(testObj.fn, self.testDuration, testObj.results)\n\n        // conform return value\n        if (undef(returnVal)) return bail('Test cases must return a value')\n        if (!undef(testObj.lastReturnValue) && returnVal !== testObj.lastReturnValue) {\n            return bail('Test case returned inconsistent values')\n        }\n        testObj.lastReturnValue = returnVal\n\n        // update results\n        while (testObj.results.length > self.maxMeasurements) testObj.results.pop()\n        while (results.length > tests.length) results.pop()\n        if (results.length <= testIndex) results[testIndex] = {}\n        results[testIndex].ops = mean(testObj.results)\n        results[testIndex].dev = deviation(testObj.results)\n\n        // callback after each full cycle, then iterate\n        testIndex++\n        if (testIndex >= tests.length) self.callback()\n        if (self.running) setTimeout(runTests, self.pauseDuration)\n    }\n\n    function bail(msg) {\n        console.warn(msg)\n        self.stop()\n    }\n}\n\n\n\nfunction makeTestObject(fn) {\n    if (typeof fn !== 'function') throw 'Test case must be function'\n    return {\n        fn: fn,\n        results: [],\n        lastReturnValue: undefined,\n    }\n}\n\n\nfunction runBattery(fn, dur, results) {\n    var start = now()\n    var end = start + dur\n    var t = start\n    var ops = 0\n    var returnVal\n    while (t < end) {\n        returnVal = fn()\n        ops++\n        t = now()\n    }\n    results.unshift(1000 * ops / (t - start))\n    return returnVal\n}\n\n\n\n\n\n/*\n * \n * \n *      helpers\n * \n * \n*/\n\nvar undef = val => (typeof val === 'undefined')\nvar sum = (a, b) => a + b\nvar mean = arr => arr.reduce(sum, 0) / arr.length\nvar deviation = arr => {\n    var avg = mean(arr)\n    var sqdev = mean(arr.map(num => (num - avg) ** 2))\n    return Math.sqrt(sqdev)\n}\nvar now = (() => {\n    if (typeof performance === 'object') return () => performance.now()\n    return () => Date.now()\n})()\n\n\n\n//# sourceURL=webpack:///../src/index.js?");

/***/ })

/******/ });