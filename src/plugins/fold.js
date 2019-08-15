import * as th from 'tree-helper'

export default {
  methods: {
    fold(node) {
      const meta = this.getMetaByNode(node)
      node.folded = true
    },
    unfold(node, opt = {}) {
      opt = {
        unfoldParent: true,
        ...opt,
      }
      if (opt.foldOthers) {
        this.foldAll()
      }
      const meta = this.getMetaByNode(node)
      meta.folded = false
      if (meta.parent && opt.unfoldParent) {
        this.unfold(meta.parent, opt)
      }
    },
    foldAll() {
      th.depthFirstSearch(this.root.nodes, (childNode) => {
        this.fold(childNode)
      })
    },
    unfoldAll() {
      th.depthFirstSearch(this.root.nodes, (childNode) => {
        this.unfold(childNode, {unfoldParent: false})
      })
    },
  }
}
