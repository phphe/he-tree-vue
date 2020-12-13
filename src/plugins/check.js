import * as ut from '../utils.js'

export default {
  props: {},
  methods: {
    afterCheckChanged(node, path) {
      // update parent
      const nodes = this.getAllNodesByPath(path)
      const reversedParents = nodes.slice(0, nodes.length - 1)
      reversedParents.reverse()
      for (const parent of reversedParents) {
        parent['$checked'] = parent.children.every(child => child.$checked)
      }
      // update children
      if (node.children && node.children.length > 0) {
        ut.walkTreeData(node.children, (childNode) => {
          childNode['$checked'] = node.$checked
        })
      }
    },
    check(node, path) {
      node['$checked'] = true
      this.afterCheckChanged(node, path)
    },
    uncheck(node, path) {
      node['$checked'] = false
      this.afterCheckChanged(node, path)
    },
    toggleCheck(node, path) {
      node['$checked'] = !node.$checked
      this.afterCheckChanged(node, path)
    },
  },
}
