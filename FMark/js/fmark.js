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
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
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
/* harmony export (immutable) */ __webpack_exports__["f"] = map;
/* unused harmony export mapIndexed */
/* unused harmony export indexed */
/* unused harmony export partition */
/* harmony export (immutable) */ __webpack_exports__["h"] = replicate;
/* harmony export (immutable) */ __webpack_exports__["i"] = reverse;
/* unused harmony export singleton */
/* harmony export (immutable) */ __webpack_exports__["j"] = slice;
/* unused harmony export unzip */
/* unused harmony export unzip3 */
/* unused harmony export groupBy */
/* harmony export (immutable) */ __webpack_exports__["k"] = splitAt;
/* harmony export (immutable) */ __webpack_exports__["e"] = head;
/* harmony export (immutable) */ __webpack_exports__["l"] = tail;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ListClass__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Map__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Option__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Seq__ = __webpack_require__(1);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_0__ListClass__["b"]; });








/* harmony default export */ __webpack_exports__["c"] = (__WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */]);

function append(xs, ys) {
    return Object(__WEBPACK_IMPORTED_MODULE_3__Seq__["f" /* fold */])(function (acc, x) {
        return new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](x, acc);
    }, ys, reverse(xs));
}
function choose(f, xs) {
    var r = Object(__WEBPACK_IMPORTED_MODULE_3__Seq__["f" /* fold */])(function (acc, x) {
        var y = f(x);
        return y != null ? new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](Object(__WEBPACK_IMPORTED_MODULE_2__Option__["b" /* getValue */])(y), acc) : acc;
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
function head(xs) {
    if (xs.head !== undefined) {
        return xs.head;
    } else {
        throw new Error("The input list was empty.");
    }
}
function tail(xs) {
    if (xs.tail !== undefined) {
        return xs.tail;
    } else {
        throw new Error("The input list was empty.");
    }
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Array__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ListClass__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Option__ = __webpack_require__(4);
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
    return Object(__WEBPACK_IMPORTED_MODULE_2__Option__["b" /* getValue */])(res);
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
                    return [Object(__WEBPACK_IMPORTED_MODULE_2__Option__["b" /* getValue */])(y), iter];
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
    return nonZero != null ? Object(__WEBPACK_IMPORTED_MODULE_2__Option__["b" /* getValue */])(nonZero) : count(xs) - count(ys);
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
            return Object(__WEBPACK_IMPORTED_MODULE_3__Util__["l" /* equals */])(excludedItem, element);
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
    return cur.done ? null : Object(__WEBPACK_IMPORTED_MODULE_2__Option__["c" /* makeSome */])(cur.value);
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
        return i < xs.length ? Object(__WEBPACK_IMPORTED_MODULE_2__Option__["c" /* makeSome */])(xs[i]) : null;
    }
    for (var j = 0, iter = xs[Symbol.iterator]();; j++) {
        var cur = iter.next();
        if (cur.done) {
            break;
        }
        if (j === i) {
            return Object(__WEBPACK_IMPORTED_MODULE_2__Option__["c" /* makeSome */])(cur.value);
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
        return Object(__WEBPACK_IMPORTED_MODULE_2__Option__["c" /* makeSome */])(reduce(function (_, x) {
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
    return ofArray(result);
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
        return Object(__WEBPACK_IMPORTED_MODULE_3__Util__["g" /* compare */])(acc, x) === 1 ? acc : x;
    }, xs);
}
function maxBy(f, xs) {
    return reduce(function (acc, x) {
        return Object(__WEBPACK_IMPORTED_MODULE_3__Util__["g" /* compare */])(f(acc), f(x)) === 1 ? acc : x;
    }, xs);
}
function min(xs) {
    return reduce(function (acc, x) {
        return Object(__WEBPACK_IMPORTED_MODULE_3__Util__["g" /* compare */])(acc, x) === -1 ? acc : x;
    }, xs);
}
function minBy(f, xs) {
    return reduce(function (acc, x) {
        return Object(__WEBPACK_IMPORTED_MODULE_3__Util__["g" /* compare */])(f(acc), f(x)) === -1 ? acc : x;
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
            return Object(__WEBPACK_IMPORTED_MODULE_2__Option__["c" /* makeSome */])(cur.value);
        }
    }
    return defaultValue === void 0 ? null : Object(__WEBPACK_IMPORTED_MODULE_2__Option__["c" /* makeSome */])(defaultValue);
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return Unit; });
/* harmony export (immutable) */ __webpack_exports__["d"] = Option;
/* unused harmony export Array */
/* harmony export (immutable) */ __webpack_exports__["e"] = Tuple;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FableFunction; });
/* harmony export (immutable) */ __webpack_exports__["c"] = GenericParam;
/* unused harmony export Interface */
/* harmony export (immutable) */ __webpack_exports__["o"] = makeGeneric;
/* unused harmony export isGeneric */
/* unused harmony export getDefinition */
/* unused harmony export extendInfo */
/* unused harmony export hasInterface */
/* unused harmony export getPropertyNames */
/* unused harmony export isArray */
/* harmony export (immutable) */ __webpack_exports__["q"] = toString;
/* unused harmony export ObjectRef */
/* unused harmony export getHashCode */
/* unused harmony export hash */
/* harmony export (immutable) */ __webpack_exports__["l"] = equals;
/* harmony export (immutable) */ __webpack_exports__["h"] = comparePrimitives;
/* harmony export (immutable) */ __webpack_exports__["g"] = compare;
/* unused harmony export lessThan */
/* unused harmony export lessOrEqual */
/* unused harmony export greaterThan */
/* unused harmony export greaterOrEqual */
/* harmony export (immutable) */ __webpack_exports__["m"] = equalsRecords;
/* harmony export (immutable) */ __webpack_exports__["i"] = compareRecords;
/* harmony export (immutable) */ __webpack_exports__["n"] = equalsUnions;
/* harmony export (immutable) */ __webpack_exports__["j"] = compareUnions;
/* unused harmony export createDisposable */
/* harmony export (immutable) */ __webpack_exports__["k"] = createAtom;
/* unused harmony export createObj */
/* unused harmony export toPlainJsObj */
/* unused harmony export jsOptions */
/* harmony export (immutable) */ __webpack_exports__["p"] = round;
/* unused harmony export sign */
/* unused harmony export randomNext */
/* unused harmony export applyOperator */
/* unused harmony export unescapeDataString */
/* unused harmony export escapeDataString */
/* unused harmony export escapeUriString */
/* unused harmony export clear */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Date__ = __webpack_require__(16);
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
var ObjectRef = function () {
    function ObjectRef() {
        _classCallCheck(this, ObjectRef);
    }

    _createClass(ObjectRef, null, [{
        key: "id",
        value: function id(o) {
            if (!ObjectRef.idMap.has(o)) {
                ObjectRef.idMap.set(o, ++ObjectRef.count);
            }
            return ObjectRef.idMap.get(o);
        }
    }]);

    return ObjectRef;
}();
ObjectRef.idMap = new WeakMap();
ObjectRef.count = 0;
function getHashCode(x) {
    return ObjectRef.id(x) * 2654435761 | 0;
}
function hash(x) {
    if ((typeof x === "undefined" ? "undefined" : _typeof(x)) === _typeof(1)) {
        return x * 2654435761 | 0;
    }
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
    } else if ((typeof x === "undefined" ? "undefined" : _typeof(x)) !== "object" || (typeof y === "undefined" ? "undefined" : _typeof(y)) !== "object") {
        return x === y;
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
    } else if ((typeof x === "undefined" ? "undefined" : _typeof(x)) !== "object" || (typeof y === "undefined" ? "undefined" : _typeof(y)) !== "object") {
        return x === y ? 0 : x < y ? -1 : 1;
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
function lessThan(x, y) {
    return compare(x, y) < 0;
}
function lessOrEqual(x, y) {
    return compare(x, y) <= 0;
}
function greaterThan(x, y) {
    return compare(x, y) > 0;
}
function greaterOrEqual(x, y) {
    return compare(x, y) >= 0;
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
function sign(x) {
    return x > 0 ? 1 : x < 0 ? -1 : 0;
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
/* unused harmony export Some */
/* harmony export (immutable) */ __webpack_exports__["c"] = makeSome;
/* harmony export (immutable) */ __webpack_exports__["b"] = getValue;
/* harmony export (immutable) */ __webpack_exports__["a"] = defaultArg;
/* unused harmony export defaultArgWith */
/* unused harmony export filter */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Util__ = __webpack_require__(3);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }


var Some = function () {
    function Some(value) {
        _classCallCheck(this, Some);

        this.value = value;
    }
    // We don't prefix it with "Some" for consistency with erased options


    _createClass(Some, [{
        key: "ToString",
        value: function ToString() {
            return Object(__WEBPACK_IMPORTED_MODULE_0__Util__["q" /* toString */])(this.value);
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            if (other == null) {
                return false;
            } else {
                return Object(__WEBPACK_IMPORTED_MODULE_0__Util__["l" /* equals */])(this.value, other instanceof Some ? other.value : other);
            }
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            if (other == null) {
                return 1;
            } else {
                return Object(__WEBPACK_IMPORTED_MODULE_0__Util__["g" /* compare */])(this.value, other instanceof Some ? other.value : other);
            }
        }
    }]);

    return Some;
}();
function makeSome(x) {
    return x == null || x instanceof Some ? new Some(x) : x;
}
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
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = CurriedLambda;
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function CurriedLambda(f, expectedArgsLength) {
    if (f.curried === true) {
        return f;
    }
    var curriedFn = function curriedFn() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var args2 = args.map(function (x) {
            return typeof x === "function" ? CurriedLambda(x) : x;
        });
        var actualArgsLength = Math.max(args2.length, 1);
        expectedArgsLength = Math.max(expectedArgsLength || f.length, 1);
        if (actualArgsLength >= expectedArgsLength) {
            var restArgs = args2.splice(expectedArgsLength);
            var res = f.apply(undefined, _toConsumableArray(args2));
            if (typeof res === "function") {
                var newLambda = CurriedLambda(res);
                return restArgs.length === 0 ? newLambda : newLambda.apply(undefined, _toConsumableArray(restArgs));
            } else {
                return res;
            }
        } else {
            return CurriedLambda(function () {
                for (var _len2 = arguments.length, args3 = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args3[_key2] = arguments[_key2];
                }

                return f.apply(undefined, _toConsumableArray(args2.concat(args3)));
            }, expectedArgsLength - actualArgsLength);
        }
    };
    curriedFn.curried = true;
    return curriedFn;
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
/* harmony export (immutable) */ __webpack_exports__["f"] = toConsole;
/* unused harmony export toConsoleError */
/* harmony export (immutable) */ __webpack_exports__["h"] = toText;
/* harmony export (immutable) */ __webpack_exports__["g"] = toFail;
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
/* harmony export (immutable) */ __webpack_exports__["e"] = split;
/* harmony export (immutable) */ __webpack_exports__["i"] = trim;
/* unused harmony export filter */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Date__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__RegExp__ = __webpack_require__(15);
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
    // Don't remove the lambda here, see #1357
    return arg.cont(function (x) {
        console.log(x);
    });
}
function toConsoleError(arg) {
    return arg.cont(function (x) {
        console.error(x);
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
                rep = Object(__WEBPACK_IMPORTED_MODULE_2__Util__["q" /* toString */])(rep);
                break;
            case "A":
                rep = Object(__WEBPACK_IMPORTED_MODULE_2__Util__["q" /* toString */])(rep, true);
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
        return Object(__WEBPACK_IMPORTED_MODULE_2__Util__["q" /* toString */])(x);
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return Token; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return TFrmtedString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return InlineElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return THeader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return Ttoc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return TListType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return TList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return TListItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Alignment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Cell; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return Row; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return PCell; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return PRow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return RefFrmt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return RefType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return Ref; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return ParsedObj; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return OutFormat; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





var Language = function () {
    function Language(tag) {
        _classCallCheck(this, Language);

        this.tag = tag | 0;
    }

    _createClass(Language, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["a" /* default */].reflection,
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
            return this.tag === other.tag;
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["h" /* comparePrimitives */])(this.tag, other.tag);
        }
    }]);

    return Language;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["b" /* setType */])("Types.Language", Language);
var Token = function () {
    function Token(tag, data) {
        _classCallCheck(this, Token);

        this.tag = tag | 0;
        this.data = data;
    }

    _createClass(Token, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Types.Token",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: [["CODEBLOCK", "string", Language], ["LITERAL", "string"], ["WHITESPACE", "number"], ["NUMBER", "string"], ["HASH"], ["PIPE"], ["EQUAL"], ["MINUS"], ["PLUS"], ["ASTERISK"], ["DOT"], ["COMMA"], ["DASTERISK"], ["TASTERISK"], ["UNDERSCORE"], ["DUNDERSCORE"], ["TUNDERSCORE"], ["TILDE"], ["DTILDE"], ["TTILDE"], ["LSBRA"], ["RSBRA"], ["LBRA"], ["RBRA"], ["BSLASH"], ["SLASH"], ["LABRA"], ["RABRA"], ["LCBRA"], ["RCBRA"], ["BACKTICK"], ["EXCLAMATION"], ["ENDLINE"], ["COLON"], ["CARET"], ["PERCENT"], ["SEMICOLON"], ["HEADER", "number"], ["FOOTNOTE", "number"], ["CITATION", "string"]]
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return this === other || this.tag === other.tag && Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["l" /* equals */])(this.data, other.data);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["j" /* compareUnions */])(this, other) | 0;
        }
    }]);

    return Token;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["b" /* setType */])("Types.Token", Token);
var TFrmtedString = function () {
    function TFrmtedString(tag, data) {
        _classCallCheck(this, TFrmtedString);

        this.tag = tag | 0;
        this.data = data;
    }

    _createClass(TFrmtedString, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Types.TFrmtedString",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: [["Strong", Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["o" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */], {
                    T: InlineElement
                })], ["Emphasis", Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["o" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */], {
                    T: InlineElement
                })], ["Literal", "string"], ["Code", "string"]]
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return this === other || this.tag === other.tag && Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["l" /* equals */])(this.data, other.data);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["j" /* compareUnions */])(this, other) | 0;
        }
    }]);

    return TFrmtedString;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["b" /* setType */])("Types.TFrmtedString", TFrmtedString);
var InlineElement = function () {
    function InlineElement(tag, data) {
        _classCallCheck(this, InlineElement);

        this.tag = tag | 0;
        this.data = data;
    }

    _createClass(InlineElement, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["a" /* default */].reflection,
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
            return this === other || this.tag === other.tag && Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["l" /* equals */])(this.data, other.data);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["j" /* compareUnions */])(this, other) | 0;
        }
    }]);

    return InlineElement;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["b" /* setType */])("Types.InlineElement", InlineElement);
var THeader = function () {
    function THeader(headerName, level) {
        _classCallCheck(this, THeader);

        this.HeaderName = headerName;
        this.Level = level | 0;
    }

    _createClass(THeader, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Types.THeader",
                interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
                properties: {
                    HeaderName: Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["o" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */], {
                        T: InlineElement
                    }),
                    Level: "number"
                }
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["m" /* equalsRecords */])(this, other);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["i" /* compareRecords */])(this, other) | 0;
        }
    }]);

    return THeader;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["b" /* setType */])("Types.THeader", THeader);
var Ttoc = function () {
    function Ttoc(maxDepth, headerLst) {
        _classCallCheck(this, Ttoc);

        this.MaxDepth = maxDepth | 0;
        this.HeaderLst = headerLst;
    }

    _createClass(Ttoc, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Types.Ttoc",
                interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
                properties: {
                    MaxDepth: "number",
                    HeaderLst: Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["o" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */], {
                        T: THeader
                    })
                }
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["m" /* equalsRecords */])(this, other);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["i" /* compareRecords */])(this, other) | 0;
        }
    }]);

    return Ttoc;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["b" /* setType */])("Types.Ttoc", Ttoc);
var TListType = function () {
    function TListType(tag) {
        _classCallCheck(this, TListType);

        this.tag = tag | 0;
    }

    _createClass(TListType, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["a" /* default */].reflection,
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
            return this.tag === other.tag;
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["h" /* comparePrimitives */])(this.tag, other.tag);
        }
    }]);

    return TListType;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["b" /* setType */])("Types.TListType", TListType);
var TList = function () {
    function TList(listType, listItem, depth) {
        _classCallCheck(this, TList);

        this.ListType = listType;
        this.ListItem = listItem;
        this.Depth = depth | 0;
    }

    _createClass(TList, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Types.TList",
                interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
                properties: {
                    ListType: TListType,
                    ListItem: Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["o" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */], {
                        T: TListItem
                    }),
                    Depth: "number"
                }
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["m" /* equalsRecords */])(this, other);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["i" /* compareRecords */])(this, other) | 0;
        }
    }]);

    return TList;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["b" /* setType */])("Types.TList", TList);
var TListItem = function () {
    function TListItem(tag, data) {
        _classCallCheck(this, TListItem);

        this.tag = tag | 0;
        this.data = data;
    }

    _createClass(TListItem, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Types.TListItem",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: [["NestedList", TList], ["StringItem", Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["o" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */], {
                    T: InlineElement
                })]]
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return this === other || this.tag === other.tag && Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["l" /* equals */])(this.data, other.data);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["j" /* compareUnions */])(this, other) | 0;
        }
    }]);

    return TListItem;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["b" /* setType */])("Types.TListItem", TListItem);
var Alignment = function () {
    function Alignment(tag) {
        _classCallCheck(this, Alignment);

        this.tag = tag | 0;
    }

    _createClass(Alignment, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["a" /* default */].reflection,
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
            return this.tag === other.tag;
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["h" /* comparePrimitives */])(this.tag, other.tag);
        }
    }]);

    return Alignment;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["b" /* setType */])("Types.Alignment", Alignment);
var Cell = function () {
    function Cell(tag, data) {
        _classCallCheck(this, Cell);

        this.tag = tag | 0;
        this.data = data;
    }

    _createClass(Cell, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Types.Cell",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: [["Contents", Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["o" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */], {
                    T: Token
                }), "boolean", Alignment]]
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return this === other || this.tag === other.tag && Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["l" /* equals */])(this.data, other.data);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["j" /* compareUnions */])(this, other) | 0;
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
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["b" /* setType */])("Types.Cell", Cell);
var Row = function () {
    function Row(tag, data) {
        _classCallCheck(this, Row);

        this.tag = tag | 0;
        this.data = data;
    }

    _createClass(Row, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Types.Row",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: [["Cells", Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["o" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */], {
                    T: Cell
                }), "boolean"]]
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return this === other || this.tag === other.tag && Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["l" /* equals */])(this.data, other.data);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["j" /* compareUnions */])(this, other) | 0;
        }
    }]);

    return Row;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["b" /* setType */])("Types.Row", Row);
var PCell = function () {
    function PCell(tag, data) {
        _classCallCheck(this, PCell);

        this.tag = tag | 0;
        this.data = data;
    }

    _createClass(PCell, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Types.PCell",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: [["CellLine", Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["o" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */], {
                    T: InlineElement
                }), "boolean", Alignment]]
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return this === other || this.tag === other.tag && Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["l" /* equals */])(this.data, other.data);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["j" /* compareUnions */])(this, other) | 0;
        }
    }]);

    return PCell;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["b" /* setType */])("Types.PCell", PCell);
var PRow = function () {
    function PRow(tag, data) {
        _classCallCheck(this, PRow);

        this.tag = tag | 0;
        this.data = data;
    }

    _createClass(PRow, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Types.PRow",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: [["PCells", Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["o" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */], {
                    T: PCell
                }), "boolean"]]
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return this === other || this.tag === other.tag && Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["l" /* equals */])(this.data, other.data);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["j" /* compareUnions */])(this, other) | 0;
        }
    }]);

    return PRow;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["b" /* setType */])("Types.PRow", PRow);
var RefFrmt = function () {
    function RefFrmt(tag) {
        _classCallCheck(this, RefFrmt);

        this.tag = tag | 0;
    }

    _createClass(RefFrmt, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["a" /* default */].reflection,
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
            return this.tag === other.tag;
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["h" /* comparePrimitives */])(this.tag, other.tag);
        }
    }]);

    return RefFrmt;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["b" /* setType */])("Types.RefFrmt", RefFrmt);
var RefType = function () {
    function RefType(tag) {
        _classCallCheck(this, RefType);

        this.tag = tag | 0;
    }

    _createClass(RefType, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["a" /* default */].reflection,
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
            return this.tag === other.tag;
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["h" /* comparePrimitives */])(this.tag, other.tag);
        }
    }]);

    return RefType;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["b" /* setType */])("Types.RefType", RefType);
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
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Types.Ref",
                interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
                properties: {
                    Cat: Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["d" /* Option */])(RefType),
                    Author: Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["d" /* Option */])(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["o" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */], {
                        T: Token
                    })),
                    Title: Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["d" /* Option */])(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["o" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */], {
                        T: Token
                    })),
                    Year: Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["d" /* Option */])("number"),
                    AccessDate: Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["d" /* Option */])(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["e" /* Tuple */])(["number", "number", "number"])),
                    URL: Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["d" /* Option */])("string")
                }
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["m" /* equalsRecords */])(this, other);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["i" /* compareRecords */])(this, other) | 0;
        }
    }]);

    return Ref;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["b" /* setType */])("Types.Ref", Ref);
var ParsedObj = function () {
    function ParsedObj(tag, data) {
        _classCallCheck(this, ParsedObj);

        this.tag = tag | 0;
        this.data = data;
    }

    _createClass(ParsedObj, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Types.ParsedObj",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: [["CodeBlock", "string", Language], ["Header", THeader, "string"], ["ContentTable", Ttoc], ["List", TList], ["Paragraph", Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["o" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */], {
                    T: Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["o" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */], {
                        T: InlineElement
                    })
                })], ["Quote", Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["o" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */], {
                    T: InlineElement
                })], ["Table", Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["o" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */], {
                    T: PRow
                })], ["PreTable", Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["o" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */], {
                    T: Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["o" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */], {
                        T: Token
                    })
                })], ["Footnote", "number", Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["o" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */], {
                    T: InlineElement
                })], ["Citation", "string", TFrmtedString, Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["o" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */], {
                    T: InlineElement
                })]]
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return this === other || this.tag === other.tag && Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["l" /* equals */])(this.data, other.data);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["j" /* compareUnions */])(this, other) | 0;
        }
    }]);

    return ParsedObj;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["b" /* setType */])("Types.ParsedObj", ParsedObj);
var OutFormat = function () {
    function OutFormat(tag) {
        _classCallCheck(this, OutFormat);

        this.tag = tag | 0;
    }

    _createClass(OutFormat, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["a" /* default */].reflection,
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
            return this.tag === other.tag;
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["h" /* comparePrimitives */])(this.tag, other.tag);
        }
    }]);

    return OutFormat;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["b" /* setType */])("Types.OutFormat", OutFormat);

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
            return Object(__WEBPACK_IMPORTED_MODULE_1__Util__["n" /* equalsUnions */])(this, other);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__Util__["j" /* compareUnions */])(this, other);
        }
    }, {
        key: __WEBPACK_IMPORTED_MODULE_0__Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Microsoft.FSharp.Core.FSharpResult",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: [["Ok", Object(__WEBPACK_IMPORTED_MODULE_1__Util__["c" /* GenericParam */])("T")], ["Error", Object(__WEBPACK_IMPORTED_MODULE_1__Util__["c" /* GenericParam */])("TError")]]
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
/* harmony export (immutable) */ __webpack_exports__["k"] = strAllToks;
/* harmony export (immutable) */ __webpack_exports__["d"] = mapLang;
/* harmony export (immutable) */ __webpack_exports__["l"] = xOnwards;
/* harmony export (immutable) */ __webpack_exports__["i"] = sOnwards;
/* harmony export (immutable) */ __webpack_exports__["g"] = removeChars;
/* harmony export (immutable) */ __webpack_exports__["h"] = replaceChars;
/* unused harmony export removeWhitespace */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return sharedLog; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Map__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_Comparer__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Util__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Types_fs__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_Option__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_String__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Seq__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_11_fable_core_RegExp__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Logger_Logger_fs__ = __webpack_require__(10);












function invTuple(a, b) {
    return [b, a];
}
function mapTryFind(k, map) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Map__["d" /* tryFind */])(k, map);
}
function listTryFind(s) {
    return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(function ($var2) {
        return function (map) {
            return mapTryFind(s, map);
        }(function ($var1) {
            return Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Map__["b" /* create */])(Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["f" /* map */])(function (tupledArg) {
                return invTuple(tupledArg[0], tupledArg[1]);
            }, $var1), new __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_Comparer__["a" /* default */](__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Util__["g" /* compare */]));
        }($var2));
    });
}
var charList = Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([["#", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["r" /* Token */](4)], ["|", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["r" /* Token */](5)], ["=", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["r" /* Token */](6)], ["-", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["r" /* Token */](7)], ["+", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["r" /* Token */](8)], ["*", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["r" /* Token */](9)], [".", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["r" /* Token */](10)], ["**", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["r" /* Token */](12)], ["***", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["r" /* Token */](13)], ["_", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["r" /* Token */](14)], ["__", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["r" /* Token */](15)], ["___", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["r" /* Token */](16)], ["~", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["r" /* Token */](17)], ["~~", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["r" /* Token */](18)], ["~~~", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["r" /* Token */](19)], ["[", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["r" /* Token */](20)], ["]", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["r" /* Token */](21)], ["(", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["r" /* Token */](22)], [")", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["r" /* Token */](23)], ["\\", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["r" /* Token */](24)], ["/", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["r" /* Token */](25)], ["<", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["r" /* Token */](26)], [">", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["r" /* Token */](27)], ["{", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["r" /* Token */](28)], ["}", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["r" /* Token */](29)], ["`", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["r" /* Token */](30)], ["!", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["r" /* Token */](31)], [":", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["r" /* Token */](33)], ["^", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["r" /* Token */](34)], ["%", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["r" /* Token */](35)], [",", new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["r" /* Token */](11)]]);
var charMap = Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Map__["b" /* create */])(Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["f" /* map */])(function (tupledArg) {
    return invTuple(tupledArg[0], tupledArg[1]);
}, charList), new __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_Comparer__["a" /* default */](function (x, y) {
    return x.CompareTo(y);
}));

function _CharTok___(tok) {
    return mapTryFind(tok, charMap);
}


function mapTok(_arg1) {
    var activePatternResult469 = _CharTok___(_arg1);

    if (activePatternResult469 != null) {
        return Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult469);
    } else {
        switch (_arg1.tag) {
            case 0:
                return "CODEBLOCK";

            case 38:
                return Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_String__["h" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_String__["b" /* printf */])("FOOTNOTE found"));

            case 39:
                return Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_String__["h" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_String__["b" /* printf */])("CITATION found"));

            case 37:
                return Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_String__["h" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_String__["b" /* printf */])("HEADER %d"))(_arg1.data);

            case 3:
                return _arg1.data;

            case 1:
                return _arg1.data;

            case 2:
                return Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_String__["d" /* replicate */])(_arg1.data, " ");

            default:
                return "\n";
        }
    }
}
function strAllToks(toks) {
    var pacMan = function pacMan(str, tok) {
        return str + mapTok(tok);
    };

    return Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Seq__["f" /* fold */])(pacMan, "", toks);
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
        return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["j" /* slice */])(x, null, lst);
    } else {
        return new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]();
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
        return Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_String__["c" /* replace */])(s_1, x, "");
    };

    return Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Seq__["f" /* fold */])(folder, s, lst);
}
function replaceChars(pat, rep, s) {
    return Object(__WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_11_fable_core_RegExp__["d" /* replace */])(s, pat, rep);
}
function removeWhitespace(s) {
    return removeChars(Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])(["\n", "\t", "\r", " "]), s);
}
var sharedLog = new __WEBPACK_IMPORTED_MODULE_10__Logger_Logger_fs__["a" /* Logger */](2);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export logLevelStr */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Logger; });
/* harmony export (immutable) */ __webpack_exports__["c"] = logPass;
/* harmony export (immutable) */ __webpack_exports__["d"] = logPassN;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return globLog; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Map__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_Comparer__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_Util__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Symbol__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_MailboxProcessor__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_String__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_AsyncBuilder__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_11_fable_core_Date__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__nuget_packages_fable_core_1_3_11_fable_core_Option__ = __webpack_require__(4);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }













