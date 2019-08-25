// todo add 遍历children和遍历parent方法到tree作基本方法
import * as th from 'tree-helper'

export default {
  props: {},
  methods: {
    afterCheckChanged(node) {
      const meta = this.getMetaByNode(node)
      // update parent
      let cur = meta.parent
      while (cur) {
        const curMeta = this.getMetaByNode(cur)
        curMeta.checked = cur.children.every(node2 => this.getMetaByNode(node2).checked)
        cur = curMeta.parent
      }
      // update children
      if (node.children && node.children.length > 0) {
        th.depthFirstSearch(node.children, (childNode) => {
          this.getMetaByNode(childNode).checked = meta.checked
        })
      }
    },
    check(node) {
      const meta = this.getMetaByNode(node)
      node.checked = true
      this.afterCheckChanged(node)
    },
    uncheck(node) {
      const meta = this.getMetaByNode(node)
      node.checked = false
      this.afterCheckChanged(node)
    },
    toggleCheck(node) {
      const meta = this.getMetaByNode(node)
      if (meta.checked) {
        this.uncheck(node)
      } else {
        this.check(node)
      }
    },
  },
  afterMetaCreated(meta) {
    meta.checked = false
  },
}
