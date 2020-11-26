/*!
 * he-tree-vue v2.0.5
 * (c) phphe <phphe@outlook.com> (https://github.com/phphe)
 * Homepage: https://he-tree-vue.phphe.com
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = global || self, factory(global.heTreeVue = {}, global.Vue));
}(this, (function (exports, Vue) { 'use strict';

  Vue = Vue && Object.prototype.hasOwnProperty.call(Vue, 'default') ? Vue['default'] : Vue;

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  var arrayLikeToArray = _arrayLikeToArray;

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return arrayLikeToArray(arr);
  }

  var arrayWithoutHoles = _arrayWithoutHoles;

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  var iterableToArray = _iterableToArray;

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
  }

  var unsupportedIterableToArray = _unsupportedIterableToArray;

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var nonIterableSpread = _nonIterableSpread;

  function _toConsumableArray(arr) {
    return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
  }

  var toConsumableArray = _toConsumableArray;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var defineProperty = _defineProperty;

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var getPrototypeOf = createCommonjsModule(function (module) {
  function _getPrototypeOf(o) {
    module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  module.exports = _getPrototypeOf;
  });

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  var superPropBase = _superPropBase;

  var get = createCommonjsModule(function (module) {
  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      module.exports = _get = Reflect.get;
    } else {
      module.exports = _get = function _get(target, property, receiver) {
        var base = superPropBase(target, property);
        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  module.exports = _get;
  });

  var setPrototypeOf = createCommonjsModule(function (module) {
  function _setPrototypeOf(o, p) {
    module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  module.exports = _setPrototypeOf;
  });

  var _typeof_1 = createCommonjsModule(function (module) {
  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      module.exports = _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      module.exports = _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  module.exports = _typeof;
  });

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var createClass = _createClass;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var classCallCheck = _classCallCheck;

  var runtime_1 = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var runtime = (function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);

      // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.
      generator._invoke = makeInvokeMethod(innerFn, self, context);

      return generator;
    }
    exports.wrap = wrap;

    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
      try {
        return { type: "normal", arg: fn.call(obj, arg) };
      } catch (err) {
        return { type: "throw", arg: err };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";

    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};

    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}

    // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.
    var IteratorPrototype = {};
    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype &&
        NativeIteratorPrototype !== Op &&
        hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype =
      Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunctionPrototype[toStringTagSymbol] =
      GeneratorFunction.displayName = "GeneratorFunction";

    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function(method) {
        prototype[method] = function(arg) {
          return this._invoke(method, arg);
        };
      });
    }

    exports.isGeneratorFunction = function(genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor
        ? ctor === GeneratorFunction ||
          // For the native GeneratorFunction constructor, the best we can
          // do is to check its .name property.
          (ctor.displayName || ctor.name) === "GeneratorFunction"
        : false;
    };

    exports.mark = function(genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        if (!(toStringTagSymbol in genFun)) {
          genFun[toStringTagSymbol] = "GeneratorFunction";
        }
      }
      genFun.prototype = Object.create(Gp);
      return genFun;
    };

    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.
    exports.awrap = function(arg) {
      return { __await: arg };
    };

    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;
          if (value &&
              typeof value === "object" &&
              hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function(value) {
              invoke("next", value, resolve, reject);
            }, function(err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return PromiseImpl.resolve(value).then(function(unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function(error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function(resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise =
          // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(
            callInvokeWithMethodAndArg,
            // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg
          ) : callInvokeWithMethodAndArg();
      }

      // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).
      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);
    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };
    exports.AsyncIterator = AsyncIterator;

    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;

      var iter = new AsyncIterator(
        wrap(innerFn, outerFn, self, tryLocsList),
        PromiseImpl
      );

      return exports.isGeneratorFunction(outerFn)
        ? iter // If outerFn is a generator, return the full iterator.
        : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
          });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;

      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }

          // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;

          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);

          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;

          var record = tryCatch(innerFn, self, context);
          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done
              ? GenStateCompleted
              : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };

          } else if (record.type === "throw") {
            state = GenStateCompleted;
            // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.
            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    }

    // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];
      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError(
            "The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (! info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value;

        // Resume execution at the desired location (see delegateYield).
        context.next = delegate.nextLoc;

        // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.
        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }

      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      }

      // The delegate iterator is finished, so forget it and continue with
      // the outer generator.
      context.delegate = null;
      return ContinueSentinel;
    }

    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);

    Gp[toStringTagSymbol] = "Generator";

    // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.
    Gp[iteratorSymbol] = function() {
      return this;
    };

    Gp.toString = function() {
      return "[object Generator]";
    };

    function pushTryEntry(locs) {
      var entry = { tryLoc: locs[0] };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{ tryLoc: "root" }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function(object) {
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      keys.reverse();

      // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.
      return function next() {
        while (keys.length) {
          var key = keys.pop();
          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }

        // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.
        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1, next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;

            return next;
          };

          return next.next = next;
        }
      }

      // Return an iterator with no values.
      return { next: doneResult };
    }
    exports.values = values;

    function doneResult() {
      return { value: undefined$1, done: true };
    }

    Context.prototype = {
      constructor: Context,

      reset: function(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.
        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;

        this.method = "next";
        this.arg = undefined$1;

        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" &&
                hasOwn.call(this, name) &&
                !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },

      stop: function() {
        this.done = true;

        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },

      dispatchException: function(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !! caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }

            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },

      abrupt: function(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev &&
              hasOwn.call(entry, "finallyLoc") &&
              this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry &&
            (type === "break" ||
             type === "continue") &&
            finallyEntry.tryLoc <= arg &&
            arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },

      complete: function(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" ||
            record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },

      finish: function(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },

      "catch": function(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }

        // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.
        throw new Error("illegal catch attempt");
      },

      delegateYield: function(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    };

    // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.
    return exports;

  }(
    // If this script is executing as a CommonJS module, use module.exports
    // as the regeneratorRuntime namespace. Otherwise create a new empty
    // object. Either way, the resulting object will be used to initialize
    // the regeneratorRuntime variable at the top of this file.
     module.exports 
  ));

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    Function("r", "regeneratorRuntime = r")(runtime);
  }
  });

  var regenerator = runtime_1;

  /*!
   * helper-js v2.0.1
   * (c) phphe <phphe@outlook.com> (https://github.com/phphe)
   * Homepage: undefined
   * Released under the MIT License.
   */

  var _marked = /*#__PURE__*/regenerator.mark(iterateAll);

  function _createForOfIteratorHelper(o) {
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
  } // 为此库有需要的方法存储信息

  function isArray(v) {
    return Object.prototype.toString.call(v) === '[object Array]';
  }

  function isObject(v) {
    return Object.prototype.toString.call(v) === '[object Object]';
  }

  function isFunction(v) {
    return typeof v === 'function';
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
    var seeds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var r = '';

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
            throw 'Unsupported type';

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
            throw 'Unsupported type';

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
    var childrenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';
    var opt = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var rootChildren = isArray(obj) ? obj : [obj]; //

    var StopException = function StopException() {
      classCallCheck(this, StopException);
    };

    var func = function func(children, parent, parentPath) {
      if (opt.reverse) {
        children = children.slice();
        children.reverse();
      }

      var len = children.length;

      for (var i = 0; i < len; i++) {
        var item = children[i];
        var index = opt.reverse ? len - i - 1 : i;
        var path = parentPath ? [].concat(toConsumableArray(parentPath), [index]) : [];
        var r = handler(item, index, parent, path);

        if (r === false) {
          // stop
          throw new StopException();
        } else if (r === 'skip children') {
          continue;
        } else if (r === 'skip siblings') {
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

      classCallCheck(this, TreeData);

      this.childrenKey = 'children';
      this.data = data;
    }

    createClass(TreeData, [{
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
                currentPath = [].concat(toConsumableArray(prevPath), [index]);
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
                list = toConsumableArray(this.iteratePath(path, Object.assign(Object.assign({}, opt), {
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
        var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}; // opt.afterNodeCreated(newNode, {oldNode: node, index, parent, path})

        var childrenKey = this.childrenKey;
        var td = new TreeData();
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
    }, {
      key: "rootChildren",
      get: function get() {
        var childrenKey = this.childrenKey;
        var data = this.data;
        return isArray(data) ? data : data[childrenKey];
      }
    }]);

    return TreeData;
  }(); // ## function
  // ## 函数
  // if it is function, return result, else return it directly.


  function resolveValueOrGettter(valueOrGetter) {
    var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    if (isFunction(valueOrGetter)) {
      return valueOrGetter.apply(void 0, toConsumableArray(args));
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
    var div = document.createElement('div');
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
    if (typeof pageYOffset != 'undefined') {
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

      if (r === 'break') {
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
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    }
  } // source: http://youmightnotneedjquery.com/


  function addClass(el, className) {
    if (!hasClass(el, className)) {
      if (el.classList) {
        el.classList.add(className);
      } else {
        el.className += ' ' + className;
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
    var args = [x, y]; // @ts-ignore

    var func = document.elementsFromPoint || document.msElementsFromPoint || elementsFromPoint;
    return func.apply(document, args);

    function elementsFromPoint(x, y) {
      var parents = [];
      var parent = void 0;

      do {
        if (parent !== document.elementFromPoint(x, y)) {
          parent = document.elementFromPoint(x, y);
          parents.push(parent);
          parent.style.pointerEvents = 'none';
        } else {
          parent = false;
        }
      } while (parent);

      parents.forEach(function (parent) {
        return parent.style.pointerEvents = 'all';
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
      classCallCheck(this, Cache);

      this.store = {};
    }

    createClass(Cache, [{
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

    var _loop3 = function _loop3(key) {
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
      _loop3(key);
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

        return joinFunctionsByNext(hooks).apply(void 0, toConsumableArray(args));
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
    var opt = {
      afterNodeCreated: function afterNodeCreated(newNode) {
        Object.keys(newNode).forEach(function (key) {
          if (key[0] === '$') {
            delete newNode[key];
          }
        });
      }
    };
    return cloneTreeData(treeData, opt);
  }

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  var template = function template(h) {
    var _this = this;

    // convert undefined to empty str
    var noUndefined = function noUndefined(str) {
      return str ? str : '';
    }; // tree tpl, to render recursively


    var childrenListTpl = function childrenListTpl(nodes, parent, parentPath) {
      var indentStyle = defineProperty({}, !_this.rtl ? 'paddingLeft' : 'paddingRight', parentPath.length * _this.indent + 'px');

      var branchTpl = function branchTpl(node, index) {
        var path = [].concat(toConsumableArray(parentPath), [index]);
        var transitionComponent = _this.foldingTransition || 'transition';

        var slotDefault = function slotDefault() {
          var original = function original() {
            if (_this.$scopedSlots.default) {
              return _this.$scopedSlots.default({
                node: node,
                index: index,
                path: path,
                tree: _this
              });
            } else if (_this.$slots.default) {
              return _this.$slots.default;
            } else {
              return node.text;
            }
          };

          if (_this.overrideSlotDefault) {
            return _this.overrideSlotDefault({
              node: node,
              index: index,
              path: path,
              tree: _this
            }, original);
          } else {
            return original();
          }
        };

        var nodebackStyle = indentStyle;

        if (node.$nodeBackStyle) {
          nodebackStyle = _objectSpread(_objectSpread({}, nodebackStyle), node.$nodeBackStyle);
        }

        return h("div", {
          "class": "tree-branch ".concat(noUndefined(node.$branchClass), " ").concat(noUndefined(node.$hidden && 'he-tree--hidden')),
          "style": node.$branchStyle || {},
          "attrs": {
            "data-tree-node-path": path.join(',')
          }
        }, [h("div", {
          "class": "tree-node-back ".concat(noUndefined(node.$nodeBackClass)),
          "style": nodebackStyle || {}
        }, [h("div", {
          "class": "tree-node ".concat(noUndefined(node.$nodeClass)),
          "style": node.$nodeStyle || {}
        }, [slotDefault()])]), (node.children && node.children.length) > 0 && h(transitionComponent, {
          "attrs": {
            "name": _this.$props.foldingTransitionName
          }
        }, [!node.$folded && childrenListTpl(node.children, node, path)])]);
      };

      return h("div", {
        "class": "tree-children ".concat(noUndefined(parent === _this.rootNode && 'tree-root'), " ").concat(noUndefined(parent.$childrenClass)),
        "style": parent.$childrenStyle || {}
      }, [nodes.map(branchTpl)]);
    };

    return h("div", {
      "class": "he-tree ".concat(this.treeClass, " ").concat(noUndefined(this.rtl && 'he-tree--rtl')),
      "attrs": {
        "data-tree-id": this.treeId
      }
    }, [this.blockHeader && this.blockHeader(), childrenListTpl(this.rootNode.children, this.rootNode, []), this.blockFooter && this.blockFooter()]);
  };

  var trees = {};
  var Tree = {
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
        default: function _default(is) {
          return {};
        }
      }
    },
    // components: {},
    data: function data() {
      return {
        trees: trees,
        treeClass: '',
        treeId: randString()
      };
    },
    // computed: {},
    watch: {
      treeData: {
        immediate: true,
        handler: function handler(treeData) {
          this._TreeDataHelper = new TreeData(this.treeData);
        }
      }
    },
    methods: {
      iteratePath: function iteratePath(path, opt) {
        return this._TreeDataHelper.iteratePath(path, opt);
      },
      getTreeVmByTreeEl: function getTreeVmByTreeEl(treeEl) {
        return this.trees[treeEl.getAttribute('data-tree-id')];
      },
      getAllNodesByPath: function getAllNodesByPath(path) {
        return this._TreeDataHelper.getAllNodes(path);
      },
      getNodeByPath: function getNodeByPath(path) {
        return this._TreeDataHelper.getNode(path);
      },
      getPathByBranchEl: function getPathByBranchEl(branchEl) {
        return branchEl.getAttribute('data-tree-node-path').split(',').map(function (v) {
          return parseInt(v);
        });
      },
      getBranchElByPath: function getBranchElByPath(path) {
        return this.$el.querySelector("[data-tree-node-path='".concat(path.join(','), "']"));
      },
      getNodeByBranchEl: function getNodeByBranchEl(branchEl) {
        return this.getNodeByPath(this.getPathByBranchEl(branchEl));
      },
      getNodeParentByPath: function getNodeParentByPath(path) {
        return this._TreeDataHelper.getNodeParent(path);
      },
      removeNodeByPath: function removeNodeByPath(path) {
        return this._TreeDataHelper.removeNode(path);
      },
      walkTreeData: function walkTreeData(handler, opt) {
        return walkTreeData$1(this.treeData, handler, opt);
      },
      cloneTreeData: function cloneTreeData$1(opt) {
        return cloneTreeData(this.treeData, opt);
      },
      // return cloned new tree data without property witch starts with `$`
      getPureTreeData: function getPureTreeData$1() {
        return getPureTreeData(this.treeData);
      }
    },
    created: function created() {
      var _this2 = this;

      //
      var updateRootNode = function updateRootNode() {
        _this2.$set(_this2.rootNode, 'children', _this2.treeData);
      };

      this.$watch('rootNode', updateRootNode, {
        immediate: true
      });
      this.$watch('treeData', updateRootNode, {
        immediate: true
      });
    },
    mounted: function mounted() {
      var _this3 = this;

      //
      this.treeId = randString();
      this.$set(this.trees, this.treeId, this);
      this.$once('hook:beforeDestroy', function () {
        _this3.$delete(_this3.trees, _this3.treeId);
      });
    },
    // beforeDestroy() {},
    //
    mixPlugins: function mixPlugins(plugins) {
      var MixedTree = {
        name: 'Tree',
        extends: Tree,
        mixins: plugins,
        mixPlugins: this.mixPlugins
      };
      return MixedTree;
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
  /* server only */
  , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    } // Vue.extend constructor export interop.


    var options = typeof script === 'function' ? script.options : script; // render functions

    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true; // functional template

      if (isFunctionalTemplate) {
        options.functional = true;
      }
    } // scopedId


    if (scopeId) {
      options._scopeId = scopeId;
    }

    var hook;

    if (moduleIdentifier) {
      // server build
      hook = function hook(context) {
        // 2.3 injection
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
        // 2.2 with runInNewContext: true

        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        } // inject component styles


        if (style) {
          style.call(this, createInjectorSSR(context));
        } // register component module identifier for async chunk inference


        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      }; // used by ssr in case component is cached and beforeCreate
      // never gets called


      options._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function (context) {
        style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
      } : function (context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook) {
      if (options.functional) {
        // register for functional component in vue file
        var originalRender = options.render;

        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }

    return script;
  }

  /* script */
  var __vue_script__ = Tree;
  /* template */

  /* style */

  var __vue_inject_styles__ = undefined;
  /* scoped */

  var __vue_scope_id__ = undefined;
  /* module identifier */

  var __vue_module_identifier__ = undefined;
  /* functional template */

  var __vue_is_functional_template__ = undefined;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__ = /*#__PURE__*/normalizeComponent({}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

  function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
  function foldAll(treeData) {
    walkTreeData$1(treeData, function (childNode) {
      Vue.set(childNode, '$folded', true);
    });
  }
  function unfoldAll(treeData) {
    walkTreeData$1(treeData, function (childNode) {
      Vue.set(childNode, '$folded', false);
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
    methods: {
      fold: function fold(node, path) {
        if (!node.$folded) {
          this.$set(node, '$folded', true);
          this.$emit('nodeFoldedChanged', node);
        }
      },
      unfold: function unfold(node, path) {
        var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        opt = _objectSpread$1({
          foldOthers: false
        }, opt);

        if (opt.foldOthers) {
          this.foldAll();
        }

        if (node.$folded) {
          this.$set(node, '$folded', false);
          this.$emit('nodeFoldedChanged', node);
        }
      },
      toggleFold: function toggleFold(node, path, opt) {
        if (node.$folded) {
          this.unfold(node, path, opt);
        } else {
          this.fold(node, path, opt);
        }
      },
      foldAll: function foldAll() {
        var _this = this;

        this.walkTreeData(function (childNode) {
          _this.fold(childNode);
        });
      },
      unfoldAll: function unfoldAll() {
        var _this2 = this;

        this.walkTreeData(function (childNode) {
          _this2.unfold(childNode, {
            unfoldParent: false
          });
        });
      }
    },
    mounted: function mounted() {
      if (this.foldAllAfterMounted) {
        this.foldAll();
      }
    }
  };

  function _createForOfIteratorHelper$1(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$2(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }

  function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
  var check = {
    props: {},
    methods: {
      afterCheckChanged: function afterCheckChanged(node, path) {
        var _this = this;

        // update parent
        var nodes = this.getAllNodesByPath(path);
        var reversedParents = nodes.slice(0, nodes.length - 1);
        reversedParents.reverse();

        var _iterator = _createForOfIteratorHelper$1(reversedParents),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var parent = _step.value;
            this.$set(parent, '$checked', parent.children.every(function (child) {
              return child.$checked;
            }));
          } // update children

        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        if (node.children && node.children.length > 0) {
          walkTreeData$1(node.children, function (childNode) {
            _this.$set(childNode, '$checked', node.$checked);
          });
        }
      },
      check: function check(node, path) {
        this.$set(node, '$checked', true);
        this.afterCheckChanged(node, path);
      },
      uncheck: function uncheck(node, path) {
        this.$set(node, '$checked', false);
        this.afterCheckChanged(node, path);
      },
      toggleCheck: function toggleCheck(node, path) {
        this.$set(node, '$checked', !node.$checked);
        this.afterCheckChanged(node, path);
      }
    }
  };

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  var asyncToGenerator = _asyncToGenerator;

  /*!
   * drag-event-service v1.1.7
   * (c) phphe <phphe@outlook.com> (https://github.com/phphe)
   * Homepage: undefined
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

      (_hp$onDOM = onDOM).call.apply(_hp$onDOM, [null, el, events[name][0], wrapper].concat([].concat(toConsumableArray(args), toConsumableArray(mouseArgs))));

      (_hp$onDOM2 = onDOM).call.apply(_hp$onDOM2, [null, el, events[name][1], wrapper].concat([].concat(toConsumableArray(args), toConsumableArray(touchArgs))));
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

          (_hp$offDOM = offDOM).call.apply(_hp$offDOM, [null, el, events[name][0], wrapper].concat([].concat(toConsumableArray(args), toConsumableArray(mouseArgs))));

          (_hp$offDOM2 = offDOM).call.apply(_hp$offDOM2, [null, el, events[name][1], wrapper].concat([].concat(toConsumableArray(args), toConsumableArray(mouseArgs))));

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
   * draggable-helper v5.0.5
   * (c) phphe <phphe@outlook.com> (https://github.com/phphe)
   * Homepage: undefined
   * Released under the MIT License.
   */

  function _createForOfIteratorHelper$2(o) {
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (Array.isArray(o) || (o = _unsupportedIterableToArray$3(o))) {
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

  function _unsupportedIterableToArray$3(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray$3(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen);
  }

  function _arrayLikeToArray$3(arr, len) {
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

        var _iterator = _createForOfIteratorHelper$2(toArrayIfNot(opt.triggerClassName)),
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


    DragEventService.on(listenerElement, 'start', onMousedownOrTouchStart); // define the event listener of mousemove and touchmove
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
      DragEventService.off(listenerElement, 'start', onMousedownOrTouchStart);
      DragEventService.on(document, 'move', onMousemoveOrTouchMove, {
        touchArgs: [{
          passive: false
        }]
      });
      DragEventService.on(window, 'end', onMouseupOrTouchEnd);
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

    var _iterator2 = _createForOfIteratorHelper$2(findInElements),
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

    var _iterator3 = _createForOfIteratorHelper$2(findInElements),
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

  function doDraggableDecision (_ref) {
    var conditions = _ref.conditions,
        doAction = _ref.doAction;

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
    } // decision end =================================

  }

  function _createForOfIteratorHelper$3(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$4(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray$4(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$4(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$4(o, minLen); }

  function _arrayLikeToArray$4(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function makeTreeDraggable(treeEl) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    options = _objectSpread$2(_objectSpread$2({}, options), {}, {
      treeEl: treeEl
    });

    var _draggableHelper = index(treeEl, {
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
      getMovedOrClonedElement: function getMovedOrClonedElement(directTriggerElement, store) {
        // find closest branch from parents
        var el = findParent(store.triggerElement, function (el) {
          return hasClass(el, options.branchClass);
        }, {
          withSelf: true
        });
        return el;
      },
      beforeFirstMove: function beforeFirstMove(store, dhOptions) {
        store.startTreeEl = treeEl;
        store.dragBranchEl = store.movedElement;
        store.startPath = options.getPathByBranchEl(store.movedOrClonedElement);

        if (options.beforeFirstMove && options.beforeFirstMove(store, dhOptions) === false) {
          return false;
        }
      },
      beforeMove: function beforeMove(store, dhOptions) {
        var updatePlaceholderIndent = function updatePlaceholderIndent() {
          // set indent of placeholder
          var placeholderPath = options.getPathByBranchEl(store.placeholder);
          var placeholderNodeBack = store.placeholder.querySelector(".".concat(options.nodeBackClass));
          placeholderNodeBack.style[!options.rtl ? 'paddingLeft' : 'paddingRight'] = (placeholderPath.length - 1) * options.indent + 'px'; // remove tempChildren if empty

          if (store.tempChildren.children.length === 0) {
            removeEl(store.tempChildren);
          }
        }; // first move
        // 第一次移动


        if (store.movedCount === 0) {
          // create placeholder
          // 创建占位元素
          var placeholder = createElementFromHTML("\n          <div id=\"".concat(options.placeholderId, "\" class=\"").concat(options.branchClass, " ").concat(options.placeholderClass, "\">\n            <div class=\"").concat(options.nodeBackClass, " ").concat(options.placeholderNodeBackClass, "\">\n              <div class=\"").concat(options.nodeClass, " ").concat(options.placeholderNodeClass, "\">\n              </div>\n            </div>\n          </div>\n        "));
          insertAfter(placeholder, store.movedOrClonedElement);
          store.placeholder = placeholder;
          options.afterPlaceholderCreated(store); // create a tree children el to use when can't get childrenEl

          var tempChildren = document.createElement('DIV');
          addClass(tempChildren, options.childrenClass);
          store.tempChildren = tempChildren; // update placeholder indent. update moved element style

          updatePlaceholderIndent();
          store.updateMovedElementStyle(); // skip first move
          // 跳过第一次移动

          return;
        } // 


        store.updateMovedElementStyle(); // 

        store.oneMoveStore = {}; // life cycle: one move

        var movingEl = store.movedElement; // branch
        // find closest branch and hovering tree

        var _tree;

        var movingNode = movingEl.querySelector(".".concat(options.nodeClass)); // movingNodeOf and movingNodeRect are not always real. when RTL, there 'x' is top right. when draggingNodePositionMode is mouse, there x and y are mouse position. So don't calc them with their width or height.
        // movingNodeOf 和 movingNodeRect并非一直如字面意义是movingNode真实坐标. RTL时, x坐标是右上角. draggingNodePositionMode是mouse时, x和y是鼠标坐标.

        var movingNodeOf = getOffset(movingNode);
        var movingNodeRect = getBoundingClientRect(movingNode);

        if (options.draggingNodePositionMode === 'mouse') {
          // use mouse position as dragging node position
          var moveEvent = store.moveEvent;
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
        } // find tree with elementsFromPoint


        var found;
        var firstElement;

        var _iterator = _createForOfIteratorHelper$3(elementsFromPoint(movingNodeRect.x, movingNodeRect.y)),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var itemEl = _step.value;

            if (!firstElement) {
              firstElement = itemEl;
            }

            if (hasClass(itemEl, options.treeClass)) {
              found = itemEl;
              break;
            }
          } // check if the found element is covered by other elements

        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        if (firstElement !== found && !isDescendantOf(firstElement, found)) {
          found = null;
        }

        _tree = found;

        if (!_tree) {
          // out of tree or tree is covered by other elements
          return;
        } // check if target tree right


        if (options.filterTargetTree(_tree, store, dhOptions) === false) {
          return;
        }

        store.targetTreeEl = _tree; // info ========================================
        // life cycle: one move

        var info = {
          tree: function tree() {
            return _tree;
          },
          root: function root() {
            return info.tree.querySelector(".".concat(options.childrenClass));
          },
          closestNode: function closestNode() {
            var nodes = []; // all visible nodes sort by y

            var walkToGetNodes = function walkToGetNodes(branch) {
              //
              if (branch !== info.tree) {
                var node = branch.querySelector(".".concat(options.nodeClass));

                if (node && !isElementHidden(node)) {
                  nodes.push(node);
                }
              } //


              var childrenEl = branch.querySelector(".".concat(options.childrenClass));

              if (childrenEl) {
                for (var i = 0; i < childrenEl.children.length; i++) {
                  var child = childrenEl.children[i];

                  if (child !== movingEl && hasClass(child, options.branchClass)) {
                    walkToGetNodes(child);
                  }
                }
              }
            };

            walkToGetNodes(info.tree); //

            if (nodes.length === 0) {
              return;
            } //


            var found;
            var t = binarySearch(nodes, function (node) {
              return getOffset(node).y - movingNodeOf.y;
            }, {
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
          closestNodeOffset: function closestNodeOffset() {
            return getOffset(info.closestNode);
          },
          closestBranch: function closestBranch() {
            return findParent(info.closestNode, function (el) {
              return hasClass(el, options.branchClass);
            });
          },
          closestNext: function closestNext() {
            var next = info.closestBranch.nextSibling;

            while (next) {
              if (next !== movingEl && hasClass(next, options.branchClass) && !isElementHidden(next)) {
                return next;
              }

              next = next.nextSibling;
            }
          },
          closestPrev: function closestPrev() {
            var prev = info.closestBranch.previousSibling;

            while (prev) {
              if (prev !== movingEl && hasClass(prev, options.branchClass) && !isElementHidden(prev)) {
                return prev;
              }

              prev = prev.previousSibling;
            }
          },
          aboveBranch: function aboveBranch() {
            // find above from branch to root
            // closestBranch must be placeholder
            if (info.closestBranch !== store.placeholder) {
              return;
            }

            if (conditions['closest has next']) {
              return;
            } // find placeholder prev or parent


            var cur = info.closestBranch;
            var prev = cur.previousSibling;
            var found;

            while (prev) {
              if (prev !== movingEl && hasClass(prev, options.branchClass) && !isElementHidden(prev)) {
                cur = prev;
                found = true;
                break;
              }

              prev = prev.previousSibling;
            }

            if (!found) {
              cur = findParent(cur, function (el) {
                return hasClass(el, options.branchClass);
              });
            } //


            while (cur) {
              var curNode = cur.querySelector(".".concat(options.nodeClass));

              if (!options.rtl) {
                if (getOffset(curNode).x <= movingNodeOf.x) {
                  break;
                }
              } else {
                if (getOffset(curNode).x + curNode.offsetWidth >= movingNodeOf.x) {
                  break;
                }
              }

              var hasNextBranch = void 0;
              var t = cur.nextSibling;

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

              var parent = findParent(cur, function (el) {
                return hasClass(el, options.branchClass);
              });

              if (!parent) {
                break;
              }

              cur = parent;
            }

            return cur;
          }
        }; // conditions ========================================
        // life cycle: one move

        var conditions = {
          'no closest': function noClosest() {
            return !info.closestNode;
          },
          'closest is top': function closestIsTop() {
            return info.closestBranch === findNodeList(info.root.children, function (el) {
              return el !== movingEl && !isElementHidden(el);
            });
          },
          'closest is top excluding placeholder': function closestIsTopExcludingPlaceholder() {
            return info.closestBranch === findNodeList(info.root.children, function (el) {
              return el !== movingEl && el !== store.placeholder && !isElementHidden(el);
            });
          },
          'on closest middle': function onClosestMiddle() {
            return movingNodeOf.y < info.closestNodeOffset.y + info.closestNode.offsetHeight / 2;
          },
          'at closest indent right': function atClosestIndentRight() {
            return movingNodeOf.x > info.closestNodeOffset.x + options.indent;
          },
          'at closest left': function atClosestLeft() {
            return movingNodeOf.x < info.closestNodeOffset.x;
          },
          'closest is placeholder': function closestIsPlaceholder() {
            return info.closestBranch === store.placeholder;
          },
          'no aboveBranch': function noAboveBranch() {
            return !info.aboveBranch;
          },
          'closest has next': function closestHasNext() {
            return info.closestNext;
          },
          'closest has prev': function closestHasPrev() {
            return info.closestPrev;
          },
          'closest has children excluding placeholder movingEl': function closestHasChildrenExcludingPlaceholderMovingEl() {
            var childrenEl = info.closestBranch.querySelector(".".concat(options.childrenClass));

            if (childrenEl) {
              return findNodeList(childrenEl.children, function (el) {
                return el !== movingEl && el !== store.placeholder && !isElementHidden(el);
              });
            }
          }
        }; // fix for rtl

        if (options.rtl) {
          Object.assign(conditions, {
            'at closest indent right': function atClosestIndentRight() {
              return movingNodeOf.x < info.closestNodeOffset.x + info.closestNode.offsetWidth - options.indent;
            },
            // at indent left
            'at closest left': function atClosestLeft() {
              return movingNodeOf.x > info.closestNodeOffset.x + info.closestNode.offsetWidth;
            } // at right

          });
        } // convert conditions result to Boolean


        Object.keys(conditions).forEach(function (key) {
          var old = conditions[key];

          conditions[key] = function () {
            return Boolean(old.call(this));
          };
        }); //

        attachCache(info, info);
        attachCache(conditions, conditions);
        store.oneMoveStore.info = info;
        store.oneMoveStore.conditions = conditions; // actions start ========================================

        var doAction = function doAction(name) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          if (!store._doActionQueue) {
            store._doActionQueue = Promise.resolve();
          }

          var queue = store._doActionQueue;
          store._doActionQueue = queue.then( /*#__PURE__*/asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
            var actionRecords, action, r;
            return regenerator.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    // record tried actions in one move
                    if (!store.oneMoveStore.actionRecords) {
                      store.oneMoveStore.actionRecords = [];
                    }

                    actionRecords = store.oneMoveStore.actionRecords; //

                    action = actions[name];
                    r = action.apply(void 0, args);
                    actionRecords.push(name);
                    _context.next = 7;
                    return r;

                  case 7:
                    updatePlaceholderIndent();

                  case 8:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          })));
        };

        var actions = {
          'nothing': function nothing() {
            return asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2() {
              return regenerator.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2);
            }))();
          },
          // do nothing
          'append to root': function appendToRoot() {
            return asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3() {
              return regenerator.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      // no closest branch, just append to root
                      if (options.isTargetTreeRootDroppable(store)) {
                        appendTo(store.placeholder, info.root);
                      }

                    case 1:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3);
            }))();
          },
          'insert before': function insertBefore$1() {
            return asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4() {
              return regenerator.wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      if (!options.isNodeParentDroppable(info.closestBranch, store.targetTreeEl)) {
                        _context4.next = 4;
                        break;
                      }

                      insertBefore(store.placeholder, info.closestBranch);
                      _context4.next = 5;
                      break;

                    case 4:
                      return _context4.abrupt("return", secondCase(getParentBranchByEl(info.closestBranch)));

                    case 5:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, _callee4);
            }))();
          },
          'insert after': function insertAfter$1() {
            var _arguments = arguments;
            return asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee5() {
              var branch, moved, isFirstTriedAction;
              return regenerator.wrap(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      branch = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : info.closestBranch;

                      if (!options.isNodeParentDroppable(branch, store.targetTreeEl)) {
                        _context5.next = 5;
                        break;
                      }

                      insertAfter(store.placeholder, branch);
                      _context5.next = 11;
                      break;

                    case 5:
                      _context5.next = 7;
                      return secondCase(getParentBranchByEl(branch));

                    case 7:
                      moved = _context5.sent;
                      isFirstTriedAction = !store.oneMoveStore.actionRecords || store.oneMoveStore.actionRecords.length === 1;

                      if (!(!moved && isFirstTriedAction)) {
                        _context5.next = 11;
                        break;
                      }

                      return _context5.abrupt("return", thirdCase(branch));

                    case 11:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, _callee5);
            }))();
          },
          prepend: function prepend() {
            return asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee6() {
              return regenerator.wrap(function _callee6$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      if (!(info.closestBranch === store.placeholder)) {
                        _context6.next = 2;
                        break;
                      }

                      return _context6.abrupt("return");

                    case 2:
                      if (!(options.ifNodeFolded(info.closestBranch, store) && !options.unfoldWhenDragover)) {
                        _context6.next = 6;
                        break;
                      }

                      return _context6.abrupt("return", doAction('insert after', info.closestBranch));

                    case 6:
                      if (!options.isNodeDroppable(info.closestBranch, store.targetTreeEl)) {
                        _context6.next = 11;
                        break;
                      }

                      _context6.next = 9;
                      return tryUnfoldAndPrepend(info.closestBranch);

                    case 9:
                      _context6.next = 12;
                      break;

                    case 11:
                      return _context6.abrupt("return", secondCase(info.closestBranch));

                    case 12:
                    case "end":
                      return _context6.stop();
                  }
                }
              }, _callee6);
            }))();
          },
          'after above': function afterAbove() {
            return asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee7() {
              return regenerator.wrap(function _callee7$(_context7) {
                while (1) {
                  switch (_context7.prev = _context7.next) {
                    case 0:
                      if (!options.isNodeParentDroppable(info.aboveBranch, store.targetTreeEl)) {
                        _context7.next = 4;
                        break;
                      }

                      insertAfter(store.placeholder, info.aboveBranch);
                      _context7.next = 5;
                      break;

                    case 4:
                      return _context7.abrupt("return", secondCase(getParentBranchByEl(info.aboveBranch)));

                    case 5:
                    case "end":
                      return _context7.stop();
                  }
                }
              }, _callee7);
            }))();
          },
          'append to prev': function appendToPrev() {
            return asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee8() {
              var childrenEl;
              return regenerator.wrap(function _callee8$(_context8) {
                while (1) {
                  switch (_context8.prev = _context8.next) {
                    case 0:
                      if (!(info.closestPrev === store.placeholder)) {
                        _context8.next = 2;
                        break;
                      }

                      return _context8.abrupt("return");

                    case 2:
                      if (!options.ifNodeFolded(info.closestPrev, store)) {
                        _context8.next = 6;
                        break;
                      }

                      return _context8.abrupt("return", doAction('insert after', info.closestPrev));

                    case 6:
                      if (!options.isNodeDroppable(info.closestPrev, store.targetTreeEl)) {
                        _context8.next = 13;
                        break;
                      }

                      _context8.next = 9;
                      return unfoldAndGetChildrenEl(info.closestPrev);

                    case 9:
                      childrenEl = _context8.sent;
                      appendTo(store.placeholder, childrenEl);
                      _context8.next = 14;
                      break;

                    case 13:
                      return _context8.abrupt("return", secondCase(info.closestPrev));

                    case 14:
                    case "end":
                      return _context8.stop();
                  }
                }
              }, _callee8);
            }))();
          }
        }; // second case for actions, when target position not droppable
        // return true if moved

        var secondCase = /*#__PURE__*/function () {
          var _ref2 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee9(branchEl) {
            var targetEl;
            return regenerator.wrap(function _callee9$(_context9) {
              while (1) {
                switch (_context9.prev = _context9.next) {
                  case 0:
                    if (!branchEl) {
                      _context9.next = 5;
                      break;
                    }

                    targetEl = options._findClosestDroppablePosition(branchEl, store.targetTreeEl);

                    if (!targetEl) {
                      _context9.next = 5;
                      break;
                    }

                    insertAfter(store.placeholder, targetEl);
                    return _context9.abrupt("return", true);

                  case 5:
                  case "end":
                    return _context9.stop();
                }
              }
            }, _callee9);
          }));

          return function secondCase(_x) {
            return _ref2.apply(this, arguments);
          };
        }(); // when action is after, first case and second case invalid, try prepend
        // 当操作是'after', 第一种第二种情况无效时, 尝试prepend


        var thirdCase = /*#__PURE__*/function () {
          var _ref3 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee10(branchEl) {
            return regenerator.wrap(function _callee10$(_context10) {
              while (1) {
                switch (_context10.prev = _context10.next) {
                  case 0:
                    if (!(!options.ifNodeFolded(branchEl, store) && options.isNodeDroppable(branchEl, store.targetTreeEl))) {
                      _context10.next = 3;
                      break;
                    }

                    _context10.next = 3;
                    return tryUnfoldAndPrepend(branchEl);

                  case 3:
                  case "end":
                    return _context10.stop();
                }
              }
            }, _callee10);
          }));

          return function thirdCase(_x2) {
            return _ref3.apply(this, arguments);
          };
        }();

        var unfoldAndGetChildrenEl = /*#__PURE__*/function () {
          var _ref4 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee11(branch) {
            var childrenEl;
            return regenerator.wrap(function _callee11$(_context11) {
              while (1) {
                switch (_context11.prev = _context11.next) {
                  case 0:
                    _context11.next = 2;
                    return options.unfoldTargetNodeByEl(branch, store);

                  case 2:
                    childrenEl = branch.querySelector(".".concat(options.childrenClass));

                    if (!childrenEl) {
                      childrenEl = store.tempChildren;
                      appendTo(childrenEl, branch);
                    }

                    return _context11.abrupt("return", childrenEl);

                  case 5:
                  case "end":
                    return _context11.stop();
                }
              }
            }, _callee11);
          }));

          return function unfoldAndGetChildrenEl(_x3) {
            return _ref4.apply(this, arguments);
          };
        }();

        var tryUnfoldAndPrepend = /*#__PURE__*/function () {
          var _ref5 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee13(branchEl) {
            var func, oneMoveStore;
            return regenerator.wrap(function _callee13$(_context13) {
              while (1) {
                switch (_context13.prev = _context13.next) {
                  case 0:
                    func = /*#__PURE__*/function () {
                      var _ref6 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee12() {
                        var childrenEl;
                        return regenerator.wrap(function _callee12$(_context12) {
                          while (1) {
                            switch (_context12.prev = _context12.next) {
                              case 0:
                                _context12.next = 2;
                                return unfoldAndGetChildrenEl(branchEl);

                              case 2:
                                childrenEl = _context12.sent;
                                prependTo(store.placeholder, childrenEl);

                              case 4:
                              case "end":
                                return _context12.stop();
                            }
                          }
                        }, _callee12);
                      }));

                      return function func() {
                        return _ref6.apply(this, arguments);
                      };
                    }();

                    if (!options.ifNodeFolded(branchEl, store)) {
                      _context13.next = 6;
                      break;
                    }

                    // delay if node folded
                    oneMoveStore = store.oneMoveStore;
                    setTimeout(function () {
                      // check if expired
                      if (oneMoveStore === store.oneMoveStore) {
                        func();
                      }
                    }, options.unfoldWhenDragoverDelay);
                    _context13.next = 8;
                    break;

                  case 6:
                    _context13.next = 8;
                    return func();

                  case 8:
                  case "end":
                    return _context13.stop();
                }
              }
            }, _callee13);
          }));

          return function tryUnfoldAndPrepend(_x4) {
            return _ref5.apply(this, arguments);
          };
        }(); // actions end ========================================


        doDraggableDecision({
          options: options,
          event: store.moveEvent,
          store: store,
          opt: dhOptions,
          info: info,
          conditions: conditions,
          actions: actions,
          doAction: doAction
        });
      },
      afterMove: function afterMove(store, dhOptions) {
        options.afterMove && options.afterMove(store, dhOptions);
      },
      beforeDrop: function () {
        var _beforeDrop = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee14(store, dhOptions) {
          var endEvent, movingEl, placeholder, tempChildren, movedCount, targetTreeEl, startTreeEl, maskTree, maskTree2, pathChanged, isPathChanged;
          return regenerator.wrap(function _callee14$(_context14) {
            while (1) {
              switch (_context14.prev = _context14.next) {
                case 0:
                  isPathChanged = function _isPathChanged() {
                    var startTree = store.startTree,
                        targetTree = store.targetTree,
                        startPath = store.startPath,
                        targetPath = store.targetPath;
                    return startTree !== targetTree || startPath.toString() !== targetPath.toString();
                  };

                  endEvent = store.endEvent;
                  movingEl = store.movedElement; // branch

                  placeholder = store.placeholder, tempChildren = store.tempChildren, movedCount = store.movedCount, targetTreeEl = store.targetTreeEl, startTreeEl = store.startTreeEl; // use mask tree to avoid flick caused by DOM update in short time
                  // 复制 targetTreeEl 作为遮罩, 避免短时间内更新DOM引起的闪烁

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
                    } //


                    store.targetPath = options.getPathByBranchEl(placeholder);
                    pathChanged = isPathChanged();
                    store.targetPathNotEqualToStartPath = pathChanged;
                    store.pathChangePrevented = false;

                    if (options.beforeDrop && options.beforeDrop(pathChanged, store, dhOptions) === false) {
                      pathChanged = false;
                      store.pathChangePrevented = false;
                    }

                    store.pathChanged = pathChanged;
                  } // destroy placeholder and tempChildren


                  removeEl(placeholder);

                  if (tempChildren) {
                    removeEl(tempChildren);
                  }

                  store.updateMovedElementStyle(); // 

                  _context14.next = 10;
                  return options.afterDrop(store, dhOptions);

                case 10:
                  if (!maskTree) {
                    _context14.next = 16;
                    break;
                  }

                  _context14.next = 13;
                  return waitTime(30);

                case 13:
                  removeEl(maskTree);
                  targetTreeEl.style.display = 'block';

                  if (maskTree2) {
                    removeEl(maskTree2);
                    startTreeEl.style.display = 'block';
                  }

                case 16:
                case "end":
                  return _context14.stop();
              }
            }
          }, _callee14);
        }));

        function beforeDrop(_x5, _x6) {
          return _beforeDrop.apply(this, arguments);
        }

        return beforeDrop;
      }()
    }),
        destroy = _draggableHelper.destroy,
        draggableHelperOptions = _draggableHelper.options;

    return {
      destroy: destroy,
      options: options,
      optionsUpdated: optionsUpdated
    };

    function getParentBranchByEl(el) {
      return findParent(el, function (el) {
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

  function _createForOfIteratorHelper$4(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$5(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray$5(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$5(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$5(o, minLen); }

  function _arrayLikeToArray$5(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
  var treesStore = {};
  var script = {
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
    // components: {},
    data: function data() {
      return {
        treesStore: treesStore
      };
    },
    // computed: {},
    // watch: {},
    methods: {
      _Draggable_unfoldTargetNodeByEl: function _Draggable_unfoldTargetNodeByEl(branchEl, store) {
        var targetTree = store.targetTree;
        var path = targetTree.getPathByBranchEl(branchEl);
        var node = targetTree.getNodeByPath(path);
        targetTree.unfold && targetTree.unfold(node, path);
        return new Promise(function (resolve, reject) {
          targetTree.$nextTick(function () {
            resolve();
          });
        });
      },
      isNodeDraggable: function isNodeDraggable(node, path) {
        var store = this.treesStore.store;
        var allNodes = this.getAllNodesByPath(path);
        allNodes.unshift(this.rootNode);

        var _iterator = _createForOfIteratorHelper$4(iterateAll(allNodes, {
          reverse: true
        })),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _step$value = _step.value,
                _node = _step$value.value,
                index = _step$value.index;
            var currentPath = path.slice(0, index + 1);
            var draggableOpt = _node.$draggable !== undefined ? _node.$draggable : this.eachDraggable;
            var draggable = resolveValueOrGettter(draggableOpt, [currentPath, this, store]);

            if (draggable === undefined) {
              continue;
            } else {
              return draggable;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        return true;
      },
      isNodeDroppable: function isNodeDroppable(node, path) {
        var store = this.treesStore.store;
        var allNodes = this.getAllNodesByPath(path);
        allNodes.unshift(this.rootNode);
        var droppableFinal, resolved;

        var _iterator2 = _createForOfIteratorHelper$4(iterateAll(allNodes, {
          reverse: true
        })),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _step2$value = _step2.value,
                _node2 = _step2$value.value,
                index = _step2$value.index;
            var currentPath = path.slice(0, index + 1);
            var droppableOpt = _node2.$droppable !== undefined ? _node2.$droppable : this.eachDroppable;
            var droppable = resolveValueOrGettter(droppableOpt, [currentPath, this, store]);

            if (droppable === undefined) {
              continue;
            } else {
              droppableFinal = droppable;
              resolved = true;
              break;
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        if (!resolved) {
          droppableFinal = true;
        }

        if (this._internal_hook_isNodeDroppable) {
          return this._internal_hook_isNodeDroppable({
            droppableFinal: droppableFinal,
            node: node,
            path: path,
            store: store
          });
        }

        return droppableFinal;
      },
      // override
      getPathByBranchEl: function getPathByBranchEl(branchEl) {
        var getAttrPath = function getAttrPath(el) {
          var pathStr = el.getAttribute('data-tree-node-path');

          if (pathStr) {
            return pathStr.split(',').map(function (v) {
              return parseInt(v);
            });
          }
        };

        var path = getAttrPath(branchEl);

        if (path) {
          return path;
        } // placeholder path


        var parentPath;
        findParent(branchEl, function (el) {
          if (hasClass(el, 'tree-root')) {
            parentPath = [];
            return true;
          }

          if (hasClass(el, 'tree-branch')) {
            parentPath = getAttrPath(el);
            return true;
          }
        });
        var index = 0;

        var _iterator3 = _createForOfIteratorHelper$4(iterateAll(branchEl.parentElement.children)),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var _step3$value = _step3.value,
                el = _step3$value.value,
                index2 = _step3$value.index;

            if (hasClass(el, 'tree-branch') || hasClass(el, 'tree-placeholder')) {
              if (el === branchEl) {
                break;
              }

              index++;
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }

        return [].concat(toConsumableArray(parentPath), [index]);
      }
    },
    // created() {},
    mounted: function mounted() {
      var _this = this;

      var options = this._draggableOptions = {
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
        placeholderId: "he_tree_drag_placeholder",
        ifNodeFolded: function ifNodeFolded(branchEl, store) {
          var targetTree = store.targetTree;
          var node = targetTree.getNodeByBranchEl(branchEl);
          return node.$folded;
        },
        isTargetTreeRootDroppable: function isTargetTreeRootDroppable(store) {
          var droppable = resolveValueOrGettter(store.targetTree.rootNode.$droppable, [store.targetTree, store]);

          if (droppable !== undefined) {
            return droppable;
          }

          return true;
        },
        unfoldTargetNodeByEl: function unfoldTargetNodeByEl() {
          return _this._Draggable_unfoldTargetNodeByEl.apply(_this, arguments);
        },
        isNodeParentDroppable: function isNodeParentDroppable(branchEl, treeEl) {
          var tree = _this.getTreeVmByTreeEl(treeEl);

          var path = tree.getPathByBranchEl(branchEl);
          var parentPath = arrayWithoutEnd(path, 1);
          var parent = tree.getNodeByPath(parentPath);
          return tree.isNodeDroppable(parent, parentPath);
        },
        isNodeDroppable: function isNodeDroppable(branchEl, treeEl) {
          var tree = _this.getTreeVmByTreeEl(treeEl);

          var path = tree.getPathByBranchEl(branchEl);
          var node = tree.getNodeByPath(path);
          return tree.isNodeDroppable(node, path);
        },
        _findClosestDroppablePosition: function _findClosestDroppablePosition(branchEl, treeEl) {
          var tree = _this.getTreeVmByTreeEl(treeEl);

          var path = tree.getPathByBranchEl(branchEl);
          var findPath = arrayWithoutEnd(path, 1);
          var cur = path;

          var _iterator4 = _createForOfIteratorHelper$4(tree.iteratePath(findPath, {
            reverse: true
          })),
              _step4;

          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var _step4$value = _step4.value,
                  node = _step4$value.node,
                  _path = _step4$value.path;

              if (tree.isNodeDroppable(node, _path)) {
                return tree.getBranchElByPath(cur);
              } else {
                cur = _path;
              }
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }

          if (tree.isNodeDroppable(_this.rootNode, [])) {
            return tree.getBranchElByPath(cur);
          }
        },
        afterPlaceholderCreated: function afterPlaceholderCreated(store) {
          store.startTree.$emit('afterPlaceholderCreated', store);
        },
        getPathByBranchEl: function getPathByBranchEl(branchEl) {
          return _this.getPathByBranchEl(branchEl);
        },
        beforeFirstMove: function beforeFirstMove(store) {
          _this.treesStore.store = store;
          store.startTree = _this.getTreeVmByTreeEl(store.startTreeEl);
          var draggable = resolveValueOrGettter(store.startTree.draggable, [store.startTree, store]);

          if (!draggable) {
            return false;
          }

          var startTree = store.startTree,
              dragBranchEl = store.dragBranchEl,
              startPath = store.startPath;
          store.dragNode = startTree.getNodeByPath(startPath);

          if (_this.cloneWhenDrag) {
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

          _this.$root.$emit('he-tree-drag', store);
        },
        filterTargetTree: function filterTargetTree(targetTreeEl, store) {
          var targetTree = _this.getTreeVmByTreeEl(targetTreeEl);

          var startTree = store.startTree;

          if (startTree !== targetTree) {
            if (_this._internal_hook_filterTargetTree) {
              if (_this._internal_hook_filterTargetTree(targetTree, store) === false) {
                return false;
              }
            } else {
              return false;
            }
          }

          var targetTreeDroppable = resolveValueOrGettter(targetTree.droppable, [targetTree, store]);

          if (!targetTreeDroppable) {
            return false;
          }

          store.targetTree = targetTree;

          if (!resolveValueOrGettter(store.startTree === store.targetTree) && resolveValueOrGettter(_this._Draggable_unfoldTargetNode, [false, _this.treeData]) !== _this.rootNode.children) {
            return false;
          }
        },
        afterMove: function afterMove(store) {
          store.startTree.$emit('after-move', store);
        },
        beforeDrop: function beforeDrop(pathChanged, store) {
          var targetTree = store.targetTree;

          if (targetTree.hasHook('ondragend') && targetTree.executeHook('ondragend', [targetTree, store]) === false) {
            return false;
          }

          _this.$root.$emit('he-tree-before-drop', store);
        },
        afterDrop: function afterDrop(store, t) {
          if (store.pathChanged) {
            var startTree = store.startTree,
                targetTree = store.targetTree,
                startPath = store.startPath,
                targetPath = store.targetPath,
                dragNode = store.dragNode;

            if (_this.cloneWhenDrag !== true) {
              // remove from start position
              var startParentPath = arrayWithoutEnd(startPath, 1);
              var startParent = startTree.getNodeByPath(startParentPath);
              var startSiblings = startParentPath.length === 0 ? startTree.treeData : startParent.children;
              var startIndex = arrayLast(startPath);
              startSiblings.splice(startIndex, 1); // update targetPath

              if (startTree === targetTree) {
                if (startPath.length <= targetPath.length) {
                  var lenNoEnd = startPath.length - 1;
                  var same = true;

                  for (var i = 0; i < lenNoEnd; i++) {
                    var s = startPath[i];
                    var _t = targetPath[i];

                    if (s !== _t) {
                      same = false;
                      break;
                    }
                  }

                  if (same) {
                    var endIndex = startPath.length - 1;

                    if (startPath[endIndex] < targetPath[endIndex]) {
                      targetPath[endIndex] -= 1;
                    }
                  }
                }
              }
            } // insert to target position


            var targetParentPath = arrayWithoutEnd(targetPath, 1);
            var targetParent = targetTree.getNodeByPath(targetParentPath);
            var targetSiblings;

            if (targetParentPath.length === 0) {
              targetSiblings = targetTree.treeData;
            } else {
              if (!targetParent.children) {
                _this.$set(targetParent, 'children', []);
              }

              targetSiblings = targetParent.children;
            }

            var targetIndex = arrayLast(targetPath);
            targetSiblings.splice(targetIndex, 0, dragNode); // emit event

            startTree.$emit('input', startTree.treeData);
            startTree.$emit('change', store);
            targetTree.$emit('drop', store);

            _this.$root.$emit('he-tree-drop', store);

            if (targetTree !== startTree) {
              targetTree.$emit('input', targetTree.treeData);
              targetTree.$emit('change', store);
            }

            return new Promise(function (resolve, reject) {
              targetTree.$nextTick(function () {
                resolve();
              });
            });
          }
        }
      };

      var _makeTreeDraggable_obj = this._makeTreeDraggable_obj = makeTreeDraggable(this.$el, options); // watch props and update options


      ['indent', 'triggerClass', 'triggerBySelf', 'unfoldWhenDragover', 'unfoldWhenDragoverDelay', 'draggingNodePositionMode', 'cloneWhenDrag', 'edgeScroll', 'edgeScrollTriggerMargin', 'edgeScrollSpeed', 'edgeScrollTriggerMode', 'edgeScrollSpecifiedContainerY', 'edgeScrollSpecifiedContainerY', 'rtl', 'preventTextSelection'].forEach(function (name) {
        _this.$watch(name, function (value) {
          _makeTreeDraggable_obj.options[name] = value;

          _makeTreeDraggable_obj.optionsUpdated();
        });
      });
    }
  };

  /* script */
  var __vue_script__$1 = script;
  /* template */

  /* style */

  var __vue_inject_styles__$1 = undefined;
  /* scoped */

  var __vue_scope_id__$1 = undefined;
  /* module identifier */

  var __vue_module_identifier__$1 = undefined;
  /* functional template */

  var __vue_is_functional_template__$1 = undefined;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$1 = /*#__PURE__*/normalizeComponent({}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

  exports.Check = check;
  exports.Draggable = __vue_component__$1;
  exports.Fold = fold;
  exports.Tree = __vue_component__;
  exports.cloneTreeData = cloneTreeData;
  exports.foldAll = foldAll;
  exports.getPureTreeData = getPureTreeData;
  exports.unfoldAll = unfoldAll;
  exports.walkTreeData = walkTreeData$1;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
