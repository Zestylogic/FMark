(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["fmark"] = factory();
	else
		root["fmark"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = append;
/* unused harmony export choose */
/* harmony export (immutable) */ __webpack_exports__["b"] = collect;
/* unused harmony export concat */
/* harmony export (immutable) */ __webpack_exports__["d"] = filter;
/* unused harmony export where */
/* unused harmony export initialize */
/* harmony export (immutable) */ __webpack_exports__["e"] = map;
/* unused harmony export mapIndexed */
/* unused harmony export indexed */
/* unused harmony export partition */
/* harmony export (immutable) */ __webpack_exports__["g"] = replicate;
/* harmony export (immutable) */ __webpack_exports__["h"] = reverse;
/* unused harmony export singleton */
/* harmony export (immutable) */ __webpack_exports__["i"] = slice;
/* unused harmony export unzip */
/* unused harmony export unzip3 */
/* unused harmony export groupBy */
/* harmony export (immutable) */ __webpack_exports__["j"] = splitAt;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ListClass__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Map__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Option__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Seq__ = __webpack_require__(1);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_0__ListClass__["b"]; });








/* harmony default export */ __webpack_exports__["c"] = (__WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */]);

function append(xs, ys) {
    return Object(__WEBPACK_IMPORTED_MODULE_3__Seq__["f" /* fold */])(function (acc, x) {
        return new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](x, acc);
    }, ys, reverse(xs));
}
function choose(f, xs) {
    var r = Object(__WEBPACK_IMPORTED_MODULE_3__Seq__["f" /* fold */])(function (acc, x) {
        var y = f(x);
        return y != null ? new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](Object(__WEBPACK_IMPORTED_MODULE_2__Option__["c" /* getValue */])(y), acc) : acc;
    }, new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](), xs);
    return reverse(r);
}
function collect(f, xs) {
    return Object(__WEBPACK_IMPORTED_MODULE_3__Seq__["f" /* fold */])(function (acc, x) {
        return append(acc, f(x));
    }, new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](), xs);
}
// TODO: should be xs: Iterable<List<T>>
function concat(xs) {
    return collect(function (x) {
        return x;
    }, xs);
}
function filter(f, xs) {
    return reverse(Object(__WEBPACK_IMPORTED_MODULE_3__Seq__["f" /* fold */])(function (acc, x) {
        return f(x) ? new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](x, acc) : acc;
    }, new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](), xs));
}
function where(f, xs) {
    return filter(f, xs);
}
function initialize(n, f) {
    if (n < 0) {
        throw new Error("List length must be non-negative");
    }
    var xs = new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */]();
    for (var i = 1; i <= n; i++) {
        xs = new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](f(n - i), xs);
    }
    return xs;
}
function map(f, xs) {
    return reverse(Object(__WEBPACK_IMPORTED_MODULE_3__Seq__["f" /* fold */])(function (acc, x) {
        return new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](f(x), acc);
    }, new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](), xs));
}
function mapIndexed(f, xs) {
    return reverse(Object(__WEBPACK_IMPORTED_MODULE_3__Seq__["f" /* fold */])(function (acc, x, i) {
        return new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](f(i, x), acc);
    }, new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](), xs));
}
function indexed(xs) {
    return mapIndexed(function (i, x) {
        return [i, x];
    }, xs);
}
function partition(f, xs) {
    return Object(__WEBPACK_IMPORTED_MODULE_3__Seq__["f" /* fold */])(function (acc, x) {
        var lacc = acc[0];
        var racc = acc[1];
        return f(x) ? [new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](x, lacc), racc] : [lacc, new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](x, racc)];
    }, [new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](), new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */]()], reverse(xs));
}
function replicate(n, x) {
    return initialize(n, function () {
        return x;
    });
}
function reverse(xs) {
    return Object(__WEBPACK_IMPORTED_MODULE_3__Seq__["f" /* fold */])(function (acc, x) {
        return new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](x, acc);
    }, new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](), xs);
}
function singleton(x) {
    return new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](x, new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */]());
}
function slice(lower, upper, xs) {
    var noLower = lower == null;
    var noUpper = upper == null;
    return reverse(Object(__WEBPACK_IMPORTED_MODULE_3__Seq__["f" /* fold */])(function (acc, x, i) {
        return (noLower || lower <= i) && (noUpper || i <= upper) ? new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](x, acc) : acc;
    }, new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](), xs));
}
/* ToDo: instance unzip() */
function unzip(xs) {
    return Object(__WEBPACK_IMPORTED_MODULE_3__Seq__["g" /* foldBack */])(function (xy, acc) {
        return [new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](xy[0], acc[0]), new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](xy[1], acc[1])];
    }, xs, [new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](), new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */]()]);
}
/* ToDo: instance unzip3() */
function unzip3(xs) {
    return Object(__WEBPACK_IMPORTED_MODULE_3__Seq__["g" /* foldBack */])(function (xyz, acc) {
        return [new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](xyz[0], acc[0]), new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](xyz[1], acc[1]), new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](xyz[2], acc[2])];
    }, xs, [new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](), new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](), new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */]()]);
}
function groupBy(f, xs) {
    return Object(__WEBPACK_IMPORTED_MODULE_3__Seq__["n" /* toList */])(Object(__WEBPACK_IMPORTED_MODULE_3__Seq__["i" /* map */])(function (k) {
        return [k[0], Object(__WEBPACK_IMPORTED_MODULE_3__Seq__["n" /* toList */])(k[1])];
    }, Object(__WEBPACK_IMPORTED_MODULE_1__Map__["c" /* groupBy */])(f, xs)));
}
function splitAt(index, xs) {
    if (index < 0) {
        throw new Error("The input must be non-negative.");
    }
    var i = 0;
    var last = xs;
    var first = new Array(index);
    while (i < index) {
        if (last.tail == null) {
            throw new Error("The input sequence has an insufficient number of elements.");
        }
        first[i] = last.head;
        last = last.tail;
        i++;
    }
    return [Object(__WEBPACK_IMPORTED_MODULE_0__ListClass__["b" /* ofArray */])(first), last];
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Enumerator */
/* unused harmony export getEnumerator */
/* unused harmony export toIterator */
/* harmony export (immutable) */ __webpack_exports__["n"] = toList;
/* unused harmony export ofList */
/* unused harmony export ofArray */
/* unused harmony export append */
/* unused harmony export average */
/* harmony export (immutable) */ __webpack_exports__["a"] = averageBy;
/* unused harmony export concat */
/* unused harmony export collect */
/* unused harmony export choose */
/* harmony export (immutable) */ __webpack_exports__["c"] = compareWith;
/* harmony export (immutable) */ __webpack_exports__["d"] = delay;
/* unused harmony export empty */
/* unused harmony export enumerateWhile */
/* unused harmony export enumerateThenFinally */
/* unused harmony export enumerateUsing */
/* unused harmony export exactlyOne */
/* unused harmony export except */
/* harmony export (immutable) */ __webpack_exports__["e"] = exists;
/* unused harmony export exists2 */
/* unused harmony export filter */
/* unused harmony export where */
/* harmony export (immutable) */ __webpack_exports__["f"] = fold;
/* harmony export (immutable) */ __webpack_exports__["g"] = foldBack;
/* unused harmony export fold2 */
/* unused harmony export foldBack2 */
/* unused harmony export forAll */
/* unused harmony export forAll2 */
/* unused harmony export tryHead */
/* unused harmony export head */
/* unused harmony export initialize */
/* unused harmony export initializeInfinite */
/* unused harmony export tryItem */
/* harmony export (immutable) */ __webpack_exports__["h"] = item;
/* unused harmony export iterate */
/* unused harmony export iterate2 */
/* unused harmony export iterateIndexed */
/* unused harmony export iterateIndexed2 */
/* unused harmony export isEmpty */
/* unused harmony export tryLast */
/* unused harmony export last */
/* unused harmony export count */
/* harmony export (immutable) */ __webpack_exports__["i"] = map;
/* unused harmony export mapIndexed */
/* unused harmony export indexed */
/* unused harmony export map2 */
/* unused harmony export mapIndexed2 */
/* unused harmony export map3 */
/* harmony export (immutable) */ __webpack_exports__["b"] = chunkBySize;
/* unused harmony export mapFold */
/* unused harmony export mapFoldBack */
/* unused harmony export max */
/* unused harmony export maxBy */
/* unused harmony export min */
/* unused harmony export minBy */
/* unused harmony export pairwise */
/* unused harmony export permute */
/* unused harmony export rangeStep */
/* unused harmony export rangeChar */
/* harmony export (immutable) */ __webpack_exports__["k"] = range;
/* unused harmony export readOnly */
/* harmony export (immutable) */ __webpack_exports__["l"] = reduce;
/* unused harmony export reduceBack */
/* unused harmony export replicate */
/* unused harmony export reverse */
/* unused harmony export scan */
/* unused harmony export scanBack */
/* unused harmony export singleton */
/* unused harmony export skip */
/* unused harmony export skipWhile */
/* unused harmony export sortWith */
/* unused harmony export sum */
/* harmony export (immutable) */ __webpack_exports__["m"] = sumBy;
/* unused harmony export tail */
/* unused harmony export take */
/* unused harmony export truncate */
/* unused harmony export takeWhile */
/* unused harmony export tryFind */
/* unused harmony export find */
/* unused harmony export tryFindBack */
/* unused harmony export findBack */
/* harmony export (immutable) */ __webpack_exports__["o"] = tryFindIndex;
/* unused harmony export findIndex */
/* unused harmony export tryFindIndexBack */
/* unused harmony export findIndexBack */
/* harmony export (immutable) */ __webpack_exports__["p"] = tryPick;
/* harmony export (immutable) */ __webpack_exports__["j"] = pick;
/* unused harmony export unfold */
/* harmony export (immutable) */ __webpack_exports__["q"] = zip;
/* unused harmony export zip3 */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Array__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ListClass__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Option__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Util__ = __webpack_require__(3);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }






var Enumerator = function () {
    function Enumerator(iter) {
        _classCallCheck(this, Enumerator);

        this.iter = iter;
    }

    _createClass(Enumerator, [{
        key: "MoveNext",
        value: function MoveNext() {
            var cur = this.iter.next();
            this.current = cur.value;
            return !cur.done;
        }
    }, {
        key: "Reset",
        value: function Reset() {
            throw new Error("JS iterators cannot be reset");
        }
    }, {
        key: "Dispose",
        value: function Dispose() {
            return;
        }
    }, {
        key: "Current",
        get: function get() {
            return this.current;
        }
    }, {
        key: "get_Current",
        get: function get() {
            return this.current;
        }
    }]);

    return Enumerator;
}();
function getEnumerator(o) {
    return typeof o.GetEnumerator === "function" ? o.GetEnumerator() : new Enumerator(o[Symbol.iterator]());
}
function toIterator(en) {
    return {
        next: function next() {
            return en.MoveNext() ? { done: false, value: en.Current } : { done: true, value: null };
        }
    };
}
function __failIfNone(res) {
    if (res == null) {
        throw new Error("Seq did not contain any matching element");
    }
    return Object(__WEBPACK_IMPORTED_MODULE_2__Option__["c" /* getValue */])(res);
}
function toList(xs) {
    return foldBack(function (x, acc) {
        return new __WEBPACK_IMPORTED_MODULE_1__ListClass__["a" /* default */](x, acc);
    }, xs, new __WEBPACK_IMPORTED_MODULE_1__ListClass__["a" /* default */]());
}
function ofList(xs) {
    return delay(function () {
        return unfold(function (x) {
            return x.tail != null ? [x.head, x.tail] : null;
        }, xs);
    });
}
function ofArray(xs) {
    return delay(function () {
        return unfold(function (i) {
            return i < xs.length ? [xs[i], i + 1] : null;
        }, 0);
    });
}
function append(xs, ys) {
    return delay(function () {
        var firstDone = false;
        var i = xs[Symbol.iterator]();
        var iters = [i, null];
        return unfold(function () {
            var cur = void 0;
            if (!firstDone) {
                cur = iters[0].next();
                if (!cur.done) {
                    return [cur.value, iters];
                } else {
                    firstDone = true;
                    iters = [null, ys[Symbol.iterator]()];
                }
            }
            cur = iters[1].next();
            return !cur.done ? [cur.value, iters] : null;
        }, iters);
    });
}
function average(xs) {
    var count = 1;
    var sum = reduce(function (acc, x) {
        count++;
        return acc + x;
    }, xs);
    return sum / count;
}
function averageBy(f, xs) {
    var count = 1;
    var sum = reduce(function (acc, x) {
        count++;
        return (count === 2 ? f(acc) : acc) + f(x);
    }, xs);
    return sum / count;
}
function concat(xs) {
    return delay(function () {
        var iter = xs[Symbol.iterator]();
        var output = { value: null };
        return unfold(function (innerIter) {
            var hasFinished = false;
            while (!hasFinished) {
                if (innerIter == null) {
                    var cur = iter.next();
                    if (!cur.done) {
                        innerIter = cur.value[Symbol.iterator]();
                    } else {
                        hasFinished = true;
                    }
                } else {
                    var _cur = innerIter.next();
                    if (!_cur.done) {
                        output = { value: _cur.value };
                        hasFinished = true;
                    } else {
                        innerIter = null;
                    }
                }
            }
            return innerIter != null && output != null ? [output.value, innerIter] : null;
        }, null);
    });
}
function collect(f, xs) {
    return concat(map(f, xs));
}
function choose(f, xs) {
    return delay(function () {
        return unfold(function (iter) {
            var cur = iter.next();
            while (!cur.done) {
                var y = f(cur.value);
                if (y != null) {
                    return [Object(__WEBPACK_IMPORTED_MODULE_2__Option__["c" /* getValue */])(y), iter];
                }
                cur = iter.next();
            }
            return null;
        }, xs[Symbol.iterator]());
    });
}
function compareWith(f, xs, ys) {
    var nonZero = tryFind(function (i) {
        return i !== 0;
    }, map2(function (x, y) {
        return f(x, y);
    }, xs, ys));
    return nonZero != null ? Object(__WEBPACK_IMPORTED_MODULE_2__Option__["c" /* getValue */])(nonZero) : count(xs) - count(ys);
}
function delay(f) {
    return _defineProperty({}, Symbol.iterator, function () {
        return f()[Symbol.iterator]();
    });
}
function empty() {
    return unfold(function () {
        return void 0;
    });
}
function enumerateWhile(cond, xs) {
    return concat(unfold(function () {
        return cond() ? [xs, true] : null;
    }));
}
function enumerateThenFinally(xs, finalFn) {
    return delay(function () {
        var iter = void 0;
        try {
            iter = xs[Symbol.iterator]();
        } catch (err) {
            return void 0;
        } finally {
            finalFn();
        }
        return unfold(function (it) {
            try {
                var cur = it.next();
                return !cur.done ? [cur.value, it] : null;
            } catch (err) {
                return void 0;
            } finally {
                finalFn();
            }
        }, iter);
    });
}
function enumerateUsing(disp, work) {
    var isDisposed = false;
    var disposeOnce = function disposeOnce() {
        if (!isDisposed) {
            isDisposed = true;
            disp.Dispose();
        }
    };
    try {
        return enumerateThenFinally(work(disp), disposeOnce);
    } catch (err) {
        return void 0;
    } finally {
        disposeOnce();
    }
}
function exactlyOne(xs) {
    var iter = xs[Symbol.iterator]();
    var fst = iter.next();
    if (fst.done) {
        throw new Error("Seq was empty");
    }
    var snd = iter.next();
    if (!snd.done) {
        throw new Error("Seq had multiple items");
    }
    return fst.value;
}
function except(itemsToExclude, source) {
    var exclusionItems = Array.from(itemsToExclude);
    var testIsNotInExclusionItems = function testIsNotInExclusionItems(element) {
        return !exclusionItems.some(function (excludedItem) {
            return Object(__WEBPACK_IMPORTED_MODULE_3__Util__["j" /* equals */])(excludedItem, element);
        });
    };
    return filter(testIsNotInExclusionItems, source);
}
function exists(f, xs) {
    var cur = void 0;
    for (var iter = xs[Symbol.iterator]();;) {
        cur = iter.next();
        if (cur.done) {
            break;
        }
        if (f(cur.value)) {
            return true;
        }
    }
    return false;
}
function exists2(f, xs, ys) {
    var cur1 = void 0;
    var cur2 = void 0;
    for (var iter1 = xs[Symbol.iterator](), iter2 = ys[Symbol.iterator]();;) {
        cur1 = iter1.next();
        cur2 = iter2.next();
        if (cur1.done || cur2.done) {
            break;
        }
        if (f(cur1.value, cur2.value)) {
            return true;
        }
    }
    return false;
}
function filter(f, xs) {
    return delay(function () {
        return unfold(function (iter) {
            var cur = iter.next();
            while (!cur.done) {
                if (f(cur.value)) {
                    return [cur.value, iter];
                }
                cur = iter.next();
            }
            return null;
        }, xs[Symbol.iterator]());
    });
}
function where(f, xs) {
    return filter(f, xs);
}
function fold(f, acc, xs) {
    if (Array.isArray(xs) || ArrayBuffer.isView(xs)) {
        return xs.reduce(f, acc);
    } else {
        var cur = void 0;
        for (var i = 0, iter = xs[Symbol.iterator]();; i++) {
            cur = iter.next();
            if (cur.done) {
                break;
            }
            acc = f(acc, cur.value, i);
        }
        return acc;
    }
}
function foldBack(f, xs, acc) {
    var arr = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs : Array.from(xs);
    for (var i = arr.length - 1; i >= 0; i--) {
        acc = f(arr[i], acc, i);
    }
    return acc;
}
function fold2(f, acc, xs, ys) {
    var iter1 = xs[Symbol.iterator]();
    var iter2 = ys[Symbol.iterator]();
    var cur1 = void 0;
    var cur2 = void 0;
    for (var i = 0;; i++) {
        cur1 = iter1.next();
        cur2 = iter2.next();
        if (cur1.done || cur2.done) {
            break;
        }
        acc = f(acc, cur1.value, cur2.value, i);
    }
    return acc;
}
function foldBack2(f, xs, ys, acc) {
    var ar1 = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs : Array.from(xs);
    var ar2 = Array.isArray(ys) || ArrayBuffer.isView(ys) ? ys : Array.from(ys);
    for (var i = ar1.length - 1; i >= 0; i--) {
        acc = f(ar1[i], ar2[i], acc, i);
    }
    return acc;
}
function forAll(f, xs) {
    return fold(function (acc, x) {
        return acc && f(x);
    }, true, xs);
}
function forAll2(f, xs, ys) {
    return fold2(function (acc, x, y) {
        return acc && f(x, y);
    }, true, xs, ys);
}
function tryHead(xs) {
    var iter = xs[Symbol.iterator]();
    var cur = iter.next();
    return cur.done ? null : new __WEBPACK_IMPORTED_MODULE_2__Option__["a" /* Some */](cur.value);
}
function head(xs) {
    return __failIfNone(tryHead(xs));
}
function initialize(n, f) {
    return delay(function () {
        return unfold(function (i) {
            return i < n ? [f(i), i + 1] : null;
        }, 0);
    });
}
function initializeInfinite(f) {
    return delay(function () {
        return unfold(function (i) {
            return [f(i), i + 1];
        }, 0);
    });
}
function tryItem(i, xs) {
    if (i < 0) {
        return null;
    }
    if (Array.isArray(xs) || ArrayBuffer.isView(xs)) {
        return i < xs.length ? new __WEBPACK_IMPORTED_MODULE_2__Option__["a" /* Some */](xs[i]) : null;
    }
    for (var j = 0, iter = xs[Symbol.iterator]();; j++) {
        var cur = iter.next();
        if (cur.done) {
            break;
        }
        if (j === i) {
            return new __WEBPACK_IMPORTED_MODULE_2__Option__["a" /* Some */](cur.value);
        }
    }
    return null;
}
function item(i, xs) {
    return __failIfNone(tryItem(i, xs));
}
function iterate(f, xs) {
    fold(function (_, x) {
        return f(x);
    }, null, xs);
}
function iterate2(f, xs, ys) {
    fold2(function (_, x, y) {
        return f(x, y);
    }, null, xs, ys);
}
function iterateIndexed(f, xs) {
    fold(function (_, x, i) {
        return f(i, x);
    }, null, xs);
}
function iterateIndexed2(f, xs, ys) {
    fold2(function (_, x, y, i) {
        return f(i, x, y);
    }, null, xs, ys);
}
function isEmpty(xs) {
    var i = xs[Symbol.iterator]();
    return i.next().done;
}
function tryLast(xs) {
    try {
        return new __WEBPACK_IMPORTED_MODULE_2__Option__["a" /* Some */](reduce(function (_, x) {
            return x;
        }, xs));
    } catch (err) {
        return null;
    }
}
function last(xs) {
    return __failIfNone(tryLast(xs));
}
// A export function 'length' method causes problems in JavaScript -- https://github.com/Microsoft/TypeScript/issues/442
function count(xs) {
    return Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs.length : fold(function (acc, x) {
        return acc + 1;
    }, 0, xs);
}
function map(f, xs) {
    return delay(function () {
        return unfold(function (iter) {
            var cur = iter.next();
            return !cur.done ? [f(cur.value), iter] : null;
        }, xs[Symbol.iterator]());
    });
}
function mapIndexed(f, xs) {
    return delay(function () {
        var i = 0;
        return unfold(function (iter) {
            var cur = iter.next();
            return !cur.done ? [f(i++, cur.value), iter] : null;
        }, xs[Symbol.iterator]());
    });
}
function indexed(xs) {
    return mapIndexed(function (i, x) {
        return [i, x];
    }, xs);
}
function map2(f, xs, ys) {
    return delay(function () {
        var iter1 = xs[Symbol.iterator]();
        var iter2 = ys[Symbol.iterator]();
        return unfold(function () {
            var cur1 = iter1.next();
            var cur2 = iter2.next();
            return !cur1.done && !cur2.done ? [f(cur1.value, cur2.value), null] : null;
        });
    });
}
function mapIndexed2(f, xs, ys) {
    return delay(function () {
        var i = 0;
        var iter1 = xs[Symbol.iterator]();
        var iter2 = ys[Symbol.iterator]();
        return unfold(function () {
            var cur1 = iter1.next();
            var cur2 = iter2.next();
            return !cur1.done && !cur2.done ? [f(i++, cur1.value, cur2.value), null] : null;
        });
    });
}
function map3(f, xs, ys, zs) {
    return delay(function () {
        var iter1 = xs[Symbol.iterator]();
        var iter2 = ys[Symbol.iterator]();
        var iter3 = zs[Symbol.iterator]();
        return unfold(function () {
            var cur1 = iter1.next();
            var cur2 = iter2.next();
            var cur3 = iter3.next();
            return !cur1.done && !cur2.done && !cur3.done ? [f(cur1.value, cur2.value, cur3.value), null] : null;
        });
    });
}
function chunkBySize(size, xs) {
    var result = Object(__WEBPACK_IMPORTED_MODULE_0__Array__["a" /* chunkBySize */])(size, Array.from(xs));
    return ofArray(result.map(ofArray));
}
function mapFold(f, acc, xs, transform) {
    var result = [];
    var r = void 0;
    var cur = void 0;
    for (var i = 0, iter = xs[Symbol.iterator]();; i++) {
        cur = iter.next();
        if (cur.done) {
            break;
        }

        var _f = f(acc, cur.value);

        var _f2 = _slicedToArray(_f, 2);

        r = _f2[0];
        acc = _f2[1];

        result.push(r);
    }
    return transform !== void 0 ? [transform(result), acc] : [result, acc];
}
function mapFoldBack(f, xs, acc, transform) {
    var arr = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs : Array.from(xs);
    var result = [];
    var r = void 0;
    for (var i = arr.length - 1; i >= 0; i--) {
        var _f3 = f(arr[i], acc);

        var _f4 = _slicedToArray(_f3, 2);

        r = _f4[0];
        acc = _f4[1];

        result.push(r);
    }
    return transform !== void 0 ? [transform(result), acc] : [result, acc];
}
function max(xs) {
    return reduce(function (acc, x) {
        return Object(__WEBPACK_IMPORTED_MODULE_3__Util__["f" /* compare */])(acc, x) === 1 ? acc : x;
    }, xs);
}
function maxBy(f, xs) {
    return reduce(function (acc, x) {
        return Object(__WEBPACK_IMPORTED_MODULE_3__Util__["f" /* compare */])(f(acc), f(x)) === 1 ? acc : x;
    }, xs);
}
function min(xs) {
    return reduce(function (acc, x) {
        return Object(__WEBPACK_IMPORTED_MODULE_3__Util__["f" /* compare */])(acc, x) === -1 ? acc : x;
    }, xs);
}
function minBy(f, xs) {
    return reduce(function (acc, x) {
        return Object(__WEBPACK_IMPORTED_MODULE_3__Util__["f" /* compare */])(f(acc), f(x)) === -1 ? acc : x;
    }, xs);
}
function pairwise(xs) {
    return skip(2, scan(function (last, next) {
        return [last[1], next];
    }, [0, 0], xs));
}
function permute(f, xs) {
    return ofArray(Object(__WEBPACK_IMPORTED_MODULE_0__Array__["b" /* permute */])(f, Array.from(xs)));
}
function rangeStep(first, step, last) {
    if (step === 0) {
        throw new Error("Step cannot be 0");
    }
    return delay(function () {
        return unfold(function (x) {
            return step > 0 && x <= last || step < 0 && x >= last ? [x, x + step] : null;
        }, first);
    });
}
function rangeChar(first, last) {
    return delay(function () {
        return unfold(function (x) {
            return x <= last ? [x, String.fromCharCode(x.charCodeAt(0) + 1)] : null;
        }, first);
    });
}
function range(first, last) {
    return rangeStep(first, 1, last);
}
function readOnly(xs) {
    return map(function (x) {
        return x;
    }, xs);
}
function reduce(f, xs) {
    if (Array.isArray(xs) || ArrayBuffer.isView(xs)) {
        return xs.reduce(f);
    }
    var iter = xs[Symbol.iterator]();
    var cur = iter.next();
    if (cur.done) {
        throw new Error("Seq was empty");
    }
    var acc = cur.value;
    while (true) {
        cur = iter.next();
        if (cur.done) {
            break;
        }
        acc = f(acc, cur.value);
    }
    return acc;
}
function reduceBack(f, xs) {
    var ar = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs : Array.from(xs);
    if (ar.length === 0) {
        throw new Error("Seq was empty");
    }
    var acc = ar[ar.length - 1];
    for (var i = ar.length - 2; i >= 0; i--) {
        acc = f(ar[i], acc, i);
    }
    return acc;
}
function replicate(n, x) {
    return initialize(n, function () {
        return x;
    });
}
function reverse(xs) {
    var ar = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs.slice(0) : Array.from(xs);
    return ofArray(ar.reverse());
}
function scan(f, seed, xs) {
    return delay(function () {
        var iter = xs[Symbol.iterator]();
        return unfold(function (acc) {
            if (acc == null) {
                return [seed, seed];
            }
            var cur = iter.next();
            if (!cur.done) {
                acc = f(acc, cur.value);
                return [acc, acc];
            }
            return void 0;
        }, null);
    });
}
function scanBack(f, xs, seed) {
    return reverse(scan(function (acc, x) {
        return f(x, acc);
    }, seed, reverse(xs)));
}
function singleton(y) {
    return unfold(function (x) {
        return x != null ? [x, null] : null;
    }, y);
}
function skip(n, xs) {
    return _defineProperty({}, Symbol.iterator, function () {
        var iter = xs[Symbol.iterator]();
        for (var i = 1; i <= n; i++) {
            if (iter.next().done) {
                throw new Error("Seq has not enough elements");
            }
        }
        return iter;
    });
}
function skipWhile(f, xs) {
    return delay(function () {
        var hasPassed = false;
        return filter(function (x) {
            return hasPassed || (hasPassed = !f(x));
        }, xs);
    });
}
function sortWith(f, xs) {
    var ys = Array.from(xs);
    return ofArray(ys.sort(f));
}
function sum(xs) {
    return fold(function (acc, x) {
        return acc + x;
    }, 0, xs);
}
function sumBy(f, xs) {
    return fold(function (acc, x) {
        return acc + f(x);
    }, 0, xs);
}
function tail(xs) {
    var iter = xs[Symbol.iterator]();
    var cur = iter.next();
    if (cur.done) {
        throw new Error("Seq was empty");
    }
    return _defineProperty({}, Symbol.iterator, function () {
        return iter;
    });
}
function take(n, xs) {
    var truncate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    return delay(function () {
        var iter = xs[Symbol.iterator]();
        return unfold(function (i) {
            if (i < n) {
                var cur = iter.next();
                if (!cur.done) {
                    return [cur.value, i + 1];
                }
                if (!truncate) {
                    throw new Error("Seq has not enough elements");
                }
            }
            return void 0;
        }, 0);
    });
}
function truncate(n, xs) {
    return take(n, xs, true);
}
function takeWhile(f, xs) {
    return delay(function () {
        var iter = xs[Symbol.iterator]();
        return unfold(function (i) {
            var cur = iter.next();
            if (!cur.done && f(cur.value)) {
                return [cur.value, null];
            }
            return void 0;
        }, 0);
    });
}
function tryFind(f, xs, defaultValue) {
    for (var i = 0, iter = xs[Symbol.iterator]();; i++) {
        var cur = iter.next();
        if (cur.done) {
            break;
        }
        if (f(cur.value, i)) {
            return new __WEBPACK_IMPORTED_MODULE_2__Option__["a" /* Some */](cur.value);
        }
    }
    return defaultValue === void 0 ? null : new __WEBPACK_IMPORTED_MODULE_2__Option__["a" /* Some */](defaultValue);
}
function find(f, xs) {
    return __failIfNone(tryFind(f, xs));
}
function tryFindBack(f, xs, defaultValue) {
    var arr = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs.slice(0) : Array.from(xs);
    return tryFind(f, arr.reverse(), defaultValue);
}
function findBack(f, xs) {
    return __failIfNone(tryFindBack(f, xs));
}
function tryFindIndex(f, xs) {
    for (var i = 0, iter = xs[Symbol.iterator]();; i++) {
        var cur = iter.next();
        if (cur.done) {
            break;
        }
        if (f(cur.value, i)) {
            return i;
        }
    }
    return null;
}
function findIndex(f, xs) {
    return __failIfNone(tryFindIndex(f, xs));
}
function tryFindIndexBack(f, xs) {
    var arr = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs.slice(0) : Array.from(xs);
    for (var i = arr.length - 1; i >= 0; i--) {
        if (f(arr[i], i)) {
            return i;
        }
    }
    return null;
}
function findIndexBack(f, xs) {
    return __failIfNone(tryFindIndexBack(f, xs));
}
function tryPick(f, xs) {
    for (var i = 0, iter = xs[Symbol.iterator]();; i++) {
        var cur = iter.next();
        if (cur.done) {
            break;
        }
        var y = f(cur.value, i);
        if (y != null) {
            return y;
        }
    }
    return null;
}
function pick(f, xs) {
    return __failIfNone(tryPick(f, xs));
}
function unfold(f, fst) {
    return _defineProperty({}, Symbol.iterator, function () {
        // Capture a copy of the first value in the closure
        // so the sequence is restarted every time, see #1230
        var acc = fst;
        return {
            next: function next() {
                var res = f(acc);
                if (res != null) {
                    acc = res[1];
                    return { done: false, value: res[0] };
                }
                return { done: true };
            }
        };
    });
}
function zip(xs, ys) {
    return map2(function (x, y) {
        return [x, y];
    }, xs, ys);
}
function zip3(xs, ys, zs) {
    return map3(function (x, y, z) {
        return [x, y, z];
    }, xs, ys, zs);
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = setType;
/* unused harmony export getType */
var types = new Map();
function setType(fullName, cons) {
    types.set(fullName, cons);
}
function getType(fullName) {
    return types.get(fullName);
}
/* harmony default export */ __webpack_exports__["a"] = ({
    reflection: Symbol("reflection")
});

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export NonDeclaredType */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Any; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return Unit; });
/* harmony export (immutable) */ __webpack_exports__["c"] = Option;
/* unused harmony export Array */
/* harmony export (immutable) */ __webpack_exports__["d"] = Tuple;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FableFunction; });
/* unused harmony export GenericParam */
/* unused harmony export Interface */
/* harmony export (immutable) */ __webpack_exports__["m"] = makeGeneric;
/* unused harmony export isGeneric */
/* unused harmony export getDefinition */
/* unused harmony export extendInfo */
/* unused harmony export hasInterface */
/* unused harmony export getPropertyNames */
/* unused harmony export isArray */
/* harmony export (immutable) */ __webpack_exports__["n"] = toString;
/* unused harmony export hash */
/* harmony export (immutable) */ __webpack_exports__["j"] = equals;
/* harmony export (immutable) */ __webpack_exports__["g"] = comparePrimitives;
/* harmony export (immutable) */ __webpack_exports__["f"] = compare;
/* harmony export (immutable) */ __webpack_exports__["k"] = equalsRecords;
/* harmony export (immutable) */ __webpack_exports__["h"] = compareRecords;
/* harmony export (immutable) */ __webpack_exports__["l"] = equalsUnions;
/* harmony export (immutable) */ __webpack_exports__["i"] = compareUnions;
/* unused harmony export createDisposable */
/* unused harmony export createAtom */
/* unused harmony export createObj */
/* unused harmony export toPlainJsObj */
/* unused harmony export jsOptions */
/* unused harmony export round */
/* unused harmony export randomNext */
/* unused harmony export applyOperator */
/* unused harmony export parseNumber */
/* unused harmony export tryParse */
/* unused harmony export parse */
/* unused harmony export unescapeDataString */
/* unused harmony export escapeDataString */
/* unused harmony export escapeUriString */
/* unused harmony export clear */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Date__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Symbol__ = __webpack_require__(2);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var NonDeclaredType = function () {
    function NonDeclaredType(kind, definition, generics) {
        _classCallCheck(this, NonDeclaredType);

        this.kind = kind;
        this.definition = definition;
        this.generics = generics;
    }

    _createClass(NonDeclaredType, [{
        key: "Equals",
        value: function Equals(other) {
            if (this.kind === other.kind && this.definition === other.definition) {
                return _typeof(this.generics) === "object"
                // equalsRecords should also work for Type[] (tuples)
                ? equalsRecords(this.generics, other.generics) : this.generics === other.generics;
            }
            return false;
        }
    }]);

    return NonDeclaredType;
}();
var Any = new NonDeclaredType("Any");
var Unit = new NonDeclaredType("Unit");
function Option(t) {
    return new NonDeclaredType("Option", null, [t]);
}
function FableArray(t) {
    var isTypedArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var def = null;
    var genArg = null;
    if (isTypedArray) {
        def = t;
    } else {
        genArg = t;
    }
    return new NonDeclaredType("Array", def, [genArg]);
}

function Tuple(types) {
    return new NonDeclaredType("Tuple", null, types);
}
function FableFunction(types) {
    return new NonDeclaredType("Function", null, types);
}

function GenericParam(definition) {
    return new NonDeclaredType("GenericParam", definition);
}
function Interface(definition) {
    return new NonDeclaredType("Interface", definition);
}
function makeGeneric(typeDef, genArgs) {
    return new NonDeclaredType("GenericType", typeDef, genArgs);
}
function isGeneric(typ) {
    return typ instanceof NonDeclaredType && typ.kind === "GenericType";
}
/**
 * Returns the parent if this is a declared generic type or the argument otherwise.
 * Attention: Unlike .NET this doesn't throw an exception if type is not generic.
 */
function getDefinition(typ) {
    return isGeneric(typ) ? typ.definition : typ;
}
function extendInfo(cons, info) {
    var parent = Object.getPrototypeOf(cons.prototype);
    if (typeof parent[__WEBPACK_IMPORTED_MODULE_1__Symbol__["a" /* default */].reflection] === "function") {
        var newInfo = {};
        var parentInfo = parent[__WEBPACK_IMPORTED_MODULE_1__Symbol__["a" /* default */].reflection]();
        Object.getOwnPropertyNames(info).forEach(function (k) {
            var i = info[k];
            if ((typeof i === "undefined" ? "undefined" : _typeof(i)) === "object") {
                newInfo[k] = Array.isArray(i) ? (parentInfo[k] || []).concat(i) : Object.assign(parentInfo[k] || {}, i);
            } else {
                newInfo[k] = i;
            }
        });
        return newInfo;
    }
    return info;
}
function hasInterface(obj, interfaceName) {
    if (interfaceName === "System.Collections.Generic.IEnumerable") {
        return typeof obj[Symbol.iterator] === "function";
    } else if (typeof obj[__WEBPACK_IMPORTED_MODULE_1__Symbol__["a" /* default */].reflection] === "function") {
        var interfaces = obj[__WEBPACK_IMPORTED_MODULE_1__Symbol__["a" /* default */].reflection]().interfaces;
        return Array.isArray(interfaces) && interfaces.indexOf(interfaceName) > -1;
    }
    return false;
}
/**
 * Returns:
 * - Records: array with names of fields
 * - Classes: array with names of getters
 * - Nulls and unions: empty array
 * - JS Objects: The result of calling Object.getOwnPropertyNames
 */
function getPropertyNames(obj) {
    if (obj == null) {
        return [];
    }
    var propertyMap = typeof obj[__WEBPACK_IMPORTED_MODULE_1__Symbol__["a" /* default */].reflection] === "function" ? obj[__WEBPACK_IMPORTED_MODULE_1__Symbol__["a" /* default */].reflection]().properties || [] : obj;
    return Object.getOwnPropertyNames(propertyMap);
}
function isArray(obj) {
    return Array.isArray(obj) || ArrayBuffer.isView(obj);
}
function toString(obj) {
    var quoteStrings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    function isObject(x) {
        return x !== null && (typeof x === "undefined" ? "undefined" : _typeof(x)) === "object" && !(x instanceof Number) && !(x instanceof String) && !(x instanceof Boolean);
    }
    if (obj == null || typeof obj === "number") {
        return String(obj);
    }
    if (typeof obj === "string") {
        return quoteStrings ? JSON.stringify(obj) : obj;
    }
    if (obj instanceof Date) {
        return Object(__WEBPACK_IMPORTED_MODULE_0__Date__["c" /* toString */])(obj);
    }
    if (typeof obj.ToString === "function") {
        return obj.ToString();
    }
    if (hasInterface(obj, "FSharpUnion")) {
        var info = obj[__WEBPACK_IMPORTED_MODULE_1__Symbol__["a" /* default */].reflection]();
        var uci = info.cases[obj.tag];
        switch (uci.length) {
            case 1:
                return uci[0];
            case 2:
                // For simplicity let's always use parens, in .NET they're ommitted in some cases
                return uci[0] + " (" + toString(obj.data, true) + ")";
            default:
                return uci[0] + " (" + obj.data.map(function (x) {
                    return toString(x, true);
                }).join(",") + ")";
        }
    }
    try {
        return JSON.stringify(obj, function (k, v) {
            return v && v[Symbol.iterator] && !Array.isArray(v) && isObject(v) ? Array.from(v) : v && typeof v.ToString === "function" ? toString(v) : v;
        });
    } catch (err) {
        // Fallback for objects with circular references
        return "{" + Object.getOwnPropertyNames(obj).map(function (k) {
            return k + ": " + String(obj[k]);
        }).join(", ") + "}";
    }
}
function hash(x) {
    if (x != null && typeof x.GetHashCode === "function") {
        return x.GetHashCode();
    } else {
        var s = toString(x);
        var h = 5381;
        var i = 0;
        var len = s.length;
        while (i < len) {
            h = h * 33 ^ s.charCodeAt(i++);
        }
        return h;
    }
}
function equals(x, y) {
    // Optimization if they are referencially equal
    if (x === y) {
        return true;
    } else if (x == null) {
        return y == null;
    } else if (y == null) {
        return false;
        // Equals override or IEquatable implementation
    } else if (typeof x.Equals === "function") {
        return x.Equals(y);
    } else if (typeof y.Equals === "function") {
        return y.Equals(x);
    } else if (Object.getPrototypeOf(x) !== Object.getPrototypeOf(y)) {
        return false;
    } else if (Array.isArray(x)) {
        if (x.length !== y.length) {
            return false;
        }
        for (var i = 0; i < x.length; i++) {
            if (!equals(x[i], y[i])) {
                return false;
            }
        }
        return true;
    } else if (ArrayBuffer.isView(x)) {
        if (x.byteLength !== y.byteLength) {
            return false;
        }
        var dv1 = new DataView(x.buffer);
        var dv2 = new DataView(y.buffer);
        for (var _i = 0; _i < x.byteLength; _i++) {
            if (dv1.getUint8(_i) !== dv2.getUint8(_i)) {
                return false;
            }
        }
        return true;
    } else if (x instanceof Date) {
        return x.getTime() === y.getTime();
    } else {
        return false;
    }
}
function comparePrimitives(x, y) {
    return x === y ? 0 : x < y ? -1 : 1;
}
function compare(x, y) {
    // Optimization if they are referencially equal
    if (x === y) {
        return 0;
    } else if (x == null) {
        return y == null ? 0 : -1;
    } else if (y == null) {
        return 1; // everything is bigger than null
        // Some types (see Long.ts) may just implement the function and not the interface
        // else if (hasInterface(x, "System.IComparable"))
    } else if (typeof x.CompareTo === "function") {
        return x.CompareTo(y);
    } else if (typeof y.CompareTo === "function") {
        return y.CompareTo(x) * -1;
    } else if (Object.getPrototypeOf(x) !== Object.getPrototypeOf(y)) {
        return -1;
    } else if (Array.isArray(x)) {
        if (x.length !== y.length) {
            return x.length < y.length ? -1 : 1;
        }
        for (var i = 0, j = 0; i < x.length; i++) {
            j = compare(x[i], y[i]);
            if (j !== 0) {
                return j;
            }
        }
        return 0;
    } else if (ArrayBuffer.isView(x)) {
        if (x.byteLength !== y.byteLength) {
            return x.byteLength < y.byteLength ? -1 : 1;
        }
        var dv1 = new DataView(x.buffer);
        var dv2 = new DataView(y.buffer);
        for (var _i2 = 0, b1 = 0, b2 = 0; _i2 < x.byteLength; _i2++) {
            b1 = dv1.getUint8(_i2), b2 = dv2.getUint8(_i2);
            if (b1 < b2) {
                return -1;
            }
            if (b1 > b2) {
                return 1;
            }
        }
        return 0;
    } else if (x instanceof Date) {
        return Object(__WEBPACK_IMPORTED_MODULE_0__Date__["a" /* compare */])(x, y);
    } else if ((typeof x === "undefined" ? "undefined" : _typeof(x)) === "object") {
        var xhash = hash(x);
        var yhash = hash(y);
        if (xhash === yhash) {
            return equals(x, y) ? 0 : -1;
        } else {
            return xhash < yhash ? -1 : 1;
        }
    } else {
        return x < y ? -1 : 1;
    }
}
function equalsRecords(x, y) {
    // Optimization if they are referencially equal
    if (x === y) {
        return true;
    } else {
        var keys = getPropertyNames(x);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var key = _step.value;

                if (!equals(x[key], y[key])) {
                    return false;
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return true;
    }
}
function compareRecords(x, y) {
    // Optimization if they are referencially equal
    if (x === y) {
        return 0;
    } else {
        var keys = getPropertyNames(x);
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = keys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var key = _step2.value;

                var res = compare(x[key], y[key]);
                if (res !== 0) {
                    return res;
                }
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        return 0;
    }
}
function equalsUnions(x, y) {
    return x === y || x.tag === y.tag && equals(x.data, y.data);
}
function compareUnions(x, y) {
    if (x === y) {
        return 0;
    } else {
        var res = x.tag < y.tag ? -1 : x.tag > y.tag ? 1 : 0;
        return res !== 0 ? res : compare(x.data, y.data);
    }
}
function createDisposable(f) {
    return _defineProperty({
        Dispose: f
    }, __WEBPACK_IMPORTED_MODULE_1__Symbol__["a" /* default */].reflection, function () {
        return { interfaces: ["System.IDisposable"] };
    });
}
// tslint forbids non-arrow functions, but it's
// necessary here to use the arguments object
/* tslint:disable */
function createAtom(value) {
    var atom = value;
    return function () {
        return arguments.length === 0 ? atom : (atom = arguments[0], void 0);
    };
}
/* tslint:enable */
var CaseRules = {
    None: 0,
    LowerFirst: 1
};
function isList(o) {
    if (o != null) {
        if (typeof o[__WEBPACK_IMPORTED_MODULE_1__Symbol__["a" /* default */].reflection] === "function") {
            return o[__WEBPACK_IMPORTED_MODULE_1__Symbol__["a" /* default */].reflection]().type === "Microsoft.FSharp.Collections.FSharpList";
        }
    }
    return false;
}
function createObj(fields) {
    var caseRule = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : CaseRules.None;
    var casesCache = arguments[2];

    var iter = fields[Symbol.iterator]();
    var cur = iter.next();
    var o = {};
    while (!cur.done) {
        var value = cur.value;
        if (Array.isArray(value)) {
            o[value[0]] = value[1];
        } else {
            casesCache = casesCache || new Map();
            var proto = Object.getPrototypeOf(value);
            var cases = casesCache.get(proto);
            if (cases == null) {
                if (typeof proto[__WEBPACK_IMPORTED_MODULE_1__Symbol__["a" /* default */].reflection] === "function") {
                    cases = proto[__WEBPACK_IMPORTED_MODULE_1__Symbol__["a" /* default */].reflection]().cases;
                    casesCache.set(proto, cases);
                }
            }
            var caseInfo = cases != null ? cases[value.tag] : null;
            if (Array.isArray(caseInfo)) {
                var key = caseInfo[0];
                if (caseRule === CaseRules.LowerFirst) {
                    key = key[0].toLowerCase() + key.substr(1);
                }
                o[key] = caseInfo.length === 1 ? true : isList(value.data) ? createObj(value.data, caseRule, casesCache) : value.data;
            } else {
                throw new Error("Cannot infer key and value of " + value);
            }
        }
        cur = iter.next();
    }
    return o;
}
function toPlainJsObj(source) {
    if (source != null && source.constructor !== Object) {
        var target = {};
        var props = Object.getOwnPropertyNames(source);
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = props[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var p = _step3.value;

                target[p] = source[p];
            }
            // Copy also properties from prototype, see #192
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }

        var proto = Object.getPrototypeOf(source);
        if (proto != null) {
            props = Object.getOwnPropertyNames(proto);
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = props[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var _p = _step4.value;

                    var prop = Object.getOwnPropertyDescriptor(proto, _p);
                    if (prop.value) {
                        target[_p] = prop.value;
                    } else if (prop.get) {
                        target[_p] = prop.get.apply(source);
                    }
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }
        }
        return target;
    } else {
        return source;
    }
}
function jsOptions(mutator) {
    var opts = {};
    mutator(opts);
    return opts;
}
function round(value) {
    var digits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    var m = Math.pow(10, digits);
    var n = +(digits ? value * m : value).toFixed(8);
    var i = Math.floor(n);
    var f = n - i;
    var e = 1e-8;
    var r = f > 0.5 - e && f < 0.5 + e ? i % 2 === 0 ? i : i + 1 : Math.round(n);
    return digits ? r / m : r;
}
function randomNext(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function applyOperator(x, y, operator) {
    function getMethod(obj) {
        if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object") {
            var cons = Object.getPrototypeOf(obj).constructor;
            if (typeof cons[operator] === "function") {
                return cons[operator];
            }
        }
        return null;
    }
    var meth = getMethod(x);
    if (meth != null) {
        return meth(x, y);
    }
    meth = getMethod(y);
    if (meth != null) {
        return meth(x, y);
    }
    switch (operator) {
        case "op_Addition":
            return x + y;
        case "op_Subtraction":
            return x - y;
        case "op_Multiply":
            return x * y;
        case "op_Division":
            return x / y;
        case "op_Modulus":
            return x % y;
        case "op_LeftShift":
            return x << y;
        case "op_RightShift":
            return x >> y;
        case "op_BitwiseAnd":
            return x & y;
        case "op_BitwiseOr":
            return x | y;
        case "op_ExclusiveOr":
            return x ^ y;
        case "op_LogicalNot":
            return x + y;
        case "op_UnaryNegation":
            return !x;
        case "op_BooleanAnd":
            return x && y;
        case "op_BooleanOr":
            return x || y;
        default:
            return null;
    }
}
function parseNumber(v) {
    return +v;
}
function tryParse(v, initial, parser, fn) {
    if (v != null) {
        var a = parser.exec(v);
        if (a !== null) {
            return [true, fn(a[1])];
        }
    }
    return [false, initial];
}
function parse(v, initial, parser, fn) {
    var a = tryParse(v, initial, parser, fn);
    if (a[0]) {
        return a[1];
    } else {
        // TODO FormatException ?
        throw new Error("Input string was not in a correct format.");
    }
}
function unescapeDataString(s) {
    // https://stackoverflow.com/a/4458580/524236
    return decodeURIComponent(s.replace(/\+/g, "%20"));
}
function escapeDataString(s) {
    return encodeURIComponent(s).replace(/!/g, "%21").replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A");
}
function escapeUriString(s) {
    return encodeURI(s);
}
// ICollection.Clear method can be called on IDictionary
// too so we need to make a runtime check (see #1120)
function clear(col) {
    if (Array.isArray(col)) {
        col.splice(0);
    } else {
        col.clear();
    }
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = CurriedLambda;
/* harmony export (immutable) */ __webpack_exports__["b"] = partialApply;
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function CurriedLambda(f, expectedArgsLength) {
    if (f.curried === true) {
        return f;
    }
    var curriedFn = function curriedFn() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        // _this = _this || this;
        var actualArgsLength = Math.max(args.length, 1);
        expectedArgsLength = Math.max(expectedArgsLength || f.length, 1);
        if (actualArgsLength >= expectedArgsLength) {
            var restArgs = args.splice(expectedArgsLength);
            var res = f.apply(undefined, args);
            if (typeof res === "function") {
                var newLambda = CurriedLambda(res);
                return restArgs.length === 0 ? newLambda : newLambda.apply(undefined, _toConsumableArray(restArgs));
            } else {
                return res;
            }
        } else {
            return CurriedLambda(function () {
                for (var _len2 = arguments.length, args2 = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args2[_key2] = arguments[_key2];
                }

                return f.apply(undefined, _toConsumableArray(args.concat(args2)));
            }, expectedArgsLength - actualArgsLength);
        }
    };
    curriedFn.curried = true;
    return curriedFn;
}
function partialApply(f, args) {
    var args2 = args.map(function (x) {
        return typeof x === "function" && !x.curried ? CurriedLambda(x) : x;
    });
    var lambda = f.curried === true ? f : CurriedLambda(f);
    return lambda.apply(undefined, _toConsumableArray(args2));
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Some; });
/* harmony export (immutable) */ __webpack_exports__["c"] = getValue;
/* harmony export (immutable) */ __webpack_exports__["b"] = defaultArg;
/* unused harmony export defaultArgWith */
/* unused harmony export filter */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Util__ = __webpack_require__(3);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }


// Options are erased in runtime by Fable, but some cases
// (unit, not resolved generics, nested options) are wrapped
// by the following JS type (for Some cases)
// So options in Fable follow these two rules:
// 1- None is always null in runtime, so a non-strict null check
//    (`x == null`) is enough to check the case of an option.
// 2- To get the value of an option the `getValue` helper
//    below must **always** be used.
var Some = function () {
    function Some(value) {
        _classCallCheck(this, Some);

        this.value = value;
        this.value = value;
    }
    // We don't prefix it with "Some" for consistency with erased options


    _createClass(Some, [{
        key: "ToString",
        value: function ToString() {
            return Object(__WEBPACK_IMPORTED_MODULE_0__Util__["n" /* toString */])(this.value);
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            if (other == null) {
                return false;
            } else {
                return Object(__WEBPACK_IMPORTED_MODULE_0__Util__["j" /* equals */])(this.value, other instanceof Some ? other.value : other);
            }
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            if (other == null) {
                return 1;
            } else {
                return Object(__WEBPACK_IMPORTED_MODULE_0__Util__["f" /* compare */])(this.value, other instanceof Some ? other.value : other);
            }
        }
    }]);

    return Some;
}();
function getValue(x, acceptNull) {
    if (x == null) {
        if (!acceptNull) {
            throw new Error("Option has no value");
        }
        return null;
    } else {
        return x instanceof Some ? x.value : x;
    }
}
function defaultArg(arg, defaultValue, f) {
    return arg == null ? defaultValue : f != null ? f(getValue(arg)) : getValue(arg);
}
function defaultArgWith(arg, defThunk) {
    return arg == null ? defThunk() : getValue(arg);
}
function filter(predicate, arg) {
    return arg != null ? !predicate(getValue(arg)) ? null : arg : arg;
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export compare */
/* unused harmony export compareTo */
/* unused harmony export startsWith */
/* unused harmony export indexOfAny */
/* harmony export (immutable) */ __webpack_exports__["b"] = printf;
/* harmony export (immutable) */ __webpack_exports__["e"] = toConsole;
/* harmony export (immutable) */ __webpack_exports__["g"] = toText;
/* harmony export (immutable) */ __webpack_exports__["f"] = toFail;
/* unused harmony export fsFormat */
/* unused harmony export format */
/* unused harmony export endsWith */
/* unused harmony export initialize */
/* unused harmony export insert */
/* unused harmony export isNullOrEmpty */
/* unused harmony export isNullOrWhiteSpace */
/* harmony export (immutable) */ __webpack_exports__["a"] = join;
/* unused harmony export validateGuid */
/* unused harmony export newGuid */
/* unused harmony export guidToArray */
/* unused harmony export arrayToGuid */
/* unused harmony export toBase64String */
/* unused harmony export fromBase64String */
/* unused harmony export padLeft */
/* unused harmony export padRight */
/* unused harmony export remove */
/* harmony export (immutable) */ __webpack_exports__["c"] = replace;
/* harmony export (immutable) */ __webpack_exports__["d"] = replicate;
/* unused harmony export getCharAtIndex */
/* unused harmony export split */
/* harmony export (immutable) */ __webpack_exports__["h"] = trim;
/* unused harmony export filter */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Date__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__RegExp__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Util__ = __webpack_require__(3);



var fsFormatRegExp = /(^|[^%])%([0+ ]*)(-?\d+)?(?:\.(\d+))?(\w)/;
var formatRegExp = /\{(\d+)(,-?\d+)?(?:\:(.+?))?\}/g;
// From https://stackoverflow.com/a/13653180/3922220
var guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
var StringComparison = {
    CurrentCulture: 0,
    CurrentCultureIgnoreCase: 1,
    InvariantCulture: 2,
    InvariantCultureIgnoreCase: 3,
    Ordinal: 4,
    OrdinalIgnoreCase: 5
};
function cmp(x, y, ic) {
    function isIgnoreCase(i) {
        return i === true || i === StringComparison.CurrentCultureIgnoreCase || i === StringComparison.InvariantCultureIgnoreCase || i === StringComparison.OrdinalIgnoreCase;
    }
    function isOrdinal(i) {
        return i === StringComparison.Ordinal || i === StringComparison.OrdinalIgnoreCase;
    }
    if (x == null) {
        return y == null ? 0 : -1;
    }
    if (y == null) {
        return 1;
    } // everything is bigger than null
    if (isOrdinal(ic)) {
        if (isIgnoreCase(ic)) {
            x = x.toLowerCase();
            y = y.toLowerCase();
        }
        return x === y ? 0 : x < y ? -1 : 1;
    } else {
        if (isIgnoreCase(ic)) {
            x = x.toLocaleLowerCase();
            y = y.toLocaleLowerCase();
        }
        return x.localeCompare(y);
    }
}
function compare() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    switch (args.length) {
        case 2:
            return cmp(args[0], args[1], false);
        case 3:
            return cmp(args[0], args[1], args[2]);
        case 4:
            return cmp(args[0], args[1], args[2] === true);
        case 5:
            return cmp(args[0].substr(args[1], args[4]), args[2].substr(args[3], args[4]), false);
        case 6:
            return cmp(args[0].substr(args[1], args[4]), args[2].substr(args[3], args[4]), args[5]);
        case 7:
            return cmp(args[0].substr(args[1], args[4]), args[2].substr(args[3], args[4]), args[5] === true);
        default:
            throw new Error("String.compare: Unsupported number of parameters");
    }
}
function compareTo(x, y) {
    return cmp(x, y, false);
}
function startsWith(str, pattern, ic) {
    if (str.length >= pattern.length) {
        return cmp(str.substr(0, pattern.length), pattern, ic) === 0;
    }
    return false;
}
function indexOfAny(str, anyOf) {
    if (str == null || str === "") {
        return -1;
    }
    var startIndex = (arguments.length <= 2 ? 0 : arguments.length - 2) > 0 ? arguments.length <= 2 ? undefined : arguments[2] : 0;
    if (startIndex < 0) {
        throw new Error("String.indexOfAny: Start index cannot be negative");
    }
    var length = (arguments.length <= 2 ? 0 : arguments.length - 2) > 1 ? arguments.length <= 3 ? undefined : arguments[3] : str.length - startIndex;
    if (length < 0) {
        throw new Error("String.indexOfAny: Length cannot be negative");
    }
    if (length > str.length - startIndex) {
        throw new Error("String.indexOfAny: Invalid startIndex and length");
    }
    str = str.substr(startIndex, length);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = anyOf[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var c = _step.value;

            var index = str.indexOf(c);
            if (index > -1) {
                return index + startIndex;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return -1;
}
function toHex(value) {
    return value < 0 ? "ff" + (16777215 - (Math.abs(value) - 1)).toString(16) : value.toString(16);
}
function printf(input) {
    return {
        input: input,
        cont: fsFormat(input)
    };
}
function toConsole(arg) {
    return arg.cont(function (x) {
        console.log(x);
    });
}
function toText(arg) {
    return arg.cont(function (x) {
        return x;
    });
}
function toFail(arg) {
    return arg.cont(function (x) {
        throw new Error(x);
    });
}
function formatOnce(str2, rep) {
    return str2.replace(fsFormatRegExp, function (_, prefix, flags, pad, precision, format) {
        switch (format) {
            case "f":
            case "F":
                rep = rep.toFixed(precision || 6);
                break;
            case "g":
            case "G":
                rep = rep.toPrecision(precision);
                break;
            case "e":
            case "E":
                rep = rep.toExponential(precision);
                break;
            case "O":
                rep = Object(__WEBPACK_IMPORTED_MODULE_2__Util__["n" /* toString */])(rep);
                break;
            case "A":
                rep = Object(__WEBPACK_IMPORTED_MODULE_2__Util__["n" /* toString */])(rep, true);
                break;
            case "x":
                rep = toHex(Number(rep));
                break;
            case "X":
                rep = toHex(Number(rep)).toUpperCase();
                break;
        }
        var plusPrefix = flags.indexOf("+") >= 0 && parseInt(rep, 10) >= 0;
        pad = parseInt(pad, 10);
        if (!isNaN(pad)) {
            var ch = pad >= 0 && flags.indexOf("0") >= 0 ? "0" : " ";
            rep = padLeft(rep, Math.abs(pad) - (plusPrefix ? 1 : 0), ch, pad < 0);
        }
        var once = prefix + (plusPrefix ? "+" + rep : rep);
        return once.replace(/%/g, "%%");
    });
}
function createPrinter(str, cont) {
    var printer = function printer() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        // Make a copy as the function may be used several times
        var strCopy = str;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = args[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var arg = _step2.value;

                strCopy = formatOnce(strCopy, arg);
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        return fsFormatRegExp.test(strCopy) ? createPrinter(strCopy, cont) : cont(strCopy.replace(/%%/g, "%"));
    };
    // Mark it as curried so it doesn't
    // get wrapped by CurriedLambda
    printer.curried = true;
    return printer;
}
function fsFormat(str) {
    return function (cont) {
        return fsFormatRegExp.test(str) ? createPrinter(str, cont) : cont(str);
    };
}
function format(str) {
    for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
    }

    return str.replace(formatRegExp, function (match, idx, pad, pattern) {
        var rep = args[idx];
        var padSymbol = " ";
        if (typeof rep === "number") {
            switch ((pattern || "").substring(0, 1)) {
                case "f":
                case "F":
                    rep = pattern.length > 1 ? rep.toFixed(pattern.substring(1)) : rep.toFixed(2);
                    break;
                case "g":
                case "G":
                    rep = pattern.length > 1 ? rep.toPrecision(pattern.substring(1)) : rep.toPrecision();
                    break;
                case "e":
                case "E":
                    rep = pattern.length > 1 ? rep.toExponential(pattern.substring(1)) : rep.toExponential();
                    break;
                case "p":
                case "P":
                    rep = (pattern.length > 1 ? (rep * 100).toFixed(pattern.substring(1)) : (rep * 100).toFixed(2)) + " %";
                    break;
                case "x":
                    rep = toHex(Number(rep));
                    break;
                case "X":
                    rep = toHex(Number(rep)).toUpperCase();
                    break;
                default:
                    var m = /^(0+)(\.0+)?$/.exec(pattern);
                    if (m != null) {
                        var decs = 0;
                        if (m[2] != null) {
                            rep = rep.toFixed(decs = m[2].length - 1);
                        }
                        pad = "," + (m[1].length + (decs ? decs + 1 : 0)).toString();
                        padSymbol = "0";
                    } else if (pattern) {
                        rep = pattern;
                    }
            }
        } else if (typeof rep.ToString === "function") {
            rep = rep.ToString(pattern);
        } else if (rep instanceof Date) {
            rep = Object(__WEBPACK_IMPORTED_MODULE_0__Date__["c" /* toString */])(rep, pattern);
        }
        pad = parseInt((pad || "").substring(1), 10);
        if (!isNaN(pad)) {
            rep = padLeft(rep, Math.abs(pad), padSymbol, pad < 0);
        }
        return rep;
    });
}
function endsWith(str, search) {
    var idx = str.lastIndexOf(search);
    return idx >= 0 && idx === str.length - search.length;
}
function initialize(n, f) {
    if (n < 0) {
        throw new Error("String length must be non-negative");
    }
    var xs = new Array(n);
    for (var i = 0; i < n; i++) {
        xs[i] = f(i);
    }
    return xs.join("");
}
function insert(str, startIndex, value) {
    if (startIndex < 0 || startIndex > str.length) {
        throw new Error("startIndex is negative or greater than the length of this instance.");
    }
    return str.substring(0, startIndex) + value + str.substring(startIndex);
}
function isNullOrEmpty(str) {
    return typeof str !== "string" || str.length === 0;
}
function isNullOrWhiteSpace(str) {
    return typeof str !== "string" || /^\s*$/.test(str);
}
function join(delimiter, xs) {
    var xs2 = typeof xs === "string" ? [xs] : xs;
    var len = arguments.length;
    if (len > 2) {
        xs2 = Array(len - 1);
        for (var key = 1; key < len; key++) {
            xs2[key - 1] = arguments[key];
        }
    } else if (!Array.isArray(xs2)) {
        xs2 = Array.from(xs2);
    }
    return xs2.map(function (x) {
        return Object(__WEBPACK_IMPORTED_MODULE_2__Util__["n" /* toString */])(x);
    }).join(delimiter);
}
/** Validates UUID as specified in RFC4122 (versions 1-5). Trims braces. */
function validateGuid(str, doNotThrow) {
    var trimmed = trim(str, "both", "{", "}");
    if (guidRegex.test(trimmed)) {
        return doNotThrow ? [true, trimmed] : trimmed;
    } else if (doNotThrow) {
        return [false, "00000000-0000-0000-0000-000000000000"];
    }
    throw new Error("Guid should contain 32 digits with 4 dashes: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");
}
/* tslint:disable */
// From https://gist.github.com/LeverOne/1308368
function newGuid() {
    var b = "";
    for (var a = 0; a++ < 36; b += a * 51 & 52 ? (a ^ 15 ? 8 ^ Math.random() * (a ^ 20 ? 16 : 4) : 4).toString(16) : "-") {}
    return b;
}
// Maps for number <-> hex string conversion
var _convertMapsInitialized = false;
var _byteToHex = void 0;
var _hexToByte = void 0;
function initConvertMaps() {
    _byteToHex = new Array(256);
    _hexToByte = {};
    for (var i = 0; i < 256; i++) {
        _byteToHex[i] = (i + 0x100).toString(16).substr(1);
        _hexToByte[_byteToHex[i]] = i;
    }
    _convertMapsInitialized = true;
}
/** Parse a UUID into it's component bytes */
// Adapted from https://github.com/zefferus/uuid-parse
function guidToArray(s) {
    if (!_convertMapsInitialized) {
        initConvertMaps();
    }
    var i = 0;
    var buf = new Uint8Array(16);
    s.toLowerCase().replace(/[0-9a-f]{2}/g, function (oct) {
        switch (i) {
            // .NET saves first three byte groups with differten endianness
            // See https://stackoverflow.com/a/16722909/3922220
            case 0:
            case 1:
            case 2:
            case 3:
                buf[3 - i++] = _hexToByte[oct];
                break;
            case 4:
            case 5:
                buf[9 - i++] = _hexToByte[oct];
                break;
            case 6:
            case 7:
                buf[13 - i++] = _hexToByte[oct];
                break;
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
                buf[i++] = _hexToByte[oct];
                break;
        }
    });
    // Zero out remaining bytes if string was short
    while (i < 16) {
        buf[i++] = 0;
    }
    return buf;
}
/** Convert UUID byte array into a string */
function arrayToGuid(buf) {
    if (buf.length !== 16) {
        throw new Error("Byte array for GUID must be exactly 16 bytes long");
    }
    if (!_convertMapsInitialized) {
        initConvertMaps();
    }
    return _byteToHex[buf[3]] + _byteToHex[buf[2]] + _byteToHex[buf[1]] + _byteToHex[buf[0]] + "-" + _byteToHex[buf[5]] + _byteToHex[buf[4]] + "-" + _byteToHex[buf[7]] + _byteToHex[buf[6]] + "-" + _byteToHex[buf[8]] + _byteToHex[buf[9]] + "-" + _byteToHex[buf[10]] + _byteToHex[buf[11]] + _byteToHex[buf[12]] + _byteToHex[buf[13]] + _byteToHex[buf[14]] + _byteToHex[buf[15]];
}
/* tslint:enable */
function notSupported(name) {
    throw new Error("The environment doesn't support '" + name + "', please use a polyfill.");
}
function toBase64String(inArray) {
    var str = "";
    for (var i = 0; i < inArray.length; i++) {
        str += String.fromCharCode(inArray[i]);
    }
    return typeof btoa === "function" ? btoa(str) : notSupported("btoa");
}
function fromBase64String(b64Encoded) {
    var binary = typeof atob === "function" ? atob(b64Encoded) : notSupported("atob");
    var bytes = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
}
function padLeft(str, len, ch, isRight) {
    ch = ch || " ";
    str = String(str);
    len = len - str.length;
    for (var i = 0; i < len; i++) {
        str = isRight ? str + ch : ch + str;
    }
    return str;
}
function padRight(str, len, ch) {
    return padLeft(str, len, ch, true);
}
function remove(str, startIndex, count) {
    if (startIndex >= str.length) {
        throw new Error("startIndex must be less than length of string");
    }
    if (typeof count === "number" && startIndex + count > str.length) {
        throw new Error("Index and count must refer to a location within the string.");
    }
    return str.slice(0, startIndex) + (typeof count === "number" ? str.substr(startIndex + count) : "");
}
function replace(str, search, replace) {
    return str.replace(new RegExp(Object(__WEBPACK_IMPORTED_MODULE_1__RegExp__["b" /* escape */])(search), "g"), replace);
}
function replicate(n, x) {
    return initialize(n, function () {
        return x;
    });
}
function getCharAtIndex(input, index) {
    if (index < 0 || index > input.length) {
        throw new Error("System.IndexOutOfRangeException: Index was outside the bounds of the array.");
    }
    return input[index];
}
function split(str, splitters, count, removeEmpty) {
    count = typeof count === "number" ? count : null;
    removeEmpty = typeof removeEmpty === "number" ? removeEmpty : null;
    if (count < 0) {
        throw new Error("Count cannot be less than zero");
    }
    if (count === 0) {
        return [];
    }
    var splitters2 = splitters;
    if (!Array.isArray(splitters)) {
        var len = arguments.length;
        splitters2 = Array(len - 1);
        for (var key = 1; key < len; key++) {
            splitters2[key - 1] = arguments[key];
        }
    }
    splitters2 = splitters2.map(function (x) {
        return Object(__WEBPACK_IMPORTED_MODULE_1__RegExp__["b" /* escape */])(x);
    });
    splitters2 = splitters2.length > 0 ? splitters2 : [" "];
    var i = 0;
    var splits = [];
    var reg = new RegExp(splitters2.join("|"), "g");
    while (count == null || count > 1) {
        var m = reg.exec(str);
        if (m === null) {
            break;
        }
        if (!removeEmpty || m.index - i > 0) {
            count = count != null ? count - 1 : count;
            splits.push(str.substring(i, m.index));
        }
        i = reg.lastIndex;
    }
    if (!removeEmpty || str.length - i > 0) {
        splits.push(str.substring(i));
    }
    return splits;
}
function trim(str, side) {
    for (var _len4 = arguments.length, chars = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
        chars[_key4 - 2] = arguments[_key4];
    }

    if (side === "both" && chars.length === 0) {
        return str.trim();
    }
    if (side === "start" || side === "both") {
        var reg = chars.length === 0 ? /^\s+/ : new RegExp("^[" + Object(__WEBPACK_IMPORTED_MODULE_1__RegExp__["b" /* escape */])(chars.join("")) + "]+");
        str = str.replace(reg, "");
    }
    if (side === "end" || side === "both") {
        var _reg = chars.length === 0 ? /\s+$/ : new RegExp("[" + Object(__WEBPACK_IMPORTED_MODULE_1__RegExp__["b" /* escape */])(chars.join("")) + "]+$");
        str = str.replace(_reg, "");
    }
    return str;
}
function filter(pred, x) {
    return x.split("").filter(pred).join("");
}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return Language; });
/* unused harmony export ID */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return Token; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return TFrmtedString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return InlineElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return THeader; });
/* unused harmony export Ttoc */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return TListType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return TList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return TListItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Alignment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Cell; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return Row; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return PCell; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return PRow; });
/* unused harmony export RefFrmt */
/* unused harmony export RefType */
/* unused harmony export Ref */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return ParsedObj; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return OutFormat; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





var Language = function () {
    function Language(tag, data) {
        _classCallCheck(this, Language);

        this.tag = tag;
        this.data = data;
    }

    _createClass(Language, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Types.Language",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: [["Python"], ["FSharp"], ["CPP"], ["C"], ["Empty"]]
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return this === other || this.tag === other.tag && Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["j" /* equals */])(this.data, other.data);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["i" /* compareUnions */])(this, other) | 0;
        }
    }]);

    return Language;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["b" /* setType */])("Types.Language", Language);
var ID = function () {
    function ID(tag, data) {
        _classCallCheck(this, ID);

        this.tag = tag;
        this.data = data;
    }

    _createClass(ID, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Types.ID",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: [["FtID", "number"], ["RefID", "string"]]
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return this === other || this.tag === other.tag && Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["j" /* equals */])(this.data, other.data);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["i" /* compareUnions */])(this, other) | 0;
        }
    }]);

    return ID;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["b" /* setType */])("Types.ID", ID);
var Token = function () {
    function Token(tag, data) {
        _classCallCheck(this, Token);

        this.tag = tag;
        this.data = data;
    }

    _createClass(Token, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Types.Token",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: [["CODEBLOCK", "string", Language], ["LITERAL", "string"], ["WHITESPACE", "number"], ["NUMBER", "string"], ["HASH"], ["PIPE"], ["EQUAL"], ["MINUS"], ["PLUS"], ["ASTERISK"], ["DOT"], ["COMMA"], ["DASTERISK"], ["TASTERISK"], ["UNDERSCORE"], ["DUNDERSCORE"], ["TUNDERSCORE"], ["TILDE"], ["DTILDE"], ["TTILDE"], ["LSBRA"], ["RSBRA"], ["LBRA"], ["RBRA"], ["BSLASH"], ["SLASH"], ["LABRA"], ["RABRA"], ["LCBRA"], ["RCBRA"], ["BACKTICK"], ["EXCLAMATION"], ["ENDLINE"], ["COLON"], ["CARET"], ["PERCENT"], ["SEMICOLON"], ["HEADER", "number"], ["FOOTER", ID]]
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return this === other || this.tag === other.tag && Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["j" /* equals */])(this.data, other.data);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["i" /* compareUnions */])(this, other) | 0;
        }
    }]);

    return Token;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["b" /* setType */])("Types.Token", Token);
var TFrmtedString = function () {
    function TFrmtedString(tag, data) {
        _classCallCheck(this, TFrmtedString);

        this.tag = tag;
        this.data = data;
    }

    _createClass(TFrmtedString, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Types.TFrmtedString",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: [["Strong", Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["m" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */], {
                    T: InlineElement
                })], ["Emphasis", Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["m" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */], {
                    T: InlineElement
                })], ["Literal", "string"], ["Code", "string"]]
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return this === other || this.tag === other.tag && Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["j" /* equals */])(this.data, other.data);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["i" /* compareUnions */])(this, other) | 0;
        }
    }]);

    return TFrmtedString;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["b" /* setType */])("Types.TFrmtedString", TFrmtedString);
var InlineElement = function () {
    function InlineElement(tag, data) {
        _classCallCheck(this, InlineElement);

        this.tag = tag;
        this.data = data;
    }

    _createClass(InlineElement, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Types.InlineElement",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: [["FrmtedString", TFrmtedString], ["Link", TFrmtedString, "string"], ["Picture", "string", "string"]]
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return this === other || this.tag === other.tag && Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["j" /* equals */])(this.data, other.data);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["i" /* compareUnions */])(this, other) | 0;
        }
    }]);

    return InlineElement;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["b" /* setType */])("Types.InlineElement", InlineElement);
var THeader = function () {
    function THeader(headerName, level) {
        _classCallCheck(this, THeader);

        this.HeaderName = headerName;
        this.Level = level | 0;
    }

    _createClass(THeader, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Types.THeader",
                interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
                properties: {
                    HeaderName: Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["m" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */], {
                        T: InlineElement
                    }),
                    Level: "number"
                }
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["k" /* equalsRecords */])(this, other);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["h" /* compareRecords */])(this, other) | 0;
        }
    }]);

    return THeader;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["b" /* setType */])("Types.THeader", THeader);
var Ttoc = function () {
    function Ttoc(maxDepth, headerLst) {
        _classCallCheck(this, Ttoc);

        this.MaxDepth = maxDepth | 0;
        this.HeaderLst = headerLst;
    }

    _createClass(Ttoc, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Types.Ttoc",
                interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
                properties: {
                    MaxDepth: "number",
                    HeaderLst: Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["m" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */], {
                        T: THeader
                    })
                }
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["k" /* equalsRecords */])(this, other);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["h" /* compareRecords */])(this, other) | 0;
        }
    }]);

    return Ttoc;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["b" /* setType */])("Types.Ttoc", Ttoc);
var TListType = function () {
    function TListType(tag, data) {
        _classCallCheck(this, TListType);

        this.tag = tag;
        this.data = data;
    }

    _createClass(TListType, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Types.TListType",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: [["UL"], ["OL"]]
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return this === other || this.tag === other.tag && Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["j" /* equals */])(this.data, other.data);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["i" /* compareUnions */])(this, other) | 0;
        }
    }]);

    return TListType;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["b" /* setType */])("Types.TListType", TListType);
var TList = function () {
    function TList(listType, listItem, depth) {
        _classCallCheck(this, TList);

        this.ListType = listType;
        this.ListItem = listItem;
        this.Depth = depth | 0;
    }

    _createClass(TList, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Types.TList",
                interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
                properties: {
                    ListType: TListType,
                    ListItem: Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["m" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */], {
                        T: TListItem
                    }),
                    Depth: "number"
                }
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["k" /* equalsRecords */])(this, other);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["h" /* compareRecords */])(this, other) | 0;
        }
    }]);

    return TList;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["b" /* setType */])("Types.TList", TList);
var TListItem = function () {
    function TListItem(tag, data) {
        _classCallCheck(this, TListItem);

        this.tag = tag;
        this.data = data;
    }

    _createClass(TListItem, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Types.TListItem",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: [["NestedList", TList], ["StringItem", Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["m" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */], {
                    T: InlineElement
                })]]
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return this === other || this.tag === other.tag && Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["j" /* equals */])(this.data, other.data);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["i" /* compareUnions */])(this, other) | 0;
        }
    }]);

    return TListItem;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["b" /* setType */])("Types.TListItem", TListItem);
var Alignment = function () {
    function Alignment(tag, data) {
        _classCallCheck(this, Alignment);

        this.tag = tag;
        this.data = data;
    }

    _createClass(Alignment, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Types.Alignment",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: [["Centre"], ["Right"], ["Left"], ["NoAlign"]]
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return this === other || this.tag === other.tag && Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["j" /* equals */])(this.data, other.data);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["i" /* compareUnions */])(this, other) | 0;
        }
    }]);

    return Alignment;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["b" /* setType */])("Types.Alignment", Alignment);
var Cell = function () {
    function Cell(tag, data) {
        _classCallCheck(this, Cell);

        this.tag = tag;
        this.data = data;
    }

    _createClass(Cell, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Types.Cell",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: [["Contents", Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["m" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */], {
                    T: Token
                }), "boolean", Alignment]]
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return this === other || this.tag === other.tag && Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["j" /* equals */])(this.data, other.data);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["i" /* compareUnions */])(this, other) | 0;
        }
    }, {
        key: "ReplaceTokens",
        value: function ReplaceTokens(t) {
            return new Cell(0, [t, this.data[1], this.data[2]]);
        }
    }, {
        key: "GetToks",
        get: function get() {
            return this.data[0];
        }
    }, {
        key: "GetHead",
        get: function get() {
            return this.data[1];
        }
    }, {
        key: "GetParams",
        get: function get() {
            return [this.data[0], this.data[1], this.data[2]];
        }
    }]);

    return Cell;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["b" /* setType */])("Types.Cell", Cell);
var Row = function () {
    function Row(tag, data) {
        _classCallCheck(this, Row);

        this.tag = tag;
        this.data = data;
    }

    _createClass(Row, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Types.Row",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: [["Cells", Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["m" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */], {
                    T: Cell
                }), "boolean"]]
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return this === other || this.tag === other.tag && Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["j" /* equals */])(this.data, other.data);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["i" /* compareUnions */])(this, other) | 0;
        }
    }]);

    return Row;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["b" /* setType */])("Types.Row", Row);
var PCell = function () {
    function PCell(tag, data) {
        _classCallCheck(this, PCell);

        this.tag = tag;
        this.data = data;
    }

    _createClass(PCell, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Types.PCell",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: [["CellLine", Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["m" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */], {
                    T: InlineElement
                }), "boolean", Alignment]]
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return this === other || this.tag === other.tag && Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["j" /* equals */])(this.data, other.data);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["i" /* compareUnions */])(this, other) | 0;
        }
    }]);

    return PCell;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["b" /* setType */])("Types.PCell", PCell);
var PRow = function () {
    function PRow(tag, data) {
        _classCallCheck(this, PRow);

        this.tag = tag;
        this.data = data;
    }

    _createClass(PRow, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Types.PRow",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: [["PCells", Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["m" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */], {
                    T: PCell
                }), "boolean"]]
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return this === other || this.tag === other.tag && Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["j" /* equals */])(this.data, other.data);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["i" /* compareUnions */])(this, other) | 0;
        }
    }]);

    return PRow;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["b" /* setType */])("Types.PRow", PRow);
var RefFrmt = function () {
    function RefFrmt(tag, data) {
        _classCallCheck(this, RefFrmt);

        this.tag = tag;
        this.data = data;
    }

    _createClass(RefFrmt, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Types.RefFrmt",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: [["IEEE"], ["Harvard"], ["Chicago"]]
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return this === other || this.tag === other.tag && Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["j" /* equals */])(this.data, other.data);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["i" /* compareUnions */])(this, other) | 0;
        }
    }]);

    return RefFrmt;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["b" /* setType */])("Types.RefFrmt", RefFrmt);
var RefType = function () {
    function RefType(tag, data) {
        _classCallCheck(this, RefType);

        this.tag = tag;
        this.data = data;
    }

    _createClass(RefType, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Types.RefType",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: [["Book"], ["Website"]]
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return this === other || this.tag === other.tag && Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["j" /* equals */])(this.data, other.data);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["i" /* compareUnions */])(this, other) | 0;
        }
    }]);

    return RefType;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["b" /* setType */])("Types.RefType", RefType);
var Ref = function () {
    function Ref(cat, author, title, year, accessDate, uRL) {
        _classCallCheck(this, Ref);

        this.Cat = cat;
        this.Author = author;
        this.Title = title;
        this.Year = year;
        this.AccessDate = accessDate;
        this.URL = uRL;
    }

    _createClass(Ref, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Types.Ref",
                interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
                properties: {
                    Cat: Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["c" /* Option */])(RefType),
                    Author: Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["c" /* Option */])(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["m" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */], {
                        T: Token
                    })),
                    Title: Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["c" /* Option */])(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["m" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */], {
                        T: Token
                    })),
                    Year: Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["c" /* Option */])("number"),
                    AccessDate: Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["c" /* Option */])(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["d" /* Tuple */])(["number", "number", "number"])),
                    URL: Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["c" /* Option */])("string")
                }
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["k" /* equalsRecords */])(this, other);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["h" /* compareRecords */])(this, other) | 0;
        }
    }]);

    return Ref;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["b" /* setType */])("Types.Ref", Ref);
var ParsedObj = function () {
    function ParsedObj(tag, data) {
        _classCallCheck(this, ParsedObj);

        this.tag = tag;
        this.data = data;
    }

    _createClass(ParsedObj, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Types.ParsedObj",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: [["CodeBlock", "string", Language], ["Header", THeader], ["ContentTable", Ttoc], ["List", TList], ["Paragraph", Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["m" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */], {
                    T: Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["m" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */], {
                        T: InlineElement
                    })
                })], ["Quote", Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["m" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */], {
                    T: InlineElement
                })], ["Table", Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["m" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */], {
                    T: PRow
                })], ["PreTable", Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["m" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */], {
                    T: Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["m" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */], {
                        T: Token
                    })
                })], ["Footnote", ID, Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["m" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */], {
                    T: InlineElement
                })]]
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return this === other || this.tag === other.tag && Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["j" /* equals */])(this.data, other.data);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["i" /* compareUnions */])(this, other) | 0;
        }
    }]);

    return ParsedObj;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["b" /* setType */])("Types.ParsedObj", ParsedObj);
var OutFormat = function () {
    function OutFormat(tag, data) {
        _classCallCheck(this, OutFormat);

        this.tag = tag;
        this.data = data;
    }

    _createClass(OutFormat, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Types.OutFormat",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: [["HTML"], ["Markdown"]]
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return this === other || this.tag === other.tag && Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["j" /* equals */])(this.data, other.data);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["i" /* compareUnions */])(this, other) | 0;
        }
    }]);

    return OutFormat;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["b" /* setType */])("Types.OutFormat", OutFormat);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = map;
/* unused harmony export mapError */
/* harmony export (immutable) */ __webpack_exports__["a"] = bind;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Util__ = __webpack_require__(3);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





var Result = function () {
    function Result(tag, data) {
        _classCallCheck(this, Result);

        this.tag = tag | 0;
        this.data = data;
    }

    _createClass(Result, [{
        key: "Equals",
        value: function Equals(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__Util__["l" /* equalsUnions */])(this, other);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__Util__["i" /* compareUnions */])(this, other);
        }
    }, {
        key: __WEBPACK_IMPORTED_MODULE_0__Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Microsoft.FSharp.Core.FSharpResult",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: [["Ok", __WEBPACK_IMPORTED_MODULE_1__Util__["a" /* Any */]], ["Error", __WEBPACK_IMPORTED_MODULE_1__Util__["a" /* Any */]]]
            };
        }
    }]);

    return Result;
}();

/* harmony default export */ __webpack_exports__["b"] = (Result);

function map(f, result) {
    return result.tag === 0 ? new Result(0, f(result.data)) : result;
}
function mapError(f, result) {
    return result.tag === 1 ? new Result(1, f(result.data)) : result;
}
function bind(f, result) {
    return result.tag === 0 ? f(result.data) : result;
}

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = invTuple;
/* harmony export (immutable) */ __webpack_exports__["f"] = mapTryFind;
/* harmony export (immutable) */ __webpack_exports__["c"] = listTryFind;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return charList; });
/* unused harmony export charMap */
/* unused harmony export $7C$CharTok$7C$_$7C$ */
/* harmony export (immutable) */ __webpack_exports__["e"] = mapTok;
/* harmony export (immutable) */ __webpack_exports__["j"] = strAllToks;
/* harmony export (immutable) */ __webpack_exports__["d"] = mapLang;
/* harmony export (immutable) */ __webpack_exports__["k"] = xOnwards;
/* harmony export (immutable) */ __webpack_exports__["h"] = sOnwards;
/* harmony export (immutable) */ __webpack_exports__["g"] = removeChars;
/* unused harmony export removeWhitespace */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return sharedLog; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Map__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_Comparer__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Util__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Types_fs__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_Option__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_String__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_Seq__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Logger_Logger_fs__ = __webpack_require__(14);











function invTuple(a, b) {
    return [b, a];
}
function mapTryFind(k, map) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Map__["d" /* tryFind */])(k, map);
}
function listTryFind(s) {
    return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["a" /* default */])(function ($var2) {
        return function (map) {
            return mapTryFind(s, map);
        }(function ($var1) {
            return Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Map__["b" /* create */])(Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["e" /* map */])(function (tupledArg) {
                return invTuple(tupledArg[0], tupledArg[1]);
            }, $var1), new __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_Comparer__["a" /* default */](__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Util__["f" /* compare */]));
        }($var2));
    });
}
var charList = Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([["#", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["o" /* Token */](4)], ["|", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["o" /* Token */](5)], ["=", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["o" /* Token */](6)], ["-", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["o" /* Token */](7)], ["+", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["o" /* Token */](8)], ["*", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["o" /* Token */](9)], [".", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["o" /* Token */](10)], ["**", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["o" /* Token */](12)], ["***", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["o" /* Token */](13)], ["_", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["o" /* Token */](14)], ["__", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["o" /* Token */](15)], ["___", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["o" /* Token */](16)], ["~", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["o" /* Token */](17)], ["~~", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["o" /* Token */](18)], ["~~~", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["o" /* Token */](19)], ["[", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["o" /* Token */](20)], ["]", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["o" /* Token */](21)], ["(", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["o" /* Token */](22)], [")", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["o" /* Token */](23)], ["\\", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["o" /* Token */](24)], ["/", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["o" /* Token */](25)], ["<", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["o" /* Token */](26)], [">", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["o" /* Token */](27)], ["{", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["o" /* Token */](28)], ["}", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["o" /* Token */](29)], ["`", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["o" /* Token */](30)], ["!", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["o" /* Token */](31)], [":", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["o" /* Token */](33)], ["^", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["o" /* Token */](34)], ["%", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["o" /* Token */](35)], [",", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["o" /* Token */](11)]]);
var charMap = Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Map__["b" /* create */])(Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["e" /* map */])(function (tupledArg) {
    return invTuple(tupledArg[0], tupledArg[1]);
}, charList), new __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_Comparer__["a" /* default */](function (x, y) {
    return x.CompareTo(y);
}));

function _CharTok___(tok) {
    return mapTryFind(tok, charMap);
}


function mapTok(_arg1) {
    var activePatternResult485 = _CharTok___(_arg1);

    if (activePatternResult485 != null) {
        return Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult485);
    } else {
        switch (_arg1.tag) {
            case 0:
                return "CODEBLOCK";

            case 38:
                return Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_String__["g" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_String__["b" /* printf */])("FOOTER found"));

            case 37:
                return Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_String__["g" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_String__["b" /* printf */])("HEADER %d"))(_arg1.data);

            case 3:
                return _arg1.data;

            case 1:
                return _arg1.data;

            case 2:
                return Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_String__["d" /* replicate */])(_arg1.data, " ");

            default:
                return "\n";
        }
    }
}
function strAllToks(toks) {
    var pacMan = function pacMan(str, tok) {
        return str + mapTok(tok);
    };

    return Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_Seq__["f" /* fold */])(pacMan, "", toks);
}
function mapLang(lang) {
    switch (lang.tag) {
        case 1:
            return "fsharp";

        case 2:
            return "cpp";

        case 3:
            return "c";

        case 4:
            return "";

        default:
            return "python";
    }
}
function xOnwards(x, lst) {
    if (lst.length > x) {
        return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["i" /* slice */])(x, null, lst);
    } else {
        return new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */]();
    }
}
function sOnwards(s, str) {
    if (str.length > s) {
        return str.slice(s, str.length);
    } else {
        return "";
    }
}
function removeChars(lst, s) {
    var folder = function folder(s_1, x) {
        return Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_String__["c" /* replace */])(s_1, x, "");
    };

    return Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_Seq__["f" /* fold */])(folder, s, lst);
}
function removeWhitespace(s) {
    return removeChars(Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])(["\n", "\t", "\r", " "]), s);
}
var sharedLog = new __WEBPACK_IMPORTED_MODULE_9__Logger_Logger_fs__["a" /* Logger */](2);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = ofArray;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Util__ = __webpack_require__(3);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





// This module is split from List.ts to prevent cyclic dependencies
function ofArray(args, base) {
    var acc = base || new List();
    for (var i = args.length - 1; i >= 0; i--) {
        acc = new List(args[i], acc);
    }
    return acc;
}

var List = function () {
    function List(head, tail) {
        _classCallCheck(this, List);

        this.head = head;
        this.tail = tail;
    }

    _createClass(List, [{
        key: "ToString",
        value: function ToString() {
            return "[" + Array.from(this).map(function (x) {
                return Object(__WEBPACK_IMPORTED_MODULE_1__Util__["n" /* toString */])(x);
            }).join("; ") + "]";
        }
    }, {
        key: "Equals",
        value: function Equals(x) {
            // Optimization if they are referencially equal
            if (this === x) {
                return true;
            } else {
                var iter1 = this[Symbol.iterator]();
                var iter2 = x[Symbol.iterator]();
                while (true) {
                    var cur1 = iter1.next();
                    var cur2 = iter2.next();
                    if (cur1.done) {
                        return cur2.done ? true : false;
                    } else if (cur2.done) {
                        return false;
                    } else if (!Object(__WEBPACK_IMPORTED_MODULE_1__Util__["j" /* equals */])(cur1.value, cur2.value)) {
                        return false;
                    }
                }
            }
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(x) {
            // Optimization if they are referencially equal
            if (this === x) {
                return 0;
            } else {
                var acc = 0;
                var iter1 = this[Symbol.iterator]();
                var iter2 = x[Symbol.iterator]();
                while (true) {
                    var cur1 = iter1.next();
                    var cur2 = iter2.next();
                    if (cur1.done) {
                        return cur2.done ? acc : -1;
                    } else if (cur2.done) {
                        return 1;
                    } else {
                        acc = Object(__WEBPACK_IMPORTED_MODULE_1__Util__["f" /* compare */])(cur1.value, cur2.value);
                        if (acc !== 0) {
                            return acc;
                        }
                    }
                }
            }
        }
    }, {
        key: Symbol.iterator,
        value: function value() {
            var cur = this;
            return {
                next: function next() {
                    var tmp = cur;
                    cur = cur.tail;
                    return { done: tmp.tail == null, value: tmp.head };
                }
            };
        }
        //   append(ys: List<T>): List<T> {
        //     return append(this, ys);
        //   }
        //   choose<U>(f: (x: T) => U, xs: List<T>): List<U> {
        //     return choose(f, this);
        //   }
        //   collect<U>(f: (x: T) => List<U>): List<U> {
        //     return collect(f, this);
        //   }
        //   filter(f: (x: T) => boolean): List<T> {
        //     return filter(f, this);
        //   }
        //   where(f: (x: T) => boolean): List<T> {
        //     return filter(f, this);
        //   }
        //   map<U>(f: (x: T) => U): List<U> {
        //     return map(f, this);
        //   }
        //   mapIndexed<U>(f: (i: number, x: T) => U): List<U> {
        //     return mapIndexed(f, this);
        //   }
        //   partition(f: (x: T) => boolean): [List<T>, List<T>] {
        //     return partition(f, this) as [List<T>, List<T>];
        //   }
        //   reverse(): List<T> {
        //     return reverse(this);
        //   }
        //   slice(lower: number, upper: number): List<T> {
        //     return slice(lower, upper, this);
        //   }

    }, {
        key: __WEBPACK_IMPORTED_MODULE_0__Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Microsoft.FSharp.Collections.FSharpList",
                interfaces: ["System.IEquatable", "System.IComparable"]
            };
        }
    }, {
        key: "length",
        get: function get() {
            var cur = this;
            var acc = 0;
            while (cur.tail != null) {
                cur = cur.tail;
                acc++;
            }
            return acc;
        }
    }]);

    return List;
}();

/* harmony default export */ __webpack_exports__["a"] = (List);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = groupBy;
/* unused harmony export countBy */
/* unused harmony export MapTree */
/* harmony export (immutable) */ __webpack_exports__["b"] = create;
/* harmony export (immutable) */ __webpack_exports__["a"] = add;
/* unused harmony export remove */
/* unused harmony export containsValue */
/* unused harmony export tryGetValue */
/* unused harmony export exists */
/* unused harmony export find */
/* harmony export (immutable) */ __webpack_exports__["d"] = tryFind;
/* unused harmony export filter */
/* unused harmony export fold */
/* unused harmony export foldBack */
/* unused harmony export forAll */
/* unused harmony export isEmpty */
/* unused harmony export iterate */
/* unused harmony export map */
/* unused harmony export partition */
/* unused harmony export findKey */
/* unused harmony export tryFindKey */
/* unused harmony export pick */
/* unused harmony export tryPick */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Comparer__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ListClass__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Option__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Seq__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Symbol__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Util__ = __webpack_require__(3);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }














// ----------------------------------------------
// These functions belong to Seq.ts but are
// implemented here to prevent cyclic dependencies
function groupBy(f, xs) {
    var keys = [];
    var iter = xs[Symbol.iterator]();
    var acc = create();
    var cur = iter.next();
    while (!cur.done) {
        var k = f(cur.value);
        var vs = tryFind(k, acc);
        if (vs == null) {
            keys.push(k);
            acc = add(k, [cur.value], acc);
        } else {
            Object(__WEBPACK_IMPORTED_MODULE_2__Option__["c" /* getValue */])(vs).push(cur.value);
        }
        cur = iter.next();
    }
    return keys.map(function (k) {
        return [k, acc.get(k)];
    });
}
function countBy(f, xs) {
    return groupBy(f, xs).map(function (kv) {
        return [kv[0], kv[1].length];
    });
}
var MapTree = function MapTree(tag, data) {
    _classCallCheck(this, MapTree);

    this.tag = tag | 0;
    this.data = data;
};
function tree_sizeAux(acc, m) {
    sizeAux: while (true) {
        if (m.tag === 1) {
            return acc + 1 | 0;
        } else if (m.tag === 2) {
            acc = tree_sizeAux(acc + 1, m.data[2]);
            m = m.data[3];
            continue sizeAux;
        } else {
            return acc | 0;
        }
    }
}
function tree_size(x) {
    return tree_sizeAux(0, x);
}
function tree_empty() {
    return new MapTree(0);
}
function tree_height(_arg1) {
    return _arg1.tag === 1 ? 1 : _arg1.tag === 2 ? _arg1.data[4] : 0;
}
function tree_isEmpty(m) {
    return m.tag === 0 ? true : false;
}
function tree_mk(l, k, v, r) {
    var matchValue = l.tag === 0 ? r.tag === 0 ? 0 : 1 : 1;
    switch (matchValue) {
        case 0:
            return new MapTree(1, [k, v]);
        case 1:
            var hl = tree_height(l) | 0;
            var hr = tree_height(r) | 0;
            var m = (hl < hr ? hr : hl) | 0;
            return new MapTree(2, [k, v, l, r, m + 1]);
    }
    throw new Error("internal error: Map.tree_mk");
}
function tree_rebalance(t1, k, v, t2) {
    var t1h = tree_height(t1);
    var t2h = tree_height(t2);
    if (t2h > t1h + 2) {
        if (t2.tag === 2) {
            if (tree_height(t2.data[2]) > t1h + 1) {
                if (t2.data[2].tag === 2) {
                    return tree_mk(tree_mk(t1, k, v, t2.data[2].data[2]), t2.data[2].data[0], t2.data[2].data[1], tree_mk(t2.data[2].data[3], t2.data[0], t2.data[1], t2.data[3]));
                } else {
                    throw new Error("rebalance");
                }
            } else {
                return tree_mk(tree_mk(t1, k, v, t2.data[2]), t2.data[0], t2.data[1], t2.data[3]);
            }
        } else {
            throw new Error("rebalance");
        }
    } else {
        if (t1h > t2h + 2) {
            if (t1.tag === 2) {
                if (tree_height(t1.data[3]) > t2h + 1) {
                    if (t1.data[3].tag === 2) {
                        return tree_mk(tree_mk(t1.data[2], t1.data[0], t1.data[1], t1.data[3].data[2]), t1.data[3].data[0], t1.data[3].data[1], tree_mk(t1.data[3].data[3], k, v, t2));
                    } else {
                        throw new Error("rebalance");
                    }
                } else {
                    return tree_mk(t1.data[2], t1.data[0], t1.data[1], tree_mk(t1.data[3], k, v, t2));
                }
            } else {
                throw new Error("rebalance");
            }
        } else {
            return tree_mk(t1, k, v, t2);
        }
    }
}
function tree_add(comparer, k, v, m) {
    if (m.tag === 1) {
        var c = comparer.Compare(k, m.data[0]);
        if (c < 0) {
            return new MapTree(2, [k, v, new MapTree(0), m, 2]);
        } else if (c === 0) {
            return new MapTree(1, [k, v]);
        }
        return new MapTree(2, [k, v, m, new MapTree(0), 2]);
    } else if (m.tag === 2) {
        var _c = comparer.Compare(k, m.data[0]);
        if (_c < 0) {
            return tree_rebalance(tree_add(comparer, k, v, m.data[2]), m.data[0], m.data[1], m.data[3]);
        } else if (_c === 0) {
            return new MapTree(2, [k, v, m.data[2], m.data[3], m.data[4]]);
        }
        return tree_rebalance(m.data[2], m.data[0], m.data[1], tree_add(comparer, k, v, m.data[3]));
    }
    return new MapTree(1, [k, v]);
}
function tree_find(comparer, k, m) {
    var res = tree_tryFind(comparer, k, m);
    if (res == null) {
        throw new Error("key not found: " + k);
    }
    return Object(__WEBPACK_IMPORTED_MODULE_2__Option__["c" /* getValue */])(res);
}
function tree_tryFind(comparer, k, m) {
    tryFind: while (true) {
        if (m.tag === 1) {
            var c = comparer.Compare(k, m.data[0]) | 0;
            if (c === 0) {
                return new __WEBPACK_IMPORTED_MODULE_2__Option__["a" /* Some */](m.data[1]);
            } else {
                return null;
            }
        } else if (m.tag === 2) {
            var c_1 = comparer.Compare(k, m.data[0]) | 0;
            if (c_1 < 0) {
                comparer = comparer;
                k = k;
                m = m.data[2];
                continue tryFind;
            } else if (c_1 === 0) {
                return new __WEBPACK_IMPORTED_MODULE_2__Option__["a" /* Some */](m.data[1]);
            } else {
                comparer = comparer;
                k = k;
                m = m.data[3];
                continue tryFind;
            }
        } else {
            return null;
        }
    }
}
function tree_partition1(comparer, f, k, v, acc1, acc2) {
    return f(k, v) ? [tree_add(comparer, k, v, acc1), acc2] : [acc1, tree_add(comparer, k, v, acc2)];
}
function tree_partitionAux(comparer, f, s, acc_0, acc_1) {
    var acc = [acc_0, acc_1];
    if (s.tag === 1) {
        return tree_partition1(comparer, f, s.data[0], s.data[1], acc[0], acc[1]);
    } else if (s.tag === 2) {
        var acc_2 = tree_partitionAux(comparer, f, s.data[3], acc[0], acc[1]);
        var acc_3 = tree_partition1(comparer, f, s.data[0], s.data[1], acc_2[0], acc_2[1]);
        return tree_partitionAux(comparer, f, s.data[2], acc_3[0], acc_3[1]);
    }
    return acc;
}
function tree_partition(comparer, f, s) {
    return tree_partitionAux(comparer, f, s, tree_empty(), tree_empty());
}
function tree_filter1(comparer, f, k, v, acc) {
    return f(k, v) ? tree_add(comparer, k, v, acc) : acc;
}
function tree_filterAux(comparer, f, s, acc) {
    return s.tag === 1 ? tree_filter1(comparer, f, s.data[0], s.data[1], acc) : s.tag === 2 ? tree_filterAux(comparer, f, s.data[3], tree_filter1(comparer, f, s.data[0], s.data[1], tree_filterAux(comparer, f, s.data[2], acc))) : acc;
}
function tree_filter(comparer, f, s) {
    return tree_filterAux(comparer, f, s, tree_empty());
}
function tree_spliceOutSuccessor(m) {
    if (m.tag === 1) {
        return [m.data[0], m.data[1], new MapTree(0)];
    } else if (m.tag === 2) {
        if (m.data[2].tag === 0) {
            return [m.data[0], m.data[1], m.data[3]];
        } else {
            var kvl = tree_spliceOutSuccessor(m.data[2]);
            return [kvl[0], kvl[1], tree_mk(kvl[2], m.data[0], m.data[1], m.data[3])];
        }
    }
    throw new Error("internal error: Map.spliceOutSuccessor");
}
function tree_remove(comparer, k, m) {
    if (m.tag === 1) {
        var c = comparer.Compare(k, m.data[0]);
        if (c === 0) {
            return new MapTree(0);
        } else {
            return m;
        }
    } else if (m.tag === 2) {
        var _c2 = comparer.Compare(k, m.data[0]);
        if (_c2 < 0) {
            return tree_rebalance(tree_remove(comparer, k, m.data[2]), m.data[0], m.data[1], m.data[3]);
        } else if (_c2 === 0) {
            if (m.data[2].tag === 0) {
                return m.data[3];
            } else {
                if (m.data[3].tag === 0) {
                    return m.data[2];
                } else {
                    var input = tree_spliceOutSuccessor(m.data[3]);
                    return tree_mk(m.data[2], input[0], input[1], input[2]);
                }
            }
        } else {
            return tree_rebalance(m.data[2], m.data[0], m.data[1], tree_remove(comparer, k, m.data[3]));
        }
    } else {
        return tree_empty();
    }
}
function tree_mem(comparer, k, m) {
    mem: while (true) {
        if (m.tag === 1) {
            return comparer.Compare(k, m.data[0]) === 0;
        } else if (m.tag === 2) {
            var c = comparer.Compare(k, m.data[0]) | 0;
            if (c < 0) {
                comparer = comparer;
                k = k;
                m = m.data[2];
                continue mem;
            } else if (c === 0) {
                return true;
            } else {
                comparer = comparer;
                k = k;
                m = m.data[3];
                continue mem;
            }
        } else {
            return false;
        }
    }
}
function tree_iter(f, m) {
    if (m.tag === 1) {
        f(m.data[0], m.data[1]);
    } else if (m.tag === 2) {
        tree_iter(f, m.data[2]);
        f(m.data[0], m.data[1]);
        tree_iter(f, m.data[3]);
    }
}
function tree_tryPick(f, m) {
    if (m.tag === 1) {
        return f(m.data[0], m.data[1]);
    } else if (m.tag === 2) {
        var matchValue = tree_tryPick(f, m.data[2]);
        if (matchValue == null) {
            var matchValue_1 = f(m.data[0], m.data[1]);
            if (matchValue_1 == null) {
                return tree_tryPick(f, m.data[3]);
            } else {
                var res = matchValue_1;
                return res;
            }
        } else {
            return matchValue;
        }
    } else {
        return null;
    }
}
function tree_exists(f, m) {
    return m.tag === 1 ? f(m.data[0], m.data[1]) : m.tag === 2 ? (tree_exists(f, m.data[2]) ? true : f(m.data[0], m.data[1])) ? true : tree_exists(f, m.data[3]) : false;
}
function tree_forall(f, m) {
    return m.tag === 1 ? f(m.data[0], m.data[1]) : m.tag === 2 ? (tree_forall(f, m.data[2]) ? f(m.data[0], m.data[1]) : false) ? tree_forall(f, m.data[3]) : false : true;
}
function tree_mapi(f, m) {
    return m.tag === 1 ? new MapTree(1, [m.data[0], f(m.data[0], m.data[1])]) : m.tag === 2 ? new MapTree(2, [m.data[0], f(m.data[0], m.data[1]), tree_mapi(f, m.data[2]), tree_mapi(f, m.data[3]), m.data[4]]) : tree_empty();
}
function tree_foldBack(f, m, x) {
    return m.tag === 1 ? f(m.data[0], m.data[1], x) : m.tag === 2 ? tree_foldBack(f, m.data[2], f(m.data[0], m.data[1], tree_foldBack(f, m.data[3], x))) : x;
}
function tree_fold(f, x, m) {
    return m.tag === 1 ? f(x, m.data[0], m.data[1]) : m.tag === 2 ? tree_fold(f, f(tree_fold(f, x, m.data[2]), m.data[0], m.data[1]), m.data[3]) : x;
}
// function tree_foldFromTo(
//     comparer: IComparer<any>, lo: any, hi: any,
//     f: (k:any, v: any, acc: any) => any, m: MapTree, x: any): any {
//   if (m.tag === 1) {
//     var cLoKey = comparer.Compare(lo, m.data[0]);
//     var cKeyHi = comparer.Compare(m.data[0], hi);
//     var x_1 = (cLoKey <= 0 ? cKeyHi <= 0 : false) ? f(m.data[0], m.data[1], x) : x;
//     return x_1;
//   } else if (m.tag === 2) {
//     var cLoKey = comparer.Compare(lo, m.data[0]);
//     var cKeyHi = comparer.Compare(m.data[0], hi);
//     var x_1 = cLoKey < 0 ? tree_foldFromTo(comparer, lo, hi, f, m.data[2], x) : x;
//     var x_2 = (cLoKey <= 0 ? cKeyHi <= 0 : false) ? f(m.data[0], m.data[1], x_1) : x_1;
//     var x_3 = cKeyHi < 0 ? tree_foldFromTo(comparer, lo, hi, f, m.data[3], x_2) : x_2;
//     return x_3;
//   }
//   return x;
// }
// function tree_foldSection(
//     comparer: IComparer<any>, lo: any, hi: any,
//     f: (k: any, v: any, acc: any) => any, m: MapTree, x: any) {
//   return comparer.Compare(lo, hi) === 1 ? x : tree_foldFromTo(comparer, lo, hi, f, m, x);
// }
// function tree_loop(m: MapTree, acc: any): List<[any,any]> {
//   return m.tag === 1
//     ? new List([m.data[0], m.data[1]], acc)
//     : m.tag === 2
//       ? tree_loop(m.data[2], new List([m.data[0], m.data[1]], tree_loop(m.data[3], acc)))
//       : acc;
// }
// function tree_toList(m: MapTree) {
//   return tree_loop(m, new List());
// }
// function tree_toArray(m: MapTree) {
//   return Array.from(tree_toList(m));
// }
// function tree_ofList(comparer: IComparer<any>, l: List<[any,any]>) {
//   return Seq.fold((acc: MapTree, tupledArg: [any, any]) => {
//     return tree_add(comparer, tupledArg[0], tupledArg[1], acc);
//   }, tree_empty(), l);
// }
function tree_mkFromEnumerator(comparer, acc, e) {
    var cur = e.next();
    while (!cur.done) {
        acc = tree_add(comparer, cur.value[0], cur.value[1], acc);
        cur = e.next();
    }
    return acc;
}
// function tree_ofArray(comparer: IComparer<any>, arr: ArrayLike<[any,any]>) {
//   var res = tree_empty();
//   for (var i = 0; i <= arr.length - 1; i++) {
//     res = tree_add(comparer, arr[i][0], arr[i][1], res);
//   }
//   return res;
// }
function tree_ofSeq(comparer, c) {
    var ie = c[Symbol.iterator]();
    return tree_mkFromEnumerator(comparer, tree_empty(), ie);
}
// function tree_copyToArray(s: MapTree, arr: ArrayLike<any>, i: number) {
//   tree_iter((x, y) => { arr[i++] = [x, y]; }, s);
// }
function tree_collapseLHS(stack) {
    if (stack.tail != null) {
        if (stack.head.tag === 1) {
            return stack;
        } else if (stack.head.tag === 2) {
            return tree_collapseLHS(Object(__WEBPACK_IMPORTED_MODULE_1__ListClass__["b" /* ofArray */])([stack.head.data[2], new MapTree(1, [stack.head.data[0], stack.head.data[1]]), stack.head.data[3]], stack.tail));
        } else {
            return tree_collapseLHS(stack.tail);
        }
    } else {
        return new __WEBPACK_IMPORTED_MODULE_1__ListClass__["a" /* default */]();
    }
}
function tree_mkIterator(s) {
    return { stack: tree_collapseLHS(new __WEBPACK_IMPORTED_MODULE_1__ListClass__["a" /* default */](s, new __WEBPACK_IMPORTED_MODULE_1__ListClass__["a" /* default */]())), started: false };
}
function tree_moveNext(i) {
    function current(it) {
        if (it.stack.tail == null) {
            return null;
        } else if (it.stack.head.tag === 1) {
            return [it.stack.head.data[0], it.stack.head.data[1]];
        }
        throw new Error("Please report error: Map iterator, unexpected stack for current");
    }
    if (i.started) {
        if (i.stack.tail == null) {
            return { done: true, value: null };
        } else {
            if (i.stack.head.tag === 1) {
                i.stack = tree_collapseLHS(i.stack.tail);
                return {
                    done: i.stack.tail == null,
                    value: current(i)
                };
            } else {
                throw new Error("Please report error: Map iterator, unexpected stack for moveNext");
            }
        }
    } else {
        i.started = true;
        return {
            done: i.stack.tail == null,
            value: current(i)
        };
    }
}

var FableMap = function () {
    /** Do not call, use Map.create instead. */
    function FableMap() {
        _classCallCheck(this, FableMap);

        return;
    }

    _createClass(FableMap, [{
        key: "ToString",
        value: function ToString() {
            return "map [" + Array.from(this).map(function (x) {
                return Object(__WEBPACK_IMPORTED_MODULE_5__Util__["n" /* toString */])(x);
            }).join("; ") + "]";
        }
    }, {
        key: "Equals",
        value: function Equals(m2) {
            return this.CompareTo(m2) === 0;
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(m2) {
            var _this = this;

            return this === m2 ? 0 : Object(__WEBPACK_IMPORTED_MODULE_3__Seq__["c" /* compareWith */])(function (kvp1, kvp2) {
                var c = _this.comparer.Compare(kvp1[0], kvp2[0]);
                return c !== 0 ? c : Object(__WEBPACK_IMPORTED_MODULE_5__Util__["f" /* compare */])(kvp1[1], kvp2[1]);
            }, this, m2);
        }
    }, {
        key: Symbol.iterator,
        value: function value() {
            var i = tree_mkIterator(this.tree);
            return {
                next: function next() {
                    return tree_moveNext(i);
                }
            };
        }
    }, {
        key: "entries",
        value: function entries() {
            return this[Symbol.iterator]();
        }
    }, {
        key: "keys",
        value: function keys() {
            return Object(__WEBPACK_IMPORTED_MODULE_3__Seq__["i" /* map */])(function (kv) {
                return kv[0];
            }, this);
        }
    }, {
        key: "values",
        value: function values() {
            return Object(__WEBPACK_IMPORTED_MODULE_3__Seq__["i" /* map */])(function (kv) {
                return kv[1];
            }, this);
        }
    }, {
        key: "get",
        value: function get(k) {
            return tree_find(this.comparer, k, this.tree);
        }
    }, {
        key: "has",
        value: function has(k) {
            return tree_mem(this.comparer, k, this.tree);
        }
        /** Mutating method */

    }, {
        key: "set",
        value: function set(k, v) {
            this.tree = tree_add(this.comparer, k, v, this.tree);
        }
        /** Mutating method */

    }, {
        key: "delete",
        value: function _delete(k) {
            // TODO: Is calculating the size twice is more performant than calling tree_mem?
            var oldSize = tree_size(this.tree);
            this.tree = tree_remove(this.comparer, k, this.tree);
            return oldSize > tree_size(this.tree);
        }
        /** Mutating method */

    }, {
        key: "clear",
        value: function clear() {
            this.tree = tree_empty();
        }
    }, {
        key: __WEBPACK_IMPORTED_MODULE_4__Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Microsoft.FSharp.Collections.FSharpMap",
                interfaces: ["System.IEquatable", "System.IComparable", "System.Collections.Generic.IDictionary"]
            };
        }
    }, {
        key: "size",
        get: function get() {
            return tree_size(this.tree);
        }
    }]);

    return FableMap;
}();

/* unused harmony default export */ var _unused_webpack_default_export = (FableMap);

function from(comparer, tree) {
    var map = new FableMap();
    map.tree = tree;
    map.comparer = comparer || new __WEBPACK_IMPORTED_MODULE_0__Comparer__["a" /* default */]();
    return map;
}
function create(ie, comparer) {
    comparer = comparer || new __WEBPACK_IMPORTED_MODULE_0__Comparer__["a" /* default */]();
    return from(comparer, ie ? tree_ofSeq(comparer, ie) : tree_empty());
}
function add(k, v, map) {
    return from(map.comparer, tree_add(map.comparer, k, v, map.tree));
}
function remove(item, map) {
    return from(map.comparer, tree_remove(map.comparer, item, map.tree));
}
function containsValue(v, map) {
    return Object(__WEBPACK_IMPORTED_MODULE_3__Seq__["f" /* fold */])(function (acc, k) {
        return acc || Object(__WEBPACK_IMPORTED_MODULE_5__Util__["j" /* equals */])(map.get(k), v);
    }, false, map.keys());
}
function tryGetValue(map, key, defaultValue) {
    return map.has(key) ? [true, map.get(key)] : [false, defaultValue];
}
function exists(f, map) {
    return tree_exists(f, map.tree);
}
function find(k, map) {
    return tree_find(map.comparer, k, map.tree);
}
function tryFind(k, map) {
    return tree_tryFind(map.comparer, k, map.tree);
}
function filter(f, map) {
    return from(map.comparer, tree_filter(map.comparer, f, map.tree));
}
function fold(f, seed, map) {
    return tree_fold(f, seed, map.tree);
}
function foldBack(f, map, seed) {
    return tree_foldBack(f, map.tree, seed);
}
function forAll(f, map) {
    return tree_forall(f, map.tree);
}
function isEmpty(map) {
    return tree_isEmpty(map.tree);
}
function iterate(f, map) {
    tree_iter(f, map.tree);
}
function map(f, map) {
    return from(map.comparer, tree_mapi(f, map.tree));
}
function partition(f, map) {
    var rs = tree_partition(map.comparer, f, map.tree);
    return [from(map.comparer, rs[0]), from(map.comparer, rs[1])];
}
function findKey(f, map) {
    return Object(__WEBPACK_IMPORTED_MODULE_3__Seq__["j" /* pick */])(function (kv) {
        return f(kv[0], kv[1]) ? new __WEBPACK_IMPORTED_MODULE_2__Option__["a" /* Some */](kv[0]) : null;
    }, map);
}
function tryFindKey(f, map) {
    return Object(__WEBPACK_IMPORTED_MODULE_3__Seq__["p" /* tryPick */])(function (kv) {
        return f(kv[0], kv[1]) ? new __WEBPACK_IMPORTED_MODULE_2__Option__["a" /* Some */](kv[0]) : null;
    }, map);
}
function pick(f, map) {
    var res = tryPick(f, map);
    if (res != null) {
        return Object(__WEBPACK_IMPORTED_MODULE_2__Option__["c" /* getValue */])(res);
    }
    throw new Error("key not found");
}
function tryPick(f, map) {
    return tree_tryPick(f, map.tree);
}

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export fromEqualityComparer */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Util__ = __webpack_require__(3);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var Comparer = function () {
    function Comparer(f) {
        _classCallCheck(this, Comparer);

        this.Compare = f || __WEBPACK_IMPORTED_MODULE_1__Util__["f" /* compare */];
    }

    _createClass(Comparer, [{
        key: __WEBPACK_IMPORTED_MODULE_0__Symbol__["a" /* default */].reflection,
        value: function value() {
            return { interfaces: ["System.IComparer"] };
        }
    }]);

    return Comparer;
}();

/* harmony default export */ __webpack_exports__["a"] = (Comparer);

function fromEqualityComparer(comparer) {
    // Sometimes IEqualityComparer also implements IComparer
    if (typeof comparer.Compare === "function") {
        return new Comparer(comparer.Compare);
    } else {
        return new Comparer(function (x, y) {
            var xhash = comparer.GetHashCode(x);
            var yhash = comparer.GetHashCode(y);
            if (xhash === yhash) {
                return comparer.Equals(x, y) ? 0 : -1;
            } else {
                return xhash < yhash ? -1 : 1;
            }
        });
    }
}

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OperationCanceledError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Trampoline; });
/* harmony export (immutable) */ __webpack_exports__["d"] = protectedCont;
/* harmony export (immutable) */ __webpack_exports__["c"] = protectedBind;
/* harmony export (immutable) */ __webpack_exports__["e"] = protectedReturn;
/* unused harmony export AsyncBuilder */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return singleton; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OperationCanceledError = function (_Error) {
    _inherits(OperationCanceledError, _Error);

    function OperationCanceledError() {
        _classCallCheck(this, OperationCanceledError);

        var _this = _possibleConstructorReturn(this, (OperationCanceledError.__proto__ || Object.getPrototypeOf(OperationCanceledError)).call(this, "The operation was canceled"));

        Object.setPrototypeOf(_this, OperationCanceledError.prototype);
        return _this;
    }

    return OperationCanceledError;
}(Error);
var Trampoline = function () {
    _createClass(Trampoline, null, [{
        key: "maxTrampolineCallCount",
        get: function get() {
            return 2000;
        }
    }]);

    function Trampoline() {
        _classCallCheck(this, Trampoline);

        this.callCount = 0;
    }

    _createClass(Trampoline, [{
        key: "incrementAndCheck",
        value: function incrementAndCheck() {
            return this.callCount++ > Trampoline.maxTrampolineCallCount;
        }
    }, {
        key: "hijack",
        value: function hijack(f) {
            this.callCount = 0;
            setTimeout(f, 0);
        }
    }]);

    return Trampoline;
}();
function protectedCont(f) {
    return function (ctx) {
        if (ctx.cancelToken.isCancelled) {
            ctx.onCancel(new OperationCanceledError());
        } else if (ctx.trampoline.incrementAndCheck()) {
            ctx.trampoline.hijack(function () {
                try {
                    f(ctx);
                } catch (err) {
                    ctx.onError(err);
                }
            });
        } else {
            try {
                f(ctx);
            } catch (err) {
                ctx.onError(err);
            }
        }
    };
}
function protectedBind(computation, binder) {
    return protectedCont(function (ctx) {
        computation({
            onSuccess: function onSuccess(x) {
                try {
                    binder(x)(ctx);
                } catch (ex) {
                    ctx.onError(ex);
                }
            },
            onError: ctx.onError,
            onCancel: ctx.onCancel,
            cancelToken: ctx.cancelToken,
            trampoline: ctx.trampoline
        });
    });
}
function protectedReturn(value) {
    return protectedCont(function (ctx) {
        return ctx.onSuccess(value);
    });
}
var AsyncBuilder = function () {
    function AsyncBuilder() {
        _classCallCheck(this, AsyncBuilder);
    }

    _createClass(AsyncBuilder, [{
        key: "Bind",
        value: function Bind(computation, binder) {
            return protectedBind(computation, binder);
        }
    }, {
        key: "Combine",
        value: function Combine(computation1, computation2) {
            return this.Bind(computation1, function () {
                return computation2;
            });
        }
    }, {
        key: "Delay",
        value: function Delay(generator) {
            return protectedCont(function (ctx) {
                return generator()(ctx);
            });
        }
    }, {
        key: "For",
        value: function For(sequence, body) {
            var iter = sequence[Symbol.iterator]();
            var cur = iter.next();
            return this.While(function () {
                return !cur.done;
            }, this.Delay(function () {
                var res = body(cur.value);
                cur = iter.next();
                return res;
            }));
        }
    }, {
        key: "Return",
        value: function Return(value) {
            return protectedReturn(value);
        }
    }, {
        key: "ReturnFrom",
        value: function ReturnFrom(computation) {
            return computation;
        }
    }, {
        key: "TryFinally",
        value: function TryFinally(computation, compensation) {
            return protectedCont(function (ctx) {
                computation({
                    onSuccess: function onSuccess(x) {
                        compensation();
                        ctx.onSuccess(x);
                    },
                    onError: function onError(x) {
                        compensation();
                        ctx.onError(x);
                    },
                    onCancel: function onCancel(x) {
                        compensation();
                        ctx.onCancel(x);
                    },
                    cancelToken: ctx.cancelToken,
                    trampoline: ctx.trampoline
                });
            });
        }
    }, {
        key: "TryWith",
        value: function TryWith(computation, catchHandler) {
            return protectedCont(function (ctx) {
                computation({
                    onSuccess: ctx.onSuccess,
                    onCancel: ctx.onCancel,
                    cancelToken: ctx.cancelToken,
                    trampoline: ctx.trampoline,
                    onError: function onError(ex) {
                        try {
                            catchHandler(ex)(ctx);
                        } catch (ex2) {
                            ctx.onError(ex2);
                        }
                    }
                });
            });
        }
    }, {
        key: "Using",
        value: function Using(resource, binder) {
            return this.TryFinally(binder(resource), function () {
                return resource.Dispose();
            });
        }
    }, {
        key: "While",
        value: function While(guard, computation) {
            var _this2 = this;

            if (guard()) {
                return this.Bind(computation, function () {
                    return _this2.While(guard, computation);
                });
            } else {
                return this.Return(void 0);
            }
        }
    }, {
        key: "Zero",
        value: function Zero() {
            return protectedCont(function (ctx) {
                return ctx.onSuccess(void 0);
            });
        }
    }]);

    return AsyncBuilder;
}();
var singleton = new AsyncBuilder();

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export logLevelStr */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Logger; });
/* unused harmony export logPass */
/* harmony export (immutable) */ __webpack_exports__["b"] = logPassN;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Map__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_List__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_Comparer__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_Util__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Symbol__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_MailboxProcessor__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_String__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_AsyncBuilder__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_1_fable_core_Date__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__nuget_packages_fable_core_1_3_1_fable_core_Option__ = __webpack_require__(5);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }














var logLevelStr = Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Map__["b" /* create */])(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([[0, "DEBUG"], [1, "INFO"], [2, "WARNING"], [3, "ERROR"], [4, "FATAL"]]), new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_Comparer__["a" /* default */](__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_Util__["g" /* comparePrimitives */]));
var Logger = function () {
    _createClass(Logger, [{
        key: __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Logger.Logger",
                properties: {
                    Debug: __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_Util__["e" /* Unit */],
                    Error: __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_Util__["e" /* Unit */],
                    Fatal: __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_Util__["e" /* Unit */],
                    Info: __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_Util__["e" /* Unit */],
                    Log: __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_Util__["e" /* Unit */],
                    Warn: __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_Util__["e" /* Unit */]
                }
            };
        }
    }]);

    function Logger(logLevel) {
        _classCallCheck(this, Logger);

        this.logLevel = logLevel | 0;
        this.agent = Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_MailboxProcessor__["a" /* start */])(function (inbox) {
            var messageLoop = function messageLoop() {
                return function (builder_) {
                    return builder_.Delay(function () {
                        return builder_.Bind(inbox.receive(), function (_arg1) {
                            Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_String__["e" /* toConsole */])(Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_String__["b" /* printf */])("%s"))(_arg1);
                            return builder_.ReturnFrom(messageLoop());
                        });
                    });
                }(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_AsyncBuilder__["f" /* singleton */]);
            };

            return messageLoop();
        });
    }

    _createClass(Logger, [{
        key: "postStr",
        value: function postStr(pType, msg, _arg2) {
            var _this = this;

            if (_arg2 != null) {
                (function () {
                    var objectArg = _this.agent;
                    return function (arg00) {
                        objectArg.post(arg00);
                    };
                })()(Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_String__["g" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_String__["b" /* printf */])("%s [%s] (%d) %s"))(pType, function () {
                    var copyOfStruct = Object(__WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_1_fable_core_Date__["b" /* now */])();
                    return Object(__WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_1_fable_core_Date__["c" /* toString */])(copyOfStruct, "yyyy-MM-dd HH:mm:ss");
                }(), Object(__WEBPACK_IMPORTED_MODULE_10__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(_arg2), msg));
            } else {
                (function () {
                    var objectArg_1 = _this.agent;
                    return function (arg00_1) {
                        objectArg_1.post(arg00_1);
                    };
                })()(Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_String__["g" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_String__["b" /* printf */])("%s [%s] %s"))(pType, function () {
                    var copyOfStruct_1 = Object(__WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_1_fable_core_Date__["b" /* now */])();
                    return Object(__WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_1_fable_core_Date__["c" /* toString */])(copyOfStruct_1, "yyyy-MM-dd HH:mm:ss");
                }(), msg));
            }
        }
    }, {
        key: "log",
        value: function log(t, l, msg) {
            if (t >= this.logLevel) {
                var pType = logLevelStr.get(t);
                this.postStr(pType, msg, l);
            }
        }
    }, {
        key: "Log",
        get: function get() {
            var _this2 = this;

            return Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["a" /* default */])(function (t, l, msg) {
                _this2.log(t, l, msg);
            });
        }
    }, {
        key: "Debug",
        get: function get() {
            var _this3 = this;

            return Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["a" /* default */])(function (l, msg) {
                _this3.log(0, l, msg);
            });
        }
    }, {
        key: "Info",
        get: function get() {
            var _this4 = this;

            return Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["a" /* default */])(function (l, msg) {
                _this4.log(1, l, msg);
            });
        }
    }, {
        key: "Warn",
        get: function get() {
            var _this5 = this;

            return Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["a" /* default */])(function (l, msg) {
                _this5.log(2, l, msg);
            });
        }
    }, {
        key: "Error",
        get: function get() {
            var _this6 = this;

            return Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["a" /* default */])(function (l, msg) {
                _this6.log(3, l, msg);
            });
        }
    }, {
        key: "Fatal",
        get: function get() {
            var _this7 = this;

            return Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["a" /* default */])(function (l, msg) {
                _this7.log(4, l, msg);
            });
        }
    }]);

    return Logger;
}();
Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["b" /* setType */])("Logger.Logger", Logger);
function logPass(line, log, s) {
    Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["b" /* partialApply */])(log, [line])(s);
    return s;
}
function logPassN(log, s) {
    Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["b" /* partialApply */])(log, [null])(s);
    return s;
}

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export offsetRegex */
/* unused harmony export padWithZeros */
/* unused harmony export offsetToString */
/* unused harmony export toHalfUTCString */
/* unused harmony export toStringWithOffset */
/* unused harmony export toStringWithKind */
/* harmony export (immutable) */ __webpack_exports__["c"] = toString;
/* unused harmony export default */
/* unused harmony export minValue */
/* unused harmony export maxValue */
/* unused harmony export parseRaw */
/* unused harmony export parse */
/* unused harmony export tryParse */
/* unused harmony export offset */
/* unused harmony export create */
/* harmony export (immutable) */ __webpack_exports__["b"] = now;
/* unused harmony export utcNow */
/* unused harmony export today */
/* unused harmony export isLeapYear */
/* unused harmony export daysInMonth */
/* unused harmony export toUniversalTime */
/* unused harmony export toLocalTime */
/* unused harmony export timeOfDay */
/* unused harmony export date */
/* unused harmony export day */
/* unused harmony export hour */
/* unused harmony export millisecond */
/* unused harmony export minute */
/* unused harmony export month */
/* unused harmony export second */
/* unused harmony export year */
/* unused harmony export dayOfWeek */
/* unused harmony export dayOfYear */
/* unused harmony export add */
/* unused harmony export addDays */
/* unused harmony export addHours */
/* unused harmony export addMinutes */
/* unused harmony export addSeconds */
/* unused harmony export addMilliseconds */
/* unused harmony export addYears */
/* unused harmony export addMonths */
/* unused harmony export subtract */
/* unused harmony export toLongDateString */
/* unused harmony export toShortDateString */
/* unused harmony export toLongTimeString */
/* unused harmony export toShortTimeString */
/* unused harmony export equals */
/* harmony export (immutable) */ __webpack_exports__["a"] = compare;
/* unused harmony export compareTo */
/* unused harmony export op_Addition */
/* unused harmony export op_Subtraction */
/* unused harmony export isDaylightSavingTime */
var offsetRegex = /(?:Z|[+-](\d{2}):?(\d{2})?)$/;
function padWithZeros(i, length) {
    var str = i.toString(10);
    while (str.length < length) {
        str = "0" + str;
    }
    return str;
}
function offsetToString(offset) {
    var isMinus = offset < 0;
    offset = Math.abs(offset);
    var hours = ~~(offset / 3600000);
    var minutes = offset % 3600000 / 60000;
    return (isMinus ? "-" : "+") + padWithZeros(hours, 2) + ":" + padWithZeros(minutes, 2);
}
function toHalfUTCString(date, half) {
    var str = date.toISOString();
    return half === "first" ? str.substring(0, str.indexOf("T")) : str.substring(str.indexOf("T") + 1, str.length - 1);
}
function toISOString(d, utc) {
    if (utc) {
        return d.toISOString();
    } else {
        // JS Date is always local
        var printOffset = d.kind == null ? true : d.kind === 2 /* Local */;
        return padWithZeros(d.getFullYear(), 4) + "-" + padWithZeros(d.getMonth() + 1, 2) + "-" + padWithZeros(d.getDate(), 2) + "T" + padWithZeros(d.getHours(), 2) + ":" + padWithZeros(d.getMinutes(), 2) + ":" + padWithZeros(d.getSeconds(), 2) + "." + padWithZeros(d.getMilliseconds(), 3) + (printOffset ? offsetToString(d.getTimezoneOffset() * -60000) : "");
    }
}
function toISOStringWithOffset(dateWithOffset, offset) {
    var str = dateWithOffset.toISOString();
    return str.substring(0, str.length - 1) + offsetToString(offset);
}
function toStringWithCustomFormat(date, format, utc) {
    return format.replace(/(\w)\1*/g, function (match) {
        var rep = match;
        switch (match.substring(0, 1)) {
            case "y":
                var y = utc ? date.getUTCFullYear() : date.getFullYear();
                rep = match.length < 4 ? y % 100 : y;
                break;
            case "M":
                rep = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
                break;
            case "d":
                rep = utc ? date.getUTCDate() : date.getDate();
                break;
            case "H":
                rep = utc ? date.getUTCHours() : date.getHours();
                break;
            case "h":
                var h = utc ? date.getUTCHours() : date.getHours();
                rep = h > 12 ? h % 12 : h;
                break;
            case "m":
                rep = utc ? date.getUTCMinutes() : date.getMinutes();
                break;
            case "s":
                rep = utc ? date.getUTCSeconds() : date.getSeconds();
                break;
        }
        if (rep !== match && rep < 10 && match.length > 1) {
            rep = "0" + rep;
        }
        return rep;
    });
}
function toStringWithOffset(date, format) {
    var d = new Date(date.getTime() + date.offset);
    if (!format) {
        return d.toISOString().replace(/\.\d+/, "").replace(/[A-Z]|\.\d+/g, " ") + offsetToString(date.offset);
    } else if (format.length === 1) {
        switch (format) {
            case "D":
            case "d":
                return toHalfUTCString(d, "first");
            case "T":
            case "t":
                return toHalfUTCString(d, "second");
            case "O":
            case "o":
                return toISOStringWithOffset(d, date.offset);
            default:
                throw new Error("Unrecognized Date print format");
        }
    } else {
        return toStringWithCustomFormat(d, format, true);
    }
}
function toStringWithKind(date, format) {
    var utc = date.kind === 1 /* UTC */;
    if (!format) {
        return utc ? date.toUTCString() : date.toLocaleString();
    } else if (format.length === 1) {
        switch (format) {
            case "D":
            case "d":
                return utc ? toHalfUTCString(date, "first") : date.toLocaleDateString();
            case "T":
            case "t":
                return utc ? toHalfUTCString(date, "second") : date.toLocaleTimeString();
            case "O":
            case "o":
                return toISOString(date, utc);
            default:
                throw new Error("Unrecognized Date print format");
        }
    } else {
        return toStringWithCustomFormat(date, format, utc);
    }
}
function toString(date, format) {
    return date.offset != null ? toStringWithOffset(date, format) : toStringWithKind(date, format);
}
function DateTime(value, kind) {
    kind = kind == null ? 0 /* Unspecified */ : kind;
    var d = new Date(value);
    d.kind = kind | 0;
    return d;
}
function minValue() {
    // This is "0001-01-01T00:00:00.000Z", actual JS min value is -8640000000000000
    return DateTime(-62135596800000, 0 /* Unspecified */);
}
function maxValue() {
    // This is "9999-12-31T23:59:59.999Z", actual JS max value is 8640000000000000
    return DateTime(253402300799999, 0 /* Unspecified */);
}
function parseRaw(str) {
    var date = new Date(str);
    if (isNaN(date.getTime())) {
        // Check if this is a time-only string, which JS Date parsing cannot handle (see #1045)
        if (/^(?:[01]?\d|2[0-3]):(?:[0-5]?\d)(?::[0-5]?\d(?:\.\d+)?)?(?:\s*[AaPp][Mm])?$/.test(str)) {
            var d = new Date();
            date = new Date(d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + " " + str);
        } else {
            throw new Error("The string is not a valid Date.");
        }
    }
    return date;
}
function parse(str) {
    var detectUTC = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var date = parseRaw(str);
    var offset = offsetRegex.exec(str);
    // .NET always parses DateTime as Local if there's offset info (even "Z")
    // Newtonsoft.Json uses UTC if the offset is "Z"
    var kind = offset != null ? detectUTC && offset[0] === "Z" ? 1 /* UTC */ : 2 /* Local */ : 0 /* Unspecified */;
    return DateTime(date.getTime(), kind);
}
function tryParse(v) {
    try {
        return [true, parse(v)];
    } catch (_err) {
        return [false, minValue()];
    }
}
function offset(date) {
    var date1 = date;
    return typeof date1.offset === "number" ? date1.offset : date.kind === 1 /* UTC */
    ? 0 : date.getTimezoneOffset() * -60000;
}
function create(year, month, day) {
    var h = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var m = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var s = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
    var ms = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
    var kind = arguments[7];

    var dateValue = kind === 1 /* UTC */
    ? Date.UTC(year, month - 1, day, h, m, s, ms) : new Date(year, month - 1, day, h, m, s, ms).getTime();
    if (isNaN(dateValue)) {
        throw new Error("The parameters describe an unrepresentable Date.");
    }
    var date = DateTime(dateValue, kind);
    if (year <= 99) {
        date.setFullYear(year, month - 1, day);
    }
    return date;
}
function now() {
    return DateTime(Date.now(), 2 /* Local */);
}
function utcNow() {
    return DateTime(Date.now(), 1 /* UTC */);
}
function today() {
    return date(now());
}
function isLeapYear(year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}
function daysInMonth(year, month) {
    return month === 2 ? isLeapYear(year) ? 29 : 28 : month >= 8 ? month % 2 === 0 ? 31 : 30 : month % 2 === 0 ? 30 : 31;
}
function toUniversalTime(date) {
    return date.kind === 1 /* UTC */ ? date : DateTime(date.getTime(), 1 /* UTC */);
}
function toLocalTime(date) {
    return date.kind === 2 /* Local */ ? date : DateTime(date.getTime(), 2 /* Local */);
}
function timeOfDay(d) {
    return hour(d) * 3600000 + minute(d) * 60000 + second(d) * 1000 + millisecond(d);
}
function date(d) {
    return create(year(d), month(d), day(d), 0, 0, 0, 0, d.kind);
}
function day(d) {
    return d.kind === 1 /* UTC */ ? d.getUTCDate() : d.getDate();
}
function hour(d) {
    return d.kind === 1 /* UTC */ ? d.getUTCHours() : d.getHours();
}
function millisecond(d) {
    return d.kind === 1 /* UTC */ ? d.getUTCMilliseconds() : d.getMilliseconds();
}
function minute(d) {
    return d.kind === 1 /* UTC */ ? d.getUTCMinutes() : d.getMinutes();
}
function month(d) {
    return (d.kind === 1 /* UTC */ ? d.getUTCMonth() : d.getMonth()) + 1;
}
function second(d) {
    return d.kind === 1 /* UTC */ ? d.getUTCSeconds() : d.getSeconds();
}
function year(d) {
    return d.kind === 1 /* UTC */ ? d.getUTCFullYear() : d.getFullYear();
}
function dayOfWeek(d) {
    return d.kind === 1 /* UTC */ ? d.getUTCDay() : d.getDay();
}
function dayOfYear(d) {
    var _year = year(d);
    var _month = month(d);
    var _day = day(d);
    for (var i = 1; i < _month; i++) {
        _day += daysInMonth(_year, i);
    }
    return _day;
}
function add(d, ts) {
    return DateTime(d.getTime() + ts, d.kind);
}
function addDays(d, v) {
    return DateTime(d.getTime() + v * 86400000, d.kind);
}
function addHours(d, v) {
    return DateTime(d.getTime() + v * 3600000, d.kind);
}
function addMinutes(d, v) {
    return DateTime(d.getTime() + v * 60000, d.kind);
}
function addSeconds(d, v) {
    return DateTime(d.getTime() + v * 1000, d.kind);
}
function addMilliseconds(d, v) {
    return DateTime(d.getTime() + v, d.kind);
}
function addYears(d, v) {
    var newMonth = month(d);
    var newYear = year(d) + v;
    var _daysInMonth = daysInMonth(newYear, newMonth);
    var newDay = Math.min(_daysInMonth, day(d));
    return create(newYear, newMonth, newDay, hour(d), minute(d), second(d), millisecond(d), d.kind);
}
function addMonths(d, v) {
    var newMonth = month(d) + v;
    var newMonth_ = 0;
    var yearOffset = 0;
    if (newMonth > 12) {
        newMonth_ = newMonth % 12;
        yearOffset = Math.floor(newMonth / 12);
        newMonth = newMonth_;
    } else if (newMonth < 1) {
        newMonth_ = 12 + newMonth % 12;
        yearOffset = Math.floor(newMonth / 12) + (newMonth_ === 12 ? -1 : 0);
        newMonth = newMonth_;
    }
    var newYear = year(d) + yearOffset;
    var _daysInMonth = daysInMonth(newYear, newMonth);
    var newDay = Math.min(_daysInMonth, day(d));
    return create(newYear, newMonth, newDay, hour(d), minute(d), second(d), millisecond(d), d.kind);
}
function subtract(d, that) {
    return typeof that === "number" ? DateTime(d.getTime() - that, d.kind) : d.getTime() - that.getTime();
}
function toLongDateString(d) {
    return d.toDateString();
}
function toShortDateString(d) {
    return d.toLocaleDateString();
}
function toLongTimeString(d) {
    return d.toLocaleTimeString();
}
function toShortTimeString(d) {
    return d.toLocaleTimeString().replace(/:\d\d(?!:)/, "");
}
function equals(d1, d2) {
    return d1.getTime() === d2.getTime();
}
function compare(x, y) {
    var xtime = x.getTime();
    var ytime = y.getTime();
    return xtime === ytime ? 0 : xtime < ytime ? -1 : 1;
}
var compareTo = compare;
function op_Addition(x, y) {
    return add(x, y);
}
function op_Subtraction(x, y) {
    return subtract(x, y);
}
function isDaylightSavingTime(x) {
    var jan = new Date(x.getFullYear(), 0, 1);
    var jul = new Date(x.getFullYear(), 6, 1);
    return isDST(jan.getTimezoneOffset(), jul.getTimezoneOffset(), x.getTimezoneOffset());
}
function isDST(janOffset, julOffset, tOffset) {
    return Math.min(janOffset, julOffset) === tOffset;
}

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = create;
/* harmony export (immutable) */ __webpack_exports__["b"] = escape;
/* unused harmony export unescape */
/* unused harmony export isMatch */
/* harmony export (immutable) */ __webpack_exports__["c"] = match;
/* unused harmony export matches */
/* unused harmony export options */
/* unused harmony export replace */
/* unused harmony export split */
function create(pattern, options) {
    var flags = "g";
    flags += options & 1 ? "i" : "";
    flags += options & 2 ? "m" : "";
    return new RegExp(pattern, flags);
}
// From http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
function escape(str) {
    return str.replace(/[\-\[\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
function unescape(str) {
    return str.replace(/\\([\-\[\/\{\}\(\)\*\+\?\.\\\^\$\|])/g, "$1");
}
function isMatch(str, pattern) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    var reg = void 0;
    reg = str instanceof RegExp ? (reg = str, str = pattern, reg.lastIndex = options, reg) : reg = create(pattern, options);
    return reg.test(str);
}
function match(str, pattern) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    var reg = void 0;
    reg = str instanceof RegExp ? (reg = str, str = pattern, reg.lastIndex = options, reg) : reg = create(pattern, options);
    return reg.exec(str);
}
function matches(str, pattern) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    var reg = void 0;
    reg = str instanceof RegExp ? (reg = str, str = pattern, reg.lastIndex = options, reg) : reg = create(pattern, options);
    if (!reg.global) {
        throw new Error("Non-global RegExp"); // Prevent infinite loop
    }
    var m = reg.exec(str);
    var matches = [];
    while (m !== null) {
        matches.push(m);
        m = reg.exec(str);
    }
    return matches;
}
function options(reg) {
    var options = 256; // ECMAScript
    options |= reg.ignoreCase ? 1 : 0;
    options |= reg.multiline ? 2 : 0;
    return options;
}
function replace(reg, input, replacement, limit) {
    var offset = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

    function replacer() {
        var res = arguments[0];
        if (limit !== 0) {
            limit--;
            var _match = [];
            var len = arguments.length;
            for (var i = 0; i < len - 2; i++) {
                _match.push(arguments[i]);
            }
            _match.index = arguments[len - 2];
            _match.input = arguments[len - 1];
            res = replacement(_match);
        }
        return res;
    }
    if (typeof reg === "string") {
        var tmp = reg;
        reg = create(input, limit);
        input = tmp;
        limit = undefined;
    }
    if (typeof replacement === "function") {
        limit = limit == null ? -1 : limit;
        return input.substring(0, offset) + input.substring(offset).replace(reg, replacer);
    } else {
        // $0 doesn't work with JS regex, see #1155
        replacement = replacement.replace(/\$0/g, function (s) {
            return "$&";
        });
        if (limit != null) {
            var m = void 0;
            var sub1 = input.substring(offset);
            var _matches = matches(reg, sub1);
            var sub2 = matches.length > limit ? (m = _matches[limit - 1], sub1.substring(0, m.index + m[0].length)) : sub1;
            return input.substring(0, offset) + sub2.replace(reg, replacement) + input.substring(offset + sub2.length);
        } else {
            return input.replace(reg, replacement);
        }
    }
}
function split(reg, input, limit) {
    var offset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    if (typeof reg === "string") {
        var tmp = reg;
        reg = create(input, limit);
        input = tmp;
        limit = undefined;
    }
    input = input.substring(offset);
    return input.split(reg, limit);
}

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createCancellationToken */
/* unused harmony export cancel */
/* unused harmony export cancelAfter */
/* unused harmony export isCancellationRequested */
/* unused harmony export startChild */
/* unused harmony export awaitPromise */
/* unused harmony export cancellationToken */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return defaultCancellationToken; });
/* unused harmony export catchAsync */
/* harmony export (immutable) */ __webpack_exports__["b"] = fromContinuations;
/* unused harmony export ignore */
/* unused harmony export parallel */
/* unused harmony export sleep */
/* unused harmony export start */
/* harmony export (immutable) */ __webpack_exports__["c"] = startImmediate;
/* unused harmony export startWithContinuations */
/* unused harmony export startAsPromise */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AsyncBuilder__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Choice__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Seq__ = __webpack_require__(1);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }








// Implemented just for type references

var Async = function Async() {
    _classCallCheck(this, Async);
};

/* unused harmony default export */ var _unused_webpack_default_export = (Async);

function emptyContinuation(x) {
    // NOP
}
function createCancellationToken(arg) {
    var token = { isCancelled: false };
    if (typeof arg === "number") {
        setTimeout(function () {
            token.isCancelled = true;
        }, arg);
    } else if (typeof arg === "boolean") {
        token.isCancelled = arg;
    }
    return token;
}
function cancel(token) {
    token.isCancelled = true;
}
function cancelAfter(token, ms) {
    setTimeout(function () {
        token.isCancelled = true;
    }, ms);
}
function isCancellationRequested(token) {
    return token != null && token.isCancelled;
}
function startChild(computation) {
    var promise = startAsPromise(computation);
    // JS Promises are hot, computation has already started
    // but we delay returning the result
    return Object(__WEBPACK_IMPORTED_MODULE_0__AsyncBuilder__["d" /* protectedCont */])(function (ctx) {
        return Object(__WEBPACK_IMPORTED_MODULE_0__AsyncBuilder__["e" /* protectedReturn */])(awaitPromise(promise))(ctx);
    });
}
function awaitPromise(p) {
    return fromContinuations(function (conts) {
        return p.then(conts[0]).catch(function (err) {
            return (err instanceof __WEBPACK_IMPORTED_MODULE_0__AsyncBuilder__["a" /* OperationCanceledError */] ? conts[2] : conts[1])(err);
        });
    });
}
function cancellationToken() {
    return Object(__WEBPACK_IMPORTED_MODULE_0__AsyncBuilder__["d" /* protectedCont */])(function (ctx) {
        return ctx.onSuccess(ctx.cancelToken);
    });
}
var defaultCancellationToken = { isCancelled: false };
function catchAsync(work) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__AsyncBuilder__["d" /* protectedCont */])(function (ctx) {
        work({
            onSuccess: function onSuccess(x) {
                return ctx.onSuccess(Object(__WEBPACK_IMPORTED_MODULE_1__Choice__["a" /* choice1Of2 */])(x));
            },
            onError: function onError(ex) {
                return ctx.onSuccess(Object(__WEBPACK_IMPORTED_MODULE_1__Choice__["b" /* choice2Of2 */])(ex));
            },
            onCancel: ctx.onCancel,
            cancelToken: ctx.cancelToken,
            trampoline: ctx.trampoline
        });
    });
}
function fromContinuations(f) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__AsyncBuilder__["d" /* protectedCont */])(function (ctx) {
        return f([ctx.onSuccess, ctx.onError, ctx.onCancel]);
    });
}
function ignore(computation) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__AsyncBuilder__["c" /* protectedBind */])(computation, function (x) {
        return Object(__WEBPACK_IMPORTED_MODULE_0__AsyncBuilder__["e" /* protectedReturn */])(void 0);
    });
}
function parallel(computations) {
    return awaitPromise(Promise.all(Object(__WEBPACK_IMPORTED_MODULE_2__Seq__["i" /* map */])(function (w) {
        return startAsPromise(w);
    }, computations)));
}
function sleep(millisecondsDueTime) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__AsyncBuilder__["d" /* protectedCont */])(function (ctx) {
        setTimeout(function () {
            return ctx.cancelToken.isCancelled ? ctx.onCancel(new __WEBPACK_IMPORTED_MODULE_0__AsyncBuilder__["a" /* OperationCanceledError */]()) : ctx.onSuccess(void 0);
        }, millisecondsDueTime);
    });
}
function start(computation, cancellationToken) {
    return startWithContinuations(computation, cancellationToken);
}
function startImmediate(computation, cancellationToken) {
    return start(computation, cancellationToken);
}
function startWithContinuations(computation, continuation, exceptionContinuation, cancellationContinuation, cancelToken) {
    if (typeof continuation !== "function") {
        cancelToken = continuation;
        continuation = null;
    }
    var trampoline = new __WEBPACK_IMPORTED_MODULE_0__AsyncBuilder__["b" /* Trampoline */]();
    computation({
        onSuccess: continuation ? continuation : emptyContinuation,
        onError: exceptionContinuation ? exceptionContinuation : emptyContinuation,
        onCancel: cancellationContinuation ? cancellationContinuation : emptyContinuation,
        cancelToken: cancelToken ? cancelToken : defaultCancellationToken,
        trampoline: trampoline
    });
}
function startAsPromise(computation, cancellationToken) {
    return new Promise(function (resolve, reject) {
        return startWithContinuations(computation, resolve, reject, reject, cancellationToken ? cancellationToken : defaultCancellationToken);
    });
}

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = choice1Of2;
/* harmony export (immutable) */ __webpack_exports__["b"] = choice2Of2;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Util__ = __webpack_require__(3);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




function choice1Of2(v) {
    return new Choice(0, v);
}
function choice2Of2(v) {
    return new Choice(1, v);
}

var Choice = function () {
    function Choice(tag, data) {
        _classCallCheck(this, Choice);

        this.tag = tag | 0;
        this.data = data;
    }

    _createClass(Choice, [{
        key: "Equals",
        value: function Equals(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__Util__["l" /* equalsUnions */])(this, other);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__Util__["i" /* compareUnions */])(this, other);
        }
    }, {
        key: __WEBPACK_IMPORTED_MODULE_0__Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Microsoft.FSharp.Core.FSharpChoice",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: [["Choice1Of2", __WEBPACK_IMPORTED_MODULE_1__Util__["a" /* Any */]], ["Choice2Of2", __WEBPACK_IMPORTED_MODULE_1__Util__["a" /* Any */]]]
            };
        }
    }, {
        key: "valueIfChoice1",
        get: function get() {
            return this.tag === 0 ? this.data : null;
        }
    }, {
        key: "valueIfChoice2",
        get: function get() {
            return this.tag === 1 ? this.data : null;
        }
    }]);

    return Choice;
}();

/* harmony default export */ __webpack_exports__["c"] = (Choice);

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export map */
/* unused harmony export mapIndexed */
/* unused harmony export indexed */
/* unused harmony export addRangeInPlace */
/* unused harmony export copyTo */
/* unused harmony export partition */
/* harmony export (immutable) */ __webpack_exports__["b"] = permute;
/* unused harmony export removeInPlace */
/* unused harmony export setSlice */
/* unused harmony export sortInPlaceBy */
/* unused harmony export unzip */
/* unused harmony export unzip3 */
/* harmony export (immutable) */ __webpack_exports__["a"] = chunkBySize;
/* unused harmony export getSubArray */
/* unused harmony export fill */
/* unused harmony export splitAt */
function map(f, source, TargetCons) {
    var target = new TargetCons(source.length);
    for (var i = 0; i < source.length; i++) {
        target[i] = f(source[i]);
    }
    return target;
}
function mapIndexed(f, source, TargetCons) {
    var target = new TargetCons(source.length);
    for (var i = 0; i < source.length; i++) {
        target[i] = f(i, source[i]);
    }
    return target;
}
function indexed(source) {
    return mapIndexed(function (i, x) {
        return [i, x];
    }, source, Array);
}
function addRangeInPlace(range, xs) {
    var iter = range[Symbol.iterator]();
    var cur = iter.next();
    while (!cur.done) {
        xs.push(cur.value);
        cur = iter.next();
    }
}
function copyTo(source, sourceIndex, target, targetIndex, count) {
    while (count--) {
        target[targetIndex++] = source[sourceIndex++];
    }
}
function partition(f, xs) {
    var ys = [];
    var zs = [];
    var j = 0;
    var k = 0;
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i])) {
            ys[j++] = xs[i];
        } else {
            zs[k++] = xs[i];
        }
    }
    return [ys, zs];
}
function permute(f, xs) {
    // Keep the type of the array
    var ys = xs.map(function () {
        return null;
    });
    var checkFlags = new Array(xs.length);
    for (var i = 0; i < xs.length; i++) {
        var j = f(i);
        if (j < 0 || j >= xs.length) {
            throw new Error("Not a valid permutation");
        }
        ys[j] = xs[i];
        checkFlags[j] = 1;
    }
    for (var _i = 0; _i < xs.length; _i++) {
        if (checkFlags[_i] !== 1) {
            throw new Error("Not a valid permutation");
        }
    }
    return ys;
}
function removeInPlace(item, xs) {
    var i = xs.indexOf(item);
    if (i > -1) {
        xs.splice(i, 1);
        return true;
    }
    return false;
}
function setSlice(target, lower, upper, source) {
    var length = (upper || target.length - 1) - lower;
    if (ArrayBuffer.isView(target) && source.length <= length) {
        target.set(source, lower);
    } else {
        for (var i = lower | 0, j = 0; j <= length; i++, j++) {
            target[i] = source[j];
        }
    }
}
function sortInPlaceBy(f, xs) {
    var dir = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

    return xs.sort(function (x, y) {
        x = f(x);
        y = f(y);
        return (x < y ? -1 : x === y ? 0 : 1) * dir;
    });
}
function unzip(xs) {
    var bs = new Array(xs.length);
    var cs = new Array(xs.length);
    for (var i = 0; i < xs.length; i++) {
        bs[i] = xs[i][0];
        cs[i] = xs[i][1];
    }
    return [bs, cs];
}
function unzip3(xs) {
    var bs = new Array(xs.length);
    var cs = new Array(xs.length);
    var ds = new Array(xs.length);
    for (var i = 0; i < xs.length; i++) {
        bs[i] = xs[i][0];
        cs[i] = xs[i][1];
        ds[i] = xs[i][2];
    }
    return [bs, cs, ds];
}
function chunkBySize(size, xs) {
    if (size < 1) {
        throw new Error("The input must be positive. parameter name: chunkSize");
    }
    if (xs.length === 0) {
        return [[]];
    }
    var result = [];
    // add each chunk to the result
    for (var x = 0; x < Math.ceil(xs.length / size); x++) {
        var start = x * size;
        var end = start + size;
        result.push(xs.slice(start, end));
    }
    return result;
}
function getSubArray(xs, startIndex, count) {
    return xs.slice(startIndex, startIndex + count);
}
function fill(target, targetIndex, count, value) {
    target.fill(value, targetIndex, targetIndex + count);
}
function splitAt(index, xs) {
    if (index < 0) {
        throw new Error("The input must be non-negative.");
    }
    if (index > xs.length) {
        throw new Error("The input sequence has an insufficient number of elements.");
    }
    return [xs.slice(0, index), xs.slice(index)];
}

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CellReference; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Operand; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Expr; });
/* harmony export (immutable) */ __webpack_exports__["i"] = whitespaceFilter;
/* harmony export (immutable) */ __webpack_exports__["e"] = countDelim;
/* harmony export (immutable) */ __webpack_exports__["f"] = delimSplit;
/* unused harmony export listCopies */
/* unused harmony export unfoldTuple3 */
/* harmony export (immutable) */ __webpack_exports__["d"] = cellRange;
/* harmony export (immutable) */ __webpack_exports__["h"] = simpleLex;
/* unused harmony export lexY */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return logger; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_Result__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_String__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_Seq__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_RegExp__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Types_fs__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_Option__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Logger_Logger_fs__ = __webpack_require__(14);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }













var CellReference = function () {
    function CellReference(tag, data) {
        _classCallCheck(this, CellReference);

        this.tag = tag;
        this.data = data;
    }

    _createClass(CellReference, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "MarkalcShared.CellReference",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: [["RowCol", "number", "number"]]
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return this === other || this.tag === other.tag && Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["j" /* equals */])(this.data, other.data);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["i" /* compareUnions */])(this, other) | 0;
        }
    }]);

    return CellReference;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["b" /* setType */])("MarkalcShared.CellReference", CellReference);
var Operand = function () {
    function Operand(tag, data) {
        _classCallCheck(this, Operand);

        this.tag = tag;
        this.data = data;
    }

    _createClass(Operand, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "MarkalcShared.Operand",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: [["CellRef", CellReference], ["Integer", "number"], ["Float", "number"]]
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return this === other || this.tag === other.tag && Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["j" /* equals */])(this.data, other.data);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["i" /* compareUnions */])(this, other) | 0;
        }
    }]);

    return Operand;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["b" /* setType */])("MarkalcShared.Operand", Operand);
var Expr = function () {
    function Expr(tag, data) {
        _classCallCheck(this, Expr);

        this.tag = tag;
        this.data = data;
    }

    _createClass(Expr, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "MarkalcShared.Expr",
                interfaces: ["FSharpUnion"],
                cases: [["BinExp", Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["b" /* Function */])(["number", "number", "number"]), Expr, Expr], ["Op", Operand], ["CommaFunction", "string", Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["m" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */], {
                    T: Expr
                })]]
            };
        }
    }]);

    return Expr;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["b" /* setType */])("MarkalcShared.Expr", Expr);
function whitespaceFilter(lst) {
    return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["d" /* filter */])(function (_arg1) {
        return _arg1.tag === 2 ? false : true;
    }, lst);
}
function countDelim(delim, tokList) {
    return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["d" /* filter */])(function (_arg1) {
        return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["j" /* equals */])(_arg1, delim) ? true : false;
    }, tokList).length | 0;
}
function delimSplit(last, delim, t) {
    var delimSplitFirst_ = function delimSplitFirst_(delim_1, before, t_1) {
        delimSplitFirst_: while (true) {
            var $var1 = t_1.tail != null ? Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["j" /* equals */])(t_1.head, delim_1) ? [0, t_1.tail, t_1.head] : [1] : [1];

            switch ($var1[0]) {
                case 0:
                    return new __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_Result__["b" /* default */](0, [before, $var1[1]]);

                case 1:
                    if (t_1.tail == null) {
                        return new __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_Result__["b" /* default */](1, [before, new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */]()]);
                    } else {
                        delim_1 = delim_1;
                        before = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](t_1.head, before);
                        t_1 = t_1.tail;
                        continue delimSplitFirst_;
                    }

            }
        }
    };

    var delimSplitLast_ = function delimSplitLast_(delim_2, before_1, t_2) {
        var _loop = function _loop() {
            var matchValue = [t_2, countDelim(delim_2, t_2)];
            var $var2 = matchValue[0].tail != null ? matchValue[1] === 1 ? function () {
                var d = matchValue[0].head;
                var after_1 = matchValue[0].tail;
                return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["j" /* equals */])(d, delim_2);
            }() ? [0, matchValue[0].tail, matchValue[0].head] : [1] : [1] : [1];

            switch ($var2[0]) {
                case 0:
                    return {
                        v: new __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_Result__["b" /* default */](0, [before_1, $var2[1]])
                    };

                case 1:
                    if (matchValue[0].tail == null) {
                        return {
                            v: new __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_Result__["b" /* default */](1, [before_1, new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */]()])
                        };
                    } else {
                        var x = matchValue[0].head;
                        var after = matchValue[0].tail;
                        delim_2 = delim_2;
                        before_1 = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](x, before_1);
                        t_2 = after;
                        return "continue|delimSplitLast_";
                    }

            }
        };

        delimSplitLast_: while (true) {
            var _ret = _loop();

            switch (_ret) {
                case "continue|delimSplitLast_":
                    continue delimSplitLast_;

                default:
                    if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
            }
        }
    };

    var searchFunc = last ? delimSplitLast_ : delimSplitFirst_;
    return function (_arg1) {
        if (_arg1.tag === 0) {
            var before_2 = _arg1.data[0];
            var a = _arg1.data[1];
            return new __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_Result__["b" /* default */](0, [Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["h" /* reverse */])(before_2), a]);
        } else {
            var before_3 = _arg1.data[0];
            var a_1 = _arg1.data[1];
            return new __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_Result__["b" /* default */](1, [Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["h" /* reverse */])(before_3), a_1]);
        }
    }(searchFunc(delim, new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](), t));
}
function listCopies(i, lst) {
    if (i === 0) {
        return new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */]();
    } else if (i === 1) {
        return lst;
    } else if (i < 0) {
        return Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_String__["f" /* toFail */])(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_String__["b" /* printf */])("Negative argument: %A"))(i);
    } else {
        return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["a" /* append */])(lst, listCopies(i - 1, lst));
    }
}
function unfoldTuple3(func, a, b, c) {
    return func(a, b, c);
}
function cellRange(p1, p2) {
    var matchValue = [p1, p2];
    var p2r = matchValue[1].data[0];
    var p2c = matchValue[1].data[1];
    var p1r = matchValue[0].data[0];
    var p1c = matchValue[0].data[1];

    var genList = function genList(a, b) {
        if (a < b) {
            return Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_Seq__["n" /* toList */])(Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_Seq__["k" /* range */])(a, b));
        } else {
            return Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_Seq__["n" /* toList */])(Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_Seq__["k" /* range */])(b, a));
        }
    };

    var matchValue_1 = [p1r === p2r, p1c === p2c];

    if (matchValue_1[0]) {
        if (matchValue_1[1]) {
            return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([new CellReference(0, [p1r, p1c])]);
        } else {
            return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["e" /* map */])(function ($var3) {
                return function (tupledArg) {
                    return new CellReference(0, [tupledArg[0], tupledArg[1]]);
                }(function (i) {
                    return [p1r, i];
                }($var3));
            }, genList(p1c, p2c));
        }
    } else if (matchValue_1[1]) {
        return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["e" /* map */])(function ($var4) {
            return function (tupledArg_1) {
                return new CellReference(0, [tupledArg_1[0], tupledArg_1[1]]);
            }(function (i_1) {
                return [i_1, p1c];
            }($var4));
        }, genList(p1r, p2r));
    } else {
        return null;
    }
}
function simpleLex(txt) {
    var _RegexMatch___ = function _RegexMatch___(r, txt_1) {
        var m = Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_RegExp__["c" /* match */])(txt_1, "^" + r);
        var matchValue = m != null;

        if (matchValue) {
            return [m[0], txt_1.substr(m[0].length)];
        } else {
            return null;
        }
    };

    var simpleLex_ = function simpleLex_(a, txt_2) {
        simpleLex_: while (true) {
            var activePatternResult884 = _RegexMatch___("[\\s]+", txt_2);

            if (activePatternResult884 != null) {
                a = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["o" /* Token */](2, Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult884)[0].length), a);
                txt_2 = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult884)[1];
                continue simpleLex_;
            } else {
                var activePatternResult882 = _RegexMatch___("[0-9]+", txt_2);

                if (activePatternResult882 != null) {
                    a = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["o" /* Token */](3, Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult882)[0]), a);
                    txt_2 = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult882)[1];
                    continue simpleLex_;
                } else {
                    var activePatternResult880 = _RegexMatch___("\\^", txt_2);

                    if (activePatternResult880 != null) {
                        a = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["o" /* Token */](34), a);
                        txt_2 = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult880)[1];
                        continue simpleLex_;
                    } else {
                        var activePatternResult878 = _RegexMatch___("\\%", txt_2);

                        if (activePatternResult878 != null) {
                            a = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["o" /* Token */](35), a);
                            txt_2 = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult878)[1];
                            continue simpleLex_;
                        } else {
                            var activePatternResult876 = _RegexMatch___("\\*", txt_2);

                            if (activePatternResult876 != null) {
                                a = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["o" /* Token */](9), a);
                                txt_2 = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult876)[1];
                                continue simpleLex_;
                            } else {
                                var activePatternResult874 = _RegexMatch___("\\/", txt_2);

                                if (activePatternResult874 != null) {
                                    a = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["o" /* Token */](25), a);
                                    txt_2 = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult874)[1];
                                    continue simpleLex_;
                                } else {
                                    var activePatternResult872 = _RegexMatch___("\\+", txt_2);

                                    if (activePatternResult872 != null) {
                                        a = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["o" /* Token */](8), a);
                                        txt_2 = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult872)[1];
                                        continue simpleLex_;
                                    } else {
                                        var activePatternResult870 = _RegexMatch___("\\-", txt_2);

                                        if (activePatternResult870 != null) {
                                            a = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["o" /* Token */](7), a);
                                            txt_2 = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult870)[1];
                                            continue simpleLex_;
                                        } else {
                                            var activePatternResult868 = _RegexMatch___("\\(", txt_2);

                                            if (activePatternResult868 != null) {
                                                a = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["o" /* Token */](22), a);
                                                txt_2 = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult868)[1];
                                                continue simpleLex_;
                                            } else {
                                                var activePatternResult866 = _RegexMatch___("\\)", txt_2);

                                                if (activePatternResult866 != null) {
                                                    a = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["o" /* Token */](23), a);
                                                    txt_2 = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult866)[1];
                                                    continue simpleLex_;
                                                } else {
                                                    var activePatternResult864 = _RegexMatch___("\\[", txt_2);

                                                    if (activePatternResult864 != null) {
                                                        a = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["o" /* Token */](20), a);
                                                        txt_2 = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult864)[1];
                                                        continue simpleLex_;
                                                    } else {
                                                        var activePatternResult862 = _RegexMatch___("\\]", txt_2);

                                                        if (activePatternResult862 != null) {
                                                            a = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["o" /* Token */](21), a);
                                                            txt_2 = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult862)[1];
                                                            continue simpleLex_;
                                                        } else {
                                                            var activePatternResult860 = _RegexMatch___("\\=", txt_2);

                                                            if (activePatternResult860 != null) {
                                                                a = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["o" /* Token */](6), a);
                                                                txt_2 = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult860)[1];
                                                                continue simpleLex_;
                                                            } else {
                                                                var activePatternResult858 = _RegexMatch___("\\.", txt_2);

                                                                if (activePatternResult858 != null) {
                                                                    a = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["o" /* Token */](10), a);
                                                                    txt_2 = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult858)[1];
                                                                    continue simpleLex_;
                                                                } else {
                                                                    var activePatternResult856 = _RegexMatch___("\\,", txt_2);

                                                                    if (activePatternResult856 != null) {
                                                                        a = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["o" /* Token */](11), a);
                                                                        txt_2 = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult856)[1];
                                                                        continue simpleLex_;
                                                                    } else {
                                                                        var activePatternResult854 = _RegexMatch___("\\{", txt_2);

                                                                        if (activePatternResult854 != null) {
                                                                            a = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["o" /* Token */](28), a);
                                                                            txt_2 = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult854)[1];
                                                                            continue simpleLex_;
                                                                        } else {
                                                                            var activePatternResult852 = _RegexMatch___("\\}", txt_2);

                                                                            if (activePatternResult852 != null) {
                                                                                a = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["o" /* Token */](29), a);
                                                                                txt_2 = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult852)[1];
                                                                                continue simpleLex_;
                                                                            } else {
                                                                                var activePatternResult850 = _RegexMatch___("[a-zA-z]+[0-9]*( [a-zA-z]+[0-9]*)*", txt_2);

                                                                                if (activePatternResult850 != null) {
                                                                                    a = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["o" /* Token */](1, Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult850)[0]), a);
                                                                                    txt_2 = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult850)[1];
                                                                                    continue simpleLex_;
                                                                                } else {
                                                                                    var activePatternResult848 = _RegexMatch___("\\|", txt_2);

                                                                                    if (activePatternResult848 != null) {
                                                                                        a = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["o" /* Token */](5), a);
                                                                                        txt_2 = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult848)[1];
                                                                                        continue simpleLex_;
                                                                                    } else {
                                                                                        var activePatternResult846 = _RegexMatch___("\\:", txt_2);

                                                                                        if (activePatternResult846 != null) {
                                                                                            a = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["o" /* Token */](33), a);
                                                                                            txt_2 = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult846)[1];
                                                                                            continue simpleLex_;
                                                                                        } else {
                                                                                            var activePatternResult844 = _RegexMatch___("\\;", txt_2);

                                                                                            if (activePatternResult844 != null) {
                                                                                                a = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["o" /* Token */](36), a);
                                                                                                txt_2 = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult844)[1];
                                                                                                continue simpleLex_;
                                                                                            } else if (txt_2 === "") {
                                                                                                return a;
                                                                                            } else {
                                                                                                return Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_String__["f" /* toFail */])(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_String__["b" /* printf */])("Unexpected character: %A"))(txt_2);
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["h" /* reverse */])(simpleLex_(new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](), txt));
}
function lexY(x, y, z) {
    return [x, simpleLex(y), z];
}
var logger = new __WEBPACK_IMPORTED_MODULE_9__Logger_Logger_fs__["a" /* Logger */](1);

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export takeFirst */
/* unused harmony export strRegexMatch */
/* unused harmony export strStartsWith */
/* harmony export (immutable) */ __webpack_exports__["f"] = toString;
/* unused harmony export strReplace */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return _RegexMatch___; });
/* harmony export (immutable) */ __webpack_exports__["e"] = literalString;
/* unused harmony export $7C$CharMatch$7C$_$7C$ */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _Character___; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return _EscapedChar___; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return _GroupMatch___; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_RegExp__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Seq__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_String__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_List__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__ = __webpack_require__(5);





function takeFirst(a, _arg1, _arg2) {
    return a;
}
function strRegexMatch(regex, str) {
    var m = Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_RegExp__["c" /* match */])(Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_RegExp__["a" /* create */])(regex), str);

    if (m != null) {
        var mLst = Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Seq__["n" /* toList */])(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Seq__["d" /* delay */])(function () {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Seq__["i" /* map */])(function (x) {
                return x;
            }, m);
        }));
        return [mLst.head, mLst.tail];
    } else {
        return null;
    }
}
function strStartsWith(value, str) {
    return str.indexOf(value) === 0;
}
function toString(c) {
    return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_String__["a" /* join */])("", Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([c]));
}
function strReplace(o, n, s) {
    return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_String__["c" /* replace */])(s, o, n);
}

function _RegexMatch___(regex, str) {
    var matchValue = strRegexMatch(regex, str);

    if (matchValue != null) {
        var m = Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(matchValue)[0];
        var grp = Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(matchValue)[1];
        var lchar = m.length | 0;
        return [m, grp, str.slice(lchar, str.length)];
    } else {
        return null;
    }
}


function literalString(charList) {
    var addEscape = function addEscape(tupledArg) {
        return function () {
            var folder = function folder(st, n) {
                return strReplace(n, "\\" + n, st);
            };

            return function (list) {
                return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Seq__["f" /* fold */])(folder, tupledArg[0], list);
            };
        }()(Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])(["\\", ".", "^", "$", "*", "+", "-", "?", "(", ")", "[", "]", "{", "}", "|", "/"]));
    };

    return function (c) {
        return "^.+?(?=\\s|" + c + "$)";
    }(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Seq__["f" /* fold */])(function (x, y) {
        return x + y;
    }, "", Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_List__["e" /* map */])(function ($var1) {
        return function (a) {
            return a + "|";
        }(addEscape($var1));
    }, charList)));
}

function _CharMatch___(retLastMatch, a, charList, str) {
    var testStartWith = function testStartWith(tupledArg) {
        var ch = a + tupledArg[0];
        return [strStartsWith(ch, str), ch, tupledArg[1]];
    };

    return function () {
        var state = null;
        return function (list) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Seq__["f" /* fold */])(retLastMatch, state, list);
        };
    }()(Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_List__["e" /* map */])(testStartWith, charList));
}



function _Character___(charList, str) {
    var retLastMatch = function retLastMatch(i, _arg1) {
        if (_arg1[0]) {
            return [_arg1[2], str.slice(_arg1[1].length, str.length)];
        } else {
            return i;
        }
    };

    return _CharMatch___(retLastMatch, "", charList, str);
}



function _EscapedChar___(tType, charList, str) {
    var retLastMatch = function retLastMatch(i, _arg1) {
        if (_arg1[0]) {
            return [tType(_arg1[1].slice(1, _arg1[1].length)), str.slice(_arg1[1].length, str.length)];
        } else {
            return i;
        }
    };

    return _CharMatch___(retLastMatch, "\\", charList, str);
}



function _GroupMatch___(str, _arg1) {
    var $var2 = void 0;

    var activePatternResult544 = _RegexMatch___(str, _arg1);

    if (activePatternResult544 != null) {
        if (Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult544)[1].tail != null) {
            if (Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult544)[1].tail.tail == null) {
                $var2 = [0, Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult544)[0], Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult544)[2], Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult544)[1].head];
            } else {
                $var2 = [1];
            }
        } else {
            $var2 = [1];
        }
    } else {
        $var2 = [1];
    }

    switch ($var2[0]) {
        case 0:
            return $var2[3];

        case 1:
            return null;
    }
}



/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FMarkFable_fs__ = __webpack_require__(23);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "processMarkdownString", function() { return __WEBPACK_IMPORTED_MODULE_0__FMarkFable_fs__["a"]; });


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = processMarkdownString;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Common_FMark_fs__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Common_Types_fs__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_Seq__ = __webpack_require__(1);



function processMarkdownString(str) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__Common_FMark_fs__["a" /* processString */])(new __WEBPACK_IMPORTED_MODULE_1__Common_Types_fs__["e" /* OutFormat */](0))(Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_Seq__["n" /* toList */])(str));
}

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export preLexParse */
/* unused harmony export processString$27$ */
/* harmony export (immutable) */ __webpack_exports__["a"] = processString;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Parser_Parser_fs__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Lexer_Lexer_fs__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Lexer_Preprocessor_fs__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Result__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Types_fs__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__HTMLGen_HTMLGen_fs__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__MarkdownGen_MarkdownGen_fs__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_String__ = __webpack_require__(6);









var preLexParse = Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["a" /* default */])(function ($var2) {
    return function (toks) {
        return Object(__WEBPACK_IMPORTED_MODULE_1__Parser_Parser_fs__["a" /* parse */])(toks);
    }(function ($var1) {
        return function (strl) {
            return Object(__WEBPACK_IMPORTED_MODULE_2__Lexer_Lexer_fs__["a" /* lexList */])(strl);
        }(Object(__WEBPACK_IMPORTED_MODULE_3__Lexer_Preprocessor_fs__["a" /* preprocessList */])($var1));
    }($var2));
});

function processString_(formatFunc) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["a" /* default */])(function ($var3) {
        return function (result) {
            return Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Result__["c" /* map */])(formatFunc, result);
        }(preLexParse($var3));
    });
}


function processString(format) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["a" /* default */])(format.Equals(new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["e" /* OutFormat */](0)) ? processString_(function (pObjs) {
        return Object(__WEBPACK_IMPORTED_MODULE_6__HTMLGen_HTMLGen_fs__["a" /* strBody */])(pObjs);
    }) : format.Equals(new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["e" /* OutFormat */](1)) ? processString_(function (pObjs_1) {
        return Object(__WEBPACK_IMPORTED_MODULE_7__MarkdownGen_MarkdownGen_fs__["a" /* mdBody */])(pObjs_1);
    }) : Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_String__["f" /* toFail */])(Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_String__["b" /* printf */])("Invalid format type generated, this should not be possible.")));
}

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export parseCode */
/* unused harmony export parseInLineElements */
/* unused harmony export parseParagraph */
/* unused harmony export $7C$MatchTable$7C$_$7C$ */
/* unused harmony export parseItem */
/* unused harmony export parseItemList */
/* harmony export (immutable) */ __webpack_exports__["a"] = parse;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Result__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_List__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Shared_fs__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_String__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ParserHelperFuncs_fs__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Types_fs__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_Option__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Seq__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Markalc_Markalc_fs__ = __webpack_require__(28);











function parseCode(toks) {
    if (toks.tail != null) {
        if (toks.head.tag === 30) {
            return new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Result__["b" /* default */](0, ["", Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_List__["i" /* slice */])(1, null, toks)]);
        } else {
            return Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Result__["c" /* map */])(function (tupledArg) {
                return [Object(__WEBPACK_IMPORTED_MODULE_2__Shared_fs__["e" /* mapTok */])(toks.head) + tupledArg[0], tupledArg[1]];
            }, parseCode(toks.tail));
        }
    } else {
        __WEBPACK_IMPORTED_MODULE_2__Shared_fs__["i" /* sharedLog */].Warn(null, Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_String__["g" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_String__["b" /* printf */])("%A"))(toks));
        return new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Result__["b" /* default */](0, ["\\`", Object(__WEBPACK_IMPORTED_MODULE_2__Shared_fs__["k" /* xOnwards */])(1, toks)]);
    }
}
function parseInLineElements(toks) {
    var attachInlineEle = function attachInlineEle(front, back, ele) {
        return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([front, ele, back]);
    };

    var parseInLineElements_ = function parseInLineElements_(currentLine, toks_1) {
        var activePatternResult1182 = Object(__WEBPACK_IMPORTED_MODULE_4__ParserHelperFuncs_fs__["e" /* $7C$MatchSym$7C$_$7C$ */])(new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["o" /* Token */](30), toks_1);

        if (activePatternResult1182 != null) {
            return [new __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["c" /* InlineElement */](0, new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["j" /* TFrmtedString */](3, Object(__WEBPACK_IMPORTED_MODULE_2__Shared_fs__["j" /* strAllToks */])(Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult1182)[0]))), currentLine), Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult1182)[1]];
        } else {
            var activePatternResult1180 = Object(__WEBPACK_IMPORTED_MODULE_4__ParserHelperFuncs_fs__["a" /* $7C$MatchEm$7C$_$7C$ */])(toks_1);

            if (activePatternResult1180 != null) {
                var inlineContent = new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["c" /* InlineElement */](0, new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["j" /* TFrmtedString */](1, parseInLines(new __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](), Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult1180)[0])));
                return [function (x) {
                    return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_List__["a" /* append */])(x, currentLine);
                }(function () {
                    var matchValue = [Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult1180)[2], Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult1180)[3]];

                    if (matchValue[0] == null) {
                        if (matchValue[1] == null) {
                            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([inlineContent]);
                        } else {
                            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(matchValue[1]), inlineContent]);
                        }
                    } else if (matchValue[1] == null) {
                        return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([inlineContent, Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(matchValue[0])]);
                    } else {
                        return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(matchValue[1]), inlineContent, Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(matchValue[0])]);
                    }
                }()), Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult1180)[1]];
            } else {
                var str = Object(__WEBPACK_IMPORTED_MODULE_2__Shared_fs__["e" /* mapTok */])(Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Seq__["h" /* item */])(0, toks_1));
                return [new __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["c" /* InlineElement */](0, new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["j" /* TFrmtedString */](2, str)), currentLine), Object(__WEBPACK_IMPORTED_MODULE_2__Shared_fs__["k" /* xOnwards */])(1, toks_1)];
            }
        }
    };

    var parseInLines = function parseInLines(currentLine_1, toks_2) {
        if (toks_2.tail == null) {
            return new __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */]();
        } else {
            var patternInput = parseInLineElements_(currentLine_1, toks_2);

            if (patternInput[1].tail == null) {
                return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_List__["h" /* reverse */])(patternInput[0]);
            } else {
                return Object(__WEBPACK_IMPORTED_MODULE_4__ParserHelperFuncs_fs__["i" /* combineLiterals */])(parseInLines(patternInput[0], patternInput[1]));
            }
        }
    };

    return parseInLines(new __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](), toks);
}
function parseParagraph(toks) {
    var parseParagraph_ = function parseParagraph_(lines, tokLine) {
        return new __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](parseInLineElements(tokLine), lines);
    };

    return new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["h" /* ParsedObj */](4, Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_List__["h" /* reverse */])(function () {
        var state = new __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */]();
        return function (list) {
            return Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Seq__["f" /* fold */])(parseParagraph_, state, list);
        };
    }()(Object(__WEBPACK_IMPORTED_MODULE_4__ParserHelperFuncs_fs__["j" /* cutIntoLines */])(Object(__WEBPACK_IMPORTED_MODULE_4__ParserHelperFuncs_fs__["m" /* trimENDLINEs */])(toks)))));
}

function _MatchTable___(toks) {
    var tableTransform = function tableTransform(tupledArg) {
        return function (_arg1) {
            if (_arg1.tag === 1) {
                return null;
            } else {
                var toPCellList = function toPCellList(cell) {
                    var patternInput = cell.GetParams;
                    var pCellLine = parseInLineElements(patternInput[0]);
                    return new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["f" /* PCell */](0, [pCellLine, patternInput[1], patternInput[2]]);
                };

                var toPRow = function toPRow(row) {
                    var patternInput_1 = function (_arg2) {
                        return [_arg2.data[0], _arg2.data[1]];
                    }(row);

                    return new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["g" /* PRow */](0, [Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_List__["e" /* map */])(toPCellList, patternInput_1[0]), patternInput_1[1]]);
                };

                return [new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["h" /* ParsedObj */](6, Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_List__["e" /* map */])(toPRow, _arg1.data)), tupledArg[1]];
            }
        }(Object(__WEBPACK_IMPORTED_MODULE_8__Markalc_Markalc_fs__["a" /* parseEvaluateTable */])(tupledArg[0]));
    };

    var activePatternResult1201 = Object(__WEBPACK_IMPORTED_MODULE_4__ParserHelperFuncs_fs__["g" /* $7C$MatchTableHead$7C$_$7C$ */])(toks);

    if (activePatternResult1201 != null) {
        var activePatternResult1200 = Object(__WEBPACK_IMPORTED_MODULE_4__ParserHelperFuncs_fs__["f" /* $7C$MatchTableFormater$7C$_$7C$ */])(Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult1201));

        if (activePatternResult1200 != null) {
            return tableTransform(Object(__WEBPACK_IMPORTED_MODULE_4__ParserHelperFuncs_fs__["k" /* cutTableRows */])(toks));
        } else {
            return null;
        }
    } else {
        return null;
    }
}


function parseItem(rawToks) {
    var toks = Object(__WEBPACK_IMPORTED_MODULE_4__ParserHelperFuncs_fs__["l" /* deleteLeadingENDLINEs */])(rawToks);
    var $var1 = void 0;

    if (toks.tail != null) {
        if (toks.head.tag === 0) {
            $var1 = [0, toks.head.data[0], toks.head.data[1], toks.tail];
        } else {
            var activePatternResult1215 = Object(__WEBPACK_IMPORTED_MODULE_4__ParserHelperFuncs_fs__["c" /* $7C$MatchListOpSpace$7C$_$7C$ */])(toks);

            if (activePatternResult1215 != null) {
                $var1 = [1];
            } else {
                $var1 = [2];
            }
        }
    } else {
        var activePatternResult1216 = Object(__WEBPACK_IMPORTED_MODULE_4__ParserHelperFuncs_fs__["c" /* $7C$MatchListOpSpace$7C$_$7C$ */])(toks);

        if (activePatternResult1216 != null) {
            $var1 = [1];
        } else {
            $var1 = [2];
        }
    }

    switch ($var1[0]) {
        case 0:
            return new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Result__["b" /* default */](0, [new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["h" /* ParsedObj */](0, [$var1[1], $var1[2]]), $var1[3]]);

        case 1:
            return new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Result__["b" /* default */](1, "Lists todo");

        case 2:
            var activePatternResult1214 = _MatchTable___(toks);

            if (activePatternResult1214 != null) {
                return new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Result__["b" /* default */](0, [Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult1214)[0], Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult1214)[1]]);
            } else {
                var activePatternResult1213 = Object(__WEBPACK_IMPORTED_MODULE_4__ParserHelperFuncs_fs__["d" /* $7C$MatchQuote$7C$_$7C$ */])(toks);

                if (activePatternResult1213 != null) {
                    return new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Result__["b" /* default */](0, [new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["h" /* ParsedObj */](5, parseInLineElements(Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult1213)[0])), Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult1213)[1]]);
                } else {
                    var activePatternResult1212 = Object(__WEBPACK_IMPORTED_MODULE_4__ParserHelperFuncs_fs__["b" /* $7C$MatchHeader$7C$_$7C$ */])(toks);

                    if (activePatternResult1212 != null) {
                        var line = parseInLineElements(Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult1212)[1]);
                        return new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Result__["b" /* default */](0, [new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["h" /* ParsedObj */](1, new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["k" /* THeader */](line, Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult1212)[0])), Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult1212)[2]]);
                    } else {
                        var activePatternResult1211 = Object(__WEBPACK_IMPORTED_MODULE_4__ParserHelperFuncs_fs__["h" /* $7C$PickoutParagraph$7C$_$7C$ */])(toks);

                        if (activePatternResult1211 != null) {
                            return new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Result__["b" /* default */](0, [parseParagraph(Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult1211)[0]), Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult1211)[1]]);
                        } else {
                            return new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Result__["b" /* default */](1, Object(__WEBPACK_IMPORTED_MODULE_2__Shared_fs__["g" /* removeChars */])(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])(["[", "]"]), Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_String__["g" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_String__["b" /* printf */])("Parse item did not match: %A"))(toks)));
                        }
                    }
                }
            }

    }
}
function parseItemList(toks) {
    var matchValue = [toks.tail == null, !Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Seq__["e" /* exists */])(function (_arg1) {
        var $var2 = _arg1.tag === 2 ? [0] : _arg1.tag === 32 ? [0] : [1];

        switch ($var2[0]) {
            case 0:
                return false;

            case 1:
                return true;
        }
    }, toks)];
    var $var3 = matchValue[0] ? [1] : matchValue[1] ? [1] : [0];

    switch ($var3[0]) {
        case 0:
            return Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Result__["a" /* bind */])(function (tupledArg) {
                var matchValue_1 = tupledArg[1].tail == null;

                if (matchValue_1) {
                    return new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Result__["b" /* default */](0, [Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([tupledArg[0]]), null]);
                } else {
                    return Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Result__["c" /* map */])(function (tupledArg_1) {
                        return [new __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](tupledArg[0], tupledArg_1[0]), tupledArg_1[1]];
                    }, parseItemList(tupledArg[1]));
                }
            }, parseItem(toks));

        case 1:
            return new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Result__["b" /* default */](0, [new __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](), null]);
    }
}
function parse(toks) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Result__["a" /* bind */])(function (tupledArg) {
        return tupledArg[1] != null ? new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Result__["b" /* default */](1, Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_String__["g" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_String__["b" /* printf */])("Some unparsed tokens: %A"))(Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(tupledArg[1]))) : new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Result__["b" /* default */](0, tupledArg[0]);
    }, parseItemList(toks));
}

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = start;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Async__ = __webpack_require__(17);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





var QueueCell = function QueueCell(message) {
    _classCallCheck(this, QueueCell);

    this.value = message;
};

var MailboxQueue = function () {
    function MailboxQueue() {
        _classCallCheck(this, MailboxQueue);
    }

    _createClass(MailboxQueue, [{
        key: "add",
        value: function add(message) {
            var itCell = new QueueCell(message);
            if (this.firstAndLast) {
                this.firstAndLast[1].next = itCell;
                this.firstAndLast = [this.firstAndLast[0], itCell];
            } else {
                this.firstAndLast = [itCell, itCell];
            }
        }
    }, {
        key: "tryGet",
        value: function tryGet() {
            if (this.firstAndLast) {
                var value = this.firstAndLast[0].value;
                if (this.firstAndLast[0].next) {
                    this.firstAndLast = [this.firstAndLast[0].next, this.firstAndLast[1]];
                } else {
                    delete this.firstAndLast;
                }
                return value;
            }
            return void 0;
        }
    }]);

    return MailboxQueue;
}();

var MailboxProcessor = function () {
    function MailboxProcessor(body, cancellationToken) {
        _classCallCheck(this, MailboxProcessor);

        this.body = body;
        this.cancellationToken = cancellationToken || __WEBPACK_IMPORTED_MODULE_0__Async__["a" /* defaultCancellationToken */];
        this.messages = new MailboxQueue();
    }

    _createClass(MailboxProcessor, [{
        key: "__processEvents",
        value: function __processEvents() {
            if (this.continuation) {
                var value = this.messages.tryGet();
                if (value) {
                    var cont = this.continuation;
                    delete this.continuation;
                    cont(value);
                }
            }
        }
    }, {
        key: "start",
        value: function start() {
            Object(__WEBPACK_IMPORTED_MODULE_0__Async__["c" /* startImmediate */])(this.body(this), this.cancellationToken);
        }
    }, {
        key: "receive",
        value: function receive() {
            var _this = this;

            return Object(__WEBPACK_IMPORTED_MODULE_0__Async__["b" /* fromContinuations */])(function (conts) {
                if (_this.continuation) {
                    throw new Error("Receive can only be called once!");
                }
                _this.continuation = conts[0];
                _this.__processEvents();
            });
        }
    }, {
        key: "post",
        value: function post(message) {
            this.messages.add(message);
            this.__processEvents();
        }
    }, {
        key: "postAndAsyncReply",
        value: function postAndAsyncReply(buildMessage) {
            var result = void 0;
            var continuation = void 0;
            function checkCompletion() {
                if (result && continuation) {
                    continuation(result);
                }
            }
            var reply = {
                reply: function reply(res) {
                    result = res;
                    checkCompletion();
                }
            };
            this.messages.add(buildMessage(reply));
            this.__processEvents();
            return Object(__WEBPACK_IMPORTED_MODULE_0__Async__["b" /* fromContinuations */])(function (conts) {
                continuation = conts[0];
                checkCompletion();
            });
        }
    }]);

    return MailboxProcessor;
}();

/* unused harmony default export */ var _unused_webpack_default_export = (MailboxProcessor);

function start(body, cancellationToken) {
    var mbox = new MailboxProcessor(body, cancellationToken);
    mbox.start();
    return mbox;
}

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export SPACE */
/* unused harmony export NOSTRING */
/* unused harmony export TEmphasis */
/* unused harmony export ParagraphState */
/* harmony export (immutable) */ __webpack_exports__["l"] = deleteLeadingENDLINEs;
/* unused harmony export deleteTrailingENDLINEs */
/* harmony export (immutable) */ __webpack_exports__["m"] = trimENDLINEs;
/* unused harmony export stringAllTokens */
/* unused harmony export countToks */
/* unused harmony export countSpaces */
/* unused harmony export countNewLines */
/* unused harmony export countDelim */
/* unused harmony export countPipes */
/* unused harmony export countMinus */
/* unused harmony export cutFirstLine */
/* harmony export (immutable) */ __webpack_exports__["j"] = cutIntoLines;
/* harmony export (immutable) */ __webpack_exports__["i"] = combineLiterals;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return _MatchSym___; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return _PickoutParagraph___; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _MatchEm___; });
/* unused harmony export $7C$MatchNewParagraph$7C$_$7C$ */
/* unused harmony export $7C$MatchMapTok$7C$_$7C$ */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return _MatchHeader___; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return _MatchQuote___; });
/* unused harmony export $7C$MatchList$7C$_$7C$ */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return _MatchListOpSpace___; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return _MatchTableHead___; });
/* unused harmony export pipeMatch */
/* unused harmony export minusMatch */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return _MatchTableFormater___; });
/* harmony export (immutable) */ __webpack_exports__["k"] = cutTableRows;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Types_fs__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Shared_fs__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_Seq__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_String__ = __webpack_require__(6);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }













var SPACE = " ";
var NOSTRING = "";
var TEmphasis = function () {
    function TEmphasis(tag, data) {
        _classCallCheck(this, TEmphasis);

        this.tag = tag;
        this.data = data;
    }

    _createClass(TEmphasis, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "ParserHelperFuncs.TEmphasis",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: [["UNDER"], ["STAR"]]
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return this === other || this.tag === other.tag && Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["j" /* equals */])(this.data, other.data);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["i" /* compareUnions */])(this, other) | 0;
        }
    }]);

    return TEmphasis;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["b" /* setType */])("ParserHelperFuncs.TEmphasis", TEmphasis);
var ParagraphState = function () {
    function ParagraphState(par, reToks, parMatched) {
        _classCallCheck(this, ParagraphState);

        this.Par = par;
        this.ReToks = reToks;
        this.ParMatched = parMatched;
    }

    _createClass(ParagraphState, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "ParserHelperFuncs.ParagraphState",
                interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
                properties: {
                    Par: Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["m" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */], {
                        T: __WEBPACK_IMPORTED_MODULE_3__Types_fs__["o" /* Token */]
                    }),
                    ReToks: Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["m" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */], {
                        T: __WEBPACK_IMPORTED_MODULE_3__Types_fs__["o" /* Token */]
                    }),
                    ParMatched: "boolean"
                }
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["k" /* equalsRecords */])(this, other);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["h" /* compareRecords */])(this, other) | 0;
        }
    }]);

    return ParagraphState;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["b" /* setType */])("ParserHelperFuncs.ParagraphState", ParagraphState);
function deleteLeadingENDLINEs(toks) {
    deleteLeadingENDLINEs: while (true) {
        var $var1 = toks.tail != null ? toks.head.tag === 32 ? [0, toks.tail] : [1] : [1];

        switch ($var1[0]) {
            case 0:
                toks = $var1[1];
                continue deleteLeadingENDLINEs;

            case 1:
                return toks;
        }
    }
}
function deleteTrailingENDLINEs(toks) {
    return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["h" /* reverse */])(deleteLeadingENDLINEs(Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["h" /* reverse */])(toks)));
}
function trimENDLINEs(toks) {
    return deleteTrailingENDLINEs(deleteLeadingENDLINEs(toks));
}
function stringAllTokens(toks) {
    var matchTok = function matchTok(i, tok) {
        return i + Object(__WEBPACK_IMPORTED_MODULE_4__Shared_fs__["e" /* mapTok */])(tok);
    };

    return Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_Seq__["f" /* fold */])(matchTok, "", toks);
}
function countToks(tok, toks) {
    var countToks_ = function countToks_(tupledArg) {
        countToks_: while (true) {
            var $var2 = tupledArg[1].tail != null ? tupledArg[1].head.Equals(tok) ? [0, tupledArg[1].tail, tupledArg[1].head] : [1] : [1];

            switch ($var2[0]) {
                case 0:
                    tupledArg = [tupledArg[0] + 1, $var2[1]];
                    continue countToks_;

                case 1:
                    return [tupledArg[0], tupledArg[1]];
            }
        }
    };

    return countToks_([0, toks])[0] | 0;
}
function countSpaces(toks) {
    var countToks_ = function countToks_(tupledArg) {
        countToks_: while (true) {
            var $var3 = tupledArg[1].tail != null ? tupledArg[1].head.tag === 2 ? [0, tupledArg[1].head.data, tupledArg[1].tail] : [1] : [1];

            switch ($var3[0]) {
                case 0:
                    tupledArg = [tupledArg[0] + $var3[1], $var3[2]];
                    continue countToks_;

                case 1:
                    return [tupledArg[0], tupledArg[1]];
            }
        }
    };

    return countToks_([0, toks])[0] | 0;
}
var countNewLines = Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["a" /* default */])(function () {
    var tok = new __WEBPACK_IMPORTED_MODULE_3__Types_fs__["o" /* Token */](32);
    return function (toks) {
        return countToks(tok, toks);
    };
}());
function countDelim(delim, toks) {
    var counter = function counter(tok) {
        if (Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["j" /* equals */])(tok, delim)) {
            return 1;
        } else {
            return 0;
        }
    };

    return Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_Seq__["m" /* sumBy */])(counter, toks) | 0;
}
var countPipes = Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["a" /* default */])(function () {
    var delim = new __WEBPACK_IMPORTED_MODULE_3__Types_fs__["o" /* Token */](5);
    return function (toks) {
        return countDelim(delim, toks);
    };
}());
var countMinus = Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["a" /* default */])(function () {
    var delim = new __WEBPACK_IMPORTED_MODULE_3__Types_fs__["o" /* Token */](7);
    return function (toks) {
        return countDelim(delim, toks);
    };
}());
function cutFirstLine(toks) {
    var cutLine_ = function cutLine_(line, rtks) {
        cutLine_: while (true) {
            if (rtks.tail == null) {
                return [Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["h" /* reverse */])(line), new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */]()];
            } else if (rtks.head.tag === 32) {
                return [Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["h" /* reverse */])(line), rtks.tail];
            } else {
                line = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](rtks.head, line);
                rtks = rtks.tail;
                continue cutLine_;
            }
        }
    };

    return cutLine_(new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](), toks);
}
function cutIntoLines(toks) {
    var cutIntoLines_ = function cutIntoLines_(tokLines, toks_1) {
        cutIntoLines_: while (true) {
            var endlineSpliter = function endlineSpliter(_arg1) {
                if (_arg1.tag === 32) {
                    return true;
                } else {
                    return false;
                }
            };

            var matchValue = Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_Seq__["o" /* tryFindIndex */])(endlineSpliter, toks_1);

            if (matchValue != null) {
                var matchValue_1 = Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["j" /* splitAt */])(Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(matchValue), toks_1);
                var tokLineNoEL = deleteTrailingENDLINEs(matchValue_1[0]);
                tokLines = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](tokLineNoEL, tokLines);
                toks_1 = matchValue_1[1].tail;
                continue cutIntoLines_;
            } else {
                return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["h" /* reverse */])(new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](toks_1, tokLines));
            }
        }
    };

    return Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["b" /* partialApply */])(cutIntoLines_, [new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */]()])(toks);
}
function combineLiterals(line) {
    var combiner = function combiner(line_1, inlineEle) {
        var doNothing = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](inlineEle, line_1);
        var matchValue = line_1.head;
        var $var4 = matchValue.tag === 0 ? matchValue.data.tag === 2 ? [0, matchValue.data.data] : [1] : [1];

        switch ($var4[0]) {
            case 0:
                var $var5 = inlineEle.tag === 0 ? inlineEle.data.tag === 2 ? [0, inlineEle.data.data] : [1] : [1];

                switch ($var5[0]) {
                    case 0:
                        return new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_3__Types_fs__["c" /* InlineElement */](0, new __WEBPACK_IMPORTED_MODULE_3__Types_fs__["j" /* TFrmtedString */](2, $var4[1] + $var5[1])), line_1.tail);

                    case 1:
                        return doNothing;
                }

            case 1:
                return doNothing;
        }
    };

    return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["h" /* reverse */])(function () {
        var state = Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([line.head]);
        return function (list) {
            return Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_Seq__["f" /* fold */])(combiner, state, list);
        };
    }()(line.tail));
}

function _MatchSym___(sym, toks) {
    var $var6 = toks.tail != null ? Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["j" /* equals */])(toks.head, sym) ? [0, toks.head, toks.tail] : [1] : [1];

    switch ($var6[0]) {
        case 0:
            var matchValue = Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_Seq__["o" /* tryFindIndex */])(function (s) {
                return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["j" /* equals */])(s, sym);
            }, toks.tail);

            if (matchValue == null) {
                return null;
            } else {
                var patternInput = Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["j" /* splitAt */])(Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(matchValue), $var6[2]);
                return [patternInput[0], patternInput[1].tail];
            }

        case 1:
            return null;
    }
}



function _PickoutParagraph___(toks) {
    if (toks.tail == null) {
        return null;
    } else {
        var folder = function folder(state, tok) {
            if (state.ParMatched) {
                var ReToks = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](tok, state.ReToks);
                return new ParagraphState(state.Par, ReToks, state.ParMatched);
            } else {
                var $var7 = tok.tag === 32 ? state.Par.head.Equals(new __WEBPACK_IMPORTED_MODULE_3__Types_fs__["o" /* Token */](32)) ? [0] : [1] : [1];

                switch ($var7[0]) {
                    case 0:
                        return new ParagraphState(state.Par.tail, state.ReToks, true);

                    case 1:
                        return new ParagraphState(new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](tok, state.Par), state.ReToks, state.ParMatched);
                }
            }
        };

        var initState = new ParagraphState(new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](), new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](), false);
        var matchValue = Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_Seq__["f" /* fold */])(folder, initState, toks);
        return [Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["h" /* reverse */])(matchValue.Par), deleteLeadingENDLINEs(Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["h" /* reverse */])(matchValue.ReToks))];
    }
}



function _MatchEm___(toks) {
    var attachInlineEle = Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["a" /* default */])(function (front, back) {
        var mapping = function mapping(tupledArg) {
            return [tupledArg[0], tupledArg[1], front, back];
        };

        return function (option) {
            return Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["b" /* defaultArg */])(option, null, mapping);
        };
    });
    var $var8 = toks.tail != null ? toks.head.tag === 2 ? toks.tail.tail != null ? toks.tail.head.tag === 14 ? toks.tail.tail.tail != null ? toks.tail.tail.head.tag === 2 ? [0] : [1, toks.head.data, toks.tail.tail] : [1, toks.head.data, toks.tail.tail] : [4] : [4] : toks.head.tag === 9 ? toks.tail.tail != null ? toks.tail.head.tag === 2 ? [2] : [3, toks.tail] : [3, toks.tail] : [4] : [4];

    switch ($var8[0]) {
        case 0:
            return null;

        case 1:
            var frontLiteral = new __WEBPACK_IMPORTED_MODULE_3__Types_fs__["c" /* InlineElement */](0, new __WEBPACK_IMPORTED_MODULE_3__Types_fs__["j" /* TFrmtedString */](2, Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_String__["d" /* replicate */])($var8[1], " ")));

            var endFinder = function endFinder(content, toks_1) {
                endFinder: while (true) {
                    var $var9 = toks_1.tail != null ? toks_1.head.tag === 2 ? toks_1.tail.tail != null ? toks_1.tail.head.tag === 14 ? toks_1.tail.tail.tail == null ? [3] : toks_1.tail.tail.head.tag === 2 ? [1, toks_1.tail.tail.tail] : [4] : [4] : [4] : toks_1.tail.tail != null ? toks_1.tail.head.tag === 14 ? toks_1.tail.tail.tail == null ? [3] : toks_1.tail.tail.head.tag === 2 ? [2, toks_1.tail.tail.head.data, toks_1.tail.tail.tail] : [4] : [4] : [4] : [0];

                    switch ($var9[0]) {
                        case 0:
                            return null;

                        case 1:
                            content = Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["a" /* append */])(content, Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["i" /* slice */])(0, 2, toks_1));
                            toks_1 = $var9[1];
                            continue endFinder;

                        case 2:
                            var backLiteral = new __WEBPACK_IMPORTED_MODULE_3__Types_fs__["c" /* InlineElement */](0, new __WEBPACK_IMPORTED_MODULE_3__Types_fs__["j" /* TFrmtedString */](2, Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_String__["d" /* replicate */])($var9[1], " ")));
                            return Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["b" /* partialApply */])(attachInlineEle, [frontLiteral, backLiteral])([Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["a" /* append */])(content, Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([toks_1.head])), $var9[2]]);

                        case 3:
                            return Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["b" /* partialApply */])(attachInlineEle, [frontLiteral, null])([Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["a" /* append */])(content, Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([toks_1.head])), new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */]()]);

                        case 4:
                            return Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["b" /* partialApply */])(endFinder, [Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["a" /* append */])(content, Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_Seq__["h" /* item */])(0, toks_1)]))])(Object(__WEBPACK_IMPORTED_MODULE_4__Shared_fs__["k" /* xOnwards */])(1, toks_1));
                    }
                }
            };

            return endFinder(new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](), $var8[2]);

        case 2:
            return null;

        case 3:
            var endFinder_1 = function endFinder_1(content_1, toks_2) {
                endFinder_1: while (true) {
                    var $var10 = toks_2.tail != null ? toks_2.head.tag === 2 ? toks_2.tail.tail != null ? toks_2.tail.head.tag === 9 ? [1, toks_2.tail.tail] : [3] : [3] : toks_2.tail.tail != null ? toks_2.tail.head.tag === 9 ? [2, toks_2.tail.tail] : [3] : [3] : [0];

                    switch ($var10[0]) {
                        case 0:
                            return null;

                        case 1:
                            content_1 = Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["a" /* append */])(content_1, Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["i" /* slice */])(0, 1, toks_2));
                            toks_2 = $var10[1];
                            continue endFinder_1;

                        case 2:
                            return Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["b" /* partialApply */])(attachInlineEle, [null, null])([Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["a" /* append */])(content_1, Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([toks_2.head])), $var10[1]]);

                        case 3:
                            return Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["b" /* partialApply */])(endFinder_1, [Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["a" /* append */])(content_1, Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_Seq__["h" /* item */])(0, toks_2)]))])(Object(__WEBPACK_IMPORTED_MODULE_4__Shared_fs__["k" /* xOnwards */])(1, toks_2));
                    }
                }
            };

            return endFinder_1(new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](), $var8[1]);

        case 4:
            return null;
    }
}



function _MatchNewParagraph___(toks) {
    var matchValue = countNewLines(toks) | 0;

    if (matchValue >= 2) {
        return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["i" /* slice */])(matchValue, null, toks);
    } else {
        return null;
    }
}



function _MatchMapTok___(_arg1) {
    if (_arg1.tail != null) {
        return [Object(__WEBPACK_IMPORTED_MODULE_4__Shared_fs__["e" /* mapTok */])(_arg1.head), _arg1.tail];
    } else {
        return null;
    }
}



function _MatchHeader___(toks) {
    var countHashes = function countHashes(n, tks) {
        countHashes: while (true) {
            var $var11 = tks.tail != null ? tks.head.tag === 4 ? [0, tks.tail] : [1] : [1];

            switch ($var11[0]) {
                case 0:
                    n = n + 1;
                    tks = $var11[1];
                    continue countHashes;

                case 1:
                    return n | 0;
            }
        }
    };

    var matchValue = countHashes(0, toks) | 0;

    if (matchValue > 0) {
        var matchValue_1 = Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["i" /* slice */])(matchValue, null, toks);
        var $var12 = matchValue_1.tail != null ? matchValue_1.head.tag === 2 ? [0, matchValue_1.tail] : [1] : [1];

        switch ($var12[0]) {
            case 0:
                return function (tupledArg) {
                    return [matchValue, tupledArg[0], tupledArg[1]];
                }(cutFirstLine($var12[1]));

            case 1:
                return null;
        }
    } else {
        return null;
    }
}



function _MatchQuote___(toks) {
    var $var13 = toks.tail != null ? toks.head.tag === 27 ? [0, toks.tail] : [1] : [1];

    switch ($var13[0]) {
        case 0:
            return cutFirstLine($var13[1]);

        case 1:
            return null;
    }
}



function _MatchList___(toks) {
    var $var14 = toks.tail != null ? toks.head.tag === 3 ? toks.tail.tail != null ? toks.tail.head.tag === 10 ? toks.tail.tail.tail != null ? toks.tail.tail.head.tag === 2 ? [0, toks.tail.tail.tail] : [2] : [2] : [2] : [2] : toks.head.tag === 9 ? toks.tail.tail != null ? toks.tail.head.tag === 2 ? [1, toks.tail.tail] : [2] : [2] : [2] : [2];

    switch ($var14[0]) {
        case 0:
            return [new __WEBPACK_IMPORTED_MODULE_3__Types_fs__["n" /* TListType */](1), $var14[1]];

        case 1:
            return [new __WEBPACK_IMPORTED_MODULE_3__Types_fs__["n" /* TListType */](0), $var14[1]];

        case 2:
            return null;
    }
}



function _MatchListOpSpace___(toks) {
    var $var15 = void 0;

    if (toks.tail != null) {
        if (toks.head.tag === 2) {
            var activePatternResult1151 = _MatchList___(toks.tail);

            if (activePatternResult1151 != null) {
                $var15 = [0, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult1151)];
            } else {
                $var15 = [1];
            }
        } else {
            $var15 = [1];
        }
    } else {
        $var15 = [1];
    }

    switch ($var15[0]) {
        case 0:
            return $var15[1];

        case 1:
            var activePatternResult1150 = _MatchList___(toks);

            if (activePatternResult1150 != null) {
                return Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult1150);
            } else {
                return null;
            }

    }
}



function _MatchTableHead___(toks) {
    var patternInput = cutFirstLine(toks);

    if (patternInput[0].tail == null) {
        return null;
    } else {
        return patternInput[1];
    }
}


function pipeMatch(oToks) {
    return Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["b" /* defaultArg */])(oToks, null, function (toks) {
        var $var16 = toks.tail != null ? toks.head.tag === 5 ? [0, toks.tail] : [1] : [1];

        switch ($var16[0]) {
            case 0:
                return $var16[1];

            case 1:
                return null;
        }
    });
}
function minusMatch(oToks) {
    var takeAwayMinuses = function takeAwayMinuses(toks) {
        var takeAwayMinuses_ = function takeAwayMinuses_(n, toks_1) {
            takeAwayMinuses_: while (true) {
                var $var17 = toks_1.tail != null ? toks_1.head.tag === 7 ? [0, toks_1.tail] : [1] : [1];

                switch ($var17[0]) {
                    case 0:
                        n = n + 1;
                        toks_1 = $var17[1];
                        continue takeAwayMinuses_;

                    case 1:
                        return [n, toks_1];
                }
            }
        };

        return takeAwayMinuses_(0, toks);
    };

    return Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["b" /* defaultArg */])(oToks, null, function (toks_2) {
        var patternInput = takeAwayMinuses(toks_2);

        if (patternInput[0] > 0) {
            return patternInput[1];
        } else {
            return null;
        }
    });
}

function _MatchTableFormater___(toks) {
    var patternInput = cutFirstLine(toks);
    var matchValue = [countPipes(patternInput[0]), countMinus(patternInput[0])];

    if (matchValue[0] > 0 ? matchValue[1] > 2 : false) {
        return patternInput[1];
    } else {
        return null;
    }
}


function cutTableRows(toks) {
    var cutTableRow_ = function cutTableRow_(rows, toks_1) {
        cutTableRow_: while (true) {
            if (toks_1.tail == null) {
                return [Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["h" /* reverse */])(rows), new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */]()];
            } else if (toks_1.head.tag === 32) {
                return [Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["h" /* reverse */])(rows), toks_1.tail];
            } else {
                var patternInput = cutFirstLine(toks_1);
                rows = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](patternInput[0], rows);
                toks_1 = patternInput[1];
                continue cutTableRow_;
            }
        }
    };

    return cutTableRow_(new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](), toks);
}

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export MapContents */
/* unused harmony export pipeSplit */
/* unused harmony export toToken */
/* unused harmony export joinErrorList */
/* unused harmony export liftFirstArg */
/* unused harmony export makeCellU */
/* unused harmony export defaultCellU */
/* unused harmony export headCellU */
/* unused harmony export alignCell */
/* unused harmony export parsePipesD */
/* unused harmony export parsePipes */
/* unused harmony export parseRow */
/* unused harmony export parseDefaultRow */
/* unused harmony export parseAlignRow */
/* unused harmony export alignCells$27$ */
/* unused harmony export alignCells */
/* unused harmony export transformTable */
/* unused harmony export tryEval$27$ */
/* unused harmony export tryEval */
/* unused harmony export evaluateCellList */
/* harmony export (immutable) */ __webpack_exports__["a"] = parseEvaluateTable;
/* unused harmony export lexParseEvaluate */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Types_fs__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__MarkalcShared_fs__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_String__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Result__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_Seq__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Shared_fs__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_1_fable_core_Map__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__nuget_packages_fable_core_1_3_1_fable_core_Option__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Expression_fs__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__nuget_packages_fable_core_1_3_1_fable_core_Comparer__ = __webpack_require__(12);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }


















var MapContents = function () {
    function MapContents(tag, data) {
        _classCallCheck(this, MapContents);

        this.tag = tag;
        this.data = data;
    }

    _createClass(MapContents, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Markalc.MapContents",
                interfaces: ["FSharpUnion"],
                cases: [["MapTok", __WEBPACK_IMPORTED_MODULE_1__Types_fs__["b" /* Cell */]], ["MapExp", __WEBPACK_IMPORTED_MODULE_2__MarkalcShared_fs__["b" /* Expr */], __WEBPACK_IMPORTED_MODULE_1__Types_fs__["b" /* Cell */]]]
            };
        }
    }]);

    return MapContents;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["b" /* setType */])("Markalc.MapContents", MapContents);
function pipeSplit(toks) {
    return Object(__WEBPACK_IMPORTED_MODULE_2__MarkalcShared_fs__["f" /* delimSplit */])(false, new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["o" /* Token */](5), toks);
}
function toToken(x) {
    return new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["o" /* Token */](3, x.toString());
}
function joinErrorList(lst) {
    var filt = function filt(x) {
        if (x.tag === 0) {
            return false;
        } else {
            return true;
        }
    };

    var unpackOks = function unpackOks(_arg1) {
        if (_arg1.tag === 1) {
            return Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_String__["f" /* toFail */])(Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_String__["b" /* printf */])("After filtering, there were still Error monads in the list %A."))(_arg1.data);
        } else {
            return _arg1.data;
        }
    };

    var combineErrors = function combineErrors(s, x_1) {
        if (x_1.tag === 1) {
            return new __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Result__["b" /* default */](1, Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_String__["g" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_String__["b" /* printf */])("%A %A"))(x_1.data, s));
        } else {
            return s;
        }
    };

    var matchValue = Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["d" /* filter */])(filt, lst);

    if (matchValue.tail == null) {
        return new __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Result__["b" /* default */](0, Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["e" /* map */])(unpackOks, lst));
    } else {
        return Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_Seq__["f" /* fold */])(combineErrors, new __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Result__["b" /* default */](1, ""), matchValue);
    }
}
function liftFirstArg(func, arg1, arg2) {
    if (arg1.tag === 1) {
        return new __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Result__["b" /* default */](1, arg1.data);
    } else {
        return new __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Result__["b" /* default */](0, func(arg1.data, arg2));
    }
}
function makeCellU(header, tokens) {
    return [tokens, header];
}
var defaultCellU = Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["a" /* default */])(function (tokens) {
    return makeCellU(false, tokens);
});
var headCellU = Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["a" /* default */])(function (tokens) {
    return makeCellU(true, tokens);
});
function alignCell(alignment, cellU_0, cellU_1) {
    var cellU = [cellU_0, cellU_1];
    return new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["b" /* Cell */](0, [cellU[0], cellU[1], alignment]);
}
function parsePipesD(debug, constructCell, row) {
    var parsePipes_ = function parsePipes_(a, row_1) {
        parsePipes_: while (true) {
            var matchValue = pipeSplit(row_1);

            if (matchValue.tag === 1) {
                if (row_1.tail == null) {
                    return a;
                } else {
                    return new __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](constructCell(row_1), a);
                }
            } else if (matchValue.data[0].tail == null) {
                if (matchValue.data[1].tail == null) {
                    return new __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](constructCell(new __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */]()), a);
                } else {
                    var after = matchValue.data[1];
                    __WEBPACK_IMPORTED_MODULE_2__MarkalcShared_fs__["g" /* logger */].Debug(null)(Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_String__["g" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_String__["b" /* printf */])("empty, %A"))(after));
                    a = new __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](constructCell(new __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */]()), a);
                    row_1 = after;
                    continue parsePipes_;
                }
            } else if (matchValue.data[1].tail == null) {
                var before = matchValue.data[0];
                __WEBPACK_IMPORTED_MODULE_2__MarkalcShared_fs__["g" /* logger */].Debug(null)(Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_String__["g" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_String__["b" /* printf */])("%A, empty"))(before));
                return new __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](constructCell(before), a);
            } else {
                var before_1 = matchValue.data[0];
                var after_1 = matchValue.data[1];
                __WEBPACK_IMPORTED_MODULE_2__MarkalcShared_fs__["g" /* logger */].Debug(null)(Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_String__["g" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_String__["b" /* printf */])("%A, %A"))(before_1, after_1));
                a = new __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](constructCell(before_1), a);
                row_1 = after_1;
                continue parsePipes_;
            }
        }
    };

    return parsePipes_(new __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](), row);
}
function parsePipes(constructCell, row) {
    return parsePipesD(false, constructCell, row);
}
function parseRow(constructCell, row) {
    var parseRow_ = function parseRow_(row_1) {
        return parsePipes(constructCell, row_1);
    };

    return Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["h" /* reverse */])(function (x) {
        return x.length === 1 ? new __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](constructCell(new __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */]()), x) : x;
    }(function () {
        var $var1 = row.tail != null ? row.head.tag === 5 ? [0, row.tail] : [1, row] : [1, row];

        switch ($var1[0]) {
            case 0:
                return parseRow_($var1[1]);

            case 1:
                return parseRow_($var1[1]);
        }
    }()));
}
var parseDefaultRow = Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["a" /* default */])(function (row) {
    return parseRow(defaultCellU, row);
});
function parseAlignRow(row) {
    var getAlignment = function getAlignment(toks) {
        var filt = function filt(_arg1) {
            if (_arg1.tag === 33) {
                return true;
            } else if (_arg1.tag === 7) {
                return true;
            } else {
                return false;
            }
        };

        var matchValue = [Object(__WEBPACK_IMPORTED_MODULE_2__MarkalcShared_fs__["e" /* countDelim */])(new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["o" /* Token */](7), toks) < 3, Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["d" /* filter */])(filt, toks).length !== toks.length];

        if (matchValue[0]) {
            if (matchValue[1]) {
                return new __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Result__["b" /* default */](1, "Less than 3 dashes for table format and invalid characters");
            } else {
                return new __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Result__["b" /* default */](1, "Less than 3 dashes for table format");
            }
        } else if (matchValue[1]) {
            return new __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Result__["b" /* default */](1, Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_String__["g" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_String__["b" /* printf */])("Invalid characters in table format, expecting only : or - \n%A\n%A"))(toks, Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["d" /* filter */])(filt, toks)));
        } else {
            var matchValue_1 = [Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["h" /* reverse */])(toks), Object(__WEBPACK_IMPORTED_MODULE_2__MarkalcShared_fs__["e" /* countDelim */])(new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["o" /* Token */](33), toks)];
            var $var2 = matchValue_1[0].tail != null ? matchValue_1[0].head.tag === 33 ? matchValue_1[1] === 2 ? toks.head.Equals(new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["o" /* Token */](33)) ? [0] : [1] : [1] : [1] : [1];

            switch ($var2[0]) {
                case 0:
                    return new __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Result__["b" /* default */](0, new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["a" /* Alignment */](0));

                case 1:
                    var $var3 = matchValue_1[0].tail != null ? matchValue_1[0].head.tag === 33 ? matchValue_1[1] === 1 ? [0] : [2] : matchValue_1[1] === 1 ? toks.head.Equals(new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["o" /* Token */](33)) ? [1] : [2] : [2] : matchValue_1[1] === 1 ? toks.head.Equals(new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["o" /* Token */](33)) ? [1] : [2] : [2];

                    switch ($var3[0]) {
                        case 0:
                            return new __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Result__["b" /* default */](0, new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["a" /* Alignment */](1));

                        case 1:
                            return new __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Result__["b" /* default */](0, new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["a" /* Alignment */](2));

                        case 2:
                            if (matchValue_1[1] === 0) {
                                return new __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Result__["b" /* default */](0, new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["a" /* Alignment */](3));
                            } else {
                                return new __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Result__["b" /* default */](1, Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_String__["g" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_String__["b" /* printf */])("':'s in wrong position %A, %A"))(toks, matchValue_1[1]));
                            }

                    }

            }
        }
    };

    var parseAlign_ = function parseAlign_(row_1) {
        return parsePipes(getAlignment, row_1);
    };

    return joinErrorList(Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["h" /* reverse */])(function () {
        var matchValue_2 = Object(__WEBPACK_IMPORTED_MODULE_2__MarkalcShared_fs__["i" /* whitespaceFilter */])(row);
        var $var4 = matchValue_2.tail != null ? matchValue_2.head.tag === 5 ? [0, matchValue_2.tail] : [1, matchValue_2] : [1, matchValue_2];

        switch ($var4[0]) {
            case 0:
                return parseAlign_($var4[1]);

            case 1:
                return parseAlign_($var4[1]);
        }
    }()));
}

function alignCells_(alignList, cells) {
    var lengths = [alignList.length, cells.length];
    return Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["e" /* map */])(function (tupledArg) {
        return alignCell(tupledArg[0], tupledArg[1][0], tupledArg[1][1]);
    }, function (list2) {
        return Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_Seq__["n" /* toList */])(Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_Seq__["q" /* zip */])(alignList, list2));
    }(function () {
        var matchValue = lengths[0] - lengths[1] | 0;

        if (matchValue > 0) {
            return Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["a" /* append */])(cells, Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["g" /* replicate */])(matchValue, [new __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](), cells.head[1]]));
        } else if (matchValue < 0) {
            return Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["i" /* slice */])(0, lengths[0] - 1, cells);
        } else {
            return cells;
        }
    }()));
}


var alignCells = Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["a" /* default */])(function (arg1, arg2) {
    return liftFirstArg(function (alignList, cells) {
        return alignCells_(alignList, cells);
    }, arg1, arg2);
});
function transformTable(table) {
    var alignments = parseAlignRow(Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_Seq__["h" /* item */])(1, table));

    var makeRow = function makeRow(head, _arg1) {
        if (_arg1.tag === 1) {
            return new __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Result__["b" /* default */](1, _arg1.data);
        } else {
            return new __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Result__["b" /* default */](0, [_arg1.data, head]);
        }
    };

    var header = Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Result__["c" /* map */])(function (tupledArg) {
        return new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["i" /* Row */](0, [tupledArg[0], tupledArg[1]]);
    }, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["b" /* partialApply */])(makeRow, [true])(Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["b" /* partialApply */])(alignCells, [alignments])(function (row) {
        return parseRow(headCellU, row);
    }(table.head))));

    var parseAlignPrepend = function parseAlignPrepend(s, x) {
        return new __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Result__["c" /* map */])(function (tupledArg_1) {
            return new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["i" /* Row */](0, [tupledArg_1[0], tupledArg_1[1]]);
        }, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["b" /* partialApply */])(makeRow, [false])(Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["b" /* partialApply */])(alignCells, [alignments])(parseRow(defaultCellU, x)))), s);
    };

    return joinErrorList(Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["h" /* reverse */])(Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_Seq__["f" /* fold */])(parseAlignPrepend, Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([header]), Object(__WEBPACK_IMPORTED_MODULE_8__Shared_fs__["k" /* xOnwards */])(2, table))));
}

function tryEval_(maxRefs, map, e) {
    var evalExp = function evalExp(r, map_1, e_1) {
        var evalCellRef = function evalCellRef(ref) {
            var matchValue = Object(__WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_1_fable_core_Map__["d" /* tryFind */])(ref, map_1);
            var $var5 = matchValue != null ? Object(__WEBPACK_IMPORTED_MODULE_10__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(matchValue).tag === 1 ? [0, Object(__WEBPACK_IMPORTED_MODULE_10__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(matchValue).data[0]] : [1] : [1];

            switch ($var5[0]) {
                case 0:
                    return evalExp(r + 1, map_1, $var5[1]);

                case 1:
                    return Number.NaN;
            }
        };

        var rangeFunc = function rangeFunc(f, x, y) {
            var matchValue_1 = Object(__WEBPACK_IMPORTED_MODULE_2__MarkalcShared_fs__["d" /* cellRange */])(x, y);

            if (matchValue_1 == null) {
                return Number.NaN;
            } else {
                return f(Object(__WEBPACK_IMPORTED_MODULE_10__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(matchValue_1));
            }
        };

        if (r > maxRefs) {
            return Number.NaN;
        } else {
            var $var6 = e_1.tag === 1 ? e_1.data.tag === 2 ? [1, e_1.data.data] : e_1.data.tag === 0 ? [2, e_1.data.data] : [7] : e_1.tag === 2 ? e_1.data[0] === "SUM" ? [3, e_1.data[1]] : e_1.data[0] === "AVG" ? [4, e_1.data[1]] : e_1.data[0] === "MIN" ? [5, e_1.data[1]] : e_1.data[0] === "MAX" ? [6, e_1.data[1]] : [7] : [0, e_1.data[0], e_1.data[1], e_1.data[2]];

            switch ($var6[0]) {
                case 0:
                    return $var6[1](evalExp(r, map_1, $var6[2]), evalExp(r, map_1, $var6[3]));

                case 1:
                    return $var6[1];

                case 2:
                    return evalCellRef($var6[1]);

                case 3:
                    return Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_Seq__["m" /* sumBy */])(Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["b" /* partialApply */])(evalExp, [r, map_1]), $var6[1]);

                case 4:
                    return Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_Seq__["a" /* averageBy */])(Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["b" /* partialApply */])(evalExp, [r, map_1]), $var6[1]);

                case 5:
                    return Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_Seq__["l" /* reduce */])(function (x, y) {
                        return Math.min(x, y);
                    }, Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["e" /* map */])(Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["b" /* partialApply */])(evalExp, [r, map_1]), $var6[1]));

                case 6:
                    return Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_Seq__["l" /* reduce */])(function (x, y) {
                        return Math.max(x, y);
                    }, Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["e" /* map */])(Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["b" /* partialApply */])(evalExp, [r, map_1]), $var6[1]));

                case 7:
                    return 11;
            }
        }
    };

    return evalExp(0, map, e);
}


var tryEval = Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["a" /* default */])(function (map, e) {
    return tryEval_(1000, map, e);
});
function evaluateCellList(rowList) {
    var rowUnpack = void 0;

    var mapping = function mapping(_arg1) {
        return Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([_arg1.data[0]]);
    };

    rowUnpack = function rowUnpack(list) {
        return Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["b" /* collect */])(mapping, list);
    };

    var makeRow = function makeRow(cellList) {
        return new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["i" /* Row */](0, [cellList, cellList.head.GetHead]);
    };

    var innerFold = function innerFold(row, s, cell) {
        var matchValue = Object(__WEBPACK_IMPORTED_MODULE_11__Expression_fs__["a" /* parseExpression */])(cell.GetToks);

        if (matchValue.tag === 1) {
            return [new __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */]([new __WEBPACK_IMPORTED_MODULE_2__MarkalcShared_fs__["a" /* CellReference */](0, [row, s[1]]), new MapContents(0, cell)], s[0]), s[1] + 1];
        } else {
            return [new __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */]([new __WEBPACK_IMPORTED_MODULE_2__MarkalcShared_fs__["a" /* CellReference */](0, [row, s[1]]), new MapContents(1, [matchValue.data, cell])], s[0]), s[1] + 1];
        }
    };

    var outerFold = function outerFold(s_1, cells) {
        return [s_1[0] + 1, Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_Seq__["f" /* fold */])(Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["b" /* partialApply */])(innerFold, [s_1[0]]), [s_1[1][0], 0], cells)];
    };

    var cellList_1 = rowUnpack(rowList);
    var rowLength = cellList_1.head.length | 0;
    return function (_arg2) {
        var expRefList = _arg2[1][0];
        var expList = Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["h" /* reverse */])(expRefList);
        var map = Object(__WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_1_fable_core_Map__["b" /* create */])(expList, new __WEBPACK_IMPORTED_MODULE_12__nuget_packages_fable_core_1_3_1_fable_core_Comparer__["a" /* default */](function (x, y) {
            return x.CompareTo(y);
        }));

        var expListEval = function expListEval(_arg3) {
            if (_arg3.tag === 1) {
                return function (arg00) {
                    return _arg3.data[1].ReplaceTokens(arg00);
                }(Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([toToken(tryEval(map, _arg3.data[0]))]));
            } else {
                return _arg3.data;
            }
        };

        return Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["e" /* map */])(function ($var7) {
            return makeRow(function (array) {
                return Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_Seq__["n" /* toList */])(array);
            }($var7));
        }, Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_Seq__["n" /* toList */])(function (source) {
            return Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_Seq__["b" /* chunkBySize */])(rowLength, source);
        }(Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["e" /* map */])(function ($var8) {
            return expListEval(function (tuple) {
                return tuple[1];
            }($var8));
        }, expList))));
    }(Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_Seq__["f" /* fold */])(outerFold, [0, [new __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](), 0]], cellList_1));
}
function parseEvaluateTable(toks) {
    var endlFilt = function endlFilt(_arg1) {
        if (_arg1.tag === 32) {
            return false;
        } else {
            return true;
        }
    };

    return function (_arg2) {
        return _arg2.tag === 0 ? new __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Result__["b" /* default */](0, evaluateCellList(_arg2.data)) : new __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Result__["b" /* default */](1, toks);
    }(transformTable(Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["e" /* map */])(function (list) {
        return Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["d" /* filter */])(endlFilt, list);
    }, toks)));
}
function lexParseEvaluate(toks) {
    return parseEvaluateTable(Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["e" /* map */])(function (txt) {
        return Object(__WEBPACK_IMPORTED_MODULE_2__MarkalcShared_fs__["h" /* simpleLex */])(txt);
    }, toks));
}

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export makeFloat */
/* unused harmony export makeInt */
/* unused harmony export makeCellReference */
/* unused harmony export parseExp */
/* harmony export (immutable) */ __webpack_exports__["a"] = parseExpression;
/* unused harmony export evalExpTest */
/* unused harmony export parseExpTest */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Double__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_String__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_Int32__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__MarkalcShared_fs__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Types_fs__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_Seq__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_1_fable_core_Result__ = __webpack_require__(8);











function makeFloat(i, d) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Double__["a" /* parse */])(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_String__["g" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_String__["b" /* printf */])("%A.%A"))(i, d));
}
function makeInt(i) {
    return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_Int32__["a" /* parse */])(i) | 0;
}
function makeCellReference(row, col) {
    return new __WEBPACK_IMPORTED_MODULE_3__MarkalcShared_fs__["a" /* CellReference */](0, [Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_Int32__["a" /* parse */])(row), Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_Int32__["a" /* parse */])(col)]);
}
function parseExp(toks) {
    var _Expression___ = function _Expression___(toks_1) {
        var _NumberPat___ = function _NumberPat___(_arg1) {
            var $var1 = _arg1.tail != null ? _arg1.head.tag === 3 ? _arg1.tail.tail != null ? _arg1.tail.head.tag === 10 ? _arg1.tail.tail.tail != null ? _arg1.tail.tail.head.tag === 3 ? [0, _arg1.tail.tail.tail, _arg1.tail.tail.head.data, _arg1.head.data] : [1, _arg1.tail, _arg1.head.data] : [1, _arg1.tail, _arg1.head.data] : [1, _arg1.tail, _arg1.head.data] : [1, _arg1.tail, _arg1.head.data] : [2] : [2];

            switch ($var1[0]) {
                case 0:
                    return [makeFloat($var1[3], $var1[2]), $var1[1]];

                case 1:
                    return [makeInt($var1[2]), $var1[1]];

                case 2:
                    return null;
            }
        };

        var _CellRefPat___ = function _CellRefPat___(_arg2) {
            var $var2 = _arg2.tail != null ? _arg2.head.tag === 21 ? _arg2.tail.tail != null ? _arg2.tail.head.tag === 3 ? _arg2.tail.tail.tail != null ? _arg2.tail.tail.head.tag === 11 ? _arg2.tail.tail.tail.tail != null ? _arg2.tail.tail.tail.head.tag === 3 ? _arg2.tail.tail.tail.tail.tail != null ? _arg2.tail.tail.tail.tail.head.tag === 20 ? [0, _arg2.tail.tail.tail.tail.tail, _arg2.tail.head.data, _arg2.tail.tail.tail.head.data] : [3] : [3] : [3] : [3] : _arg2.tail.tail.head.tag === 6 ? _arg2.tail.tail.tail.tail != null ? _arg2.tail.tail.tail.head.tag === 1 ? _arg2.tail.tail.tail.head.data === "row" ? _arg2.tail.tail.tail.tail.tail != null ? _arg2.tail.tail.tail.tail.head.tag === 11 ? _arg2.tail.tail.tail.tail.tail.tail != null ? _arg2.tail.tail.tail.tail.tail.head.tag === 3 ? _arg2.tail.tail.tail.tail.tail.tail.tail != null ? _arg2.tail.tail.tail.tail.tail.tail.head.tag === 6 ? _arg2.tail.tail.tail.tail.tail.tail.tail.tail != null ? _arg2.tail.tail.tail.tail.tail.tail.tail.head.tag === 1 ? _arg2.tail.tail.tail.tail.tail.tail.tail.head.data === "col" ? _arg2.tail.tail.tail.tail.tail.tail.tail.tail.tail != null ? _arg2.tail.tail.tail.tail.tail.tail.tail.tail.head.tag === 20 ? [1, _arg2.tail.tail.tail.tail.tail.tail.tail.tail.tail, _arg2.tail.tail.tail.tail.tail.head.data, _arg2.tail.head.data] : [3] : [3] : [3] : [3] : [3] : [3] : [3] : [3] : [3] : [3] : [3] : _arg2.tail.tail.tail.head.data === "col" ? _arg2.tail.tail.tail.tail.tail != null ? _arg2.tail.tail.tail.tail.head.tag === 11 ? _arg2.tail.tail.tail.tail.tail.tail != null ? _arg2.tail.tail.tail.tail.tail.head.tag === 3 ? _arg2.tail.tail.tail.tail.tail.tail.tail != null ? _arg2.tail.tail.tail.tail.tail.tail.head.tag === 6 ? _arg2.tail.tail.tail.tail.tail.tail.tail.tail != null ? _arg2.tail.tail.tail.tail.tail.tail.tail.head.tag === 1 ? _arg2.tail.tail.tail.tail.tail.tail.tail.head.data === "row" ? _arg2.tail.tail.tail.tail.tail.tail.tail.tail.tail != null ? _arg2.tail.tail.tail.tail.tail.tail.tail.tail.head.tag === 20 ? [2, _arg2.tail.tail.tail.tail.tail.tail.tail.tail.tail, _arg2.tail.head.data, _arg2.tail.tail.tail.tail.tail.head.data] : [3] : [3] : [3] : [3] : [3] : [3] : [3] : [3] : [3] : [3] : [3] : [3] : [3] : [3] : [3] : [3] : [3] : [3] : [3] : [3];

            switch ($var2[0]) {
                case 0:
                    return [function (tupledArg) {
                        return makeCellReference(tupledArg[0], tupledArg[1]);
                    }([$var2[3], $var2[2]]), $var2[1]];

                case 1:
                    __WEBPACK_IMPORTED_MODULE_3__MarkalcShared_fs__["g" /* logger */].Debug(null)(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_String__["g" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_String__["b" /* printf */])("Row:%A, Col:%A"))($var2[3], $var2[2]));
                    return [function (tupledArg_1) {
                        return makeCellReference(tupledArg_1[0], tupledArg_1[1]);
                    }([$var2[3], $var2[2]]), $var2[1]];

                case 2:
                    __WEBPACK_IMPORTED_MODULE_3__MarkalcShared_fs__["g" /* logger */].Debug(null)(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_String__["g" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_String__["b" /* printf */])("Row:%A, Col:%A"))($var2[3], $var2[2]));
                    return [function (tupledArg_2) {
                        return makeCellReference(tupledArg_2[0], tupledArg_2[1]);
                    }([$var2[3], $var2[2]]), $var2[1]];

                case 3:
                    return null;
            }
        };

        var _ExpressionList___ = function _ExpressionList___(_arg3) {
            var $var3 = void 0;

            var activePatternResult911 = _Expression___(_arg3);

            if (activePatternResult911 != null) {
                if (Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult911)[1].tail != null) {
                    if (Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult911)[1].head.tag === 11) {
                        var activePatternResult912 = _ExpressionList___(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult911)[1].tail);

                        if (activePatternResult912 != null) {
                            $var3 = [0, Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult912)[1], Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult911)[0], Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult912)[0]];
                        } else {
                            $var3 = [1];
                        }
                    } else {
                        $var3 = [1];
                    }
                } else {
                    $var3 = [1];
                }
            } else {
                $var3 = [1];
            }

            switch ($var3[0]) {
                case 0:
                    return [new __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */]($var3[2], $var3[3]), $var3[1]];

                case 1:
                    var $var4 = void 0;

                    var activePatternResult909 = _CellRefPat___(_arg3);

                    if (activePatternResult909 != null) {
                        if (Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult909)[1].tail != null) {
                            if (Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult909)[1].head.tag === 33) {
                                var activePatternResult910 = _CellRefPat___(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult909)[1].tail);

                                if (activePatternResult910 != null) {
                                    $var4 = [0, Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult910)[1], Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult909)[0], Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult910)[0]];
                                } else {
                                    $var4 = [1];
                                }
                            } else {
                                $var4 = [1];
                            }
                        } else {
                            $var4 = [1];
                        }
                    } else {
                        $var4 = [1];
                    }

                    switch ($var4[0]) {
                        case 0:
                            return function (_arg4) {
                                return _arg4 != null ? [Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["e" /* map */])(function ($var5) {
                                    return new __WEBPACK_IMPORTED_MODULE_3__MarkalcShared_fs__["b" /* Expr */](1, new __WEBPACK_IMPORTED_MODULE_3__MarkalcShared_fs__["c" /* Operand */](0, $var5));
                                }, Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(_arg4)), $var4[1]] : null;
                            }(Object(__WEBPACK_IMPORTED_MODULE_3__MarkalcShared_fs__["d" /* cellRange */])($var4[2], $var4[3]));

                        case 1:
                            var activePatternResult908 = _Expression___(_arg3);

                            if (activePatternResult908 != null) {
                                return [Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult908)[0]]), Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult908)[1]];
                            } else {
                                return null;
                            }

                    }

            }
        };

        var funcConstruct = function funcConstruct(funcname, _arg5) {
            var $var6 = void 0;

            if (_arg5.tail != null) {
                if (_arg5.head.tag === 29) {
                    var activePatternResult915 = _ExpressionList___(_arg5.tail);

                    if (activePatternResult915 != null) {
                        if (Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult915)[1].tail != null) {
                            if (Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult915)[1].head.tag === 28) {
                                if (Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult915)[1].tail.tail != null) {
                                    if (Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult915)[1].tail.head.tag === 1) {
                                        $var6 = [0, Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult915)[1].tail.tail, Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult915)[1].tail.head.data, Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult915)[0]];
                                    } else {
                                        $var6 = [1];
                                    }
                                } else {
                                    $var6 = [1];
                                }
                            } else {
                                $var6 = [1];
                            }
                        } else {
                            $var6 = [1];
                        }
                    } else {
                        $var6 = [1];
                    }
                } else {
                    $var6 = [1];
                }
            } else {
                $var6 = [1];
            }

            switch ($var6[0]) {
                case 0:
                    return [new __WEBPACK_IMPORTED_MODULE_3__MarkalcShared_fs__["b" /* Expr */](2, [$var6[2], $var6[3]]), $var6[1]];

                case 1:
                    return null;
            }
        };

        var _Sum___ = Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["b" /* partialApply */])(funcConstruct, ["SUM"]);

        var _Avg___ = Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["b" /* partialApply */])(funcConstruct, ["AVG"]);

        var _Min___ = Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["b" /* partialApply */])(funcConstruct, ["MIN"]);

        var _Max___ = Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["b" /* partialApply */])(funcConstruct, ["MAX"]);

        var _FunctionPat___ = function _FunctionPat___(_arg6) {
            var activePatternResult926 = _Sum___(_arg6);

            if (activePatternResult926 != null) {
                return [Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult926)[0], Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult926)[1]];
            } else {
                var activePatternResult925 = _Avg___(_arg6);

                if (activePatternResult925 != null) {
                    return [Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult925)[0], Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult925)[1]];
                } else {
                    var activePatternResult924 = _Min___(_arg6);

                    if (activePatternResult924 != null) {
                        return [Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult924)[0], Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult924)[1]];
                    } else {
                        var activePatternResult923 = _Max___(_arg6);

                        if (activePatternResult923 != null) {
                            return [Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult923)[0], Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult923)[1]];
                        } else {
                            return null;
                        }
                    }
                }
            }
        };

        var _BasePat___ = function _BasePat___(_arg7) {
            var activePatternResult939 = _NumberPat___(_arg7);

            if (activePatternResult939 != null) {
                return [new __WEBPACK_IMPORTED_MODULE_3__MarkalcShared_fs__["b" /* Expr */](1, new __WEBPACK_IMPORTED_MODULE_3__MarkalcShared_fs__["c" /* Operand */](2, Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult939)[0])), Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult939)[1]];
            } else {
                var activePatternResult938 = _FunctionPat___(_arg7);

                if (activePatternResult938 != null) {
                    return [Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult938)[0], Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult938)[1]];
                } else {
                    var activePatternResult937 = _CellRefPat___(_arg7);

                    if (activePatternResult937 != null) {
                        return [new __WEBPACK_IMPORTED_MODULE_3__MarkalcShared_fs__["b" /* Expr */](1, new __WEBPACK_IMPORTED_MODULE_3__MarkalcShared_fs__["c" /* Operand */](0, Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult937)[0])), Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult937)[1]];
                    } else {
                        var $var7 = void 0;

                        if (_arg7.tail != null) {
                            if (_arg7.head.tag === 23) {
                                var activePatternResult936 = _Expression___(_arg7.tail);

                                if (activePatternResult936 != null) {
                                    if (Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult936)[1].tail != null) {
                                        if (Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult936)[1].head.tag === 22) {
                                            $var7 = [0, Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult936)[1].tail, Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult936)[0]];
                                        } else {
                                            $var7 = [1];
                                        }
                                    } else {
                                        $var7 = [1];
                                    }
                                } else {
                                    $var7 = [1];
                                }
                            } else {
                                $var7 = [1];
                            }
                        } else {
                            $var7 = [1];
                        }

                        switch ($var7[0]) {
                            case 0:
                                return [$var7[2], $var7[1]];

                            case 1:
                                return null;
                        }
                    }
                }
            }
        };

        var _HOFPat___ = function _HOFPat___(_PrevPat___, op, t, _arg8) {
            var activePatternResult945 = _PrevPat___(_arg8);

            if (activePatternResult945 != null) {
                var $var8 = void 0;

                if (Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult945)[1].tail != null) {
                    var activePatternResult944 = _HOFPat___(_PrevPat___, op, t, Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult945)[1].tail);

                    if (activePatternResult944 != null) {
                        if (function () {
                            var exp2 = Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult944)[0];
                            var after_ = Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult944)[1];
                            return Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult945)[1].head.Equals(t);
                        }()) {
                            $var8 = [0, Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult944)[1], Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult944)[0], Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult945)[1].head];
                        } else {
                            $var8 = [1];
                        }
                    } else {
                        $var8 = [1];
                    }
                } else {
                    $var8 = [1];
                }

                switch ($var8[0]) {
                    case 0:
                        return [new __WEBPACK_IMPORTED_MODULE_3__MarkalcShared_fs__["b" /* Expr */](0, [op, $var8[2], Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult945)[0]]), $var8[1]];

                    case 1:
                        return [Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult945)[0], Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult945)[1]];
                }
            } else {
                return null;
            }
        };

        var patPrecedence = Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([[function (x, y) {
            return x % y;
        }, new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["o" /* Token */](35)], [function (x_1, y_1) {
            return Math.pow(x_1, y_1);
        }, new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["o" /* Token */](34)], [function (x_2, y_2) {
            return x_2 * y_2;
        }, new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["o" /* Token */](9)], [function (x_3, y_3) {
            return x_3 / y_3;
        }, new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["o" /* Token */](25)], [function (x_4, y_4) {
            return x_4 - y_4;
        }, new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["o" /* Token */](7)], [function (x_5, y_5) {
            return x_5 + y_5;
        }, new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["o" /* Token */](8)]]);

        var constructPatterns = function constructPatterns(s, x_6) {
            return new __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["b" /* partialApply */])(_HOFPat___, [s.head, x_6[0], x_6[1]]), s);
        };

        var patterns = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_Seq__["f" /* fold */])(constructPatterns, Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([_BasePat___]), patPrecedence);
        var _FirstPat___ = patterns.head;

        var activePatternResult952 = _FirstPat___(toks_1);

        if (activePatternResult952 != null) {
            return Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult952);
        } else {
            return null;
        }
    };

    var matchValue = Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_List__["h" /* reverse */])(toks);
    var $var9 = void 0;

    var activePatternResult955 = _Expression___(matchValue);

    if (activePatternResult955 != null) {
        if (Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult955)[1].tail == null) {
            $var9 = [0, Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult955)[0]];
        } else {
            $var9 = [1];
        }
    } else {
        $var9 = [1];
    }

    switch ($var9[0]) {
        case 0:
            return new __WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_1_fable_core_Result__["b" /* default */](0, $var9[1]);

        case 1:
            return new __WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_1_fable_core_Result__["b" /* default */](1, Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_String__["g" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_String__["b" /* printf */])("Not valid expression %A"))(toks));
    }
}
function parseExpression(toks) {
    var $var10 = toks.tail != null ? toks.head.tag === 6 ? [0, toks.tail] : [1, toks] : [1, toks];

    switch ($var10[0]) {
        case 0:
            return function (_arg1) {
                return _arg1.tag === 0 ? new __WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_1_fable_core_Result__["b" /* default */](0, _arg1.data) : new __WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_1_fable_core_Result__["b" /* default */](1, toks);
            }(parseExp(Object(__WEBPACK_IMPORTED_MODULE_3__MarkalcShared_fs__["i" /* whitespaceFilter */])($var10[1])));

        case 1:
            return new __WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_1_fable_core_Result__["b" /* default */](1, $var10[1]);
    }
}
function evalExpTest(e) {
    var $var11 = e.tag === 0 ? [0, e.data[0], e.data[1], e.data[2]] : e.tag === 1 ? e.data.tag === 2 ? [1, e.data.data] : [2] : [2];

    switch ($var11[0]) {
        case 0:
            return $var11[1](evalExpTest($var11[2]), evalExpTest($var11[3]));

        case 1:
            return $var11[1];

        case 2:
            return 13;
    }
}
function parseExpTest(toks) {
    return function (_arg1) {
        if (_arg1.tag === 0) {
            return new __WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_1_fable_core_Result__["b" /* default */](0, evalExpTest(_arg1.data));
        } else {
            Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_String__["e" /* toConsole */])(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_String__["b" /* printf */])("Error parsing expression: %A"))(_arg1.data);
            return new __WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_1_fable_core_Result__["b" /* default */](1, toks);
        }
    }(parseExp(Object(__WEBPACK_IMPORTED_MODULE_3__MarkalcShared_fs__["i" /* whitespaceFilter */])(toks)));
}

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export tryParse */
/* harmony export (immutable) */ __webpack_exports__["a"] = parse;
// TODO does this perfectly match the .NET behavior ?
function tryParse(s, radix, initial) {
    if (s != null) {
        if (radix === 10) {
            var v = +s;
            if (!Number.isNaN(v)) {
                return [true, v];
            }
        }
    }
    return [false, initial];
}
function parse(s) {
    var radix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

    var a = tryParse(s, radix, 0);
    if (a[0]) {
        return a[1];
    } else {
        // TODO FormatException ?
        throw new Error("Input string was not in a correct format.");
    }
}

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export isValid */
/* unused harmony export tryParse */
/* harmony export (immutable) */ __webpack_exports__["a"] = parse;
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var parseRadix = /^\s*([\+\-])?(0[xob])?([0-9a-fA-F]+)\s*$/;
var invalidRadix2 = /[^01]/;
var invalidRadix8 = /[^0-7]/;
var invalidRadix10 = /[^0-9]/;
function isValid(s, radix) {
    var res = parseRadix.exec(s);
    if (res != null) {
        if (radix == null) {
            switch (res[2]) {
                case "0b":
                    radix = 2;
                    break;
                case "0o":
                    radix = 8;
                    break;
                case "0x":
                    radix = 16;
                    break;
                default:
                    radix = 10;
                    break;
            }
        }
        switch (radix) {
            case 2:
                return invalidRadix2.test(res[3]) ? null : [res, 2];
            case 8:
                return invalidRadix8.test(res[3]) ? null : [res, 8];
            case 10:
                return invalidRadix10.test(res[3]) ? null : [res, 10];
            case 16:
                return [res, 16];
            default:
                throw new Error("Invalid Base.");
        }
    }
    return null;
}
// TODO does this perfectly match the .NET behavior ?
function tryParse(s, radix, initial) {
    var a = isValid(s, radix);
    if (a !== null) {
        var _a = _slicedToArray(a, 2),
            _a$ = _slicedToArray(_a[0], 4),
            prefix = _a$[1],
            digits = _a$[3],
            radix_ = _a[1];

        var v = parseInt((prefix || "") + digits, radix_);
        if (!Number.isNaN(v)) {
            return [true, v];
        }
    }
    return [false, initial];
}
function parse(s, radix) {
    var a = tryParse(s, radix, 0);
    if (a[0]) {
        return a[1];
    } else {
        throw new Error("Input string was not in a correct format.");
    }
}

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export LexerState */
/* unused harmony export htmlSingleton */
/* unused harmony export $7C$EscapedCharTok$7C$_$7C$ */
/* unused harmony export $7C$CharacterTok$7C$_$7C$ */
/* unused harmony export $7C$MatchLang$7C$_$7C$ */
/* unused harmony export $7C$HTMLStartTag$7C$_$7C$ */
/* unused harmony export $7C$HTMLEndTag$7C$_$7C$ */
/* unused harmony export $7C$HTMLSingleton$7C$_$7C$ */
/* unused harmony export $7C$CodeBlockStart$7C$_$7C$ */
/* unused harmony export nextToken */
/* unused harmony export lexS */
/* unused harmony export returnTokens */
/* unused harmony export lex */
/* harmony export (immutable) */ __webpack_exports__["a"] = lexList;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Types_fs__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_Util__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_List__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__LexerShared_fs__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Shared_fs__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_String__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_1_fable_core_Seq__ = __webpack_require__(1);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }














var LexerState = function () {
    function LexerState(tag, data) {
        _classCallCheck(this, LexerState);

        this.tag = tag;
        this.data = data;
    }

    _createClass(LexerState, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Lexer.LexerState",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: [["Normal"], ["InCodeBlock", "string", __WEBPACK_IMPORTED_MODULE_1__Types_fs__["d" /* Language */]], ["InHTMLTag", "string", "number"]]
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return this === other || this.tag === other.tag && Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_Util__["j" /* equals */])(this.data, other.data);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_Util__["i" /* compareUnions */])(this, other) | 0;
        }
    }]);

    return LexerState;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["b" /* setType */])("Lexer.LexerState", LexerState);
var htmlSingleton = Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])(["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"]);

var _EscapedCharTok___ = Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["a" /* default */])(function () {
    var tType = function tType(arg0) {
        return new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["o" /* Token */](1, arg0);
    };

    return function (str) {
        return Object(__WEBPACK_IMPORTED_MODULE_5__LexerShared_fs__["b" /* $7C$EscapedChar$7C$_$7C$ */])(tType, __WEBPACK_IMPORTED_MODULE_6__Shared_fs__["a" /* charList */], str);
    };
}());



var _CharacterTok___ = Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["a" /* default */])(function (str) {
    return Object(__WEBPACK_IMPORTED_MODULE_5__LexerShared_fs__["a" /* $7C$Character$7C$_$7C$ */])(__WEBPACK_IMPORTED_MODULE_6__Shared_fs__["a" /* charList */], str);
});



function _MatchLang___(_arg1) {
    var activePatternResult738 = Object(__WEBPACK_IMPORTED_MODULE_5__LexerShared_fs__["d" /* $7C$RegexMatch$7C$_$7C$ */])("(p|P)ython", _arg1);

    if (activePatternResult738 != null) {
        return new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["d" /* Language */](0);
    } else {
        var activePatternResult736 = Object(__WEBPACK_IMPORTED_MODULE_5__LexerShared_fs__["d" /* $7C$RegexMatch$7C$_$7C$ */])("F#|fsharp|f#", _arg1);

        if (activePatternResult736 != null) {
            return new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["d" /* Language */](1);
        } else {
            var activePatternResult734 = Object(__WEBPACK_IMPORTED_MODULE_5__LexerShared_fs__["d" /* $7C$RegexMatch$7C$_$7C$ */])("(C|c)(\\+\\+|pp)", _arg1);

            if (activePatternResult734 != null) {
                return new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["d" /* Language */](2);
            } else {
                var activePatternResult732 = Object(__WEBPACK_IMPORTED_MODULE_5__LexerShared_fs__["d" /* $7C$RegexMatch$7C$_$7C$ */])("C|c", _arg1);

                if (activePatternResult732 != null) {
                    return new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["d" /* Language */](3);
                } else {
                    return new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["d" /* Language */](4);
                }
            }
        }
    }
}



var _HTMLStartTag___ = Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["a" /* default */])(function (str) {
    return Object(__WEBPACK_IMPORTED_MODULE_5__LexerShared_fs__["d" /* $7C$RegexMatch$7C$_$7C$ */])("^<([a-zA-Z]+)\\s*.*?>", str);
});



var _HTMLEndTag___ = Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["a" /* default */])(function (str) {
    return Object(__WEBPACK_IMPORTED_MODULE_5__LexerShared_fs__["d" /* $7C$RegexMatch$7C$_$7C$ */])("^<\\/([a-zA-Z]+)\\s*.*?>", str);
});



var _HTMLSingleton___ = Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["a" /* default */])(function (str) {
    return Object(__WEBPACK_IMPORTED_MODULE_5__LexerShared_fs__["d" /* $7C$RegexMatch$7C$_$7C$ */])("^<([a-zA-Z]+)\\s*.*?(?:\\/>|>)", str);
});



var _CodeBlockStart___ = Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["a" /* default */])(function (_arg1) {
    return Object(__WEBPACK_IMPORTED_MODULE_5__LexerShared_fs__["c" /* $7C$GroupMatch$7C$_$7C$ */])("^```+\\s*([a-zA-Z0-9+\\-_]*)", _arg1);
});


function nextToken(state, s) {
    var matchValue = [s, state];

    var activePatternResult755 = _EscapedCharTok___(matchValue[0]);

    if (activePatternResult755 != null) {
        return [Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult755), state];
    } else {
        var $var1 = void 0;

        var activePatternResult754 = _HTMLStartTag___(matchValue[0]);

        if (activePatternResult754 != null) {
            if (Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult754)[1].tail != null) {
                if (Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult754)[1].tail.tail == null) {
                    if (matchValue[1].tag === 0) {
                        $var1 = [0, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult754)[2], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult754)[0], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult754)[1].head];
                    } else {
                        $var1 = [1];
                    }
                } else {
                    $var1 = [1];
                }
            } else {
                $var1 = [1];
            }
        } else {
            $var1 = [1];
        }

        switch ($var1[0]) {
            case 0:
                return [[new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["o" /* Token */](1, $var1[2]), $var1[1]], new LexerState(2, [$var1[3], 1])];

            case 1:
                var $var2 = void 0;

                var activePatternResult753 = _HTMLStartTag___(matchValue[0]);

                if (activePatternResult753 != null) {
                    if (Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult753)[1].tail != null) {
                        if (Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult753)[1].tail.tail == null) {
                            if (matchValue[1].tag === 2) {
                                $var2 = [0, matchValue[1].data[1], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult753)[2], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult753)[0], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult753)[1].head, matchValue[1].data[0]];
                            } else {
                                $var2 = [1];
                            }
                        } else {
                            $var2 = [1];
                        }
                    } else {
                        $var2 = [1];
                    }
                } else {
                    $var2 = [1];
                }

                switch ($var2[0]) {
                    case 0:
                        if ($var2[4] === $var2[5]) {
                            return [[new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["o" /* Token */](1, $var2[3]), $var2[2]], new LexerState(2, [$var2[5], $var2[1] + 1])];
                        } else {
                            return [[new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["o" /* Token */](1, $var2[3]), $var2[2]], new LexerState(2, [$var2[5], $var2[1]])];
                        }

                    case 1:
                        var $var3 = void 0;

                        var activePatternResult752 = _HTMLEndTag___(matchValue[0]);

                        if (activePatternResult752 != null) {
                            if (Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult752)[1].tail != null) {
                                if (Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult752)[1].tail.tail == null) {
                                    if (matchValue[1].tag === 2) {
                                        $var3 = [0, matchValue[1].data[1], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult752)[2], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult752)[0], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult752)[1].head, matchValue[1].data[0]];
                                    } else {
                                        $var3 = [1];
                                    }
                                } else {
                                    $var3 = [1];
                                }
                            } else {
                                $var3 = [1];
                            }
                        } else {
                            $var3 = [1];
                        }

                        switch ($var3[0]) {
                            case 0:
                                if ($var3[4] === $var3[5]) {
                                    if ($var3[1] === 1) {
                                        return [[new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["o" /* Token */](1, $var3[3]), $var3[2]], new LexerState(0)];
                                    } else {
                                        return [[new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["o" /* Token */](1, $var3[3]), $var3[2]], new LexerState(2, [$var3[5], $var3[1] - 1])];
                                    }
                                } else {
                                    return [[new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["o" /* Token */](1, $var3[3]), $var3[2]], new LexerState(2, [$var3[5], $var3[1]])];
                                }

                            case 1:
                                var activePatternResult751 = _HTMLSingleton___(matchValue[0]);

                                if (activePatternResult751 != null) {
                                    return [[new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["o" /* Token */](1, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult751)[0]), Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult751)[2]], state];
                                } else {
                                    var $var4 = void 0;

                                    var activePatternResult750 = Object(__WEBPACK_IMPORTED_MODULE_5__LexerShared_fs__["d" /* $7C$RegexMatch$7C$_$7C$ */])(".*?(?=<)", matchValue[0]);

                                    if (activePatternResult750 != null) {
                                        if (matchValue[1].tag === 2) {
                                            $var4 = [0, matchValue[1].data[1], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult750)[2], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult750)[0], matchValue[1].data[0]];
                                        } else {
                                            $var4 = [1];
                                        }
                                    } else {
                                        $var4 = [1];
                                    }

                                    switch ($var4[0]) {
                                        case 0:
                                            return [[new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["o" /* Token */](1, $var4[3]), $var4[2]], new LexerState(2, [$var4[4], $var4[1]])];

                                        case 1:
                                            var activePatternResult748 = _CharacterTok___(matchValue[0]);

                                            if (activePatternResult748 != null) {
                                                return [Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult748), state];
                                            } else {
                                                var activePatternResult747 = Object(__WEBPACK_IMPORTED_MODULE_5__LexerShared_fs__["d" /* $7C$RegexMatch$7C$_$7C$ */])("^\\s+", matchValue[0]);

                                                if (activePatternResult747 != null) {
                                                    return [[new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["o" /* Token */](2, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult747)[0].length), Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult747)[2]], state];
                                                } else {
                                                    var activePatternResult745 = Object(__WEBPACK_IMPORTED_MODULE_5__LexerShared_fs__["d" /* $7C$RegexMatch$7C$_$7C$ */])("^[0-9]+", matchValue[0]);

                                                    if (activePatternResult745 != null) {
                                                        return [[new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["o" /* Token */](3, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult745)[0]), Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult745)[2]], state];
                                                    } else {
                                                        var activePatternResult743 = Object(__WEBPACK_IMPORTED_MODULE_5__LexerShared_fs__["d" /* $7C$RegexMatch$7C$_$7C$ */])(Object(__WEBPACK_IMPORTED_MODULE_5__LexerShared_fs__["e" /* literalString */])(__WEBPACK_IMPORTED_MODULE_6__Shared_fs__["a" /* charList */]), matchValue[0]);

                                                        if (activePatternResult743 != null) {
                                                            return [[new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["o" /* Token */](1, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult743)[0]), Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult743)[2]], state];
                                                        } else {
                                                            __WEBPACK_IMPORTED_MODULE_6__Shared_fs__["i" /* sharedLog */].Warn(null)(Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_String__["g" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_String__["b" /* printf */])("Unrecognised character: %A"))(matchValue[0]));
                                                            return [[new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["o" /* Token */](1, Object(__WEBPACK_IMPORTED_MODULE_5__LexerShared_fs__["f" /* toString */])(matchValue[0][0])), Object(__WEBPACK_IMPORTED_MODULE_6__Shared_fs__["h" /* sOnwards */])(1, matchValue[0])], state];
                                                        }
                                                    }
                                                }
                                            }

                                    }
                                }

                        }

                }

        }
    }
}
function lexS(state, source) {
    var lexS_ = function lexS_(state_1, s, tokList) {
        if (s === "") {
            return new __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["o" /* Token */](32), tokList);
        } else {
            var patternInput = nextToken(state_1, s);
            var st_ = patternInput[0][1];
            var nt = patternInput[0][0];
            return Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["b" /* partialApply */])(lexS_, [patternInput[1], st_])(new __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](nt, tokList));
        }
    };

    var matchValue = [source, state];
    var $var5 = void 0;

    var activePatternResult765 = _CodeBlockStart___(matchValue[0]);

    if (activePatternResult765 != null) {
        var activePatternResult766 = _MatchLang___(Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult765));

        if (activePatternResult766 != null) {
            if (matchValue[1].tag === 0) {
                $var5 = [0, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult766)];
            } else {
                $var5 = [1];
            }
        } else {
            $var5 = [1];
        }
    } else {
        $var5 = [1];
    }

    switch ($var5[0]) {
        case 0:
            return [new __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](), new LexerState(1, ["", $var5[1]])];

        case 1:
            var $var6 = void 0;

            var activePatternResult764 = Object(__WEBPACK_IMPORTED_MODULE_5__LexerShared_fs__["d" /* $7C$RegexMatch$7C$_$7C$ */])("^```+", matchValue[0]);

            if (activePatternResult764 != null) {
                if (matchValue[1].tag === 1) {
                    $var6 = [0, matchValue[1].data[1], matchValue[1].data[0]];
                } else {
                    $var6 = [1];
                }
            } else {
                $var6 = [1];
            }

            switch ($var6[0]) {
                case 0:
                    return [Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["o" /* Token */](0, [$var6[2], $var6[1]]), new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["o" /* Token */](32)]), new LexerState(0)];

                case 1:
                    if (matchValue[1].tag === 1) {
                        return [new __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](), new LexerState(1, [matchValue[1].data[0] + source + "\n", matchValue[1].data[1]])];
                    } else {
                        var activePatternResult762 = Object(__WEBPACK_IMPORTED_MODULE_5__LexerShared_fs__["d" /* $7C$RegexMatch$7C$_$7C$ */])("^\\s*$", matchValue[0]);

                        if (activePatternResult762 != null) {
                            return [Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["o" /* Token */](32)]), state];
                        } else {
                            return [Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_List__["h" /* reverse */])(lexS_(state, source, new __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */]())), state];
                        }
                    }

            }

    }
}
function returnTokens(_arg1_0, _arg1_1) {
    var _arg1 = [_arg1_0, _arg1_1];

    if (_arg1[1].tag === 1) {
        var s = _arg1[1].data[0];
        var l = _arg1[1].data[1];
        return Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["o" /* Token */](0, [s, l]), new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["o" /* Token */](32)]);
    } else if (_arg1[1].tag === 2) {
        var str = _arg1[1].data[0];
        return Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_List__["a" /* append */])(_arg1[0], Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["o" /* Token */](1, str), new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["o" /* Token */](32)]));
    } else {
        return _arg1[0];
    }
}
function lex(s) {
    return function (tupledArg) {
        return returnTokens(tupledArg[0], tupledArg[1]);
    }(lexS(new LexerState(0), s));
}
function lexList(strl) {
    var f = function f(tupledArg, nstr) {
        var patternInput = lexS(tupledArg[1], nstr);
        return [Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_List__["a" /* append */])(tupledArg[0], patternInput[0]), patternInput[1]];
    };

    return function (tupledArg_1) {
        return returnTokens(tupledArg_1[0], tupledArg_1[1]);
    }(Object(__WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_1_fable_core_Seq__["f" /* fold */])(f, [new __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](), new LexerState(0)], strl));
}

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Token */
/* unused harmony export Parser */
/* unused harmony export Macro */
/* unused harmony export Sub */
/* unused harmony export charList */
/* unused harmony export keywordList */
/* unused harmony export $7C$WhiteSpace$7C$NonWhiteSpace$7C$ */
/* unused harmony export $7C$EscapedCharParse$7C$_$7C$ */
/* unused harmony export $7C$CharacterParse$7C$_$7C$ */
/* unused harmony export $7C$KeywordParse$7C$_$7C$ */
/* unused harmony export tokToString */
/* unused harmony export nextToken */
/* unused harmony export tokenize */
/* unused harmony export tokenizeList */
/* unused harmony export $7C$KeyWord$7C$_$7C$ */
/* unused harmony export $7C$ArgList$7C$_$7C$ */
/* unused harmony export $7C$Function$7C$_$7C$ */
/* unused harmony export $7C$MacroDef$7C$_$7C$ */
/* unused harmony export $7C$EvalDef$7C$_$7C$ */
/* unused harmony export $7C$SChar$7C$_$7C$ */
/* unused harmony export parse */
/* unused harmony export evaluate */
/* unused harmony export parserToString */
/* unused harmony export toStringList */
/* unused harmony export pETS */
/* unused harmony export preprocess */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return preprocessList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__LexerShared_fs__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Choice__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Shared_fs__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_Seq__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_1_fable_core_Map__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__nuget_packages_fable_core_1_3_1_fable_core_Comparer__ = __webpack_require__(12);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }















var Token = function () {
    function Token(tag, data) {
        _classCallCheck(this, Token);

        this.tag = tag;
        this.data = data;
    }

    _createClass(Token, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Preprocessor.Token",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: [["LITERAL", "string"], ["MACRO"], ["OPENDEF"], ["CLOSEDEF"], ["OPENEVAL"], ["CLOSEEVAL"], ["LBRA"], ["RBRA"], ["SEMICOLON"], ["ENDLINE"], ["BSLASH"]]
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return this === other || this.tag === other.tag && Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["j" /* equals */])(this.data, other.data);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["i" /* compareUnions */])(this, other) | 0;
        }
    }]);

    return Token;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["b" /* setType */])("Preprocessor.Token", Token);
var Parser = function () {
    function Parser(tag, data) {
        _classCallCheck(this, Parser);

        this.tag = tag;
        this.data = data;
    }

    _createClass(Parser, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Preprocessor.Parser",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: [["MacroDefinition", Macro], ["MacroSubstitution", Sub], ["ParseText", "string"], ["ParseNewLine"]]
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return this === other || this.tag === other.tag && Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["j" /* equals */])(this.data, other.data);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["i" /* compareUnions */])(this, other) | 0;
        }
    }]);

    return Parser;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["b" /* setType */])("Preprocessor.Parser", Parser);
var Macro = function () {
    function Macro(name, args, body) {
        _classCallCheck(this, Macro);

        this.Name = name;
        this.Args = args;
        this.Body = body;
    }

    _createClass(Macro, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Preprocessor.Macro",
                interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
                properties: {
                    Name: "string",
                    Args: Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["m" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */], {
                        T: "string"
                    }),
                    Body: Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["m" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */], {
                        T: Parser
                    })
                }
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["k" /* equalsRecords */])(this, other);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["h" /* compareRecords */])(this, other) | 0;
        }
    }]);

    return Macro;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["b" /* setType */])("Preprocessor.Macro", Macro);
var Sub = function () {
    function Sub(name, args, raw) {
        _classCallCheck(this, Sub);

        this.Name = name;
        this.Args = args;
        this.Raw = raw;
    }

    _createClass(Sub, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Preprocessor.Sub",
                interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
                properties: {
                    Name: "string",
                    Args: Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["m" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */], {
                        T: "string"
                    }),
                    Raw: "string"
                }
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["k" /* equalsRecords */])(this, other);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["h" /* compareRecords */])(this, other) | 0;
        }
    }]);

    return Sub;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["b" /* setType */])("Preprocessor.Sub", Sub);
var charList = Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([["{%", new Token(2)], ["%}", new Token(3)], ["{{", new Token(4)], ["}}", new Token(5)], ["(", new Token(6)], [")", new Token(7)], [";", new Token(8)], ["\\", new Token(10)]]);
var keywordList = Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([["macro", new Token(1)]]);

function _WhiteSpace_NonWhiteSpace_(_arg1) {
    var $var1 = void 0;

    if (_arg1.tag === 0) {
        var activePatternResult612 = Object(__WEBPACK_IMPORTED_MODULE_3__LexerShared_fs__["d" /* $7C$RegexMatch$7C$_$7C$ */])("^\\s*$", _arg1.data);

        if (activePatternResult612 != null) {
            $var1 = [0];
        } else {
            $var1 = [1];
        }
    } else {
        $var1 = [1];
    }

    switch ($var1[0]) {
        case 0:
            return new __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Choice__["c" /* default */](0, null);

        case 1:
            return new __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_Choice__["c" /* default */](1, null);
    }
}



var _EscapedCharParse___ = Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["a" /* default */])(function () {
    var tType = function tType(arg0) {
        return new Token(0, arg0);
    };

    return function (str) {
        return Object(__WEBPACK_IMPORTED_MODULE_3__LexerShared_fs__["b" /* $7C$EscapedChar$7C$_$7C$ */])(tType, charList, str);
    };
}());



var _CharacterParse___ = Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["a" /* default */])(function (str) {
    return Object(__WEBPACK_IMPORTED_MODULE_3__LexerShared_fs__["a" /* $7C$Character$7C$_$7C$ */])(charList, str);
});



var _KeywordParse___ = Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["a" /* default */])(function (str) {
    return Object(__WEBPACK_IMPORTED_MODULE_3__LexerShared_fs__["a" /* $7C$Character$7C$_$7C$ */])(keywordList, str);
});


function tokToString(tList) {
    var tokString = function tokString(st, _arg1) {
        if (_arg1.tag === 0) {
            return st + _arg1.data;
        } else {
            var matchValue = Object(__WEBPACK_IMPORTED_MODULE_6__Shared_fs__["c" /* listTryFind */])(_arg1)(Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["a" /* append */])(charList, keywordList));

            if (matchValue != null) {
                return st + Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(matchValue);
            } else {
                return st;
            }
        }
    };

    return Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_Seq__["f" /* fold */])(tokString, "", tList);
}
function nextToken(str) {
    var literalMatch = Object(__WEBPACK_IMPORTED_MODULE_3__LexerShared_fs__["e" /* literalString */])(charList);
    var $var2 = void 0;

    var activePatternResult623 = _EscapedCharParse___(str);

    if (activePatternResult623 != null) {
        $var2 = [0, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult623)];
    } else {
        var activePatternResult624 = _CharacterParse___(str);

        if (activePatternResult624 != null) {
            $var2 = [0, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult624)];
        } else {
            var activePatternResult625 = _KeywordParse___(str);

            if (activePatternResult625 != null) {
                $var2 = [0, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult625)];
            } else {
                $var2 = [1];
            }
        }
    }

    switch ($var2[0]) {
        case 0:
            return $var2[1];

        case 1:
            var activePatternResult622 = Object(__WEBPACK_IMPORTED_MODULE_3__LexerShared_fs__["d" /* $7C$RegexMatch$7C$_$7C$ */])("^\\s+", str);

            if (activePatternResult622 != null) {
                return [new Token(0, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult622)[0]), Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult622)[2]];
            } else {
                var activePatternResult620 = Object(__WEBPACK_IMPORTED_MODULE_3__LexerShared_fs__["d" /* $7C$RegexMatch$7C$_$7C$ */])(literalMatch, str);

                if (activePatternResult620 != null) {
                    return [new Token(0, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult620)[0]), Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult620)[2]];
                } else {
                    return [new Token(0, Object(__WEBPACK_IMPORTED_MODULE_3__LexerShared_fs__["f" /* toString */])(str[0])), str.slice(1, str.length)];
                }
            }

    }
}
function tokenize(str) {
    var pTokenize_ = function pTokenize_(tList, str_1) {
        pTokenize_: while (true) {
            if (str_1 === "") {
                return new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](new Token(9), tList);
            } else {
                var patternInput = nextToken(str_1);
                tList = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](patternInput[0], tList);
                str_1 = patternInput[1];
                continue pTokenize_;
            }
        }
    };

    return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["h" /* reverse */])(pTokenize_(new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](), str));
}
var tokenizeList = Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["a" /* default */])(function (list) {
    return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["b" /* collect */])(function (str) {
        return tokenize(str);
    }, list);
});

var _KeyWord___ = Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["a" /* default */])(function () {
    var listCheckExists = function listCheckExists(t, list) {
        return Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_Seq__["e" /* exists */])(function (y) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["j" /* equals */])(t, y);
        }, Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["e" /* map */])(function (tupledArg) {
            return tupledArg[1];
        }, list));
    };

    return function (_arg1) {
        var $var3 = void 0;

        if (_arg1.tail != null) {
            var activePatternResult634 = _WhiteSpace_NonWhiteSpace_(_arg1.head);

            if (activePatternResult634.tag === 0) {
                if (_arg1.tail.tail != null) {
                    $var3 = [0, _arg1.tail.head, _arg1.tail.tail];
                } else {
                    $var3 = [0, _arg1.head, _arg1.tail];
                }
            } else {
                $var3 = [0, _arg1.head, _arg1.tail];
            }
        } else {
            $var3 = [1];
        }

        switch ($var3[0]) {
            case 0:
                var matchValue = listCheckExists($var3[1], keywordList);

                if (matchValue) {
                    return [$var3[1], $var3[2]];
                } else {
                    return null;
                }

            case 1:
                return null;
        }
    };
}());



var _ArgList___ = Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["a" /* default */])(function () {
    var _NameList___ = function _NameList___(_arg1) {
        var $var4 = void 0;

        if (_arg1.tail != null) {
            if (_arg1.head.tag === 0) {
                var activePatternResult636 = _NameList___(_arg1.tail);

                if (activePatternResult636 != null) {
                    $var4 = [0, _arg1.head.data, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult636)[0], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult636)[1]];
                } else {
                    $var4 = [1];
                }
            } else {
                $var4 = [1];
            }
        } else {
            $var4 = [1];
        }

        switch ($var4[0]) {
            case 0:
                return [new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */]($var4[1], $var4[2]), $var4[3]];

            case 1:
                var $var5 = _arg1.tail != null ? _arg1.head.tag === 0 ? [0, _arg1.head.data, _arg1.tail] : [1] : [1];

                switch ($var5[0]) {
                    case 0:
                        return [Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([$var5[1]]), $var5[2]];

                    case 1:
                        return null;
                }

        }
    };

    var _ParamList___ = function _ParamList___(_arg2) {
        var $var6 = void 0;

        if (_arg2.tail != null) {
            var activePatternResult641 = _WhiteSpace_NonWhiteSpace_(_arg2.head);

            if (activePatternResult641.tag === 0) {
                $var6 = [0, _arg2.tail];
            } else {
                $var6 = [0, _arg2];
            }
        } else {
            $var6 = [0, _arg2];
        }

        switch ($var6[0]) {
            case 0:
                var $var7 = void 0;

                var activePatternResult639 = _NameList___($var6[1]);

                if (activePatternResult639 != null) {
                    if (Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult639)[1].tail != null) {
                        if (Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult639)[1].head.tag === 8) {
                            var activePatternResult640 = _ParamList___(Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult639)[1].tail);

                            if (activePatternResult640 != null) {
                                $var7 = [0, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult640)[0], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult639)[0], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult640)[1]];
                            } else {
                                $var7 = [1];
                            }
                        } else {
                            $var7 = [1];
                        }
                    } else {
                        $var7 = [1];
                    }
                } else {
                    $var7 = [1];
                }

                switch ($var7[0]) {
                    case 0:
                        return [new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_Seq__["f" /* fold */])(function (x, y) {
                            return x + y;
                        }, "", $var7[2]), $var7[1]), $var7[3]];

                    case 1:
                        var activePatternResult638 = _NameList___($var6[1]);

                        if (activePatternResult638 != null) {
                            return [Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_Seq__["f" /* fold */])(function (x_1, y_1) {
                                return x_1 + y_1;
                            }, "", Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult638)[0])]), Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult638)[1]];
                        } else {
                            return [new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](), $var6[1]];
                        }

                }

        }
    };

    return function (_arg3) {
        var $var8 = void 0;

        if (_arg3.tail != null) {
            var activePatternResult644 = _WhiteSpace_NonWhiteSpace_(_arg3.head);

            if (activePatternResult644.tag === 0) {
                $var8 = [0, _arg3.tail];
            } else {
                $var8 = [0, _arg3];
            }
        } else {
            $var8 = [0, _arg3];
        }

        switch ($var8[0]) {
            case 0:
                var $var9 = void 0;

                if ($var8[1].tail != null) {
                    if ($var8[1].head.tag === 6) {
                        var activePatternResult643 = _ParamList___($var8[1].tail);

                        if (activePatternResult643 != null) {
                            if (Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult643)[1].tail != null) {
                                if (Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult643)[1].head.tag === 7) {
                                    $var9 = [0, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult643)[0], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult643)[1].tail];
                                } else {
                                    $var9 = [1];
                                }
                            } else {
                                $var9 = [1];
                            }
                        } else {
                            $var9 = [1];
                        }
                    } else {
                        $var9 = [1];
                    }
                } else {
                    $var9 = [1];
                }

                switch ($var9[0]) {
                    case 0:
                        return [$var9[1], $var9[2]];

                    case 1:
                        return null;
                }

        }
    };
}());



function _Function___(_arg1) {
    var $var10 = void 0;

    if (_arg1.tail != null) {
        var activePatternResult650 = _WhiteSpace_NonWhiteSpace_(_arg1.head);

        if (activePatternResult650.tag === 0) {
            if (_arg1.tail.tail != null) {
                if (_arg1.tail.head.tag === 0) {
                    $var10 = [0, _arg1.tail.head.data, _arg1.tail.tail];
                } else {
                    $var10 = [1];
                }
            } else {
                $var10 = [1];
            }
        } else {
            $var10 = [1];
        }
    } else {
        $var10 = [1];
    }

    switch ($var10[0]) {
        case 0:
            var $var11 = void 0;

            var activePatternResult648 = _ArgList___($var10[2]);

            if (activePatternResult648 != null) {
                if (Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult648)[1].tail != null) {
                    var activePatternResult649 = _WhiteSpace_NonWhiteSpace_(Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult648)[1].head);

                    if (activePatternResult649.tag === 0) {
                        $var11 = [0, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult648)[0], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult648)[1].tail];
                    } else {
                        $var11 = [0, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult648)[0], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult648)[1]];
                    }
                } else {
                    $var11 = [0, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult648)[0], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult648)[1]];
                }
            } else {
                $var11 = [1];
            }

            switch ($var11[0]) {
                case 0:
                    return [$var10[1], $var11[1], $var11[2]];

                case 1:
                    var $var12 = void 0;

                    if ($var10[2].tail != null) {
                        var activePatternResult647 = _WhiteSpace_NonWhiteSpace_($var10[2].head);

                        if (activePatternResult647.tag === 0) {
                            $var12 = [0, $var10[2].tail];
                        } else {
                            $var12 = [0, $var10[2]];
                        }
                    } else {
                        $var12 = [0, $var10[2]];
                    }

                    switch ($var12[0]) {
                        case 0:
                            return [$var10[1], new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](), $var12[1]];
                    }

            }

        case 1:
            return null;
    }
}



function _MacroDef___(_arg1) {
    var $var13 = void 0;

    if (_arg1.tail != null) {
        if (_arg1.head.tag === 2) {
            var activePatternResult652 = _KeyWord___(_arg1.tail);

            if (activePatternResult652 != null) {
                if (Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult652)[0].tag === 1) {
                    var activePatternResult653 = _Function___(Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult652)[1]);

                    if (activePatternResult653 != null) {
                        $var13 = [0, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult653)];
                    } else {
                        $var13 = [1];
                    }
                } else {
                    $var13 = [1];
                }
            } else {
                $var13 = [1];
            }
        } else {
            $var13 = [1];
        }
    } else {
        $var13 = [1];
    }

    switch ($var13[0]) {
        case 0:
            return $var13[1];

        case 1:
            return null;
    }
}



function _EvalDef___(_arg1) {
    var $var14 = void 0;

    if (_arg1.tail != null) {
        if (_arg1.head.tag === 4) {
            if (_arg1.tail.tail != null) {
                var activePatternResult659 = _WhiteSpace_NonWhiteSpace_(_arg1.tail.head);

                if (activePatternResult659.tag === 0) {
                    $var14 = [0, _arg1.tail.tail];
                } else {
                    $var14 = [0, _arg1.tail];
                }
            } else {
                $var14 = [0, _arg1.tail];
            }
        } else {
            $var14 = [1];
        }
    } else {
        $var14 = [1];
    }

    switch ($var14[0]) {
        case 0:
            var $var15 = void 0;

            if ($var14[1].tail != null) {
                if ($var14[1].head.tag === 0) {
                    var activePatternResult657 = _ArgList___($var14[1].tail);

                    if (activePatternResult657 != null) {
                        if (Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult657)[1].tail != null) {
                            var activePatternResult658 = _WhiteSpace_NonWhiteSpace_(Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult657)[1].head);

                            if (activePatternResult658.tag === 0) {
                                if (Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult657)[1].tail.tail != null) {
                                    if (Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult657)[1].tail.head.tag === 5) {
                                        $var15 = [0, $var14[1].head.data, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult657)[0], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult657)[1].tail.tail];
                                    } else if (Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult657)[1].head.tag === 5) {
                                        $var15 = [0, $var14[1].head.data, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult657)[0], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult657)[1].tail];
                                    } else {
                                        $var15 = [1];
                                    }
                                } else if (Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult657)[1].head.tag === 5) {
                                    $var15 = [0, $var14[1].head.data, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult657)[0], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult657)[1].tail];
                                } else {
                                    $var15 = [1];
                                }
                            } else if (Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult657)[1].head.tag === 5) {
                                $var15 = [0, $var14[1].head.data, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult657)[0], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult657)[1].tail];
                            } else {
                                $var15 = [1];
                            }
                        } else {
                            $var15 = [1];
                        }
                    } else {
                        $var15 = [1];
                    }
                } else {
                    $var15 = [1];
                }
            } else {
                $var15 = [1];
            }

            switch ($var15[0]) {
                case 0:
                    return [$var15[1], $var15[2], $var15[3]];

                case 1:
                    var $var16 = void 0;

                    if ($var14[1].tail != null) {
                        if ($var14[1].head.tag === 0) {
                            if ($var14[1].tail.tail != null) {
                                var activePatternResult656 = _WhiteSpace_NonWhiteSpace_($var14[1].tail.head);

                                if (activePatternResult656.tag === 0) {
                                    if ($var14[1].tail.tail.tail != null) {
                                        if ($var14[1].tail.tail.head.tag === 5) {
                                            $var16 = [0, $var14[1].head.data, $var14[1].tail.tail.tail];
                                        } else if ($var14[1].tail.head.tag === 5) {
                                            $var16 = [0, $var14[1].head.data, $var14[1].tail.tail];
                                        } else {
                                            $var16 = [1];
                                        }
                                    } else if ($var14[1].tail.head.tag === 5) {
                                        $var16 = [0, $var14[1].head.data, $var14[1].tail.tail];
                                    } else {
                                        $var16 = [1];
                                    }
                                } else if ($var14[1].tail.head.tag === 5) {
                                    $var16 = [0, $var14[1].head.data, $var14[1].tail.tail];
                                } else {
                                    $var16 = [1];
                                }
                            } else {
                                $var16 = [1];
                            }
                        } else {
                            $var16 = [1];
                        }
                    } else {
                        $var16 = [1];
                    }

                    switch ($var16[0]) {
                        case 0:
                            return [$var16[1], new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](), $var16[2]];

                        case 1:
                            return null;
                    }

            }

        case 1:
            return null;
    }
}



function _SChar___(tok) {
    return function (map) {
        return Object(__WEBPACK_IMPORTED_MODULE_6__Shared_fs__["f" /* mapTryFind */])(tok, map);
    }(Object(__WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_1_fable_core_Map__["b" /* create */])(Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["e" /* map */])(function (tupledArg) {
        return Object(__WEBPACK_IMPORTED_MODULE_6__Shared_fs__["b" /* invTuple */])(tupledArg[0], tupledArg[1]);
    }, Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["a" /* append */])(charList, keywordList)), new __WEBPACK_IMPORTED_MODULE_10__nuget_packages_fable_core_1_3_1_fable_core_Comparer__["a" /* default */](function (x, y) {
        return x.CompareTo(y);
    })));
}


function parse(tList) {
    var getRaw = function getRaw(list) {
        var getRaw_ = function getRaw_(list_1, curr) {
            if (list_1.tail != null) {
                if (list_1.head.tag === 5) {
                    return new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](new Token(5), curr);
                } else {
                    return Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["b" /* partialApply */])(getRaw_, [list_1.tail])(new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](list_1.head, curr));
                }
            } else {
                return curr;
            }
        };

        return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["h" /* reverse */])(getRaw_(list, new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */]()));
    };

    var parse_ = function parse_(endToken, tList_1, pList) {
        var pRec = function pRec(f, c, tl) {
            return Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["b" /* partialApply */])(parse_, [endToken, tl])(new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](f(c), pList));
        };

        var recText = Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["b" /* partialApply */])(pRec, [function (arg0) {
            return new Parser(2, arg0);
        }]);
        var matchValue = [tList_1, endToken];

        var activePatternResult678 = _MacroDef___(matchValue[0]);

        if (activePatternResult678 != null) {
            var patternInput = parse_(new Token(3), Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult678)[2], new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */]());
            return pRec(function (arg0_1) {
                return new Parser(0, arg0_1);
            }, new Macro(Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult678)[0], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult678)[1], Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["h" /* reverse */])(patternInput[0])), patternInput[1]);
        } else {
            var activePatternResult677 = _EvalDef___(matchValue[0]);

            if (activePatternResult677 != null) {
                return pRec(function (arg0_2) {
                    return new Parser(1, arg0_2);
                }, new Sub(Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult677)[0], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult677)[1], tokToString(getRaw(tList_1))), Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult677)[2]);
            } else {
                var $var17 = void 0;

                if (matchValue[0].tail != null) {
                    if (matchValue[0].head.tag === 9) {
                        $var17 = [0, matchValue[0].tail];
                    } else {
                        var activePatternResult676 = _WhiteSpace_NonWhiteSpace_(matchValue[0].head);

                        if (activePatternResult676.tag === 0) {
                            if (matchValue[0].tail.tail != null) {
                                if (matchValue[1] != null) {
                                    if (function () {
                                        var tl_1 = matchValue[0].tail.tail;
                                        var e = Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(matchValue[1]);
                                        var a = matchValue[0].tail.head;
                                        return e.Equals(a);
                                    }()) {
                                        $var17 = [1, matchValue[0].tail.head, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(matchValue[1]), matchValue[0].tail.tail];
                                    } else if (function () {
                                        var tl_2 = matchValue[0].tail;
                                        var e_1 = Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(matchValue[1]);
                                        var a_1 = matchValue[0].head;
                                        return e_1.Equals(a_1);
                                    }()) {
                                        $var17 = [1, matchValue[0].head, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(matchValue[1]), matchValue[0].tail];
                                    } else {
                                        $var17 = [2];
                                    }
                                } else {
                                    $var17 = [2];
                                }
                            } else if (matchValue[1] != null) {
                                if (function () {
                                    var tl_3 = matchValue[0].tail;
                                    var e_2 = Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(matchValue[1]);
                                    var a_2 = matchValue[0].head;
                                    return e_2.Equals(a_2);
                                }()) {
                                    $var17 = [1, matchValue[0].head, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(matchValue[1]), matchValue[0].tail];
                                } else {
                                    $var17 = [2];
                                }
                            } else {
                                $var17 = [2];
                            }
                        } else if (matchValue[1] != null) {
                            if (function () {
                                var tl_4 = matchValue[0].tail;
                                var e_3 = Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(matchValue[1]);
                                var a_3 = matchValue[0].head;
                                return e_3.Equals(a_3);
                            }()) {
                                $var17 = [1, matchValue[0].head, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(matchValue[1]), matchValue[0].tail];
                            } else {
                                $var17 = [2];
                            }
                        } else {
                            $var17 = [2];
                        }
                    }
                } else {
                    $var17 = [2];
                }

                switch ($var17[0]) {
                    case 0:
                        return pRec(function (x) {
                            return x;
                        }, new Parser(3), $var17[1]);

                    case 1:
                        var $var18 = void 0;

                        if ($var17[3].tail != null) {
                            var activePatternResult672 = _WhiteSpace_NonWhiteSpace_($var17[3].head);

                            if (activePatternResult672.tag === 0) {
                                if ($var17[3].tail.tail != null) {
                                    if ($var17[3].tail.head.tag === 9) {
                                        $var18 = [0, $var17[3].tail.tail];
                                    } else {
                                        $var18 = [0, $var17[3].tail];
                                    }
                                } else {
                                    $var18 = [0, $var17[3].tail];
                                }
                            } else if ($var17[3].head.tag === 9) {
                                $var18 = [0, $var17[3].tail];
                            } else {
                                $var18 = [0, $var17[3]];
                            }
                        } else {
                            $var18 = [0, $var17[3]];
                        }

                        switch ($var18[0]) {
                            case 0:
                                return [pList, $var18[1]];
                        }

                    case 2:
                        var $var19 = void 0;

                        if (matchValue[0].tail != null) {
                            if (matchValue[0].head.tag === 0) {
                                $var19 = [0, matchValue[0].head.data, matchValue[0].tail];
                            } else {
                                var activePatternResult675 = _SChar___(matchValue[0].head);

                                if (activePatternResult675 != null) {
                                    $var19 = [1, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(activePatternResult675), matchValue[0].tail];
                                } else {
                                    $var19 = [2];
                                }
                            }
                        } else {
                            $var19 = [2];
                        }

                        switch ($var19[0]) {
                            case 0:
                                return recText($var19[1], $var19[2]);

                            case 1:
                                return recText($var19[1], $var19[2]);

                            case 2:
                                return [pList, new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */]()];
                        }

                }
            }
        }
    };

    var patternInput_1 = parse_(null, tList, new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */]());
    return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["h" /* reverse */])(patternInput_1[0]);
}
function evaluate(pList) {
    var makeEmptyParam = function makeEmptyParam(args) {
        return Object(__WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_1_fable_core_Map__["b" /* create */])(function (list2) {
            return Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_Seq__["n" /* toList */])(Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_Seq__["q" /* zip */])(args, list2));
        }(Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["g" /* replicate */])(args.length, null)), new __WEBPACK_IMPORTED_MODULE_10__nuget_packages_fable_core_1_3_1_fable_core_Comparer__["a" /* default */](__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["g" /* comparePrimitives */]));
    };

    var addParam = function addParam(p, macro, args_1) {
        return function () {
            var folder = function folder(s, tupledArg) {
                return Object(__WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_1_fable_core_Map__["a" /* add */])(tupledArg[0], tupledArg[1], s);
            };

            return function (list) {
                return Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_Seq__["f" /* fold */])(folder, p, list);
            };
        }()(Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_Seq__["n" /* toList */])(Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_Seq__["q" /* zip */])(macro.Args, args_1)));
    };

    var makeMacro = function makeMacro(n, args_2, p_1) {
        return new Macro(n, args_2, p_1);
    };

    var mapAdd = function mapAdd(map, k, v) {
        return Object(__WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_1_fable_core_Map__["a" /* add */])(k, v, map);
    };

    var evalulate_ = function evalulate_(pList_1, newPList, param, scope) {
        var evalulateInv_ = function evalulateInv_(pList_2, newPList_1, scope_1, param_1) {
            return evalulate_(pList_2, newPList_1, param_1, scope_1);
        };

        var evalulate__ = function evalulate__(pList_3, list_1) {
            return evalulate_(pList_3, Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["a" /* append */])(list_1, newPList), param, scope);
        };

        if (pList_1.tail != null) {
            if (pList_1.head.tag === 0) {
                return Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["b" /* partialApply */])(evalulate_, [pList_1.tail, newPList, param])(Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["b" /* partialApply */])(mapAdd, [scope, pList_1.head.data.Name])(Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["b" /* partialApply */])(makeMacro, [pList_1.head.data.Name, pList_1.head.data.Args])(Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["b" /* partialApply */])(evalulateInv_, [pList_1.head.data.Body, new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](), scope])(makeEmptyParam(pList_1.head.data.Args)))));
            } else if (pList_1.head.tag === 1) {
                var _eval = void 0;

                var matchValue = Object(__WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_1_fable_core_Map__["d" /* tryFind */])(pList_1.head.data.Name, param);

                if (matchValue != null) {
                    if (Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(matchValue) != null) {
                        _eval = Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([new Parser(2, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(matchValue)))]);
                    } else {
                        _eval = Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([pList_1.head]);
                    }
                } else {
                    var matchValue_1 = Object(__WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_1_fable_core_Map__["d" /* tryFind */])(pList_1.head.data.Name, scope);
                    var $var20 = matchValue_1 != null ? pList_1.head.data.Args.tail == null ? [0, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(matchValue_1)] : [1] : [1];

                    switch ($var20[0]) {
                        case 0:
                            _eval = $var20[1].Body;
                            break;

                        case 1:
                            if (matchValue_1 != null) {
                                _eval = Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["h" /* reverse */])(Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["b" /* partialApply */])(evalulateInv_, [Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(matchValue_1).Body, new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](), scope])(addParam(param, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_1_fable_core_Option__["c" /* getValue */])(matchValue_1), pList_1.head.data.Args)));
                            } else {
                                _eval = Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([new Parser(2, pList_1.head.data.Raw)]);
                            }

                            break;
                    }
                }

                return evalulate__(pList_1.tail, _eval);
            } else {
                return evalulate__(pList_1.tail, Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([pList_1.head]));
            }
        } else {
            return newPList;
        }
    };

    return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["h" /* reverse */])(evalulate_(pList, new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](), Object(__WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_1_fable_core_Map__["b" /* create */])(null, new __WEBPACK_IMPORTED_MODULE_10__nuget_packages_fable_core_1_3_1_fable_core_Comparer__["a" /* default */](__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["g" /* comparePrimitives */])), Object(__WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_1_fable_core_Map__["b" /* create */])(null, new __WEBPACK_IMPORTED_MODULE_10__nuget_packages_fable_core_1_3_1_fable_core_Comparer__["a" /* default */](__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["g" /* comparePrimitives */]))));
}
function parserToString(pList) {
    return Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_Seq__["f" /* fold */])(function (st, _arg1) {
        return _arg1.tag === 2 ? st + _arg1.data : _arg1.tag === 3 ? st + "\n" : st;
    }, "", pList);
}
function toStringList(pList) {
    var f = function f(st, n) {
        var matchValue = [st, n];

        if (matchValue[1].tag === 3) {
            return new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */]("", st);
        } else if (matchValue[1].tag === 2) {
            if (matchValue[0].tail != null) {
                return new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](matchValue[0].head + matchValue[1].data, matchValue[0].tail);
            } else {
                return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([matchValue[1].data]);
            }
        } else {
            return st;
        }
    };

    return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["h" /* reverse */])(Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_1_fable_core_Seq__["f" /* fold */])(f, new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](), pList));
}
var pETS = Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["a" /* default */])(function () {
    var stripLastEndline = function stripLastEndline(l) {
        var matchValue = Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["h" /* reverse */])(l);
        var $var21 = matchValue.tail != null ? matchValue.head.tag === 3 ? matchValue.tail.tail == null ? [0, matchValue] : [1, matchValue.tail] : [2] : [2];

        switch ($var21[0]) {
            case 0:
                return $var21[1];

            case 1:
                return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["h" /* reverse */])($var21[1]);

            case 2:
                return l;
        }
    };

    return function ($var23) {
        return stripLastEndline(function ($var22) {
            return evaluate(parse($var22));
        }($var23));
    };
}());
var preprocess = Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["a" /* default */])(function ($var25) {
    return function (pList) {
        return parserToString(pList);
    }(function ($var24) {
        return pETS(function (str) {
            return tokenize(str);
        }($var24));
    }($var25));
});
var preprocessList = Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["a" /* default */])(function ($var27) {
    return function (pList) {
        return toStringList(pList);
    }(function ($var26) {
        return pETS(function (list) {
            return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["b" /* collect */])(function (str) {
                return tokenize(str);
            }, list);
        }($var26));
    }($var27));
});

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export dLogger */
/* unused harmony export strFStr */
/* unused harmony export strInlineElements */
/* unused harmony export strParagraph */
/* unused harmony export strTable */
/* unused harmony export strList */
/* unused harmony export strHeader */
/* unused harmony export strInlineFootnote */
/* unused harmony export $7C$MatchHeaderAndSubHeader$7C$_$7C$ */
/* unused harmony export strToC */
/* unused harmony export gatherFootnotes */
/* harmony export (immutable) */ __webpack_exports__["a"] = strBody;
/* unused harmony export genHead */
/* unused harmony export genBody */
/* unused harmony export genHTML */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Logger_Logger_fs__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__HTMLGenHelpers_fs__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_Seq__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_String__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Types_fs__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Shared_fs__ = __webpack_require__(9);









var dLogger = new __WEBPACK_IMPORTED_MODULE_0__Logger_Logger_fs__["a" /* Logger */](2);
function strFStr(fStr) {
    if (fStr.tag === 3) {
        return Object(__WEBPACK_IMPORTED_MODULE_1__HTMLGenHelpers_fs__["c" /* attachSimpleTag */])("code")(fStr.data);
    } else if (fStr.tag === 0) {
        return Object(__WEBPACK_IMPORTED_MODULE_1__HTMLGenHelpers_fs__["c" /* attachSimpleTag */])("strong")(strInlineElements(fStr.data));
    } else if (fStr.tag === 1) {
        return Object(__WEBPACK_IMPORTED_MODULE_1__HTMLGenHelpers_fs__["c" /* attachSimpleTag */])("em")(strInlineElements(fStr.data));
    } else {
        return fStr.data;
    }
}
function strInlineElements(eles) {
    var convertHtml = function convertHtml(pStr, ele) {
        return pStr + (ele.tag === 1 ? Object(__WEBPACK_IMPORTED_MODULE_1__HTMLGenHelpers_fs__["a" /* attachHTMLTag */])("a", Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([["href", ele.data[1]]]), true, strFStr(ele.data[0])) : ele.tag === 2 ? function () {
            var attrs = Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([["src", ele.data[1]], ["alt", ele.data[0]]]);
            return Object(__WEBPACK_IMPORTED_MODULE_1__HTMLGenHelpers_fs__["a" /* attachHTMLTag */])("img", attrs, false, "");
        }() : strFStr(ele.data));
    };

    return Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_Seq__["f" /* fold */])(convertHtml, "", eles);
}
function strParagraph(lines) {
    var folder = function folder(pLinesStr, line) {
        return pLinesStr + strInlineElements(line) + "\r\n";
    };

    return Object(__WEBPACK_IMPORTED_MODULE_1__HTMLGenHelpers_fs__["c" /* attachSimpleTag */])("p")(function (x) {
        return Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_String__["h" /* trim */])(x, "both");
    }(Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_Seq__["f" /* fold */])(folder, "", lines)));
}
function strTable(rows) {
    var containHeader = function containHeader(row) {
        return row.data[1];
    };

    var takeoutCells = void 0;

    var mapping = function mapping(pRow) {
        return pRow.data[0];
    };

    takeoutCells = function takeoutCells(list) {
        return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["e" /* map */])(mapping, list);
    };

    var headerRows = takeoutCells(Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["d" /* filter */])(containHeader, rows));
    var bodyRows = takeoutCells(Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["d" /* filter */])(function ($var1) {
        return function (value) {
            return !value;
        }(containHeader($var1));
    }, rows));

    var foldCells = function foldCells(row_1) {
        var cellsFolder = function cellsFolder(pStr, cell) {
            var tagName = cell.data[1] ? "th" : "td";
            var cellContent = strInlineElements(cell.data[0]);
            var alignAttr = cell.data[2].tag === 1 ? ["align", "right"] : cell.data[2].tag === 2 ? ["align", "left"] : cell.data[2].tag === 3 ? ["", ""] : ["align", "center"];
            return pStr + Object(__WEBPACK_IMPORTED_MODULE_1__HTMLGenHelpers_fs__["a" /* attachHTMLTag */])(tagName, Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([alignAttr]), true, cellContent);
        };

        return Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_Seq__["f" /* fold */])(cellsFolder, "", row_1);
    };

    var foldRows = function foldRows(rows_1) {
        var rowsFolder = function rowsFolder(pStr_1, row_2) {
            return function (s) {
                return pStr_1 + s;
            }(Object(__WEBPACK_IMPORTED_MODULE_1__HTMLGenHelpers_fs__["c" /* attachSimpleTag */])("tr")(foldCells(row_2)));
        };

        return Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_Seq__["f" /* fold */])(rowsFolder, "", rows_1);
    };

    return Object(__WEBPACK_IMPORTED_MODULE_1__HTMLGenHelpers_fs__["c" /* attachSimpleTag */])("table")(function (s_1) {
        return s_1 + Object(__WEBPACK_IMPORTED_MODULE_1__HTMLGenHelpers_fs__["c" /* attachSimpleTag */])("tbody")(foldRows(bodyRows));
    }(Object(__WEBPACK_IMPORTED_MODULE_1__HTMLGenHelpers_fs__["c" /* attachSimpleTag */])("thead")(foldRows(headerRows))));
}
function strList(list) {
    var strListItem = function strListItem(pStr, li) {
        return pStr + (li.tag === 0 ? strList(li.data) : Object(__WEBPACK_IMPORTED_MODULE_1__HTMLGenHelpers_fs__["c" /* attachSimpleTag */])("li")(strInlineElements(li.data)));
    };

    var listTag = list.ListType.Equals(new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["n" /* TListType */](0)) ? "ul" : "ol";
    return Object(__WEBPACK_IMPORTED_MODULE_1__HTMLGenHelpers_fs__["c" /* attachSimpleTag */])(listTag)(Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_Seq__["f" /* fold */])(strListItem, "", list.ListItem));
}
function strHeader(header) {
    var tagName = "h" + header.Level.toString();
    return Object(__WEBPACK_IMPORTED_MODULE_1__HTMLGenHelpers_fs__["c" /* attachSimpleTag */])(tagName)(strInlineElements(header.HeaderName));
}
function strInlineFootnote(fnId) {
    var idStr = fnId.tag === 1 ? fnId.data : fnId.data.toString();
    return Object(__WEBPACK_IMPORTED_MODULE_1__HTMLGenHelpers_fs__["c" /* attachSimpleTag */])("sup")(Object(__WEBPACK_IMPORTED_MODULE_1__HTMLGenHelpers_fs__["a" /* attachHTMLTag */])("a", Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([["href", "#footnote-" + idStr]]), true, idStr));
}

function _MatchHeaderAndSubHeader___(hds) {
    var $var2 = hds.tail != null ? hds.tail.tail != null ? [0, hds.head, hds.tail.head] : [1] : [1];

    switch ($var2[0]) {
        case 0:
            if ($var2[2].Level > $var2[1].Level) {
                return [hds.head, hds.tail];
            } else {
                return null;
            }

        case 1:
            return null;
    }
}


function strToC(toc) {
    var displaySingleHeader = function displaySingleHeader(headerName) {
        return strInlineElements(headerName);
    };

    var appendListItem = function appendListItem(s, i) {
        var ListItem = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](i, s.ListItem);
        return new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["l" /* TList */](s.ListType, ListItem, s.Depth);
    };

    var fstAppendListItem = function fstAppendListItem(s_1, i_1) {
        return appendListItem(s_1[0], i_1);
    };

    var appendToNested = function appendToNested(s_2, appendee) {
        var $var3 = s_2.ListItem.tail != null ? s_2.ListItem.head.tag === 0 ? [0, s_2.ListItem.head.data, s_2.ListItem.tail] : [1] : [1];

        switch ($var3[0]) {
            case 0:
                dLogger.Debug(null)(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_String__["g" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_String__["b" /* printf */])("Append to nested: %A"))(appendee));
                var ListItem_2 = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["m" /* TListItem */](0, function () {
                    var ListItem_1 = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */](appendee, $var3[1].ListItem);
                    return new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["l" /* TList */]($var3[1].ListType, ListItem_1, $var3[1].Depth);
                }()), $var3[2]);
                return new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["l" /* TList */](s_2.ListType, ListItem_2, s_2.Depth);

            case 1:
                dLogger.Debug(null)(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_String__["g" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_String__["b" /* printf */])("Create nested with: %A"))(appendee));
                return Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["b" /* partialApply */])(appendListItem, [s_2])(appendee);
        }
    };

    var appendToNestedD = function appendToNestedD(n, s_3, appendee_1) {
        var getNest = function getNest(_arg1) {
            if (_arg1.tag === 0) {
                return _arg1.data;
            } else {
                throw new Error("Invalid depth.");
            }
        };

        var appendToNestedD_ = function appendToNestedD_(n_1, s_4) {
            var recurse = function recurse(_arg2) {
                if (_arg2.tail == null) {
                    return Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_String__["f" /* toFail */])(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_String__["b" /* printf */])("List shouldn't be empty: %A"))(s_4);
                } else {
                    return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["a" /* append */])(appendToNestedD_(n_1 - 1, getNest(_arg2.head)).ListItem, _arg2.tail);
                }
            };

            var matchValue = [n_1, s_4];

            if (matchValue[0] > 0) {
                var ListItem_3 = recurse(matchValue[1].ListItem);
                return new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["l" /* TList */](matchValue[1].ListType, ListItem_3, matchValue[1].Depth);
            } else if (matchValue[0] === 0) {
                return Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["b" /* partialApply */])(appendToNested, [matchValue[1]])(appendee_1);
            } else if (matchValue[0] < 0) {
                throw new Error("Negative depth, shouldn't happen.");
            } else {
                return Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_String__["f" /* toFail */])(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_String__["b" /* printf */])("n is: %i, s is: %A"))(n_1, s_4);
            }
        };

        return appendToNestedD_(n, s_3);
    };

    var fold = function fold(s_5, _arg3) {
        if (_arg3.Level === 1) {
            return [Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["b" /* partialApply */])(fstAppendListItem, [s_5])(new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["m" /* TListItem */](1, _arg3.HeaderName)), _arg3.Level];
        } else if (_arg3.Level > s_5[1]) {
            return [Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["b" /* partialApply */])(appendToNestedD, [0, s_5[0]])(new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["m" /* TListItem */](0, new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["l" /* TList */](new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["n" /* TListType */](1), Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["m" /* TListItem */](1, _arg3.HeaderName)]), s_5[1]))), _arg3.Level];
        } else if (_arg3.Level === s_5[1]) {
            dLogger.Debug(null)(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_String__["g" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_String__["b" /* printf */])("Append: %A %i"))(_arg3.HeaderName, _arg3.Level));
            return [Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["b" /* partialApply */])(appendToNested, [s_5[0]])(new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["m" /* TListItem */](1, _arg3.HeaderName)), _arg3.Level];
        } else if (_arg3.Level < s_5[1]) {
            return [Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["b" /* partialApply */])(appendToNestedD, [_arg3.Level - 2, s_5[0]])(new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["m" /* TListItem */](1, _arg3.HeaderName)), _arg3.Level];
        } else {
            return s_5;
        }
    };

    var revList = function revList(l) {
        var revListItemList = function revListItemList(li) {
            var revRecurse = function revRecurse(_arg4) {
                if (_arg4.tag === 0) {
                    return new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["m" /* TListItem */](0, function () {
                        var ListItem_4 = revListItemList(_arg4.data.ListItem);
                        return new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["l" /* TList */](_arg4.data.ListType, ListItem_4, _arg4.data.Depth);
                    }());
                } else {
                    return _arg4;
                }
            };

            return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["h" /* reverse */])(Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["e" /* map */])(revRecurse, li));
        };

        var ListItem_5 = Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["h" /* reverse */])(revListItemList(l.ListItem));
        return new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["l" /* TList */](l.ListType, ListItem_5, l.Depth);
    };

    return strList(revList(function (l_1) {
        var ListItem_6 = Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["h" /* reverse */])(l_1.ListItem);
        return new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["l" /* TList */](l_1.ListType, ListItem_6, l_1.Depth);
    }(Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_Seq__["f" /* fold */])(fold, [function () {
        var ListItem_7 = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */]();
        return new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["l" /* TList */](new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["n" /* TListType */](1), ListItem_7, 1);
    }(), 1], toc.HeaderLst)[0])));
}
function gatherFootnotes(pObjs) {
    var footnotesFilter = function footnotesFilter(pObj) {
        if (pObj.tag === 8) {
            return true;
        } else {
            return false;
        }
    };

    return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["d" /* filter */])(footnotesFilter, pObjs);
}
function strBody(pObjs) {
    var folder = function folder(pStr, pObj) {
        return pStr + function () {
            switch (pObj.tag) {
                case 4:
                    return strParagraph(pObj.data);

                case 5:
                    return Object(__WEBPACK_IMPORTED_MODULE_1__HTMLGenHelpers_fs__["c" /* attachSimpleTag */])("q")(strInlineElements(pObj.data));

                case 0:
                    return Object(__WEBPACK_IMPORTED_MODULE_1__HTMLGenHelpers_fs__["a" /* attachHTMLTag */])("code", Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([["language", Object(__WEBPACK_IMPORTED_MODULE_7__Shared_fs__["d" /* mapLang */])(pObj.data[1])]]), true, pObj.data[0]);

                case 6:
                    return strTable(pObj.data);

                case 3:
                    return strList(pObj.data);

                case 1:
                    return strHeader(pObj.data);

                case 8:
                    return strInlineFootnote(pObj.data[0]);

                case 2:
                    return strToC(pObj.data);

                default:
                    return Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_String__["g" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_String__["b" /* printf */])("%A is not implemented"))(pObj);
            }
        }();
    };

    return Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_Seq__["f" /* fold */])(folder, "", pObjs);
}
function genHead(htmlTitle) {
    var metaData = Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([["name", "viewport"], ["content", "width=device-width"]])]);

    var genMetadata = function genMetadata(pStr, md) {
        return pStr + Object(__WEBPACK_IMPORTED_MODULE_1__HTMLGenHelpers_fs__["b" /* attachMetaTag */])("meta", md);
    };

    return Object(__WEBPACK_IMPORTED_MODULE_1__HTMLGenHelpers_fs__["c" /* attachSimpleTag */])("head")(Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_Seq__["f" /* fold */])(genMetadata, "", metaData) + Object(__WEBPACK_IMPORTED_MODULE_1__HTMLGenHelpers_fs__["c" /* attachSimpleTag */])("title")(htmlTitle));
}
function genBody(pObjs) {
    return Object(__WEBPACK_IMPORTED_MODULE_1__HTMLGenHelpers_fs__["c" /* attachSimpleTag */])("body")(strBody(pObjs));
}
function genHTML(htmlTitle, pObjs) {
    return Object(__WEBPACK_IMPORTED_MODULE_1__HTMLGenHelpers_fs__["b" /* attachMetaTag */])("!DOCTYPE", Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["f" /* ofArray */])([["html", ""]])) + genHead(htmlTitle) + genBody(pObjs);
}

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export TagStyle */
/* unused harmony export toAttr */
/* unused harmony export toAttrs */
/* harmony export (immutable) */ __webpack_exports__["a"] = attachHTMLTag;
/* harmony export (immutable) */ __webpack_exports__["c"] = attachSimpleTag;
/* harmony export (immutable) */ __webpack_exports__["b"] = attachMetaTag;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_Seq__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__ = __webpack_require__(4);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }








var TagStyle = function () {
    function TagStyle(tag, data) {
        _classCallCheck(this, TagStyle);

        this.tag = tag;
        this.data = data;
    }

    _createClass(TagStyle, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "HTMLGenHelpers.TagStyle",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: [["INLINE"], ["NonInline", "string"]]
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return this === other || this.tag === other.tag && Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["j" /* equals */])(this.data, other.data);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_Util__["i" /* compareUnions */])(this, other) | 0;
        }
    }]);

    return TagStyle;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_1_fable_core_Symbol__["b" /* setType */])("HTMLGenHelpers.TagStyle", TagStyle);
function toAttr(attributeName, value) {
    return attributeName + "=\"" + value + "\"";
}
function toAttrs(attrs) {
    var mapper = function mapper(attr) {
        return toAttr(attr[0], attr[1]);
    };

    return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["e" /* map */])(mapper, attrs);
}
function attachHTMLTag(tagName, attributes, needCloseTag, content) {
    var attrStr = void 0;
    var matchValue = attributes.tail == null;

    if (matchValue) {
        attrStr = "";
    } else {
        var attrFolder = function attrFolder(pStr, attrNameValue) {
            return pStr + function () {
                var $var1 = attrNameValue[0] === "" ? attrNameValue[1] === "" ? [0] : [1, attrNameValue[0], attrNameValue[1]] : [1, attrNameValue[0], attrNameValue[1]];

                switch ($var1[0]) {
                    case 0:
                        return "";

                    case 1:
                        return " " + ($var1[2] === "" ? $var1[1] : $var1[1] + "=\"" + $var1[2] + "\"");
                }
            }();
        };

        attrStr = Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_Seq__["f" /* fold */])(attrFolder, "", attributes);
    }

    return "<" + tagName + attrStr + ">" + content + (needCloseTag ? "</" + tagName + ">" : "");
}
function attachSimpleTag(tagName) {
    return Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["a" /* default */])(function () {
        var attributes = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_List__["c" /* default */]();
        return function (content) {
            return attachHTMLTag(tagName, attributes, true, content);
        };
    }());
}
function attachMetaTag(tagName, attrs) {
    return attachHTMLTag(tagName, attrs, false, "");
}

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export logger */
/* unused harmony export surround */
/* unused harmony export mdFStr */
/* unused harmony export mdInlineElements$27$ */
/* unused harmony export mdInlineElements */
/* unused harmony export mdParagraph */
/* unused harmony export mdTable */
/* unused harmony export mdList */
/* unused harmony export mdHeader */
/* harmony export (immutable) */ __webpack_exports__["a"] = mdBody;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Logger_Logger_fs__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_String__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_Seq__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_List__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Types_fs__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Shared_fs__ = __webpack_require__(9);








var logger = new __WEBPACK_IMPORTED_MODULE_0__Logger_Logger_fs__["a" /* Logger */](1);
function surround(pat, str) {
    var pat2 = pat === "(" ? ")" : pat === "[" ? "]" : pat === "{" ? "}" : pat;
    return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_String__["g" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_String__["b" /* printf */])("%s%s%s"))(pat, str, pat2);
}
function mdFStr(fStr) {
    if (fStr.tag === 3) {
        return surround("`", fStr.data);
    } else if (fStr.tag === 0) {
        return surround("**", mdInlineElements(fStr.data));
    } else if (fStr.tag === 1) {
        return surround("*", mdInlineElements(fStr.data));
    } else {
        return fStr.data;
    }
}

function mdInlineElements_(b, eles) {
    var braSurround = function braSurround(str) {
        return surround("(", str);
    };

    var sbraSurround = function sbraSurround(str_1) {
        return surround("[", str_1);
    };

    var convertMd = function convertMd(pStr, ele) {
        return pStr + (ele.tag === 1 ? sbraSurround(mdFStr(ele.data[0])) + braSurround(ele.data[1]) : ele.tag === 2 ? Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_String__["g" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_String__["b" /* printf */])("!%s"))(sbraSurround(ele.data[0])) + braSurround(ele.data[1]) : mdFStr(ele.data));
    };

    return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_Seq__["f" /* fold */])(convertMd, Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_String__["g" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_String__["b" /* printf */])("%s"))(b), eles);
}


var mdInlineElements = Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["a" /* default */])(function (eles) {
    return mdInlineElements_("", eles);
});
function mdParagraph(lines) {
    var folder = function folder(pLinesStr, line) {
        return pLinesStr + mdInlineElements(line);
    };

    return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_Seq__["f" /* fold */])(folder, "", lines) + "\n\n";
}
function mdTable(rows) {
    var containHeader = function containHeader(row) {
        return row.data[1];
    };

    var takeoutCells = void 0;

    var mapping = function mapping(pRow) {
        return pRow.data[0];
    };

    takeoutCells = function takeoutCells(list) {
        return Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_List__["e" /* map */])(mapping, list);
    };

    var headerRows = takeoutCells(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_List__["d" /* filter */])(containHeader, rows));
    var bodyRows = takeoutCells(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_1_fable_core_List__["d" /* filter */])(function ($var1) {
        return function (value) {
            return !value;
        }(containHeader($var1));
    }, rows));

    var foldCells = function foldCells(alignRow, row_1) {
        var cellsFolder = function cellsFolder(alignRow_1, pStr, cell) {
            return function (cellContent) {
                return pStr + cellContent + "|";
            }(alignRow_1 ? cell.data[2].tag === 1 ? "---:" : cell.data[2].tag === 2 ? ":---" : cell.data[2].tag === 3 ? "---" : ":---:" : mdInlineElements(cell.data[0]));
        };

        return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_Seq__["f" /* fold */])(Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["b" /* partialApply */])(cellsFolder, [alignRow]), "|", row_1);
    };

    var foldRows = function foldRows(alignRow_2, rows_1) {
        var rowsFolder = function rowsFolder(alignRow_3, pStr_1, row_2) {
            return pStr_1 + foldCells(alignRow_3, row_2) + "\n";
        };

        return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_Seq__["f" /* fold */])(Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["b" /* partialApply */])(rowsFolder, [alignRow_2]), "", rows_1);
    };

    var foldNormalRows = Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["b" /* partialApply */])(foldRows, [false]);
    var foldAlignRow = Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["b" /* partialApply */])(foldCells, [true]);
    return foldNormalRows(headerRows) + foldAlignRow(headerRows.head) + foldNormalRows(bodyRows) + "\n\n";
}
function mdList(list) {
    var mdListItem = function mdListItem(ord, tab, tupledArg, li) {
        var retFold = function retFold(s) {
            return [tupledArg[0] + s, tupledArg[1] + 1];
        };

        if (li.tag === 0) {
            return retFold(mdList(li.data));
        } else {
            return retFold(function (s_1) {
                return ord ? Object(__WEBPACK_IMPORTED_MODULE_0__Logger_Logger_fs__["b" /* logPassN */])(logger.Debug, Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_String__["g" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_String__["b" /* printf */])("%s%i. %s\n"))(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_String__["d" /* replicate */])(tab, "\t"), tupledArg[1], s_1)) : Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_String__["g" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_String__["b" /* printf */])("%s- %s\n"))(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_String__["d" /* replicate */])(tab, "\t"), s_1);
            }(mdInlineElements(li.data)));
        }
    };

    var ord_1 = list.ListType.Equals(new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["n" /* TListType */](1));
    return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_Seq__["f" /* fold */])(Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["b" /* partialApply */])(mdListItem, [ord_1, list.Depth - 1]), ["", 1], list.ListItem)[0];
}
function mdHeader(header) {
    return Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_1_fable_core_CurriedLambda__["b" /* partialApply */])(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_String__["g" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_String__["b" /* printf */])("%s %s\n")), [Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_String__["d" /* replicate */])(header.Level, "#")])(mdInlineElements(header.HeaderName));
}
function mdBody(pObjs) {
    var folder = function folder(pStr, pObj) {
        return pStr + function () {
            switch (pObj.tag) {
                case 4:
                    return mdParagraph(pObj.data);

                case 5:
                    return mdInlineElements_(">", pObj.data);

                case 0:
                    return surround("```", Object(__WEBPACK_IMPORTED_MODULE_6__Shared_fs__["d" /* mapLang */])(pObj.data[1]) + "\n" + pObj.data[0] + "\n");

                case 6:
                    return mdTable(pObj.data);

                case 3:
                    return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_String__["g" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_String__["b" /* printf */])("%s\n"))(mdList(pObj.data));

                case 1:
                    return mdHeader(pObj.data);

                default:
                    return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_String__["g" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_1_fable_core_String__["b" /* printf */])("%A is not implemented"))(pObj);
            }
        }();
    };

    return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_1_fable_core_Seq__["f" /* fold */])(folder, "", pObjs);
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=fmark.js.map