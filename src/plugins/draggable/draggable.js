import * as hp from 'helper-js'
// import draggableHelper from 'draggable-helper'
import draggableHelper from 'C:/Users/phphe/projects/draggable-helper/dist/draggable-helper.esm.js'
import doDraggableDecision from './draggable-decision-part.js'

// in follow code, options belongs to makeTreeDraggable, opt belongs to draggableHelper
export default function makeTreeDraggable(treeEl, options = {}) {
  options = {
    triggerClass: 'tree-node',
    triggerBySelf: false, // trigger only by the element with triggerClass, not children
    rootClass: 'tree-root',
    childrenClass: 'tree-children',
    branchClass: 'tree-branch',
    nodeClass: 'tree-node',
    nodeBackClass: 'tree-node-back',
    placeholderClass: 'tree-placeholder',
    placeholderNodeClass: 'tree-placeholder-node',
    hiddenClass: 'hidden',
    draggingClass: 'dragging',
    indent: 20,
    // unfoldNodeByID optional
    ...options,
  }
  const destroy = draggableHelper(treeEl, {
    draggingClass: options.draggingClass,
    beforeDrag(startEvent, moveEvent, store, opt) {
      // check trigger el
      if (options.triggerBySelf) {
        if (!hp.hasClass(startEvent.target, options.triggerClass)) {
          return false
        }
      } else {
        const isTargetTrigger = hp.findParent(startEvent.target, (el) => {
          if (hp.hasClass(el, options.triggerClass)) {
            return true
          }
          if (el === treeEl || hp.hasClass(el, options.branchClass)) {
            return 'break'
          }
        }, {withSelf: true})
        if (!isTargetTrigger) {
          return false
        }
      }
    },
    // get the element which will be moved
    getEl: (dragHandlerEl, store, opt) => {
      const el = hp.findParent(store.startEvent.target, el => hp.hasClass(el, options.branchClass), {withSelf: true})
      return el
    },
    drag: (startEvent, moveEvent, store, opt) => {
      const movingEl = store.el // branch
      store.dragPath = resolveBranchPath(movingEl)
      options.ondrag && options.ondrag(store, opt)
      // todo insert placeholder by action
      // create placeholder
      const placeholder = document.createElement('DIV')
      hp.addClass(placeholder, options.branchClass)
      hp.addClass(placeholder, options.placeholderClass)
      const placeholderNode = document.createElement('DIV')
      hp.addClass(placeholderNode, options.nodeClass)
      hp.addClass(placeholderNode, options.placeholderNodeClass)
      hp.appendTo(placeholderNode, placeholder)
      hp.insertAfter(placeholder, movingEl)
      store.placeholder = placeholder
      // create a tree children el to use when can't get childrenEl
      const tempChildren = document.createElement('DIV')
      hp.addClass(tempChildren, options.childrenClass)
      store.tempChildren = tempChildren
    },
    moving: (moveEvent, store, opt) => {
      const movingEl = store.el // branch
      // find closest branch and hovering tree
      let tree
      const movingElOf = hp.getOffset(movingEl)
      const movingElRect = hp.getBoundingClientRect(movingEl)
      const elsBetweenMovingElAndTree = [] // including tree
      const elsToTree = [] // start from top, including tree
      let movingElLooped
      for (const itemEl of hp.elementsFromPoint(movingElRect.x, movingElRect.y)) {
        if (movingElLooped) {
          elsBetweenMovingElAndTree.push(itemEl)
        } else if(itemEl === movingEl) {
          movingElLooped = true
        }
        elsToTree.push(itemEl)
        if (hp.hasClass(itemEl, options.rootClass)) {
          tree = itemEl
          break
        }
      }
      // this is an issue, sometimes, the movingEl is not in elementsFromPoint result
      if (!movingElLooped) {
        elsBetweenMovingElAndTree.push(...elsToTree)
      }
      if (!tree) {
        // out of tree
        return
      }
      // check tree if is covered, like modal
      let treeBeCoved
      if (elsBetweenMovingElAndTree && elsBetweenMovingElAndTree[0]) {
        if (elsBetweenMovingElAndTree[0] !== tree && !hp.isDescendantOf(elsBetweenMovingElAndTree[0], tree)) {
          treeBeCoved = true
        }
      }
      if (treeBeCoved) {
        return
      }
      // if cross tree
      // the tree movingEl belongs to
      const sourceTree = hp.findParent(movingEl, (el) => hp.hasClass(el, options.rootClass))
      if (sourceTree !== tree) {
        return
      }
      // info ========================================
      // life cycle: one move
      const info = {
        tree: () => tree,
        closestNode: () => {
          const nodes = [] // all visible nodes sort by y
          const walkToGetNodes = (branch) => {
            //
            if (branch !== info.tree) {
              const node = branch.querySelector(`.${options.nodeClass}`)
              if (node) {
                nodes.push(node)
              }
            }
            //
            const childrenEl = branch === info.tree ? branch : branch.querySelector(`.${options.childrenClass}`)
            if (childrenEl) {
              for (let i = 0; i < childrenEl.children.length; i++) {
                const child = childrenEl.children[i]
                if (child !== movingEl && hp.hasClass(child, options.branchClass) && !hp.hasClass(child, options.hiddenClass)) {
                  walkToGetNodes(child)
                }
              }
            }
          }
          walkToGetNodes(info.tree)
          //
          if (nodes.length === 0) {
            return
          }
          //
          let found
          const t = hp.binarySearch(nodes, (node) => hp.getOffset(node).y - movingElOf.y, null, null, true)
          if (t.hit) {
            found = t.value
          } else {
            if (t.bigger) {
              found = nodes[t.index - 1] || t.value
            } else {
              found = t.value
            }
          }
          return found
        },
        closestNodeOffset: () => hp.getOffset(info.closestNode),
        closestBranch: () => hp.findParent(info.closestNode, el => hp.hasClass(el, options.branchClass)),
        closestNext: () => {
          let next = info.closestBranch.nextSibling
          while (next) {
            if (next !== movingEl && hp.hasClass(next, options.branchClass)) {
              return next
            }
            next = next.nextSibling
          }
        },
        closestPrev: () => {
          let prev = info.closestBranch.previousSibling
          while (prev) {
            if (prev !== movingEl && hp.hasClass(prev, options.branchClass)) {
              return prev
            }
            prev = prev.previousSibling
          }
        },
        aboveBranch: () => {
          // find above from branch to root
          // closestBranch must be placeholder
          if (info.closestBranch !== store.placeholder) {
            return
          }
          if (conditions['closest has next']) {
            return
          }
          // find placeholder prev or parent
          let cur = info.closestBranch
          let prev = cur.previousSibling
          let found
          while (prev) {
            if (prev !== movingEl && hp.hasClass(prev, options.branchClass)) {
              cur = prev
              found = true
              break
            }
            prev = prev.previousSibling
          }
          if (!found) {
            cur = hp.findParent(cur, el => hp.hasClass(el, options.branchClass))
          }
          //
          while (cur) {
            if (hp.getOffset(cur).x <= movingElOf.x) {
              break
            }
            let hasNextBranch
            let t = cur.nextSibling
            while (t) {
              if (t !== movingEl && t !== store.placeholder && hp.hasClass(t, options.branchClass)) {
                hasNextBranch = true
                break
              }
              t = t.nextSibling
            }
            if (hasNextBranch) {
              break
            }
            const parent = hp.findParent(cur, el => hp.hasClass(el, options.branchClass))
            if (!parent) {
              break
            }
            cur = parent
          }
          return cur
        },
      }
      // conditions ========================================
      // life cycle: one move
      const conditions = {
        'no closest': () => !info.closestNode,
        'closest is top': () => info.closestBranch === hp.findNodeList(info.tree.children, el => el !== movingEl),
        'closest is top excluding placeholder': () => info.closestBranch === hp.findNodeList(info.tree.children, el => el !== movingEl && el !== store.placeholder),
        'on closest middle': () => movingElOf.y < info.closestNodeOffset.y + info.closestNode.offsetHeight / 2,
        'at closest indent right': () => movingElOf.x > info.closestNodeOffset.x + options.indent,
        'at closest left': () => movingElOf.x < info.closestNodeOffset.x,
        'closest is placeholder': () => info.closestBranch === store.placeholder,
        'no aboveBranch': () => !info.aboveBranch,
        'closest has next': () => info.closestNext,
        'closest has prev': () => info.closestPrev,
        'closest has children excluding placeholder movingEl': () => {
          const childrenEl = info.closestBranch.querySelector(`.${options.childrenClass}`)
          if (childrenEl) {
            return hp.findNodeList(childrenEl.children, el => el !== movingEl && el !== store.placeholder)
          }
        },
      }
      // convert conditions result to Boolean
      Object.keys(conditions).forEach(key => {
        const old = conditions[key]
        conditions[key] = function () {
          return Boolean(old.call(this))
        }
      })
      //
      hp.attachCache(info, info)
      hp.attachCache(conditions, conditions)
      // actions ========================================
      const doAction = (name) => {
        const action = actions[name]
        const doImmediately = () => {
          const r = action()
          const checkTempChildren = () => {
            if (store.tempChildren.children.length === 0) {
              try {
                // try to remove tempChildren
                hp.removeEl(store.tempChildren)
              } catch (e) {}
            }
          }
          if (hp.isPromise(r)) {
            store._doinggAction = r.then(checkTempChildren)
          } else {
            store._doinggAction = null
            checkTempChildren()
          }
        }
        if (store._doinggAction) {
          store._doinggAction.then(() => {
            doImmediately()
          })
        } else {
          doImmediately()
        }
      }
      const unfoldAndGetChildrenEl = async (branch) => {
        if (options.unfoldNodeByID) {
          await options.unfoldNodeByID(branch.getAttribute('id'))
        }
        let childrenEl = branch.querySelector(`.${options.childrenClass}`)
        if (!childrenEl) {
          childrenEl = store.tempChildren
          hp.appendTo(childrenEl, branch)
        }
        return childrenEl
      }
      const actions = {
        'nothing'() {}, // do nothing
        'append to root'() { hp.appendTo(store.placeholder, info.tree) },
        'insert before'() { hp.insertBefore(store.placeholder, info.closestBranch) },
        'insert after'() { hp.insertAfter(store.placeholder, info.closestBranch) },
        async prepend() {
          if (info.closestBranch === store.placeholder) {
            return
          }
          const childrenEl = await unfoldAndGetChildrenEl(info.closestBranch)
          hp.prependTo(store.placeholder, childrenEl)
        },
        'after above'() { hp.insertAfter(store.placeholder, info.aboveBranch) },
        async 'append to prev'() {
          const childrenEl = await unfoldAndGetChildrenEl(info.closestPrev)
          hp.appendTo(store.placeholder, childrenEl)
        },
      }
      doDraggableDecision({options, event, store, opt, info, conditions, actions, doAction})
    },
    drop: async (endEvent, store, opt) => {
      const movingEl = store.el // branch
      store.dropPath = resolveBranchPath(store.placeholder, el => el !== movingEl)
      //
      // todo if placeholder not mounted
      const pathChanged = !comparePath(store.dragPath, store.dropPath)
      let clonedTreeEl
      if (pathChanged) {
        // todo cross tree
        if (store.placeholder) {
          store.placeholder.setAttribute('draggable-temp', 'placeholder')
        }
        if (store.tempChildren) {
          store.tempChildren.setAttribute('draggable-temp', 'tempChildren')
        }
        clonedTreeEl = treeEl.cloneNode(true)
        hp.backupAttr(treeEl, 'style')
        const movingEl2 = clonedTreeEl.querySelector(`[id=${movingEl.getAttribute('id')}]`)
        const placeholder2 = clonedTreeEl.querySelector(`[draggable-temp=placeholder]`)
        const tempChildren2 = clonedTreeEl.querySelector(`[draggable-temp=tempChildren]`)
        hp.insertBefore(movingEl2, placeholder2)
        hp.removeEl(placeholder2)
        if (tempChildren2 && !tempChildren2.querySelector(`.${options.branchClass}`)) {
          hp.removeEl(tempChildren2)
        }
        treeEl.style.display = 'none'
        hp.insertAfter(clonedTreeEl, treeEl)
      }
      hp.removeEl(store.placeholder)
      try {
        hp.removeEl(store.tempChildren)
      } catch (e) {}
      await options.ondrop(pathChanged, store, opt)
      if (pathChanged) {
        hp.restoreAttr(treeEl, 'style')
        hp.removeEl(clonedTreeEl)
      }
    },
  })
  return destroy
  function resolveBranchPath(branchEl, filter) {
    let tree
    const parentIds = []
    hp.findParent(branchEl, el => {
      if (hp.hasClass(el, options.rootClass)) {
        tree = el
        return true
      }
      if (hp.hasClass(el, options.branchClass)) {
        parentIds.unshift(el.getAttribute('id'))
      }
    })
    const siblings = []
    for (let i = 0; i < branchEl.parentElement.children.length; i++) {
      const el = branchEl.parentElement.children[i]
      if (hp.hasClass(el, options.branchClass) || hp.hasClass(el, options.placeholderClass)) {
        if (!filter || filter(el, i)) {
          siblings.push(el)
        }
      }
    }
    const index = siblings.indexOf(branchEl)
    return {tree, parentIds, index}
  }
  function comparePath(p1, p2) {
    return p1.tree === p2.tree && p1.index === p2.index && p1.parentIds.toString() === p2.parentIds.toString()
  }
}
