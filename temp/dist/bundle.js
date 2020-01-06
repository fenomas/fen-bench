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
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../../../../usr/local/lib/node_modules/webpack/node_modules/process/browser.js":
/*!*************************************************!*\
  !*** (webpack)/node_modules/process/browser.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) { return [] }\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n\n//# sourceURL=webpack:///(webpack)/node_modules/process/browser.js?");

/***/ }),

/***/ "../index.js":
/*!*******************!*\
  !*** ../index.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(process) {\n\nmodule.exports = Bench\n\n\n\nfunction Bench() {\n    var self = this\n\n\n    /*\n     * \n     *      API\n     * \n    */\n\n    this.testCases = []\n    this.testDuration = 150\n    this.pauseDuration = 10\n    this.maxMeasurements = 10\n\n    this.start = () => { if (self.running) return; self.running = true; runTests() }\n    this.stop = () => { self.running = false }\n    this.running = false\n\n    this.callback = () => { }\n\n    this.report = function () {\n        var clip = (str, len) => str.substr(0, len - 1).padEnd(len)\n        var fmt = (a, b, c) => clip(a, 25) + clip(b, 15) + c\n        var str = fmt('Name', 'Avg ops/sec', 'plus/minus')\n        self.testCases.forEach(item => {\n            if (!item._results) return\n            var speed = (parseFloat(item.ops.toPrecision(3)) + '').padStart(8)\n            var devpct = (Math.round(200 * item.dev / item.ops) + '%').padStart(5)\n            str += '\\n' + fmt(item.name, speed, devpct)\n        })\n        return str\n    }\n\n\n\n\n\n\n\n    /*\n     * \n     *      implementation \n     * \n    */\n\n\n    // helpers\n    var mean = arr => arr.reduce((prev, val) => prev + val, 0) / arr.length\n    var deviation = arr => {\n        var avg = mean(arr)\n        return Math.sqrt(mean(arr.map(num => (num - avg) ** 2)))\n    }\n    var now = (() => {\n        if (typeof performance === 'object') return () => performance.now()\n        if (typeof process === 'object') return () => {\n            var t = process.hrtime()\n            return t[0] * 1e3 + t[1] / 1e6\n        }\n        return () => Date.now()\n    })()\n\n\n\n    function conformTestCase(item) {\n        if (item._results) return\n        item.name = item.name || 'Unnamed'\n        item.fn = item.fn || (() => 0)\n        item.lastReturnValue = undefined\n        item._results = []\n        item.ops = 0\n        item.dev = 0\n    }\n\n\n\n    function runTests() {\n        var list = self.testCases\n        if (list.length === 0) throw 'Add some test cases!'\n\n        listCounter %= list.length\n        var item = list[listCounter]\n        conformTestCase(item)\n        listCounter++\n\n        // synchronously run one battery on one function\n        var res = battery(item.fn, self.testDuration)\n        item._results.unshift(res.duration)\n        item.lastReturnValue = res.lastReturnValue\n\n        // recalc mean/stdev\n        if (item._results.length > self.maxMeasurements) {\n            item._results.length = self.maxMeasurements\n        }\n        item.ops = mean(item._results)\n        item.dev = deviation(item._results)\n\n        // callback after full cycle\n        if (listCounter === list.length) self.callback()\n        if (self.running) setTimeout(runTests, self.pauseDuration)\n    }\n    var listCounter = 0\n\n\n\n\n    function battery(fn, dur) {\n        var start = now()\n        var ops = 0\n        var result = fn()\n        while (now() < start + dur) {\n            result = fn()\n            ops++\n        }\n        return {\n            duration: 1000 * ops / (now() - start),\n            lastReturnValue: result\n        }\n    }\n\n}\n\n\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../usr/local/lib/node_modules/webpack/node_modules/process/browser.js */ \"../../../../../../usr/local/lib/node_modules/webpack/node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///../index.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar Bench = __webpack_require__(/*! .. */ \"../index.js\")\nvar bench = new Bench()\n\n\n// parameters\nbench.testDuration = 100    // ms to run each case\nbench.pauseDuration = 10    // ms between cases\nbench.maxMeasurements = 20  // how many data points to keep\n\n\n/*\n * \n *          bench setup\n * \n*/\n\nvar N = 50000\nvar input = Array.from(Array(N)).map((v, i) => i * 37 % 13)\n\n\nfunction count1(arr, mode) {\n    var ct = 0, n1, n2, n3, n4\n    for (var i = 0; i < arr.length; i++) {\n        if (mode) {\n            n1 = i % 11\n            n2 = i % 13\n            n3 = arr[i] % 17\n            n4 = arr[i] % 19\n        } else {\n            n1 = i % 13\n            n2 = i % 11\n            n3 = arr[i] % 19\n            n4 = arr[i] % 17\n        }\n        var sum = (n1 + n3) % n2\n        sum += (n2 + n4) % n1\n        sum += (n1 + n2) % n3\n        if (sum % 3 === 0) ct++\n    }\n    return ct\n}\n\nfunction count2(arr, mode) {\n    var ct = 0, n1, n2, n3, n4\n    for (var i = 0; i < arr.length; i++) {\n        if (mode) {\n            n1 = i % 11\n            n2 = i % 13\n            n3 = arr[i] % 17\n            n4 = arr[i] % 19\n        } else {\n            n1 = i % 13\n            n2 = i % 11\n            n3 = arr[i] % 19\n            n4 = arr[i] % 17\n        }\n        var sum = (n1 + n3) % n2\n        sum += (n2 + n4) % n1\n        sum += (n1 + n2) % n3\n        if (sum % 3 === 0) ct++\n    }\n    return ct\n}\n\nfunction count3(arr, mode) {\n    var ct = 0, n1, n2, n3, n4\n    for (var i = 0; i < arr.length; i++) {\n        if (mode) {\n            n1 = i % 11\n            n2 = i % 13\n            n3 = arr[i] % 17\n            n4 = arr[i] % 19\n        } else {\n            n1 = i % 13\n            n2 = i % 11\n            n3 = arr[i] % 19\n            n4 = arr[i] % 17\n        }\n        var sum = (n1 + n3) % n2\n        sum += (n2 + n4) % n1\n        sum += (n1 + n2) % n3\n        if (sum % 3 === 0) ct++\n    }\n    return ct\n}\n\n\n\nfunction wrapped1(arr) { return count3(arr, true) }\nfunction wrapped2(arr) { return count3(arr, false) }\n\n\n/*\n * \n *          test cases\n * \n*/\n\n\nbench.testCases.push({\n    name: 'count1(input, true)',\n    fn: () => count1(input, true),\n})\nbench.testCases.push({\n    name: 'count1(input, false)',\n    fn: () => count1(input, false),\n})\n\n\nbench.testCases.push({\n    name: 'count2(input, false)',\n    fn: () => count2(input, false),\n})\n\n\n\n\nbench.testCases.push({\n    name: 'wrapped1(input)',\n    fn: () => wrapped1(input),\n})\nbench.testCases.push({\n    name: 'wrapped2(input)',\n    fn: () => wrapped2(input),\n})\n\n\n\n\n\n\n\n/*\n * \n *          run the bench\n * \n*/\n\n\nvar iter = 0\nbench.callback = () => {\n    iter++\n    if (iter % 10 === 0) {\n        var rep = bench.report()\n        log(`   Iterations:  ${iter} \\n${rep} \\n`)\n    }\n    if (iter >= 20) bench.stop()\n}\n\nbench.start()\n\n\nfunction log() {\n    var s = Array.prototype.join.call(arguments, ' ')\n    if (document) {\n        document.body.innerHTML = `<pre>${s}</pre>` + document.body.innerHTML\n    } else console.log(s)\n}\n\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ });