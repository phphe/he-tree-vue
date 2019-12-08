import {isFunction, iterateALL} from 'helper-js'

export function resolveValueOrGettter(valueOrGetter, args = []) {
  if (isFunction(valueOrGetter)) {
    return valueOrGetter(...args)
  } else {
    return valueOrGetter
  }
}

// the returned function only accept one argument
export function joinFunctionsByResult(funcs) {
  let wrappedFunc = funcs[0]
  for (let i = 1; i < funcs.length; i++) {
    wrappedFunc = join2func(wrappedFunc, funcs[i])
  }
  return wrappedFunc
  function join2func(func1, func2) {
    return function (arg) {
      let result = args
      const result1 = func1(arg)
      return func2(result1)
    }
  }
}

// must pass arguments to `next` manually
export function joinFunctionsByNext(funcs) {
  let next = () => {}
  for (const {value: func} of iterateALL(funcs, {reverse: true})) {
    const currentNext = next
    next = wrapFuncWithNext(func, currentNext)
  }
  return next
  function wrapFuncWithNext(func, next) {
    return function (...args) {
      return func(next, ...args)
    }
  }
}
