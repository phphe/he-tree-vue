import { walkTreeData } from "../utils";

export function foldAll(treeData) {
  walkTreeData(treeData, childNode => {
    childNode.$folded = true
  })
}
export function unfoldAll(treeData) {
  walkTreeData(treeData, childNode => {
    childNode.$folded = false
  })
}

export default {
  props: {
    foldingTransitionName: {type: String},
    foldingTransition: {},
    foldAllAfterMounted: {type: Boolean},
  },
  emits: ['nodeFoldedChanged', 'node-folded-changed'],
  methods: {
    fold(node, path) {
      if (!node.$folded) {
        node['$folded'] = true
        this.$emit('nodeFoldedChanged', node)
        this.$emit('node-folded-changed', node)
      }
    },
    unfold(node, path, opt = {}) {
      opt = {
        foldOthers: false,
        ...opt,
      }
      if (opt.foldOthers) {
        this.foldAll()
      }
      if (node.$folded) {
        node['$folded'] = false
        this.$emit('nodeFoldedChanged', node)
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