var logLevelStr = Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Map__["b" /* create */])(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([[0, "DEBUG"], [1, "INFO"], [2, "WARNING"], [3, "ERROR"], [4, "FATAL"]]), new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_Comparer__["a" /* default */](__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_Util__["h" /* comparePrimitives */]));
var Logger = function () {
    _createClass(Logger, [{
        key: __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Logger.Logger",
                properties: {
                    Debug: __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_Util__["f" /* Unit */],
                    Error: __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_Util__["f" /* Unit */],
                    Fatal: __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_Util__["f" /* Unit */],
                    Info: __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_Util__["f" /* Unit */],
                    Log: __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_Util__["f" /* Unit */],
                    Warn: __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_Util__["f" /* Unit */]
                }
            };
        }
    }]);

    function Logger(logLevel) {
        _classCallCheck(this, Logger);

        this.logLevel = logLevel | 0;
        this.agent = Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_MailboxProcessor__["a" /* start */])(function (inbox) {
            var messageLoop = function messageLoop() {
                return function (builder_) {
                    return builder_.Delay(function () {
                        return builder_.Bind(inbox.receive(), function (_arg1) {
                            Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_String__["f" /* toConsole */])(Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_String__["b" /* printf */])("%s"))(_arg1);
                            return builder_.ReturnFrom(messageLoop());
                        });
                    });
                }(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_AsyncBuilder__["f" /* singleton */]);
            };

            return messageLoop();
        });
    }

    _createClass(Logger, [{
        key: "postStr",
        value: function postStr(pType, msg, _arg2) {
            var objectArg;
            var copyOfStruct;
            var objectArg_1;
            var copyOfStruct_1;

            if (_arg2 != null) {
                (objectArg = this.agent, function (arg00) {
                    objectArg.post(arg00);
                })(Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_String__["h" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_String__["b" /* printf */])("%s [%s] (%d) %s"))(pType, (copyOfStruct = Object(__WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_11_fable_core_Date__["b" /* now */])(), Object(__WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_11_fable_core_Date__["c" /* toString */])(copyOfStruct, "yyyy-MM-dd HH:mm:ss")), Object(__WEBPACK_IMPORTED_MODULE_10__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(_arg2), msg));
            } else {
                (objectArg_1 = this.agent, function (arg00_1) {
                    objectArg_1.post(arg00_1);
                })(Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_String__["h" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_String__["b" /* printf */])("%s [%s] %s"))(pType, (copyOfStruct_1 = Object(__WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_11_fable_core_Date__["b" /* now */])(), Object(__WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_11_fable_core_Date__["c" /* toString */])(copyOfStruct_1, "yyyy-MM-dd HH:mm:ss")), msg));
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
            var _this = this;

            return Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(function (t, l, msg) {
                _this.log(t, l, msg);
            });
        }
    }, {
        key: "Debug",
        get: function get() {
            var _this2 = this;

            return Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(function (l, msg) {
                _this2.log(0, l, msg);
            });
        }
    }, {
        key: "Info",
        get: function get() {
            var _this3 = this;

            return Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(function (l, msg) {
                _this3.log(1, l, msg);
            });
        }
    }, {
        key: "Warn",
        get: function get() {
            var _this4 = this;

            return Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(function (l, msg) {
                _this4.log(2, l, msg);
            });
        }
    }, {
        key: "Error",
        get: function get() {
            var _this5 = this;

            return Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(function (l, msg) {
                _this5.log(3, l, msg);
            });
        }
    }, {
        key: "Fatal",
        get: function get() {
            var _this6 = this;

            return Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(function (l, msg) {
                _this6.log(4, l, msg);
            });
        }
    }]);

    return Logger;
}();
Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["b" /* setType */])("Logger.Logger", Logger);
function logPass(line, log, s) {
    Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(log)(line)(s);
    return s;
}
function logPassN(log, s) {
    Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(log)(null)(s);
    return s;
}
var globLog = Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_Util__["k" /* createAtom */])(new Logger(0));

/***/ }),
/* 11 */
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
                return Object(__WEBPACK_IMPORTED_MODULE_1__Util__["q" /* toString */])(x);
            }).join("; ") + "]";
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            // Optimization if they are referencially equal
            if (this === other) {
                return true;
            } else {
                var cur1 = this;
                var cur2 = other;
                while (Object(__WEBPACK_IMPORTED_MODULE_1__Util__["l" /* equals */])(cur1.head, cur2.head)) {
                    cur1 = cur1.tail;
                    cur2 = cur2.tail;
                    if (cur1 == null) {
                        return cur2 == null;
                    }
                }
                return false;
            }
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            // Optimization if they are referencially equal
            if (this === other) {
                return 0;
            } else {
                var cur1 = this;
                var cur2 = other;
                var res = Object(__WEBPACK_IMPORTED_MODULE_1__Util__["g" /* compare */])(cur1.head, cur2.head);
                while (res === 0) {
                    cur1 = cur1.tail;
                    cur2 = cur2.tail;
                    if (cur1 == null) {
                        return cur2 == null ? 0 : -1;
                    }
                    res = Object(__WEBPACK_IMPORTED_MODULE_1__Util__["g" /* compare */])(cur1.head, cur2.head);
                }
                return res;
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
/* 12 */
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Comparer__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ListClass__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Option__ = __webpack_require__(4);
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
            Object(__WEBPACK_IMPORTED_MODULE_2__Option__["b" /* getValue */])(vs).push(cur.value);
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
    return Object(__WEBPACK_IMPORTED_MODULE_2__Option__["b" /* getValue */])(res);
}
function tree_tryFind(comparer, k, m) {
    tryFind: while (true) {
        if (m.tag === 1) {
            var c = comparer.Compare(k, m.data[0]) | 0;
            if (c === 0) {
                return Object(__WEBPACK_IMPORTED_MODULE_2__Option__["c" /* makeSome */])(m.data[1]);
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
                return Object(__WEBPACK_IMPORTED_MODULE_2__Option__["c" /* makeSome */])(m.data[1]);
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
                return Object(__WEBPACK_IMPORTED_MODULE_5__Util__["q" /* toString */])(x);
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
                return c !== 0 ? c : Object(__WEBPACK_IMPORTED_MODULE_5__Util__["g" /* compare */])(kvp1[1], kvp2[1]);
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
        return acc || Object(__WEBPACK_IMPORTED_MODULE_5__Util__["l" /* equals */])(map.get(k), v);
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
        return f(kv[0], kv[1]) ? Object(__WEBPACK_IMPORTED_MODULE_2__Option__["c" /* makeSome */])(kv[0]) : null;
    }, map);
}
function tryFindKey(f, map) {
    return Object(__WEBPACK_IMPORTED_MODULE_3__Seq__["p" /* tryPick */])(function (kv) {
        return f(kv[0], kv[1]) ? Object(__WEBPACK_IMPORTED_MODULE_2__Option__["c" /* makeSome */])(kv[0]) : null;
    }, map);
}
function pick(f, map) {
    var res = tryPick(f, map);
    if (res != null) {
        return Object(__WEBPACK_IMPORTED_MODULE_2__Option__["b" /* getValue */])(res);
    }
    throw new Error("key not found");
}
function tryPick(f, map) {
    return tree_tryPick(f, map.tree);
}

/***/ }),
/* 13 */
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

        this.Compare = f || __WEBPACK_IMPORTED_MODULE_1__Util__["g" /* compare */];
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
/* 14 */
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
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = create;
/* harmony export (immutable) */ __webpack_exports__["b"] = escape;
/* unused harmony export unescape */
/* unused harmony export isMatch */
/* harmony export (immutable) */ __webpack_exports__["c"] = match;
/* unused harmony export matches */
/* unused harmony export options */
/* harmony export (immutable) */ __webpack_exports__["d"] = replace;
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
/* 16 */
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AsyncBuilder__ = __webpack_require__(14);
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
            return Object(__WEBPACK_IMPORTED_MODULE_1__Util__["n" /* equalsUnions */])(this, other);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__Util__["j" /* compareUnions */])(this, other);
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
/* 20 */
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
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export SPACE */
/* unused harmony export NOSTRING */
/* unused harmony export TEmphasis */
/* unused harmony export ParagraphState */
/* harmony export (immutable) */ __webpack_exports__["h"] = deleteLeadingENDLINEs;
/* unused harmony export deleteTrailingENDLINEs */
/* harmony export (immutable) */ __webpack_exports__["k"] = trimENDLINEs;
/* unused harmony export stringAllTokens */
/* unused harmony export countToks */
/* unused harmony export countSpaces */
/* unused harmony export countNewLines */
/* unused harmony export countDelim */
/* unused harmony export countPipes */
/* unused harmony export countMinus */
/* unused harmony export cutFirstLine */
/* harmony export (immutable) */ __webpack_exports__["f"] = cutIntoLines;
/* unused harmony export combineLiterals */
/* unused harmony export $7C$MatchSym$7C$_$7C$ */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return _PickoutParagraph___; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return _PickoutList___; });
/* unused harmony export $7C$MatchEm$7C$_$7C$ */
/* unused harmony export $7C$MatchNewParagraph$7C$_$7C$ */
/* unused harmony export $7C$MatchMapTok$7C$_$7C$ */
/* unused harmony export $7C$MatchHeader$7C$_$7C$ */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _MatchQuote___; });
/* unused harmony export $7C$MatchList$7C$_$7C$ */
/* unused harmony export $7C$MatchListOpSpace$7C$_$7C$ */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return _MatchTableHead___; });
/* unused harmony export pipeMatch */
/* unused harmony export minusMatch */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return _MatchTableFormater___; });
/* harmony export (immutable) */ __webpack_exports__["g"] = cutTableRows;
/* harmony export (immutable) */ __webpack_exports__["j"] = parseInLineElements2;
/* harmony export (immutable) */ __webpack_exports__["i"] = parseInLineElements;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Types_fs__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Shared_fs__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_Seq__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_String__ = __webpack_require__(6);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }












var SPACE = " ";
var NOSTRING = "";
var TEmphasis = function () {
    function TEmphasis(tag) {
        _classCallCheck(this, TEmphasis);

        this.tag = tag | 0;
    }

    _createClass(TEmphasis, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["a" /* default */].reflection,
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
            return this.tag === other.tag;
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["h" /* comparePrimitives */])(this.tag, other.tag);
        }
    }]);

    return TEmphasis;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["b" /* setType */])("ParserHelperFuncs.TEmphasis", TEmphasis);
var ParagraphState = function () {
    function ParagraphState(par, reToks, parMatched) {
        _classCallCheck(this, ParagraphState);

        this.Par = par;
        this.ReToks = reToks;
        this.ParMatched = parMatched;
    }

    _createClass(ParagraphState, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "ParserHelperFuncs.ParagraphState",
                interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
                properties: {
                    Par: Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["o" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */], {
                        T: __WEBPACK_IMPORTED_MODULE_3__Types_fs__["r" /* Token */]
                    }),
                    ReToks: Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["o" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */], {
                        T: __WEBPACK_IMPORTED_MODULE_3__Types_fs__["r" /* Token */]
                    }),
                    ParMatched: "boolean"
                }
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["m" /* equalsRecords */])(this, other);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["i" /* compareRecords */])(this, other) | 0;
        }
    }]);

    return ParagraphState;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["b" /* setType */])("ParserHelperFuncs.ParagraphState", ParagraphState);
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
    return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(deleteLeadingENDLINEs(Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(toks)));
}
function trimENDLINEs(toks) {
    return deleteTrailingENDLINEs(deleteLeadingENDLINEs(toks));
}
function stringAllTokens(toks) {
    var matchTok = function matchTok(i, tok) {
        return i + Object(__WEBPACK_IMPORTED_MODULE_4__Shared_fs__["e" /* mapTok */])(tok);
    };

    return Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_Seq__["f" /* fold */])(matchTok, "", toks);
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
var countNewLines = Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(function () {
    var tok = new __WEBPACK_IMPORTED_MODULE_3__Types_fs__["r" /* Token */](32);
    return function (toks) {
        return countToks(tok, toks);
    };
}());
function countDelim(delim, toks) {
    var counter = function counter(tok) {
        if (Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["l" /* equals */])(tok, delim)) {
            return 1;
        } else {
            return 0;
        }
    };

    return Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_Seq__["m" /* sumBy */])(counter, toks) | 0;
}
var countPipes = Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(function () {
    var delim = new __WEBPACK_IMPORTED_MODULE_3__Types_fs__["r" /* Token */](5);
    return function (toks) {
        return countDelim(delim, toks);
    };
}());
var countMinus = Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(function () {
    var delim = new __WEBPACK_IMPORTED_MODULE_3__Types_fs__["r" /* Token */](7);
    return function (toks) {
        return countDelim(delim, toks);
    };
}());
function cutFirstLine(toks) {
    var cutLine_ = function cutLine_(line, rtks) {
        cutLine_: while (true) {
            if (rtks.tail == null) {
                return [Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(line), new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]()];
            } else if (rtks.head.tag === 32) {
                return [Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(line), rtks.tail];
            } else {
                line = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](rtks.head, line);
                rtks = rtks.tail;
                continue cutLine_;
            }
        }
    };

    return cutLine_(new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](), toks);
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

            var matchValue = Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_Seq__["o" /* tryFindIndex */])(endlineSpliter, toks_1);

            if (matchValue != null) {
                var matchValue_1 = Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["k" /* splitAt */])(Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(matchValue), toks_1);
                var tokLineNoEL = deleteTrailingENDLINEs(matchValue_1[0]);
                tokLines = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](tokLineNoEL, tokLines);
                toks_1 = Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["l" /* tail */])(matchValue_1[1]);
                continue cutIntoLines_;
            } else {
                return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](toks_1, tokLines));
            }
        }
    };

    return Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(cutIntoLines_)(new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]())(toks);
}
function combineLiterals(line) {
    var state;

    var combiner = function combiner(line_1, inlineEle) {
        var doNothing = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](inlineEle, line_1);
        var matchValue = Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["e" /* head */])(line_1);
        var $var4 = matchValue.tag === 0 ? matchValue.data.tag === 2 ? [0, matchValue.data.data] : [1] : [1];

        switch ($var4[0]) {
            case 0:
                var $var5 = inlineEle.tag === 0 ? inlineEle.data.tag === 2 ? [0, inlineEle.data.data] : [1] : [1];

                switch ($var5[0]) {
                    case 0:
                        return new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_3__Types_fs__["c" /* InlineElement */](0, new __WEBPACK_IMPORTED_MODULE_3__Types_fs__["m" /* TFrmtedString */](2, $var4[1] + $var5[1])), Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["l" /* tail */])(line_1));

                    case 1:
                        return doNothing;
                }

            case 1:
                return doNothing;
        }
    };

    return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])((state = Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["e" /* head */])(line)]), function (list) {
        return Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_Seq__["f" /* fold */])(combiner, state, list);
    })(Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["l" /* tail */])(line)));
}

function _MatchSym___(sym, toks) {
    var $var6 = toks.tail != null ? Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["l" /* equals */])(toks.head, sym) ? [0, toks.head, toks.tail] : [1] : [1];

    switch ($var6[0]) {
        case 0:
            var matchValue = Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_Seq__["o" /* tryFindIndex */])(function (s) {
                return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["l" /* equals */])(s, sym);
            }, Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["l" /* tail */])(toks));

            if (matchValue == null) {
                return null;
            } else {
                var patternInput = Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["k" /* splitAt */])(Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(matchValue), $var6[2]);
                return [patternInput[0], Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["l" /* tail */])(patternInput[1])];
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
                var ReToks = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](tok, state.ReToks);
                return new ParagraphState(state.Par, ReToks, state.ParMatched);
            } else {
                var $var7 = tok.tag === 32 ? Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["e" /* head */])(state.Par).Equals(new __WEBPACK_IMPORTED_MODULE_3__Types_fs__["r" /* Token */](32)) ? [0] : [1] : [1];

                switch ($var7[0]) {
                    case 0:
                        return new ParagraphState(Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["l" /* tail */])(state.Par), state.ReToks, true);

                    case 1:
                        if (tok.tag === 37) {
                            return new ParagraphState(state.Par, new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](tok, state.ReToks), true);
                        } else {
                            return new ParagraphState(new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](tok, state.Par), state.ReToks, state.ParMatched);
                        }

                }
            }
        };

        var initState = new ParagraphState(new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](), new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](), false);
        var matchValue = Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_Seq__["f" /* fold */])(folder, initState, toks);
        return [Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(matchValue.Par), deleteLeadingENDLINEs(Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(matchValue.ReToks))];
    }
}



function _PickoutList___(toks) {
    var $var8 = toks.tail != null ? toks.head.tag === 9 ? toks.tail.tail != null ? toks.tail.head.tag === 2 ? [1] : [2] : [2] : toks.head.tag === 7 ? toks.tail.tail != null ? toks.tail.head.tag === 2 ? [1] : [2] : [2] : toks.head.tag === 3 ? toks.tail.tail != null ? toks.tail.head.tag === 10 ? toks.tail.tail.tail != null ? toks.tail.tail.head.tag === 2 ? [1] : [2] : [2] : [2] : [2] : [2] : [0];

    switch ($var8[0]) {
        case 0:
            return null;

        case 1:
            var activePatternResult1183 = _PickoutParagraph___(toks);

            if (activePatternResult1183 != null) {
                return Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult1183);
            } else {
                return null;
            }

        case 2:
            return null;
    }
}



function _MatchEm___(toks) {
    var attachInlineEle = Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(function (front, back) {
        var mapping = function mapping(tupledArg) {
            return [tupledArg[0], tupledArg[1], front, back];
        };

        return function (option) {
            return Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["a" /* defaultArg */])(option, null, mapping);
        };
    });
    var $var9 = toks.tail != null ? toks.head.tag === 2 ? toks.tail.tail != null ? toks.tail.head.tag === 14 ? toks.tail.tail.tail != null ? toks.tail.tail.head.tag === 2 ? [0] : [1, toks.head.data, toks.tail.tail] : [1, toks.head.data, toks.tail.tail] : [4] : [4] : toks.head.tag === 9 ? toks.tail.tail != null ? toks.tail.head.tag === 2 ? [2] : [3, toks.tail] : [3, toks.tail] : [4] : [4];

    switch ($var9[0]) {
        case 0:
            return null;

        case 1:
            var frontLiteral = new __WEBPACK_IMPORTED_MODULE_3__Types_fs__["c" /* InlineElement */](0, new __WEBPACK_IMPORTED_MODULE_3__Types_fs__["m" /* TFrmtedString */](2, Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_String__["d" /* replicate */])($var9[1], " ")));

            var endFinder = function endFinder(content, toks_1) {
                endFinder: while (true) {
                    var $var10 = toks_1.tail != null ? toks_1.head.tag === 2 ? toks_1.tail.tail != null ? toks_1.tail.head.tag === 14 ? toks_1.tail.tail.tail == null ? [3] : toks_1.tail.tail.head.tag === 2 ? [1, toks_1.tail.tail.tail] : [4] : [4] : [4] : toks_1.tail.tail != null ? toks_1.tail.head.tag === 14 ? toks_1.tail.tail.tail == null ? [3] : toks_1.tail.tail.head.tag === 2 ? [2, toks_1.tail.tail.head.data, toks_1.tail.tail.tail] : [4] : [4] : [4] : [0];

                    switch ($var10[0]) {
                        case 0:
                            return null;

                        case 1:
                            content = Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["a" /* append */])(content, Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["j" /* slice */])(0, 2, toks_1));
                            toks_1 = $var10[1];
                            continue endFinder;

                        case 2:
                            var backLiteral = new __WEBPACK_IMPORTED_MODULE_3__Types_fs__["c" /* InlineElement */](0, new __WEBPACK_IMPORTED_MODULE_3__Types_fs__["m" /* TFrmtedString */](2, Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_String__["d" /* replicate */])($var10[1], " ")));
                            return Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(attachInlineEle)(frontLiteral, backLiteral)([Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["a" /* append */])(content, Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["e" /* head */])(toks_1)])), $var10[2]]);

                        case 3:
                            return Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(attachInlineEle)(frontLiteral, null)([Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["a" /* append */])(content, Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["e" /* head */])(toks_1)])), new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]()]);

                        case 4:
                            return Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(endFinder)(Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["a" /* append */])(content, Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_Seq__["h" /* item */])(0, toks_1)])))(Object(__WEBPACK_IMPORTED_MODULE_4__Shared_fs__["l" /* xOnwards */])(1, toks_1));
                    }
                }
            };

            return endFinder(new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](), $var9[2]);

        case 2:
            return null;

        case 3:
            var endFinder_1 = function endFinder_1(content_1, toks_2) {
                endFinder_1: while (true) {
                    var $var11 = toks_2.tail != null ? toks_2.head.tag === 2 ? toks_2.tail.tail != null ? toks_2.tail.head.tag === 9 ? [1, toks_2.tail.tail] : [3] : [3] : toks_2.tail.tail != null ? toks_2.tail.head.tag === 9 ? [2, toks_2.tail.tail] : [3] : [3] : [0];

                    switch ($var11[0]) {
                        case 0:
                            return null;

                        case 1:
                            content_1 = Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["a" /* append */])(content_1, Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["j" /* slice */])(0, 1, toks_2));
                            toks_2 = $var11[1];
                            continue endFinder_1;

                        case 2:
                            return Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(attachInlineEle)(null, null)([Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["a" /* append */])(content_1, Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["e" /* head */])(toks_2)])), $var11[1]]);

                        case 3:
                            return Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(endFinder_1)(Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["a" /* append */])(content_1, Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_Seq__["h" /* item */])(0, toks_2)])))(Object(__WEBPACK_IMPORTED_MODULE_4__Shared_fs__["l" /* xOnwards */])(1, toks_2));
                    }
                }
            };

            return endFinder_1(new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](), $var9[1]);

        case 4:
            return null;
    }
}



function _MatchNewParagraph___(toks) {
    var matchValue = countNewLines(toks) | 0;

    if (matchValue >= 2) {
        return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["j" /* slice */])(matchValue, null, toks);
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
            var $var12 = tks.tail != null ? tks.head.tag === 4 ? [0, tks.tail] : [1] : [1];

            switch ($var12[0]) {
                case 0:
                    n = n + 1;
                    tks = $var12[1];
                    continue countHashes;

                case 1:
                    return n | 0;
            }
        }
    };

    var matchValue = countHashes(0, toks) | 0;

    if (matchValue > 0) {
        var matchValue_1 = Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["j" /* slice */])(matchValue, null, toks);
        var $var13 = matchValue_1.tail != null ? matchValue_1.head.tag === 2 ? [0, matchValue_1.tail] : [1] : [1];

        switch ($var13[0]) {
            case 0:
                return function (tupledArg) {
                    return [matchValue, tupledArg[0], tupledArg[1]];
                }(cutFirstLine($var13[1]));

            case 1:
                return null;
        }
    } else {
        return null;
    }
}



function _MatchQuote___(toks) {
    var $var14 = toks.tail != null ? toks.head.tag === 27 ? [0, toks.tail] : [1] : [1];

    switch ($var14[0]) {
        case 0:
            return cutFirstLine($var14[1]);

        case 1:
            return null;
    }
}



function _MatchList___(toks) {
    var $var15 = toks.tail != null ? toks.head.tag === 3 ? toks.tail.tail != null ? toks.tail.head.tag === 10 ? toks.tail.tail.tail != null ? toks.tail.tail.head.tag === 2 ? [0, toks.tail.tail.tail] : [2] : [2] : [2] : [2] : toks.head.tag === 9 ? toks.tail.tail != null ? toks.tail.head.tag === 2 ? [1, toks.tail.tail] : [2] : [2] : [2] : [2];

    switch ($var15[0]) {
        case 0:
            return [new __WEBPACK_IMPORTED_MODULE_3__Types_fs__["q" /* TListType */](1), $var15[1]];

        case 1:
            return [new __WEBPACK_IMPORTED_MODULE_3__Types_fs__["q" /* TListType */](0), $var15[1]];

        case 2:
            return null;
    }
}



function _MatchListOpSpace___(toks) {
    var $var16 = void 0;

    if (toks.tail != null) {
        if (toks.head.tag === 2) {
            var activePatternResult1221 = _MatchList___(toks.tail);

            if (activePatternResult1221 != null) {
                $var16 = [0, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult1221)];
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
            return $var16[1];

        case 1:
            var activePatternResult1220 = _MatchList___(toks);

            if (activePatternResult1220 != null) {
                return Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult1220);
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
    return Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["a" /* defaultArg */])(oToks, null, function (toks) {
        var $var17 = toks.tail != null ? toks.head.tag === 5 ? [0, toks.tail] : [1] : [1];

        switch ($var17[0]) {
            case 0:
                return $var17[1];

            case 1:
                return null;
        }
    });
}
function minusMatch(oToks) {
    var takeAwayMinuses = function takeAwayMinuses(toks) {
        var takeAwayMinuses_ = function takeAwayMinuses_(n, toks_1) {
            takeAwayMinuses_: while (true) {
                var $var18 = toks_1.tail != null ? toks_1.head.tag === 7 ? [0, toks_1.tail] : [1] : [1];

                switch ($var18[0]) {
                    case 0:
                        n = n + 1;
                        toks_1 = $var18[1];
                        continue takeAwayMinuses_;

                    case 1:
                        return [n, toks_1];
                }
            }
        };

        return takeAwayMinuses_(0, toks);
    };

    return Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["a" /* defaultArg */])(oToks, null, function (toks_2) {
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
                return [Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(rows), new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]()];
            } else if (toks_1.head.tag === 32) {
                return [Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(rows), toks_1.tail];
            } else {
                var patternInput = cutFirstLine(toks_1);
                rows = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](patternInput[0], rows);
                toks_1 = patternInput[1];
                continue cutTableRow_;
            }
        }
    };

    return cutTableRow_(new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](), toks);
}
function parseInLineElements2(ftLst, toks) {
    var attachInlineEle = function attachInlineEle(front, back, ele) {
        return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([front, ele, back]);
    };

    var parseInLineElements_ = function parseInLineElements_(ftLst_1, currentLine, toks_1) {
        var matchValue;

        var activePatternResult1257 = _MatchSym___(new __WEBPACK_IMPORTED_MODULE_3__Types_fs__["r" /* Token */](30), toks_1);

        if (activePatternResult1257 != null) {
            return [new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_3__Types_fs__["c" /* InlineElement */](0, new __WEBPACK_IMPORTED_MODULE_3__Types_fs__["m" /* TFrmtedString */](3, Object(__WEBPACK_IMPORTED_MODULE_4__Shared_fs__["k" /* strAllToks */])(Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult1257)[0]))), currentLine), Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult1257)[1]];
        } else {
            var activePatternResult1255 = _MatchEm___(toks_1);

            if (activePatternResult1255 != null) {
                var inlineContent = new __WEBPACK_IMPORTED_MODULE_3__Types_fs__["c" /* InlineElement */](0, new __WEBPACK_IMPORTED_MODULE_3__Types_fs__["m" /* TFrmtedString */](1, parseInLines(new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](), Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult1255)[0])));
                return [function (x) {
                    return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["a" /* append */])(x, currentLine);
                }((matchValue = [Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult1255)[2], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult1255)[3]], matchValue[0] == null ? matchValue[1] == null ? Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([inlineContent]) : Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(matchValue[1]), inlineContent]) : matchValue[1] == null ? Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([inlineContent, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(matchValue[0])]) : Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(matchValue[1]), inlineContent, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(matchValue[0])]))), Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult1255)[1]];
            } else {
                var $var19 = toks_1.tail != null ? toks_1.head.tag === 38 ? [0, toks_1.head.data, toks_1.tail] : toks_1.head.tag === 39 ? [1, toks_1.tail, toks_1.head.data] : [2] : [2];

                switch ($var19[0]) {
                    case 0:
                        var matchFootnote = function matchFootnote(id, pObjs) {
                            var i;
                            var $var20 = pObjs.tail != null ? pObjs.head.tag === 8 ? (i = pObjs.head.data[0] | 0, i === id) ? [0, pObjs.head.data[0]] : [1] : [1] : [1];

                            switch ($var20[0]) {
                                case 0:
                                    return true;

                                case 1:
                                    return false;
                            }
                        };

                        var ft = matchFootnote($var19[1], ftLst_1);

                        if (ft) {
                            return [Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([function (tupledArg) {
                                return new __WEBPACK_IMPORTED_MODULE_3__Types_fs__["c" /* InlineElement */](1, [tupledArg[0], tupledArg[1]]);
                            }([new __WEBPACK_IMPORTED_MODULE_3__Types_fs__["m" /* TFrmtedString */](2, "Footer" + $var19[1].toString()), "#footnote-" + $var19[1].toString()])]), $var19[2]];
                        } else {
                            return [Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([new __WEBPACK_IMPORTED_MODULE_3__Types_fs__["c" /* InlineElement */](0, new __WEBPACK_IMPORTED_MODULE_3__Types_fs__["m" /* TFrmtedString */](2, "Footer" + $var19[1].toString()))]), $var19[2]];
                        }

                    case 1:
                        var matchCitation = function matchCitation(id_1, pObjs_1) {
                            var s;
                            var inLineRef;

                            matchCitation: while (true) {
                                var $var21 = pObjs_1.tail != null ? pObjs_1.head.tag === 9 ? (s = pObjs_1.head.data[0], inLineRef = pObjs_1.head.data[1], s === id_1) ? [0, pObjs_1.head.data[1], pObjs_1.head.data[0]] : [1] : [1] : [1];

                                switch ($var21[0]) {
                                    case 0:
                                        return $var21[1];

                                    case 1:
                                        if (pObjs_1.tail == null) {
                                            return null;
                                        } else {
                                            id_1 = id_1;
                                            pObjs_1 = pObjs_1.tail;
                                            continue matchCitation;
                                        }

                                }
                            }
                        };

                        var ft_1 = matchCitation($var19[2], ftLst_1);

                        if (ft_1 == null) {
                            return [Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([new __WEBPACK_IMPORTED_MODULE_3__Types_fs__["c" /* InlineElement */](0, new __WEBPACK_IMPORTED_MODULE_3__Types_fs__["m" /* TFrmtedString */](2, "Footer " + $var19[2] + " not found"))]), $var19[1]];
                        } else {
                            return [Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([new __WEBPACK_IMPORTED_MODULE_3__Types_fs__["c" /* InlineElement */](1, [Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(ft_1), "#footnot-" + $var19[2]])]), $var19[1]];
                        }

                    case 2:
                        var str = Object(__WEBPACK_IMPORTED_MODULE_4__Shared_fs__["e" /* mapTok */])(Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_Seq__["h" /* item */])(0, toks_1));
                        return [new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_3__Types_fs__["c" /* InlineElement */](0, new __WEBPACK_IMPORTED_MODULE_3__Types_fs__["m" /* TFrmtedString */](2, str)), currentLine), Object(__WEBPACK_IMPORTED_MODULE_4__Shared_fs__["l" /* xOnwards */])(1, toks_1)];
                }
            }
        }
    };

    var parseInLines = function parseInLines(currentLine_1, toks_2) {
        if (toks_2.tail == null) {
            return new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]();
        } else {
            var patternInput = parseInLineElements_(ftLst, currentLine_1, toks_2);

            if (patternInput[1].tail == null) {
                return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(patternInput[0]);
            } else {
                return combineLiterals(parseInLines(patternInput[0], patternInput[1]));
            }
        }
    };

    return parseInLines(new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](), toks);
}
function parseInLineElements(toks) {
    return parseInLineElements2(new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](), toks);
}

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CellReference; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Operand; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Expr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return TExpr; });
/* harmony export (immutable) */ __webpack_exports__["k"] = whitespaceFilter;
/* harmony export (immutable) */ __webpack_exports__["f"] = countDelim;
/* harmony export (immutable) */ __webpack_exports__["g"] = delimSplit;
/* unused harmony export listCopies */
/* unused harmony export unfoldTuple3 */
/* harmony export (immutable) */ __webpack_exports__["e"] = cellRange;
/* harmony export (immutable) */ __webpack_exports__["j"] = simpleLex;
/* unused harmony export lexY */
/* harmony export (immutable) */ __webpack_exports__["i"] = round;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return logger; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_Result__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_String__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_Seq__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_RegExp__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Types_fs__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Logger_Logger_fs__ = __webpack_require__(10);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }













