import * as th from 'tree-helper'

export default {
  props: {
    foldingTransition: {},
    unfoldAllAtBeginning: {type: Boolean},
  },
  methods: {
    fold(node) {
      const meta = this.getMetaByNode(node)
      meta.folded = true
    },
    unfold(node, opt = {}) {
      opt = {
        unfoldParent: true,
        foldOthers: false,
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
    toggleFold(node, opt) {
      const meta = this.getMetaByNode(node)
      if (meta.folded) {
        this.unfold(node, opt)
      } else {
        this.fold(node, opt)
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
  },
  afterMetaCreated(meta) {
    meta.folded = !this.root.unfoldAllAtBeginning
  },
}
