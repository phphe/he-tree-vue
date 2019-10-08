<script>
import * as hp from 'helper-js'
export default {
  methods: {
    NodeBack_onmouseenter(e) {
      const trigger = e.target
      const back = document.createElement('DIV')
      hp.addClass('node-back')
      const tree = hp.findParent(trigger, (el) => hp.hasClass(el, 'tree-root'))
      const treeRect = hp.getBoundingClientRect(tree)
      const treeOffset = hp.getOffset(tree)
      const triggerRect = hp.getBoundingClientRect(trigger)
      const triggerOffset = hp.getOffset(trigger)
      const backOffset = {x: treeOffset.x, y: triggerOffset.y}
      hp.prependTo(back, tree)
      const backPosition = hp.getPositionFromOffset(back, backOffset)
      back.style.top = `${backPosition.y}px`
      back.style.left = `${backPosition.x}px`
      back.style.width = `${treeRect.width}px`
      back.style.height = `${triggerRect.height}px`
      trigger._NodeBack_el = back
    },
    NodeBack_onmouseleave(e) {
      const trigger = e.target
      if (trigger._NodeBack_el) {
        hp.removeEl(trigger._NodeBack_el)
        trigger._NodeBack_el = null
      }
    },
  },
}
</script>

<style>
.he-tree .node-back{
  position: absolute;
  background: #f1f1f1;
}
</style>
