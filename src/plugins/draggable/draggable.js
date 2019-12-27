import * as hp from 'helper-js'
// todo
// import draggableHelper from 'draggable-helper'
// import draggableHelper from '/home/he/projects/draggable-helper/dist/draggable-helper.esm.js'
import draggableHelper from '../../../../draggable-helper/dist/draggable-helper.esm.js'
import doDraggableDecision from './draggable-decision-part.js'

// in follow code, options belongs to makeTreeDraggable, opt belongs to draggableHelper
export default function makeTreeDraggable(treeEl, options = {}) {
  options = {
    // indent: 20,
    // triggerClass: 'tree-node',
    // unfoldWhenDragover
    // getTriggerEl optional
    // rootClass: 'tree-root',
    // childrenClass: 'tree-children',
    // branchClass: 'tree-branch',
    // nodeClass: 'tree-node',
    // nodeBackClass: 'tree-node-back',
    // placeholderClass: 'tree-placeholder',
    // placeholderNodeClass: 'tree-placeholder-node',
    // hiddenClass: 'hidden',
    // draggingClass: 'dragging',
    // placeholderId
    // unfoldTargetNodeByEl
    // getPathByBranchEl
    ...options,
    treeEl,
  }
  const destroy = draggableHelper(treeEl, {
    draggingClass: options.draggingClass,
    beforeDrag(startEvent, moveEvent, store, opt) {
      store.startTreeEl = treeEl
      if (options.beforeDrag && options.beforeDrag(store, opt) === false) {
        return false
      }
      // if the event target is a trigger
      const isTrigger = hp.findParent(startEvent.target, (el) => {
        if (hp.hasClass(el, options.triggerClass)) {
          return true
        }
        if (el === store.startTreeEl || hp.hasClass(el, options.branchClass)) {
          return 'break'
        }
      }, {withSelf: true})
      if (!isTrigger) {
        return false
      }
      // _triggeredBy
      if (startEvent._triggeredBy) {
        return false
      }
      startEvent._triggeredBy = store.startTree
    },
    // get the element which will be moved
    getEl: (dragHandlerEl, store, opt) => {
      const el = hp.findParent(store.startEvent.target, el => hp.hasClass(el, options.branchClass), {withSelf: true})
      return el
    },
    drag: (startEvent, moveEvent, store, opt) => {
      store.dragBranchEl = store.el
      const movingEl = store.el // branch
      store.startPath = options.getPathByBranchEl(movingEl)
      if (options.ondrag && options.ondrag(store, opt) === false) {
        return false
      }
    },
    moving: (moveEvent, store, opt) => {
      // return false in moving will prevent move animation; return undefined just prevent doAction
      store.oneMoveStore = {} // life cycle: one move
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
      // check if target tree right
      if (options.filterTargetTree(tree, store, opt) === false) {
        return
      }
      store.targetTreeEl = tree
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
      // actions start ========================================
      const doAction = (name, ...args) => {
        if (!store._doActionQueue) {
          store._doActionQueue = Promise.resolve()
        }
        const queue = store._doActionQueue
        store._doActionQueue = queue.then(async () => {
          // record tried actions in one move
          if (!store.oneMoveStore.triedActions) {
            store.oneMoveStore.triedActions = []
          }
          const {triedActions} = store.oneMoveStore
          //
          const action = actions[name]
          const r = action(...args)
          triedActions.push(name)
          const checkTempChildren = () => {
            if (store.tempChildren.children.length === 0) {
              try {
                // try to remove tempChildren
                hp.removeEl(store.tempChildren)
              } catch (e) {}
            }
          }
          await r
          checkTempChildren()
        })
      }
      const actions = {
        async 'nothing'() {}, // do nothing
        async 'append to root'() {
          // no closest branch, just append to root
          if (options.isTargetTreeRootDroppable(store)) {
            hp.appendTo(store.placeholder, info.tree)
          }
        },
        async 'insert before'() {
          if (options.isNodeParentDroppable(info.closestBranch, store.targetTreeEl)) {
            hp.insertBefore(store.placeholder, info.closestBranch)
          } else {
            return secondCase(info.closestBranch)
          }
        },
        async 'insert after'(branch = info.closestBranch) {
          if (options.isNodeParentDroppable(branch, store.targetTreeEl)) {
            hp.insertAfter(store.placeholder, branch)
          } else {
            const moved = await secondCase(branch)
            const isFirstTriedAction = !store.oneMoveStore.triedActions || store.oneMoveStore.triedActions.length === 0
            if (!moved && isFirstTriedAction) {
              return thirdCase(branch)
            }
          }
        },
        async prepend() {
          if (info.closestBranch === store.placeholder) {
            return
          }
          if (options.ifNodeFolded(info.closestBranch, store) && !options.unfoldWhenDragover) {
            return doAction('insert after', info.closestBranch)
          } else {
            if (options.isNodeDroppable(info.closestBranch, store.targetTreeEl)) {
              const childrenEl = await unfoldAndGetChildrenEl(info.closestBranch)
              hp.prependTo(store.placeholder, childrenEl)
            } else {
              return secondCase(info.closestBranch)
            }
          }
        },
        async 'after above'() {
          if (options.isNodeParentDroppable(info.aboveBranch, store.targetTreeEl)) {
            hp.insertAfter(store.placeholder, info.aboveBranch)
          } else {
            return secondCase(info.aboveBranch)
          }
        },
        async 'append to prev'() {
          if (info.closestPrev === store.placeholder) {
            return
          }
          if (options.ifNodeFolded(info.closestPrev, store) && !options.unfoldWhenDragover) {
            return doAction('insert after', info.closestPrev)
          } else {
            if (options.isNodeDroppable(info.closestPrev, store.targetTreeEl)) {
              const childrenEl = await unfoldAndGetChildrenEl(info.closestPrev)
              hp.appendTo(store.placeholder, childrenEl)
            } else {
              return secondCase(info.closestPrev)
            }
          }
        },
      }
      // second case for actions, when target position not droppable
      // return true if moved
      const secondCase = async (branchEl) => {
        const targetEl = options._findClosestDroppablePosition(branchEl, store.targetTreeEl)
        if (targetEl) {
          hp.insertAfter(store.placeholder, targetEl)
          return true
        }
      }
      // when action is after, first case and second case invalid, try prepend
      // 当操作是'after', 第一种第二种情况无效时, 尝试prepend
      const thirdCase = async (branchEl) => {
        // the third case
        hp.insertAfter(store.placeholder, targetEl)
        if (options.isNodeDroppable(branchEl, store.targetTreeEl)) {
          const childrenEl = await unfoldAndGetChildrenEl(branchEl)
          hp.prependTo(store.placeholder, childrenEl)
        }
      }
      const unfoldAndGetChildrenEl = async (branch) => {
        await options.unfoldTargetNodeByEl(branch, store)
        let childrenEl = branch.querySelector(`.${options.childrenClass}`)
        if (!childrenEl) {
          childrenEl = store.tempChildren
          hp.appendTo(childrenEl, branch)
        }
        return childrenEl
      }
      // actions end ========================================
      //
      const checkPlaceholder = () => {
        if (!store.placeholder) {
          // create placeholder
          const placeholder = document.createElement('DIV')
          hp.addClass(placeholder, options.branchClass)
          hp.addClass(placeholder, options.placeholderClass)
          if (options.placeholderId) {
            placeholder.setAttribute('id', options.placeholderId)
          }
          const placeholderNode = document.createElement('DIV')
          hp.addClass(placeholderNode, options.nodeClass)
          hp.addClass(placeholderNode, options.placeholderNodeClass)
          hp.appendTo(placeholderNode, placeholder)
          hp.insertAfter(placeholder, movingEl)
          store.placeholder = placeholder
          options.afterPlaceholderCreated(store)
          // create a tree children el to use when can't get childrenEl
          const tempChildren = document.createElement('DIV')
          hp.addClass(tempChildren, options.childrenClass)
          store.tempChildren = tempChildren
        }
      }
      //
      checkPlaceholder()
      doDraggableDecision({options, event, store, opt, info, conditions, actions, doAction})
    },
    drop: async (endEvent, store, opt) => {
      const movingEl = store.el // branch
      const {placeholder, tempChildren} = store
      //
      // todo if placeholder not mounted
      store.targetPath = options.getPathByBranchEl(placeholder)
      let pathChanged = isPathChanged()
      store.targetPathNotEqualToStartPath = pathChanged
      store.pathChangePrevented = false
      if (options.beforeDrop && options.beforeDrop(pathChanged, store, opt) === false) {
        pathChanged = false
        store.pathChangePrevented = false
      }
      store.pathChanged = pathChanged
      hp.removeEl(placeholder)
      if (tempChildren) {
        hp.removeEl(tempChildren)
      }
      options.ondrop(store, opt)
      //
      function isPathChanged() {
        const {startTree, targetTree, startPath, targetPath} = store
        return startTree !== targetTree || startPath.toString() !== targetPath.toString()
      }
    },
  })
  return {destroy, options}
}
