import * as hp from 'helper-js'
import draggableHelper from 'draggable-helper'
import doDraggableDecision from './draggable-decision-part.js'

// in follow code, options belongs to makeTreeDraggable, opt belongs to draggableHelper
export default function makeTreeDraggable(treeEl, options = {}) {
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
    // rtl: false
    ...options,
    treeEl,
  }
  const {destroy, options: draggableHelperOptions} = draggableHelper(treeEl, {
    triggerClassName: options.triggerClass,
    triggerBySelf: options.triggerBySelf,
    draggingClassName: options.draggingClass,
    clone: options.cloneWhenDrag,
    edgeScroll: options.edgeScroll,
    edgeScrollTriggerMargin: options.edgeScrollTriggerMargin,
    edgeScrollSpeed: options.edgeScrollSpeed,
    edgeScrollTriggerMode: options.edgeScrollTriggerMode,
    rtl: options.rtl,
    updateMovedElementStyleManually: true,
    getMovedOrClonedElement: (directTriggerElement, store) => {
      // find closest branch from parents
      const el = hp.findParent(store.triggerElement, el => hp.hasClass(el, options.branchClass), {withSelf: true})
      return el
    },
    beforeFirstMove(store, dhOptions) {
      store.startTreeEl = treeEl
      store.dragBranchEl = store.movedElement
      store.startPath = options.getPathByBranchEl(store.movedOrClonedElement)
      if (options.beforeFirstMove && options.beforeFirstMove(store, dhOptions) === false) {
        return false
      }
    },
    beforeMove: (store, dhOptions) => {
      const updatePlaceholderIndent = () => {
        // set indent of placeholder
        const placeholderPath = options.getPathByBranchEl(store.placeholder)
        const placeholderNodeBack = store.placeholder.querySelector(`.${options.nodeBackClass}`)
        placeholderNodeBack.style[!options.rtl ? 'paddingLeft' : 'paddingRight'] = (placeholderPath.length - 1) * options.indent + 'px'
        // remove tempChildren if empty
        if (store.tempChildren.children.length === 0) {
          hp.removeEl(store.tempChildren)
        }
      }
      // first move
      // 第一次移动
      if (store.movedCount === 0) {
        // create placeholder
        // 创建占位元素
        const placeholder = hp.createElementFromHTML(`
          <div id="${options.placeholderId}" class="${options.branchClass} ${options.placeholderClass}">
            <div class="${options.nodeBackClass} ${options.placeholderNodeBackClass}">
              <div class="${options.nodeClass} ${options.placeholderNodeClass}">
              </div>
            </div>
          </div>
        `)
        hp.insertAfter(placeholder, store.movedOrClonedElement)
        store.placeholder = placeholder
        options.afterPlaceholderCreated(store)
        // create a tree children el to use when can't get childrenEl
        const tempChildren = document.createElement('DIV')
        hp.addClass(tempChildren, options.childrenClass)
        store.tempChildren = tempChildren
        // update placeholder indent. update moved element style
        updatePlaceholderIndent()
        store.updateMovedElementStyle()
        // skip first move
        // 跳过第一次移动
        return
      }
      // 
      store.updateMovedElementStyle()
      // 
      store.oneMoveStore = {} // life cycle: one move
      const movingEl = store.movedElement // branch
      // find closest branch and hovering tree
      let tree
      const movingNode = movingEl.querySelector(`.${options.nodeClass}`)
      // movingNodeOf and movingNodeRect are not always real. when RTL, there 'x' is top right. when draggingNodePositionMode is mouse, there x and y are mouse position. So don't calc them with their width or height.
      // movingNodeOf 和 movingNodeRect并非一直如字面意义是movingNode真实坐标. RTL时, x坐标是右上角. draggingNodePositionMode是mouse时, x和y是鼠标坐标.
      let movingNodeOf = hp.getOffset(movingNode)
      let movingNodeRect = hp.getBoundingClientRect(movingNode)
      if (options.draggingNodePositionMode === 'mouse') {
        // use mouse position as dragging node position
        const {moveEvent} = store
        movingNodeOf = {x: moveEvent.pageX, y: moveEvent.pageY}
        movingNodeRect = {x: moveEvent.clientX, y: moveEvent.clientY} 
      } else if (options.rtl) {
        movingNodeOf.x += movingNode.offsetWidth
        movingNodeRect.x += movingNode.offsetWidth
      }
      // find tree with elementsFromPoint
      let found
      let firstElement
      for (const itemEl of hp.elementsFromPoint(movingNodeRect.x, movingNodeRect.y)) {
        if (!firstElement) {
          firstElement = itemEl
        }
        if (hp.hasClass(itemEl, options.treeClass)) {
          found = itemEl
          break
        }
      }
      // check if the found element is covered by other elements
      if (firstElement !== found && !hp.isDescendantOf(firstElement, found)) {
        found = null
      }
      tree = found
      if (!tree) {
        // out of tree or tree is covered by other elements
        return
      }
      // check if target tree right
      if (options.filterTargetTree(tree, store, dhOptions) === false) {
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
          const t = hp.binarySearch(nodes, (node) => hp.getOffset(node).y - movingNodeOf.y, {returnNearestIfNoHit: true})
          if (t.hit) {
            found = t.value
          } else {
            if (t.greater) {
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
            if (!options.rtl) {
              if (hp.getOffset(curNode).x <= movingNodeOf.x) {
                break
              }
            } else {
              if (hp.getOffset(curNode).x + curNode.offsetWidth >= movingNodeOf.x) {
                break
              }
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
      // fix for rtl
      if (options.rtl) {
        Object.assign(conditions, {
          'at closest indent right': () => movingNodeOf.x < info.closestNodeOffset.x + info.closestNode.offsetWidth - options.indent, // at indent left
          'at closest left': () => movingNodeOf.x > info.closestNodeOffset.x + info.closestNode.offsetWidth, // at right
        })
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
          if (!store.oneMoveStore.actionRecords) {
            store.oneMoveStore.actionRecords = []
          }
          const {actionRecords} = store.oneMoveStore
          //
          const action = actions[name]
          const r = action(...args)
          actionRecords.push(name)
          await r
          updatePlaceholderIndent()
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
            const isFirstTriedAction = !store.oneMoveStore.actionRecords || store.oneMoveStore.actionRecords.length === 1
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
              await tryUnfoldAndPrepend(info.closestBranch)
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
          if (options.ifNodeFolded(info.closestPrev, store)) {
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
        if (branchEl) {
          const targetEl = options._findClosestDroppablePosition(branchEl, store.targetTreeEl)
          if (targetEl) {
            hp.insertAfter(store.placeholder, targetEl)
            return true
          }
        }
      }
      // when action is after, first case and second case invalid, try prepend
      // 当操作是'after', 第一种第二种情况无效时, 尝试prepend
      const thirdCase = async (branchEl) => {
        // the third case
        if (!options.ifNodeFolded(branchEl, store) && options.isNodeDroppable(branchEl, store.targetTreeEl)) {
          await tryUnfoldAndPrepend(branchEl)
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
      const tryUnfoldAndPrepend = async (branchEl) => {
        const func = async () => {
          const childrenEl = await unfoldAndGetChildrenEl(branchEl)
          hp.prependTo(store.placeholder, childrenEl)
        }
        if (options.ifNodeFolded(branchEl, store)) {
          // delay if node folded
          let oneMoveStore = store.oneMoveStore
          setTimeout(() => {
            // check if expired
            if (oneMoveStore === store.oneMoveStore) {
              func()
            }
          }, options.unfoldWhenDragoverDelay)
        } else {
          await func()
        }
      }
      // actions end ========================================
      doDraggableDecision({options, event: store.moveEvent, store, opt: dhOptions, info, conditions, actions, doAction})
    },
    beforeDrop: async (store, dhOptions) => {
      const {endEvent} = store
      const movingEl = store.movedElement // branch
      const {placeholder, tempChildren, movedCount, targetTreeEl, startTreeEl} = store
      // use mask tree to avoid flick caused by DOM update in short time
      // 复制 targetTreeEl 作为遮罩, 避免短时间内更新DOM引起的闪烁
      let maskTree, maskTree2
      if (targetTreeEl) {
        // No targetTreeEl mean no valid move.
        // targetTreeEl不存在意味着没有有效移动.

        // create mask tree
        maskTree = targetTreeEl.cloneNode(true)
        targetTreeEl.style.display = 'none'
        hp.insertAfter(maskTree, targetTreeEl)
        if (startTreeEl !== targetTreeEl) {
          maskTree2 = startTreeEl.cloneNode(true)
          startTreeEl.style.display = 'none'
          hp.insertAfter(maskTree2, startTreeEl)
        }
        //
        store.targetPath = options.getPathByBranchEl(placeholder)
        let pathChanged = isPathChanged()
        store.targetPathNotEqualToStartPath = pathChanged
        store.pathChangePrevented = false
        if (options.beforeDrop && options.beforeDrop(pathChanged, store, dhOptions) === false) {
          pathChanged = false
          store.pathChangePrevented = false
        }
        store.pathChanged = pathChanged
      }
      // destroy placeholder and tempChildren
      hp.removeEl(placeholder)
      if (tempChildren) {
        hp.removeEl(tempChildren)
      }
      store.updateMovedElementStyle()
      // 
      await options.afterDrop(store, dhOptions)
      // remove mask tree
      if (maskTree) {
        await hp.waitTime(30)
        hp.removeEl(maskTree)
        targetTreeEl.style.display = 'block'
        if (maskTree2) {
          hp.removeEl(maskTree2)
          startTreeEl.style.display = 'block'
        }
      }
      //
      function isPathChanged() {
        const {startTree, targetTree, startPath, targetPath} = store
        return startTree !== targetTree || startPath.toString() !== targetPath.toString()
      }
    },
  })
  return {destroy, options, optionsUpdated}
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
      rtl: options.rtl,
    })
  }
}

function isElementHidden(el) {
  return el.offsetWidth === 0 && el.offsetHeight === 0
}
