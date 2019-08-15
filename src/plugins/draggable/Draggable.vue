<script>
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
  // methods: {},
  // created() {},
  mounted() {
    if (this.isRoot) {
      makeTreeDraggable(this.$el, {
        indent: this.indent,
        unfoldNodeByID: (...args) => this.unfoldNodeByID(...args),
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
