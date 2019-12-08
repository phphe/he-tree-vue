<script>
import * as hp from 'helper-js'
export default {
  methods: {
    showNodeBack(node) {
      const meta = this.getMetaByNode(node)
      const branch = document.getElementById(meta.DOMId)
      const nodeEl = branch.querySelector(`.tree-node`)
      if (!nodeEl._NodeBack_el) {
        const back = document.createElement('DIV')
        hp.addClass(back, 'node-back')
        nodeEl._NodeBack_el = back
      }
      const back = nodeEl._NodeBack_el
      const update = () => {
        const tree = hp.findParent(nodeEl, (el) => hp.hasClass(el, 'tree-root'))
        const treeRect = hp.getBoundingClientRect(tree)
        const treeOffset = hp.getOffset(tree)
        const nodeElRect = hp.getBoundingClientRect(nodeEl)
        const nodeElOffset = hp.getOffset(nodeEl)
        const backOffset = {x: treeOffset.x, y: nodeElOffset.y}
        hp.prependTo(back, tree)
        const backPosition = hp.getPositionFromOffset(back, backOffset)
        back.style.top = `${backPosition.y}px`
        back.style.left = `${backPosition.x}px`
        back.style.width = `${treeRect.width}px`
        back.style.height = `${nodeElRect.height}px`
      }
      update()
    },
    hideNodeBack(node) {
      const meta = this.getMetaByNode(node)
      const branch = document.getElementById(meta.DOMId)
      const nodeEl = branch.querySelector(`.tree-node`)
      if (nodeEl._NodeBack_el) {
        hp.removeEl(nodeEl._NodeBack_el)
        nodeEl._NodeBack_el = null
      }
    },
  },
}
</script>

<style>
.he-tree .node-back{
  position: absolute;
  background: #f1f1f1;
  z-index: -1;
}
</style>
