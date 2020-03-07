import Vue from 'vue'
import { walkTreeData } from "../utils";

export function foldAll(treeData) {
  walkTreeData(treeData, childNode => {
    Vue.set(childNode, '$folded', true)
  })
}
export function unfoldAll(treeData) {
  walkTreeData(treeData, childNode => {
    Vue.set(childNode, '$folded', false)
  })
}

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
        foldOthers: false,
        ...opt,
      }
      if (opt.foldOthers) {
        this.foldAll()
      }
      if (node.$folded) {
        this.$set(node, '$folded', false)
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
