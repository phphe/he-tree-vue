<script>
import * as hp from 'helper-js'
export default {
  data() {
    return {
      nodeBackEnabled: true,
    }
  },
  methods: {
    showNodeBack(path, opt = {}) {
      /*
      opt
        persistent
       */
      if (!this.nodeBackEnabled) {
        // disabled
        return
      }
      let nodeEl = opt.nodeEl
      if (!nodeEl) {
        // get by path
        nodeEl = this.getBranchElByPath(path).querySelector('.tree-node')
      }
      if (!nodeEl._NodeBack_el) {
        const back = document.createElement('DIV')
        hp.addClass(back, 'node-back')
        if (opt.class) {
          hp.addClass(back, opt.class)
        }
        if (opt.style) {
          if (hp.isObject(opt.style)) {
            Object.keys(opt.style),forEach(key => {
              back.style[key] = opt.style[key]
            })
          } else {
            back.setAttribute('style', opt.style)
          }
        }
        nodeEl._NodeBack_el = back
      }
      const back = nodeEl._NodeBack_el
      back._NodeBackOptions = Object.assign(opt, back._NodeBackOptions)
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
    hideNodeBack(path, opt = {}) {
      let nodeEl = opt.nodeEl
      if (!nodeEl) {
        // get by path
        nodeEl = this.getBranchElByPath(path).querySelector('.tree-node')
      }
      if (nodeEl._NodeBack_el) {
        if (opt._byFunction && nodeEl._NodeBack_el._NodeBackOptions.persistent) {
          // can't hide if called by function
          // 非手动触发隐藏时, 不能隐藏持久化的(persistent=true)
        } else {
          hp.removeEl(nodeEl._NodeBack_el)
          nodeEl._NodeBack_el = null
        }
      }
    },
    enableNodeBack() {
      this.nodeBackEnabled = true
    },
    disableNodeBack() {
      for (const {value: el} of hp.iterateALL(this.$el.querySelectorAll(`.node-back`))) {
        hp.removeEl(el)
      }
      this.nodeBackEnabled = false
    },
  },
  mounted() {
    const onmouseover = (e) => {
      const el = e.target
      if (hp.hasClass(el, 'tree-node')) {
        if (el === this._enteredNodeEl) {
          // out
          this.hideNodeBack(null, {nodeEl: el, _byFunction: true})
          this._enteredNodeEl = null
        } else {
          if (this._enteredNodeEl) {
            // out
            this.hideNodeBack(null, {nodeEl: this._enteredNodeEl, _byFunction: true})
          }
          // enter
          this._enteredNodeEl = el
          this.showNodeBack(null, {nodeEl: el})
        }
      }
    }
    hp.onDOM(this.$el, 'mouseover', onmouseover)
    const destroy = () => {
      hp.offDOM(this.$el, 'mouseover', onmouseover)
    }
    this.$on('hook:beforeDestroy', destroy)
    //
    const ondrag = () => {
      this.disableNodeBack()
    }
    const ondrop = () => {
      this.enableNodeBack()
    }
    this.$root.$on('he-tree-drag', ondrag)
    this.$root.$on('he-tree-drop', ondrop)
    this.$on('hook:beforeDestroy', () => {
      this.$root.$off('he-tree-drag', ondrag)
      this.$root.$off('he-tree-drop', ondrop)
    })
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
