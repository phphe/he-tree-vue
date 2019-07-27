<template lang="pug">
.he-tree.tree
  .tree-branch(v-for="(node, i) in nodes" :key="metas[i].id" :class="[metas[i].folded ? root.foldedClass : root.unfoldedClass]")
    slot(:node="node" :meta="metas[i]" :root="root")
      .tree-node {{node.text}}
    transition(v-if="node.children && node.children.length > 0" :name="root.foldingTransition")
      Tree.tree-children(v-if="!metas[i].folded" :value="node.children" :privateProps="childPrivateProps")
</template>

<script>
import * as hp from 'helper-js'
import * as th from 'tree-helper'

export default {
  name: 'Tree',
  props: {
    value: {},
    foldedClass: {default: 'folded'},
    unfoldedClass: {default: 'unfolded'},
    foldingTransition: {},
    foldAllAtBeginning: {type: Boolean},
    privateProps: {},
    idMode: {default: 'object'}, // object, id(node must has id)
  },
  // components: {},
  data() {
    return {
      metas: [], // metas of current level nodes
    }
  },
  computed: {
    root() { return this.privateProps && this.privateProps.root || this },
    nodes() { return this.value || [] },
    childPrivateProps() {
      return {
        root: this.root
      }
    },
  },
  watch: {},
  methods: {
    nodesWatcher(nodes, oldNodes) {
      if (oldNodes) {
        // removed metas
        if (this.root.idMode === 'id') {
          const t = {}
          nodes.forEach(node => {t[node.id]=true})
          oldNodes.forEach(node => {
            if (!t[node.id]) {
              // delete node and children meta
              th.depthFirstSearch(node, (childNode) => {
                delete this.root.metaMap[childNode.id]
              })
            }
          })
        } else {
          const t = new Map()
          nodes.forEach(node => t.set(node, null))
          oldNodes.forEach(node => {
            if (!t.has(node)) {
              // delete node and children meta
              th.depthFirstSearch(node, (childNode) => {
                this.root.metaMap.delete(childNode)
              })
            }
          })
        }
      }
      //
      this.metas = nodes.map(node => (this.idMode === 'id' ? this.root.metaMap[node.id] : this.root.metaMap.get(node)) || {
        id: `he_tree_node_${node.id || hp.strRand()}`,
        folded: this.root.foldAllAtBeginning,
      })
    },
  },
  created() {
    if (this === this.root) {
      this.metaMap = this.idMode === 'id' ? {} : new Map()
    }
    this.$watch('nodes', (...args) => this.nodesWatcher(...args), {immediate: true})
  },
  // mounted() {},
  // beforeDestroy() {},
}
</script>

<style>
.he-tree .tree-children{
  padding-left: 20px;
}
</style>
