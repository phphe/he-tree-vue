export default {
  props: {
    foldingTransitionName: {type: String},
    foldingTransition: {},
    foldAllAfterMounted: {type: Boolean},
  },
  methods: {
    fold(node, path) {
      if (!node.$folded) {
        this.$set(node, '$folded', true)
      }
    },
    unfold(node, path, opt = {}) {
      opt = {
        unfoldParent: true,
        foldOthers: false,
        ...opt,
      }
      if (opt.foldOthers) {
        this.foldAll()
      }
      if (node.$folded) {
        this.$set(node, '$folded', false)
      }
      if (opt.unfoldParent && path.length > 1) {
        const parentPath = path.slice(0, path.length - 1)
        const parent = this.getNodeByPath(parentPath)
        this.unfold(parent, parentPath, opt)
      }
    },
    toggleFold(node, path, opt) {
      if (node.$folded) {
        this.unfold(node, path, opt)
      } else {
        this.fold(node, path, opt)
      }
    },
    foldAll() {
      this.walkTreeData((childNode) => {
        this.fold(childNode)
      })
    },
    unfoldAll() {
      this.walkTreeData((childNode) => {
        this.unfold(childNode, {unfoldParent: false})
      })
    },
  },
  mounted() {
    if (this.foldAllAfterMounted) {
      this.foldAll()
    }
  },
}