var CellReference = function () {
    function CellReference(tag, data) {
        _classCallCheck(this, CellReference);

        this.tag = tag | 0;
        this.data = data;
    }

    _createClass(CellReference, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["a" /* default */].reflection,
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
            return this === other || this.tag === other.tag && Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["l" /* equals */])(this.data, other.data);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["j" /* compareUnions */])(this, other) | 0;
        }
    }]);

    return CellReference;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["b" /* setType */])("MarkalcShared.CellReference", CellReference);
var Operand = function () {
    function Operand(tag, data) {
        _classCallCheck(this, Operand);

        this.tag = tag | 0;
        this.data = data;
    }

    _createClass(Operand, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["a" /* default */].reflection,
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
            return this === other || this.tag === other.tag && Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["l" /* equals */])(this.data, other.data);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["j" /* compareUnions */])(this, other) | 0;
        }
    }]);

    return Operand;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["b" /* setType */])("MarkalcShared.Operand", Operand);
var Expr = function () {
    function Expr(tag, data) {
        _classCallCheck(this, Expr);

        this.tag = tag | 0;
        this.data = data;
    }

    _createClass(Expr, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "MarkalcShared.Expr",
                interfaces: ["FSharpUnion"],
                cases: [["BinExp", Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["b" /* Function */])(["number", "number", "number"]), Expr, Expr], ["Op", Operand], ["CommaFunction", "string", Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["o" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */], {
                    T: Expr
                })]]
            };
        }
    }]);

    return Expr;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["b" /* setType */])("MarkalcShared.Expr", Expr);
var TExpr = function () {
    function TExpr(tag, data) {
        _classCallCheck(this, TExpr);

        this.tag = tag | 0;
        this.data = data;
    }

    _createClass(TExpr, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "MarkalcShared.TExpr",
                interfaces: ["FSharpUnion"],
                cases: [["DPExp", Expr, "number"]]
            };
        }
    }]);

    return TExpr;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["b" /* setType */])("MarkalcShared.TExpr", TExpr);
function whitespaceFilter(lst) {
    return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["d" /* filter */])(function (_arg1) {
        return _arg1.tag === 2 ? false : true;
    }, lst);
}
function countDelim(delim, tokList) {
    return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["d" /* filter */])(function (_arg1) {
        return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["l" /* equals */])(_arg1, delim) ? true : false;
    }, tokList).length | 0;
}
function delimSplit(last, delim, t) {
    var delimSplitFirst_ = function delimSplitFirst_(delim_1, before, t_1) {
        delimSplitFirst_: while (true) {
            var $var1 = t_1.tail != null ? Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["l" /* equals */])(t_1.head, delim_1) ? [0, t_1.tail, t_1.head] : [1] : [1];

            switch ($var1[0]) {
                case 0:
                    return new __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](0, [before, $var1[1]]);

                case 1:
                    if (t_1.tail == null) {
                        return new __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](1, [before, new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]()]);
                    } else {
                        delim_1 = delim_1;
                        before = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](t_1.head, before);
                        t_1 = t_1.tail;
                        continue delimSplitFirst_;
                    }

            }
        }
    };

    var delimSplitLast_ = function delimSplitLast_(delim_2, before_1, t_2) {
        var d;
        var after_1;

        delimSplitLast_: while (true) {
            var matchValue = [t_2, countDelim(delim_2, t_2)];
            var $var2 = matchValue[0].tail != null ? matchValue[1] === 1 ? (d = matchValue[0].head, after_1 = matchValue[0].tail, Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["l" /* equals */])(d, delim_2)) ? [0, matchValue[0].tail, matchValue[0].head] : [1] : [1] : [1];

            switch ($var2[0]) {
                case 0:
                    return new __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](0, [before_1, $var2[1]]);

                case 1:
                    if (matchValue[0].tail == null) {
                        return new __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](1, [before_1, new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]()]);
                    } else {
                        var x = matchValue[0].head;
                        var after = matchValue[0].tail;
                        delim_2 = delim_2;
                        before_1 = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](x, before_1);
                        t_2 = after;
                        continue delimSplitLast_;
                    }

            }
        }
    };

    var searchFunc = last ? delimSplitLast_ : delimSplitFirst_;
    return function (_arg1) {
        if (_arg1.tag === 0) {
            var before_2 = _arg1.data[0];
            var a = _arg1.data[1];
            return new __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](0, [Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(before_2), a]);
        } else {
            var before_3 = _arg1.data[0];
            var a_1 = _arg1.data[1];
            return new __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](1, [Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(before_3), a_1]);
        }
    }(searchFunc(delim, new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](), t));
}
function listCopies(i, lst) {
    if (i === 0) {
        return new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]();
    } else if (i === 1) {
        return lst;
    } else if (i < 0) {
        return Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_String__["g" /* toFail */])(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_String__["b" /* printf */])("Negative argument: %A"))(i);
    } else {
        return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["a" /* append */])(lst, listCopies(i - 1, lst));
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
            return Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_Seq__["n" /* toList */])(Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_Seq__["k" /* range */])(a, b));
        } else {
            return Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_Seq__["n" /* toList */])(Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_Seq__["k" /* range */])(b, a));
        }
    };

    var matchValue_1 = [p1r === p2r, p1c === p2c];

    if (matchValue_1[0]) {
        if (matchValue_1[1]) {
            return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([new CellReference(0, [p1r, p1c])]);
        } else {
            return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["f" /* map */])(function ($var3) {
                return function (tupledArg) {
                    return new CellReference(0, [tupledArg[0], tupledArg[1]]);
                }(function (i) {
                    return [p1r, i];
                }($var3));
            }, genList(p1c, p2c));
        }
    } else if (matchValue_1[1]) {
        return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["f" /* map */])(function ($var4) {
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
        var m = Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_RegExp__["c" /* match */])(txt_1, "^" + r);
        var matchValue = m != null;

        if (matchValue) {
            return [m[0], txt_1.substr(m[0].length)];
        } else {
            return null;
        }
    };

    var simpleLex_ = function simpleLex_(a, txt_2) {
        simpleLex_: while (true) {
            var activePatternResult931 = _RegexMatch___("[\\s]+", txt_2);

            if (activePatternResult931 != null) {
                a = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["r" /* Token */](2, Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult931)[0].length), a);
                txt_2 = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult931)[1];
                continue simpleLex_;
            } else {
                var activePatternResult929 = _RegexMatch___("[0-9]+", txt_2);

                if (activePatternResult929 != null) {
                    a = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["r" /* Token */](3, Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult929)[0]), a);
                    txt_2 = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult929)[1];
                    continue simpleLex_;
                } else {
                    var activePatternResult927 = _RegexMatch___("\\^", txt_2);

                    if (activePatternResult927 != null) {
                        a = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["r" /* Token */](34), a);
                        txt_2 = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult927)[1];
                        continue simpleLex_;
                    } else {
                        var activePatternResult925 = _RegexMatch___("\\%", txt_2);

                        if (activePatternResult925 != null) {
                            a = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["r" /* Token */](35), a);
                            txt_2 = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult925)[1];
                            continue simpleLex_;
                        } else {
                            var activePatternResult923 = _RegexMatch___("\\*", txt_2);

                            if (activePatternResult923 != null) {
                                a = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["r" /* Token */](9), a);
                                txt_2 = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult923)[1];
                                continue simpleLex_;
                            } else {
                                var activePatternResult921 = _RegexMatch___("\\/", txt_2);

                                if (activePatternResult921 != null) {
                                    a = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["r" /* Token */](25), a);
                                    txt_2 = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult921)[1];
                                    continue simpleLex_;
                                } else {
                                    var activePatternResult919 = _RegexMatch___("\\+", txt_2);

                                    if (activePatternResult919 != null) {
                                        a = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["r" /* Token */](8), a);
                                        txt_2 = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult919)[1];
                                        continue simpleLex_;
                                    } else {
                                        var activePatternResult917 = _RegexMatch___("\\-", txt_2);

                                        if (activePatternResult917 != null) {
                                            a = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["r" /* Token */](7), a);
                                            txt_2 = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult917)[1];
                                            continue simpleLex_;
                                        } else {
                                            var activePatternResult915 = _RegexMatch___("\\(", txt_2);

                                            if (activePatternResult915 != null) {
                                                a = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["r" /* Token */](22), a);
                                                txt_2 = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult915)[1];
                                                continue simpleLex_;
                                            } else {
                                                var activePatternResult913 = _RegexMatch___("\\)", txt_2);

                                                if (activePatternResult913 != null) {
                                                    a = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["r" /* Token */](23), a);
                                                    txt_2 = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult913)[1];
                                                    continue simpleLex_;
                                                } else {
                                                    var activePatternResult911 = _RegexMatch___("\\[", txt_2);

                                                    if (activePatternResult911 != null) {
                                                        a = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["r" /* Token */](20), a);
                                                        txt_2 = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult911)[1];
                                                        continue simpleLex_;
                                                    } else {
                                                        var activePatternResult909 = _RegexMatch___("\\]", txt_2);

                                                        if (activePatternResult909 != null) {
                                                            a = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["r" /* Token */](21), a);
                                                            txt_2 = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult909)[1];
                                                            continue simpleLex_;
                                                        } else {
                                                            var activePatternResult907 = _RegexMatch___("\\=", txt_2);

                                                            if (activePatternResult907 != null) {
                                                                a = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["r" /* Token */](6), a);
                                                                txt_2 = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult907)[1];
                                                                continue simpleLex_;
                                                            } else {
                                                                var activePatternResult905 = _RegexMatch___("\\.", txt_2);

                                                                if (activePatternResult905 != null) {
                                                                    a = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["r" /* Token */](10), a);
                                                                    txt_2 = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult905)[1];
                                                                    continue simpleLex_;
                                                                } else {
                                                                    var activePatternResult903 = _RegexMatch___("\\,", txt_2);

                                                                    if (activePatternResult903 != null) {
                                                                        a = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["r" /* Token */](11), a);
                                                                        txt_2 = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult903)[1];
                                                                        continue simpleLex_;
                                                                    } else {
                                                                        var activePatternResult901 = _RegexMatch___("\\{", txt_2);

                                                                        if (activePatternResult901 != null) {
                                                                            a = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["r" /* Token */](28), a);
                                                                            txt_2 = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult901)[1];
                                                                            continue simpleLex_;
                                                                        } else {
                                                                            var activePatternResult899 = _RegexMatch___("\\}", txt_2);

                                                                            if (activePatternResult899 != null) {
                                                                                a = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["r" /* Token */](29), a);
                                                                                txt_2 = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult899)[1];
                                                                                continue simpleLex_;
                                                                            } else {
                                                                                var activePatternResult897 = _RegexMatch___("[a-zA-z]+[0-9]*( [a-zA-z]+[0-9]*)*", txt_2);

                                                                                if (activePatternResult897 != null) {
                                                                                    a = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["r" /* Token */](1, Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult897)[0]), a);
                                                                                    txt_2 = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult897)[1];
                                                                                    continue simpleLex_;
                                                                                } else {
                                                                                    var activePatternResult895 = _RegexMatch___("\\|", txt_2);

                                                                                    if (activePatternResult895 != null) {
                                                                                        a = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["r" /* Token */](5), a);
                                                                                        txt_2 = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult895)[1];
                                                                                        continue simpleLex_;
                                                                                    } else {
                                                                                        var activePatternResult893 = _RegexMatch___("\\:", txt_2);

                                                                                        if (activePatternResult893 != null) {
                                                                                            a = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["r" /* Token */](33), a);
                                                                                            txt_2 = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult893)[1];
                                                                                            continue simpleLex_;
                                                                                        } else {
                                                                                            var activePatternResult891 = _RegexMatch___("\\;", txt_2);

                                                                                            if (activePatternResult891 != null) {
                                                                                                a = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["r" /* Token */](36), a);
                                                                                                txt_2 = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult891)[1];
                                                                                                continue simpleLex_;
                                                                                            } else if (txt_2 === "") {
                                                                                                return a;
                                                                                            } else {
                                                                                                return Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_String__["g" /* toFail */])(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_String__["b" /* printf */])("Unexpected character: %A"))(txt_2);
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

    return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(simpleLex_(new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](), txt));
}
function lexY(x, y, z) {
    return [x, simpleLex(y), z];
}
function round(dp, f) {
    return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["p" /* round */])(f, dp);
}
var logger = new __WEBPACK_IMPORTED_MODULE_9__Logger_Logger_fs__["a" /* Logger */](1);

/***/ }),
/* 23 */
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_RegExp__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Seq__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_String__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__ = __webpack_require__(4);





function takeFirst(a, _arg1, _arg2) {
    return a;
}
function strRegexMatch(regex, str) {
    var m = Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_RegExp__["c" /* match */])(Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_RegExp__["a" /* create */])(regex), str);

    if (m != null) {
        var mLst = Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Seq__["n" /* toList */])(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Seq__["d" /* delay */])(function () {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Seq__["i" /* map */])(function (x) {
                return x || "";
            }, m);
        }));
        return [Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["e" /* head */])(mLst), Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["l" /* tail */])(mLst)];
    } else {
        return null;
    }
}
function strStartsWith(value, str) {
    return str.indexOf(value) === 0;
}
function toString(c) {
    return Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_String__["a" /* join */])("", Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([c]));
}
function strReplace(o, n, s) {
    return Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_String__["c" /* replace */])(s, o, n);
}

function _RegexMatch___(regex, str) {
    var matchValue = strRegexMatch(regex, str);

    if (matchValue != null) {
        var m = Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(matchValue)[0];
        var grp = Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(matchValue)[1];
        var lchar = m.length | 0;
        return [m, grp, str.slice(lchar, str.length)];
    } else {
        return null;
    }
}


function literalString(charList) {
    var addEscape = function addEscape(tupledArg) {
        var folder;
        return (folder = function folder(st, n) {
            return strReplace(n, "\\" + n, st);
        }, function (list) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Seq__["f" /* fold */])(folder, tupledArg[0], list);
        })(Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])(["\\", ".", "^", "$", "*", "+", "-", "?", "(", ")", "[", "]", "{", "}", "|", "/"]));
    };

    return function (c) {
        return "^.+?(?=\\s|" + c + "$)";
    }(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Seq__["f" /* fold */])(function (x, y) {
        return x + y;
    }, "", Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["f" /* map */])(function ($var1) {
        return function (a) {
            return a + "|";
        }(addEscape($var1));
    }, charList)));
}

function _CharMatch___(retLastMatch, a, charList, str) {
    var state;

    var testStartWith = function testStartWith(tupledArg) {
        var ch = a + tupledArg[0];
        return [strStartsWith(ch, str), ch, tupledArg[1]];
    };

    return (state = null, function (list) {
        return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Seq__["f" /* fold */])(retLastMatch, state, list);
    })(Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["f" /* map */])(testStartWith, charList));
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

    var activePatternResult539 = _RegexMatch___(str, _arg1);

    if (activePatternResult539 != null) {
        if (Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult539)[1].tail != null) {
            if (Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult539)[1].tail.tail == null) {
                $var2 = [0, Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult539)[0], Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult539)[2], Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult539)[1].head];
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
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FMarkFable_fs__ = __webpack_require__(25);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "processMarkdownString", function() { return __WEBPACK_IMPORTED_MODULE_0__FMarkFable_fs__["a"]; });


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = processMarkdownString;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Common_FMark_fs__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Common_Types_fs__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_Seq__ = __webpack_require__(1);



function processMarkdownString(fileDir, str) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__Common_FMark_fs__["a" /* processString */])(fileDir, new __WEBPACK_IMPORTED_MODULE_1__Common_Types_fs__["e" /* OutFormat */](0))(Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_Seq__["n" /* toList */])(str));
}

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export preLexParse */
/* unused harmony export processString$27$ */
/* harmony export (immutable) */ __webpack_exports__["a"] = processString;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Parser_Parser_fs__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Lexer_Lexer_fs__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Lexer_Preprocessor_fs__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Result__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__MarkdownGen_MarkdownGen_fs__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__HTMLGen_HTMLGen_fs__ = __webpack_require__(39);







function preLexParse(dir) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(function ($var2) {
        return Object(__WEBPACK_IMPORTED_MODULE_1__Parser_Parser_fs__["a" /* parse */])(function ($var1) {
            return Object(__WEBPACK_IMPORTED_MODULE_2__Lexer_Lexer_fs__["a" /* lexList */])(Object(__WEBPACK_IMPORTED_MODULE_3__Lexer_Preprocessor_fs__["a" /* preprocessListWithDir */])(dir)($var1));
        }($var2));
    });
}

function processString_(dir, formatFunc) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(function ($var3) {
        return function (result) {
            return Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Result__["c" /* map */])(formatFunc, result);
        }(preLexParse(dir)($var3));
    });
}


function processString(dir, format) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(format.tag === 1 ? processString_(dir, __WEBPACK_IMPORTED_MODULE_5__MarkdownGen_MarkdownGen_fs__["a" /* mdBody */]) : processString_(dir, __WEBPACK_IMPORTED_MODULE_6__HTMLGen_HTMLGen_fs__["a" /* strBody */]));
}

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export parseCode */
/* unused harmony export parseParagraph */
/* unused harmony export $7C$MatchTable$7C$_$7C$ */
/* unused harmony export headerIDGen */
/* unused harmony export parseList */
/* unused harmony export parseItem */
/* unused harmony export parseItemList */
/* harmony export (immutable) */ __webpack_exports__["a"] = parse;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Result__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Shared_fs__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_String__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ParserHelperFuncs_fs__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Types_fs__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_Seq__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Markalc_Markalc_fs__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Logger_Logger_fs__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__TOCite_TOCite_fs__ = __webpack_require__(32);














function parseCode(toks) {
    if (toks.tail != null) {
        if (toks.head.tag === 30) {
            return new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](0, ["", Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["j" /* slice */])(1, null, toks)]);
        } else {
            return Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Result__["c" /* map */])(function (tupledArg) {
                return [Object(__WEBPACK_IMPORTED_MODULE_2__Shared_fs__["e" /* mapTok */])(toks.head) + tupledArg[0], tupledArg[1]];
            }, parseCode(toks.tail));
        }
    } else {
        __WEBPACK_IMPORTED_MODULE_2__Shared_fs__["j" /* sharedLog */].Warn(null, Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_String__["h" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_String__["b" /* printf */])("%A"))(toks));
        return new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](0, ["\\`", Object(__WEBPACK_IMPORTED_MODULE_2__Shared_fs__["l" /* xOnwards */])(1, toks)]);
    }
}
function parseParagraph(ftLst, toks) {
    var state;

    var parseParagraph_ = function parseParagraph_(lines, tokLine) {
        return new __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](Object(__WEBPACK_IMPORTED_MODULE_4__ParserHelperFuncs_fs__["j" /* parseInLineElements2 */])(ftLst, tokLine), lines);
    };

    return new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["h" /* ParsedObj */](4, Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])((state = new __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](), function (list) {
        return Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_Seq__["f" /* fold */])(parseParagraph_, state, list);
    })(Object(__WEBPACK_IMPORTED_MODULE_4__ParserHelperFuncs_fs__["f" /* cutIntoLines */])(Object(__WEBPACK_IMPORTED_MODULE_4__ParserHelperFuncs_fs__["k" /* trimENDLINEs */])(toks)))));
}

function _MatchTable___(toks) {
    var tableTransform = function tableTransform(tupledArg) {
        return function (_arg1) {
            if (_arg1.tag === 1) {
                return null;
            } else {
                var toPCellList = function toPCellList(cell) {
                    var patternInput = cell.GetParams;
                    var pCellLine = Object(__WEBPACK_IMPORTED_MODULE_4__ParserHelperFuncs_fs__["i" /* parseInLineElements */])(patternInput[0]);
                    return new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["f" /* PCell */](0, [pCellLine, patternInput[1], patternInput[2]]);
                };

                var toPRow = function toPRow(row) {
                    var patternInput_1 = function (_arg2) {
                        return [_arg2.data[0], _arg2.data[1]];
                    }(row);

                    return new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["g" /* PRow */](0, [Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["f" /* map */])(toPCellList, patternInput_1[0]), patternInput_1[1]]);
                };

                return [new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["h" /* ParsedObj */](6, Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["f" /* map */])(toPRow, _arg1.data)), tupledArg[1]];
            }
        }(Object(__WEBPACK_IMPORTED_MODULE_7__Markalc_Markalc_fs__["a" /* parseEvaluateTable */])(tupledArg[0]));
    };

    var activePatternResult1410 = Object(__WEBPACK_IMPORTED_MODULE_4__ParserHelperFuncs_fs__["c" /* $7C$MatchTableHead$7C$_$7C$ */])(toks);

    if (activePatternResult1410 != null) {
        var activePatternResult1409 = Object(__WEBPACK_IMPORTED_MODULE_4__ParserHelperFuncs_fs__["b" /* $7C$MatchTableFormater$7C$_$7C$ */])(Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult1410));

        if (activePatternResult1409 != null) {
            return tableTransform(Object(__WEBPACK_IMPORTED_MODULE_4__ParserHelperFuncs_fs__["g" /* cutTableRows */])(toks));
        } else {
            return null;
        }
    } else {
        return null;
    }
}


