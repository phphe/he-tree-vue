// todo extract to helper-js
export default class Cache {
  store = {};
  has(name) {
    return this.store.hasOwnProperty(name)
  }
  remember(name, getter) {
    if (!this.has(name)) {
      this.store[name] = {
        value: getter()
      }
    }
    return this.store[name].value
  }
  forget(name) {
    if (name) {
      if (this.has(name)) {
        delete this.store[name]
      }
    } else {
      this.store = {}
    }
  }
}

// attach cached getters to an object; can attach to self
export function attachCache(obj, toCache, cache = new Cache()) {
  for (const key in toCache) {
    const getter = toCache[key]
    Object.defineProperty(obj, key, {
      get() {
        return cache.remember(key, () => getter.call(this))
      },
    })
  }
}
