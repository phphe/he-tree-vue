<script>
import * as hp from 'helper-js'
import makeTreeDraggable from './draggable.js'

export default {
  props: {
    indent: {default: 20},
    triggerClass: {type: String, default: 'tree-node'},
    triggerBySelf: {type: Boolean},
    draggable: {type: Boolean, default: true},
    ondragstart: {type: Function},
    ondragend: {type: Function},
    // todo
    droppable: {type: Boolean, default: true},
    crossTree: {},
  },
  // components: {},
  // data() {
  //   return {}
  // },
  // computed: {},
  // watch: {},
  methods: {
    _Draggable_unfoldNodeByID(DOMIdOrID) {
      const meta = this.getMetaByID(DOMIdOrID)
      if (meta) {
        meta.folded = false
      }
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          resolve()
        })
      })
    },
    _Draggable_DOMPathToNodePath(DOMPath) {
      const {tree, parentIds, index} = DOMPath
      // resolve indexes
      const indexes = []
      let cur = tree.value
      for (const pid of parentIds) {
        let index
        if (!cur) {
          break
        }
        for (let i = 0; i < cur.length; i++) {
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
        tree: this.root.trees.find(tree2 => tree2.$el === tree),
        parent: parentIds.length > 0 ? this.getNodeByID(hp.arrayLast(parentIds)) : null,
        index,
        indexes,
      }
    },
    getNodeByIndexPath(indexes, rootData = this.root.value) {
      let cur
      let children = rootData
      for (const index of indexes) {
        cur = children[index]
        children = cur.children
      }
      return cur
    },
  },
  // created() {},
  mounted() {
    if (this.isRoot) {
      const options = this. _draggableOptions = {
        indent: this.indent,
        triggerBySelf: this.triggerBySelf,
        triggerClass: this.triggerClass,
        beforeDrag: (store) => this.root.draggable,
        ondrag: (store) => {
          store.dragNode = this.getNodeByID(store.el.getAttribute('id'))
          store.fromTree = this
          store.dragPath = this._Draggable_DOMPathToNodePath(store.dragDOMPath)
          if (this.ondragstart && this.ondragstart(store) === false) {
            return false
          }
          this.$emit('drag', store)
        },
        unfoldNodeByID: (...args) => this._Draggable_unfoldNodeByID(...args),
        beforeDrop: (pathChanged, store) => {
          store.dropPath = this._Draggable_DOMPathToNodePath(store.dropDOMPath)
          if (this.ondragend && this.ondragend(pathChanged, store) === false) {
            return false
          }
          this.$emit('drop', store)
        },
        ondrop: (pathChanged, store) => {
          const {dropPath} = store
          if (pathChanged) {
            const {dragNode, dragPath} = store
            const siblings = this.getNodeSiblings(store.dragNode, this.root)
            if (dropPath.tree.dataModification === 'modify_old') {
              siblings.splice(dragPath.index, 1)
              const dropParent = dropPath.parent
              if (dropParent && !dropParent.children) {
                this.$set(dropParent, 'children', [])
              }
              const dropSiblings = dropParent ? dropParent.children : this.root.value
              let dropIndex = dropPath.index
              if (siblings === dropSiblings && dragPath.index < dropPath.index) {
                dropIndex -= 1
              }
              dropSiblings.splice(dropIndex, 0, dragNode)
            } else if (dropPath.tree.dataModification === 'new') {
              const treeData = this.cloneTreeData(this.root.value)
              const parentIndexes = dragPath.indexes.slice(0, dragPath.indexes.length - 1)
              const dragNodeParent = this.getNodeByIndexPath(parentIndexes, treeData)
              const siblings = dragNodeParent ? dragNodeParent.children : treeData
              const dragNode = siblings[dragPath.index]
              siblings.splice(dragPath.index, 1)
              const dropParentIndexes = dropPath.indexes.slice(0, dropPath.indexes.length - 1)
              const dropParent = this.getNodeByIndexPath(dropParentIndexes, treeData)
              if (dropParent && !dropParent.children) {
                dropParent.children = []
              }
              const dropSiblings = dropParent ? dropParent.children : treeData
              let dropIndex = dropPath.index
              if (siblings === dropSiblings && dragPath.index < dropPath.index) {
                dropIndex -= 1
              }
              dropSiblings.splice(dropIndex, 0, dragNode)
              store.newDropTreeData = treeData
            }
            return hp.waitTime(60)
          }
        },
        afterDrop: (pathChanged, store) => {
          const {dropPath} = store
          const evt = Object.assign({}, store)
          evt.isDragTree = true
          evt.isDropTree = true
          evt.isCrossTree = false
          let newData
          if (pathChanged && this.root.dataModification === 'new') {
            newData = store.newDropTreeData
          } else {
            newData = store.dropPath.tree.value
          }
          evt.newData = newData
          if (pathChanged) {
            this.$emit('input', newData)
            this.$emit('change', evt)
          }
          this.$emit('afterDrop', evt)
        },
      }
      makeTreeDraggable(this.$el, options);
      // watch props and update options
      ['triggerBySelf', 'triggerClass'].forEach(name => {
        this.$watch(name, (value) => { options[name] = value })
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