function headerIDGen(id, hd) {
    var headerIDGen_ = function headerIDGen_(hdLine) {
        var $var1 = hdLine.tail != null ? hdLine.head.tag === 0 ? hdLine.head.data.tag === 2 ? [0, hdLine.head.data.data, hdLine.tail] : hdLine.head.data.tag === 1 ? [1, hdLine.head.data.data, hdLine.tail] : [2] : [2] : [2];

        switch ($var1[0]) {
            case 0:
                return $var1[1] + headerIDGen_($var1[2]);

            case 1:
                return headerIDGen_($var1[1]) + headerIDGen_($var1[2]);

            case 2:
                return "";
        }
    };

    return headerIDGen_(hd.HeaderName) + id.toString();
}
function parseList(toks) {
    var ignoreError = function ignoreError(result) {
        if (result.tag === 1) {
            return result.data;
        } else {
            return result.data;
        }
    };

    var takeAwayWhiteSpaces = function takeAwayWhiteSpaces(toks_1) {
        var $var2 = toks_1.tail != null ? toks_1.head.tag === 2 ? [0, toks_1.head.data, toks_1.tail] : [1] : [1];

        switch ($var2[0]) {
            case 0:
                return [~~($var2[1] / 2), $var2[2]];

            case 1:
                return [0, toks_1];
        }
    };

    var excludeSelfSkip = function excludeSelfSkip(x) {
        if (x != null) {
            if (Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(x) === 1) {
                return null;
            } else {
                return Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(x) - 1;
            }
        } else {
            return null;
        }
    };

    var _GetLIContent___ = function _GetLIContent___(toks_2) {
        var patternInput = takeAwayWhiteSpaces(toks_2);
        var $var3 = patternInput[1].tail != null ? patternInput[1].head.tag === 9 ? patternInput[1].tail.tail != null ? patternInput[1].tail.head.tag === 2 ? [0] : [2] : [2] : patternInput[1].head.tag === 7 ? patternInput[1].tail.tail != null ? patternInput[1].tail.head.tag === 2 ? [0] : [2] : [2] : patternInput[1].head.tag === 3 ? patternInput[1].tail.tail != null ? patternInput[1].tail.head.tag === 10 ? patternInput[1].tail.tail.tail != null ? patternInput[1].tail.tail.head.tag === 2 ? [1] : [2] : [2] : [2] : [2] : [2] : [2];

        switch ($var3[0]) {
            case 0:
                return [new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["q" /* TListType */](0), patternInput[0], Object(__WEBPACK_IMPORTED_MODULE_2__Shared_fs__["l" /* xOnwards */])(2, patternInput[1])];

            case 1:
                return [new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["q" /* TListType */](1), patternInput[0], Object(__WEBPACK_IMPORTED_MODULE_2__Shared_fs__["l" /* xOnwards */])(3, patternInput[1])];

            case 2:
                return null;
        }
    };

    var getLIContent = function getLIContent(toks_3) {
        var activePatternResult1424 = _GetLIContent___(toks_3);

        if (activePatternResult1424 != null) {
            return new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](0, Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult1424));
        } else {
            var patternInput_1 = takeAwayWhiteSpaces(toks_3);
            return new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](1, [new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["q" /* TListType */](0), patternInput_1[0], patternInput_1[1]]);
        }
    };

    var getCurrentList = function getCurrentList(level, listItems, lines) {
        getCurrentList: while (true) {
            if (lines.tail == null) {
                return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(listItems);
            } else {
                var matchValue = ignoreError(getLIContent(lines.head));

                if (matchValue[1] >= level) {
                    level = level;
                    listItems = new __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](lines.head, listItems);
                    lines = lines.tail;
                    continue getCurrentList;
                } else {
                    return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(listItems);
                }
            }
        }
    };

    var parseList_ = function parseList_(level_1, lines_1) {
        var patternInput_2 = void 0;
        var matchValue_1 = getLIContent(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["e" /* head */])(lines_1));

        if (matchValue_1.tag === 1) {
            Object(__WEBPACK_IMPORTED_MODULE_9__Logger_Logger_fs__["b" /* globLog */])().Warn(100, "invalid list item, line does not begin with [*;-;number]\ndefault to UL");
            patternInput_2 = matchValue_1.data;
        } else {
            patternInput_2 = matchValue_1.data;
        }

        var listFolder = function listFolder(tupledArg, line) {
            if (tupledArg[2] != null) {
                if (Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(tupledArg[2]) === 1) {
                    return [tupledArg[0], tupledArg[1], null, tupledArg[3] + 1];
                } else if (Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(tupledArg[2]) > 1) {
                    return [tupledArg[0], tupledArg[1], Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(tupledArg[2]) - 1, tupledArg[3] + 1];
                } else {
                    throw new Error("negative or zero skip number, not possible");
                }
            } else {
                var matchValue_2 = ignoreError(getLIContent(line));

                if (matchValue_2[1] === tupledArg[0]) {
                    var tLine = Object(__WEBPACK_IMPORTED_MODULE_4__ParserHelperFuncs_fs__["i" /* parseInLineElements */])(matchValue_2[2]);
                    return [tupledArg[0], new __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["p" /* TListItem */](1, tLine), tupledArg[1]), null, tupledArg[3] + 1];
                } else if (matchValue_2[1] > tupledArg[0]) {
                    var patternInput_3 = Object(__WEBPACK_IMPORTED_MODULE_10__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(parseList_)(tupledArg[0] + 1)(Object(__WEBPACK_IMPORTED_MODULE_10__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(getCurrentList)(tupledArg[0] + 1, new __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]())(Object(__WEBPACK_IMPORTED_MODULE_2__Shared_fs__["l" /* xOnwards */])(tupledArg[3], lines_1)));
                    return [tupledArg[0], new __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["p" /* TListItem */](0, patternInput_3[0]), tupledArg[1]), excludeSelfSkip(patternInput_3[1]), tupledArg[3] + 1];
                } else {
                    throw new Error("list item level < current level, not possible");
                }
            }
        };

        return function (tupledArg_1) {
            var doSkip = void 0;
            var matchValue_3 = lines_1.length | 0;

            if (matchValue_3 === 0) {
                doSkip = null;
            } else {
                doSkip = matchValue_3;
            }

            return [new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["o" /* TList */](patternInput_2[0], Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(tupledArg_1[1]), patternInput_2[1]), doSkip];
        }(Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_Seq__["f" /* fold */])(listFolder, [level_1, new __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](), null, 0], lines_1));
    };

    return Object(__WEBPACK_IMPORTED_MODULE_10__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(parseList_)(0)(Object(__WEBPACK_IMPORTED_MODULE_4__ParserHelperFuncs_fs__["f" /* cutIntoLines */])(Object(__WEBPACK_IMPORTED_MODULE_4__ParserHelperFuncs_fs__["k" /* trimENDLINEs */])(toks)))[0];
}
function parseItem(hdLst, ftLst, rawToks) {
    var toks = Object(__WEBPACK_IMPORTED_MODULE_4__ParserHelperFuncs_fs__["h" /* deleteLeadingENDLINEs */])(rawToks);
    var $var4 = void 0;

    if (toks.tail != null) {
        if (toks.head.tag === 0) {
            $var4 = [0, toks.head.data[0], toks.head.data[1], toks.tail];
        } else {
            var activePatternResult1448 = _MatchTable___(toks);

            if (activePatternResult1448 != null) {
                $var4 = [1, Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult1448)[0], Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult1448)[1]];
            } else {
                $var4 = [2];
            }
        }
    } else {
        var activePatternResult1449 = _MatchTable___(toks);

        if (activePatternResult1449 != null) {
            $var4 = [1, Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult1449)[0], Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult1449)[1]];
        } else {
            $var4 = [2];
        }
    }

    switch ($var4[0]) {
        case 0:
            return new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](0, [new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["h" /* ParsedObj */](0, [$var4[1], $var4[2]]), $var4[3]]);

        case 1:
            return new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](0, [$var4[1], $var4[2]]);

        case 2:
            var activePatternResult1447 = Object(__WEBPACK_IMPORTED_MODULE_4__ParserHelperFuncs_fs__["a" /* $7C$MatchQuote$7C$_$7C$ */])(toks);

            if (activePatternResult1447 != null) {
                return new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](0, [new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["h" /* ParsedObj */](5, Object(__WEBPACK_IMPORTED_MODULE_4__ParserHelperFuncs_fs__["j" /* parseInLineElements2 */])(ftLst, Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult1447)[0])), Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult1447)[1]]);
            } else {
                var $var5 = void 0;

                if (toks.tail != null) {
                    if (toks.head.tag === 37) {
                        $var5 = [0, toks.head.data, toks.tail];
                    } else {
                        var activePatternResult1445 = Object(__WEBPACK_IMPORTED_MODULE_4__ParserHelperFuncs_fs__["d" /* $7C$PickoutList$7C$_$7C$ */])(toks);

                        if (activePatternResult1445 != null) {
                            $var5 = [1, Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult1445)[0], Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult1445)[1]];
                        } else {
                            $var5 = [2];
                        }
                    }
                } else {
                    var activePatternResult1446 = Object(__WEBPACK_IMPORTED_MODULE_4__ParserHelperFuncs_fs__["d" /* $7C$PickoutList$7C$_$7C$ */])(toks);

                    if (activePatternResult1446 != null) {
                        $var5 = [1, Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult1446)[0], Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult1446)[1]];
                    } else {
                        $var5 = [2];
                    }
                }

                switch ($var5[0]) {
                    case 0:
                        return new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](0, [new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["h" /* ParsedObj */](1, [Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_Seq__["h" /* item */])($var5[1], hdLst), headerIDGen($var5[1], Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_Seq__["h" /* item */])($var5[1], hdLst))]), $var5[2]]);

                    case 1:
                        return new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](0, [new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["h" /* ParsedObj */](3, parseList($var5[1])), $var5[2]]);

                    case 2:
                        var activePatternResult1444 = Object(__WEBPACK_IMPORTED_MODULE_4__ParserHelperFuncs_fs__["e" /* $7C$PickoutParagraph$7C$_$7C$ */])(toks);

                        if (activePatternResult1444 != null) {
                            return new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](0, [parseParagraph(ftLst, Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult1444)[0]), Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult1444)[1]]);
                        } else {
                            return new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](1, Object(__WEBPACK_IMPORTED_MODULE_2__Shared_fs__["g" /* removeChars */])(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])(["[", "]"]), Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_String__["h" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_String__["b" /* printf */])("Parse item did not match: %A"))(toks)));
                        }

                }
            }

    }
}
function parseItemList(hdLst, ftLst, toks) {
    var matchValue = [toks.tail == null, !Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_Seq__["e" /* exists */])(function (_arg1) {
        var $var6 = _arg1.tag === 2 ? [0] : _arg1.tag === 32 ? [0] : [1];

        switch ($var6[0]) {
            case 0:
                return false;

            case 1:
                return true;
        }
    }, toks)];
    var $var7 = matchValue[0] ? [1] : matchValue[1] ? [1] : [0];

    switch ($var7[0]) {
        case 0:
            return Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Result__["a" /* bind */])(function (tupledArg) {
                var matchValue_1 = tupledArg[1].tail == null;

                if (matchValue_1) {
                    return new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](0, [Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([tupledArg[0]]), null]);
                } else {
                    return Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Result__["c" /* map */])(function (tupledArg_1) {
                        return [new __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](tupledArg[0], tupledArg_1[0]), tupledArg_1[1]];
                    }, parseItemList(hdLst, ftLst, tupledArg[1]));
                }
            }, parseItem(hdLst, ftLst, toks));

        case 1:
            return new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](0, [new __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](), null]);
    }
}
function parse(toks) {
    var patternInput = Object(__WEBPACK_IMPORTED_MODULE_11__TOCite_TOCite_fs__["a" /* preParser */])(toks);
    return Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Result__["c" /* map */])(function (pObjs) {
        return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["a" /* append */])(pObjs, patternInput[1]);
    }, Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Result__["a" /* bind */])(function (tupledArg) {
        return tupledArg[1] != null ? new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](1, Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_String__["h" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_String__["b" /* printf */])("Some unparsed tokens: %A"))(Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(tupledArg[1]))) : new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](0, tupledArg[0]);
    }, parseItemList(patternInput[0], patternInput[1], patternInput[2])));
}

/***/ }),
/* 28 */
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
/* 29 */
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
/* unused harmony export evaluateRowList */
/* harmony export (immutable) */ __webpack_exports__["a"] = parseEvaluateTable;
/* unused harmony export lexParseEvaluate */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Types_fs__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__MarkalcShared_fs__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Logger_Logger_fs__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_String__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_Result__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Seq__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Shared_fs__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__nuget_packages_fable_core_1_3_11_fable_core_Map__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__nuget_packages_fable_core_1_3_11_fable_core_Option__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Expression_fs__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__nuget_packages_fable_core_1_3_11_fable_core_Comparer__ = __webpack_require__(13);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }


















var MapContents = function () {
    function MapContents(tag, data) {
        _classCallCheck(this, MapContents);

        this.tag = tag | 0;
        this.data = data;
    }

    _createClass(MapContents, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Markalc.MapContents",
                interfaces: ["FSharpUnion"],
                cases: [["MapTok", __WEBPACK_IMPORTED_MODULE_1__Types_fs__["b" /* Cell */]], ["MapExp", __WEBPACK_IMPORTED_MODULE_2__MarkalcShared_fs__["d" /* TExpr */], __WEBPACK_IMPORTED_MODULE_1__Types_fs__["b" /* Cell */]]]
            };
        }
    }]);

    return MapContents;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["b" /* setType */])("Markalc.MapContents", MapContents);
function pipeSplit(toks) {
    return Object(__WEBPACK_IMPORTED_MODULE_2__MarkalcShared_fs__["g" /* delimSplit */])(false, new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["r" /* Token */](5), toks);
}
function toToken(x) {
    return new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["r" /* Token */](3, x.toString());
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
            throw new Error(Object(__WEBPACK_IMPORTED_MODULE_3__Logger_Logger_fs__["c" /* logPass */])(27, Object(__WEBPACK_IMPORTED_MODULE_3__Logger_Logger_fs__["b" /* globLog */])().Fatal, Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_String__["h" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_String__["b" /* printf */])("After filtering, there were still Error monads in the list %A."))(_arg1.data)));
        } else {
            return _arg1.data;
        }
    };

    var combineErrors = function combineErrors(s, x_1) {
        if (x_1.tag === 1) {
            return new __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](1, Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_String__["h" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_String__["b" /* printf */])("%A %A"))(x_1.data, s));
        } else {
            return s;
        }
    };

    var matchValue = Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["d" /* filter */])(filt, lst);

    if (matchValue.tail == null) {
        return new __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](0, Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["f" /* map */])(unpackOks, lst));
    } else {
        return Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Seq__["f" /* fold */])(combineErrors, new __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](1, ""), matchValue);
    }
}
function liftFirstArg(func, arg1, arg2) {
    if (arg1.tag === 1) {
        return new __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](1, arg1.data);
    } else {
        return new __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](0, func(arg1.data, arg2));
    }
}
function makeCellU(header, tokens) {
    return [tokens, header];
}
var defaultCellU = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(function (tokens) {
    return makeCellU(false, tokens);
});
var headCellU = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(function (tokens) {
    return makeCellU(true, tokens);
});
function alignCell(alignment, cellU_0, cellU_1) {
    var cellU = [cellU_0, cellU_1];
    return new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["b" /* Cell */](0, [cellU[0], cellU[1], alignment]);
}
function parsePipesD(debug, constructCell, row) {
    var parsePipesDebug = function parsePipesDebug(line, a, b) {
        if (debug) {
            Object(__WEBPACK_IMPORTED_MODULE_3__Logger_Logger_fs__["b" /* globLog */])().Debug(line)(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_String__["h" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_String__["b" /* printf */])("Markalc/Parse PIPES:\nBefore:%A\nAfter:%A$\n"))(a, b));
        }
    };

    var parsePipes_ = function parsePipes_(a_1, row_1) {
        parsePipes_: while (true) {
            var matchValue = pipeSplit(row_1);

            if (matchValue.tag === 1) {
                if (row_1.tail == null) {
                    return a_1;
                } else {
                    return new __WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](constructCell(row_1), a_1);
                }
            } else if (matchValue.data[0].tail == null) {
                if (matchValue.data[1].tail == null) {
                    return new __WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](constructCell(new __WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]()), a_1);
                } else {
                    var after = matchValue.data[1];
                    parsePipesDebug(55, new __WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](), after);
                    a_1 = new __WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](constructCell(new __WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]()), a_1);
                    row_1 = after;
                    continue parsePipes_;
                }
            } else if (matchValue.data[1].tail == null) {
                var before = matchValue.data[0];
                parsePipesDebug(57, before, new __WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]());
                return new __WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](constructCell(before), a_1);
            } else {
                var before_1 = matchValue.data[0];
                var after_1 = matchValue.data[1];
                parsePipesDebug(59, before_1, after_1);
                a_1 = new __WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](constructCell(before_1), a_1);
                row_1 = after_1;
                continue parsePipes_;
            }
        }
    };

    return parsePipes_(new __WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](), row);
}
function parsePipes(constructCell, row) {
    return parsePipesD(false, constructCell, row);
}
function parseRow(constructCell, row) {
    var parseRow_ = function parseRow_(row_1) {
        return parsePipes(constructCell, row_1);
    };

    return Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(function (x) {
        return x.length === 1 ? new __WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](constructCell(new __WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]()), x) : x;
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
var parseDefaultRow = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(function (row) {
    return parseRow(defaultCellU, row);
});
function parseAlignRow(row) {
    var parseAlignDebug = function parseAlignDebug(line, s) {
        return Object(__WEBPACK_IMPORTED_MODULE_3__Logger_Logger_fs__["c" /* logPass */])(line, Object(__WEBPACK_IMPORTED_MODULE_3__Logger_Logger_fs__["b" /* globLog */])().Debug, Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_String__["h" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_String__["b" /* printf */])("Markalc/parseAlignRow\n%s$"))(s));
    };

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

        var matchValue = [Object(__WEBPACK_IMPORTED_MODULE_2__MarkalcShared_fs__["f" /* countDelim */])(new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["r" /* Token */](7), toks) < 3, Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["d" /* filter */])(filt, toks).length !== toks.length];

        if (matchValue[0]) {
            if (matchValue[1]) {
                return new __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](1, Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(parseAlignDebug)(87)("Less than 3 dashes for table format and invalid characters"));
            } else {
                return new __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](1, Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(parseAlignDebug)(83)("Less than 3 dashes for table format"));
            }
        } else if (matchValue[1]) {
            return new __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](1, Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(parseAlignDebug)(84)(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_String__["h" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_String__["b" /* printf */])("Invalid characters in table format, expecting only : or - \n%A\n%A"))(toks, Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["d" /* filter */])(filt, toks))));
        } else {
            var matchValue_1 = [Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(toks), Object(__WEBPACK_IMPORTED_MODULE_2__MarkalcShared_fs__["f" /* countDelim */])(new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["r" /* Token */](33), toks)];
            var $var2 = matchValue_1[0].tail != null ? matchValue_1[0].head.tag === 33 ? matchValue_1[1] === 2 ? Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["e" /* head */])(toks).Equals(new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["r" /* Token */](33)) ? [0] : [1] : [1] : [1] : [1];

            switch ($var2[0]) {
                case 0:
                    return new __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](0, new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["a" /* Alignment */](0));

                case 1:
                    var $var3 = matchValue_1[0].tail != null ? matchValue_1[0].head.tag === 33 ? matchValue_1[1] === 1 ? [0] : [2] : matchValue_1[1] === 1 ? Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["e" /* head */])(toks).Equals(new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["r" /* Token */](33)) ? [1] : [2] : [2] : matchValue_1[1] === 1 ? Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["e" /* head */])(toks).Equals(new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["r" /* Token */](33)) ? [1] : [2] : [2];

                    switch ($var3[0]) {
                        case 0:
                            return new __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](0, new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["a" /* Alignment */](1));

                        case 1:
                            return new __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](0, new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["a" /* Alignment */](2));

                        case 2:
                            if (matchValue_1[1] === 0) {
                                return new __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](0, new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["a" /* Alignment */](3));
                            } else {
                                return new __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](1, Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(parseAlignDebug)(94)(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_String__["h" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_String__["b" /* printf */])("':'s in wrong position %A, %A"))(toks, matchValue_1[1])));
                            }

                    }

            }
        }
    };

    var parseAlign_ = function parseAlign_(row_1) {
        return parsePipes(getAlignment, row_1);
    };

    return joinErrorList(Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(function () {
        var matchValue_2 = Object(__WEBPACK_IMPORTED_MODULE_2__MarkalcShared_fs__["k" /* whitespaceFilter */])(row);
        var $var4 = matchValue_2.tail != null ? matchValue_2.head.tag === 5 ? [0, matchValue_2.tail] : [1, matchValue_2] : [1, matchValue_2];

        switch ($var4[0]) {
            case 0:
                return parseAlign_($var4[1]);

            case 1:
                return parseAlign_($var4[1]);
        }
    }()));
}

function alignCells_(alignList, row_0, row_1) {
    var matchValue;
    var row = [row_0, row_1];
    var cells = row[0];
    var head = row[1];
    var lengths = [alignList.length, cells.length];
    return [Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["f" /* map */])(function (tupledArg) {
        return alignCell(tupledArg[0], tupledArg[1][0], tupledArg[1][1]);
    }, function (list2) {
        return Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Seq__["n" /* toList */])(Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Seq__["q" /* zip */])(alignList, list2));
    }((matchValue = lengths[0] - lengths[1] | 0, matchValue > 0 ? Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["a" /* append */])(cells, Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["h" /* replicate */])(matchValue, [new __WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](), head])) : matchValue < 0 ? Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["j" /* slice */])(0, lengths[0] - 1, cells) : cells))), head];
}


var alignCells = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(function (arg1, arg2) {
    return liftFirstArg(function (alignList, tupledArg) {
        return alignCells_(alignList, tupledArg[0], tupledArg[1]);
    }, arg1, arg2);
});
function transformTable(table) {
    var alignments = parseAlignRow(Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Seq__["h" /* item */])(1, table));

    var makeRow = function makeRow(head, cells) {
        return [cells, head];
    };

    var header = Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_Result__["c" /* map */])(function (tupledArg) {
        return new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["l" /* Row */](0, [tupledArg[0], tupledArg[1]]);
    }, Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(alignCells)(alignments)(Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(makeRow)(true)(function (row) {
        return parseRow(headCellU, row);
    }(Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["e" /* head */])(table)))));

    var parseAlignPrepend = function parseAlignPrepend(s, x) {
        return new __WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_Result__["c" /* map */])(function (tupledArg_1) {
            return new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["l" /* Row */](0, [tupledArg_1[0], tupledArg_1[1]]);
        }, Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(alignCells)(alignments)(Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(makeRow)(false)(parseRow(defaultCellU, x)))), s);
    };

    return joinErrorList(Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Seq__["f" /* fold */])(parseAlignPrepend, Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([header]), Object(__WEBPACK_IMPORTED_MODULE_9__Shared_fs__["l" /* xOnwards */])(2, table))));
}

function tryEval_(maxRefs, map, e) {
    var evalExp = function evalExp(e_1) {
        var evalExp_ = function evalExp_(r, map_1, e_2) {
            var evalCellRef = function evalCellRef(ref) {
                var matchValue = Object(__WEBPACK_IMPORTED_MODULE_10__nuget_packages_fable_core_1_3_11_fable_core_Map__["d" /* tryFind */])(ref, map_1);
                var $var5 = matchValue != null ? Object(__WEBPACK_IMPORTED_MODULE_11__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(matchValue).tag === 1 ? [0, Object(__WEBPACK_IMPORTED_MODULE_11__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(matchValue).data[0]] : [1] : [1];

                switch ($var5[0]) {
                    case 0:
                        return evalExp_(r + 1, map_1, function (_arg1) {
                            return _arg1.data[0];
                        }($var5[1]));

                    case 1:
                        return Number.NaN;
                }
            };

            var rangeFunc = function rangeFunc(f, x, y) {
                var matchValue_1 = Object(__WEBPACK_IMPORTED_MODULE_2__MarkalcShared_fs__["e" /* cellRange */])(x, y);

                if (matchValue_1 == null) {
                    return Number.NaN;
                } else {
                    return f(Object(__WEBPACK_IMPORTED_MODULE_11__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(matchValue_1));
                }
            };

            if (r > maxRefs) {
                return Number.NaN;
            } else {
                var $var6 = e_2.tag === 1 ? e_2.data.tag === 2 ? [1, e_2.data.data] : e_2.data.tag === 0 ? [2, e_2.data.data] : [7] : e_2.tag === 2 ? e_2.data[0] === "SUM" ? [3, e_2.data[1]] : e_2.data[0] === "AVG" ? [4, e_2.data[1]] : e_2.data[0] === "MIN" ? [5, e_2.data[1]] : e_2.data[0] === "MAX" ? [6, e_2.data[1]] : [7] : [0, e_2.data[0], e_2.data[1], e_2.data[2]];

                switch ($var6[0]) {
                    case 0:
                        return $var6[1](evalExp_(r, map_1, $var6[2]), evalExp_(r, map_1, $var6[3]));

                    case 1:
                        return $var6[1];

                    case 2:
                        return evalCellRef($var6[1]);

                    case 3:
                        return Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Seq__["m" /* sumBy */])(Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(evalExp_)(r, map_1), $var6[1]);

                    case 4:
                        return Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Seq__["a" /* averageBy */])(Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(evalExp_)(r, map_1), $var6[1]);

                    case 5:
                        return Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Seq__["l" /* reduce */])(function (x, y) {
                            return Math.min(x, y);
                        }, Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["f" /* map */])(Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(evalExp_)(r, map_1), $var6[1]));

                    case 6:
                        return Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Seq__["l" /* reduce */])(function (x, y) {
                            return Math.max(x, y);
                        }, Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["f" /* map */])(Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(evalExp_)(r, map_1), $var6[1]));

                    case 7:
                        return 11;
                }
            }
        };

        return function (_arg2) {
            return _arg2.data[1] < 0 ? evalExp_(0, map, _arg2.data[0]) : function (f_1) {
                return Object(__WEBPACK_IMPORTED_MODULE_2__MarkalcShared_fs__["i" /* round */])(_arg2.data[1], f_1);
            }(evalExp_(0, map, _arg2.data[0]));
        }(e_1);
    };

    return evalExp(e);
}


var tryEval = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(function (map, e) {
    return tryEval_(1000, map, e);
});
function evaluateRowList(rowList) {
    var inferRow = function inferRow(cellList) {
        return new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["l" /* Row */](0, [cellList, Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["e" /* head */])(cellList).GetHead]);
    };

    var innerFold = function innerFold(row, s, cell) {
        var cCol = s[1];
        var patternInput = [new __WEBPACK_IMPORTED_MODULE_2__MarkalcShared_fs__["a" /* CellReference */](0, [row, cCol]), s[0]];
        var matchValue = Object(__WEBPACK_IMPORTED_MODULE_12__Expression_fs__["a" /* parseExpression */])(cell.GetToks);

        if (matchValue.tag === 1) {
            return [new __WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]([patternInput[0], new MapContents(0, cell)], patternInput[1]), cCol + 1];
        } else {
            return [new __WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]([patternInput[0], new MapContents(1, [matchValue.data, cell])], patternInput[1]), cCol + 1];
        }
    };

    var outerFold = function outerFold(s_1, cells) {
        var patternInput_1 = [s_1[0], s_1[1][0]];
        return [patternInput_1[0] + 1, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Seq__["f" /* fold */])(Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(innerFold)(patternInput_1[0]), [patternInput_1[1], 0], cells)];
    };

    var cellList_1 = Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["b" /* collect */])(function (_arg1) {
        return Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([_arg1.data[0]]);
    }, rowList);
    var rowLength = Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["e" /* head */])(cellList_1).length | 0;
    return function (_arg2) {
        var expRefList = _arg2[1][0];
        var expList = Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(expRefList);
        var map = Object(__WEBPACK_IMPORTED_MODULE_10__nuget_packages_fable_core_1_3_11_fable_core_Map__["b" /* create */])(expList, new __WEBPACK_IMPORTED_MODULE_13__nuget_packages_fable_core_1_3_11_fable_core_Comparer__["a" /* default */](function (x, y) {
            return x.CompareTo(y);
        }));

        var expListEval = function expListEval(_arg3) {
            if (_arg3.tag === 1) {
                return function (arg00) {
                    return _arg3.data[1].ReplaceTokens(arg00);
                }(Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([toToken(tryEval(map, _arg3.data[0]))]));
            } else {
                return _arg3.data;
            }
        };

        return Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["f" /* map */])(function ($var7) {
            return inferRow(Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Seq__["n" /* toList */])($var7));
        }, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Seq__["n" /* toList */])(function (source) {
            return Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Seq__["b" /* chunkBySize */])(rowLength, source);
        }(Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["f" /* map */])(function ($var8) {
            return expListEval(function (tuple) {
                return tuple[1];
            }($var8));
        }, expList))));
    }(Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Seq__["f" /* fold */])(outerFold, [0, [new __WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](), 0]], cellList_1));
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
        if (_arg2.tag === 0) {
            return new __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](0, evaluateRowList(_arg2.data));
        } else {
            Object(__WEBPACK_IMPORTED_MODULE_3__Logger_Logger_fs__["b" /* globLog */])().Debug(214)(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_String__["h" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_String__["b" /* printf */])("Markalc/top\nNot a table because of errors: %s\nReturning unchanged tokens.$"))(_arg2.data));
            return new __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](1, toks);
        }
    }(transformTable(Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["f" /* map */])(function (list) {
        return Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["d" /* filter */])(endlFilt, list);
    }, toks)));
}
function lexParseEvaluate(toks) {
    return parseEvaluateTable(Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_List__["f" /* map */])(__WEBPACK_IMPORTED_MODULE_2__MarkalcShared_fs__["j" /* simpleLex */], toks));
}

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export makeFloat */
/* unused harmony export makeInt */
/* unused harmony export makeCellReference */
/* unused harmony export parseExp */
/* harmony export (immutable) */ __webpack_exports__["a"] = parseExpression;
/* unused harmony export evalExpTest */
/* unused harmony export parseExpTest */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Double__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_String__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_Int32__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__MarkalcShared_fs__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_List__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Types_fs__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Seq__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_11_fable_core_Result__ = __webpack_require__(8);











