import * as ut from './utils.js'

export function insertBefore(el, target) {
  target.parentElement.insertBefore(el, target)
}
export function insertAfter(el, target) {
  target.parentElement.insertBefore(el, target.nextSibling)
}
export function prependTo(el, target) {
  target.insertBefore(el, target.firstChild);
}
export function appendTo(el, target) {
  target.appendChild(el)
}
export function removeEl(el) {
  return el.parentNode.removeChild(el)
}

export function findNodeList(list, callback, opt = {}) {
  const iterator = ut.iterateALL(list, {
    reverse: opt.reverse
  })
  for (const {value, index} of iterator) {
    if (callback(value, index)) {
      return value
    }
  }
}

export function findNodeListReverse(list, callback, opt = {}) {
  opt.reverse = true
  return findNodeList(list, callback, opt)
}

export function elementsFromPoint(...args) {
  return document.elementsFromPoint(...args)
}

export function getOuterAttachedHeight(el) {
  const stl = getComputedStyle(el)
  let r = 0;
  ['margin-top', 'margin-bottom', 'border-top-width', 'border-bottom-width'].forEach(key => {
    r += parseFloat(stl[key])
  })
  return r
}

export function getOuterAttachedWidth(el) {
  const stl = getComputedStyle(el)
  let r = 0;
  ['margin-left', 'margin-right', 'border-left-width', 'border-right-width'].forEach(key => {
    r += parseFloat(stl[key])
  })
  return r
}
