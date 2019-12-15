<script>
import * as hp from 'helper-js'
import makeTreeDraggable from './draggable.js'
import * as tdhp from '@/todo-utils'

export default {
  props: {
    indent: {default: 20},
    triggerClass: {type: String, default: 'tree-node'},
    draggable: {type: [Boolean, Function], default: true},
    ondragstart: {type: Function},
    ondragend: {type: Function},
    unfoldWhenDragover: {type: Boolean, default: true},
    // pro props
    droppable: {type: [Boolean, Function], default: true},
    crossTree: {type: [Boolean, Function], default: false},
    rootDroppable: {type: [Boolean, Function], default: true},
  },
  // components: {},
  // data() {
  //   return {}
  // },
  // computed: {},
  // watch: {},
  methods: {
    _Draggable_unfoldTargetNodeByEl(branchEl, store) {
      const {targetTree} = store
      const path = targetTree.getPathByBranchEl(branchEl)
      const node = targetTree.getNodeByPath(path)
      targetTree.unfold(node, path)
      return new Promise((resolve, reject) => {
        targetTree.$nextTick(() => {
          resolve()
        })
      })
    },
    // todo remove
    _Draggable_DOMPathToNodePath(DOMPath) {
      const {tree: treeEl, parentIds, index} = DOMPath
      const tree = this.getTreeVmByTreeEl(treeEl)
      // resolve indexes
      const indexes = []
      let cur = tree.value
      for (const pid of parentIds) {
        let index
        if (!cur) {
          break
        }
        for (let i = 0; i < cur.length; i++) {
          const node = cur[i]
          if (tree.getMetaByNode(node).id === pid) {
            index = i
            cur = node.children
            break
          }
        }
        indexes.push(DOMPath.index)
      }
      indexes.push(index)
      //
      return {
        tree,
        parent: parentIds.length > 0 ? tree.getNodeByID(hp.arrayLast(parentIds)) : null,
        index,
        indexes,
      }
    },
    // todo move to tree-helper
    // todo add tree-helper into helper-js
    getNodeByIndexPath(indexes, rootData = this.value) {
      let cur
      let children = rootData
      for (const index of indexes) {
        cur = children[index]
        children = cur.children
      }
      return cur
    },
    isNodeDroppable(node, path) {
      if (!node) {
        // tree
        return this.rootDroppable
      }
      for (const {value: node} of hp.iterateALL(this.getAllNodesByPath(path), {reverse: true})) {
        if (node.$droppable === undefined) {
          continue
        } else {
          // todo if is function
          return node.$droppable
        }
      }
      return true
    },
    // override
    getPathByBranchEl(branchEl) {
      const getAttrPath = (el) => {
        const pathStr = el.getAttribute('data-tree-node-path')
        if (pathStr) {
          return pathStr.split(',').map(v => parseInt(v))
        }
      }
      const path = getAttrPath(branchEl)
      if (path) {
        return path
      }
      // placeholder path
      let parentPath
      hp.findParent(branchEl, el => {
        if (hp.hasClass(el, 'tree-root')) {
          parentPath = []
          return true
        }
        if (hp.hasClass(el, 'tree-branch')) {
          parentPath = getAttrPath(el)
          return true
        }
      })
      let index = 0
      for (const {value: el, index: index2} of hp.iterateALL(branchEl.parentElement.children)) {
        if (hp.hasClass(el, 'tree-branch') || hp.hasClass(el, 'tree-placeholder')) {
          if (el === branchEl) {
            break
          }
          index++
        }
      }
      return [...parentPath, index]
    },
  },
  // created() {},
  mounted() {
    const options = this. _draggableOptions = {
      indent: this.indent,
      triggerClass: this.triggerClass,
      rootClass: 'tree-root',
      childrenClass: 'tree-children',
      branchClass: 'tree-branch',
      nodeClass: 'tree-node',
      nodeBackClass: 'tree-node-back',
      placeholderClass: 'tree-placeholder',
      placeholderNodeClass: 'tree-placeholder-node',
      hiddenClass: 'hidden',
      draggingClass: 'dragging',
      placeholderId: `${this.DOM_ID_PREFIX}_placeholder`,
      ifNodeFoldedAndWithChildrenAndNotAutoUnfold: (branchEl, store) => {
         const {targetTree} = store
         const node = targetTree.getNodeByBranchEl(branchEl)
         return node.$folded && node.children && node.children.length > 0 && !this.unfoldWhenDragover
      },
      isTargetTreeRootDroppable: (store) => store.targetTree.rootDroppable,
      unfoldTargetNodeByEl: (...args) => this._Draggable_unfoldTargetNodeByEl(...args),
      isNodeParentDroppable: (branchEl, treeEl) => {
        const tree = this.getTreeVmByTreeEl(treeEl)
        const path = tree.getPathByBranchEl(branchEl)
        const parentPath = tdhp.arrayWithoutEnd(path, 1)
        const parent = tree.getNodeByPath(parentPath)
        return tree.isNodeDroppable(parent, parentPath)
      },
      isNodeDroppable: (branchEl, treeEl) => {
        const tree = this.getTreeVmByTreeEl(treeEl)
        const path = tree.getPathByBranchEl(branchEl)
        const node = tree.getNodeByPath(path)
        return tree.isNodeDroppable(node, path)
      },
      _findClosestDroppablePosition: (branchEl, treeEl) => {
        const tree = this.getTreeVmByTreeEl(treeEl)
        const path = tree.getPathByBranchEl(branchEl)
        const findPath = tdhp.arrayWithoutEnd(path, 2) // no node and its parent
        for (const {node, path} of this.iteratePath(findPath, {reverse: true})) {
          if (tree.isNodeDroppable(node, path)) {
            return tree.getBranchElByPath(path)
          }
        }
      },
      afterPlaceholderCreated: (store) => {
        store.startTree.$emit('afterPlaceholderCreated', store)
      },
      getPathByBranchEl: (branchEl) => this.getPathByBranchEl(branchEl),
      beforeDrag: (store) => {
        store.startTree = this.getTreeVmByTreeEl(store.startTreeEl)
        const draggable = tdhp.resolveValueOrGettter(store.startTree.draggable, [store])
        if (!draggable) {
          return false
        }
      },
      ondrag: (store) => {
        const {startTree, dragBranchEl} = store
        store.dragNode = startTree.getNodeByBranchEl(dragBranchEl)
        if (startTree.hasHook('ondragstart') && startTree.executeHook('ondragstart', [store]) === false) {
          return false
        }
        store.startTree.$emit('drag', store)
      },
      beforeMove: (store) => {
        store.targetTree = this.getTreeVmByTreeEl(store.targetTreeEl)
        const {startTree, targetTree} = store
        if (startTree !== targetTree && (!startTree.crossTree || !targetTree.crossTree)) {
          return false
        }
        if (!targetTree.droppable) {
          return false
        }
      },
      beforeDrop: (pathChanged, store) => {
        const {targetTree} = store
        if (targetTree.hasHook('ondragend') && targetTree.executeHook('ondragend', [store]) === false) {
          return false
        }
        targetTree.$emit('drop', store)
      },
      ondrop: (store, t) => {
        if (store.pathChanged) {
          const {startTree, targetTree, startPath, targetPath, dragNode} = store
          // remove from start position
          const startParentPath = tdhp.arrayWithoutEnd(startPath, 1)
          const startParent = startTree.getNodeByPath(startParentPath)
          const startSiblings = startParent ? startParent.children : startTree.value
          const startIndex = hp.arrayLast(startPath)
          startSiblings.splice(startIndex, 1)
          // update targetPath
          if (startTree === targetTree) {
            if (startPath.length <= targetPath.length) {
              const lenNoEnd = startPath.length - 1
              let same = true
              for (let i = 0; i < lenNoEnd; i++) {
                const s = startPath[i]
                const t = targetPath[i]
                if (s !== t) {
                  same = false
                  break
                }
              }
              if (same) {
                const endIndex = startPath.length - 1
                if (startPath[endIndex] < targetPath[endIndex]) {
                  targetPath[endIndex] -= 1
                }
              }
            }
          }
          // insert to target position
          const targetParentPath = tdhp.arrayWithoutEnd(targetPath, 1)
          const targetParent = targetTree.getNodeByPath(targetParentPath)
          let targetSiblings
          if (targetParent) {
            if (!targetParent.children) {
              this.$set(targetParent, 'children', [])
            }
            targetSiblings = targetParent.children
          } else {
            targetSiblings = targetTree.value
          }
          const targetIndex = hp.arrayLast(targetPath)
          targetSiblings.splice(targetIndex, 0, dragNode)
          // emit event
          startTree.$emit('input', startTree.value)
          startTree.$emit('change')
          if (targetTree !== startTree) {
            targetTree.$emit('input', targetTree.value)
            targetTree.$emit('change')
          }
        }
      },
    }
    const _makeTreeDraggable_obj = this._makeTreeDraggable_obj = makeTreeDraggable(this.$el, options);
    // watch props and update options
    ['indent', 'triggerClass'].forEach(name => {
      this.$watch(name, (value) => { _makeTreeDraggable_obj.options[name] = value })
    })
  },
}
</script>

<style>
.he-tree .tree-placeholder{
}
.he-tree .tree-placeholder-node{
  background: #ddf2f9;
  border: 1px dashed #00d9ff;
  height: 20px;
}
</style>