function makeFloat(i, d) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Double__["a" /* parse */])(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_String__["h" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_String__["b" /* printf */])("%A.%A"))(i, d));
}
function makeInt(i) {
    return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_Int32__["a" /* parse */])(i) | 0;
}
function makeCellReference(row, col) {
    return new __WEBPACK_IMPORTED_MODULE_3__MarkalcShared_fs__["a" /* CellReference */](0, [Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_Int32__["a" /* parse */])(row), Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_Int32__["a" /* parse */])(col)]);
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
                    __WEBPACK_IMPORTED_MODULE_3__MarkalcShared_fs__["h" /* logger */].Debug(null)(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_String__["h" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_String__["b" /* printf */])("Row:%A, Col:%A"))($var2[3], $var2[2]));
                    return [function (tupledArg_1) {
                        return makeCellReference(tupledArg_1[0], tupledArg_1[1]);
                    }([$var2[3], $var2[2]]), $var2[1]];

                case 2:
                    __WEBPACK_IMPORTED_MODULE_3__MarkalcShared_fs__["h" /* logger */].Debug(null)(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_String__["h" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_String__["b" /* printf */])("Row:%A, Col:%A"))($var2[3], $var2[2]));
                    return [function (tupledArg_2) {
                        return makeCellReference(tupledArg_2[0], tupledArg_2[1]);
                    }([$var2[3], $var2[2]]), $var2[1]];

                case 3:
                    return null;
            }
        };

        var _ExpressionList___ = function _ExpressionList___(_arg3) {
            var $var3 = void 0;

            var activePatternResult960 = _Expression___(_arg3);

            if (activePatternResult960 != null) {
                if (Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult960)[1].tail != null) {
                    if (Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult960)[1].head.tag === 11) {
                        var activePatternResult961 = _ExpressionList___(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult960)[1].tail);

                        if (activePatternResult961 != null) {
                            $var3 = [0, Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult961)[1], Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult960)[0], Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult961)[0]];
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
                    return [new __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]($var3[2], $var3[3]), $var3[1]];

                case 1:
                    var $var4 = void 0;

                    var activePatternResult958 = _CellRefPat___(_arg3);

                    if (activePatternResult958 != null) {
                        if (Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult958)[1].tail != null) {
                            if (Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult958)[1].head.tag === 33) {
                                var activePatternResult959 = _CellRefPat___(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult958)[1].tail);

                                if (activePatternResult959 != null) {
                                    $var4 = [0, Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult959)[1], Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult958)[0], Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult959)[0]];
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
                                return _arg4 != null ? [Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_List__["f" /* map */])(function ($var5) {
                                    return new __WEBPACK_IMPORTED_MODULE_3__MarkalcShared_fs__["b" /* Expr */](1, new __WEBPACK_IMPORTED_MODULE_3__MarkalcShared_fs__["c" /* Operand */](0, $var5));
                                }, Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(_arg4)), $var4[1]] : null;
                            }(Object(__WEBPACK_IMPORTED_MODULE_3__MarkalcShared_fs__["e" /* cellRange */])($var4[2], $var4[3]));

                        case 1:
                            var activePatternResult957 = _Expression___(_arg3);

                            if (activePatternResult957 != null) {
                                return [Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult957)[0]]), Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult957)[1]];
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
                    var activePatternResult964 = _ExpressionList___(_arg5.tail);

                    if (activePatternResult964 != null) {
                        if (Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult964)[1].tail != null) {
                            if (Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult964)[1].head.tag === 28) {
                                if (Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult964)[1].tail.tail != null) {
                                    if (Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult964)[1].tail.head.tag === 1) {
                                        $var6 = [0, Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult964)[1].tail.tail, Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult964)[1].tail.head.data, Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult964)[0]];
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

        var _Sum___ = Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(funcConstruct)("SUM");

        var _Avg___ = Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(funcConstruct)("AVG");

        var _Min___ = Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(funcConstruct)("MIN");

        var _Max___ = Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(funcConstruct)("MAX");

        var _FunctionPat___ = function _FunctionPat___(_arg6) {
            var activePatternResult975 = _Sum___(_arg6);

            if (activePatternResult975 != null) {
                return [Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult975)[0], Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult975)[1]];
            } else {
                var activePatternResult974 = _Avg___(_arg6);

                if (activePatternResult974 != null) {
                    return [Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult974)[0], Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult974)[1]];
                } else {
                    var activePatternResult973 = _Min___(_arg6);

                    if (activePatternResult973 != null) {
                        return [Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult973)[0], Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult973)[1]];
                    } else {
                        var activePatternResult972 = _Max___(_arg6);

                        if (activePatternResult972 != null) {
                            return [Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult972)[0], Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult972)[1]];
                        } else {
                            return null;
                        }
                    }
                }
            }
        };

        var _BasePat___ = function _BasePat___(_arg7) {
            var activePatternResult988 = _NumberPat___(_arg7);

            if (activePatternResult988 != null) {
                return [new __WEBPACK_IMPORTED_MODULE_3__MarkalcShared_fs__["b" /* Expr */](1, new __WEBPACK_IMPORTED_MODULE_3__MarkalcShared_fs__["c" /* Operand */](2, Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult988)[0])), Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult988)[1]];
            } else {
                var activePatternResult987 = _FunctionPat___(_arg7);

                if (activePatternResult987 != null) {
                    return [Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult987)[0], Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult987)[1]];
                } else {
                    var activePatternResult986 = _CellRefPat___(_arg7);

                    if (activePatternResult986 != null) {
                        return [new __WEBPACK_IMPORTED_MODULE_3__MarkalcShared_fs__["b" /* Expr */](1, new __WEBPACK_IMPORTED_MODULE_3__MarkalcShared_fs__["c" /* Operand */](0, Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult986)[0])), Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult986)[1]];
                    } else {
                        var $var7 = void 0;

                        if (_arg7.tail != null) {
                            if (_arg7.head.tag === 23) {
                                var activePatternResult985 = _Expression___(_arg7.tail);

                                if (activePatternResult985 != null) {
                                    if (Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult985)[1].tail != null) {
                                        if (Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult985)[1].head.tag === 22) {
                                            $var7 = [0, Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult985)[1].tail, Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult985)[0]];
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
            var exp2;
            var after_;

            var activePatternResult994 = _PrevPat___(_arg8);

            if (activePatternResult994 != null) {
                var $var8 = void 0;

                if (Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult994)[1].tail != null) {
                    var activePatternResult993 = _HOFPat___(_PrevPat___, op, t, Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult994)[1].tail);

                    if (activePatternResult993 != null) {
                        if (exp2 = Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult993)[0], after_ = Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult993)[1], Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult994)[1].head.Equals(t)) {
                            $var8 = [0, Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult993)[1], Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult993)[0], Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult994)[1].head];
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
                        return [new __WEBPACK_IMPORTED_MODULE_3__MarkalcShared_fs__["b" /* Expr */](0, [op, $var8[2], Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult994)[0]]), $var8[1]];

                    case 1:
                        return [Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult994)[0], Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult994)[1]];
                }
            } else {
                return null;
            }
        };

        var patPrecedence = Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([[function (x, y) {
            return x % y;
        }, new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["r" /* Token */](35)], [Math.pow.bind(Math), new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["r" /* Token */](34)], [function (x_2, y_2) {
            return x_2 * y_2;
        }, new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["r" /* Token */](9)], [function (x_3, y_3) {
            return x_3 / y_3;
        }, new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["r" /* Token */](25)], [function (x_4, y_4) {
            return x_4 - y_4;
        }, new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["r" /* Token */](7)], [function (x_5, y_5) {
            return x_5 + y_5;
        }, new __WEBPACK_IMPORTED_MODULE_7__Types_fs__["r" /* Token */](8)]]);

        var constructPatterns = function constructPatterns(s, x_6) {
            return new __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(_HOFPat___)(Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_List__["e" /* head */])(s), x_6[0], x_6[1]), s);
        };

        var patterns = Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Seq__["f" /* fold */])(constructPatterns, Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([_BasePat___]), patPrecedence);

        var _FirstPat___ = Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_List__["e" /* head */])(patterns);

        var activePatternResult1001 = _FirstPat___(toks_1);

        if (activePatternResult1001 != null) {
            return Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult1001);
        } else {
            return null;
        }
    };

    var matchValue = Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(toks);
    var $var9 = void 0;

    if (matchValue.tail != null) {
        if (matchValue.head.tag === 3) {
            if (matchValue.tail.tail != null) {
                if (matchValue.tail.head.tag === 11) {
                    $var9 = [0, matchValue.head.data, matchValue.tail.tail];
                } else {
                    var activePatternResult1010 = _Expression___(matchValue);

                    if (activePatternResult1010 != null) {
                        if (Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult1010)[1].tail == null) {
                            $var9 = [1, Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult1010)[0]];
                        } else {
                            $var9 = [2];
                        }
                    } else {
                        $var9 = [2];
                    }
                }
            } else {
                var activePatternResult1011 = _Expression___(matchValue);

                if (activePatternResult1011 != null) {
                    if (Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult1011)[1].tail == null) {
                        $var9 = [1, Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult1011)[0]];
                    } else {
                        $var9 = [2];
                    }
                } else {
                    $var9 = [2];
                }
            }
        } else {
            var activePatternResult1012 = _Expression___(matchValue);

            if (activePatternResult1012 != null) {
                if (Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult1012)[1].tail == null) {
                    $var9 = [1, Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult1012)[0]];
                } else {
                    $var9 = [2];
                }
            } else {
                $var9 = [2];
            }
        }
    } else {
        var activePatternResult1013 = _Expression___(matchValue);

        if (activePatternResult1013 != null) {
            if (Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult1013)[1].tail == null) {
                $var9 = [1, Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult1013)[0]];
            } else {
                $var9 = [2];
            }
        } else {
            $var9 = [2];
        }
    }

    switch ($var9[0]) {
        case 0:
            var $var10 = void 0;

            var activePatternResult1006 = _Expression___($var9[2]);

            if (activePatternResult1006 != null) {
                if (Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult1006)[1].tail == null) {
                    $var10 = [0, Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult1006)[0]];
                } else {
                    $var10 = [1];
                }
            } else {
                $var10 = [1];
            }

            switch ($var10[0]) {
                case 0:
                    return new __WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](0, function (tupledArg_3) {
                        return new __WEBPACK_IMPORTED_MODULE_3__MarkalcShared_fs__["d" /* TExpr */](0, [tupledArg_3[0], tupledArg_3[1]]);
                    }([$var10[1], Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_Int32__["a" /* parse */])($var9[1])]));

                case 1:
                    return new __WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](1, Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_String__["h" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_String__["b" /* printf */])("Not valid expression %A"))(toks));
            }

        case 1:
            return new __WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](0, function (tupledArg_4) {
                return new __WEBPACK_IMPORTED_MODULE_3__MarkalcShared_fs__["d" /* TExpr */](0, [tupledArg_4[0], tupledArg_4[1]]);
            }([$var9[1], -1]));

        case 2:
            return new __WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](1, Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_String__["h" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_String__["b" /* printf */])("Not valid expression %A"))(toks));
    }
}
function parseExpression(toks) {
    var $var11 = toks.tail != null ? toks.head.tag === 6 ? [0, toks.tail] : [1, toks] : [1, toks];

    switch ($var11[0]) {
        case 0:
            return function (_arg1) {
                return _arg1.tag === 0 ? new __WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](0, _arg1.data) : new __WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](1, toks);
            }(parseExp(Object(__WEBPACK_IMPORTED_MODULE_3__MarkalcShared_fs__["k" /* whitespaceFilter */])($var11[1])));

        case 1:
            return new __WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](1, $var11[1]);
    }
}
function evalExpTest(e) {
    var evalExpTest_ = function evalExpTest_(e_1) {
        var $var12 = e_1.tag === 0 ? [0, e_1.data[0], e_1.data[1], e_1.data[2]] : e_1.tag === 1 ? e_1.data.tag === 2 ? [1, e_1.data.data] : [2] : [2];

        switch ($var12[0]) {
            case 0:
                return $var12[1](evalExpTest_($var12[2]), evalExpTest_($var12[3]));

            case 1:
                return $var12[1];

            case 2:
                return 13;
        }
    };

    if (e.data[1] < 0) {
        return evalExpTest_(e.data[0]);
    } else {
        return function (f) {
            return Object(__WEBPACK_IMPORTED_MODULE_3__MarkalcShared_fs__["i" /* round */])(e.data[1], f);
        }(evalExpTest_(e.data[0]));
    }
}
function parseExpTest(toks) {
    return function (_arg1) {
        if (_arg1.tag === 0) {
            return new __WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](0, evalExpTest(_arg1.data));
        } else {
            Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_String__["f" /* toConsole */])(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_String__["b" /* printf */])("Error parsing expression: %A"))(_arg1.data);
            return new __WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_11_fable_core_Result__["b" /* default */](1, toks);
        }
    }(parseExp(Object(__WEBPACK_IMPORTED_MODULE_3__MarkalcShared_fs__["k" /* whitespaceFilter */])(toks)));
}

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export tryParse */
/* harmony export (immutable) */ __webpack_exports__["a"] = parse;
// TODO does this perfectly match the .NET behavior ?
function tryParse(s, radix, initial) {
    if (s != null && /\S/.test(s)) {
        if (radix === 10) {
            var v = +s;
            if (!Number.isNaN(v)) {
                return [true, v];
            }
        }
    }
    return [false, initial != null ? initial : 0];
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
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export tocParse */
/* unused harmony export tocGen$27$ */
/* unused harmony export tocGen */
/* unused harmony export citeParseIn */
/* unused harmony export citeParse$27$ */
/* unused harmony export styleParse */
/* unused harmony export citeGen$27$ */
/* harmony export (immutable) */ __webpack_exports__["a"] = preParser;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_List__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Types_fs__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_Seq__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Parser_ParserHelperFuncs_fs__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_String__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_Int32__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__RefParse_fs__ = __webpack_require__(33);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };










function tocParse(tocLst, depth, index) {
    var _loop = function _loop() {
        var fakehash = function fakehash(dep) {
            if (dep === 0) {
                return Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["r" /* Token */](32), new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["r" /* Token */](32)]);
            } else {
                return new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["r" /* Token */](4), fakehash(dep - 1));
            }
        };

        var $var1 = tocLst.tail != null ? tocLst.head.tag === 32 ? tocLst.tail.tail != null ? tocLst.tail.head.tag === 32 ? tocLst.tail.tail.tail != null ? tocLst.tail.tail.head.tag === 4 ? [0, tocLst.tail.tail.tail] : [2] : [2] : [2] : [2] : tocLst.head.tag === 4 ? depth > 0 ? [1, tocLst.tail] : [2] : [2] : [2];

        switch ($var1[0]) {
            case 0:
                tocLst = $var1[1];
                depth = 1;
                index = index;
                return "continue|tocParse";

            case 1:
                tocLst = $var1[1];
                depth = depth + 1;
                index = index;
                return "continue|tocParse";

            case 2:
                var $var2 = tocLst.tail != null ? tocLst.head.tag === 2 ? depth > 0 ? [0, tocLst.tail] : [1] : [1] : [1];

                switch ($var2[0]) {
                    case 0:
                        var ind = Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_Seq__["o" /* tryFindIndex */])(function (x) {
                            return x.Equals(new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["r" /* Token */](32));
                        }, $var2[1]);

                        if (ind == null) {
                            return {
                                v: [Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["n" /* THeader */](Object(__WEBPACK_IMPORTED_MODULE_3__Parser_ParserHelperFuncs_fs__["i" /* parseInLineElements */])($var2[1]), depth)]), Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["r" /* Token */](32), new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["r" /* Token */](32), new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["r" /* Token */](37, index)])]
                            };
                        } else {
                            var patternInput = Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_List__["k" /* splitAt */])(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(ind), $var2[1]);
                            return {
                                v: function (tupledArg) {
                                    return [new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["n" /* THeader */](Object(__WEBPACK_IMPORTED_MODULE_3__Parser_ParserHelperFuncs_fs__["i" /* parseInLineElements */])(patternInput[0]), depth), tupledArg[0]), Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["r" /* Token */](32), new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["r" /* Token */](32), new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["r" /* Token */](37, index)], tupledArg[1])];
                                }(tocParse(patternInput[1], 0, index + 1))
                            };
                        }

                    case 1:
                        var $var3 = tocLst.tail != null ? depth > 0 ? [0, tocLst.head, tocLst.tail] : [1] : [1];

                        switch ($var3[0]) {
                            case 0:
                                return {
                                    v: function (tupledArg_1) {
                                        return [tupledArg_1[0], Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_List__["a" /* append */])(Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(fakehash(depth)), new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]($var3[1], tupledArg_1[1]))];
                                    }(tocParse($var3[2], 0, index))
                                };

                            case 1:
                                if (tocLst.tail == null) {
                                    return {
                                        v: [new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](), new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]()]
                                    };
                                } else {
                                    return {
                                        v: function (tupledArg_2) {
                                            return [tupledArg_2[0], new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](tocLst.head, tupledArg_2[1])];
                                        }(tocParse(tocLst.tail, 0, index))
                                    };
                                }

                        }

                }

        }
    };

    tocParse: while (true) {
        var _ret = _loop();

        switch (_ret) {
            case "continue|tocParse":
                continue tocParse;

            default:
                if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
        }
    }
}

function tocGen_(tokenLst, maxDepth) {
    if (maxDepth === 0) {
        return tocParse(tokenLst, 0, 0);
    } else if (maxDepth > 0) {
        return function (tupledArg) {
            return [Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_List__["d" /* filter */])(function (x) {
                return x.Level <= maxDepth;
            }, tupledArg[0]), tupledArg[1]];
        }(tocParse(tokenLst, 0, 0));
    } else {
        return Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_String__["g" /* toFail */])(Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_String__["b" /* printf */])("Invalid maxDepth"));
    }
}


function tocGen(tLst, maxD) {
    return new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["s" /* Ttoc */](maxD, function (tupledArg) {
        return tupledArg[0];
    }(tocGen_(tLst, maxD)));
}
function citeParseIn(tocLst) {
    var citeParseIn_ = function citeParseIn_(toParse, tail) {
        var tl;
        var a;

        citeParseIn_: while (true) {
            var $var4 = tail.tail != null ? tail.head.tag === 32 ? tail.tail.tail != null ? tail.tail.head.tag === 2 ? (tl = tail.tail.tail, a = tail.tail.head.data | 0, a >= 4) ? [0, tail.tail.head.data, tail.tail.tail] : [1] : [1] : [1] : [1] : [1];

            switch ($var4[0]) {
                case 0:
                    toParse = toParse;
                    tail = $var4[2];
                    continue citeParseIn_;

                case 1:
                    if (tail.tail == null) {
                        return [toParse, new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]()];
                    } else if (tail.head.tag === 32) {
                        return [toParse, tail.tail];
                    } else {
                        toParse = new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](tail.head, toParse);
                        tail = tail.tail;
                        continue citeParseIn_;
                    }

            }
        }
    };

    return function (tupledArg) {
        return [Object(__WEBPACK_IMPORTED_MODULE_3__Parser_ParserHelperFuncs_fs__["i" /* parseInLineElements */])(Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(tupledArg[0])), tupledArg[1]];
    }(citeParseIn_(new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](), tocLst));
}

function citeParse_(style, tocLst) {
    var recFitFt = function recFitFt(tupledArg, c) {
        return function (tupledArg_1) {
            return [new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["h" /* ParsedObj */](8, [c, tupledArg[0]]), tupledArg_1[0]), tupledArg_1[1]];
        }(citeParse_(style, tupledArg[1]));
    };

    var recFitRef = function recFitRef(tupledArg_2, d) {
        return function (tupledArg_3) {
            return [new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["h" /* ParsedObj */](9, [d, tupledArg_2[0], tupledArg_2[1]]), tupledArg_3[0]), tupledArg_3[1]];
        }(citeParse_(style, tupledArg_2[2]));
    };

    var $var5 = tocLst.tail == null ? [3] : tocLst.head.tag === 20 ? tocLst.tail.tail != null ? tocLst.tail.head.tag === 34 ? tocLst.tail.tail.tail != null ? tocLst.tail.tail.head.tag === 3 ? tocLst.tail.tail.tail.tail != null ? tocLst.tail.tail.tail.head.tag === 21 ? [0, tocLst.tail.tail.head.data, tocLst.tail.tail.tail.tail] : [2, tocLst.head, tocLst.tail] : [2, tocLst.head, tocLst.tail] : tocLst.tail.tail.head.tag === 1 ? tocLst.tail.tail.tail.tail != null ? tocLst.tail.tail.tail.head.tag === 21 ? [1, tocLst.tail.tail.head.data, tocLst.tail.tail.tail.tail] : [2, tocLst.head, tocLst.tail] : [2, tocLst.head, tocLst.tail] : [2, tocLst.head, tocLst.tail] : [2, tocLst.head, tocLst.tail] : [2, tocLst.head, tocLst.tail] : [2, tocLst.head, tocLst.tail] : [2, tocLst.head, tocLst.tail];

    switch ($var5[0]) {
        case 0:
            var $var6 = $var5[2].tail != null ? $var5[2].head.tag === 11 ? [0, $var5[2].tail] : [1, $var5[2]] : [1, $var5[2]];

            switch ($var6[0]) {
                case 0:
                    return recFitFt(citeParseIn($var6[1]), Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_Int32__["a" /* parse */])($var5[1]));

                case 1:
                    return function (tupledArg_4) {
                        return [tupledArg_4[0], new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["r" /* Token */](38, Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_Int32__["a" /* parse */])($var5[1])), tupledArg_4[1])];
                    }(citeParse_(style, $var6[1]));
            }

        case 1:
            var $var7 = $var5[2].tail != null ? $var5[2].head.tag === 11 ? [0, $var5[2].tail] : [1, $var5[2]] : [1, $var5[2]];

            switch ($var7[0]) {
                case 0:
                    return recFitRef(Object(__WEBPACK_IMPORTED_MODULE_7__RefParse_fs__["a" /* refParse */])(style, $var7[1]), $var5[1]);

                case 1:
                    return function (tupledArg_5) {
                        return [tupledArg_5[0], new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["r" /* Token */](39, $var5[1]), tupledArg_5[1])];
                    }(citeParse_(style, $var7[1]));
            }

        case 2:
            return function (tupledArg_6) {
                return [tupledArg_6[0], new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]($var5[1], tupledArg_6[1])];
            }(citeParse_(style, $var5[2]));

        case 3:
            return [new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](), new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]()];
    }
}


function styleParse(tocLst) {
    styleParse: while (true) {
        var stylify = function stylify(str) {
            if (str === "Harvard") {
                return new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["j" /* RefFrmt */](1);
            } else if (str === "Chicago") {
                return new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["j" /* RefFrmt */](2);
            } else if (str === "IEEE") {
                return new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["j" /* RefFrmt */](0);
            } else {
                return null;
            }
        };

        var $var8 = tocLst.tail == null ? [2] : tocLst.head.tag === 35 ? tocLst.tail.tail != null ? tocLst.tail.head.tag === 35 ? tocLst.tail.tail.tail != null ? tocLst.tail.tail.head.tag === 1 ? tocLst.tail.tail.head.data === "Style" ? tocLst.tail.tail.tail.tail != null ? tocLst.tail.tail.tail.head.tag === 6 ? tocLst.tail.tail.tail.tail.tail != null ? tocLst.tail.tail.tail.tail.head.tag === 2 ? tocLst.tail.tail.tail.tail.tail.tail != null ? tocLst.tail.tail.tail.tail.tail.head.tag === 1 ? [0, tocLst.tail.tail.tail.tail.tail.head.data, tocLst.tail.tail.tail.tail.tail.tail] : [1, tocLst.tail] : [1, tocLst.tail] : [1, tocLst.tail] : [1, tocLst.tail] : [1, tocLst.tail] : [1, tocLst.tail] : [1, tocLst.tail] : [1, tocLst.tail] : [1, tocLst.tail] : [1, tocLst.tail] : [1, tocLst.tail] : [1, tocLst.tail];

        switch ($var8[0]) {
            case 0:
                return [stylify($var8[1]), $var8[2]];

            case 1:
                tocLst = $var8[1];
                continue styleParse;

            case 2:
                return [null, new __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]()];
        }
    }
}

function citeGen_(tLst) {
    var patternInput = styleParse(tLst);
    var patternInput_1 = patternInput[0] == null ? citeParse_(new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["j" /* RefFrmt */](1), tLst) : citeParse_(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(patternInput[0]), patternInput[1]);
    return [patternInput_1[0], patternInput_1[1]];
}


function preParser(tLst) {
    return function (tupledArg) {
        return [tupledArg[0], tupledArg[1][0], tupledArg[1][1]];
    }(function (tupledArg_1) {
        return [tupledArg_1[0], citeGen_(tupledArg_1[1])];
    }(tocGen_(tLst, 0)));
}

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export monthConv */
/* unused harmony export ordinalConv */
/* unused harmony export yerGen */
/* unused harmony export urlGen */
/* unused harmony export plnGen */
/* unused harmony export dateGen */
/* unused harmony export GenType */
/* unused harmony export $7C$OverallM$7C$ */
/* unused harmony export build */
/* unused harmony export refInLine */
/* unused harmony export ref2TLine */
/* unused harmony export refParser */
/* harmony export (immutable) */ __webpack_exports__["a"] = refParse;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Option__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Types_fs__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_Seq__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Symbol__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_Util__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Int32__ = __webpack_require__(19);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }











function monthConv(m) {
    switch (m) {
        case 1:
            return "January";

        case 2:
            return "February";

        case 3:
            return "March";

        case 4:
            return "April";

        case 5:
            return "May";

        case 6:
            return "June";

        case 7:
            return "July";

        case 8:
            return "August";

        case 9:
            return "September";

        case 10:
            return "October";

        case 11:
            return "November";

        case 12:
            return "December";

        default:
            return null;
    }
}
function ordinalConv(d) {
    var _OrdinalDates___ = function _OrdinalDates___(_arg1) {
        if (_arg1 > 31 ? true : _arg1 < 1) {
            return null;
        } else {
            switch (_arg1) {
                case 1:
                case 21:
                case 31:
                    return "st";

                case 2:
                case 22:
                    return "nd";

                case 3:
                case 23:
                    return "rd";

                default:
                    return "th";
            }
        }
    };

    var activePatternResult1268 = _OrdinalDates___(d);

    if (activePatternResult1268 != null) {
        return d.toString() + Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult1268);
    } else {
        return null;
    }
}
function yerGen(style, year) {
    if (year != null) {
        if (style.tag === 2) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["c" /* InlineElement */](0, new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["m" /* TFrmtedString */](2, Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(year).toString() + ". "))]);
        } else if (style.tag === 0) {
            return new __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]();
        } else {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["c" /* InlineElement */](0, new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["m" /* TFrmtedString */](2, "(" + Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(year).toString() + ") "))]);
        }
    } else {
        return new __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]();
    }
}
function urlGen(style, url) {
    if (url != null) {
        if (style.tag === 2) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["c" /* InlineElement */](1, [new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["m" /* TFrmtedString */](2, Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(url)), Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(url)])]);
        } else if (style.tag === 0) {
            return new __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]();
        } else {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["c" /* InlineElement */](0, new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["m" /* TFrmtedString */](2, "Available from: ")), new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["c" /* InlineElement */](1, [new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["m" /* TFrmtedString */](2, Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(url)), Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(url)]), new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["c" /* InlineElement */](0, new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["m" /* TFrmtedString */](2, " "))]);
        }
    } else {
        return new __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]();
    }
}
function plnGen(tokLst) {
    var plainGen_ = function plainGen_(tLst) {
        plainGen_: while (true) {
            if (tLst.tail == null) {
                return new __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]();
            } else if (tLst.head.tag === 1) {
                return new __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](tLst.head.data, plainGen_(tLst.tail));
            } else if (tLst.head.tag === 2) {
                return new __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](" ", plainGen_(tLst.tail));
            } else {
                tLst = tLst.tail;
                continue plainGen_;
            }
        }
    };

    return Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_Seq__["l" /* reduce */])(function (x, y) {
        return x + y;
    }, Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(plainGen_(tokLst)));
}
function dateGen(style, date) {
    if (date != null) {
        var y = Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(date)[0] | 0;
        var m = Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(date)[1] | 0;
        var d = Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(date)[2] | 0;
        var mstr = monthConv(m);
        var dstr = ordinalConv(d);

        if (style.tag === 2) {
            var matchValue = [mstr, dstr];
            var $var1 = matchValue[0] != null ? matchValue[1] != null ? [0, Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(matchValue[0])] : [1] : [1];

            switch ($var1[0]) {
                case 0:
                    return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["c" /* InlineElement */](0, new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["m" /* TFrmtedString */](2, "Accessed " + $var1[1] + " " + d.toString() + ", " + y.toString() + ". "))]);

                case 1:
                    return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["c" /* InlineElement */](0, new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["m" /* TFrmtedString */](2, "Access date invalid, please use yyyy-mm-dd"))]);
            }
        } else if (style.tag === 0) {
            return new __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]();
        } else {
            var matchValue_1 = [mstr, dstr];
            var $var2 = matchValue_1[0] != null ? matchValue_1[1] != null ? [0, Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(matchValue_1[1]), Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(matchValue_1[0])] : [1] : [1];

            switch ($var2[0]) {
                case 0:
                    return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["c" /* InlineElement */](0, new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["m" /* TFrmtedString */](2, "[Accessed " + $var2[1] + " " + $var2[2] + " " + y.toString() + "]. "))]);

                case 1:
                    return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["c" /* InlineElement */](0, new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["m" /* TFrmtedString */](2, "Access date invalid, please use yyyy-mm-dd"))]);
            }
        }
    } else {
        return new __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]();
    }
}
var GenType = function () {
    function GenType(tag) {
        _classCallCheck(this, GenType);

        this.tag = tag | 0;
    }

    _createClass(GenType, [{
        key: __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "RefParse.GenType",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: [["HarAut"], ["ChiAut"], ["ChiBookTil"], ["ChiWebTil"], ["HarTil"]]
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return this.tag === other.tag;
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_Util__["h" /* comparePrimitives */])(this.tag, other.tag);
        }
    }]);

    return GenType;
}();
Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["b" /* setType */])("RefParse.GenType", GenType);

var _OverallM_ = Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(function () {
    var hAut = function hAut(tokLst) {
        var hAutGen_ = function hAutGen_(tLst) {
            hAutGen_: while (true) {
                if (tLst.tail == null) {
                    return new __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]();
                } else if (tLst.head.tag === 1) {
                    if (tLst.tail.tail == null) {
                        return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["c" /* InlineElement */](0, new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["m" /* TFrmtedString */](2, tLst.head.data + ", "))]);
                    } else {
                        return new __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["c" /* InlineElement */](0, new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["m" /* TFrmtedString */](2, tLst.head.data[0] + ". ")), hAutGen_(tLst.tail));
                    }
                } else {
                    tLst = tLst.tail;
                    continue hAutGen_;
                }
            }
        };

        return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(hAutGen_(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(tokLst)));
    };

    var cAut = function cAut(tokLst_1) {
        return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["c" /* InlineElement */](0, new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["m" /* TFrmtedString */](2, plnGen(tokLst_1) + ". "))]);
    };

    var cWebTil = function cWebTil(tokLst_2) {
        return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["c" /* InlineElement */](0, new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["m" /* TFrmtedString */](2, "\"" + plnGen(tokLst_2) + ".\" "))]);
    };

    var cTil = function cTil(tokLst_3) {
        return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["c" /* InlineElement */](0, new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["m" /* TFrmtedString */](1, Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["c" /* InlineElement */](0, new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["m" /* TFrmtedString */](2, plnGen(tokLst_3) + ". "))])))]);
    };

    var hTil = function hTil(tokLst_4) {
        return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["c" /* InlineElement */](0, new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["m" /* TFrmtedString */](1, Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["c" /* InlineElement */](0, new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["m" /* TFrmtedString */](2, plnGen(tokLst_4) + ". "))])))]);
    };

    return Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(function (_arg1) {
        switch (_arg1.tag) {
            case 4:
                return hTil;

            case 1:
                return cAut;

            case 2:
                return cTil;

            case 3:
                return cWebTil;

            default:
                return hAut;
        }
    });
}());


