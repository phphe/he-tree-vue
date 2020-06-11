<script>
import * as hp from 'helper-js'
import * as ut from '../../utils'
import makeTreeDraggable from './draggable.js'

const treesStore = {}

export default {
  props: {
    triggerClass: {type: [String, Array], default: 'tree-node'},
    triggerBySelf: {type: Boolean},
    draggable: {type: [Boolean, Function], default: true},
    droppable: {type: [Boolean, Function], default: true},
    eachDraggable: {type: [Function]}, // type: [Boolean, Function]
    eachDroppable: {type: [Function]}, // type: [Boolean, Function]
    ondragstart: {type: Function},
    ondragend: {type: Function},
    unfoldWhenDragover: {type: Boolean, default: true},
    unfoldWhenDragoverDelay: {type: Number, default: 30},
    draggingNodePositionMode: {type: String, default: 'top_left_corner'}, // top_left_corner, mouse
    edgeScroll: {type: Boolean},
    edgeScrollTriggerMargin: {type: Number, default: 50},
    edgeScrollSpeed: {type: Number, default: 0.35},
    edgeScrollTriggerMode: {type: String, default: 'top_left_corner'},
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
    isNodeDraggable(node, path) {
      const {store} = this.treesStore
      const allNodes = this.getAllNodesByPath(path)
      allNodes.unshift(this.rootNode)
      for (const {value: node, index} of hp.iterateAll(allNodes, {reverse: true})) {
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
      let droppableFinal, resolved
      for (const {value: node, index} of hp.iterateAll(allNodes, {reverse: true})) {
        const currentPath = path.slice(0, index + 1)
        const droppableOpt = node.$droppable !== undefined ? node.$droppable : this.eachDroppable
        const droppable = hp.resolveValueOrGettter(droppableOpt, [currentPath, this, store])
        if (droppable === undefined) {
          continue
        } else {
          droppableFinal = droppable
          resolved = true
          break
        }
      }
      if (!resolved) {
        droppableFinal = true
      }
      if (this._internal_hook_isNodeDroppable) {
        return this._internal_hook_isNodeDroppable({droppableFinal, node, path, store})
      }
      return droppableFinal
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
      for (const {value: el, index: index2} of hp.iterateAll(branchEl.parentElement.children)) {
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
      triggerBySelf: this.triggerBySelf,
      unfoldWhenDragover: this.unfoldWhenDragover,
      unfoldWhenDragoverDelay: this.unfoldWhenDragoverDelay,
      draggingNodePositionMode: this.draggingNodePositionMode,
      cloneWhenDrag: this.cloneWhenDrag,
      edgeScroll: this.edgeScroll,
      edgeScrollTriggerMargin: this.edgeScrollTriggerMargin,
      edgeScrollSpeed: this.edgeScrollSpeed,
      edgeScrollTriggerMode: this.edgeScrollTriggerMode,
      rtl: this.rtl,
      treeClass: 'he-tree',
      rootClass: 'tree-root',
      childrenClass: 'tree-children',
      branchClass: 'tree-branch',
      nodeClass: 'tree-node',
      nodeBackClass: 'tree-node-back',
      placeholderClass: 'tree-placeholder',
      placeholderNodeBackClass: 'tree-placeholder-node-back',
      placeholderNodeClass: 'tree-placeholder-node',
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
        const findPath = hp.arrayWithoutEnd(path, 1)
        let cur = path
        for (const {node, path} of tree.iteratePath(findPath, {reverse: true})) {
          if (tree.isNodeDroppable(node, path)) {
            return tree.getBranchElByPath(cur)
          } else {
            cur = path
          }
        }
        if (tree.isNodeDroppable(this.rootNode, [])) {
          return tree.getBranchElByPath(cur)
        }
      },
      afterPlaceholderCreated: (store) => {
        store.startTree.$emit('afterPlaceholderCreated', store)
      },
      getPathByBranchEl: (branchEl) => this.getPathByBranchEl(branchEl),
      beforeFirstMove: (store) => {
        this.treesStore.store = store
        store.startTree = this.getTreeVmByTreeEl(store.startTreeEl)
        const draggable = hp.resolveValueOrGettter(store.startTree.draggable, [store.startTree, store])
        if (!draggable) {
          return false
        }
        const {startTree, dragBranchEl, startPath} = store
        store.dragNode = startTree.getNodeByPath(startPath)
        if (this.cloneWhenDrag) {
          store.dragNode = ut.cloneTreeData(store.dragNode)
        }
        if (!startTree.isNodeDraggable(store.dragNode, startPath)) {
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
          if (this._internal_hook_filterTargetTree) {
            if (this._internal_hook_filterTargetTree(targetTree, store) === false) {
              return false
            }
          } else {
            return false
          }
        }
        const targetTreeDroppable = hp.resolveValueOrGettter(targetTree.droppable, [targetTree, store])
        if (!targetTreeDroppable) {
          return false
        }
        store.targetTree = targetTree
        if (!hp.resolveValueOrGettter(store.startTree===store.targetTree) && hp.resolveValueOrGettter(this._Draggable_unfoldTargetNode, [false, this.treeData]) !== this.rootNode.children) {
          return false
        }
      },
      beforeDrop: (pathChanged, store) => {
        const {targetTree} = store
        if (targetTree.hasHook('ondragend') && targetTree.executeHook('ondragend', [targetTree, store]) === false) {
          return false
        }
        targetTree.$emit('drop', store)
        this.$root.$emit('he-tree-drop', store)
      },
      afterDrop: (store, t) => {
        if (store.pathChanged) {
          const {startTree, targetTree, startPath, targetPath, dragNode} = store
          if (this.cloneWhenDrag !== true) {
            // remove from start position
            const startParentPath = hp.arrayWithoutEnd(startPath, 1)
            const startParent = startTree.getNodeByPath(startParentPath)
            const startSiblings = startParentPath.length === 0 ? startTree.treeData : startParent.children
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
          }
          // insert to target position
          const targetParentPath = hp.arrayWithoutEnd(targetPath, 1)
          const targetParent = targetTree.getNodeByPath(targetParentPath)
          let targetSiblings
          if (targetParentPath.length === 0) {
            targetSiblings = targetTree.treeData
          } else {
            if (!targetParent.children) {
              this.$set(targetParent, 'children', [])
            }
            targetSiblings = targetParent.children
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
    ['indent', 
    'triggerClass', 
    'triggerBySelf', 
    'unfoldWhenDragover', 
    'unfoldWhenDragoverDelay', 
    'draggingNodePositionMode', 
    'cloneWhenDrag', 
    'edgeScroll', 'edgeScrollTriggerMargin', 'edgeScrollSpeed', 'edgeScrollTriggerMode', 
    'rtl'
    ].forEach(name => {
      this.$watch(name, (value) => {
        _makeTreeDraggable_obj.options[name] = value
        _makeTreeDraggable_obj.optionsUpdated()
      })
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
