/*!
 * he-tree-vue v3.1.2
 * (c) phphe <phphe@outlook.com> (https://github.com/phphe)
 * Homepage: https://he-tree-vue.phphe.com
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
	typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
	(global = global || self, factory(global.heTreeVue = {}, global.Vue));
}(this, (function (exports, vue) { 'use strict';

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var assertThisInitialized = createCommonjsModule(function (module) {
	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }
	  return self;
	}
	module.exports = _assertThisInitialized, module.exports.__esModule = true, module.exports["default"] = module.exports;
	});

	unwrapExports(assertThisInitialized);

	var getPrototypeOf = createCommonjsModule(function (module) {
	function _getPrototypeOf(o) {
	  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
	  return _getPrototypeOf(o);
	}
	module.exports = _getPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;
	});

	unwrapExports(getPrototypeOf);

	var superPropBase = createCommonjsModule(function (module) {
	function _superPropBase(object, property) {
	  while (!Object.prototype.hasOwnProperty.call(object, property)) {
	    object = getPrototypeOf(object);
	    if (object === null) break;
	  }
	  return object;
	}
	module.exports = _superPropBase, module.exports.__esModule = true, module.exports["default"] = module.exports;
	});

	unwrapExports(superPropBase);

	var get = createCommonjsModule(function (module) {
	function _get() {
	  if (typeof Reflect !== "undefined" && Reflect.get) {
	    module.exports = _get = Reflect.get.bind(), module.exports.__esModule = true, module.exports["default"] = module.exports;
	  } else {
	    module.exports = _get = function _get(target, property, receiver) {
	      var base = superPropBase(target, property);
	      if (!base) return;
	      var desc = Object.getOwnPropertyDescriptor(base, property);
	      if (desc.get) {
	        return desc.get.call(arguments.length < 3 ? target : receiver);
	      }
	      return desc.value;
	    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
	  }
	  return _get.apply(this, arguments);
	}
	module.exports = _get, module.exports.__esModule = true, module.exports["default"] = module.exports;
	});

	unwrapExports(get);

	var setPrototypeOf = createCommonjsModule(function (module) {
	function _setPrototypeOf(o, p) {
	  module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
	  return _setPrototypeOf(o, p);
	}
	module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;
	});

	unwrapExports(setPrototypeOf);

	var inherits = createCommonjsModule(function (module) {
	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }
	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  Object.defineProperty(subClass, "prototype", {
	    writable: false
	  });
	  if (superClass) setPrototypeOf(subClass, superClass);
	}
	module.exports = _inherits, module.exports.__esModule = true, module.exports["default"] = module.exports;
	});

	unwrapExports(inherits);

	var _typeof_1 = createCommonjsModule(function (module) {
	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
	    return typeof obj;
	  } : function (obj) {
	    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
	}
	module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;
	});

	unwrapExports(_typeof_1);

	var possibleConstructorReturn = createCommonjsModule(function (module) {
	var _typeof = _typeof_1["default"];

	function _possibleConstructorReturn(self, call) {
	  if (call && (_typeof(call) === "object" || typeof call === "function")) {
	    return call;
	  } else if (call !== void 0) {
	    throw new TypeError("Derived constructors may only return object or undefined");
	  }
	  return assertThisInitialized(self);
	}
	module.exports = _possibleConstructorReturn, module.exports.__esModule = true, module.exports["default"] = module.exports;
	});

	unwrapExports(possibleConstructorReturn);

	var arrayWithHoles = createCommonjsModule(function (module) {
	function _arrayWithHoles(arr) {
	  if (Array.isArray(arr)) return arr;
	}
	module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;
	});

	unwrapExports(arrayWithHoles);

	var iterableToArrayLimit = createCommonjsModule(function (module) {
	function _iterableToArrayLimit(arr, i) {
	  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
	  if (null != _i) {
	    var _s,
	      _e,
	      _x,
	      _r,
	      _arr = [],
	      _n = !0,
	      _d = !1;
	    try {
	      if (_x = (_i = _i.call(arr)).next, 0 === i) {
	        if (Object(_i) !== _i) return;
	        _n = !1;
	      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
	    } catch (err) {
	      _d = !0, _e = err;
	    } finally {
	      try {
	        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
	      } finally {
	        if (_d) throw _e;
	      }
	    }
	    return _arr;
	  }
	}
	module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;
	});

	unwrapExports(iterableToArrayLimit);

	var arrayLikeToArray = createCommonjsModule(function (module) {
	function _arrayLikeToArray(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;
	  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	  return arr2;
	}
	module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
	});

	unwrapExports(arrayLikeToArray);

	var unsupportedIterableToArray = createCommonjsModule(function (module) {
	function _unsupportedIterableToArray(o, minLen) {
	  if (!o) return;
	  if (typeof o === "string") return arrayLikeToArray(o, minLen);
	  var n = Object.prototype.toString.call(o).slice(8, -1);
	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return Array.from(o);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
	}
	module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
	});

	unwrapExports(unsupportedIterableToArray);

	var nonIterableRest = createCommonjsModule(function (module) {
	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;
	});

	unwrapExports(nonIterableRest);

	var slicedToArray = createCommonjsModule(function (module) {
	function _slicedToArray(arr, i) {
	  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
	}
	module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
	});

	unwrapExports(slicedToArray);

	var toPrimitive = createCommonjsModule(function (module) {
	var _typeof = _typeof_1["default"];
	function _toPrimitive(input, hint) {
	  if (_typeof(input) !== "object" || input === null) return input;
	  var prim = input[Symbol.toPrimitive];
	  if (prim !== undefined) {
	    var res = prim.call(input, hint || "default");
	    if (_typeof(res) !== "object") return res;
	    throw new TypeError("@@toPrimitive must return a primitive value.");
	  }
	  return (hint === "string" ? String : Number)(input);
	}
	module.exports = _toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;
	});

	unwrapExports(toPrimitive);

	var toPropertyKey = createCommonjsModule(function (module) {
	var _typeof = _typeof_1["default"];

	function _toPropertyKey(arg) {
	  var key = toPrimitive(arg, "string");
	  return _typeof(key) === "symbol" ? key : String(key);
	}
	module.exports = _toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;
	});

	unwrapExports(toPropertyKey);

	var createClass = createCommonjsModule(function (module) {
	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
	  }
	}
	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  Object.defineProperty(Constructor, "prototype", {
	    writable: false
	  });
	  return Constructor;
	}
	module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;
	});

	var _createClass = unwrapExports(createClass);

	var classCallCheck = createCommonjsModule(function (module) {
	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}
	module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;
	});

	var _classCallCheck = unwrapExports(classCallCheck);

	var arrayWithoutHoles = createCommonjsModule(function (module) {
	function _arrayWithoutHoles(arr) {
	  if (Array.isArray(arr)) return arrayLikeToArray(arr);
	}
	module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;
	});

	unwrapExports(arrayWithoutHoles);

	var iterableToArray = createCommonjsModule(function (module) {
	function _iterableToArray(iter) {
	  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
	}
	module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
	});

	unwrapExports(iterableToArray);

	var nonIterableSpread = createCommonjsModule(function (module) {
	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;
	});

	unwrapExports(nonIterableSpread);

	var toConsumableArray = createCommonjsModule(function (module) {
	function _toConsumableArray(arr) {
	  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
	}
	module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
	});

	var _toConsumableArray = unwrapExports(toConsumableArray);

	var regeneratorRuntime$1 = createCommonjsModule(function (module) {
	var _typeof = _typeof_1["default"];
	function _regeneratorRuntime() {
	  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
	    return exports;
	  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
	  var exports = {},
	    Op = Object.prototype,
	    hasOwn = Op.hasOwnProperty,
	    defineProperty = Object.defineProperty || function (obj, key, desc) {
	      obj[key] = desc.value;
	    },
	    $Symbol = "function" == typeof Symbol ? Symbol : {},
	    iteratorSymbol = $Symbol.iterator || "@@iterator",
	    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
	    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
	  function define(obj, key, value) {
	    return Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: !0,
	      configurable: !0,
	      writable: !0
	    }), obj[key];
	  }
	  try {
	    define({}, "");
	  } catch (err) {
	    define = function define(obj, key, value) {
	      return obj[key] = value;
	    };
	  }
	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
	      generator = Object.create(protoGenerator.prototype),
	      context = new Context(tryLocsList || []);
	    return defineProperty(generator, "_invoke", {
	      value: makeInvokeMethod(innerFn, self, context)
	    }), generator;
	  }
	  function tryCatch(fn, obj, arg) {
	    try {
	      return {
	        type: "normal",
	        arg: fn.call(obj, arg)
	      };
	    } catch (err) {
	      return {
	        type: "throw",
	        arg: err
	      };
	    }
	  }
	  exports.wrap = wrap;
	  var ContinueSentinel = {};
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}
	  var IteratorPrototype = {};
	  define(IteratorPrototype, iteratorSymbol, function () {
	    return this;
	  });
	  var getProto = Object.getPrototypeOf,
	    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function (method) {
	      define(prototype, method, function (arg) {
	        return this._invoke(method, arg);
	      });
	    });
	  }
	  function AsyncIterator(generator, PromiseImpl) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if ("throw" !== record.type) {
	        var result = record.arg,
	          value = result.value;
	        return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
	          invoke("next", value, resolve, reject);
	        }, function (err) {
	          invoke("throw", err, resolve, reject);
	        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
	          result.value = unwrapped, resolve(result);
	        }, function (error) {
	          return invoke("throw", error, resolve, reject);
	        });
	      }
	      reject(record.arg);
	    }
	    var previousPromise;
	    defineProperty(this, "_invoke", {
	      value: function value(method, arg) {
	        function callInvokeWithMethodAndArg() {
	          return new PromiseImpl(function (resolve, reject) {
	            invoke(method, arg, resolve, reject);
	          });
	        }
	        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
	      }
	    });
	  }
	  function makeInvokeMethod(innerFn, self, context) {
	    var state = "suspendedStart";
	    return function (method, arg) {
	      if ("executing" === state) throw new Error("Generator is already running");
	      if ("completed" === state) {
	        if ("throw" === method) throw arg;
	        return doneResult();
	      }
	      for (context.method = method, context.arg = arg;;) {
	        var delegate = context.delegate;
	        if (delegate) {
	          var delegateResult = maybeInvokeDelegate(delegate, context);
	          if (delegateResult) {
	            if (delegateResult === ContinueSentinel) continue;
	            return delegateResult;
	          }
	        }
	        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
	          if ("suspendedStart" === state) throw state = "completed", context.arg;
	          context.dispatchException(context.arg);
	        } else "return" === context.method && context.abrupt("return", context.arg);
	        state = "executing";
	        var record = tryCatch(innerFn, self, context);
	        if ("normal" === record.type) {
	          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
	          return {
	            value: record.arg,
	            done: context.done
	          };
	        }
	        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
	      }
	    };
	  }
	  function maybeInvokeDelegate(delegate, context) {
	    var methodName = context.method,
	      method = delegate.iterator[methodName];
	    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
	    var record = tryCatch(method, delegate.iterator, context.arg);
	    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
	    var info = record.arg;
	    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
	  }
	  function pushTryEntry(locs) {
	    var entry = {
	      tryLoc: locs[0]
	    };
	    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
	  }
	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal", delete record.arg, entry.completion = record;
	  }
	  function Context(tryLocsList) {
	    this.tryEntries = [{
	      tryLoc: "root"
	    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
	  }
	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) return iteratorMethod.call(iterable);
	      if ("function" == typeof iterable.next) return iterable;
	      if (!isNaN(iterable.length)) {
	        var i = -1,
	          next = function next() {
	            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
	            return next.value = undefined, next.done = !0, next;
	          };
	        return next.next = next;
	      }
	    }
	    return {
	      next: doneResult
	    };
	  }
	  function doneResult() {
	    return {
	      value: undefined,
	      done: !0
	    };
	  }
	  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
	    value: GeneratorFunctionPrototype,
	    configurable: !0
	  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
	    value: GeneratorFunction,
	    configurable: !0
	  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
	    var ctor = "function" == typeof genFun && genFun.constructor;
	    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
	  }, exports.mark = function (genFun) {
	    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
	  }, exports.awrap = function (arg) {
	    return {
	      __await: arg
	    };
	  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
	    return this;
	  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
	    void 0 === PromiseImpl && (PromiseImpl = Promise);
	    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
	    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
	      return result.done ? result.value : iter.next();
	    });
	  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
	    return this;
	  }), define(Gp, "toString", function () {
	    return "[object Generator]";
	  }), exports.keys = function (val) {
	    var object = Object(val),
	      keys = [];
	    for (var key in object) keys.push(key);
	    return keys.reverse(), function next() {
	      for (; keys.length;) {
	        var key = keys.pop();
	        if (key in object) return next.value = key, next.done = !1, next;
	      }
	      return next.done = !0, next;
	    };
	  }, exports.values = values, Context.prototype = {
	    constructor: Context,
	    reset: function reset(skipTempReset) {
	      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
	    },
	    stop: function stop() {
	      this.done = !0;
	      var rootRecord = this.tryEntries[0].completion;
	      if ("throw" === rootRecord.type) throw rootRecord.arg;
	      return this.rval;
	    },
	    dispatchException: function dispatchException(exception) {
	      if (this.done) throw exception;
	      var context = this;
	      function handle(loc, caught) {
	        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
	      }
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i],
	          record = entry.completion;
	        if ("root" === entry.tryLoc) return handle("end");
	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc"),
	            hasFinally = hasOwn.call(entry, "finallyLoc");
	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
	            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
	          } else {
	            if (!hasFinally) throw new Error("try statement without catch or finally");
	            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
	          }
	        }
	      }
	    },
	    abrupt: function abrupt(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }
	      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
	      var record = finallyEntry ? finallyEntry.completion : {};
	      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
	    },
	    complete: function complete(record, afterLoc) {
	      if ("throw" === record.type) throw record.arg;
	      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
	    },
	    finish: function finish(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
	      }
	    },
	    "catch": function _catch(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if ("throw" === record.type) {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }
	      throw new Error("illegal catch attempt");
	    },
	    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
	      return this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
	    }
	  }, exports;
	}
	module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;
	});

	unwrapExports(regeneratorRuntime$1);

	// TODO(Babel 8): Remove this file.

	var runtime = regeneratorRuntime$1();
	var regenerator = runtime;

	// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
	try {
	  regeneratorRuntime = runtime;
	} catch (accidentalStrictMode) {
	  if (typeof globalThis === "object") {
	    globalThis.regeneratorRuntime = runtime;
	  } else {
	    Function("r", "regeneratorRuntime = r")(runtime);
	  }
	}

	/*!
	 * helper-js v2.0.7
	 * (c) phphe <phphe@outlook.com> (https://github.com/phphe)
	 * Homepage: null
	 * Released under the MIT License.
	 */
	var _marked = /*#__PURE__*/regenerator.mark(iterateAll);
	function _createForOfIteratorHelper(o, allowArrayLike) {
	  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
	  if (!it) {
	    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
	      if (it) o = it;
	      var i = 0;
	      var F = function F() {};
	      return {
	        s: F,
	        n: function n() {
	          if (i >= o.length) return {
	            done: true
	          };
	          return {
	            done: false,
	            value: o[i++]
	          };
	        },
	        e: function e(_e) {
	          throw _e;
	        },
	        f: F
	      };
	    }
	    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	  }
	  var normalCompletion = true,
	    didErr = false,
	    err;
	  return {
	    s: function s() {
	      it = it.call(o);
	    },
	    n: function n() {
	      var step = it.next();
	      normalCompletion = step.done;
	      return step;
	    },
	    e: function e(_e2) {
	      didErr = true;
	      err = _e2;
	    },
	    f: function f() {
	      try {
	        if (!normalCompletion && it.return != null) it.return();
	      } finally {
	        if (didErr) throw err;
	      }
	    }
	  };
	}
	function _unsupportedIterableToArray(o, minLen) {
	  if (!o) return;
	  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	  var n = Object.prototype.toString.call(o).slice(8, -1);
	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return Array.from(o);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
	}
	function _arrayLikeToArray(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;
	  for (var i = 0, arr2 = new Array(len); i < len; i++) {
	    arr2[i] = arr[i];
	  }
	  return arr2;
	}
	function isArray(v) {
	  return Object.prototype.toString.call(v) === "[object Array]";
	}
	function isObject(v) {
	  return Object.prototype.toString.call(v) === "[object Object]";
	}
	function isFunction(v) {
	  return typeof v === "function";
	}
	// 返回指定范围随机整数, 包括范围起始值和终止值

	function randInt(min, max) {
	  return Math.floor(Math.random() * (max - min + 1) + min);
	} // rand item in array
	// 返回数组随机一项

	function randChoice(arr) {
	  return arr[randInt(0, arr.length - 1)];
	} // Pad a string to a certain length with another string
	// 随机字符串

	function randString() {
	  var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;
	  var seeds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	  var r = "";
	  for (var i = 0; i < len; i++) {
	    r += randChoice(seeds);
	  }
	  return r;
	} // ## Array
	// ## 数组
	// remove item from array. return removed count
	// 从数组删除项. 返回删除计数

	function arrayRemove(arr, v) {
	  var index;
	  var count = 0;
	  while ((index = arr.indexOf(v)) > -1) {
	    arr.splice(index, 1);
	    count++;
	  }
	  return count;
	} // remove items from array by sorted indexes. indexes example: [0, 2, 6, 8, 9]
	// 返回数组末项

	function arrayLast(arr) {
	  return arr[arr.length - 1];
	} // return arr1 - arr2
	function toArrayIfNot(arrOrNot) {
	  return isArray(arrOrNot) ? arrOrNot : [arrOrNot];
	}
	// 返回新数组排除末尾n项

	function arrayWithoutEnd(arr, n) {
	  return arr.slice(0, arr.length - n);
	} // get one-dimensional array from multidimensional array
	function iterateAll(val) {
	  var opt,
	    i,
	    info,
	    _i2,
	    _Object$keys,
	    key,
	    _info,
	    _i3,
	    _info2,
	    keys,
	    _i4,
	    _keys,
	    _key,
	    _info3,
	    _args = arguments;
	  return regenerator.wrap(function iterateAll$(_context) {
	    while (1) {
	      switch (_context.prev = _context.next) {
	        case 0:
	          opt = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
	          if (opt.reverse) {
	            _context.next = 30;
	            break;
	          }
	          if (!(val.length != null)) {
	            _context.next = 14;
	            break;
	          }
	          i = 0;
	        case 4:
	          if (!(i < val.length)) {
	            _context.next = 12;
	            break;
	          }
	          info = {
	            value: val[i],
	            index: i
	          };
	          if (!(!opt.exclude || !opt.exclude(info))) {
	            _context.next = 9;
	            break;
	          }
	          _context.next = 9;
	          return info;
	        case 9:
	          i++;
	          _context.next = 4;
	          break;
	        case 12:
	          _context.next = 28;
	          break;
	        case 14:
	          if (!isObject(val)) {
	            _context.next = 27;
	            break;
	          }
	          _i2 = 0, _Object$keys = Object.keys(val);
	        case 16:
	          if (!(_i2 < _Object$keys.length)) {
	            _context.next = 25;
	            break;
	          }
	          key = _Object$keys[_i2];
	          _info = {
	            value: val[key],
	            key: key
	          };
	          if (!(!opt.exclude || !opt.exclude(_info))) {
	            _context.next = 22;
	            break;
	          }
	          _context.next = 22;
	          return _info;
	        case 22:
	          _i2++;
	          _context.next = 16;
	          break;
	        case 25:
	          _context.next = 28;
	          break;
	        case 27:
	          throw "Unsupported type";
	        case 28:
	          _context.next = 58;
	          break;
	        case 30:
	          if (!(val.length != null)) {
	            _context.next = 42;
	            break;
	          }
	          _i3 = val.length - 1;
	        case 32:
	          if (!(_i3 >= 0)) {
	            _context.next = 40;
	            break;
	          }
	          _info2 = {
	            value: val[_i3],
	            index: _i3
	          };
	          if (!(!opt.exclude || !opt.exclude(_info2))) {
	            _context.next = 37;
	            break;
	          }
	          _context.next = 37;
	          return _info2;
	        case 37:
	          _i3--;
	          _context.next = 32;
	          break;
	        case 40:
	          _context.next = 58;
	          break;
	        case 42:
	          if (!isObject(val)) {
	            _context.next = 57;
	            break;
	          }
	          keys = Object.keys(val);
	          keys.reverse();
	          _i4 = 0, _keys = keys;
	        case 46:
	          if (!(_i4 < _keys.length)) {
	            _context.next = 55;
	            break;
	          }
	          _key = _keys[_i4];
	          _info3 = {
	            value: val[_key],
	            key: _key
	          };
	          if (!(!opt.exclude || !opt.exclude(_info3))) {
	            _context.next = 52;
	            break;
	          }
	          _context.next = 52;
	          return _info3;
	        case 52:
	          _i4++;
	          _context.next = 46;
	          break;
	        case 55:
	          _context.next = 58;
	          break;
	        case 57:
	          throw "Unsupported type";
	        case 58:
	        case "end":
	          return _context.stop();
	      }
	    }
	  }, _marked);
	} // example: objectGet(window, 'document.body.children.0') . source: http://stackoverflow.com/questions/8817394/javascript-get-deep-value-from-object-by-passing-path-to-it-as-string
	function objectAssignIfKeyNull(obj1, obj2) {
	  Object.keys(obj2).forEach(function (key) {
	    if (obj1[key] == null) {
	      obj1[key] = obj2[key];
	    }
	  });
	}
	function depthFirstSearch(obj, handler) {
	  var childrenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "children";
	  var opt = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
	  var rootChildren = isArray(obj) ? obj : [obj]; //

	  var StopException = /*#__PURE__*/_createClass(function StopException() {
	    _classCallCheck(this, StopException);
	  });
	  var func = function func(children, parent, parentPath) {
	    if (opt.reverse) {
	      children = children.slice();
	      children.reverse();
	    }
	    var len = children.length;
	    for (var i = 0; i < len; i++) {
	      var item = children[i];
	      var index = opt.reverse ? len - i - 1 : i;
	      var path = parentPath ? [].concat(_toConsumableArray(parentPath), [index]) : [];
	      var r = handler(item, index, parent, path);
	      if (r === false) {
	        // stop
	        throw new StopException();
	      } else if (r === "skip children") {
	        continue;
	      } else if (r === "skip siblings") {
	        break;
	      }
	      if (item[childrenKey] != null) {
	        func(item[childrenKey], item, path);
	      }
	    }
	  };
	  try {
	    func(rootChildren, null, isArray(obj) ? [] : null);
	  } catch (e) {
	    if (e instanceof StopException) ;else {
	      throw e;
	    }
	  }
	} // refer [depthFirstSearch](#depthFirstSearch)

	var walkTreeData = depthFirstSearch; // tree data helpers

	var TreeData = /*#__PURE__*/function () {
	  // data = null;
	  function TreeData() {
	    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	    _classCallCheck(this, TreeData);
	    this.childrenKey = "children";
	    this.data = data;
	  }
	  _createClass(TreeData, [{
	    key: "rootChildren",
	    get: function get() {
	      var childrenKey = this.childrenKey;
	      var data = this.data;
	      return isArray(data) ? data : data[childrenKey];
	    }
	  }, {
	    key: "iteratePath",
	    value: /*#__PURE__*/regenerator.mark(function iteratePath(path) {
	      var opt,
	        childrenKey,
	        rootChildren,
	        prevPath,
	        prevChildren,
	        _iterator4,
	        _step4,
	        index,
	        currentPath,
	        currentNode,
	        list,
	        _iterator5,
	        _step5,
	        _step5$value,
	        path0,
	        node,
	        _path,
	        _args2 = arguments;
	      return regenerator.wrap(function iteratePath$(_context2) {
	        while (1) {
	          switch (_context2.prev = _context2.next) {
	            case 0:
	              opt = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
	              childrenKey = this.childrenKey, rootChildren = this.rootChildren;
	              if (opt.reverse) {
	                _context2.next = 29;
	                break;
	              }
	              prevPath = [];
	              prevChildren = rootChildren;
	              _iterator4 = _createForOfIteratorHelper(path);
	              _context2.prev = 6;
	              _iterator4.s();
	            case 8:
	              if ((_step4 = _iterator4.n()).done) {
	                _context2.next = 19;
	                break;
	              }
	              index = _step4.value;
	              currentPath = [].concat(_toConsumableArray(prevPath), [index]);
	              currentNode = prevChildren[index];
	              _context2.next = 14;
	              return {
	                path: currentPath,
	                node: currentNode
	              };
	            case 14:
	              prevPath = currentPath;
	              prevChildren = currentNode[childrenKey];
	            case 17:
	              _context2.next = 8;
	              break;
	            case 19:
	              _context2.next = 24;
	              break;
	            case 21:
	              _context2.prev = 21;
	              _context2.t0 = _context2["catch"](6);
	              _iterator4.e(_context2.t0);
	            case 24:
	              _context2.prev = 24;
	              _iterator4.f();
	              return _context2.finish(24);
	            case 27:
	              _context2.next = 49;
	              break;
	            case 29:
	              list = _toConsumableArray(this.iteratePath(path, Object.assign(Object.assign({}, opt), {
	                reverse: false
	              })));
	              list.reverse();
	              _iterator5 = _createForOfIteratorHelper(list);
	              _context2.prev = 32;
	              _iterator5.s();
	            case 34:
	              if ((_step5 = _iterator5.n()).done) {
	                _context2.next = 41;
	                break;
	              }
	              _step5$value = _step5.value, path0 = _step5$value.path, node = _step5$value.node;
	              _path = path0;
	              _context2.next = 39;
	              return {
	                path: _path,
	                node: node
	              };
	            case 39:
	              _context2.next = 34;
	              break;
	            case 41:
	              _context2.next = 46;
	              break;
	            case 43:
	              _context2.prev = 43;
	              _context2.t1 = _context2["catch"](32);
	              _iterator5.e(_context2.t1);
	            case 46:
	              _context2.prev = 46;
	              _iterator5.f();
	              return _context2.finish(46);
	            case 49:
	            case "end":
	              return _context2.stop();
	          }
	        }
	      }, iteratePath, this, [[6, 21, 24, 27], [32, 43, 46, 49]]);
	    })
	  }, {
	    key: "getAllNodes",
	    value: function getAllNodes(path) {
	      var all = [];
	      var _iterator6 = _createForOfIteratorHelper(this.iteratePath(path)),
	        _step6;
	      try {
	        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
	          var node = _step6.value.node;
	          all.push(node);
	        }
	      } catch (err) {
	        _iterator6.e(err);
	      } finally {
	        _iterator6.f();
	      }
	      return all;
	    }
	  }, {
	    key: "getNode",
	    value: function getNode(path) {
	      return arrayLast(this.getAllNodes(path));
	    }
	  }, {
	    key: "getNodeIndexAndParent",
	    value: function getNodeIndexAndParent(path) {
	      var parentPath = path.slice();
	      var index = parentPath.pop();
	      return {
	        parent: this.getNode(parentPath),
	        index: index,
	        parentPath: parentPath
	      };
	    }
	  }, {
	    key: "getNodeParent",
	    value: function getNodeParent(path) {
	      return this.getNodeIndexAndParent(path).parent;
	    }
	  }, {
	    key: "setPathNode",
	    value: function setPathNode(path, node) {
	      if (path == null || path.length === 0) {
	        this.data = node;
	      } else {
	        var childrenKey = this.childrenKey,
	          rootChildren = this.rootChildren;
	        var _this$getNodeIndexAnd = this.getNodeIndexAndParent(path),
	          parent = _this$getNodeIndexAnd.parent,
	          index = _this$getNodeIndexAnd.index;
	        var parentChildren = path.length === 1 ? rootChildren : parent[childrenKey];
	        parentChildren[index] = node;
	      }
	    }
	  }, {
	    key: "removeNode",
	    value: function removeNode(path) {
	      var childrenKey = this.childrenKey,
	        rootChildren = this.rootChildren;
	      var _this$getNodeIndexAnd2 = this.getNodeIndexAndParent(path),
	        parent = _this$getNodeIndexAnd2.parent,
	        index = _this$getNodeIndexAnd2.index;
	      var parentChildren = path.length === 1 ? rootChildren : parent[childrenKey];
	      var node = parentChildren[index];
	      parentChildren.splice(index, 1);
	      return node;
	    }
	  }, {
	    key: "walk",
	    value: function walk(handler, opt) {
	      var childrenKey = this.childrenKey,
	        data = this.data; // @ts-ignore

	      return walkTreeData(data, handler, childrenKey, opt);
	    }
	  }, {
	    key: "clone",
	    value: function clone() {
	      var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      // opt.afterNodeCreated(newNode, {oldNode: node, index, parent, path})
	      var childrenKey = this.childrenKey;
	      var td = new TreeData();
	      td.childrenKey = childrenKey;
	      this.walk(function (node, index, parent, path) {
	        var newNode = Object.assign({}, node);
	        if (newNode[childrenKey]) {
	          newNode[childrenKey] = [];
	        }
	        if (opt.afterNodeCreated) {
	          opt.afterNodeCreated(newNode, {
	            oldNode: node,
	            index: index,
	            parent: parent,
	            path: path
	          });
	        }
	        td.setPathNode(path, newNode);
	      });
	      return td.data;
	    }
	  }]);
	  return TreeData;
	}(); // ## function
	// ## 函数
	// if it is function, return result, else return it directly.

	function resolveValueOrGettter(valueOrGetter) {
	  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	  if (isFunction(valueOrGetter)) {
	    return valueOrGetter.apply(void 0, _toConsumableArray(args));
	  } else {
	    return valueOrGetter;
	  }
	}

	function joinFunctionsByNext(funcs) {
	  var next = function next() {};
	  var _iterator7 = _createForOfIteratorHelper(iterateAll(funcs, {
	      reverse: true
	    })),
	    _step7;
	  try {
	    for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
	      var func = _step7.value.value;
	      var currentNext = next;
	      next = wrapFuncWithNext(func, currentNext);
	    }
	  } catch (err) {
	    _iterator7.e(err);
	  } finally {
	    _iterator7.f();
	  }
	  return next;
	  function wrapFuncWithNext(func, next) {
	    return function () {
	      for (var _len4 = arguments.length, args = new Array(_len4), _key5 = 0; _key5 < _len4; _key5++) {
	        args[_key5] = arguments[_key5];
	      }
	      return func.apply(void 0, [next].concat(args));
	    };
	  }
	} // ## promise
	// return NodeList if there are multiple top-level nodes

	function createElementFromHTML(htmlString) {
	  var div = document.createElement("div");
	  div.innerHTML = htmlString.trim();
	  if (div.childNodes.length > 1) {
	    return div.childNodes;
	  } else {
	    return div.childNodes[0];
	  }
	}
	function isDescendantOf(el, parent) {
	  while (true) {
	    if (el.parentElement == null) {
	      return false;
	    } else if (el.parentElement === parent) {
	      return true;
	    } else {
	      el = el.parentElement;
	    }
	  }
	}
	function removeEl(el) {
	  if (el.parentNode !== null) {
	    return el.parentNode.removeChild(el);
	  }
	} // refer: https://stackoverflow.com/questions/871399/cross-browser-method-for-detecting-the-scrolltop-of-the-browser-window

	function getScroll() {
	  if (typeof pageYOffset != "undefined") {
	    //most browsers except IE before #9
	    return {
	      top: pageYOffset,
	      left: pageXOffset
	    };
	  } else {
	    var B = document.body; //IE 'quirks'

	    var D = document.documentElement; //IE with doctype

	    D = D.clientHeight ? D : B;
	    return {
	      top: D.scrollTop,
	      left: D.scrollLeft
	    };
	  }
	} // refer: https://gist.github.com/aderaaij/89547e34617b95ac29d1

	function getOffset(el) {
	  var rect = getBoundingClientRect(el);
	  var scroll = getScroll();
	  return {
	    x: rect.left + scroll.left,
	    y: rect.top + scroll.top
	  };
	} // there is some trap in el.offsetParent, so use this func to fix
	function getBoundingClientRect(el) {
	  // refer: http://www.51xuediannao.com/javascript/getBoundingClientRect.html
	  var xy = el.getBoundingClientRect();
	  var top = xy.top - document.documentElement.clientTop,
	    //document.documentElement.clientTop 在IE67中始终为2，其他高级点的浏览器为0
	    bottom = xy.bottom,
	    left = xy.left - document.documentElement.clientLeft,
	    //document.documentElement.clientLeft 在IE67中始终为2，其他高级点的浏览器为0
	    right = xy.right,
	    width = xy.width || right - left,
	    //IE67不存在width 使用right - left获得
	    height = xy.height || bottom - top;
	  var x = left;
	  var y = top;
	  return {
	    top: top,
	    right: right,
	    bottom: bottom,
	    left: left,
	    width: width,
	    height: height,
	    x: x,
	    y: y
	  };
	} // refer [getBoundingClientRect](#getBoundingClientRect)

	var getViewportPosition = getBoundingClientRect; // TODO not tested
	function findParent(el, callback) {
	  var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	  var cur = opt && opt.withSelf ? el : el.parentElement;
	  while (cur) {
	    var r = callback(cur);
	    if (r === "break") {
	      return;
	    } else if (r) {
	      return cur;
	    } else {
	      cur = cur.parentElement;
	    }
	  }
	}
	function backupAttr(el, name) {
	  var key = "original_".concat(name);
	  el[key] = el.getAttribute(name);
	}
	function restoreAttr(el, name) {
	  var key = "original_".concat(name);
	  var value = el[key];
	  if (value == null) {
	    el.removeAttribute(name);
	  } else {
	    el.setAttribute(name, value);
	  }
	} // source: http://youmightnotneedjquery.com/

	function hasClass(el, className) {
	  if (el.classList) {
	    return el.classList.contains(className);
	  } else {
	    return new RegExp("(^| )" + className + "( |$)", "gi").test(el.className);
	  }
	} // source: http://youmightnotneedjquery.com/

	function addClass(el, className) {
	  if (!hasClass(el, className)) {
	    if (el.classList) {
	      el.classList.add(className);
	    } else {
	      el.className += " " + className;
	    }
	  }
	} // source: http://youmightnotneedjquery.com/
	function onDOM(el, name, handler) {
	  for (var _len5 = arguments.length, args = new Array(_len5 > 3 ? _len5 - 3 : 0), _key6 = 3; _key6 < _len5; _key6++) {
	    args[_key6 - 3] = arguments[_key6];
	  }
	  if (el.addEventListener) {
	    // 所有主流浏览器，除了 IE 8 及更早 IE版本
	    el.addEventListener.apply(el, [name, handler].concat(args)); // @ts-ignore
	  } else if (el.attachEvent) {
	    // IE 8 及更早 IE 版本
	    // @ts-ignore
	    el.attachEvent.apply(el, ["on".concat(name), handler].concat(args));
	  }
	}
	function offDOM(el, name, handler) {
	  for (var _len6 = arguments.length, args = new Array(_len6 > 3 ? _len6 - 3 : 0), _key7 = 3; _key7 < _len6; _key7++) {
	    args[_key7 - 3] = arguments[_key7];
	  }
	  if (el.removeEventListener) {
	    // 所有主流浏览器，除了 IE 8 及更早 IE版本
	    el.removeEventListener.apply(el, [name, handler].concat(args)); // @ts-ignore
	  } else if (el.detachEvent) {
	    // IE 8 及更早 IE 版本
	    // @ts-ignore
	    el.detachEvent.apply(el, ["on".concat(name), handler].concat(args));
	  }
	}
	function findNodeList(list, callback) {
	  var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	  var iterator = iterateAll(list, {
	    reverse: opt.reverse
	  });
	  var _iterator13 = _createForOfIteratorHelper(iterator),
	    _step13;
	  try {
	    for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
	      var _step13$value = _step13.value,
	        value = _step13$value.value,
	        index = _step13$value.index;
	      if (callback(value, index)) {
	        return value;
	      }
	    }
	  } catch (err) {
	    _iterator13.e(err);
	  } finally {
	    _iterator13.f();
	  }
	}
	function elementsFromPoint(x, y) {
	  var args = [x, y];
	  var func = document.elementsFromPoint ||
	  // @ts-ignore
	  document.msElementsFromPoint || elementsFromPoint;
	  return func.apply(document, args);
	  function elementsFromPoint(x, y) {
	    var parents = [];
	    var parent = void 0;
	    do {
	      if (parent !== document.elementFromPoint(x, y)) {
	        parent = document.elementFromPoint(x, y);
	        parents.push(parent);
	        parent.style.pointerEvents = "none";
	      } else {
	        parent = false;
	      }
	    } while (parent);
	    parents.forEach(function (parent) {
	      return parent.style.pointerEvents = "all";
	    });
	    return parents;
	  }
	}
	/* scroll to a positon with duration
	from https://gist.github.com/andjosh/6764939
	interface options{
	  x: number // nullable. don't scroll horizontally when null
	  y: number // nullable. don't scroll vertically when null
	  duration: number // default 0
	  element: Element // default is the top scrollable element.
	  beforeEveryFrame: (count: number) => boolean|void // call before requestAnimationFrame execution. return false to stop
	}
	return stop
	*/

	function scrollTo(options) {
	  if (!options.element) {
	    options.element = document.scrollingElement || document.documentElement;
	  }
	  if (options.duration == null) {
	    options.duration = 0;
	  }
	  var x = options.x,
	    y = options.y,
	    duration = options.duration,
	    element = options.element;
	  var requestAnimationFrameId;
	  var count = 0;
	  var startY = element.scrollTop,
	    changeY = y - startY,
	    startX = element.scrollLeft,
	    changeX = x - startX,
	    startDate = +new Date(),
	    animateScroll = function animateScroll() {
	      if (options.beforeEveryFrame && options.beforeEveryFrame(count) === false) {
	        return;
	      }
	      var currentDate = new Date().getTime();
	      var changedTime = currentDate - startDate;
	      if (y != null) {
	        element.scrollTop = parseInt(calc(startY, changeY, changedTime, duration));
	      }
	      if (x != null) {
	        element.scrollLeft = parseInt(calc(startX, changeX, changedTime, duration));
	      }
	      if (changedTime < duration) {
	        requestAnimationFrameId = requestAnimationFrame(animateScroll);
	      } else {
	        if (y != null) {
	          element.scrollTop = y;
	        }
	        if (x != null) {
	          element.scrollLeft = x;
	        }
	      }
	      count++;
	    };
	  var stop = function stop() {
	    cancelAnimationFrame(requestAnimationFrameId);
	  };
	  animateScroll(); // return stop

	  return stop;
	  function calc(startValue, changeInValue, changedTime, duration) {
	    return startValue + changeInValue * (changedTime / duration);
	  }
	} // ### DOM structure

	function insertBefore(el, target) {
	  target.parentElement.insertBefore(el, target);
	}
	function insertAfter(el, target) {
	  target.parentElement.insertBefore(el, target.nextSibling);
	}
	function prependTo(el, target) {
	  target.insertBefore(el, target.firstChild);
	}
	function appendTo(el, target) {
	  target.appendChild(el);
	} // ## Date
	function binarySearch(arr, callback) {
	  var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	  opt = Object.assign({
	    start: 0,
	    end: arr.length - 1,
	    maxTimes: 1000
	  }, opt);
	  var _opt = opt,
	    start = _opt.start,
	    end = _opt.end;
	  var _opt2 = opt,
	    returnNearestIfNoHit = _opt2.returnNearestIfNoHit,
	    maxTimes = _opt2.maxTimes;
	  var midNum;
	  var mid;
	  if (start == null) {
	    start = 0;
	    end = arr.length - 1;
	  }
	  var i = 0;
	  var r;
	  while (start >= 0 && start <= end) {
	    if (i >= maxTimes) {
	      throw Error("binarySearch: loop times is over ".concat(maxTimes, ", you can increase the limit."));
	    }
	    midNum = Math.floor((end - start) / 2 + start);
	    mid = arr[midNum];
	    r = callback(mid, i);
	    if (r > 0) {
	      end = midNum - 1;
	    } else if (r < 0) {
	      start = midNum + 1;
	    } else {
	      return {
	        index: midNum,
	        value: mid,
	        count: i + 1,
	        hit: true
	      };
	    }
	    i++;
	  }
	  return returnNearestIfNoHit ? {
	    index: midNum,
	    value: mid,
	    count: i + 1,
	    hit: false,
	    greater: r > 0
	  } : null;
	} //
	function waitTime(milliseconds, callback) {
	  return new Promise(function (resolve, reject) {
	    setTimeout(function () {
	      callback && callback();
	      resolve();
	    }, milliseconds);
	  });
	}
	var Cache = /*#__PURE__*/function () {
	  function Cache() {
	    _classCallCheck(this, Cache);
	    this.store = {};
	  }
	  _createClass(Cache, [{
	    key: "has",
	    value: function has(name) {
	      return this.store.hasOwnProperty(name);
	    }
	  }, {
	    key: "remember",
	    value: function remember(name, getter) {
	      if (!this.has(name)) {
	        this.store[name] = {
	          value: getter()
	        };
	      }
	      return this.store[name].value;
	    }
	  }, {
	    key: "forget",
	    value: function forget(name) {
	      if (name) {
	        if (this.has(name)) {
	          delete this.store[name];
	        }
	      } else {
	        this.store = {};
	      }
	    }
	  }]);
	  return Cache;
	}(); // attach cached getters to an object; can attach to self

	function attachCache(obj, toCache) {
	  var cache = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Cache();
	  var _loop2 = function _loop2(key) {
	    var getter = toCache[key];
	    Object.defineProperty(obj, key, {
	      get: function get() {
	        var _this9 = this;
	        return cache.remember(key, function () {
	          return getter.call(_this9);
	        });
	      }
	    });
	  };
	  for (var key in toCache) {
	    _loop2(key);
	  }
	} // for animation

	/*!
	 * vue-functions v2.0.6
	 * (c) phphe <phphe@outlook.com> (https://github.com/phphe)
	 * Homepage: undefined
	 * Released under the MIT License.
	 */
	/**
	 * [updatablePropsEvenUnbound description]
	 * @param  {[type]} props [object or getter]
	 * @return {[type]}       [description]
	 * props eg: {
	    value: {$localName: 'current', $localSetter: (value, vm)},
	  }
	  default localName is `localProps_${name}`
	 */

	function updatablePropsEvenUnbound(props) {
	  if (isFunction(props)) {
	    props = props();
	  } else {
	    // object
	    props = Object.assign({}, props);
	  }
	  var standardProps = {}; // without key starts with `$`

	  var _loop = function _loop(name) {
	    var prop = props[name]; // complete 补全选项

	    if (!prop.$localName) {
	      prop.$localName = "localProps_".concat(name);
	    }
	    if (!prop.$localSetter) {
	      prop.$localSetter = function (value) {
	        return value;
	      };
	    } // make standardProp

	    var standardProp = {};
	    standardProps[name] = standardProp;
	    Object.keys(props[name]).forEach(function (key) {
	      if (key[0] !== '$') {
	        standardProp[key] = prop[key];
	      }
	    });
	  };
	  for (var name in props) {
	    _loop(name);
	  }
	  var component = {
	    props: standardProps,
	    computed: {},
	    watch: {}
	  };
	  component.data = function () {
	    var t = {
	      localValueOfUpdatableProps: {}
	    };
	    for (var _i = 0, _Object$keys = Object.keys(props); _i < _Object$keys.length; _i++) {
	      var _name = _Object$keys[_i];
	      t.localValueOfUpdatableProps[_name] = this[_name];
	    }
	    return t;
	  };
	  var _loop2 = function _loop2() {
	    var name = _Object$keys2[_i2];
	    var prop = props[name];
	    component.watch[name] = function (value) {
	      this.localValueOfUpdatableProps[name] = prop.$localSetter(value, this);
	    };
	    var localName = prop.$localName;
	    component.computed[localName] = {
	      get: function get() {
	        return this.localValueOfUpdatableProps[name];
	      },
	      set: function set(value) {
	        if (name === 'value') {
	          this.$emit('input', value);
	        } else {
	          this.$emit("update:".concat(name), value);
	        }
	        this.localValueOfUpdatableProps[name] = prop.$localSetter(value, this);
	      }
	    };
	  };
	  for (var _i2 = 0, _Object$keys2 = Object.keys(props); _i2 < _Object$keys2.length; _i2++) {
	    _loop2();
	  }
	  return component;
	}
	var hookHelper = {
	  methods: {
	    // todo extract hooks to vue-functions
	    // get hooks in this._hooks, without which in props
	    _getNonPropHooksByName: function _getNonPropHooksByName(name) {
	      if (this._hooks) {
	        return this._hooks[name];
	      }
	    },
	    addHook: function addHook(name, func) {
	      if (!this._getNonPropHooksByName(name)) {
	        if (!this._hooks) {
	          this._hooks = {};
	        }
	        if (!this._hooks[name]) {
	          this._hooks[name] = [];
	        }
	      }
	      this._hooks[name].push(func);
	    },
	    removeHook: function removeHook(name, func) {
	      var hooks = this._getNonPropHooksByName(name);
	      if (hooks) {
	        arrayRemove(hooks, func);
	      }
	    },
	    hasHook: function hasHook(name) {
	      return this._getNonPropHooksByName(name) || this[name];
	    },
	    executeHook: function executeHook(name, args) {
	      var _this2 = this;
	      var hooks = this._getNonPropHooksByName(name);
	      hooks = hooks ? hooks.slice() : [];
	      if (this[name] && isFunction(this[name])) {
	        hooks.push(function (next) {
	          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            args[_key - 1] = arguments[_key];
	          }
	          return _this2[name].apply(_this2, args);
	        });
	      }
	      return joinFunctionsByNext(hooks).apply(void 0, _toConsumableArray(args));
	    }
	  }
	};

	function cloneTreeData(treeData, opt) {
	  return new TreeData(treeData).clone(opt);
	}
	function walkTreeData$1(treeData, handler, opt) {
	  return new TreeData(treeData).walk(handler, opt);
	}
	function getPureTreeData(treeData) {
	  const opt = {
	    afterNodeCreated: newNode => {
	      Object.keys(newNode).forEach(key => {
	        if (key[0] === '$') {
	          delete newNode[key];
	        }
	      });
	    }
	  };
	  return cloneTreeData(treeData, opt);
	}

	const template = function () {
	  // convert undefined to empty str
	  const noUndefined = str => str ? str : '';
	  // tree tpl, to render recursively
	  const childrenListTpl = (nodes, parent, parentPath) => {
	    const indentStyle = {
	      [!this.rtl ? 'paddingLeft' : 'paddingRight']: parentPath.length * this.indent + 'px'
	    };
	    const branchTpl = (node, index) => {
	      const path = [...parentPath, index];
	      const transitionComponent = this.foldingTransition || 'transition';
	      const slotDefault = () => {
	        const original = () => {
	          if (this.$slots.default) {
	            return this.$slots.default({
	              node,
	              index,
	              path,
	              tree: this
	            });
	          } else {
	            return node.text;
	          }
	        };
	        if (this.overrideSlotDefault) {
	          return this.overrideSlotDefault({
	            node,
	            index,
	            path,
	            tree: this
	          }, original);
	        } else {
	          return original();
	        }
	      };
	      let nodebackStyle = indentStyle;
	      if (node.$nodeBackStyle) {
	        nodebackStyle = {
	          ...nodebackStyle,
	          ...node.$nodeBackStyle
	        };
	      }
	      return vue.createVNode("div", {
	        "class": `tree-branch ${noUndefined(node.$branchClass)} ${noUndefined(node.$hidden && 'he-tree--hidden')}`,
	        "style": node.$branchStyle || {},
	        "data-tree-node-path": path.join(',')
	      }, [vue.createVNode("div", {
	        "class": `tree-node-back ${noUndefined(node.$nodeBackClass)}`,
	        "style": nodebackStyle || {}
	      }, [vue.createVNode("div", {
	        "class": `tree-node ${noUndefined(node.$nodeClass)}`,
	        "style": node.$nodeStyle || {}
	      }, [slotDefault()])]), (node.children && node.children.length) > 0 && vue.createVNode(transitionComponent, {
	        "name": this.$props.foldingTransitionName
	      }, {
	        default: () => [!node.$folded && childrenListTpl(node.children, node, path)]
	      })]);
	    };
	    return vue.createVNode("div", {
	      "class": `tree-children ${noUndefined(parent === this.rootNode && 'tree-root')} ${noUndefined(parent.$childrenClass)}`,
	      "style": parent.$childrenStyle || {}
	    }, [nodes.map(branchTpl)]);
	  };
	  return vue.createVNode("div", {
	    "class": `he-tree ${this.treeClass} ${noUndefined(this.rtl && 'he-tree--rtl')}`,
	    "data-tree-id": this.treeId
	  }, [this.blockHeader && this.blockHeader(), childrenListTpl(this.rootNode.children, this.rootNode, []), this.blockFooter && this.blockFooter()]);
	};
	const trees = {};
	const Tree = {
	  render: template,
	  mixins: [updatablePropsEvenUnbound({
	    value: {
	      $localName: 'treeData',
	      required: true
	    }
	  }), hookHelper],
	  props: {
	    indent: {
	      type: Number,
	      default: 20
	    },
	    rtl: {
	      type: Boolean
	    },
	    rootNode: {
	      default: is => ({})
	    }
	  },
	  // components: {},
	  data() {
	    return {
	      trees,
	      treeClass: '',
	      treeId: randString(),
	      // hooks of render
	      blockHeader: null,
	      blockFooter: null,
	      overrideSlotDefault: null
	    };
	  },
	  // computed: {},
	  watch: {
	    treeData: {
	      immediate: true,
	      handler(treeData) {
	        this._TreeDataHelper = new TreeData(this.treeData);
	      }
	    }
	  },
	  methods: {
	    iteratePath(path, opt) {
	      return this._TreeDataHelper.iteratePath(path, opt);
	    },
	    getTreeVmByTreeEl(treeEl) {
	      return this.trees[treeEl.getAttribute('data-tree-id')];
	    },
	    getAllNodesByPath(path) {
	      return this._TreeDataHelper.getAllNodes(path);
	    },
	    getNodeByPath(path) {
	      return this._TreeDataHelper.getNode(path);
	    },
	    getPathByBranchEl(branchEl) {
	      return branchEl.getAttribute('data-tree-node-path').split(',').map(v => parseInt(v));
	    },
	    getBranchElByPath(path) {
	      return this.$el.querySelector(`[data-tree-node-path='${path.join(',')}']`);
	    },
	    getNodeByBranchEl(branchEl) {
	      return this.getNodeByPath(this.getPathByBranchEl(branchEl));
	    },
	    getNodeParentByPath(path) {
	      return this._TreeDataHelper.getNodeParent(path);
	    },
	    removeNodeByPath(path) {
	      return this._TreeDataHelper.removeNode(path);
	    },
	    walkTreeData(handler, opt) {
	      return walkTreeData$1(this.treeData, handler, opt);
	    },
	    cloneTreeData(opt) {
	      return cloneTreeData(this.treeData, opt);
	    },
	    // return cloned new tree data without property witch starts with `$`
	    getPureTreeData() {
	      return getPureTreeData(this.treeData);
	    }
	  },
	  created() {
	    //
	    const updateRootNode = () => {
	      this.rootNode.children = this.treeData;
	    };
	    this.$watch('rootNode', updateRootNode, {
	      immediate: true
	    });
	    this.$watch('treeData', updateRootNode, {
	      immediate: true
	    });
	  },
	  mounted() {
	    //
	    this.treeId = randString();
	    this.trees[this.treeId] = this;
	  },
	  beforeUnmount() {
	    delete this.trees[this.treeId];
	  },
	  //
	  mixPlugins(plugins) {
	    const MixedTree = {
	      name: 'Tree',
	      extends: Tree,
	      mixins: plugins,
	      mixPlugins: this.mixPlugins
	    };
	    return MixedTree;
	  }
	};

	function foldAll(treeData) {
	  walkTreeData$1(treeData, childNode => {
	    childNode.$folded = true;
	  });
	}
	function unfoldAll(treeData) {
	  walkTreeData$1(treeData, childNode => {
	    childNode.$folded = false;
	  });
	}
	var fold = {
	  props: {
	    foldingTransitionName: {
	      type: String
	    },
	    foldingTransition: {},
	    foldAllAfterMounted: {
	      type: Boolean
	    }
	  },
	  emits: ['nodeFoldedChanged', 'node-folded-changed'],
	  methods: {
	    fold(node, path) {
	      if (!node.$folded) {
	        node['$folded'] = true;
	        this.$emit('nodeFoldedChanged', node);
	        this.$emit('node-folded-changed', node);
	      }
	    },
	    unfold(node, path, opt = {}) {
	      opt = {
	        foldOthers: false,
	        ...opt
	      };
	      if (opt.foldOthers) {
	        this.foldAll();
	      }
	      if (node.$folded) {
	        node['$folded'] = false;
	        this.$emit('nodeFoldedChanged', node);
	      }
	    },
	    toggleFold(node, path, opt) {
	      if (node.$folded) {
	        this.unfold(node, path, opt);
	      } else {
	        this.fold(node, path, opt);
	      }
	    },
	    foldAll() {
	      this.walkTreeData(childNode => {
	        this.fold(childNode);
	      });
	    },
	    unfoldAll() {
	      this.walkTreeData(childNode => {
	        this.unfold(childNode, {
	          unfoldParent: false
	        });
	      });
	    }
	  },
	  mounted() {
	    if (this.foldAllAfterMounted) {
	      this.foldAll();
	    }
	  }
	};

	var check = {
	  props: {},
	  methods: {
	    afterCheckChanged(node, path) {
	      // update parent
	      const nodes = this.getAllNodesByPath(path);
	      const reversedParents = nodes.slice(0, nodes.length - 1);
	      reversedParents.reverse();
	      for (const parent of reversedParents) {
	        parent['$checked'] = parent.children.every(child => child.$checked);
	      }
	      // update children
	      if (node.children && node.children.length > 0) {
	        walkTreeData$1(node.children, childNode => {
	          childNode['$checked'] = node.$checked;
	        });
	      }
	    },
	    check(node, path) {
	      node['$checked'] = true;
	      this.afterCheckChanged(node, path);
	    },
	    uncheck(node, path) {
	      node['$checked'] = false;
	      this.afterCheckChanged(node, path);
	    },
	    toggleCheck(node, path) {
	      node['$checked'] = !node.$checked;
	      this.afterCheckChanged(node, path);
	    }
	  }
	};

	/*!
	 * drag-event-service v1.1.10
	 * (c) phphe <phphe@outlook.com> (https://github.com/phphe)
	 * Homepage: null
	 * Released under the MIT License.
	 */
	var events = {
	  start: ['mousedown', 'touchstart'],
	  move: ['mousemove', 'touchmove'],
	  end: ['mouseup', 'touchend']
	};
	var DragEventService = {
	  isTouch: function isTouch(e) {
	    return e.type && e.type.startsWith('touch');
	  },
	  _getStore: function _getStore(el) {
	    if (!el._wrapperStore) {
	      el._wrapperStore = [];
	    }
	    return el._wrapperStore;
	  },
	  on: function on(el, name, handler, options) {
	    var _hp$onDOM, _hp$onDOM2;
	    var _resolveOptions = resolveOptions(options),
	      args = _resolveOptions.args,
	      mouseArgs = _resolveOptions.mouseArgs,
	      touchArgs = _resolveOptions.touchArgs;
	    var store = this._getStore(el);
	    var ts = this;
	    var wrapper = function wrapper(e) {
	      var mouse;
	      var isTouch = ts.isTouch(e);
	      if (isTouch) {
	        // touch
	        mouse = {
	          x: e.changedTouches[0].pageX,
	          y: e.changedTouches[0].pageY,
	          pageX: e.changedTouches[0].pageX,
	          pageY: e.changedTouches[0].pageY,
	          clientX: e.changedTouches[0].clientX,
	          clientY: e.changedTouches[0].clientY,
	          screenX: e.changedTouches[0].screenX,
	          screenY: e.changedTouches[0].screenY
	        };
	      } else {
	        // mouse
	        mouse = {
	          x: e.pageX,
	          y: e.pageY,
	          pageX: e.pageX,
	          pageY: e.pageY,
	          clientX: e.clientX,
	          clientY: e.clientY,
	          screenX: e.screenX,
	          screenY: e.screenY
	        };
	        if (name === 'start' && e.which !== 1) {
	          // not left button mousedown
	          return;
	        }
	      }
	      return handler.call(this, e, mouse);
	    };
	    store.push({
	      handler: handler,
	      wrapper: wrapper
	    }); // follow format will cause big bundle size
	    // 以下写法将会使打包工具认为hp是上下文, 导致打包整个hp
	    // hp.onDOM(el, events[name][0], wrapper, ...args)

	    (_hp$onDOM = onDOM).call.apply(_hp$onDOM, [null, el, events[name][0], wrapper].concat([].concat(_toConsumableArray(args), _toConsumableArray(mouseArgs))));
	    (_hp$onDOM2 = onDOM).call.apply(_hp$onDOM2, [null, el, events[name][1], wrapper].concat([].concat(_toConsumableArray(args), _toConsumableArray(touchArgs))));
	  },
	  off: function off(el, name, handler, options) {
	    var _resolveOptions2 = resolveOptions(options),
	      args = _resolveOptions2.args,
	      mouseArgs = _resolveOptions2.mouseArgs;
	    var store = this._getStore(el);
	    for (var i = store.length - 1; i >= 0; i--) {
	      var _store$i = store[i],
	        handler2 = _store$i.handler,
	        wrapper = _store$i.wrapper;
	      if (handler === handler2) {
	        var _hp$offDOM, _hp$offDOM2;
	        (_hp$offDOM = offDOM).call.apply(_hp$offDOM, [null, el, events[name][0], wrapper].concat([].concat(_toConsumableArray(args), _toConsumableArray(mouseArgs))));
	        (_hp$offDOM2 = offDOM).call.apply(_hp$offDOM2, [null, el, events[name][1], wrapper].concat([].concat(_toConsumableArray(args), _toConsumableArray(mouseArgs))));
	        store.splice(i, 1);
	      }
	    }
	  }
	};
	function resolveOptions(options) {
	  if (!options) {
	    options = {};
	  }
	  var args = options.args || [];
	  var mouseArgs = options.mouseArgs || [];
	  var touchArgs = options.touchArgs || [];
	  return {
	    args: args,
	    mouseArgs: mouseArgs,
	    touchArgs: touchArgs
	  };
	}

	/*!
	 * draggable-helper v5.0.6
	 * (c) phphe <phphe@outlook.com> (https://github.com/phphe)
	 * Homepage: undefined
	 * Released under the MIT License.
	 */
	function _createForOfIteratorHelper$1(o) {
	  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
	    if (Array.isArray(o) || (o = _unsupportedIterableToArray$1(o))) {
	      var i = 0;
	      var F = function F() {};
	      return {
	        s: F,
	        n: function n() {
	          if (i >= o.length) return {
	            done: true
	          };
	          return {
	            done: false,
	            value: o[i++]
	          };
	        },
	        e: function e(_e) {
	          throw _e;
	        },
	        f: F
	      };
	    }
	    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	  }
	  var it,
	    normalCompletion = true,
	    didErr = false,
	    err;
	  return {
	    s: function s() {
	      it = o[Symbol.iterator]();
	    },
	    n: function n() {
	      var step = it.next();
	      normalCompletion = step.done;
	      return step;
	    },
	    e: function e(_e2) {
	      didErr = true;
	      err = _e2;
	    },
	    f: function f() {
	      try {
	        if (!normalCompletion && it.return != null) it.return();
	      } finally {
	        if (didErr) throw err;
	      }
	    }
	  };
	}
	function _unsupportedIterableToArray$1(o, minLen) {
	  if (!o) return;
	  if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
	  var n = Object.prototype.toString.call(o).slice(8, -1);
	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return Array.from(n);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
	}
	function _arrayLikeToArray$1(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;
	  for (var i = 0, arr2 = new Array(len); i < len; i++) {
	    arr2[i] = arr[i];
	  }
	  return arr2;
	}
	/* Default export, a function.
	```js
	import draggableHelper from 'draggable-helper'
	draggableHelper(listenerElement, options)
	```
	Arguments:
	  listenerElement: HTMLElement. The element to bind mouse and touch event listener.
	  options: Options. Optional.
	 */

	/* 默认导出, 一个方法.
	```js
	import draggableHelper from 'draggable-helper'
	draggableHelper(listenerElement, options)
	```
	参数:
	  listenerElement: HTMLElement. 绑定鼠标和触摸事件监听器的HTML元素.
	  options: Options. 可选.
	 */

	var _edgeScroll = {
	  afterFirstMove: function afterFirstMove(store, opt) {},
	  afterMove: function afterMove(store, opt) {},
	  afterDrop: function afterDrop(store, opt) {}
	};
	function index(listenerElement) {
	  var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var store; // set default value of options
	  // 设置options的默认值

	  objectAssignIfKeyNull(opt, defaultOptions); // define the event listener of mousedown and touchstart
	  // 定义mousedown和touchstart事件监听器

	  var onMousedownOrTouchStart = function onMousedownOrTouchStart(e, mouse) {
	    // execute native event hooks
	    if (!DragEventService.isTouch(e)) {
	      opt.onmousedown && opt.onmousedown(e);
	    } else {
	      opt.ontouchstart && opt.ontouchstart(e);
	    }
	    var target = e.target; // check if triggered by ignore tags
	    // 检查是否由忽略的标签名触发

	    if (opt.ingoreTags.includes(target.tagName)) {
	      return;
	    } // check if trigger element and its parent has undraggable class name
	    // 检查触发事件的元素和其与element之间的父级是否有不允许拖动的类名

	    if (hasClass(target, opt.undraggableClassName)) {
	      return;
	    }
	    var isParentUndraggable = findParent(target, function (el) {
	      if (hasClass(el, opt.undraggableClassName)) {
	        return true;
	      }
	      if (el === listenerElement) {
	        return 'break';
	      }
	    });
	    if (isParentUndraggable) {
	      return;
	    } // Initialize store. Store start event, initial position
	    // 初始化store. 存储开始事件, 事件触发坐标

	    store = JSON.parse(JSON.stringify(initialStore));
	    store.startEvent = e;
	    store.listenerElement = listenerElement;
	    store.directTriggerElement = target;
	    store.initialMouse = Object.assign({}, mouse); // get triggerElement

	    var triggerElementIsMovedOrClonedElement = false;
	    if (opt.getTriggerElement) {
	      var el = opt.getTriggerElement(store.directTriggerElement, store);
	      if (!el) {
	        return;
	      }
	      store.triggerElement = el;
	    } else if (opt.triggerClassName) {
	      var triggerElement;
	      var _iterator = _createForOfIteratorHelper$1(toArrayIfNot(opt.triggerClassName)),
	        _step;
	      try {
	        var _loop = function _loop() {
	          var className = _step.value;
	          triggerElement = findParent(store.directTriggerElement, function (el) {
	            if (hasClass(el, className)) {
	              return true;
	            }
	            if (el === listenerElement) {
	              return 'break';
	            }
	          }, {
	            withSelf: true
	          });
	          if (triggerElement) {
	            return "break";
	          }
	        };
	        for (_iterator.s(); !(_step = _iterator.n()).done;) {
	          var _ret = _loop();
	          if (_ret === "break") break;
	        }
	      } catch (err) {
	        _iterator.e(err);
	      } finally {
	        _iterator.f();
	      }
	      if (!triggerElement) {
	        return;
	      }
	      store.triggerElement = triggerElement;
	    } else {
	      triggerElementIsMovedOrClonedElement = true;
	    } // get movedOrClonedElement

	    store.movedOrClonedElement = opt.getMovedOrClonedElement ? opt.getMovedOrClonedElement(store.directTriggerElement, store, opt) : listenerElement;
	    if (!store.movedOrClonedElement) {
	      return;
	    }
	    if (triggerElementIsMovedOrClonedElement) {
	      store.triggerElement = store.movedOrClonedElement;
	    } // check if trigger element is same with directTriggerElement when options.triggerBySelf is true
	    // options.triggerBySelf为true时, 检查触发事件的元素是否是允许触发的元素

	    if (opt.triggerBySelf && store.triggerElement !== store.directTriggerElement) {
	      return;
	    } // prevent text be selected
	    // 阻止文字被选中

	    if (!DragEventService.isTouch(e)) {
	      // Do not prevent when touch. Or the elements within the node can not trigger click event.
	      // 不要在触摸时阻止事件. 否则将导致节点内的元素不触发点击事件.
	      if (opt.preventTextSelection) {
	        e.preventDefault();
	      }
	    } // listen mousemove and touchmove
	    // 监听mousemove和touchmove

	    DragEventService.on(document, 'move', onMousemoveOrTouchMove, {
	      touchArgs: [{
	        passive: false
	      }]
	    }); // listen mouseup and touchend
	    // 监听mouseup和touchend

	    DragEventService.on(window, 'end', onMouseupOrTouchEnd);
	  }; // bind mousedown or touchstart event listener
	  // 绑定mousedown和touchstart事件监听器

	  DragEventService.on(listenerElement, 'start', onMousedownOrTouchStart, {
	    touchArgs: [{
	      passive: true
	    }]
	  }); // define the event listener of mousemove and touchmove
	  // 定义mousemove和touchmove事件监听器

	  var onMousemoveOrTouchMove = function onMousemoveOrTouchMove(e, mouse) {
	    // execute native event hooks
	    if (!DragEventService.isTouch(e)) {
	      opt.onmousemove && opt.onmousemove(e);
	    } else {
	      opt.ontouchmove && opt.ontouchmove(e);
	    } // 

	    var _store = store,
	      movedOrClonedElement = _store.movedOrClonedElement; // calc move and attach related info to store
	    // 计算move并附加相关信息到store

	    var move = store.move = {
	      x: mouse.clientX - store.initialMouse.clientX,
	      y: mouse.clientY - store.initialMouse.clientY
	    };
	    store.moveEvent = e;
	    store.mouse = mouse;
	    if (DragEventService.isTouch(e)) {
	      // prevent page scroll when touch.
	      // 当触摸时阻止屏幕被拖动.
	      e.preventDefault();
	    } else {
	      // prevent text be selected
	      // 阻止文字被选中
	      if (opt.preventTextSelection) {
	        e.preventDefault();
	      }
	    } // first move
	    // 第一次移动

	    if (store.movedCount === 0) {
	      // check if min displacement exceeded.
	      // 检查是否达到最小位移
	      if (opt.minDisplacement) {
	        var x2 = Math.pow(move.x, 2);
	        var y2 = Math.pow(move.y, 2);
	        var dtc = Math.pow(x2 + y2, 0.5);
	        if (dtc < opt.minDisplacement) {
	          return;
	        }
	      } // resolve elements

	      var movedElement = opt.clone ? movedOrClonedElement.cloneNode(true) : movedOrClonedElement;
	      var initialPosition = getViewportPosition(movedOrClonedElement); // attach elements and initialPosition to store
	      // 附加元素和初始位置到store

	      store.movedOrClonedElement = movedOrClonedElement;
	      store.movedElement = movedElement;
	      store.initialPositionRelativeToViewport = initialPosition;
	      store.initialPosition = initialPosition; // define the function to update moved element style
	      // 定义更新移动元素样式的方法

	      var updateMovedElementStyle = function updateMovedElementStyle() {
	        if (opt.clone) {
	          store.movedOrClonedElement.parentElement.appendChild(movedElement);
	        }
	        var size = getBoundingClientRect(movedElement);
	        var style = {
	          width: "".concat(Math.ceil(size.width), "px"),
	          height: "".concat(Math.ceil(size.height), "px"),
	          zIndex: 9999,
	          opacity: 0.8,
	          position: 'fixed',
	          left: initialPosition.x + 'px',
	          top: initialPosition.y + 'px',
	          pointerEvents: 'none'
	        };
	        backupAttr(movedElement, 'style');
	        for (var key in style) {
	          movedElement.style[key] = style[key];
	        }
	        backupAttr(movedElement, 'class');
	        addClass(movedElement, opt.draggingClassName);
	        /*
	        check if the changed position is expected and correct it. about stacking context.
	        当某父元素使用了transform属性时, fixed不再以窗口左上角为坐标. 以下功能是在第一次移动后, 检查元素实际位置和期望位置是否相同, 不同则说明坐标系不是期望的. 则把初始位置减去偏移, 无论任何父元素导致了层叠上下文问题, 都能正确显示.
	        */

	        var nowPosition = getViewportPosition(movedElement);
	        if (nowPosition.x !== initialPosition.x) {
	          initialPosition.x = initialPosition.x - (nowPosition.x - initialPosition.x);
	          initialPosition.y = initialPosition.y - (nowPosition.y - initialPosition.y);
	          movedElement.style.left = initialPosition.x + 'px';
	          movedElement.style.top = initialPosition.y + 'px';
	        }
	      };
	      store.updateMovedElementStyle = updateMovedElementStyle; // call hook beforeFirstMove, beforeMove

	      if (opt.beforeFirstMove && opt.beforeFirstMove(store, opt) === false) {
	        return;
	      }
	      if (opt.beforeMove && opt.beforeMove(store, opt) === false) {
	        return;
	      } // try to update moved element style
	      // 尝试更新移动元素样式

	      if (!opt.updateMovedElementStyleManually) {
	        store.updateMovedElementStyle();
	      }
	      _edgeScroll.afterFirstMove(store, opt);
	      opt.afterFirstMove && opt.afterFirstMove(store, opt);
	    } // Not the first move
	    // 非第一次移动
	    else {
	      // define the function to update moved element style
	      // 定义更新移动元素样式的方法
	      var _updateMovedElementStyle = function _updateMovedElementStyle() {
	        Object.assign(store.movedElement.style, {
	          left: store.initialPosition.x + move.x + 'px',
	          top: store.initialPosition.y + move.y + 'px'
	        });
	      };
	      store.updateMovedElementStyle = _updateMovedElementStyle; // call hook beforeMove

	      if (opt.beforeMove && opt.beforeMove(store, opt) === false) {
	        return;
	      } // try to update moved element style
	      // 尝试更新移动元素样式

	      if (!opt.updateMovedElementStyleManually) {
	        store.updateMovedElementStyle();
	      }
	    }
	    _edgeScroll.afterMove(store, opt);
	    store.movedCount++;
	    opt.afterMove && opt.afterMove(store, opt);
	  }; // define the event listener of mouseup and touchend
	  // 定义mouseup和touchend事件监听器

	  var onMouseupOrTouchEnd = function onMouseupOrTouchEnd(e) {
	    // execute native event hooks
	    if (!DragEventService.isTouch(e)) {
	      opt.onmousedown && opt.onmousedown(e);
	    } else {
	      opt.ontouchend && opt.ontouchend(e);
	    } // cancel listening mousemove, touchmove, mouseup, touchend
	    // 取消监听事件mousemove, touchmove, mouseup, touchend

	    DragEventService.off(document, 'move', onMousemoveOrTouchMove, {
	      touchArgs: [{
	        passive: false
	      }]
	    });
	    DragEventService.off(window, 'end', onMouseupOrTouchEnd); // 

	    if (store.movedCount === 0) {
	      return;
	    }
	    store.endEvent = e;
	    var _store2 = store,
	      movedElement = _store2.movedElement; // define the function to update moved element style
	    // 定义更新移动元素样式的方法

	    var updateMovedElementStyle = function updateMovedElementStyle() {
	      restoreAttr(movedElement, 'style');
	      restoreAttr(movedElement, 'class');
	      if (opt.clone) {
	        movedElement.parentElement.removeChild(movedElement);
	      }
	    };
	    store.updateMovedElementStyle = updateMovedElementStyle; // call hook beforeDrop

	    if (opt.beforeDrop && opt.beforeDrop(store, opt) === false) {
	      return;
	    } // try to update moved element style
	    // 尝试更新移动元素样式

	    if (!opt.updateMovedElementStyleManually) {
	      updateMovedElementStyle();
	    }
	    _edgeScroll.afterDrop(store, opt);
	    opt.afterDrop && opt.afterDrop(store, opt);
	  }; // define the destroy function
	  // 定义销毁/退出的方法

	  var destroy = function destroy() {
	    DragEventService.off(listenerElement, 'start', onMousedownOrTouchStart, {
	      touchArgs: [{
	        passive: true
	      }]
	    });
	    DragEventService.off(document, 'move', onMousemoveOrTouchMove, {
	      touchArgs: [{
	        passive: false
	      }]
	    });
	    DragEventService.off(window, 'end', onMouseupOrTouchEnd);
	  }; // 

	  return {
	    destroy: destroy,
	    options: opt
	  };
	} // available options and default options value
	// 可用选项和默认选项值

	var defaultOptions = {
	  ingoreTags: ['INPUT', 'TEXTAREA', 'SELECT', 'OPTGROUP', 'OPTION'],
	  undraggableClassName: 'undraggable',
	  minDisplacement: 10,
	  draggingClassName: 'dragging',
	  clone: false,
	  updateMovedElementStyleManually: false,
	  preventTextSelection: true,
	  edgeScrollTriggerMargin: 50,
	  edgeScrollSpeed: 0.35,
	  edgeScrollTriggerMode: 'top_left_corner'
	}; // Info after event triggered. Created when mousedown or touchstart, destroied after mouseup or touchend.
	// 事件触发后的相关信息. mousedown或touchstart时创建, mouseup或touchend后销毁.

	var initialStore = {
	  movedCount: 0
	}; // edge scroll
	// 边缘滚动

	var stopHorizontalScroll, stopVerticalScroll;
	_edgeScroll.afterMove = function (store, opt) {
	  if (!opt.edgeScroll) {
	    return;
	  }
	  var margin = opt.edgeScrollTriggerMargin;
	  stopOldScrollAnimation(); // get triggerPoint. The point trigger edge scroll.

	  var triggerPoint = {
	    x: store.mouse.clientX,
	    y: store.mouse.clientY
	  };
	  if (opt.edgeScrollTriggerMode === 'top_left_corner') {
	    var vp = getViewportPosition(store.movedElement);
	    triggerPoint = {
	      x: vp.x,
	      y: vp.y
	    };
	  } // 

	  var foundHorizontal, foundVertical, prevElement, horizontalDir, verticalDir;
	  var findInElements;
	  var cachedElementsFromPoint; // find x container

	  var minScrollableDisplacement = 10;
	  if (opt.edgeScrollSpecifiedContainerX) {
	    var containerX;
	    if (typeof opt.edgeScrollSpecifiedContainerX === 'function') {
	      containerX = opt.edgeScrollSpecifiedContainerX(store, opt);
	    } else {
	      containerX = opt.edgeScrollSpecifiedContainerX;
	    }
	    if (containerX) {
	      findInElements = [containerX];
	    }
	  }
	  if (!findInElements) {
	    findInElements = elementsFromPoint(triggerPoint.x, triggerPoint.y);
	    cachedElementsFromPoint = findInElements;
	  }
	  var _iterator2 = _createForOfIteratorHelper$1(findInElements),
	    _step2;
	  try {
	    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
	      var itemEl = _step2.value;
	      if (prevElement && !isDescendantOf(prevElement, itemEl)) {
	        // itemEl is being covered by other elements
	        // itemEl被其他元素遮挡
	        continue;
	      }
	      var t = minScrollableDisplacement; // min scrollable displacement. 最小可滚动距离, 小于此距离不触发滚动.

	      if (!foundHorizontal) {
	        if (itemEl.scrollWidth > itemEl.clientWidth) {
	          var _vp = fixedGetViewportPosition(itemEl);
	          if (triggerPoint.x <= _vp.left + margin) {
	            if (scrollableDisplacement(itemEl, 'left') > t && isScrollable(itemEl, 'x')) {
	              foundHorizontal = itemEl;
	              horizontalDir = 'left';
	            }
	          } else if (triggerPoint.x >= _vp.left + itemEl.clientWidth - margin) {
	            if (scrollableDisplacement(itemEl, 'right') > t && isScrollable(itemEl, 'x')) {
	              foundHorizontal = itemEl;
	              horizontalDir = 'right';
	            }
	          }
	        }
	      }
	      if (foundHorizontal) {
	        break;
	      }
	      prevElement = itemEl;
	    }
	  } catch (err) {
	    _iterator2.e(err);
	  } finally {
	    _iterator2.f();
	  }
	  prevElement = null; // find y container

	  findInElements = null;
	  if (opt.edgeScrollSpecifiedContainerY) {
	    var containerY;
	    if (typeof opt.edgeScrollSpecifiedContainerY === 'function') {
	      containerY = opt.edgeScrollSpecifiedContainerY(store, opt);
	    } else {
	      containerY = opt.edgeScrollSpecifiedContainerY;
	    }
	    if (containerY) {
	      findInElements = [containerY];
	    }
	  }
	  if (!findInElements) {
	    findInElements = cachedElementsFromPoint || elementsFromPoint(triggerPoint.x, triggerPoint.y);
	  }
	  var _iterator3 = _createForOfIteratorHelper$1(findInElements),
	    _step3;
	  try {
	    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
	      var _itemEl = _step3.value;
	      if (prevElement && !isDescendantOf(prevElement, _itemEl)) {
	        // itemEl is being covered by other elements
	        // itemEl被其他元素遮挡
	        continue;
	      }
	      var _t = minScrollableDisplacement; // min scrollable displacement. 最小可滚动距离, 小于此距离不触发滚动.

	      if (!foundVertical) {
	        if (_itemEl.scrollHeight > _itemEl.clientHeight) {
	          var _vp2 = fixedGetViewportPosition(_itemEl);
	          if (triggerPoint.y <= _vp2.top + margin) {
	            if (scrollableDisplacement(_itemEl, 'up') > _t && isScrollable(_itemEl, 'y')) {
	              foundVertical = _itemEl;
	              verticalDir = 'up';
	            }
	          } else if (triggerPoint.y >= _vp2.top + _itemEl.clientHeight - margin) {
	            if (scrollableDisplacement(_itemEl, 'down') > _t && isScrollable(_itemEl, 'y')) {
	              foundVertical = _itemEl;
	              verticalDir = 'down';
	            }
	          }
	        }
	      }
	      if (foundVertical) {
	        break;
	      }
	      prevElement = _itemEl;
	    } // scroll
	  } catch (err) {
	    _iterator3.e(err);
	  } finally {
	    _iterator3.f();
	  }
	  if (foundHorizontal) {
	    if (horizontalDir === 'left') {
	      stopHorizontalScroll = scrollTo({
	        x: 0,
	        element: foundHorizontal,
	        duration: scrollableDisplacement(foundHorizontal, 'left') / opt.edgeScrollSpeed
	      });
	    } else {
	      stopHorizontalScroll = scrollTo({
	        x: foundHorizontal.scrollWidth - foundHorizontal.clientWidth,
	        element: foundHorizontal,
	        duration: scrollableDisplacement(foundHorizontal, 'right') / opt.edgeScrollSpeed
	      });
	    }
	  }
	  if (foundVertical) {
	    if (verticalDir === 'up') {
	      stopVerticalScroll = scrollTo({
	        y: 0,
	        element: foundVertical,
	        duration: scrollableDisplacement(foundVertical, 'up') / opt.edgeScrollSpeed
	      });
	    } else {
	      stopVerticalScroll = scrollTo({
	        y: foundVertical.scrollHeight - foundVertical.clientHeight,
	        element: foundVertical,
	        duration: scrollableDisplacement(foundVertical, 'down') / opt.edgeScrollSpeed
	      });
	    }
	  } // is element scrollable in a direction
	  // 元素某方向是否可滚动

	  function isScrollable(el, dir) {
	    var style = getComputedStyle(el);
	    var key = "overflow-".concat(dir); // document.documentElement is special

	    var special = document.scrollingElement || document.documentElement;
	    if (el === special) {
	      return style[key] === 'visible' || style[key] === 'auto' || style[key] === 'scroll';
	    }
	    return style[key] === 'auto' || style[key] === 'scroll';
	  } // scrollable displacement of element  in a direction
	  // 元素某方向可滚动距离

	  function scrollableDisplacement(el, dir) {
	    if (dir === 'up') {
	      return el.scrollTop;
	    } else if (dir === 'down') {
	      return el.scrollHeight - el.scrollTop - el.clientHeight;
	    } else if (dir === 'left') {
	      return el.scrollLeft;
	    } else if (dir === 'right') {
	      return el.scrollWidth - el.scrollLeft - el.clientWidth;
	    }
	  }
	  function fixedGetViewportPosition(el) {
	    var r = getViewportPosition(el); // document.documentElement is special

	    var special = document.scrollingElement || document.documentElement;
	    if (el === special) {
	      r.top = 0;
	      r.left = 0;
	    }
	    return r;
	  }
	};
	_edgeScroll.afterDrop = function (store, opt) {
	  if (!opt.edgeScroll) {
	    return;
	  }
	  stopOldScrollAnimation();
	}; // stop old scroll animation
	// 结束之前的滚动动画

	function stopOldScrollAnimation() {
	  if (stopHorizontalScroll) {
	    stopHorizontalScroll();
	    stopHorizontalScroll = null;
	  }
	  if (stopVerticalScroll) {
	    stopVerticalScroll();
	    stopVerticalScroll = null;
	  }
	}

	// arg {options, event, store, opt, info, conditions, actions, doAction}
	function doDraggableDecision ({
	  conditions,
	  doAction
	}) {
	  // decision start =================================
	  if (conditions['no closest'] === true) {
	    doAction('append to root');
	  } else if (conditions['no closest'] === false) {
	    if (conditions['closest is top'] === true) {
	      if (conditions['on closest middle'] === true) {
	        doAction('insert before');
	      } else if (conditions['on closest middle'] === false) {
	        if (conditions['at closest indent right'] === true) {
	          doAction('prepend');
	        } else if (conditions['at closest indent right'] === false) {
	          if (conditions['closest is placeholder'] === true) {
	            doAction('insert after');
	          } else if (conditions['closest is placeholder'] === false) {
	            if (conditions['closest has children excluding placeholder movingEl'] === true) {
	              doAction('prepend');
	            } else if (conditions['closest has children excluding placeholder movingEl'] === false) {
	              doAction('insert after');
	            }
	          }
	        }
	      }
	    } else if (conditions['closest is top'] === false) {
	      if (conditions['on closest middle'] === true) {
	        if (conditions['at closest indent right'] === false) {
	          if (conditions['at closest left'] === false) {
	            if (conditions['closest is placeholder'] === false) {
	              if (conditions['closest has next'] === true) {
	                if (conditions['closest has children excluding placeholder movingEl'] === false) {
	                  doAction('insert after');
	                } else if (conditions['closest has children excluding placeholder movingEl'] === true) {
	                  doAction('prepend');
	                }
	              } else if (conditions['closest has next'] === false) {
	                if (conditions['closest has children excluding placeholder movingEl'] === true) {
	                  doAction('prepend');
	                } else if (conditions['closest has children excluding placeholder movingEl'] === false) {
	                  doAction('insert after');
	                }
	              }
	            } else if (conditions['closest is placeholder'] === true) {
	              doAction('nothing');
	            }
	          } else if (conditions['at closest left'] === true) {
	            if (conditions['closest is placeholder'] === true) {
	              if (conditions['no aboveBranch'] === true) {
	                doAction('nothing');
	              } else if (conditions['no aboveBranch'] === false) {
	                doAction('after above');
	              }
	            } else if (conditions['closest is placeholder'] === false) {
	              if (conditions['closest has children excluding placeholder movingEl'] === false) {
	                doAction('insert after');
	              } else if (conditions['closest has children excluding placeholder movingEl'] === true) {
	                doAction('prepend');
	              }
	            }
	          }
	        } else if (conditions['at closest indent right'] === true) {
	          if (conditions['closest is placeholder'] === false) {
	            if (conditions['closest has next'] === true) {
	              if (conditions['closest has children excluding placeholder movingEl'] === false) {
	                doAction('prepend');
	              } else if (conditions['closest has children excluding placeholder movingEl'] === true) {
	                if (conditions['closest is top excluding placeholder'] === true) {
	                  doAction('insert before');
	                } else if (conditions['closest is top excluding placeholder'] === false) {
	                  doAction('prepend');
	                }
	              }
	            } else if (conditions['closest has next'] === false) {
	              doAction('prepend');
	            }
	          } else if (conditions['closest is placeholder'] === true) {
	            if (conditions['no aboveBranch'] === true) {
	              if (conditions['closest has prev'] === false) {
	                doAction('nothing');
	              } else if (conditions['closest has prev'] === true) {
	                doAction('append to prev');
	              }
	            } else if (conditions['no aboveBranch'] === false) {
	              if (conditions['closest has prev'] === true) {
	                doAction('append to prev');
	              } else if (conditions['closest has prev'] === false) {
	                doAction('nothing');
	              }
	            }
	          }
	        }
	      } else if (conditions['on closest middle'] === false) {
	        if (conditions['at closest indent right'] === false) {
	          if (conditions['at closest left'] === false) {
	            if (conditions['closest is placeholder'] === false) {
	              if (conditions['closest has children excluding placeholder movingEl'] === true) {
	                doAction('prepend');
	              } else if (conditions['closest has children excluding placeholder movingEl'] === false) {
	                doAction('insert after');
	              }
	            } else if (conditions['closest is placeholder'] === true) {
	              doAction('nothing');
	            }
	          } else if (conditions['at closest left'] === true) {
	            if (conditions['closest is placeholder'] === true) {
	              if (conditions['no aboveBranch'] === false) {
	                doAction('after above');
	              } else if (conditions['no aboveBranch'] === true) {
	                doAction('nothing');
	              }
	            } else if (conditions['closest is placeholder'] === false) {
	              if (conditions['closest has next'] === false) {
	                if (conditions['closest has children excluding placeholder movingEl'] === false) {
	                  doAction('insert after');
	                } else if (conditions['closest has children excluding placeholder movingEl'] === true) {
	                  doAction('prepend');
	                }
	              } else if (conditions['closest has next'] === true) {
	                if (conditions['closest has children excluding placeholder movingEl'] === true) {
	                  doAction('prepend');
	                } else if (conditions['closest has children excluding placeholder movingEl'] === false) {
	                  doAction('insert after');
	                }
	              }
	            }
	          }
	        } else if (conditions['at closest indent right'] === true) {
	          if (conditions['closest is placeholder'] === true) {
	            if (conditions['no aboveBranch'] === true) {
	              if (conditions['closest has prev'] === false) {
	                doAction('nothing');
	              } else if (conditions['closest has prev'] === true) {
	                doAction('append to prev');
	              }
	            } else if (conditions['no aboveBranch'] === false) {
	              if (conditions['closest has prev'] === true) {
	                doAction('append to prev');
	              } else if (conditions['closest has prev'] === false) {
	                doAction('nothing');
	              }
	            }
	          } else if (conditions['closest is placeholder'] === false) {
	            doAction('prepend');
	          }
	        }
	      }
	    }
	  }
	  // decision end =================================
	}

	// in follow code, options belongs to makeTreeDraggable, opt belongs to draggableHelper
	function makeTreeDraggable(treeEl, options = {}) {
	  options = {
	    // indent: 20,
	    // triggerClass: 'tree-node',
	    // triggerBySelf: false,
	    // unfoldWhenDragover
	    // unfoldWhenDragoverDelay
	    // draggingNodePositionMode
	    // getTriggerEl optional
	    // rootClass: 'tree-root',
	    // childrenClass: 'tree-children',
	    // branchClass: 'tree-branch',
	    // nodeClass: 'tree-node',
	    // nodeBackClass: 'tree-node-back',
	    // placeholderClass: 'tree-placeholder',
	    // placeholderNodeBackClass: 'tree-placeholder-node-back',
	    // placeholderNodeClass: 'tree-placeholder-node',
	    // draggingClass: 'dragging',
	    // placeholderId
	    // unfoldTargetNodeByEl
	    // getPathByBranchEl
	    // edgeScroll: false,
	    // edgeScrollTriggerMargin: 50,
	    // edgeScrollSpeed: 0.35,
	    // edgeScrollTriggerMode: 'top_left_corner',
	    // edgeScrol: 'top_left_corner',
	    // edgeScrollSpecifiedContainerX?: HTMLElement,
	    // edgeScrollSpecifiedContainerY?: HTMLElement,
	    // rtl: false
	    // preventTextSelection: boolean
	    ...options,
	    treeEl
	  };
	  const {
	    destroy,
	    options: draggableHelperOptions
	  } = index(treeEl, {
	    triggerClassName: options.triggerClass,
	    triggerBySelf: options.triggerBySelf,
	    draggingClassName: options.draggingClass,
	    clone: options.cloneWhenDrag,
	    edgeScroll: options.edgeScroll,
	    edgeScrollTriggerMargin: options.edgeScrollTriggerMargin,
	    edgeScrollSpeed: options.edgeScrollSpeed,
	    edgeScrollTriggerMode: options.edgeScrollTriggerMode,
	    edgeScrollSpecifiedContainerX: options.edgeScrollSpecifiedContainerX,
	    edgeScrollSpecifiedContainerY: options.edgeScrollSpecifiedContainerY,
	    rtl: options.rtl,
	    preventTextSelection: options.preventTextSelection,
	    updateMovedElementStyleManually: true,
	    getMovedOrClonedElement: (directTriggerElement, store) => {
	      // find closest branch from parents
	      const el = findParent(store.triggerElement, el => hasClass(el, options.branchClass), {
	        withSelf: true
	      });
	      return el;
	    },
	    beforeFirstMove(store, dhOptions) {
	      store.startTreeEl = treeEl;
	      store.dragBranchEl = store.movedElement;
	      store.startPath = options.getPathByBranchEl(store.movedOrClonedElement);
	      if (options.beforeFirstMove && options.beforeFirstMove(store, dhOptions) === false) {
	        return false;
	      }
	    },
	    beforeMove: (store, dhOptions) => {
	      const updatePlaceholderIndent = () => {
	        // set indent of placeholder
	        const placeholderPath = options.getPathByBranchEl(store.placeholder);
	        const placeholderNodeBack = store.placeholder.querySelector(`.${options.nodeBackClass}`);
	        placeholderNodeBack.style[!options.rtl ? 'paddingLeft' : 'paddingRight'] = (placeholderPath.length - 1) * options.indent + 'px';
	        // remove tempChildren if empty
	        if (store.tempChildren.children.length === 0) {
	          removeEl(store.tempChildren);
	        }
	      };
	      // first move
	      // 第一次移动
	      if (store.movedCount === 0) {
	        // create placeholder
	        // 创建占位元素
	        const placeholder = createElementFromHTML(`
          <div id="${options.placeholderId}" class="${options.branchClass} ${options.placeholderClass}">
            <div class="${options.nodeBackClass} ${options.placeholderNodeBackClass}">
              <div class="${options.nodeClass} ${options.placeholderNodeClass}">
              </div>
            </div>
          </div>
        `);
	        insertAfter(placeholder, store.movedOrClonedElement);
	        store.placeholder = placeholder;
	        options.afterPlaceholderCreated(store);
	        // create a tree children el to use when can't get childrenEl
	        const tempChildren = document.createElement('DIV');
	        addClass(tempChildren, options.childrenClass);
	        store.tempChildren = tempChildren;
	        // update placeholder indent. update moved element style
	        updatePlaceholderIndent();
	        store.updateMovedElementStyle();
	        // skip first move
	        // 跳过第一次移动
	        return;
	      }
	      // 
	      store.updateMovedElementStyle();
	      // 
	      store.oneMoveStore = {}; // life cycle: one move
	      const movingEl = store.movedElement; // branch
	      // find closest branch and hovering tree
	      let tree;
	      const movingNode = movingEl.querySelector(`.${options.nodeClass}`);
	      // movingNodeOf and movingNodeRect are not always real. when RTL, there 'x' is top right. when draggingNodePositionMode is mouse, there x and y are mouse position. So don't calc them with their width or height.
	      // movingNodeOf 和 movingNodeRect并非一直如字面意义是movingNode真实坐标. RTL时, x坐标是右上角. draggingNodePositionMode是mouse时, x和y是鼠标坐标.
	      let movingNodeOf = getOffset(movingNode);
	      let movingNodeRect = getBoundingClientRect(movingNode);
	      if (options.draggingNodePositionMode === 'mouse') {
	        // use mouse position as dragging node position
	        const {
	          moveEvent
	        } = store;
	        movingNodeOf = {
	          x: moveEvent.pageX,
	          y: moveEvent.pageY
	        };
	        movingNodeRect = {
	          x: moveEvent.clientX,
	          y: moveEvent.clientY
	        };
	      } else if (options.rtl) {
	        movingNodeOf.x += movingNode.offsetWidth;
	        movingNodeRect.x += movingNode.offsetWidth;
	      }
	      // find tree with elementsFromPoint
	      let found;
	      let firstElement;
	      for (const itemEl of elementsFromPoint(movingNodeRect.x, movingNodeRect.y)) {
	        if (!firstElement) {
	          firstElement = itemEl;
	        }
	        if (hasClass(itemEl, options.treeClass)) {
	          found = itemEl;
	          break;
	        }
	      }
	      // check if the found element is covered by other elements
	      if (firstElement !== found && !isDescendantOf(firstElement, found)) {
	        found = null;
	      }
	      tree = found;
	      if (!tree) {
	        // out of tree or tree is covered by other elements
	        return;
	      }
	      // check if target tree right
	      if (options.filterTargetTree(tree, store, dhOptions) === false) {
	        return;
	      }
	      store.targetTreeEl = tree;
	      // info ========================================
	      // life cycle: one move
	      const info = {
	        tree: () => tree,
	        root: () => info.tree.querySelector(`.${options.childrenClass}`),
	        closestNode: () => {
	          const nodes = []; // all visible nodes sort by y
	          const walkToGetNodes = branch => {
	            //
	            if (branch !== info.tree) {
	              const node = branch.querySelector(`.${options.nodeClass}`);
	              if (node && !isElementHidden(node)) {
	                nodes.push(node);
	              }
	            }
	            //
	            const childrenEl = branch.querySelector(`.${options.childrenClass}`);
	            if (childrenEl) {
	              for (let i = 0; i < childrenEl.children.length; i++) {
	                const child = childrenEl.children[i];
	                if (child !== movingEl && hasClass(child, options.branchClass)) {
	                  walkToGetNodes(child);
	                }
	              }
	            }
	          };
	          walkToGetNodes(info.tree);
	          //
	          if (nodes.length === 0) {
	            return;
	          }
	          //
	          let found;
	          const t = binarySearch(nodes, node => getOffset(node).y - movingNodeOf.y, {
	            returnNearestIfNoHit: true
	          });
	          if (t.hit) {
	            found = t.value;
	          } else {
	            if (t.greater) {
	              found = nodes[t.index - 1] || t.value;
	            } else {
	              found = t.value;
	            }
	          }
	          return found;
	        },
	        closestNodeOffset: () => getOffset(info.closestNode),
	        closestBranch: () => findParent(info.closestNode, el => hasClass(el, options.branchClass)),
	        closestNext: () => {
	          let next = info.closestBranch.nextSibling;
	          while (next) {
	            if (next !== movingEl && hasClass(next, options.branchClass) && !isElementHidden(next)) {
	              return next;
	            }
	            next = next.nextSibling;
	          }
	        },
	        closestPrev: () => {
	          let prev = info.closestBranch.previousSibling;
	          while (prev) {
	            if (prev !== movingEl && hasClass(prev, options.branchClass) && !isElementHidden(prev)) {
	              return prev;
	            }
	            prev = prev.previousSibling;
	          }
	        },
	        aboveBranch: () => {
	          // find above from branch to root
	          // closestBranch must be placeholder
	          if (info.closestBranch !== store.placeholder) {
	            return;
	          }
	          if (conditions['closest has next']) {
	            return;
	          }
	          // find placeholder prev or parent
	          let cur = info.closestBranch;
	          let prev = cur.previousSibling;
	          let found;
	          while (prev) {
	            if (prev !== movingEl && hasClass(prev, options.branchClass) && !isElementHidden(prev)) {
	              cur = prev;
	              found = true;
	              break;
	            }
	            prev = prev.previousSibling;
	          }
	          if (!found) {
	            cur = findParent(cur, el => hasClass(el, options.branchClass));
	          }
	          //
	          while (cur) {
	            const curNode = cur.querySelector(`.${options.nodeClass}`);
	            if (!options.rtl) {
	              if (getOffset(curNode).x <= movingNodeOf.x) {
	                break;
	              }
	            } else {
	              if (getOffset(curNode).x + curNode.offsetWidth >= movingNodeOf.x) {
	                break;
	              }
	            }
	            let hasNextBranch;
	            let t = cur.nextSibling;
	            while (t) {
	              if (t !== movingEl && t !== store.placeholder && hasClass(t, options.branchClass) && !isElementHidden(t)) {
	                hasNextBranch = true;
	                break;
	              }
	              t = t.nextSibling;
	            }
	            if (hasNextBranch) {
	              break;
	            }
	            const parent = findParent(cur, el => hasClass(el, options.branchClass));
	            if (!parent) {
	              break;
	            }
	            cur = parent;
	          }
	          return cur;
	        }
	      };
	      // conditions ========================================
	      // life cycle: one move
	      const conditions = {
	        'no closest': () => !info.closestNode,
	        'closest is top': () => info.closestBranch === findNodeList(info.root.children, el => el !== movingEl && !isElementHidden(el)),
	        'closest is top excluding placeholder': () => info.closestBranch === findNodeList(info.root.children, el => el !== movingEl && el !== store.placeholder && !isElementHidden(el)),
	        'on closest middle': () => movingNodeOf.y < info.closestNodeOffset.y + info.closestNode.offsetHeight / 2,
	        'at closest indent right': () => movingNodeOf.x > info.closestNodeOffset.x + options.indent,
	        'at closest left': () => movingNodeOf.x < info.closestNodeOffset.x,
	        'closest is placeholder': () => info.closestBranch === store.placeholder,
	        'no aboveBranch': () => !info.aboveBranch,
	        'closest has next': () => info.closestNext,
	        'closest has prev': () => info.closestPrev,
	        'closest has children excluding placeholder movingEl': () => {
	          const childrenEl = info.closestBranch.querySelector(`.${options.childrenClass}`);
	          if (childrenEl) {
	            return findNodeList(childrenEl.children, el => el !== movingEl && el !== store.placeholder && !isElementHidden(el));
	          }
	        }
	      };
	      // fix for rtl
	      if (options.rtl) {
	        Object.assign(conditions, {
	          'at closest indent right': () => movingNodeOf.x < info.closestNodeOffset.x + info.closestNode.offsetWidth - options.indent,
	          // at indent left
	          'at closest left': () => movingNodeOf.x > info.closestNodeOffset.x + info.closestNode.offsetWidth // at right
	        });
	      }
	      // convert conditions result to Boolean
	      Object.keys(conditions).forEach(key => {
	        const old = conditions[key];
	        conditions[key] = function () {
	          return Boolean(old.call(this));
	        };
	      });
	      //
	      attachCache(info, info);
	      attachCache(conditions, conditions);
	      store.oneMoveStore.info = info;
	      store.oneMoveStore.conditions = conditions;
	      // actions start ========================================
	      const doAction = (name, ...args) => {
	        if (!store._doActionQueue) {
	          store._doActionQueue = Promise.resolve();
	        }
	        const queue = store._doActionQueue;
	        store._doActionQueue = queue.then(async () => {
	          // record tried actions in one move
	          if (!store.oneMoveStore.actionRecords) {
	            store.oneMoveStore.actionRecords = [];
	          }
	          const {
	            actionRecords
	          } = store.oneMoveStore;
	          //
	          const action = actions[name];
	          const r = action(...args);
	          actionRecords.push(name);
	          await r;
	          updatePlaceholderIndent();
	        });
	      };
	      const actions = {
	        async 'nothing'() {},
	        // do nothing
	        async 'append to root'() {
	          // no closest branch, just append to root
	          if (options.isTargetTreeRootDroppable(store)) {
	            appendTo(store.placeholder, info.root);
	          }
	        },
	        async 'insert before'() {
	          if (options.isNodeParentDroppable(info.closestBranch, store.targetTreeEl)) {
	            insertBefore(store.placeholder, info.closestBranch);
	          } else {
	            return secondCase(getParentBranchByEl(info.closestBranch));
	          }
	        },
	        async 'insert after'(branch = info.closestBranch) {
	          if (options.isNodeParentDroppable(branch, store.targetTreeEl)) {
	            insertAfter(store.placeholder, branch);
	          } else {
	            const moved = await secondCase(getParentBranchByEl(branch));
	            const isFirstTriedAction = !store.oneMoveStore.actionRecords || store.oneMoveStore.actionRecords.length === 1;
	            if (!moved && isFirstTriedAction) {
	              return thirdCase(branch);
	            }
	          }
	        },
	        async prepend() {
	          if (info.closestBranch === store.placeholder) {
	            return;
	          }
	          if (options.ifNodeFolded(info.closestBranch, store) && !options.unfoldWhenDragover) {
	            return doAction('insert after', info.closestBranch);
	          } else {
	            if (options.isNodeDroppable(info.closestBranch, store.targetTreeEl)) {
	              await tryUnfoldAndPrepend(info.closestBranch);
	            } else {
	              return secondCase(info.closestBranch);
	            }
	          }
	        },
	        async 'after above'() {
	          if (options.isNodeParentDroppable(info.aboveBranch, store.targetTreeEl)) {
	            insertAfter(store.placeholder, info.aboveBranch);
	          } else {
	            return secondCase(getParentBranchByEl(info.aboveBranch));
	          }
	        },
	        async 'append to prev'() {
	          if (info.closestPrev === store.placeholder) {
	            return;
	          }
	          if (options.ifNodeFolded(info.closestPrev, store)) {
	            return doAction('insert after', info.closestPrev);
	          } else {
	            if (options.isNodeDroppable(info.closestPrev, store.targetTreeEl)) {
	              const childrenEl = await unfoldAndGetChildrenEl(info.closestPrev);
	              appendTo(store.placeholder, childrenEl);
	            } else {
	              return secondCase(info.closestPrev);
	            }
	          }
	        }
	      };
	      // second case for actions, when target position not droppable
	      // return true if moved
	      const secondCase = async branchEl => {
	        if (branchEl) {
	          const targetEl = options._findClosestDroppablePosition(branchEl, store.targetTreeEl);
	          if (targetEl) {
	            insertAfter(store.placeholder, targetEl);
	            return true;
	          }
	        }
	      };
	      // when action is after, first case and second case invalid, try prepend
	      // 当操作是'after', 第一种第二种情况无效时, 尝试prepend
	      const thirdCase = async branchEl => {
	        // the third case
	        if (!options.ifNodeFolded(branchEl, store) && options.isNodeDroppable(branchEl, store.targetTreeEl)) {
	          await tryUnfoldAndPrepend(branchEl);
	        }
	      };
	      const unfoldAndGetChildrenEl = async branch => {
	        await options.unfoldTargetNodeByEl(branch, store);
	        let childrenEl = branch.querySelector(`.${options.childrenClass}`);
	        if (!childrenEl) {
	          childrenEl = store.tempChildren;
	          appendTo(childrenEl, branch);
	        }
	        return childrenEl;
	      };
	      const tryUnfoldAndPrepend = async branchEl => {
	        const func = async () => {
	          const childrenEl = await unfoldAndGetChildrenEl(branchEl);
	          prependTo(store.placeholder, childrenEl);
	        };
	        if (options.ifNodeFolded(branchEl, store)) {
	          // delay if node folded
	          let oneMoveStore = store.oneMoveStore;
	          setTimeout(() => {
	            // check if expired
	            if (oneMoveStore === store.oneMoveStore) {
	              func();
	            }
	          }, options.unfoldWhenDragoverDelay);
	        } else {
	          await func();
	        }
	      };
	      // actions end ========================================
	      doDraggableDecision({
	        options,
	        event: store.moveEvent,
	        store,
	        opt: dhOptions,
	        info,
	        conditions,
	        actions,
	        doAction
	      });
	    },
	    afterMove: (store, dhOptions) => {
	      options.afterMove && options.afterMove(store, dhOptions);
	    },
	    beforeDrop: async (store, dhOptions) => {
	      const movingEl = store.movedElement; // branch
	      const {
	        placeholder,
	        tempChildren,
	        movedCount,
	        targetTreeEl,
	        startTreeEl
	      } = store;
	      // use mask tree to avoid flick caused by DOM update in short time
	      // 复制 targetTreeEl 作为遮罩, 避免短时间内更新DOM引起的闪烁
	      let maskTree, maskTree2;
	      if (targetTreeEl) {
	        // No targetTreeEl mean no valid move.
	        // targetTreeEl不存在意味着没有有效移动.

	        // create mask tree
	        maskTree = targetTreeEl.cloneNode(true);
	        targetTreeEl.style.display = 'none';
	        insertAfter(maskTree, targetTreeEl);
	        if (startTreeEl !== targetTreeEl) {
	          maskTree2 = startTreeEl.cloneNode(true);
	          startTreeEl.style.display = 'none';
	          insertAfter(maskTree2, startTreeEl);
	        }
	        //
	        store.targetPath = options.getPathByBranchEl(placeholder);
	        let pathChanged = isPathChanged();
	        store.targetPathNotEqualToStartPath = pathChanged;
	        store.pathChangePrevented = false;
	        if (options.beforeDrop && options.beforeDrop(pathChanged, store, dhOptions) === false) {
	          pathChanged = false;
	          store.pathChangePrevented = false;
	        }
	        store.pathChanged = pathChanged;
	      }
	      // destroy placeholder and tempChildren
	      removeEl(placeholder);
	      if (tempChildren) {
	        removeEl(tempChildren);
	      }
	      store.updateMovedElementStyle();
	      // 
	      await options.afterDrop(store, dhOptions);
	      // remove mask tree
	      if (maskTree) {
	        await waitTime(30);
	        removeEl(maskTree);
	        targetTreeEl.style.display = 'block';
	        if (maskTree2) {
	          removeEl(maskTree2);
	          startTreeEl.style.display = 'block';
	        }
	      }
	      //
	      function isPathChanged() {
	        const {
	          startTree,
	          targetTree,
	          startPath,
	          targetPath
	        } = store;
	        if (startTree === targetTree && startPath.length === targetPath.length) {
	          if (startPath.toString() === targetPath.toString()) {
	            return false;
	          } else {
	            // downward same-level move, the end of targetPath is 1 more than real value 
	            // 同级向下移动时, targetPath的末位比真实值大1
	            const t = startPath.slice(0);
	            t[t.length - 1]++;
	            if (t.toString() === targetPath.toString()) {
	              return false;
	            }
	          }
	        }
	        return true;
	      }
	    }
	  });
	  return {
	    destroy,
	    options,
	    optionsUpdated
	  };
	  function getParentBranchByEl(el) {
	    return findParent(el, el => {
	      if (hasClass(el, options.branchClass)) {
	        return true;
	      }
	      if (hasClass(el, options.rootClass)) {
	        return 'break';
	      }
	    });
	  }
	  function optionsUpdated() {
	    Object.assign(draggableHelperOptions, {
	      triggerClassName: options.triggerClass,
	      triggerBySelf: options.triggerBySelf,
	      draggingClassName: options.draggingClass,
	      clone: options.cloneWhenDrag,
	      // edgeScroll
	      edgeScroll: options.edgeScroll,
	      edgeScrollTriggerMargin: options.edgeScrollTriggerMargin,
	      edgeScrollSpeed: options.edgeScrollSpeed,
	      edgeScrollTriggerMode: options.edgeScrollTriggerMode,
	      // 
	      rtl: options.rtl,
	      preventTextSelection: options.preventTextSelection
	    });
	  }
	}
	function isElementHidden(el) {
	  return el.offsetWidth === 0 && el.offsetHeight === 0;
	}

	const treesStore = {};
	var Draggable_vue = {
	  props: {
	    triggerClass: {
	      type: [String, Array],
	      default: 'tree-node'
	    },
	    triggerBySelf: {
	      type: Boolean
	    },
	    draggable: {
	      type: [Boolean, Function],
	      default: true
	    },
	    droppable: {
	      type: [Boolean, Function],
	      default: true
	    },
	    eachDraggable: {
	      type: [Function]
	    },
	    // type: [Boolean, Function]
	    eachDroppable: {
	      type: [Function]
	    },
	    // type: [Boolean, Function]
	    ondragstart: {
	      type: Function
	    },
	    ondragend: {
	      type: Function
	    },
	    unfoldWhenDragover: {
	      type: Boolean,
	      default: true
	    },
	    unfoldWhenDragoverDelay: {
	      type: Number,
	      default: 30
	    },
	    draggingNodePositionMode: {
	      type: String,
	      default: 'top_left_corner'
	    },
	    // top_left_corner, mouse
	    edgeScroll: {
	      type: Boolean
	    },
	    edgeScrollTriggerMargin: {
	      type: Number,
	      default: 50
	    },
	    edgeScrollSpeed: {
	      type: Number,
	      default: 0.35
	    },
	    edgeScrollTriggerMode: {
	      type: String,
	      default: 'top_left_corner'
	    },
	    edgeScrollSpecifiedContainerX: {},
	    // HTMLElement || ((store) => HTMLElement)
	    edgeScrollSpecifiedContainerY: {},
	    // HTMLElement || ((store) => HTMLElement)
	    preventTextSelection: {
	      type: Boolean,
	      default: true
	    }
	  },
	  emits: ['afterPlaceholderCreated', 'after-placeholder-created', 'before-first-move', 'drag', 'he-tree-drag', 'after-move', 'he-tree-before-drop', 'input', 'change', 'drop', 'he-tree-drop'],
	  // components: {},
	  data() {
	    return {
	      treesStore
	    };
	  },
	  // computed: {},
	  // watch: {},
	  methods: {
	    _Draggable_unfoldTargetNodeByEl(branchEl, store) {
	      const {
	        targetTree
	      } = store;
	      const path = targetTree.getPathByBranchEl(branchEl);
	      const node = targetTree.getNodeByPath(path);
	      targetTree.unfold && targetTree.unfold(node, path);
	      return new Promise((resolve, reject) => {
	        targetTree.$nextTick(() => {
	          resolve();
	        });
	      });
	    },
	    isNodeDraggable(node, path) {
	      const {
	        store
	      } = this.treesStore;
	      const allNodes = this.getAllNodesByPath(path);
	      allNodes.unshift(this.rootNode);
	      for (const {
	        value: node,
	        index
	      } of iterateAll(allNodes, {
	        reverse: true
	      })) {
	        const currentPath = path.slice(0, index + 1);
	        const draggableOpt = node.$draggable !== undefined ? node.$draggable : this.eachDraggable;
	        const draggable = resolveValueOrGettter(draggableOpt, [currentPath, this, store]);
	        if (draggable === undefined) {
	          continue;
	        } else {
	          return draggable;
	        }
	      }
	      return true;
	    },
	    isNodeDroppable(node, path) {
	      const {
	        store
	      } = this.treesStore;
	      const allNodes = this.getAllNodesByPath(path);
	      allNodes.unshift(this.rootNode);
	      let droppableFinal, resolved;
	      for (const {
	        value: node,
	        index
	      } of iterateAll(allNodes, {
	        reverse: true
	      })) {
	        const currentPath = path.slice(0, index + 1);
	        const droppableOpt = node.$droppable !== undefined ? node.$droppable : this.eachDroppable;
	        const droppable = resolveValueOrGettter(droppableOpt, [currentPath, this, store]);
	        if (droppable === undefined) {
	          continue;
	        } else {
	          droppableFinal = droppable;
	          resolved = true;
	          break;
	        }
	      }
	      if (!resolved) {
	        droppableFinal = true;
	      }
	      if (this._internal_hook_isNodeDroppable) {
	        return this._internal_hook_isNodeDroppable({
	          droppableFinal,
	          node,
	          path,
	          store
	        });
	      }
	      return droppableFinal;
	    },
	    // override
	    getPathByBranchEl(branchEl) {
	      const store = this.treesStore.store;
	      const getAttrPath = el => {
	        const pathStr = el.getAttribute('data-tree-node-path');
	        if (pathStr) {
	          return pathStr.split(',').map(v => parseInt(v));
	        }
	      };
	      const path = getAttrPath(branchEl);
	      if (path) {
	        return path;
	      }
	      // placeholder path
	      let parentPath;
	      findParent(branchEl, el => {
	        if (hasClass(el, 'tree-root')) {
	          parentPath = [];
	          return true;
	        }
	        if (hasClass(el, 'tree-branch')) {
	          parentPath = getAttrPath(el);
	          return true;
	        }
	      });
	      let index = 0;
	      for (const {
	        value: el,
	        index: index2
	      } of iterateAll(branchEl.parentElement.children)) {
	        if (hasClass(el, 'tree-branch') || hasClass(el, 'tree-placeholder')) {
	          if (el === branchEl) {
	            break;
	          }
	          index++;
	        }
	      }
	      return [...parentPath, index];
	    }
	  },
	  // created() {},
	  mounted() {
	    const options = this._draggableOptions = {
	      indent: this.indent,
	      triggerClass: this.triggerClass,
	      triggerBySelf: this.triggerBySelf,
	      unfoldWhenDragover: this.unfoldWhenDragover,
	      unfoldWhenDragoverDelay: this.unfoldWhenDragoverDelay,
	      draggingNodePositionMode: this.draggingNodePositionMode,
	      cloneWhenDrag: this.cloneWhenDrag,
	      edgeScroll: this.edgeScroll,
	      edgeScrollTriggerMargin: this.edgeScrollTriggerMargin,
	      edgeScrollSpeed: this.edgeScrollSpeed,
	      edgeScrollTriggerMode: this.edgeScrollTriggerMode,
	      edgeScrollSpecifiedContainerX: this.edgeScrollSpecifiedContainerX,
	      edgeScrollSpecifiedContainerY: this.edgeScrollSpecifiedContainerY,
	      rtl: this.rtl,
	      preventTextSelection: this.preventTextSelection,
	      treeClass: 'he-tree',
	      rootClass: 'tree-root',
	      childrenClass: 'tree-children',
	      branchClass: 'tree-branch',
	      nodeClass: 'tree-node',
	      nodeBackClass: 'tree-node-back',
	      placeholderClass: 'tree-placeholder',
	      placeholderNodeBackClass: 'tree-placeholder-node-back',
	      placeholderNodeClass: 'tree-placeholder-node',
	      draggingClass: 'dragging',
	      placeholderId: `he_tree_drag_placeholder`,
	      ifNodeFolded: (branchEl, store) => {
	        const {
	          targetTree
	        } = store;
	        const node = targetTree.getNodeByBranchEl(branchEl);
	        return node.$folded;
	      },
	      isTargetTreeRootDroppable: store => {
	        const droppable = resolveValueOrGettter(store.targetTree.rootNode.$droppable, [store.targetTree, store]);
	        if (droppable !== undefined) {
	          return droppable;
	        }
	        return true;
	      },
	      unfoldTargetNodeByEl: (...args) => this._Draggable_unfoldTargetNodeByEl(...args),
	      isNodeParentDroppable: (branchEl, treeEl) => {
	        const tree = this.getTreeVmByTreeEl(treeEl);
	        const path = tree.getPathByBranchEl(branchEl);
	        const parentPath = arrayWithoutEnd(path, 1);
	        const parent = tree.getNodeByPath(parentPath);
	        return tree.isNodeDroppable(parent, parentPath);
	      },
	      isNodeDroppable: (branchEl, treeEl) => {
	        const tree = this.getTreeVmByTreeEl(treeEl);
	        const path = tree.getPathByBranchEl(branchEl);
	        const node = tree.getNodeByPath(path);
	        return tree.isNodeDroppable(node, path);
	      },
	      _findClosestDroppablePosition: (branchEl, treeEl) => {
	        const tree = this.getTreeVmByTreeEl(treeEl);
	        const path = tree.getPathByBranchEl(branchEl);
	        const findPath = arrayWithoutEnd(path, 1);
	        let cur = path;
	        for (const {
	          node,
	          path
	        } of tree.iteratePath(findPath, {
	          reverse: true
	        })) {
	          if (tree.isNodeDroppable(node, path)) {
	            return tree.getBranchElByPath(cur);
	          } else {
	            cur = path;
	          }
	        }
	        if (tree.isNodeDroppable(this.rootNode, [])) {
	          return tree.getBranchElByPath(cur);
	        }
	      },
	      afterPlaceholderCreated: store => {
	        store.startTree.$emit('afterPlaceholderCreated', store);
	        store.startTree.$emit('after-placeholder-created', store);
	      },
	      getPathByBranchEl: branchEl => this.getPathByBranchEl(branchEl),
	      beforeFirstMove: store => {
	        this.treesStore.store = store;
	        store.startTree = this.getTreeVmByTreeEl(store.startTreeEl);
	        const draggable = resolveValueOrGettter(store.startTree.draggable, [store.startTree, store]);
	        if (!draggable) {
	          return false;
	        }
	        const {
	          startTree,
	          dragBranchEl,
	          startPath
	        } = store;
	        store.dragNode = startTree.getNodeByPath(startPath);
	        if (this.cloneWhenDrag) {
	          store.dragNode = cloneTreeData(store.dragNode);
	        }
	        if (!startTree.isNodeDraggable(store.dragNode, startPath)) {
	          return false;
	        }
	        if (startTree.hasHook('ondragstart') && startTree.executeHook('ondragstart', [startTree, store]) === false) {
	          return false;
	        }
	        store.startTree.$emit('before-first-move', store);
	        store.startTree.$emit('drag', store);
	        this.$root.$emit('he-tree-drag', store);
	      },
	      filterTargetTree: (targetTreeEl, store) => {
	        const targetTree = this.getTreeVmByTreeEl(targetTreeEl);
	        const {
	          startTree
	        } = store;
	        if (startTree !== targetTree) {
	          if (this._internal_hook_filterTargetTree) {
	            if (this._internal_hook_filterTargetTree(targetTree, store) === false) {
	              return false;
	            }
	          } else {
	            return false;
	          }
	        }
	        const targetTreeDroppable = resolveValueOrGettter(targetTree.droppable, [targetTree, store]);
	        if (!targetTreeDroppable) {
	          return false;
	        }
	        store.targetTree = targetTree;
	        if (!resolveValueOrGettter(store.startTree === store.targetTree) && resolveValueOrGettter(this._Draggable_unfoldTargetNode, [false, this.treeData]) !== this.rootNode.children) {
	          return false;
	        }
	      },
	      afterMove: store => {
	        store.startTree.$emit('after-move', store);
	      },
	      beforeDrop: (pathChanged, store) => {
	        const {
	          targetTree
	        } = store;
	        if (targetTree.hasHook('ondragend') && targetTree.executeHook('ondragend', [targetTree, store]) === false) {
	          return false;
	        }
	        this.$root.$emit('he-tree-before-drop', store);
	      },
	      afterDrop: (store, t) => {
	        if (store.pathChanged) {
	          const {
	            startTree,
	            targetTree,
	            startPath,
	            dragNode
	          } = store;
	          let {
	            targetPath
	          } = store;
	          if (this.cloneWhenDrag !== true) {
	            // remove from start position
	            const startParentPath = arrayWithoutEnd(startPath, 1);
	            const startParent = startTree.getNodeByPath(startParentPath);
	            const startSiblings = startParentPath.length === 0 ? startTree.treeData : startParent.children;
	            const startIndex = arrayLast(startPath);
	            startSiblings.splice(startIndex, 1);
	            // remove node from the starting position may affect the target path.
	            // example
	            //  startPath   targetPath
	            //  [0]         [1]
	            //  [0]         [1, 0]
	            //  [3, 1]      [3, 3]
	            //  [3, 1]      [3, 3, 5]
	            // above targetPaths should be transformed to [0], [0, 0] [3, 2] [3, 2, 5]
	            if (startTree === targetTree) {
	              if (startPath.length <= targetPath.length) {
	                const sw = startPath.slice(0, startPath.length - 1); // without end
	                const tw = targetPath.slice(0, sw.length); // same length with sw
	                if (sw.toString() === tw.toString()) {
	                  const endIndex = sw.length;
	                  if (startPath[endIndex] < targetPath[endIndex]) {
	                    // deprecated. I forgot why create a copy of targetPath. //  targetPath = targetPath.slice(0) // create a copy of targetPath
	                    targetPath[endIndex] -= 1;
	                  } else if (startPath[endIndex] === targetPath[endIndex]) {
	                    console.error('Draggable.afterDrop: That is impossible!');
	                  }
	                }
	              }
	            }
	          }
	          // insert to target position
	          const targetParentPath = arrayWithoutEnd(targetPath, 1);
	          const targetParent = targetTree.getNodeByPath(targetParentPath);
	          let targetSiblings;
	          if (targetParentPath.length === 0) {
	            targetSiblings = targetTree.treeData;
	          } else {
	            if (!targetParent.children) {
	              targetParent['children'] = [];
	            }
	            targetSiblings = targetParent.children;
	          }
	          const targetIndex = arrayLast(targetPath);
	          targetSiblings.splice(targetIndex, 0, dragNode);
	          // emit event
	          startTree.$emit('input', startTree.treeData);
	          startTree.$emit('change', store);
	          targetTree.$emit('drop', store);
	          this.$root.$emit('he-tree-drop', store);
	          if (targetTree !== startTree) {
	            targetTree.$emit('input', targetTree.treeData);
	            targetTree.$emit('change', store);
	          }
	          return new Promise((resolve, reject) => {
	            targetTree.$nextTick(() => {
	              resolve();
	            });
	          });
	        }
	      }
	    };
	    const _makeTreeDraggable_obj = this._makeTreeDraggable_obj = makeTreeDraggable(this.$el, options);
	    // watch props and update options
	    ['indent', 'triggerClass', 'triggerBySelf', 'unfoldWhenDragover', 'unfoldWhenDragoverDelay', 'draggingNodePositionMode', 'cloneWhenDrag', 'edgeScroll', 'edgeScrollTriggerMargin', 'edgeScrollSpeed', 'edgeScrollTriggerMode', 'edgeScrollSpecifiedContainerY', 'edgeScrollSpecifiedContainerY', 'rtl', 'preventTextSelection'].forEach(name => {
	      this.$watch(name, value => {
	        _makeTreeDraggable_obj.options[name] = value;
	        _makeTreeDraggable_obj.optionsUpdated();
	      });
	    });
	  }
	};

	exports.Check = check;
	exports.Draggable = Draggable_vue;
	exports.Fold = fold;
	exports.Tree = Tree;
	exports.cloneTreeData = cloneTreeData;
	exports.foldAll = foldAll;
	exports.getPureTreeData = getPureTreeData;
	exports.unfoldAll = unfoldAll;
	exports.walkTreeData = walkTreeData$1;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