function build(gType, tokLst) {
    if (tokLst != null) {
        var activePatternResult1325 = Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(_OverallM_)(gType);
        return activePatternResult1325(Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(tokLst));
    } else {
        return new __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]();
    }
}
function refInLine(style, ref) {
    var matchValue = [ref.Author, ref.Year];

    if (matchValue[0] == null) {
        if (matchValue[1] != null) {
            return new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["m" /* TFrmtedString */](2, "(" + Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(matchValue[1]).toString() + ")");
        } else {
            return new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["m" /* TFrmtedString */](2, "(n.d.)");
        }
    } else if (matchValue[1] != null) {
        var $var3 = Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(matchValue[0]).tail != null ? Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(matchValue[0]).head.tag === 1 ? [0, Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(matchValue[0]).head.data] : [1] : [1];

        switch ($var3[0]) {
            case 0:
                if (style.tag === 2) {
                    return new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["m" /* TFrmtedString */](2, "(" + $var3[1] + ", " + Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(matchValue[1]).toString() + ")");
                } else if (style.tag === 1) {
                    return new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["m" /* TFrmtedString */](2, "(" + $var3[1] + " " + Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(matchValue[1]).toString() + ")");
                } else {
                    return new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["m" /* TFrmtedString */](2, "NOT IMPLEMENTED");
                }

            case 1:
                return new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["m" /* TFrmtedString */](2, "(Name unavailable)");
        }
    } else {
        var $var4 = Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(matchValue[0]).tail != null ? Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(matchValue[0]).head.tag === 1 ? [0, Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(matchValue[0]).head.data] : [1] : [1];

        switch ($var4[0]) {
            case 0:
                return new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["m" /* TFrmtedString */](2, "(" + $var4[1] + ")");

            case 1:
                return new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["m" /* TFrmtedString */](2, "(Name unavailable)");
        }
    }
}
function ref2TLine(format, ref) {
    if (format.tag === 2) {
        if (ref.Cat == null) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["c" /* InlineElement */](0, new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["m" /* TFrmtedString */](2, "Please specify type of reference"))]);
        } else if (Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(ref.Cat).tag === 1) {
            return Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_Seq__["l" /* reduce */])(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["a" /* append */], Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([build(new GenType(1), ref.Author), yerGen(new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["j" /* RefFrmt */](2), ref.Year), build(new GenType(3), ref.Title), dateGen(new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["j" /* RefFrmt */](2), ref.AccessDate), urlGen(new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["j" /* RefFrmt */](2), ref.URL)]));
        } else {
            return Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_Seq__["l" /* reduce */])(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["a" /* append */], Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([build(new GenType(1), ref.Author), yerGen(new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["j" /* RefFrmt */](2), ref.Year), build(new GenType(2), ref.Title)]));
        }
    } else if (format.tag === 1) {
        return Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_Seq__["l" /* reduce */])(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["a" /* append */], Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([build(new GenType(0), ref.Author), yerGen(new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["j" /* RefFrmt */](1), ref.Year), build(new GenType(4), ref.Title), urlGen(new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["j" /* RefFrmt */](1), ref.URL), dateGen(new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["j" /* RefFrmt */](1), ref.AccessDate)]));
    } else {
        return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["c" /* InlineElement */](0, new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["m" /* TFrmtedString */](2, "IEEE citation not supported yet"))]);
    }
}
function refParser(style, tLst) {
    var refPar_ = function refPar_(refData, tLst_1) {
        var Year;

        var _URL;

        var _loop = function _loop() {
            var refParse_ = function refParse_(parsing, tail) {
                refParse_: while (true) {
                    if (tail.tail == null) {
                        return [parsing, new __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]()];
                    } else if (tail.head.tag === 11) {
                        return [parsing, tail.tail];
                    } else if (tail.head.tag === 32) {
                        return [parsing, tail.tail];
                    } else {
                        parsing = new __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](tail.head, parsing);
                        tail = tail.tail;
                        continue refParse_;
                    }
                }
            };

            var dateFormat = function dateFormat(tail_1) {
                var $var5 = tail_1.tail != null ? tail_1.head.tag === 3 ? tail_1.tail.tail != null ? tail_1.tail.head.tag === 7 ? tail_1.tail.tail.tail != null ? tail_1.tail.tail.head.tag === 3 ? tail_1.tail.tail.tail.tail != null ? tail_1.tail.tail.tail.head.tag === 7 ? tail_1.tail.tail.tail.tail.tail != null ? tail_1.tail.tail.tail.tail.head.tag === 3 ? [0, tail_1.tail.tail.tail.tail.head.data, tail_1.tail.tail.head.data, tail_1.tail.tail.tail.tail.tail, tail_1.head.data] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

                switch ($var5[0]) {
                    case 0:
                        return [[Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Int32__["a" /* parse */])($var5[4]), Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Int32__["a" /* parse */])($var5[2]), Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Int32__["a" /* parse */])($var5[1])], $var5[3]];

                    case 1:
                        return [null, tail_1];
                }
            };

            var $var6 = tLst_1.tail == null ? [8] : tLst_1.head.tag === 1 ? tLst_1.head.data === "type" ? tLst_1.tail.tail != null ? tLst_1.tail.head.tag === 6 ? tLst_1.tail.tail.tail != null ? tLst_1.tail.tail.head.tag === 2 ? tLst_1.tail.tail.tail.tail != null ? tLst_1.tail.tail.tail.head.tag === 1 ? [0, tLst_1.tail.tail.tail.head.data, tLst_1.tail.tail.tail.tail] : [7, tLst_1.tail] : [7, tLst_1.tail] : [7, tLst_1.tail] : [7, tLst_1.tail] : [7, tLst_1.tail] : [7, tLst_1.tail] : tLst_1.head.data === "author" ? tLst_1.tail.tail != null ? tLst_1.tail.head.tag === 6 ? tLst_1.tail.tail.tail != null ? tLst_1.tail.tail.head.tag === 2 ? [1, tLst_1.tail.tail.tail] : [7, tLst_1.tail] : [7, tLst_1.tail] : [7, tLst_1.tail] : [7, tLst_1.tail] : tLst_1.head.data === "title" ? tLst_1.tail.tail != null ? tLst_1.tail.head.tag === 6 ? tLst_1.tail.tail.tail != null ? tLst_1.tail.tail.head.tag === 2 ? [2, tLst_1.tail.tail.tail] : [7, tLst_1.tail] : [7, tLst_1.tail] : [7, tLst_1.tail] : [7, tLst_1.tail] : tLst_1.head.data === "year" ? tLst_1.tail.tail != null ? tLst_1.tail.head.tag === 6 ? tLst_1.tail.tail.tail != null ? tLst_1.tail.tail.head.tag === 2 ? tLst_1.tail.tail.tail.tail != null ? tLst_1.tail.tail.tail.head.tag === 3 ? [3, tLst_1.tail.tail.tail.head.data, tLst_1.tail.tail.tail.tail] : [7, tLst_1.tail] : [7, tLst_1.tail] : [7, tLst_1.tail] : [7, tLst_1.tail] : [7, tLst_1.tail] : [7, tLst_1.tail] : tLst_1.head.data === "url" ? tLst_1.tail.tail != null ? tLst_1.tail.head.tag === 6 ? tLst_1.tail.tail.tail != null ? tLst_1.tail.tail.head.tag === 2 ? tLst_1.tail.tail.tail.tail != null ? tLst_1.tail.tail.tail.head.tag === 1 ? [4, tLst_1.tail.tail.tail.head.data, tLst_1.tail.tail.tail.tail] : [7, tLst_1.tail] : [7, tLst_1.tail] : [7, tLst_1.tail] : [7, tLst_1.tail] : [7, tLst_1.tail] : [7, tLst_1.tail] : tLst_1.head.data === "access" ? tLst_1.tail.tail != null ? tLst_1.tail.head.tag === 6 ? tLst_1.tail.tail.tail != null ? tLst_1.tail.tail.head.tag === 2 ? [5, tLst_1.tail.tail.tail] : [7, tLst_1.tail] : [7, tLst_1.tail] : [7, tLst_1.tail] : [7, tLst_1.tail] : [7, tLst_1.tail] : tLst_1.head.tag === 32 ? [6, tLst_1.tail] : [7, tLst_1.tail];

            switch ($var6[0]) {
                case 0:
                    if ($var6[1] === "Book") {
                        refData = new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["i" /* Ref */](new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["k" /* RefType */](0), refData.Author, refData.Title, refData.Year, refData.AccessDate, refData.URL);
                        tLst_1 = $var6[2];
                        return "continue|refPar_";
                    } else if ($var6[1] === "Website") {
                        refData = new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["i" /* Ref */](new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["k" /* RefType */](1), refData.Author, refData.Title, refData.Year, refData.AccessDate, refData.URL);
                        tLst_1 = $var6[2];
                        return "continue|refPar_";
                    } else {
                        refData = refData;
                        tLst_1 = $var6[2];
                        return "continue|refPar_";
                    }

                case 1:
                    return {
                        v: function (tupledArg) {
                            var Author;
                            return refPar_((Author = tupledArg[0], new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["i" /* Ref */](refData.Cat, Author, refData.Title, refData.Year, refData.AccessDate, refData.URL)), tupledArg[1]);
                        }(refParse_(new __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](), $var6[1]))
                    };

                case 2:
                    return {
                        v: function (tupledArg_1) {
                            var Title;
                            return refPar_((Title = tupledArg_1[0], new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["i" /* Ref */](refData.Cat, refData.Author, Title, refData.Year, refData.AccessDate, refData.URL)), tupledArg_1[1]);
                        }(refParse_(new __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](), $var6[1]))
                    };

                case 3:
                    refData = (Year = Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Int32__["a" /* parse */])($var6[1]), new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["i" /* Ref */](refData.Cat, refData.Author, refData.Title, Year, refData.AccessDate, refData.URL));
                    tLst_1 = $var6[2];
                    return "continue|refPar_";

                case 4:
                    refData = (_URL = $var6[1], new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["i" /* Ref */](refData.Cat, refData.Author, refData.Title, refData.Year, refData.AccessDate, _URL));
                    tLst_1 = $var6[2];
                    return "continue|refPar_";

                case 5:
                    return {
                        v: function (tupledArg_2) {
                            return refPar_(new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["i" /* Ref */](refData.Cat, refData.Author, refData.Title, refData.Year, tupledArg_2[0], refData.URL), tupledArg_2[1]);
                        }(dateFormat($var6[1]))
                    };

                case 6:
                    return {
                        v: [refData, $var6[1]]
                    };

                case 7:
                    refData = refData;
                    tLst_1 = $var6[1];
                    return "continue|refPar_";

                case 8:
                    return {
                        v: [refData, new __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]()]
                    };
            }
        };

        refPar_: while (true) {
            var _ret = _loop();

            switch (_ret) {
                case "continue|refPar_":
                    continue refPar_;

                default:
                    if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
            }
        }
    };

    return function (tupledArg_3) {
        return [refInLine(style, tupledArg_3[0]), ref2TLine(style, tupledArg_3[0])];
    }(Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(refPar_)(new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["i" /* Ref */](null, null, null, null, null, null))(tLst));
}
function refParse(style, tocLst) {
    var ind = Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_Seq__["o" /* tryFindIndex */])(function (x) {
        return x.Equals(new __WEBPACK_IMPORTED_MODULE_2__Types_fs__["r" /* Token */](32));
    }, tocLst);

    if (ind == null) {
        return function (tupledArg) {
            return [tupledArg[0], tupledArg[1], new __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]()];
        }(refParser(style, tocLst));
    } else {
        var patternInput = Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["k" /* splitAt */])(Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(ind), tocLst);
        return function (tupledArg_1) {
            return [tupledArg_1[0], tupledArg_1[1], Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_List__["l" /* tail */])(patternInput[1])];
        }(refParser(style, patternInput[0]));
    }
}

/***/ }),
/* 34 */
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Types_fs__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_Util__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_List__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__LexerShared_fs__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Shared_fs__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_String__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_11_fable_core_Seq__ = __webpack_require__(1);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }













var LexerState = function () {
    function LexerState(tag, data) {
        _classCallCheck(this, LexerState);

        this.tag = tag | 0;
        this.data = data;
    }

    _createClass(LexerState, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["a" /* default */].reflection,
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
            return this === other || this.tag === other.tag && Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_Util__["l" /* equals */])(this.data, other.data);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_Util__["j" /* compareUnions */])(this, other) | 0;
        }
    }]);

    return LexerState;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["b" /* setType */])("Lexer.LexerState", LexerState);
var htmlSingleton = Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])(["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"]);

var _EscapedCharTok___ = Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(function () {
    var tType = function tType(arg0) {
        return new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["r" /* Token */](1, arg0);
    };

    return function (str) {
        return Object(__WEBPACK_IMPORTED_MODULE_5__LexerShared_fs__["b" /* $7C$EscapedChar$7C$_$7C$ */])(tType, __WEBPACK_IMPORTED_MODULE_6__Shared_fs__["a" /* charList */], str);
    };
}());



var _CharacterTok___ = Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(function (str) {
    return Object(__WEBPACK_IMPORTED_MODULE_5__LexerShared_fs__["a" /* $7C$Character$7C$_$7C$ */])(__WEBPACK_IMPORTED_MODULE_6__Shared_fs__["a" /* charList */], str);
});



function _MatchLang___(_arg1) {
    var activePatternResult786 = Object(__WEBPACK_IMPORTED_MODULE_5__LexerShared_fs__["d" /* $7C$RegexMatch$7C$_$7C$ */])("(p|P)ython", _arg1);

    if (activePatternResult786 != null) {
        return new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["d" /* Language */](0);
    } else {
        var activePatternResult784 = Object(__WEBPACK_IMPORTED_MODULE_5__LexerShared_fs__["d" /* $7C$RegexMatch$7C$_$7C$ */])("F#|fsharp|f#", _arg1);

        if (activePatternResult784 != null) {
            return new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["d" /* Language */](1);
        } else {
            var activePatternResult782 = Object(__WEBPACK_IMPORTED_MODULE_5__LexerShared_fs__["d" /* $7C$RegexMatch$7C$_$7C$ */])("(C|c)(\\+\\+|pp)", _arg1);

            if (activePatternResult782 != null) {
                return new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["d" /* Language */](2);
            } else {
                var activePatternResult780 = Object(__WEBPACK_IMPORTED_MODULE_5__LexerShared_fs__["d" /* $7C$RegexMatch$7C$_$7C$ */])("C|c", _arg1);

                if (activePatternResult780 != null) {
                    return new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["d" /* Language */](3);
                } else {
                    return new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["d" /* Language */](4);
                }
            }
        }
    }
}



var _HTMLStartTag___ = Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(function (str) {
    return Object(__WEBPACK_IMPORTED_MODULE_5__LexerShared_fs__["d" /* $7C$RegexMatch$7C$_$7C$ */])("^<([a-zA-Z]+)\\s*.*?>", str);
});



var _HTMLEndTag___ = Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(function (str) {
    return Object(__WEBPACK_IMPORTED_MODULE_5__LexerShared_fs__["d" /* $7C$RegexMatch$7C$_$7C$ */])("^<\\/([a-zA-Z]+)\\s*.*?>", str);
});



var _HTMLSingleton___ = Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(function (str) {
    return Object(__WEBPACK_IMPORTED_MODULE_5__LexerShared_fs__["d" /* $7C$RegexMatch$7C$_$7C$ */])("^<([a-zA-Z]+)\\s*.*?(?:\\/>|>)", str);
});



var _CodeBlockStart___ = Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(function (_arg1) {
    return Object(__WEBPACK_IMPORTED_MODULE_5__LexerShared_fs__["c" /* $7C$GroupMatch$7C$_$7C$ */])("^```+\\s*([a-zA-Z0-9+\\-_]*)", _arg1);
});


function nextToken(state, s) {
    var matchValue = [s, state];

    var activePatternResult803 = _EscapedCharTok___(matchValue[0]);

    if (activePatternResult803 != null) {
        return [Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult803), state];
    } else {
        var $var1 = void 0;

        var activePatternResult802 = _HTMLStartTag___(matchValue[0]);

        if (activePatternResult802 != null) {
            if (Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult802)[1].tail != null) {
                if (Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult802)[1].tail.tail == null) {
                    if (matchValue[1].tag === 0) {
                        $var1 = [0, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult802)[2], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult802)[0], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult802)[1].head];
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
                return [[new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["r" /* Token */](1, $var1[2]), $var1[1]], new LexerState(2, [$var1[3], 1])];

            case 1:
                var $var2 = void 0;

                var activePatternResult801 = _HTMLStartTag___(matchValue[0]);

                if (activePatternResult801 != null) {
                    if (Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult801)[1].tail != null) {
                        if (Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult801)[1].tail.tail == null) {
                            if (matchValue[1].tag === 2) {
                                $var2 = [0, matchValue[1].data[1], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult801)[2], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult801)[0], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult801)[1].head, matchValue[1].data[0]];
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
                            return [[new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["r" /* Token */](1, $var2[3]), $var2[2]], new LexerState(2, [$var2[5], $var2[1] + 1])];
                        } else {
                            return [[new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["r" /* Token */](1, $var2[3]), $var2[2]], new LexerState(2, [$var2[5], $var2[1]])];
                        }

                    case 1:
                        var $var3 = void 0;

                        var activePatternResult800 = _HTMLEndTag___(matchValue[0]);

                        if (activePatternResult800 != null) {
                            if (Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult800)[1].tail != null) {
                                if (Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult800)[1].tail.tail == null) {
                                    if (matchValue[1].tag === 2) {
                                        $var3 = [0, matchValue[1].data[1], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult800)[2], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult800)[0], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult800)[1].head, matchValue[1].data[0]];
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
                                        return [[new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["r" /* Token */](1, $var3[3]), $var3[2]], new LexerState(0)];
                                    } else {
                                        return [[new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["r" /* Token */](1, $var3[3]), $var3[2]], new LexerState(2, [$var3[5], $var3[1] - 1])];
                                    }
                                } else {
                                    return [[new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["r" /* Token */](1, $var3[3]), $var3[2]], new LexerState(2, [$var3[5], $var3[1]])];
                                }

                            case 1:
                                var activePatternResult799 = _HTMLSingleton___(matchValue[0]);

                                if (activePatternResult799 != null) {
                                    return [[new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["r" /* Token */](1, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult799)[0]), Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult799)[2]], state];
                                } else {
                                    var $var4 = void 0;

                                    var activePatternResult798 = Object(__WEBPACK_IMPORTED_MODULE_5__LexerShared_fs__["d" /* $7C$RegexMatch$7C$_$7C$ */])(".*?(?=<)", matchValue[0]);

                                    if (activePatternResult798 != null) {
                                        if (matchValue[1].tag === 2) {
                                            $var4 = [0, matchValue[1].data[1], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult798)[2], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult798)[0], matchValue[1].data[0]];
                                        } else {
                                            $var4 = [1];
                                        }
                                    } else {
                                        $var4 = [1];
                                    }

                                    switch ($var4[0]) {
                                        case 0:
                                            return [[new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["r" /* Token */](1, $var4[3]), $var4[2]], new LexerState(2, [$var4[4], $var4[1]])];

                                        case 1:
                                            var activePatternResult796 = _CharacterTok___(matchValue[0]);

                                            if (activePatternResult796 != null) {
                                                return [Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult796), state];
                                            } else {
                                                var activePatternResult795 = Object(__WEBPACK_IMPORTED_MODULE_5__LexerShared_fs__["d" /* $7C$RegexMatch$7C$_$7C$ */])("^\\s+", matchValue[0]);

                                                if (activePatternResult795 != null) {
                                                    return [[new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["r" /* Token */](2, Object(__WEBPACK_IMPORTED_MODULE_6__Shared_fs__["h" /* replaceChars */])("\t", "  ", Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult795)[0]).length), Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult795)[2]], state];
                                                } else {
                                                    var activePatternResult793 = Object(__WEBPACK_IMPORTED_MODULE_5__LexerShared_fs__["d" /* $7C$RegexMatch$7C$_$7C$ */])("^[0-9]+", matchValue[0]);

                                                    if (activePatternResult793 != null) {
                                                        return [[new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["r" /* Token */](3, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult793)[0]), Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult793)[2]], state];
                                                    } else {
                                                        var activePatternResult791 = Object(__WEBPACK_IMPORTED_MODULE_5__LexerShared_fs__["d" /* $7C$RegexMatch$7C$_$7C$ */])(Object(__WEBPACK_IMPORTED_MODULE_5__LexerShared_fs__["e" /* literalString */])(__WEBPACK_IMPORTED_MODULE_6__Shared_fs__["a" /* charList */]), matchValue[0]);

                                                        if (activePatternResult791 != null) {
                                                            return [[new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["r" /* Token */](1, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult791)[0]), Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult791)[2]], state];
                                                        } else {
                                                            __WEBPACK_IMPORTED_MODULE_6__Shared_fs__["j" /* sharedLog */].Warn(null)(Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_String__["h" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_String__["b" /* printf */])("Unrecognised character: %A"))(matchValue[0]));
                                                            return [[new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["r" /* Token */](1, Object(__WEBPACK_IMPORTED_MODULE_5__LexerShared_fs__["f" /* toString */])(matchValue[0][0])), Object(__WEBPACK_IMPORTED_MODULE_6__Shared_fs__["i" /* sOnwards */])(1, matchValue[0])], state];
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
            return new __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["r" /* Token */](32), tokList);
        } else {
            var patternInput = nextToken(state_1, s);
            var st_ = patternInput[0][1];
            var nt = patternInput[0][0];
            return Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(lexS_)(patternInput[1], st_)(new __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](nt, tokList));
        }
    };

    var matchValue = [source, state];
    var $var5 = void 0;

    var activePatternResult813 = _CodeBlockStart___(matchValue[0]);

    if (activePatternResult813 != null) {
        var activePatternResult814 = _MatchLang___(Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult813));

        if (activePatternResult814 != null) {
            if (matchValue[1].tag === 0) {
                $var5 = [0, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult814)];
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
            return [new __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](), new LexerState(1, ["", $var5[1]])];

        case 1:
            var $var6 = void 0;

            var activePatternResult812 = Object(__WEBPACK_IMPORTED_MODULE_5__LexerShared_fs__["d" /* $7C$RegexMatch$7C$_$7C$ */])("^```+", matchValue[0]);

            if (activePatternResult812 != null) {
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
                    return [Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["r" /* Token */](0, [$var6[2], $var6[1]]), new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["r" /* Token */](32)]), new LexerState(0)];

                case 1:
                    if (matchValue[1].tag === 1) {
                        return [new __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](), new LexerState(1, [matchValue[1].data[0] + source + "\n", matchValue[1].data[1]])];
                    } else {
                        var activePatternResult810 = Object(__WEBPACK_IMPORTED_MODULE_5__LexerShared_fs__["d" /* $7C$RegexMatch$7C$_$7C$ */])("^\\s*$", matchValue[0]);

                        if (activePatternResult810 != null) {
                            return [Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["r" /* Token */](32)]), state];
                        } else {
                            return [Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(lexS_(state, source, new __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]())), state];
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
        return Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["r" /* Token */](0, [s, l]), new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["r" /* Token */](32)]);
    } else if (_arg1[1].tag === 2) {
        var str = _arg1[1].data[0];
        return Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_List__["a" /* append */])(_arg1[0], Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["r" /* Token */](1, str), new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["r" /* Token */](32)]));
    } else {
        return _arg1[0];
    }
}
var lex = Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(function ($var7) {
    var state;
    return function (tupledArg) {
        return returnTokens(tupledArg[0], tupledArg[1]);
    }((state = new LexerState(0), function (source) {
        return lexS(state, source);
    })($var7));
});
function lexList(strl) {
    var f = function f(tupledArg, nstr) {
        var patternInput = lexS(tupledArg[1], nstr);
        return [Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_List__["a" /* append */])(tupledArg[0], patternInput[0]), patternInput[1]];
    };

    return function (tupledArg_1) {
        return returnTokens(tupledArg_1[0], tupledArg_1[1]);
    }(Object(__WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_11_fable_core_Seq__["f" /* fold */])(f, [Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["r" /* Token */](32), new __WEBPACK_IMPORTED_MODULE_1__Types_fs__["r" /* Token */](32)]), new LexerState(0)], strl));
}

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Token */
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
/* unused harmony export Macro */
/* unused harmony export Sub */
/* unused harmony export Parser */
/* unused harmony export findParseUntil */
/* unused harmony export splitList */
/* unused harmony export splitListEval */
/* unused harmony export stripWhiteSpace */
/* unused harmony export $7C$KeyWord$7C$_$7C$ */
/* unused harmony export $7C$ParamList$7C$_$7C$ */
/* unused harmony export $7C$ArgList$7C$_$7C$ */
/* unused harmony export $7C$Function$7C$_$7C$ */
/* unused harmony export $7C$MacroDef$7C$_$7C$ */
/* unused harmony export $7C$EvalDef$7C$_$7C$ */
/* unused harmony export $7C$SChar$7C$_$7C$ */
/* unused harmony export $7C$Include$7C$_$7C$ */
/* unused harmony export parse */
/* unused harmony export evaluateWithDir */
/* unused harmony export evaluate */
/* unused harmony export parserToString */
/* unused harmony export toStringList */
/* unused harmony export pETS */
/* unused harmony export preprocess */
/* unused harmony export preprocessWithDir */
/* unused harmony export preprocessList */
/* harmony export (immutable) */ __webpack_exports__["a"] = preprocessListWithDir;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__LexerShared_fs__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Choice__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Shared_fs__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Seq__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_11_fable_core_Map__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__nuget_packages_fable_core_1_3_11_fable_core_Comparer__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__FableFileIO_fs__ = __webpack_require__(36);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }















var Token = function () {
    function Token(tag, data) {
        _classCallCheck(this, Token);

        this.tag = tag | 0;
        this.data = data;
    }

    _createClass(Token, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Preprocessor.Token",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: [["LITERAL", "string"], ["MACRO"], ["OPENDEF"], ["CLOSEDEF"], ["OPENEVAL"], ["CLOSEEVAL"], ["LBRA"], ["RBRA"], ["SEMICOLON"], ["ENDLINE"], ["BSLASH"], ["INCLUDE"]]
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return this === other || this.tag === other.tag && Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["l" /* equals */])(this.data, other.data);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["j" /* compareUnions */])(this, other) | 0;
        }
    }]);

    return Token;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["b" /* setType */])("Preprocessor.Token", Token);
var charList = Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([["{%", new Token(2)], ["%}", new Token(3)], ["{{", new Token(4)], ["}}", new Token(5)], ["(", new Token(6)], [")", new Token(7)], [";", new Token(8)], ["\\", new Token(10)]]);
var keywordList = Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([["macro", new Token(1)], ["include", new Token(11)]]);

function _WhiteSpace_NonWhiteSpace_(_arg1) {
    var $var1 = void 0;

    if (_arg1.tag === 0) {
        var activePatternResult559 = Object(__WEBPACK_IMPORTED_MODULE_3__LexerShared_fs__["d" /* $7C$RegexMatch$7C$_$7C$ */])("^\\s*$", _arg1.data);

        if (activePatternResult559 != null) {
            $var1 = [0];
        } else {
            $var1 = [1];
        }
    } else {
        $var1 = [1];
    }

    switch ($var1[0]) {
        case 0:
            return new __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Choice__["c" /* default */](0, null);

        case 1:
            return new __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_Choice__["c" /* default */](1, null);
    }
}



var _EscapedCharParse___ = Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(function () {
    var tType = function tType(arg0) {
        return new Token(0, arg0);
    };

    return function (str) {
        return Object(__WEBPACK_IMPORTED_MODULE_3__LexerShared_fs__["b" /* $7C$EscapedChar$7C$_$7C$ */])(tType, charList, str);
    };
}());



var _CharacterParse___ = Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(function (str) {
    return Object(__WEBPACK_IMPORTED_MODULE_3__LexerShared_fs__["a" /* $7C$Character$7C$_$7C$ */])(charList, str);
});



var _KeywordParse___ = Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(function (str) {
    return Object(__WEBPACK_IMPORTED_MODULE_3__LexerShared_fs__["a" /* $7C$Character$7C$_$7C$ */])(keywordList, str);
});


