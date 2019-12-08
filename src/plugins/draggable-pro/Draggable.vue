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
    // todo right position
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
    _Draggable_unfoldNodeByID(DOMIdOrID, store) {
      const {targetTree} = store
      const meta = targetTree.getMetaByID(DOMIdOrID)
      if (meta) {
        meta.folded = false
      }
      return new Promise((resolve, reject) => {
        targetTree.$nextTick(() => {
          resolve()
        })
      })
    },
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
    getNodeByIndexPath(indexes, rootData = this.root.value) {
      let cur
      let children = rootData
      for (const index of indexes) {
        cur = children[index]
        children = cur.children
      }
      return cur
    },
    isNodeDroppable(node, tree = this.root) {
      let cur = node
      while (true) {
        if (!cur) {
          return Boolean(tree.rootDroppable)
        } else {
          const meta = tree.getMetaByNode(cur)
          if (meta.droppable == null) {
            cur = tree.getNodeParent(cur)
          } else {
            return meta.droppable
          }
        }
      }
    },
  },
  // created() {},
  mounted() {
    if (this.isRoot) {
      const options = this. _draggableOptions = {
        indent: this.indent,
        triggerClass: this.triggerClass,
        placeholderId: `${this.DOM_ID_PREFIX}_placeholder`,
        ifNodeFoldedAndWithChildrenAndNotAutoUnfold: (nodeEl, store) => {
           const {targetTree} = store
           const DOMId = nodeEl.getAttribute('id')
           const node = targetTree.getNodeByID(DOMId)
           const meta = targetTree.getMetaByNode(node)
           return meta.folded && node.children && node.children.length > 0 && !this.unfoldWhenDragover
        },
        isTargetTreeRootDroppable: (store) => store.targetTree.rootDroppable,
        unfoldNodeByID: (...args) => this._Draggable_unfoldNodeByID(...args),
        isNodeParentDroppable: (branchEl, treeEl) => {
          const tree = this.getTreeVmByTreeEl(treeEl)
          const node = tree.getNodeByID(branchEl.getAttribute('id'))
          const parent = tree.getNodeParent(node)
          return tree.isNodeDroppable(parent)
        },
        isNodeDroppable: (branchEl, treeEl) => {
          const tree = this.getTreeVmByTreeEl(treeEl)
          const node = tree.getNodeByID(branchEl.getAttribute('id'))
          return tree.isNodeDroppable(node)
        },
        _findClosestDroppablePosition: (branchEl, treeEl) => {
          const tree = this.getTreeVmByTreeEl(treeEl)
          const node = tree.getNodeByID(branchEl.getAttribute('id'))
          const parent = tree.getNodeParent(node)
          let cur = parent
          while (cur) {
            const parent = tree.getNodeParent(cur)
            if (tree.isNodeDroppable(parent)) {
              const DOMId = tree.getMetaByNode(cur).DOMId
              return tree.$el.querySelector(`[id='${DOMId}']`)
            } else {
              cur = parent
            }
          }
        },
        afterPlaceholderCreated: (store) => {
          store.startTree.$emit('afterPlaceholderCreated', store)
        },
        beforeDrag: (store) => {
          store.startTree = this.getTreeVmByTreeEl(store.startTreeEl)
          const draggable = tdhp.resolveValueOrGettter(store.startTree.draggable, [store])
          if (!draggable) {
            return false
          }
        },
        ondrag: (store) => {
          const {startTree} = store
          store.dragNode = startTree.getNodeByID(store.el.getAttribute('id'))
          store.startPath = this._Draggable_DOMPathToNodePath(store.startDOMPath)
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
          store.targetPath = this._Draggable_DOMPathToNodePath(store.targetDOMPath)
          const {targetTree} = store
          if (targetTree.hasHook('ondragend') && targetTree.executeHook('ondragend', [store]) === false) {
            return false
          }
          targetTree.$emit('drop', store)
        },
        ondrop: (pathChanged, store) => {
          const {targetPath, startTree, targetTree} = store
          if (pathChanged) {
            const {dragNode, startPath} = store
            const siblings = startTree.getNodeSiblings(store.dragNode)
            if (targetPath.tree.dataModification === 'modify_old') {
              siblings.splice(startPath.index, 1)
              const dropParent = targetPath.parent
              if (dropParent && !dropParent.children) {
                this.$set(dropParent, 'children', [])
              }
              const dropSiblings = dropParent ? dropParent.children : this.root.value
              let dropIndex = targetPath.index
              if (siblings === dropSiblings && startPath.index < targetPath.index) {
                dropIndex -= 1
              }
              dropSiblings.splice(dropIndex, 0, dragNode)
            } else if (targetPath.tree.dataModification === 'new') {
              const treeData = this.cloneTreeData(this.root.value)
              const parentIndexes = startPath.indexes.slice(0, startPath.indexes.length - 1)
              const dragNodeParent = this.getNodeByIndexPath(parentIndexes, treeData)
              const siblings = dragNodeParent ? dragNodeParent.children : treeData
              const dragNode = siblings[startPath.index]
              siblings.splice(startPath.index, 1)
              const dropParentIndexes = targetPath.indexes.slice(0, targetPath.indexes.length - 1)
              const dropParent = this.getNodeByIndexPath(dropParentIndexes, treeData)
              if (dropParent && !dropParent.children) {
                dropParent.children = []
              }
              const dropSiblings = dropParent ? dropParent.children : treeData
              let dropIndex = targetPath.index
              if (siblings === dropSiblings && startPath.index < targetPath.index) {
                dropIndex -= 1
              }
              dropSiblings.splice(dropIndex, 0, dragNode)
              store.newDropTreeData = treeData
            }
            return hp.waitTime(60)
          }
        },
        afterDrop: (pathChanged, store) => {
          const {targetPath} = store
          const evt = Object.assign({}, store)
          evt.isDragTree = true
          evt.isDropTree = true
          evt.isCrossTree = false
          let newData
          if (pathChanged && this.root.dataModification === 'new') {
            newData = store.newDropTreeData
          } else {
            newData = store.targetPath.tree.value
          }
          evt.newData = newData
          if (pathChanged) {
            this.$emit('input', newData)
            this.$emit('change', evt)
          }
          this.$emit('afterDrop', evt)
        },
      }
      const _makeTreeDraggable_obj = this._makeTreeDraggable_obj = makeTreeDraggable(this.$el, options);
      // watch props and update options
      ['triggerClass'].forEach(name => {
        this.$watch(name, (value) => { _makeTreeDraggable_obj.options[name] = value })
      })
    }
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
