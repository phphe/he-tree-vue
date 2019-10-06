<script>
import * as hp from 'helper-js'
import makeTreeDraggable from './draggable.js'

export default {
  props: {
    indent: {default: 20},
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
  },
  // created() {},
  mounted() {
    if (this.isRoot) {
      makeTreeDraggable(this.$el, {
        indent: this.indent,
        ondrag: (store) => {},
        unfoldNodeByID: (...args) => this._Draggable_unfoldNodeByID(...args),
        ondrop: (pathChanged, store) => {
          const dragNode = this.getNodeByID(store.el.getAttribute('id'))
          const dragNodeMeta = this.getMetaByNode(dragNode)
          const dragChildren = dragNodeMeta.parent ? dragNodeMeta.parent.children : this.root.nodes
          dragChildren.splice(store.dragPath.index, 1)
          const dropParent = store.dropPath.parentIds.length > 0 ? this.getNodeByID(hp.arrayLast(store.dropPath.parentIds)) : this.root
          if (dropParent !== this.root && !dropParent.children) {
            this.$set(dropParent, 'children', [])
          }
          const dropChildren = dropParent === this.root ? this.root.nodes : dropParent.children
          dropChildren.splice(store.dropPath.index, 0, dragNode)
        },
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