function tokToString(tList) {
    var tokString = function tokString(st, _arg1) {
        if (_arg1.tag === 0) {
            return st + _arg1.data;
        } else {
            var matchValue = Object(__WEBPACK_IMPORTED_MODULE_6__Shared_fs__["c" /* listTryFind */])(_arg1)(Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["a" /* append */])(charList, keywordList));

            if (matchValue != null) {
                return st + Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(matchValue);
            } else {
                return st;
            }
        }
    };

    return Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Seq__["f" /* fold */])(tokString, "", tList);
}
function nextToken(str) {
    var literalMatch = Object(__WEBPACK_IMPORTED_MODULE_3__LexerShared_fs__["e" /* literalString */])(charList);
    var $var2 = void 0;

    var activePatternResult570 = _EscapedCharParse___(str);

    if (activePatternResult570 != null) {
        $var2 = [0, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult570)];
    } else {
        var activePatternResult571 = _CharacterParse___(str);

        if (activePatternResult571 != null) {
            $var2 = [0, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult571)];
        } else {
            var activePatternResult572 = _KeywordParse___(str);

            if (activePatternResult572 != null) {
                $var2 = [0, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult572)];
            } else {
                $var2 = [1];
            }
        }
    }

    switch ($var2[0]) {
        case 0:
            return $var2[1];

        case 1:
            var activePatternResult569 = Object(__WEBPACK_IMPORTED_MODULE_3__LexerShared_fs__["d" /* $7C$RegexMatch$7C$_$7C$ */])("^\\s+", str);

            if (activePatternResult569 != null) {
                return [new Token(0, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult569)[0]), Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult569)[2]];
            } else {
                var activePatternResult567 = Object(__WEBPACK_IMPORTED_MODULE_3__LexerShared_fs__["d" /* $7C$RegexMatch$7C$_$7C$ */])(literalMatch, str);

                if (activePatternResult567 != null) {
                    return [new Token(0, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult567)[0]), Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult567)[2]];
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
                return new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](new Token(9), tList);
            } else {
                var patternInput = nextToken(str_1);
                tList = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](patternInput[0], tList);
                str_1 = patternInput[1];
                continue pTokenize_;
            }
        }
    };

    return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(pTokenize_(new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](), str));
}
var tokenizeList = Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(function (list) {
    return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["b" /* collect */])(tokenize, list);
});
var Macro = function () {
    function Macro(name, args, body) {
        _classCallCheck(this, Macro);

        this.Name = name;
        this.Args = args;
        this.Body = body;
    }

    _createClass(Macro, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Preprocessor.Macro",
                interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
                properties: {
                    Name: "string",
                    Args: Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["o" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */], {
                        T: "string"
                    }),
                    Body: Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["o" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */], {
                        T: Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["c" /* GenericParam */])("T")
                    })
                }
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["m" /* equalsRecords */])(this, other);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["i" /* compareRecords */])(this, other) | 0;
        }
    }]);

    return Macro;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["b" /* setType */])("Preprocessor.Macro", Macro);
var Sub = function () {
    function Sub(name, args, raw) {
        _classCallCheck(this, Sub);

        this.Name = name;
        this.Args = args;
        this.Raw = raw;
    }

    _createClass(Sub, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Preprocessor.Sub",
                interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
                properties: {
                    Name: "string",
                    Args: Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["o" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */], {
                        T: Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["o" /* makeGeneric */])(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */], {
                            T: Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["c" /* GenericParam */])("T")
                        })
                    }),
                    Raw: "string"
                }
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["m" /* equalsRecords */])(this, other);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["i" /* compareRecords */])(this, other) | 0;
        }
    }]);

    return Sub;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["b" /* setType */])("Preprocessor.Sub", Sub);
var Parser = function () {
    function Parser(tag, data) {
        _classCallCheck(this, Parser);

        this.tag = tag | 0;
        this.data = data;
    }

    _createClass(Parser, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Preprocessor.Parser",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: [["MacroDefinition", Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["o" /* makeGeneric */])(Macro, {
                    T: Parser
                })], ["MacroSubstitution", Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["o" /* makeGeneric */])(Sub, {
                    T: Parser
                })], ["IncludeStatement", "string"], ["ParseText", "string"], ["ParseNewLine"]]
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return this === other || this.tag === other.tag && Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["l" /* equals */])(this.data, other.data);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["j" /* compareUnions */])(this, other) | 0;
        }
    }]);

    return Parser;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["b" /* setType */])("Preprocessor.Parser", Parser);
function findParseUntil(otok, ctok, parser) {
    var findParseUntil_ = function findParseUntil_(count, parser_1, retlist) {
        var $var3 = parser_1.tail != null ? (Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["l" /* equals */])(parser_1.head, ctok) ? count === 1 : false) ? [0, parser_1.head, parser_1.tail] : [1] : [1];

        switch ($var3[0]) {
            case 0:
                return [Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(retlist), $var3[2]];

            case 1:
                var $var4 = parser_1.tail != null ? Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["l" /* equals */])(parser_1.head, ctok) ? [0, parser_1.head, parser_1.tail] : [1] : [1];

                switch ($var4[0]) {
                    case 0:
                        return Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(findParseUntil_)(count - 1, $var4[2])(new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]($var4[1], retlist));

                    case 1:
                        var $var5 = parser_1.tail != null ? Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["l" /* equals */])(parser_1.head, otok) ? [0, parser_1.head, parser_1.tail] : [1] : [1];

                        switch ($var5[0]) {
                            case 0:
                                return Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(findParseUntil_)(count + 1, $var5[2])(new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]($var5[1], retlist));

                            case 1:
                                if (parser_1.tail == null) {
                                    return null;
                                } else {
                                    return Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(findParseUntil_)(count, parser_1.tail)(new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](parser_1.head, retlist));
                                }

                        }

                }

        }
    };

    return findParseUntil_(1, parser, new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]());
}
function splitList(esctok, cltok, tok, list) {
    var splitList_ = function splitList_(curr, _final, list_1) {
        splitList_: while (true) {
            var $var6 = list_1.tail != null ? list_1.head.Equals(esctok) ? [0, list_1.head, list_1.tail] : [1] : [1];

            switch ($var6[0]) {
                case 0:
                    var matchValue = findParseUntil(esctok, cltok, $var6[2]);

                    if (matchValue != null) {
                        var tl = Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(matchValue)[1];
                        var l = Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(matchValue)[0];
                        curr = Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["a" /* append */])(new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](new Token(5), Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]($var6[1], l))), curr);
                        _final = _final;
                        list_1 = tl;
                        continue splitList_;
                    } else {
                        curr = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]($var6[1], curr);
                        _final = _final;
                        list_1 = $var6[2];
                        continue splitList_;
                    }

                case 1:
                    var $var7 = list_1.tail != null ? list_1.head.Equals(tok) ? [0, list_1.head, list_1.tail] : [1] : [1];

                    switch ($var7[0]) {
                        case 0:
                            var $var44 = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]();
                            _final = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(curr), _final);
                            list_1 = $var7[2];
                            curr = $var44;
                            continue splitList_;

                        case 1:
                            if (list_1.tail == null) {
                                return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(curr), _final));
                            } else {
                                curr = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](list_1.head, curr);
                                _final = _final;
                                list_1 = list_1.tail;
                                continue splitList_;
                            }

                    }

            }
        }
    };

    return splitList_(new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](), new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](), list);
}
var splitListEval = Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(function () {
    var esctok = new Token(4);
    var cltok = new Token(5);
    var tok = new Token(8);
    return function (list) {
        return splitList(esctok, cltok, tok, list);
    };
}());
function stripWhiteSpace(_arg1) {
    var $var8 = void 0;

    if (_arg1.tail != null) {
        var activePatternResult656 = _WhiteSpace_NonWhiteSpace_(_arg1.head);

        if (activePatternResult656.tag === 0) {
            $var8 = [0, _arg1.tail];
        } else {
            $var8 = [0, _arg1];
        }
    } else {
        $var8 = [0, _arg1];
    }

    switch ($var8[0]) {
        case 0:
            var matchValue = Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])($var8[1]);
            var $var9 = void 0;

            if (matchValue.tail != null) {
                var activePatternResult655 = _WhiteSpace_NonWhiteSpace_(matchValue.head);

                if (activePatternResult655.tag === 0) {
                    $var9 = [0, matchValue.tail];
                } else {
                    $var9 = [0, matchValue];
                }
            } else {
                $var9 = [0, matchValue];
            }

            switch ($var9[0]) {
                case 0:
                    return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])($var9[1]);
            }

    }
}

var _KeyWord___ = Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(function () {
    var listCheckExists = function listCheckExists(t, list) {
        return Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Seq__["e" /* exists */])(function (y) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["l" /* equals */])(t, y);
        }, Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["f" /* map */])(function (tupledArg) {
            return tupledArg[1];
        }, list));
    };

    return function (_arg1) {
        var $var10 = void 0;

        if (_arg1.tail != null) {
            var activePatternResult662 = _WhiteSpace_NonWhiteSpace_(_arg1.head);

            if (activePatternResult662.tag === 0) {
                if (_arg1.tail.tail != null) {
                    $var10 = [0, _arg1.tail.head, _arg1.tail.tail];
                } else {
                    $var10 = [0, _arg1.head, _arg1.tail];
                }
            } else {
                $var10 = [0, _arg1.head, _arg1.tail];
            }
        } else {
            $var10 = [1];
        }

        switch ($var10[0]) {
            case 0:
                var matchValue = listCheckExists($var10[1], keywordList);

                if (matchValue) {
                    return [$var10[1], $var10[2]];
                } else {
                    return null;
                }

            case 1:
                return null;
        }
    };
}());



var _ParamList___ = Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(function () {
    var _NameList___ = function _NameList___(_arg1) {
        var $var11 = void 0;

        if (_arg1.tail != null) {
            if (_arg1.head.tag === 0) {
                var activePatternResult664 = _NameList___(_arg1.tail);

                if (activePatternResult664 != null) {
                    $var11 = [0, _arg1.head.data, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult664)[0], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult664)[1]];
                } else {
                    $var11 = [1];
                }
            } else {
                $var11 = [1];
            }
        } else {
            $var11 = [1];
        }

        switch ($var11[0]) {
            case 0:
                return [new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]($var11[1], $var11[2]), $var11[3]];

            case 1:
                var $var12 = _arg1.tail != null ? _arg1.head.tag === 0 ? [0, _arg1.head.data, _arg1.tail] : [1] : [1];

                switch ($var12[0]) {
                    case 0:
                        return [Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([$var12[1]]), $var12[2]];

                    case 1:
                        return null;
                }

        }
    };

    var _ParamList____1 = function _ParamList____1(_arg2) {
        var $var13 = void 0;

        if (_arg2.tail != null) {
            var activePatternResult669 = _WhiteSpace_NonWhiteSpace_(_arg2.head);

            if (activePatternResult669.tag === 0) {
                $var13 = [0, _arg2.tail];
            } else {
                $var13 = [0, _arg2];
            }
        } else {
            $var13 = [0, _arg2];
        }

        switch ($var13[0]) {
            case 0:
                var $var14 = void 0;

                var activePatternResult667 = _NameList___($var13[1]);

                if (activePatternResult667 != null) {
                    if (Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult667)[1].tail != null) {
                        if (Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult667)[1].head.tag === 8) {
                            var activePatternResult668 = _ParamList____1(Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult667)[1].tail);

                            if (activePatternResult668 != null) {
                                $var14 = [0, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult668)[0], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult667)[0], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult668)[1]];
                            } else {
                                $var14 = [1];
                            }
                        } else {
                            $var14 = [1];
                        }
                    } else {
                        $var14 = [1];
                    }
                } else {
                    $var14 = [1];
                }

                switch ($var14[0]) {
                    case 0:
                        return [new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Seq__["f" /* fold */])(function (x, y) {
                            return x + y;
                        }, "", $var14[2]), $var14[1]), $var14[3]];

                    case 1:
                        var activePatternResult666 = _NameList___($var13[1]);

                        if (activePatternResult666 != null) {
                            return [Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Seq__["f" /* fold */])(function (x_1, y_1) {
                                return x_1 + y_1;
                            }, "", Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult666)[0])]), Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult666)[1]];
                        } else {
                            return [new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](), $var13[1]];
                        }

                }

        }
    };

    return function (_arg3) {
        var $var15 = void 0;

        if (_arg3.tail != null) {
            var activePatternResult672 = _WhiteSpace_NonWhiteSpace_(_arg3.head);

            if (activePatternResult672.tag === 0) {
                $var15 = [0, _arg3.tail];
            } else {
                $var15 = [0, _arg3];
            }
        } else {
            $var15 = [0, _arg3];
        }

        switch ($var15[0]) {
            case 0:
                var $var16 = void 0;

                if ($var15[1].tail != null) {
                    if ($var15[1].head.tag === 6) {
                        var activePatternResult671 = _ParamList____1($var15[1].tail);

                        if (activePatternResult671 != null) {
                            if (Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult671)[1].tail != null) {
                                if (Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult671)[1].head.tag === 7) {
                                    $var16 = [0, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult671)[0], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult671)[1].tail];
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
                } else {
                    $var16 = [1];
                }

                switch ($var16[0]) {
                    case 0:
                        return [$var16[1], $var16[2]];

                    case 1:
                        return null;
                }

        }
    };
}());



function _ArgList___(_arg1) {
    var $var17 = void 0;

    if (_arg1.tail != null) {
        var activePatternResult675 = _WhiteSpace_NonWhiteSpace_(_arg1.head);

        if (activePatternResult675.tag === 0) {
            $var17 = [0, _arg1.tail];
        } else {
            $var17 = [0, _arg1];
        }
    } else {
        $var17 = [0, _arg1];
    }

    switch ($var17[0]) {
        case 0:
            var $var18 = void 0;

            if ($var17[1].tail != null) {
                if ($var17[1].head.tag === 6) {
                    $var18 = [0, $var17[1].tail];
                } else {
                    var activePatternResult674 = _WhiteSpace_NonWhiteSpace_($var17[1].head);

                    if (activePatternResult674.tag === 0) {
                        $var18 = [1, $var17[1].tail];
                    } else {
                        $var18 = [2];
                    }
                }
            } else {
                $var18 = [2];
            }

            switch ($var18[0]) {
                case 0:
                    var matchValue = findParseUntil(new Token(6), new Token(7), $var18[1]);

                    if (matchValue != null) {
                        var tl = Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(matchValue)[1];
                        var p = Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(matchValue)[0];
                        return [function (list) {
                            return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["f" /* map */])(stripWhiteSpace, list);
                        }(splitListEval(p)), tl];
                    } else {
                        return null;
                    }

                case 1:
                    return [new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](), $var18[1]];

                case 2:
                    return null;
            }

    }
}



function _Function___(_arg1) {
    var $var19 = void 0;

    if (_arg1.tail != null) {
        var activePatternResult681 = _WhiteSpace_NonWhiteSpace_(_arg1.head);

        if (activePatternResult681.tag === 0) {
            if (_arg1.tail.tail != null) {
                if (_arg1.tail.head.tag === 0) {
                    $var19 = [0, _arg1.tail.head.data, _arg1.tail.tail];
                } else {
                    $var19 = [1];
                }
            } else {
                $var19 = [1];
            }
        } else {
            $var19 = [1];
        }
    } else {
        $var19 = [1];
    }

    switch ($var19[0]) {
        case 0:
            var $var20 = void 0;

            var activePatternResult679 = _ParamList___($var19[2]);

            if (activePatternResult679 != null) {
                if (Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult679)[1].tail != null) {
                    var activePatternResult680 = _WhiteSpace_NonWhiteSpace_(Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult679)[1].head);

                    if (activePatternResult680.tag === 0) {
                        $var20 = [0, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult679)[0], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult679)[1].tail];
                    } else {
                        $var20 = [0, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult679)[0], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult679)[1]];
                    }
                } else {
                    $var20 = [0, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult679)[0], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult679)[1]];
                }
            } else {
                $var20 = [1];
            }

            switch ($var20[0]) {
                case 0:
                    return [$var19[1], $var20[1], $var20[2]];

                case 1:
                    var $var21 = void 0;

                    if ($var19[2].tail != null) {
                        var activePatternResult678 = _WhiteSpace_NonWhiteSpace_($var19[2].head);

                        if (activePatternResult678.tag === 0) {
                            $var21 = [0, $var19[2].tail];
                        } else {
                            $var21 = [0, $var19[2]];
                        }
                    } else {
                        $var21 = [0, $var19[2]];
                    }

                    switch ($var21[0]) {
                        case 0:
                            return [$var19[1], new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](), $var21[1]];
                    }

            }

        case 1:
            return null;
    }
}



function _MacroDef___(_arg1) {
    var $var22 = void 0;

    if (_arg1.tail != null) {
        if (_arg1.head.tag === 2) {
            var activePatternResult683 = _KeyWord___(_arg1.tail);

            if (activePatternResult683 != null) {
                if (Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult683)[0].tag === 1) {
                    var activePatternResult684 = _Function___(Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult683)[1]);

                    if (activePatternResult684 != null) {
                        $var22 = [0, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult684)];
                    } else {
                        $var22 = [1];
                    }
                } else {
                    $var22 = [1];
                }
            } else {
                $var22 = [1];
            }
        } else {
            $var22 = [1];
        }
    } else {
        $var22 = [1];
    }

    switch ($var22[0]) {
        case 0:
            return $var22[1];

        case 1:
            return null;
    }
}



function _EvalDef___(_arg1) {
    var $var23 = void 0;

    if (_arg1.tail != null) {
        if (_arg1.head.tag === 4) {
            if (_arg1.tail.tail != null) {
                var activePatternResult690 = _WhiteSpace_NonWhiteSpace_(_arg1.tail.head);

                if (activePatternResult690.tag === 0) {
                    $var23 = [0, _arg1.tail.tail];
                } else {
                    $var23 = [0, _arg1.tail];
                }
            } else {
                $var23 = [0, _arg1.tail];
            }
        } else {
            $var23 = [1];
        }
    } else {
        $var23 = [1];
    }

    switch ($var23[0]) {
        case 0:
            var $var24 = void 0;

            if ($var23[1].tail != null) {
                if ($var23[1].head.tag === 0) {
                    var activePatternResult688 = _ArgList___($var23[1].tail);

                    if (activePatternResult688 != null) {
                        if (Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult688)[1].tail != null) {
                            var activePatternResult689 = _WhiteSpace_NonWhiteSpace_(Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult688)[1].head);

                            if (activePatternResult689.tag === 0) {
                                if (Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult688)[1].tail.tail != null) {
                                    if (Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult688)[1].tail.head.tag === 5) {
                                        $var24 = [0, $var23[1].head.data, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult688)[0], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult688)[1].tail.tail];
                                    } else if (Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult688)[1].head.tag === 5) {
                                        $var24 = [0, $var23[1].head.data, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult688)[0], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult688)[1].tail];
                                    } else {
                                        $var24 = [1];
                                    }
                                } else if (Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult688)[1].head.tag === 5) {
                                    $var24 = [0, $var23[1].head.data, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult688)[0], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult688)[1].tail];
                                } else {
                                    $var24 = [1];
                                }
                            } else if (Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult688)[1].head.tag === 5) {
                                $var24 = [0, $var23[1].head.data, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult688)[0], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult688)[1].tail];
                            } else {
                                $var24 = [1];
                            }
                        } else {
                            $var24 = [1];
                        }
                    } else {
                        $var24 = [1];
                    }
                } else {
                    $var24 = [1];
                }
            } else {
                $var24 = [1];
            }

            switch ($var24[0]) {
                case 0:
                    return [$var24[1], $var24[2], $var24[3]];

                case 1:
                    var $var25 = void 0;

                    if ($var23[1].tail != null) {
                        if ($var23[1].head.tag === 0) {
                            if ($var23[1].tail.tail != null) {
                                var activePatternResult687 = _WhiteSpace_NonWhiteSpace_($var23[1].tail.head);

                                if (activePatternResult687.tag === 0) {
                                    if ($var23[1].tail.tail.tail != null) {
                                        if ($var23[1].tail.tail.head.tag === 5) {
                                            $var25 = [0, $var23[1].head.data, $var23[1].tail.tail.tail];
                                        } else if ($var23[1].tail.head.tag === 5) {
                                            $var25 = [0, $var23[1].head.data, $var23[1].tail.tail];
                                        } else {
                                            $var25 = [1];
                                        }
                                    } else if ($var23[1].tail.head.tag === 5) {
                                        $var25 = [0, $var23[1].head.data, $var23[1].tail.tail];
                                    } else {
                                        $var25 = [1];
                                    }
                                } else if ($var23[1].tail.head.tag === 5) {
                                    $var25 = [0, $var23[1].head.data, $var23[1].tail.tail];
                                } else {
                                    $var25 = [1];
                                }
                            } else {
                                $var25 = [1];
                            }
                        } else {
                            $var25 = [1];
                        }
                    } else {
                        $var25 = [1];
                    }

                    switch ($var25[0]) {
                        case 0:
                            return [$var25[1], new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](), $var25[2]];

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
    }(Object(__WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_11_fable_core_Map__["b" /* create */])(Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["f" /* map */])(function (tupledArg) {
        return Object(__WEBPACK_IMPORTED_MODULE_6__Shared_fs__["b" /* invTuple */])(tupledArg[0], tupledArg[1]);
    }, Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["a" /* append */])(charList, keywordList)), new __WEBPACK_IMPORTED_MODULE_10__nuget_packages_fable_core_1_3_11_fable_core_Comparer__["a" /* default */](function (x, y) {
        return x.CompareTo(y);
    })));
}



function _Include___(_arg1) {
    var $var26 = void 0;

    if (_arg1.tail != null) {
        if (_arg1.head.tag === 4) {
            if (_arg1.tail.tail != null) {
                var activePatternResult695 = _WhiteSpace_NonWhiteSpace_(_arg1.tail.head);

                if (activePatternResult695.tag === 0) {
                    $var26 = [0, _arg1.tail.tail];
                } else {
                    $var26 = [0, _arg1.tail];
                }
            } else {
                $var26 = [0, _arg1.tail];
            }
        } else {
            $var26 = [1];
        }
    } else {
        $var26 = [1];
    }

    switch ($var26[0]) {
        case 0:
            var $var27 = void 0;

            if ($var26[1].tail != null) {
                if ($var26[1].head.tag === 11) {
                    if ($var26[1].tail.tail != null) {
                        var activePatternResult693 = _WhiteSpace_NonWhiteSpace_($var26[1].tail.head);

                        if (activePatternResult693.tag === 0) {
                            if ($var26[1].tail.tail.tail != null) {
                                if ($var26[1].tail.tail.head.tag === 0) {
                                    if ($var26[1].tail.tail.tail.tail != null) {
                                        var activePatternResult694 = _WhiteSpace_NonWhiteSpace_($var26[1].tail.tail.tail.head);

                                        if (activePatternResult694.tag === 0) {
                                            if ($var26[1].tail.tail.tail.tail.tail != null) {
                                                if ($var26[1].tail.tail.tail.tail.head.tag === 5) {
                                                    $var27 = [0, $var26[1].tail.tail.head.data, $var26[1].tail.tail.tail.tail.tail];
                                                } else if ($var26[1].tail.tail.tail.head.tag === 5) {
                                                    $var27 = [0, $var26[1].tail.tail.head.data, $var26[1].tail.tail.tail.tail];
                                                } else {
                                                    $var27 = [1];
                                                }
                                            } else if ($var26[1].tail.tail.tail.head.tag === 5) {
                                                $var27 = [0, $var26[1].tail.tail.head.data, $var26[1].tail.tail.tail.tail];
                                            } else {
                                                $var27 = [1];
                                            }
                                        } else if ($var26[1].tail.tail.tail.head.tag === 5) {
                                            $var27 = [0, $var26[1].tail.tail.head.data, $var26[1].tail.tail.tail.tail];
                                        } else {
                                            $var27 = [1];
                                        }
                                    } else {
                                        $var27 = [1];
                                    }
                                } else {
                                    $var27 = [1];
                                }
                            } else {
                                $var27 = [1];
                            }
                        } else {
                            $var27 = [1];
                        }
                    } else {
                        $var27 = [1];
                    }
                } else {
                    $var27 = [1];
                }
            } else {
                $var27 = [1];
            }

            switch ($var27[0]) {
                case 0:
                    return [$var27[1], $var27[2]];

                case 1:
                    return null;
            }

        case 1:
            return null;
    }
}


