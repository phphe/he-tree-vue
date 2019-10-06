<template lang="pug">
.tree-children(:class="{'he-tree tree-root': isRoot}")
  .tree-branch(v-for="(node, i) in nodes" :key="metas[i].id" :id="metas[i].DOMId")
    .tree-node
      slot(:node="node" :meta="metas[i]" :root="root") {{node.text}}
    transition(v-if="node.children && node.children.length > 0" :name="root.foldingTransition")
      Tree(v-if="!metas[i].folded" :value="node.children" :privateProps="{...childPrivateProps, parent: node}")
        template(slot-scope="props")
          slot(:node="props.node" :meta="props.meta" :root="props.root") {{node.text}}
</template>

<script>
import * as hp from 'helper-js'
import * as th from 'tree-helper'

const DOM_ID_PREFIX = 'he_tree_branch_'
const Tree = {
  name: 'Tree',
  props: {
    value: {},
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
    isRoot() { return this.root === this },
    level() { return this.privateProps ? this.privateProps.level : 1 },
    parent() { return this.privateProps && this.privateProps.parent },
    nodes() { return this.value || [] },
    childPrivateProps() {
      return {
        root: this.root,
        level: this.level + 1,
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
                delete this.root.idMap[childNode.id]
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
                const meta = this.root.metaMap.get(childNode)
                this.root.metaMap.delete(childNode)
                delete this.root.idMap[meta.id]
              })
            }
          })
        }
      }
      //
      this.metas = nodes.map(node => {
        const oldMeta = this.idMode === 'id' ? this.root.metaMap[node.id] : this.root.metaMap.get(node)
        const newMeta = {}
        Object.assign(newMeta, oldMeta)
        const id = newMeta.id || node.id || hp.strRand()
        Object.assign(newMeta, {
          id,
          DOMId: `${DOM_ID_PREFIX}${id}`,
          parent: this.parent,
          level: this.level,
        })
        if (this.$options._afterMetaCreateds) {
          for (const func of this.$options._afterMetaCreateds) {
            func.call(this, newMeta, node)
          }
        }
        if (this.idMode === 'id') {
          this.root.metaMap[id] = newMeta
        } else {
          this.root.metaMap.set(node, newMeta)
        }
        this.root.idMap[id] = node
        return newMeta
      })
    },
    getMetaByNode(node) {
      return this.root.idMode === 'id' ? this.root.metaMap[node.id] : this.root.metaMap.get(node)
    },
    // by DOMId or ID
    getNodeByID(DOMIdOrID) {
      if (DOMIdOrID.startsWith(DOM_ID_PREFIX)) {
        DOMIdOrID = DOMIdOrID.substring(DOM_ID_PREFIX.length)
      }
      return this.root.idMap[DOMIdOrID]
    },
    getMetaByID(DOMIdOrID) {
      const node = this.getNodeByID(DOMIdOrID)
      return this.getMetaByNode(node)
    },
    * iterateParents(node, opt = {}) {
      if (opt.withSelf) {
        yield node
      }
      let cur = this.getMetaByNode(node).parent
      while (cur) {
        yield cur
        cur = this.getMetaByNode(cur).parent
      }
    },
  },
  created() {
    if (this === this.root) {
      this.metaMap = this.idMode === 'id' ? {} : new Map()
      this.idMap = {}
    }
    this.$watch(() => [this.nodes, this.level], (newArr, old) => {
      const nodes = newArr[0]
      const oldNodes = old && old[0]
      this.nodesWatcher(nodes, oldNodes)
    }, {immediate: true})
  },
  // mounted() {},
  // beforeDestroy() {},

  //
  mixPlugins(plugins) {
    const MixedTree = {
      name: 'Tree',
      extends: Tree,
      mixins: plugins,
    }
    MixedTree._afterMetaCreateds = plugins.map(v => v.afterMetaCreated).filter(v => v)
    return MixedTree
  },
}
export default Tree

// todo move to helper-js
// currying
function joinFunctions(funcs) {
  return function (...args) {
    let result = args
    for (const func of funcs) {
      result = func.call(this, ...result)
    }
    return result
  }
}
</script>

<style>
.he-tree{
  padding: 30px;
  border: 1px solid #ccc;
}
.he-tree .tree-children{
  padding-left: 20px;
}
.he-tree .tree-node{
  border: 1px solid #ccc;
  margin-bottom: 5px;
  padding: 5px;
}
</style>
