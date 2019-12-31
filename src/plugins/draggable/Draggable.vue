<script>
import * as hp from 'helper-js'
import makeTreeDraggable from './draggable.js'

const treesStore = {}

export default {
  props: {
    triggerClass: {type: String, default: 'tree-node'},
    draggable: {type: [Boolean, Function], default: true},
    droppable: {type: [Boolean, Function], default: true},
    eachDraggable: {type: [Boolean, Function], default: true},
    eachDroppable: {type: [Boolean, Function], default: true},
    ondragstart: {type: Function},
    ondragend: {type: Function},
    unfoldWhenDragover: {type: Boolean, default: true},
    // pro props
    crossTree: {type: [Boolean, Function], default: false},
  },
  // components: {},
  data() {
    return {
      treesStore,
    }
  },
  // computed: {},
  // watch: {},
  methods: {
    _Draggable_unfoldTargetNodeByEl(branchEl, store) {
      const {targetTree} = store
      const path = targetTree.getPathByBranchEl(branchEl)
      const node = targetTree.getNodeByPath(path)
      targetTree.unfold && targetTree.unfold(node, path)
      return new Promise((resolve, reject) => {
        targetTree.$nextTick(() => {
          resolve()
        })
      })
    },
    // todo move to tree-helper
    // todo add tree-helper into helper-js
    getNodeByIndexPath(indexes, rootData = this.treeData) {
      let cur
      let children = rootData
      for (const index of indexes) {
        cur = children[index]
        children = cur.children
      }
      return cur
    },
    isNodeDraggable(node, path) {
      const {store} = this.treesStore
      for (const {value: node, index} of hp.iterateALL(this.getAllNodesByPath(path), {reverse: true})) {
        const currentPath = path.slice(0, index + 1)
        const draggableOpt = node.$draggable !== undefined ? node.$draggable : this.eachDraggable
        const draggable = hp.resolveValueOrGettter(draggableOpt, [currentPath, this, store])
        if (draggable === undefined) {
          continue
        } else {
          return draggable
        }
      }
      return true
    },
    isNodeDroppable(node, path) {
      const {store} = this.treesStore
      const allNodes = this.getAllNodesByPath(path)
      allNodes.unshift(this.rootNode)
      for (const {value: node, index} of hp.iterateALL(allNodes, {reverse: true})) {
        const currentPath = path.slice(0, index + 1)
        const droppableOpt = node.$droppable !== undefined ? node.$droppable : this.eachDroppable
        const droppable = hp.resolveValueOrGettter(droppableOpt, [currentPath, this, store])
        if (droppable === undefined) {
          continue
        } else {
          return droppable
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
    const options = this._draggableOptions = {
      indent: this.indent,
      triggerClass: this.triggerClass,
      unfoldWhenDragover: this.unfoldWhenDragover,
      treeClass: 'he-tree',
      rootClass: 'tree-root',
      childrenClass: 'tree-children',
      branchClass: 'tree-branch',
      nodeClass: 'tree-node',
      nodeBackClass: 'tree-node-back',
      placeholderClass: 'tree-placeholder',
      placeholderNodeBackClass: 'tree-placeholder-node-back',
      placeholderNodeClass: 'tree-placeholder-node',
      hiddenClass: 'hidden',
      draggingClass: 'dragging',
      placeholderId: `he_tree_drag_placeholder`,
      ifNodeFolded: (branchEl, store) => {
         const {targetTree} = store
         const node = targetTree.getNodeByBranchEl(branchEl)
         return node.$folded
      },
      isTargetTreeRootDroppable: (store) => {
        const droppable = hp.resolveValueOrGettter(store.targetTree.rootNode.$droppable, [store.targetTree, store])
        if (droppable !== undefined) {
          return droppable
        }
        return true
      },
      unfoldTargetNodeByEl: (...args) => this._Draggable_unfoldTargetNodeByEl(...args),
      isNodeParentDroppable: (branchEl, treeEl) => {
        const tree = this.getTreeVmByTreeEl(treeEl)
        const path = tree.getPathByBranchEl(branchEl)
        const parentPath = hp.arrayWithoutEnd(path, 1)
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
        const findPath = hp.arrayWithoutEnd(path, 2) // no node and its parent
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
        this.treesStore.store = store
        store.startTree = this.getTreeVmByTreeEl(store.startTreeEl)
        const draggable = hp.resolveValueOrGettter(store.startTree.draggable, [store.startTree, store])
        if (!draggable) {
          return false
        }
      },
      ondrag: (store) => {
        const {startTree, dragBranchEl, startPath} = store
        const path = startTree.getPathByBranchEl(dragBranchEl)
        store.dragNode = startTree.getNodeByPath(path)
        if (!startTree.isNodeDraggable(store.dragNode, path)) {
          return false
        }
        if (startTree.hasHook('ondragstart') && startTree.executeHook('ondragstart', [startTree, store]) === false) {
          return false
        }
        store.startTree.$emit('drag', store)
        this.$root.$emit('he-tree-drag', store)
      },
      filterTargetTree: (targetTreeEl, store) => {
        const targetTree = this.getTreeVmByTreeEl(targetTreeEl)
        const {startTree} = store
        if (startTree !== targetTree) {
          // start tree or target tree not crossTree
          if (!hp.resolveValueOrGettter(startTree.crossTree, [startTree, store]) || !hp.resolveValueOrGettter(targetTree.crossTree, [targetTree, store])) {
            return false
          }
        }
        const targetTreeDroppable = hp.resolveValueOrGettter(targetTree.droppable, [targetTree, store])
        if (!targetTreeDroppable) {
          return false
        }
        store.targetTree = targetTree
      },
      beforeDrop: (pathChanged, store) => {
        const {targetTree} = store
        if (targetTree.hasHook('ondragend') && targetTree.executeHook('ondragend', [targetTree, store]) === false) {
          return false
        }
        targetTree.$emit('drop', store)
        this.$root.$emit('he-tree-drop', store)
      },
      ondrop: (store, t) => {
        if (store.pathChanged) {
          const {startTree, targetTree, startPath, targetPath, dragNode} = store
          // remove from start position
          const startParentPath = hp.arrayWithoutEnd(startPath, 1)
          const startParent = startTree.getNodeByPath(startParentPath)
          const startSiblings = startParent ? startParent.children : startTree.treeData
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
          const targetParentPath = hp.arrayWithoutEnd(targetPath, 1)
          const targetParent = targetTree.getNodeByPath(targetParentPath)
          let targetSiblings
          if (targetParent) {
            if (!targetParent.children) {
              this.$set(targetParent, 'children', [])
            }
            targetSiblings = targetParent.children
          } else {
            targetSiblings = targetTree.treeData
          }
          const targetIndex = hp.arrayLast(targetPath)
          targetSiblings.splice(targetIndex, 0, dragNode)
          // emit event
          startTree.$emit('input', startTree.treeData)
          startTree.$emit('change')
          if (targetTree !== startTree) {
            targetTree.$emit('input', targetTree.treeData)
            targetTree.$emit('change')
          }
          return new Promise((resolve, reject) => {
            targetTree.$nextTick(() => {
              resolve()
            })
          })
        }
      },
    }
    const _makeTreeDraggable_obj = this._makeTreeDraggable_obj = makeTreeDraggable(this.$el, options);
    // watch props and update options
    ['indent', 'triggerClass', 'unfoldWhenDragover'].forEach(name => {
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
.he-tree .dragging .tree-node-back:hover{
  background-color: inherit;
}
</style>