function parse(tList) {
    var getRaw = function getRaw(list) {
        var getRaw_ = function getRaw_(list_1, curr) {
            if (list_1.tail != null) {
                if (list_1.head.tag === 5) {
                    return new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](new Token(5), curr);
                } else {
                    return Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(getRaw_)(list_1.tail)(new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](list_1.head, curr));
                }
            } else {
                return curr;
            }
        };

        return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(getRaw_(list, new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]()));
    };

    var parse_ = function parse_(endToken, tList_1, pList) {
        var tl_1;
        var e;
        var a_1;
        var tl_2;
        var e_1;
        var a_2;
        var tl_3;
        var e_2;
        var a_3;
        var tl_4;
        var e_3;
        var a_4;

        var pRec = function pRec(f, c, tl) {
            return Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(parse_)(endToken, tl)(new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](f(c), pList));
        };

        var recText = Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(pRec)(function (arg0) {
            return new Parser(3, arg0);
        });
        var matchValue = [tList_1, endToken];

        var activePatternResult717 = _MacroDef___(matchValue[0]);

        if (activePatternResult717 != null) {
            var patternInput = parse_(new Token(3), Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult717)[2], new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]());
            return pRec(function (arg0_1) {
                return new Parser(0, arg0_1);
            }, new Macro(Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult717)[0], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult717)[1], Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(patternInput[0])), patternInput[1]);
        } else {
            var activePatternResult716 = _EvalDef___(matchValue[0]);

            if (activePatternResult716 != null) {
                var args_ = Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["f" /* map */])(function ($var28) {
                    return function (tupledArg) {
                        return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(tupledArg[0]);
                    }(function (a) {
                        return parse_(null, a, new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]());
                    }($var28));
                }, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult716)[1]);
                return pRec(function (arg0_2) {
                    return new Parser(1, arg0_2);
                }, new Sub(Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult716)[0], args_, tokToString(getRaw(tList_1))), Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult716)[2]);
            } else {
                var activePatternResult715 = _Include___(matchValue[0]);

                if (activePatternResult715 != null) {
                    return pRec(function (arg0_3) {
                        return new Parser(2, arg0_3);
                    }, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult715)[0], Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult715)[1]);
                } else {
                    var $var29 = void 0;

                    if (matchValue[0].tail != null) {
                        if (matchValue[0].head.tag === 9) {
                            $var29 = [0, matchValue[0].tail];
                        } else {
                            var activePatternResult714 = _WhiteSpace_NonWhiteSpace_(matchValue[0].head);

                            if (activePatternResult714.tag === 0) {
                                if (matchValue[0].tail.tail != null) {
                                    if (matchValue[1] != null) {
                                        if (tl_1 = matchValue[0].tail.tail, e = Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(matchValue[1]), a_1 = matchValue[0].tail.head, e.Equals(a_1)) {
                                            $var29 = [1, matchValue[0].tail.head, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(matchValue[1]), matchValue[0].tail.tail];
                                        } else if (tl_2 = matchValue[0].tail, e_1 = Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(matchValue[1]), a_2 = matchValue[0].head, e_1.Equals(a_2)) {
                                            $var29 = [1, matchValue[0].head, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(matchValue[1]), matchValue[0].tail];
                                        } else {
                                            $var29 = [2];
                                        }
                                    } else {
                                        $var29 = [2];
                                    }
                                } else if (matchValue[1] != null) {
                                    if (tl_3 = matchValue[0].tail, e_2 = Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(matchValue[1]), a_3 = matchValue[0].head, e_2.Equals(a_3)) {
                                        $var29 = [1, matchValue[0].head, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(matchValue[1]), matchValue[0].tail];
                                    } else {
                                        $var29 = [2];
                                    }
                                } else {
                                    $var29 = [2];
                                }
                            } else if (matchValue[1] != null) {
                                if (tl_4 = matchValue[0].tail, e_3 = Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(matchValue[1]), a_4 = matchValue[0].head, e_3.Equals(a_4)) {
                                    $var29 = [1, matchValue[0].head, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(matchValue[1]), matchValue[0].tail];
                                } else {
                                    $var29 = [2];
                                }
                            } else {
                                $var29 = [2];
                            }
                        }
                    } else {
                        $var29 = [2];
                    }

                    switch ($var29[0]) {
                        case 0:
                            return pRec(function (x) {
                                return x;
                            }, new Parser(4), $var29[1]);

                        case 1:
                            var $var30 = void 0;

                            if ($var29[3].tail != null) {
                                var activePatternResult710 = _WhiteSpace_NonWhiteSpace_($var29[3].head);

                                if (activePatternResult710.tag === 0) {
                                    if ($var29[3].tail.tail != null) {
                                        if ($var29[3].tail.head.tag === 9) {
                                            $var30 = [0, $var29[3].tail.tail];
                                        } else {
                                            $var30 = [0, $var29[3].tail];
                                        }
                                    } else {
                                        $var30 = [0, $var29[3].tail];
                                    }
                                } else if ($var29[3].head.tag === 9) {
                                    $var30 = [0, $var29[3].tail];
                                } else {
                                    $var30 = [0, $var29[3]];
                                }
                            } else {
                                $var30 = [0, $var29[3]];
                            }

                            switch ($var30[0]) {
                                case 0:
                                    return [pList, $var30[1]];
                            }

                        case 2:
                            var $var31 = void 0;

                            if (matchValue[0].tail != null) {
                                if (matchValue[0].head.tag === 0) {
                                    $var31 = [0, matchValue[0].head.data, matchValue[0].tail];
                                } else {
                                    var activePatternResult713 = _SChar___(matchValue[0].head);

                                    if (activePatternResult713 != null) {
                                        $var31 = [1, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(activePatternResult713), matchValue[0].tail];
                                    } else {
                                        $var31 = [2];
                                    }
                                }
                            } else {
                                $var31 = [2];
                            }

                            switch ($var31[0]) {
                                case 0:
                                    return recText($var31[1], $var31[2]);

                                case 1:
                                    return recText($var31[1], $var31[2]);

                                case 2:
                                    return [pList, new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]()];
                            }

                    }
                }
            }
        }
    };

    var patternInput_1 = parse_(null, tList, new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]());
    return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(patternInput_1[0]);
}
function evaluateWithDir(fileDir, pList) {
    var makeEmptyParam = function makeEmptyParam(args) {
        return Object(__WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_11_fable_core_Map__["b" /* create */])(function (list2) {
            return Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Seq__["n" /* toList */])(Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Seq__["q" /* zip */])(args, list2));
        }(Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["h" /* replicate */])(args.length, null)), new __WEBPACK_IMPORTED_MODULE_10__nuget_packages_fable_core_1_3_11_fable_core_Comparer__["a" /* default */](__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["h" /* comparePrimitives */]));
    };

    var addParam = function addParam(p, macro, args_1) {
        var folder;
        return (folder = function folder(s, tupledArg) {
            return Object(__WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_11_fable_core_Map__["a" /* add */])(tupledArg[0], tupledArg[1], s);
        }, function (list) {
            return Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Seq__["f" /* fold */])(folder, p, list);
        })(Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Seq__["n" /* toList */])(Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Seq__["q" /* zip */])(macro.Args, args_1)));
    };

    var makeMacro = function makeMacro(n, args_2, p_1) {
        return new Macro(n, args_2, p_1);
    };

    var mapAdd = function mapAdd(map, k, v) {
        return Object(__WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_11_fable_core_Map__["a" /* add */])(k, v, map);
    };

    var evaluate_ = function evaluate_(pList_1, newPList, param, scope) {
        var evaluateInv_ = function evaluateInv_(pList_2, newPList_1, scope_1, param_1) {
            return evaluate_(pList_2, newPList_1, param_1, scope_1);
        };

        var evaluate__ = function evaluate__(pList_3, list_1) {
            return evaluate_(pList_3, Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["a" /* append */])(list_1, newPList), param, scope);
        };

        if (pList_1.tail != null) {
            if (pList_1.head.tag === 0) {
                return Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(evaluate_)(pList_1.tail, newPList, param)(Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(mapAdd)(scope, pList_1.head.data.Name)(Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(makeMacro)(pList_1.head.data.Name, pList_1.head.data.Args)(Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(evaluateInv_)(pList_1.head.data.Body, new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](), scope)(makeEmptyParam(pList_1.head.data.Args)))));
            } else if (pList_1.head.tag === 1) {
                var _eval = void 0;

                var matchValue = Object(__WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_11_fable_core_Map__["d" /* tryFind */])(pList_1.head.data.Name, param);

                if (matchValue != null) {
                    if (Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(matchValue) != null) {
                        _eval = Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(evaluate_(Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(matchValue)), new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](), param, scope));
                    } else {
                        _eval = Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([pList_1.head]);
                    }
                } else {
                    var matchValue_1 = Object(__WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_11_fable_core_Map__["d" /* tryFind */])(pList_1.head.data.Name, scope);
                    var $var32 = matchValue_1 != null ? pList_1.head.data.Args.tail == null ? [0, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(matchValue_1)] : [1] : [1];

                    switch ($var32[0]) {
                        case 0:
                            _eval = $var32[1].Body;
                            break;

                        case 1:
                            if (matchValue_1 != null) {
                                _eval = Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(evaluateInv_)(Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(matchValue_1).Body, new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](), scope)(addParam(param, Object(__WEBPACK_IMPORTED_MODULE_7__nuget_packages_fable_core_1_3_11_fable_core_Option__["b" /* getValue */])(matchValue_1), pList_1.head.data.Args)));
                            } else {
                                _eval = Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([new Parser(3, pList_1.head.data.Raw)]);
                            }

                            break;
                    }
                }

                return evaluate__(pList_1.tail, _eval);
            } else if (pList_1.head.tag === 2) {
                var addDir = function addDir(str) {
                    var activePatternResult743 = Object(__WEBPACK_IMPORTED_MODULE_3__LexerShared_fs__["d" /* $7C$RegexMatch$7C$_$7C$ */])("^\\/", str);

                    if (activePatternResult743 != null) {
                        return str;
                    } else {
                        return fileDir + str;
                    }
                };

                return function (a) {
                    return evaluate_(Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["a" /* append */])(a, pList_1.tail), newPList, param, scope);
                }(parse(tokenizeList(Object(__WEBPACK_IMPORTED_MODULE_11__FableFileIO_fs__["a" /* readFilePath */])(addDir(pList_1.head.data)))));
            } else {
                return evaluate__(pList_1.tail, Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([pList_1.head]));
            }
        } else {
            return newPList;
        }
    };

    return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(evaluate_(pList, new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](), Object(__WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_11_fable_core_Map__["b" /* create */])(null, new __WEBPACK_IMPORTED_MODULE_10__nuget_packages_fable_core_1_3_11_fable_core_Comparer__["a" /* default */](__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["h" /* comparePrimitives */])), Object(__WEBPACK_IMPORTED_MODULE_9__nuget_packages_fable_core_1_3_11_fable_core_Map__["b" /* create */])(null, new __WEBPACK_IMPORTED_MODULE_10__nuget_packages_fable_core_1_3_11_fable_core_Comparer__["a" /* default */](__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["h" /* comparePrimitives */]))));
}
var evaluate = Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(function (pList) {
    return evaluateWithDir("", pList);
});
function parserToString(pList) {
    return Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Seq__["f" /* fold */])(function (st, _arg1) {
        return _arg1.tag === 3 ? st + _arg1.data : _arg1.tag === 4 ? st + "\n" : st;
    }, "", pList);
}
function toStringList(pList) {
    var f = function f(st, n) {
        var matchValue = [st, n];

        if (matchValue[1].tag === 4) {
            return new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */]("", st);
        } else if (matchValue[1].tag === 3) {
            if (matchValue[0].tail != null) {
                return new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](matchValue[0].head + matchValue[1].data, matchValue[0].tail);
            } else {
                return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([matchValue[1].data]);
            }
        } else {
            return st;
        }
    };

    return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(Object(__WEBPACK_IMPORTED_MODULE_8__nuget_packages_fable_core_1_3_11_fable_core_Seq__["f" /* fold */])(f, new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](), pList));
}
function pETS(dir) {
    var stripLastEndline;
    return Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])((stripLastEndline = function stripLastEndline(l) {
        var matchValue = Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(l);
        var $var33 = matchValue.tail != null ? matchValue.head.tag === 4 ? matchValue.tail.tail == null ? [0, matchValue] : [1, matchValue.tail] : [2] : [2];

        switch ($var33[0]) {
            case 0:
                return $var33[1];

            case 1:
                return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])($var33[1]);

            case 2:
                return l;
        }
    }, function ($var35) {
        return stripLastEndline(function ($var34) {
            return function (pList) {
                return evaluateWithDir(dir, pList);
            }(parse($var34));
        }($var35));
    }));
}
var preprocess = Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(function ($var37) {
    return parserToString(function ($var36) {
        return pETS("")(tokenize($var36));
    }($var37));
});
function preprocessWithDir(dir) {
    return Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(function ($var39) {
        return parserToString(function ($var38) {
            return pETS(dir)(tokenize($var38));
        }($var39));
    });
}
var preprocessList = Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(function ($var41) {
    return toStringList(function ($var40) {
        return pETS("")(function (list) {
            return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["b" /* collect */])(tokenize, list);
        }($var40));
    }($var41));
});
function preprocessListWithDir(dir) {
    return Object(__WEBPACK_IMPORTED_MODULE_5__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(function ($var43) {
        return toStringList(function ($var42) {
            return pETS(dir)(function (list) {
                return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["b" /* collect */])(tokenize, list);
            }($var42));
        }($var43));
    });
}

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export writeToFile */
/* unused harmony export splitString */
/* harmony export (immutable) */ __webpack_exports__["a"] = readFilePath;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fs__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_fs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Seq__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_String__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_Option__ = __webpack_require__(4);




function writeToFile(str, path) {
    var errorHandler = function errorHandler(_err) {};

    __WEBPACK_IMPORTED_MODULE_0_fs__["writeFile"](path, str, errorHandler);
}
function splitString(s) {
    return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Seq__["n" /* toList */])(Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_String__["e" /* split */])(s, ["\n"], null, 0));
}
function readFilePath(path) {
    return splitString(function (s) {
        return s.toString();
    }(__WEBPACK_IMPORTED_MODULE_0_fs__["readFileSync"](path, Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_Option__["c" /* makeSome */])())));
}

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 38 */
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Logger_Logger_fs__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_String__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_Seq__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_List__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Types_fs__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Shared_fs__ = __webpack_require__(9);







var logger = new __WEBPACK_IMPORTED_MODULE_0__Logger_Logger_fs__["a" /* Logger */](1);
function surround(pat, str) {
    var pat2 = pat === "(" ? ")" : pat === "[" ? "]" : pat === "{" ? "}" : pat;
    return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_String__["h" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_String__["b" /* printf */])("%s%s%s"))(pat, str, pat2);
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
        return pStr + (ele.tag === 1 ? sbraSurround(mdFStr(ele.data[0])) + braSurround(ele.data[1]) : ele.tag === 2 ? Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_String__["h" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_String__["b" /* printf */])("!%s"))(sbraSurround(ele.data[0])) + braSurround(ele.data[1]) : mdFStr(ele.data));
    };

    return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_Seq__["f" /* fold */])(convertMd, Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_String__["h" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_String__["b" /* printf */])("%s"))(b), eles);
}


var mdInlineElements = Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(function (eles) {
    return mdInlineElements_("", eles);
});
function mdParagraph(lines) {
    var folder = function folder(pLinesStr, line) {
        return pLinesStr + mdInlineElements(line);
    };

    return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_Seq__["f" /* fold */])(folder, "", lines) + "\n\n";
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
        return Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_List__["f" /* map */])(mapping, list);
    };

    var headerRows = takeoutCells(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_List__["d" /* filter */])(containHeader, rows));
    var bodyRows = takeoutCells(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_List__["d" /* filter */])(function ($var1) {
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

        return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_Seq__["f" /* fold */])(Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(cellsFolder)(alignRow), "|", row_1);
    };

    var foldRows = function foldRows(alignRow_2, rows_1) {
        var rowsFolder = function rowsFolder(alignRow_3, pStr_1, row_2) {
            return pStr_1 + foldCells(alignRow_3, row_2) + "\n";
        };

        return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_Seq__["f" /* fold */])(Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(rowsFolder)(alignRow_2), "", rows_1);
    };

    var foldNormalRows = Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(foldRows)(false);
    var foldAlignRow = Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(foldCells)(true);
    return foldNormalRows(headerRows) + foldAlignRow(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_List__["e" /* head */])(headerRows)) + foldNormalRows(bodyRows) + "\n\n";
}
function mdList(list) {
    var mdListItem = function mdListItem(ord, tab, tupledArg, li) {
        var makeTabs = function makeTabs(num) {
            if (num <= 0) {
                return "";
            } else {
                return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_String__["d" /* replicate */])(num, "\t");
            }
        };

        var retFold = function retFold(s) {
            return [tupledArg[0] + s, tupledArg[1] + 1];
        };

        if (li.tag === 0) {
            return retFold(mdList(li.data));
        } else {
            return retFold(function (s_1) {
                var matchValue = [ord, s_1];

                if (matchValue[1] === "") {
                    return "";
                } else if (matchValue[0]) {
                    return Object(__WEBPACK_IMPORTED_MODULE_0__Logger_Logger_fs__["d" /* logPassN */])(logger.Debug, Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_String__["h" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_String__["b" /* printf */])("%s%i. %s\n"))(makeTabs(tab), tupledArg[1], s_1));
                } else {
                    return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_String__["h" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_String__["b" /* printf */])("%s- %s\n"))(makeTabs(tab), s_1);
                }
            }(mdInlineElements(li.data)));
        }
    };

    var ord_1 = list.ListType.Equals(new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["q" /* TListType */](1));
    return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_Seq__["f" /* fold */])(Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(mdListItem)(ord_1, list.Depth - 1), ["", 1], list.ListItem)[0];
}
function mdHeader(header) {
    return Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_String__["h" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_String__["b" /* printf */])("%s %s\n")))(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_String__["d" /* replicate */])(header.Level, "#"))(mdInlineElements(header.HeaderName));
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
                    return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_String__["h" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_String__["b" /* printf */])("%s\n"))(mdList(pObj.data));

                case 1:
                    return mdHeader(pObj.data[0]);

                default:
                    return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_String__["h" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_String__["b" /* printf */])("%A is not implemented"))(pObj);
            }
        }();
    };

    return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_Seq__["f" /* fold */])(folder, "", pObjs);
}

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export dLogger */
/* unused harmony export strFStr */
/* unused harmony export strInlineElements */
/* unused harmony export strParagraph */
/* unused harmony export strTable */
/* unused harmony export strList */
/* unused harmony export strHeader */
/* unused harmony export strFootnote */
/* unused harmony export $7C$MatchHeaderAndSubHeader$7C$_$7C$ */
/* unused harmony export strToC */
/* harmony export (immutable) */ __webpack_exports__["a"] = strBody;
/* unused harmony export genHead */
/* unused harmony export genBody */
/* unused harmony export genHTML */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Logger_Logger_fs__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__HTMLGenHelpers_fs__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_Seq__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_String__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Types_fs__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__ = __webpack_require__(5);
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
        var attrs;
        return pStr + (ele.tag === 1 ? Object(__WEBPACK_IMPORTED_MODULE_1__HTMLGenHelpers_fs__["a" /* attachHTMLTag */])("a", Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([["href", ele.data[1]]]), true, strFStr(ele.data[0])) : ele.tag === 2 ? (attrs = Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([["src", ele.data[1]], ["alt", ele.data[0]]]), Object(__WEBPACK_IMPORTED_MODULE_1__HTMLGenHelpers_fs__["a" /* attachHTMLTag */])("img", attrs, false, "")) : strFStr(ele.data));
    };

    return Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_Seq__["f" /* fold */])(convertHtml, "", eles);
}
function strParagraph(lines) {
    var folder = function folder(pLinesStr, line) {
        return pLinesStr + strInlineElements(line) + "\r\n";
    };

    return Object(__WEBPACK_IMPORTED_MODULE_1__HTMLGenHelpers_fs__["c" /* attachSimpleTag */])("p")(function (x) {
        return Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_String__["i" /* trim */])(x, "both");
    }(Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_Seq__["f" /* fold */])(folder, "", lines)));
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
        return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["f" /* map */])(mapping, list);
    };

    var headerRows = takeoutCells(Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["d" /* filter */])(containHeader, rows));
    var bodyRows = takeoutCells(Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["d" /* filter */])(function ($var1) {
        return function (value) {
            return !value;
        }(containHeader($var1));
    }, rows));

    var foldCells = function foldCells(row_1) {
        var cellsFolder = function cellsFolder(pStr, cell) {
            var tagName = cell.data[1] ? "th" : "td";
            var cellContent = strInlineElements(cell.data[0]);
            var alignAttr = cell.data[2].tag === 1 ? ["align", "right"] : cell.data[2].tag === 2 ? ["align", "left"] : cell.data[2].tag === 3 ? ["", ""] : ["align", "center"];
            return pStr + Object(__WEBPACK_IMPORTED_MODULE_1__HTMLGenHelpers_fs__["a" /* attachHTMLTag */])(tagName, Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([alignAttr]), true, cellContent);
        };

        return Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_Seq__["f" /* fold */])(cellsFolder, "", row_1);
    };

    var foldRows = function foldRows(rows_1) {
        var rowsFolder = function rowsFolder(pStr_1, row_2) {
            return function (s) {
                return pStr_1 + s;
            }(Object(__WEBPACK_IMPORTED_MODULE_1__HTMLGenHelpers_fs__["c" /* attachSimpleTag */])("tr")(foldCells(row_2)));
        };

        return Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_Seq__["f" /* fold */])(rowsFolder, "", rows_1);
    };

    return Object(__WEBPACK_IMPORTED_MODULE_1__HTMLGenHelpers_fs__["c" /* attachSimpleTag */])("table")(function (s_1) {
        return s_1 + Object(__WEBPACK_IMPORTED_MODULE_1__HTMLGenHelpers_fs__["c" /* attachSimpleTag */])("tbody")(foldRows(bodyRows));
    }(Object(__WEBPACK_IMPORTED_MODULE_1__HTMLGenHelpers_fs__["c" /* attachSimpleTag */])("thead")(foldRows(headerRows))));
}
function strList(list) {
    var strListItem = function strListItem(pStr, li) {
        return pStr + (li.tag === 0 ? strList(li.data) : Object(__WEBPACK_IMPORTED_MODULE_1__HTMLGenHelpers_fs__["c" /* attachSimpleTag */])("li")(strInlineElements(li.data)));
    };

    var listTag = list.ListType.Equals(new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["q" /* TListType */](0)) ? "ul" : "ol";
    return Object(__WEBPACK_IMPORTED_MODULE_1__HTMLGenHelpers_fs__["c" /* attachSimpleTag */])(listTag)(Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_Seq__["f" /* fold */])(strListItem, "", list.ListItem));
}
function strHeader(header, id) {
    var attributes;
    var tagName = "h" + header.Level.toString();
    return (attributes = Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([["id", id]]), function (content) {
        return Object(__WEBPACK_IMPORTED_MODULE_1__HTMLGenHelpers_fs__["a" /* attachHTMLTag */])(tagName, attributes, true, content);
    })(strInlineElements(header.HeaderName));
}
function strFootnote(id, s) {
    return Object(__WEBPACK_IMPORTED_MODULE_1__HTMLGenHelpers_fs__["a" /* attachHTMLTag */])("p", Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([["id", "#footnote-" + id]]), true, strInlineElements(s));
}

function _MatchHeaderAndSubHeader___(hds) {
    var $var2 = hds.tail != null ? hds.tail.tail != null ? [0, hds.head, hds.tail.head] : [1] : [1];

    switch ($var2[0]) {
        case 0:
            if ($var2[2].Level > $var2[1].Level) {
                return [Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["e" /* head */])(hds), Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["l" /* tail */])(hds)];
            } else {
                return null;
            }

        case 1:
            return null;
    }
}


function strToC(toc) {
    var ListItem_7;

    var appendListItem = function appendListItem(s, i) {
        var ListItem = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](i, s.ListItem);
        return new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["o" /* TList */](s.ListType, ListItem, s.Depth);
    };

    var fstAppendListItem = function fstAppendListItem(s_1, i_1) {
        return appendListItem(s_1[0], i_1);
    };

    var appendToNested = function appendToNested(s_2, appendee) {
        var ListItem_1;
        var $var3 = s_2.ListItem.tail != null ? s_2.ListItem.head.tag === 0 ? [0, s_2.ListItem.head.data, s_2.ListItem.tail] : [1] : [1];

        switch ($var3[0]) {
            case 0:
                dLogger.Debug(null)(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_String__["h" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_String__["b" /* printf */])("Append to nested: %A"))(appendee));
                var ListItem_2 = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["p" /* TListItem */](0, (ListItem_1 = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](appendee, $var3[1].ListItem), new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["o" /* TList */]($var3[1].ListType, ListItem_1, $var3[1].Depth))), $var3[2]);
                return new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["o" /* TList */](s_2.ListType, ListItem_2, s_2.Depth);

            case 1:
                dLogger.Debug(null)(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_String__["h" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_String__["b" /* printf */])("Create nested with: %A"))(appendee));
                return Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(appendListItem)(s_2)(appendee);
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
                    return Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_String__["g" /* toFail */])(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_String__["b" /* printf */])("List shouldn't be empty: %A"))(s_4);
                } else {
                    return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["a" /* append */])(appendToNestedD_(n_1 - 1, getNest(_arg2.head)).ListItem, _arg2.tail);
                }
            };

            var matchValue = [n_1, s_4];

            if (matchValue[0] > 0) {
                var ListItem_3 = recurse(matchValue[1].ListItem);
                return new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["o" /* TList */](matchValue[1].ListType, ListItem_3, matchValue[1].Depth);
            } else if (matchValue[0] === 0) {
                return Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(appendToNested)(matchValue[1])(appendee_1);
            } else if (matchValue[0] < 0) {
                throw new Error("Negative depth, shouldn't happen.");
            } else {
                return Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_String__["g" /* toFail */])(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_String__["b" /* printf */])("n is: %i, s is: %A"))(n_1, s_4);
            }
        };

        return appendToNestedD_(n, s_3);
    };

    var fold = function fold(s_5, _arg3) {
        if (_arg3.Level === 1) {
            return [Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(fstAppendListItem)(s_5)(new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["p" /* TListItem */](1, _arg3.HeaderName)), _arg3.Level];
        } else if (_arg3.Level > s_5[1]) {
            return [Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(appendToNestedD)(0, s_5[0])(new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["p" /* TListItem */](0, new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["o" /* TList */](new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["q" /* TListType */](1), Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["p" /* TListItem */](1, _arg3.HeaderName)]), s_5[1]))), _arg3.Level];
        } else if (_arg3.Level === s_5[1]) {
            dLogger.Debug(null)(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_String__["h" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_String__["b" /* printf */])("Append: %A %i"))(_arg3.HeaderName, _arg3.Level));
            return [Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(appendToNested)(s_5[0])(new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["p" /* TListItem */](1, _arg3.HeaderName)), _arg3.Level];
        } else if (_arg3.Level < s_5[1]) {
            return [Object(__WEBPACK_IMPORTED_MODULE_6__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])(appendToNestedD)(_arg3.Level - 2, s_5[0])(new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["p" /* TListItem */](1, _arg3.HeaderName)), _arg3.Level];
        } else {
            return s_5;
        }
    };

    var revList = function revList(l) {
        var revListItemList = function revListItemList(li) {
            var revRecurse = function revRecurse(_arg4) {
                var ListItem_4;

                if (_arg4.tag === 0) {
                    return new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["p" /* TListItem */](0, (ListItem_4 = revListItemList(_arg4.data.ListItem), new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["o" /* TList */](_arg4.data.ListType, ListItem_4, _arg4.data.Depth)));
                } else {
                    return _arg4;
                }
            };

            return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["f" /* map */])(revRecurse, li));
        };

        var ListItem_5 = Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(revListItemList(l.ListItem));
        return new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["o" /* TList */](l.ListType, ListItem_5, l.Depth);
    };

    return strList(revList(function (l_1) {
        var ListItem_6 = Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["i" /* reverse */])(l_1.ListItem);
        return new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["o" /* TList */](l_1.ListType, ListItem_6, l_1.Depth);
    }(Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_Seq__["f" /* fold */])(fold, [(ListItem_7 = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](), new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["o" /* TList */](new __WEBPACK_IMPORTED_MODULE_5__Types_fs__["q" /* TListType */](1), ListItem_7, 1)), 1], toc.HeaderLst)[0])));
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
                    return Object(__WEBPACK_IMPORTED_MODULE_1__HTMLGenHelpers_fs__["a" /* attachHTMLTag */])("code", Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([["language", Object(__WEBPACK_IMPORTED_MODULE_7__Shared_fs__["d" /* mapLang */])(pObj.data[1])]]), true, pObj.data[0]);

                case 6:
                    return strTable(pObj.data);

                case 3:
                    return strList(pObj.data);

                case 1:
                    return strHeader(pObj.data[0], pObj.data[1]);

                case 8:
                    return strFootnote(pObj.data[0].toString(), pObj.data[1]);

                case 9:
                    return strFootnote(pObj.data[0], pObj.data[2]);

                case 2:
                    return strToC(pObj.data);

                default:
                    return Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_String__["h" /* toText */])(Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_String__["b" /* printf */])("%A is not implemented"))(pObj);
            }
        }();
    };

    return Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_Seq__["f" /* fold */])(folder, "", pObjs);
}
function genHead(htmlTitle) {
    var metaData = Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([["name", "viewport"], ["content", "width=device-width"]])]);

    var genMetadata = function genMetadata(pStr, md) {
        return pStr + Object(__WEBPACK_IMPORTED_MODULE_1__HTMLGenHelpers_fs__["b" /* attachMetaTag */])("meta", md);
    };

    return Object(__WEBPACK_IMPORTED_MODULE_1__HTMLGenHelpers_fs__["c" /* attachSimpleTag */])("head")(Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_Seq__["f" /* fold */])(genMetadata, "", metaData) + Object(__WEBPACK_IMPORTED_MODULE_1__HTMLGenHelpers_fs__["c" /* attachSimpleTag */])("title")(htmlTitle));
}
function genBody(pObjs) {
    return Object(__WEBPACK_IMPORTED_MODULE_1__HTMLGenHelpers_fs__["c" /* attachSimpleTag */])("body")(strBody(pObjs));
}
function genHTML(htmlTitle, pObjs) {
    return Object(__WEBPACK_IMPORTED_MODULE_1__HTMLGenHelpers_fs__["b" /* attachMetaTag */])("!DOCTYPE", Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["g" /* ofArray */])([["html", ""]])) + genHead(htmlTitle) + genBody(pObjs);
}

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export TagStyle */
/* unused harmony export toAttr */
/* unused harmony export toAttrs */
/* harmony export (immutable) */ __webpack_exports__["a"] = attachHTMLTag;
/* harmony export (immutable) */ __webpack_exports__["c"] = attachSimpleTag;
/* harmony export (immutable) */ __webpack_exports__["b"] = attachMetaTag;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_Seq__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__ = __webpack_require__(5);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }








var TagStyle = function () {
    function TagStyle(tag, data) {
        _classCallCheck(this, TagStyle);

        this.tag = tag | 0;
        this.data = data;
    }

    _createClass(TagStyle, [{
        key: __WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["a" /* default */].reflection,
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
            return this === other || this.tag === other.tag && Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["l" /* equals */])(this.data, other.data);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return Object(__WEBPACK_IMPORTED_MODULE_1__nuget_packages_fable_core_1_3_11_fable_core_Util__["j" /* compareUnions */])(this, other) | 0;
        }
    }]);

    return TagStyle;
}();
Object(__WEBPACK_IMPORTED_MODULE_0__nuget_packages_fable_core_1_3_11_fable_core_Symbol__["b" /* setType */])("HTMLGenHelpers.TagStyle", TagStyle);
function toAttr(attributeName, value) {
    return attributeName + "=\"" + value + "\"";
}
function toAttrs(attrs) {
    var mapper = function mapper(attr) {
        return toAttr(attr[0], attr[1]);
    };

    return Object(__WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["f" /* map */])(mapper, attrs);
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

        attrStr = Object(__WEBPACK_IMPORTED_MODULE_3__nuget_packages_fable_core_1_3_11_fable_core_Seq__["f" /* fold */])(attrFolder, "", attributes);
    }

    return "<" + tagName + attrStr + ">" + content + (needCloseTag ? "</" + tagName + ">" : "");
}
function attachSimpleTag(tagName) {
    var attributes;
    return Object(__WEBPACK_IMPORTED_MODULE_4__nuget_packages_fable_core_1_3_11_fable_core_CurriedLambda__["a" /* default */])((attributes = new __WEBPACK_IMPORTED_MODULE_2__nuget_packages_fable_core_1_3_11_fable_core_List__["c" /* default */](), function (content) {
        return attachHTMLTag(tagName, attributes, true, content);
    }));
}
function attachMetaTag(tagName, attrs) {
    return attachHTMLTag(tagName, attrs, false, "");
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=fmark.js.map