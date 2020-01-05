import * as hp from 'helper-js'
import draggableHelper from 'draggable-helper'
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
    // placeholderNodeBackClass: 'tree-placeholder-node-back',
    // placeholderNodeClass: 'tree-placeholder-node',
    // draggingClass: 'dragging',
    // placeholderId
    // unfoldTargetNodeByEl
    // getPathByBranchEl
    ...options,
    treeEl,
  }
  const destroy = draggableHelper(treeEl, {
    draggingClass: options.draggingClass,
    restoreDOMManuallyOndrop: true,
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
      const movingNode = movingEl.querySelector(`.${options.nodeClass}`)
      const movingNodeOf = hp.getOffset(movingNode)
      const movingNodeRect = hp.getBoundingClientRect(movingNode)
      const elsBetweenMovingElAndTree = [] // including tree
      const elsToTree = [] // start from top, including tree
      // loop to find put els between movingEl and tree
      let movingElLooped // 已循环到了movingEl
      for (const itemEl of hp.elementsFromPoint(movingNodeRect.x, movingNodeRect.y)) {
        if (movingElLooped) {
          elsBetweenMovingElAndTree.push(itemEl)
        } else if(itemEl === movingEl) {
          movingElLooped = true
        }
        elsToTree.push(itemEl)
        if (hp.hasClass(itemEl, options.treeClass)) {
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
        root: () => info.tree.querySelector(`.${options.childrenClass}`),
        closestNode: () => {
          const nodes = [] // all visible nodes sort by y
          const walkToGetNodes = (branch) => {
            //
            if (branch !== info.tree) {
              const node = branch.querySelector(`.${options.nodeClass}`)
              if (node && !isElementHidden(node)) {
                nodes.push(node)
              }
            }
            //
            const childrenEl = branch.querySelector(`.${options.childrenClass}`)
            if (childrenEl) {
              for (let i = 0; i < childrenEl.children.length; i++) {
                const child = childrenEl.children[i]
                if (child !== movingEl && hp.hasClass(child, options.branchClass)) {
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
          const t = hp.binarySearch(nodes, (node) => hp.getOffset(node).y - movingNodeOf.y, null, null, true)
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
            if (next !== movingEl && hp.hasClass(next, options.branchClass) && !isElementHidden(next)) {
              return next
            }
            next = next.nextSibling
          }
        },
        closestPrev: () => {
          let prev = info.closestBranch.previousSibling
          while (prev) {
            if (prev !== movingEl && hp.hasClass(prev, options.branchClass) && !isElementHidden(prev)) {
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
            if (prev !== movingEl && hp.hasClass(prev, options.branchClass) && !isElementHidden(prev)) {
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
            const curNode = cur.querySelector(`.${options.nodeClass}`)
            if (hp.getOffset(curNode).x <= movingNodeOf.x) {
              break
            }
            let hasNextBranch
            let t = cur.nextSibling
            while (t) {
              if (t !== movingEl && t !== store.placeholder && hp.hasClass(t, options.branchClass) && !isElementHidden(t)) {
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
        'closest is top': () => info.closestBranch === hp.findNodeList(info.root.children, el => el !== movingEl && !isElementHidden(el)),
        'closest is top excluding placeholder': () => info.closestBranch === hp.findNodeList(info.root.children, el => el !== movingEl && el !== store.placeholder && !isElementHidden(el)),
        'on closest middle': () => movingNodeOf.y < info.closestNodeOffset.y + info.closestNode.offsetHeight / 2,
        'at closest indent right': () => movingNodeOf.x > info.closestNodeOffset.x + options.indent,
        'at closest left': () => movingNodeOf.x < info.closestNodeOffset.x,
        'closest is placeholder': () => info.closestBranch === store.placeholder,
        'no aboveBranch': () => !info.aboveBranch,
        'closest has next': () => info.closestNext,
        'closest has prev': () => info.closestPrev,
        'closest has children excluding placeholder movingEl': () => {
          const childrenEl = info.closestBranch.querySelector(`.${options.childrenClass}`)
          if (childrenEl) {
            return hp.findNodeList(childrenEl.children, el => el !== movingEl && el !== store.placeholder && !isElementHidden(el))
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
          await r
          // set indent of placeholder
          const placeholderPath = options.getPathByBranchEl(store.placeholder)
          const placeholderNodeBack = store.placeholder.querySelector(`.${options.nodeBackClass}`)
          placeholderNodeBack.style.paddingLeft = (placeholderPath.length - 1) * options.indent + 'px'
          // remove tempChildren if empty
          if (store.tempChildren.children.length === 0) {
            hp.removeEl(store.tempChildren)
          }
        })
      }
      const actions = {
        async 'nothing'() {}, // do nothing
        async 'append to root'() {
          // no closest branch, just append to root
          if (options.isTargetTreeRootDroppable(store)) {
            hp.appendTo(store.placeholder, info.root)
          }
        },
        async 'insert before'() {
          if (options.isNodeParentDroppable(info.closestBranch, store.targetTreeEl)) {
            hp.insertBefore(store.placeholder, info.closestBranch)
          } else {
            return secondCase(getParentBranchByEl(info.closestBranch))
          }
        },
        async 'insert after'(branch = info.closestBranch) {
          if (options.isNodeParentDroppable(branch, store.targetTreeEl)) {
            hp.insertAfter(store.placeholder, branch)
          } else {
            const moved = await secondCase(getParentBranchByEl(branch))
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
            return secondCase(getParentBranchByEl(info.aboveBranch))
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
          const placeholder = hp.createElementFromHTML(`
            <div id="${options.placeholderId}" class="${options.branchClass} ${options.placeholderClass}">
              <div class="${options.nodeBackClass} ${options.placeholderNodeBackClass}">
                <div class="${options.nodeClass} ${options.placeholderNodeClass}">
                </div>
              </div>
            </div>
          `)
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
      // use mask tree to avoid flick caused by DOM update in short time
      // 复制 targetTreeEl 作为遮罩, 避免短时间内更新DOM引起的闪烁
      let maskTree
      if (placeholder) {
        // placeholder not mounted is rarely
        // create mask tree
        maskTree = store.targetTreeEl.cloneNode(true)
        store.targetTreeEl.style.display = 'none'
        hp.insertAfter(maskTree, store.targetTreeEl)
        //
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
      }
      store.restoreDOM()
      await options.ondrop(store, opt)
      // remove mask tree
      if (maskTree) {
        await hp.waitTime(30)
        hp.removeEl(maskTree)
        store.targetTreeEl.style.display = 'block'
      }
      //
      function isPathChanged() {
        const {startTree, targetTree, startPath, targetPath} = store
        return startTree !== targetTree || startPath.toString() !== targetPath.toString()
      }
    },
  })
  return {destroy, options}
  function getParentBranchByEl(el) {
    return hp.findParent(el, el => {
      if (hp.hasClass(el, options.branchClass)) {
        return true
      }
      if (hp.hasClass(el, options.rootClass)) {
        return 'break'
      }
    })
  }
}

function isElementHidden(el) {
  return el.offsetWidth === 0 && el.offsetHeight === 0
}
