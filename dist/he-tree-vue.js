/*!
 * he-tree-vue v1.2.3
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

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    }
  }

  var arrayWithoutHoles = _arrayWithoutHoles;

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  var iterableToArray = _iterableToArray;

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var nonIterableSpread = _nonIterableSpread;

  function _toConsumableArray(arr) {
    return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
  }

  var toConsumableArray = _toConsumableArray;

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

    function AsyncIterator(generator) {
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
            return Promise.resolve(value.__await).then(function(value) {
              invoke("next", value, resolve, reject);
            }, function(err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return Promise.resolve(value).then(function(unwrapped) {
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
          return new Promise(function(resolve, reject) {
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
    exports.async = function(innerFn, outerFn, self, tryLocsList) {
      var iter = new AsyncIterator(
        wrap(innerFn, outerFn, self, tryLocsList)
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
   * helper-js v1.4.36
   * (c) phphe <phphe@outlook.com> (https://github.com/phphe)
   * Homepage: undefined
   * Released under the MIT License.
   */

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  var _marked =
  /*#__PURE__*/
  regenerator.mark(iterateAll);

  function _createForOfIteratorHelper(o) {
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) {
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

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } // local store

  function isArray(v) {
    return Object.prototype.toString.call(v) === '[object Array]';
  }

  function isObject(v) {
    return Object.prototype.toString.call(v) === '[object Object]';
  }

  function isFunction(v) {
    return typeof v === 'function';
  }


  function numRand(min, max) {
    if (arguments.length === 1) {
      max = min;
      min = 0;
    }

    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function strRand() {
    var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var r = '';
    var seeds = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < len; i++) {
      r += seeds[numRand(seeds.length - 1)];
    }

    return prefix + r;
  }


  function arrayRemove(arr, v) {
    var index;
    var count = 0;

    while ((index = arr.indexOf(v)) > -1) {
      arr.splice(index, 1);
      count++;
    }

    return count;
  }

  function arrayLast(arr) {
    return arr[arr.length - 1];
  }

  function arrayWithoutEnd(arr, len) {
    return arr.slice(0, arr.length - len);
  } // object


  function iterateAll(val) {
    var opt,
        i,
        info,
        _i7,
        _Object$keys2,
        key,
        _info,
        _i8,
        _info2,
        keys,
        _i9,
        _keys2,
        _key2,
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

            _i7 = 0, _Object$keys2 = Object.keys(val);

          case 16:
            if (!(_i7 < _Object$keys2.length)) {
              _context.next = 25;
              break;
            }

            key = _Object$keys2[_i7];
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
            _i7++;
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

            _i8 = val.length - 1;

          case 32:
            if (!(_i8 >= 0)) {
              _context.next = 40;
              break;
            }

            _info2 = {
              value: val[_i8],
              index: _i8
            };

            if (!(!opt.exclude || !opt.exclude(_info2))) {
              _context.next = 37;
              break;
            }

            _context.next = 37;
            return _info2;

          case 37:
            _i8--;
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
            _i9 = 0, _keys2 = keys;

          case 46:
            if (!(_i9 < _keys2.length)) {
              _context.next = 55;
              break;
            }

            _key2 = _keys2[_i9];
            _info3 = {
              value: val[_key2],
              key: _key2
            };

            if (!(!opt.exclude || !opt.exclude(_info3))) {
              _context.next = 52;
              break;
            }

            _context.next = 52;
            return _info3;

          case 52:
            _i9++;
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
  } // Deprecated in next version
  // Depth-First-Search
  // TODO change args in next version


  function depthFirstSearch(obj, handler) {
    var childrenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';
    var reverse = arguments.length > 3 ? arguments[3] : undefined;
    var rootChildren = isArray(obj) ? obj : [obj]; //

    var StopException = function StopException() {
      classCallCheck(this, StopException);
    };

    var func = function func(children, parent, parentPath) {
      if (reverse) {
        children = children.slice();
        children.reverse();
      }

      var len = children.length;

      for (var i = 0; i < len; i++) {
        var item = children[i];
        var index = reverse ? len - i - 1 : i;
        var path = parentPath ? [].concat(toConsumableArray(parentPath), [index]) : []; // TODO change args in next version

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
  }

  var walkTreeData = depthFirstSearch;

  var TreeData =
  /*#__PURE__*/
  function () {
    // data = null;
    function TreeData(data) {
      classCallCheck(this, TreeData);

      this.childrenKey = 'children';
      this.data = data;
    }

    createClass(TreeData, [{
      key: "iteratePath",
      value:
      /*#__PURE__*/
      regenerator.mark(function iteratePath(path) {
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
            _path,
            node,
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
                _context2.next = 48;
                break;

              case 29:
                list = toConsumableArray(this.iteratePath(path, _objectSpread({}, opt, {
                  reverse: false
                })));
                list.reverse();
                _iterator5 = _createForOfIteratorHelper(list);
                _context2.prev = 32;

                _iterator5.s();

              case 34:
                if ((_step5 = _iterator5.n()).done) {
                  _context2.next = 40;
                  break;
                }

                _step5$value = _step5.value, _path = _step5$value.path, node = _step5$value.node;
                _context2.next = 38;
                return {
                  path: _path,
                  node: node
                };

              case 38:
                _context2.next = 34;
                break;

              case 40:
                _context2.next = 45;
                break;

              case 42:
                _context2.prev = 42;
                _context2.t1 = _context2["catch"](32);

                _iterator5.e(_context2.t1);

              case 45:
                _context2.prev = 45;

                _iterator5.f();

                return _context2.finish(45);

              case 48:
              case "end":
                return _context2.stop();
            }
          }
        }, iteratePath, this, [[6, 21, 24, 27], [32, 42, 45, 48]]);
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
      value: function walk(handler) {
        var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var childrenKey = this.childrenKey,
            data = this.data; // TODO change args in next version

        return walkTreeData(data, handler, childrenKey, opt.reverse);
      }
    }, {
      key: "clone",
      value: function clone() {
        var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}; // opt.afterNodeCreated(newNode, {oldNode: node, index, parent, path})
        // TODO change args in next version

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

        if (!this.data) {
          this.data = [];
        }

        var data = this.data;
        return isArray(data) ? data : data[childrenKey];
      }
    }]);

    return TreeData;
  }(); // function helper | method helper ============================


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

    var _iterator8 = _createForOfIteratorHelper(iterateAll(funcs, {
      reverse: true
    })),
        _step8;

    try {
      for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
        var func = _step8.value.value;
        var currentNext = next;
        next = wrapFuncWithNext(func, currentNext);
      }
    } catch (err) {
      _iterator8.e(err);
    } finally {
      _iterator8.f();
    }

    return next;

    function wrapFuncWithNext(func, next) {
      return function () {
        for (var _len5 = arguments.length, args = new Array(_len5), _key7 = 0; _key7 < _len5; _key7++) {
          args[_key7] = arguments[_key7];
        }

        return func.apply(void 0, [next].concat(args));
      };
    }
  } // promise
  /* eslint-enable */
  // dom =====================================================
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


  function getOffsetParent(el) {
    var offsetParent = el.offsetParent;

    if (!offsetParent || offsetParent === document.body && getComputedStyle(document.body).position === 'static') {
      offsetParent = document.body.parentElement;
    }

    return offsetParent;
  } // get el current position. like jQuery.position
  // the position is relative to offsetParent viewport left top. it is for set absolute position, absolute position is relative to offsetParent viewport left top.
  // 相对于offsetParent可视区域左上角(el.offsetLeft或top包含父元素的滚动距离, 所以要减去). position一般用于设置绝对定位的情况, 而绝对定位就是以可视区域左上角为原点.


  function getPosition(el) {
    var offsetParent = getOffsetParent(el);
    var ps = {
      x: el.offsetLeft,
      y: el.offsetTop
    };
    var parent = el;

    while (true) {
      parent = parent.parentElement;

      if (parent === offsetParent || !parent) {
        break;
      }

      ps.x -= parent.scrollLeft;
      ps.y -= parent.scrollTop;
    }

    return ps;
  } // get position of a el if its offset is given. like jQuery.offset.

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
  }

  function findParent(el, callback, opt) {
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
    el.setAttribute(name, el[key]);
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
    for (var _len6 = arguments.length, args = new Array(_len6 > 3 ? _len6 - 3 : 0), _key8 = 3; _key8 < _len6; _key8++) {
      args[_key8 - 3] = arguments[_key8];
    }

    if (el.addEventListener) {
      // 所有主流浏览器，除了 IE 8 及更早 IE版本
      el.addEventListener.apply(el, [name, handler].concat(args));
    } else if (el.attachEvent) {
      // IE 8 及更早 IE 版本
      el.attachEvent.apply(el, ["on".concat(name), handler].concat(args));
    }
  }

  function offDOM(el, name, handler) {
    for (var _len7 = arguments.length, args = new Array(_len7 > 3 ? _len7 - 3 : 0), _key9 = 3; _key9 < _len7; _key9++) {
      args[_key9 - 3] = arguments[_key9];
    }

    if (el.removeEventListener) {
      // 所有主流浏览器，除了 IE 8 及更早 IE版本
      el.removeEventListener.apply(el, [name, handler].concat(args));
    } else if (el.detachEvent) {
      // IE 8 及更早 IE 版本
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

  function elementsFromPoint() {
    var func = document.elementsFromPoint || document.msElementsFromPoint || elementsFromPoint;

    for (var _len9 = arguments.length, args = new Array(_len9), _key11 = 0; _key11 < _len9; _key11++) {
      args[_key11] = arguments[_key11];
    }

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
  } // Date ===================================
  // binarySearch 二分查找
  // callback(mid, i) should return mid - your_value


  function binarySearch(arr, callback, start, end, returnNearestIfNoHit) {
    var max = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1000;
    var midNum;
    var mid;

    if (start == null) {
      start = 0;
      end = arr.length - 1;
    }

    var i = 0;
    var r;

    while (start >= 0 && start <= end) {
      if (i >= max) {
        throw Error("binarySearch: loop times is over ".concat(max, ", you can increase the limit."));
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
      bigger: r > 0
    } : null;
  } //

  function waitTime(milliseconds, callback) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        callback && callback();
        resolve();
      }, milliseconds);
    });
  } // overload waitFor(condition, time = 100, maxCount = 1000))

  var Cache =
  /*#__PURE__*/
  function () {
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

    var _loop4 = function _loop4(key) {
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
      _loop4(key);
    }
  }

  /*!
   * vue-functions v2.0.5
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

  function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  var template = function template(h) {
    var _this = this;

    // convert undefined to empty str
    var noUndefined = function noUndefined(str) {
      return str ? str : '';
    }; // tree tpl, to render recursively


    var childrenListTpl = function childrenListTpl(nodes, parent, parentPath) {
      var indentStyle = {
        paddingLeft: parentPath.length * _this.indent + 'px'
      };

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
          nodebackStyle = _objectSpread$1({}, nodebackStyle, {}, node.$nodeBackStyle);
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
      "class": "he-tree ".concat(this.treeClass),
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
        treeId: strRand()
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
      this.treeId = strRand();
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

  var __vue_component__ = normalizeComponent({}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

  function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
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
        opt = _objectSpread$2({
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

  var check = {
    props: {},
    methods: {
      afterCheckChanged: function afterCheckChanged(node, path) {
        var _this = this;

        // update parent
        var nodes = this.getAllNodesByPath(path);
        var reversedParents = nodes.slice(0, nodes.length - 1);
        reversedParents.reverse();
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = reversedParents[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var parent = _step.value;
            this.$set(parent, '$checked', parent.children.every(function (child) {
              return child.$checked;
            }));
          } // update children

        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
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
   * drag-event-service v1.0.4
   * (c) phphe <phphe@outlook.com> (https://github.com/phphe)
   * Homepage: undefined
   * Released under the MIT License.
   */
  var events = {
    start: ['mousedown', 'touchstart'],
    move: ['mousemove', 'touchmove'],
    end: ['mouseup', 'touchend']
  };
  var index = {
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
            y: e.changedTouches[0].pageY
          };
        } else {
          // mouse
          mouse = {
            x: e.pageX,
            y: e.pageY
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
   * draggable-helper v4.0.3
   * (c) phphe <phphe@outlook.com> (https://github.com/phphe)
   * Homepage: undefined
   * Released under the MIT License.
   */

  function ownKeys$3(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread$3(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys$3(Object(source), true).forEach(function (key) {
          defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys$3(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }
  /***
  const destroy = draggableHelper(HTMLElement dragHandlerEl, Object opt = {})
  opt.beforeDrag(startEvent, moveEvent, store, opt) return false to prevent drag
  opt.drag(startEvent, moveEvent, store, opt) return false to prevent drag
  [Object] opt.style || opt.getStyle(store, opt) set style of moving el style
  [Boolean] opt.clone
  opt.draggingClass, default dragging
  opt.moving(e, store, opt) return false can prevent moving
  opt.drop(e, store, opt)
  opt.getEl(dragHandlerEl, store, opt) get the el that will be moved. default is dragHandlerEl
  opt.minTranslate default 10, unit px
  [Boolean] opt.triggerBySelf: false if trigger only by self, can not be triggered by children
  [Boolean] opt.restoreDOMManuallyOndrop the changed DOM will be restored automatically on drop. This disable it and pass restoreDOM function into store.

  add other prop into opt, you can get opt in callback
  store{
    el
    originalEl
    initialMouse
    initialPosition
    mouse
    move
    movedCount // start from 0
    startEvent
    endEvent
    restoreDOM // function if opt.restoreDOMManuallyOndrop else null
  }
  e.g.
  draggable(this.$el, {
    vm: this,
    data: this.data,
    drag: (e, store, opt) => {
      dplh.style.height = store.el.querySelector('.TreeNodeSelf').offsetHeight + 'px'
      th.insertAfter(dplh, opt.data)
    },
    moving: (e, store, opt) => {
      hp.arrayRemove(dplh.parent.children, dplh)
    },
    drop: (e, store, opt) => {
      hp.arrayRemove(dplh.parent.children, dplh)
    },
  })
  ***/


  var IGNORE_TRIGGERS = ['INPUT', 'TEXTAREA', 'SELECT', 'OPTGROUP', 'OPTION'];
  var UNDRAGGABLE_CLASS = 'undraggable';

  function index$1(dragHandlerEl) {
    var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    opt = _objectSpread$3({
      minTranslate: 10,
      draggingClass: 'dragging'
    }, opt);
    var store = getPureStore();

    var destroy = function destroy() {
      index.off(dragHandlerEl, 'start', dragHandlerEl._draggbleEventHandler);
      delete dragHandlerEl._draggbleEventHandler;
    };

    if (dragHandlerEl._draggbleEventHandler) {
      destroy();
    }

    dragHandlerEl._draggbleEventHandler = start;
    index.on(dragHandlerEl, 'start', start);
    return {
      destroy: destroy,
      options: opt
    };

    function start(e, mouse) {
      // detect draggable =================================
      if (opt.triggerBySelf && e.target !== dragHandlerEl) {
        return;
      }

      if (IGNORE_TRIGGERS.includes(e.target.tagName)) {
        return;
      }

      if (hasClass(e.target, UNDRAGGABLE_CLASS)) {
        return;
      }

      var isParentUndraggable = findParent(e.target, function (el) {
        if (hasClass(el, UNDRAGGABLE_CLASS)) {
          return true;
        }

        if (el === dragHandlerEl) {
          return 'break';
        }
      });

      if (isParentUndraggable) {
        return;
      } // detect draggable end =================================


      if (!index.isTouch(e)) {
        // Do not prevent event now and when the client is mobile. Doing so will result in elements within the node not triggering click event.
        // 不要在此时, 客户端为移动端时阻止事件. 否则将导致节点内的元素不触发点击事件.
        e.preventDefault();
      }

      store.mouse = {
        x: mouse.x,
        y: mouse.y
      };
      store.startEvent = e;
      store.initialMouse = _objectSpread$3({}, store.mouse);
      /*
      must set passive false for touch, else the follow error occurs in Chrome:
      Unable to preventDefault inside passive event listener due to target being treated as passive. See https://www.chromestatus.com/features/5093566007214080
       */

      index.on(document, 'move', moving, {
        touchArgs: [{
          passive: false
        }]
      });
      index.on(window, 'end', drop);
    }

    function drag(e) {
      var canDrag = opt.beforeDrag && opt.beforeDrag(store.startEvent, e, store, opt);

      if (canDrag === false) {
        return false;
      }

      var _resolveDragedElAndIn = resolveDragedElAndInitialPosition(),
          el = _resolveDragedElAndIn.el,
          position = _resolveDragedElAndIn.position;

      store.el = el;
      store.initialPosition = _objectSpread$3({}, position);
      canDrag = opt.drag && opt.drag(store.startEvent, e, store, opt);

      if (canDrag === false) {
        return false;
      } // dom actions


      var size = getBoundingClientRect(el);

      var style = _objectSpread$3({
        width: "".concat(Math.ceil(size.width), "px"),
        height: "".concat(Math.ceil(size.height), "px"),
        zIndex: 9999,
        opacity: 0.8,
        position: 'absolute',
        left: position.x + 'px',
        top: position.y + 'px'
      }, opt.style || opt.getStyle && opt.getStyle(store, opt) || {});

      backupAttr(el, 'style');

      for (var key in style) {
        el.style[key] = style[key];
      } // add class


      backupAttr(el, 'class');
      addClass(el, opt.draggingClass);
    }

    function moving(e, mouse) {
      e.preventDefault();
      store.mouse = {
        x: mouse.x,
        y: mouse.y
      };
      var move = store.move = {
        x: store.mouse.x - store.initialMouse.x,
        y: store.mouse.y - store.initialMouse.y
      };

      if (store.movedCount === 0 && opt.minTranslate) {
        var x2 = Math.pow(store.move.x, 2);
        var y2 = Math.pow(store.move.y, 2);
        var dtc = Math.pow(x2 + y2, 0.5);

        if (dtc < opt.minTranslate) {
          return;
        }
      }

      var canMove = true;

      if (store.movedCount === 0) {
        if (drag(e) === false) {
          canMove = false;
        }
      } // move started


      if (canMove && opt.moving) {
        if (opt.moving(e, store, opt) === false) {
          canMove = false;
        }
      }

      if (canMove) {
        if (!store || !store.el) {
          return;
        }

        Object.assign(store.el.style, {
          left: store.initialPosition.x + move.x + 'px',
          top: store.initialPosition.y + move.y + 'px'
        });
        store.movedCount++;
      }
    }

    function drop(e) {
      index.off(document, 'move', moving, {
        touchArgs: [{
          passive: false
        }]
      });
      index.off(window, 'end', drop); // drag executed if movedCount > 0

      if (store.movedCount > 0) {
        store.movedCount = 0;
        store.endEvent = e;
        var _store = store,
            el = _store.el;

        var restoreDOM = function restoreDOM() {
          if (opt.clone) {
            el.parentElement.removeChild(el);
          } else {
            restoreAttr(el, 'style');
            restoreAttr(el, 'class');
          }
        };

        if (!opt.restoreDOMManuallyOndrop) {
          restoreDOM();
          restoreDOM = null;
        }

        store.restoreDOM = restoreDOM;
        opt.drop && opt.drop(e, store, opt);
      }

      store = getPureStore();
    }

    function resolveDragedElAndInitialPosition() {
      var el0 = opt.getEl ? opt.getEl(dragHandlerEl, store, opt) : dragHandlerEl;
      var el = el0;
      store.originalEl = el0;

      if (opt.clone) {
        el = el0.cloneNode(true);
        el0.parentElement.appendChild(el);
      }

      return {
        position: getPosition(el0),
        el: el
      };
    }

    function getPureStore() {
      return {
        movedCount: 0
      };
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

  function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$4(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function makeTreeDraggable(treeEl) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    options = _objectSpread$4({}, options, {
      treeEl: treeEl
    });

    var _draggableHelper = index$1(treeEl, {
      draggingClass: options.draggingClass,
      restoreDOMManuallyOndrop: true,
      clone: options.cloneWhenDrag,
      beforeDrag: function beforeDrag(startEvent, moveEvent, store, opt) {
        store.startTreeEl = treeEl;

        if (options.beforeDrag && options.beforeDrag(store, opt) === false) {
          return false;
        } // if the event target is a trigger


        var isTrigger = findParent(startEvent.target, function (el) {
          if (hasClass(el, options.triggerClass)) {
            return true;
          }

          if (el === store.startTreeEl || hasClass(el, options.branchClass)) {
            return 'break';
          }
        }, {
          withSelf: true
        });

        if (!isTrigger) {
          return false;
        } // _triggeredBy


        if (startEvent._triggeredBy) {
          return false;
        }

        startEvent._triggeredBy = store.startTree;
      },
      // get the element which will be moved
      getEl: function getEl(dragHandlerEl, store, opt) {
        var el = findParent(store.startEvent.target, function (el) {
          return hasClass(el, options.branchClass);
        }, {
          withSelf: true
        });
        return el;
      },
      drag: function drag(startEvent, moveEvent, store, opt) {
        store.dragBranchEl = store.el;
        var movingEl = store.el; // branch

        store.startPath = options.getPathByBranchEl(movingEl);

        if (options.ondrag && options.ondrag(store, opt) === false) {
          return false;
        }
      },
      moving: function moving(moveEvent, store, opt) {
        // return false in moving will prevent move animation; return undefined just prevent doAction
        store.oneMoveStore = {}; // life cycle: one move

        var movingEl = store.el; // branch
        // find closest branch and hovering tree

        var tree;
        var movingNode = movingEl.querySelector(".".concat(options.nodeClass));
        var movingNodeOf = getOffset(movingNode);
        var movingNodeRect = getBoundingClientRect(movingNode);

        if (options.draggingNodePositionMode === 'mouse') {
          // use mouse position as dragging node position
          movingNodeOf = {
            x: moveEvent.pageX,
            y: moveEvent.pageY
          };
          movingNodeRect = {
            x: moveEvent.clientX,
            y: moveEvent.clientY
          };
        }

        var elsBetweenMovingElAndTree = []; // including tree

        var elsToTree = []; // start from top, including tree
        // loop to find put els between movingEl and tree

        var movingElLooped; // 已循环到了movingEl

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = elementsFromPoint(movingNodeRect.x, movingNodeRect.y)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var itemEl = _step.value;

            if (movingElLooped) {
              elsBetweenMovingElAndTree.push(itemEl);
            } else if (itemEl === movingEl) {
              movingElLooped = true;
            }

            elsToTree.push(itemEl);

            if (hasClass(itemEl, options.treeClass)) {
              tree = itemEl;
              break;
            }
          } // this is an issue, sometimes, the movingEl is not in elementsFromPoint result

        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        if (!movingElLooped) {
          elsBetweenMovingElAndTree.push.apply(elsBetweenMovingElAndTree, elsToTree);
        }

        if (!tree) {
          // out of tree
          return;
        } // check tree if is covered, like modal


        var treeBeCoved;

        if (elsBetweenMovingElAndTree && elsBetweenMovingElAndTree[0]) {
          if (elsBetweenMovingElAndTree[0] !== tree && !isDescendantOf(elsBetweenMovingElAndTree[0], tree)) {
            treeBeCoved = true;
          }
        }

        if (treeBeCoved) {
          return;
        } // check if target tree right


        if (options.filterTargetTree(tree, store, opt) === false) {
          return;
        }

        store.targetTreeEl = tree; // info ========================================
        // life cycle: one move

        var info = {
          tree: function (_tree) {
            function tree() {
              return _tree.apply(this, arguments);
            }

            tree.toString = function () {
              return _tree.toString();
            };

            return tree;
          }(function () {
            return tree;
          }),
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
            }, null, null, true);

            if (t.hit) {
              found = t.value;
            } else {
              if (t.bigger) {
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

              if (getOffset(curNode).x <= movingNodeOf.x) {
                break;
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
        }; // convert conditions result to Boolean

        Object.keys(conditions).forEach(function (key) {
          var old = conditions[key];

          conditions[key] = function () {
            return Boolean(old.call(this));
          };
        }); //

        attachCache(info, info);
        attachCache(conditions, conditions); // actions start ========================================

        var doAction = function doAction(name) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          if (!store._doActionQueue) {
            store._doActionQueue = Promise.resolve();
          }

          var queue = store._doActionQueue;
          store._doActionQueue = queue.then(
          /*#__PURE__*/
          asyncToGenerator(
          /*#__PURE__*/
          regenerator.mark(function _callee() {
            var actionRecords, action, r, placeholderPath, placeholderNodeBack;
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
                    // set indent of placeholder
                    placeholderPath = options.getPathByBranchEl(store.placeholder);
                    placeholderNodeBack = store.placeholder.querySelector(".".concat(options.nodeBackClass));
                    placeholderNodeBack.style.paddingLeft = (placeholderPath.length - 1) * options.indent + 'px'; // remove tempChildren if empty

                    if (store.tempChildren.children.length === 0) {
                      removeEl(store.tempChildren);
                    }

                  case 11:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          })));
        };

        var actions = {
          'nothing': function nothing() {
            return asyncToGenerator(
            /*#__PURE__*/
            regenerator.mark(function _callee2() {
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
            return asyncToGenerator(
            /*#__PURE__*/
            regenerator.mark(function _callee3() {
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
            return asyncToGenerator(
            /*#__PURE__*/
            regenerator.mark(function _callee4() {
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
            var branch = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : info.closestBranch;
            return asyncToGenerator(
            /*#__PURE__*/
            regenerator.mark(function _callee5() {
              var moved, isFirstTriedAction;
              return regenerator.wrap(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      if (!options.isNodeParentDroppable(branch, store.targetTreeEl)) {
                        _context5.next = 4;
                        break;
                      }

                      insertAfter(store.placeholder, branch);
                      _context5.next = 10;
                      break;

                    case 4:
                      _context5.next = 6;
                      return secondCase(getParentBranchByEl(branch));

                    case 6:
                      moved = _context5.sent;
                      isFirstTriedAction = !store.oneMoveStore.actionRecords || store.oneMoveStore.actionRecords.length === 1;

                      if (!(!moved && isFirstTriedAction)) {
                        _context5.next = 10;
                        break;
                      }

                      return _context5.abrupt("return", thirdCase(branch));

                    case 10:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, _callee5);
            }))();
          },
          prepend: function prepend() {
            return asyncToGenerator(
            /*#__PURE__*/
            regenerator.mark(function _callee6() {
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
            return asyncToGenerator(
            /*#__PURE__*/
            regenerator.mark(function _callee7() {
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
            return asyncToGenerator(
            /*#__PURE__*/
            regenerator.mark(function _callee8() {
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

        var secondCase =
        /*#__PURE__*/
        function () {
          var _ref2 = asyncToGenerator(
          /*#__PURE__*/
          regenerator.mark(function _callee9(branchEl) {
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


        var thirdCase =
        /*#__PURE__*/
        function () {
          var _ref3 = asyncToGenerator(
          /*#__PURE__*/
          regenerator.mark(function _callee10(branchEl) {
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

        var unfoldAndGetChildrenEl =
        /*#__PURE__*/
        function () {
          var _ref4 = asyncToGenerator(
          /*#__PURE__*/
          regenerator.mark(function _callee11(branch) {
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

        var tryUnfoldAndPrepend =
        /*#__PURE__*/
        function () {
          var _ref5 = asyncToGenerator(
          /*#__PURE__*/
          regenerator.mark(function _callee13(branchEl) {
            var func, oneMoveStore;
            return regenerator.wrap(function _callee13$(_context13) {
              while (1) {
                switch (_context13.prev = _context13.next) {
                  case 0:
                    func =
                    /*#__PURE__*/
                    function () {
                      var _ref6 = asyncToGenerator(
                      /*#__PURE__*/
                      regenerator.mark(function _callee12() {
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
        //


        var checkPlaceholder = function checkPlaceholder() {
          if (!store.placeholder) {
            var placeholder = createElementFromHTML("\n            <div id=\"".concat(options.placeholderId, "\" class=\"").concat(options.branchClass, " ").concat(options.placeholderClass, "\">\n              <div class=\"").concat(options.nodeBackClass, " ").concat(options.placeholderNodeBackClass, "\">\n                <div class=\"").concat(options.nodeClass, " ").concat(options.placeholderNodeClass, "\">\n                </div>\n              </div>\n            </div>\n          "));
            insertAfter(placeholder, movingEl);
            store.placeholder = placeholder;
            options.afterPlaceholderCreated(store); // create a tree children el to use when can't get childrenEl

            var tempChildren = document.createElement('DIV');
            addClass(tempChildren, options.childrenClass);
            store.tempChildren = tempChildren;
          }
        }; //


        checkPlaceholder();
        doDraggableDecision({
          options: options,
          event: event,
          store: store,
          opt: opt,
          info: info,
          conditions: conditions,
          actions: actions,
          doAction: doAction
        });
      },
      drop: function () {
        var _drop = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee14(endEvent, store, opt) {
          var movingEl, placeholder, tempChildren, maskTree, pathChanged, isPathChanged;
          return regenerator.wrap(function _callee14$(_context14) {
            while (1) {
              switch (_context14.prev = _context14.next) {
                case 0:
                  isPathChanged = function _ref7() {
                    var startTree = store.startTree,
                        targetTree = store.targetTree,
                        startPath = store.startPath,
                        targetPath = store.targetPath;
                    return startTree !== targetTree || startPath.toString() !== targetPath.toString();
                  };

                  movingEl = store.el; // branch

                  placeholder = store.placeholder, tempChildren = store.tempChildren; // use mask tree to avoid flick caused by DOM update in short time
                  // 复制 targetTreeEl 作为遮罩, 避免短时间内更新DOM引起的闪烁

                  if (placeholder) {
                    // placeholder not mounted is rarely
                    // create mask tree
                    maskTree = store.targetTreeEl.cloneNode(true);
                    store.targetTreeEl.style.display = 'none';
                    insertAfter(maskTree, store.targetTreeEl); //

                    store.targetPath = options.getPathByBranchEl(placeholder);
                    pathChanged = isPathChanged();
                    store.targetPathNotEqualToStartPath = pathChanged;
                    store.pathChangePrevented = false;

                    if (options.beforeDrop && options.beforeDrop(pathChanged, store, opt) === false) {
                      pathChanged = false;
                      store.pathChangePrevented = false;
                    }

                    store.pathChanged = pathChanged;
                    removeEl(placeholder);

                    if (tempChildren) {
                      removeEl(tempChildren);
                    }
                  }

                  store.restoreDOM();
                  _context14.next = 7;
                  return options.ondrop(store, opt);

                case 7:
                  if (!maskTree) {
                    _context14.next = 12;
                    break;
                  }

                  _context14.next = 10;
                  return waitTime(30);

                case 10:
                  removeEl(maskTree);
                  store.targetTreeEl.style.display = 'block';

                case 12:
                case "end":
                  return _context14.stop();
              }
            }
          }, _callee14);
        }));

        function drop(_x5, _x6, _x7) {
          return _drop.apply(this, arguments);
        }

        return drop;
      }()
    }),
        destroy = _draggableHelper.destroy,
        draggableHelperOptions = _draggableHelper.draggableHelperOptions;

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
      draggableHelperOptions.clone = options.cloneWhenDrag;
    }
  }

  function isElementHidden(el) {
    return el.offsetWidth === 0 && el.offsetHeight === 0;
  }

  var treesStore = {};
  var script = {
    props: {
      triggerClass: {
        type: String,
        default: 'tree-node'
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
      } // top_left_corner, mouse

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
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = iterateAll(allNodes, {
            reverse: true
          })[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return true;
      },
      isNodeDroppable: function isNodeDroppable(node, path) {
        var store = this.treesStore.store;
        var allNodes = this.getAllNodesByPath(path);
        allNodes.unshift(this.rootNode);
        var droppableFinal, resolved;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = iterateAll(allNodes, {
            reverse: true
          })[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
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
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
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
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = iterateAll(branchEl.parentElement.children)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
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
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
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
        unfoldWhenDragover: this.unfoldWhenDragover,
        unfoldWhenDragoverDelay: this.unfoldWhenDragoverDelay,
        draggingNodePositionMode: this.draggingNodePositionMode,
        cloneWhenDrag: this.cloneWhenDrag,
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
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = tree.iteratePath(findPath, {
              reverse: true
            })[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
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
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
                _iterator4.return();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
            }
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
        beforeDrag: function beforeDrag(store) {
          _this.treesStore.store = store;
          store.startTree = _this.getTreeVmByTreeEl(store.startTreeEl);
          var draggable = resolveValueOrGettter(store.startTree.draggable, [store.startTree, store]);

          if (!draggable) {
            return false;
          }
        },
        ondrag: function ondrag(store) {
          var startTree = store.startTree,
              dragBranchEl = store.dragBranchEl,
              startPath = store.startPath;
          var path = startTree.getPathByBranchEl(dragBranchEl);
          store.dragNode = startTree.getNodeByPath(path);

          if (_this.cloneWhenDrag) {
            store.dragNode = cloneTreeData(store.dragNode);
          }

          if (!startTree.isNodeDraggable(store.dragNode, path)) {
            return false;
          }

          if (startTree.hasHook('ondragstart') && startTree.executeHook('ondragstart', [startTree, store]) === false) {
            return false;
          }

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
        beforeDrop: function beforeDrop(pathChanged, store) {
          var targetTree = store.targetTree;

          if (targetTree.hasHook('ondragend') && targetTree.executeHook('ondragend', [targetTree, store]) === false) {
            return false;
          }

          targetTree.$emit('drop', store);

          _this.$root.$emit('he-tree-drop', store);
        },
        ondrop: function ondrop(store, t) {
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
            startTree.$emit('change');

            if (targetTree !== startTree) {
              targetTree.$emit('input', targetTree.treeData);
              targetTree.$emit('change');
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


      ['indent', 'triggerClass', 'unfoldWhenDragover', 'unfoldWhenDragoverDelay', 'draggingNodePositionMode', 'cloneWhenDrag'].forEach(function (name) {
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

  var __vue_component__$1 = normalizeComponent({}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

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
