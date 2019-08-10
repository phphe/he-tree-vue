export function* iterateALL(val, opt = {}) {
  // opt: {reverse, exclude}
  if (!opt.reverse) {
    if (val.length != null) {
      for (let i = 0; i < val.length; i++) {
        const info = {value: val[i], index: i}
        if (!opt.exclude || !opt.exclude(info)) {
          yield info
        }
      }
    } else if (isObject(val)) {
      for (const key of Object.keys(val)) {
        const info = {value: val[key], key}
        if (!opt.exclude || !opt.exclude(info)) {
          yield info
        }
      }
    } else {
      throw 'Unsupported type'
    }
  } else {
    if (val.length != null) {
      for (let i = val.length - 1; i >= 0 ; i--) {
        const info = {value: val[i], index: i}
        if (!opt.exclude || !opt.exclude(info)) {
          yield info
        }
      }
    } else if (isObject(val)) {
      const keys = Object.keys(val)
      keys.reverse()
      for (const key of keys) {
        const info = {value: val[key], key}
        if (!opt.exclude || !opt.exclude(info)) {
          yield info
        }
      }
    } else {
      throw 'Unsupported type'
    }
  }
}
