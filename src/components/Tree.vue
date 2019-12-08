<template lang="pug">
.tree-children(:class="{'he-tree tree-root': isRoot}" :data-tree-id="_uid")
  .tree-branch(v-for="(node, i) in nodes" :key="metas[i].id" :id="metas[i].DOMId")
    .tree-node()
      slot(:node="node" :meta="metas[i]" :root="root") {{node.text}}
    transition(v-if="node.children && node.children.length > 0" :name="root.foldingTransition")
      Tree(v-if="!metas[i].folded" :value="node.children" :privateProps="{...childPrivateProps, parent: node}")
        template(slot-scope="props")
          slot(:node="props.node" :meta="props.meta" :root="props.root") {{node.text}}
</template>

<script>
import * as hp from 'helper-js'
import * as th from 'tree-helper'
import * as tdhp from '@/todo-utils'

const trees = {}

const Tree = {
  name: 'Tree',
  props: {
    value: {},
    privateProps: {},
    idMode: {default: 'object'}, // object, id(node must has id)
    dataModification: {default: 'modify_old'}, // new, modify_old. create new data or modify old
    DOM_ID_PREFIX: {default: 'he_tree'},
  },
  // components: {},
  data() {
    return {
      metas: [], // metas of current level nodes
      trees,
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
        // initial meta
        if (node.$meta) {
          Object.assign(newMeta, node.$meta)
        }
        //
        let id, DOMId
        if (oldMeta) {
          id = oldMeta.id
          DOMId = oldMeta.DOMId
        } else {
          id = node.id || hp.strRand()
          DOMId = `${this.DOM_ID_PREFIX}_${this.root._uid}_branch_${id}`
        }
        Object.assign(newMeta, {
          id,
          DOMId,
        })
        if (this.$options._afterMetaCreateds) {
          for (const func of this.$options._afterMetaCreateds) {
            func.call(this, newMeta, node)
          }
        }
        if (oldMeta) {
          Object.assign(newMeta, oldMeta)
        }
        Object.assign(newMeta, {
          parent: this.parent,
          level: this.level,
        })
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
    convertDOMIDToID(DOMId) {
      let r = DOMId
      if (DOMId.startsWith(this.DOM_ID_PREFIX)) {
        r = DOMId.split('_branch_')[1]
      }
      return r
    },
    // by DOMId or ID
    getNodeByID(DOMIdOrID) {
      const id = this.convertDOMIDToID(DOMIdOrID)
      return this.root.idMap[id]
    },
    getMetaByID(DOMIdOrID) {
      const node = this.getNodeByID(DOMIdOrID)
      return this.getMetaByNode(node)
    },
    getNodeParent(node) {
      const meta = this.getMetaByNode(node)
      return meta ? meta.parent : null
    },
    getNodeSiblings(node, opt = {}) {
      opt = {
        convertToArray: true,
        ...opt,
      }
      const parent = this.getNodeParent(node)
      let r = parent ? parent.children : this.root.value
      if (opt.convertToArray) {
        r = hp.toArrayIfNot(r)
      }
      return r
    },
    * iterateParents(node, opt = {}) {
      if (opt.withSelf) {
        yield node
      }
      let cur = this.getNodeParent(node)
      while (cur) {
        yield cur
        cur = this.getNodeParent(cur)
      }
    },
    traverseDescendants(nodeOrNodes, handler) {
      return th.depthFirstSearch(nodeOrNodes, handler)
    },
    cloneTreeData(nodeOrNodes) {
      const nodes = hp.toArrayIfNot(nodeOrNodes)
      const walk = (arr) => arr.map(node => {
        const newNode = Object.assign({}, node)
        if (newNode.children) {
          newNode.children = walk(newNode.children)
        }
        return newNode
      })
      let r = walk(nodes)
      return hp.isArray(nodeOrNodes) ? r : r[0]
    },
    getTreeVmByTreeEl(treeEl) {
      return this.root.trees[treeEl.getAttribute('data-tree-id')]
    },
    // todo extract hooks to vue-functions
    // get hooks in this._hooks, without which in props
    _getNonPropHooksByName(name) {
      if (this._hooks) {
        return this._hooks[name]
      }
    },
    addHook(name, func) {
      if (!this._getNonPropHooksByName(name)) {
        if (!this._hooks) {
          this._hooks = {}
        }
        if (!this._hooks[name]) {
          this._hooks[name] = []
        }
      }
      this._hooks[name].push(func)
    },
    removeHook(name, func) {
      const hooks = this._getNonPropHooksByName(name)
      if (hooks) {
        hp.arrayRemove(hooks, func)
      }
    },
    hasHook(name) {
      return this._getNonPropHooksByName(name) || this[name]
    },
    executeHook(name, args) {
      const hooks = this._getNonPropHooksByName(name).slice()
      if (hooks) {
        if (this[name] && hp.isFunction(this[name])) {
          hooks.push(function (next, ...args) {
            return this[name](...args)
          })
        }
        return tdhp.joinFunctionsByNext(hooks)(...args)
      }
    },
  },
  created() {
    if (this === this.root) {
      this.metaMap = this.idMode === 'id' ? {} : new Map()
      this.idMap = {}
      this.trees[this._uid] = this
      this.$once('hook:beforeDestroy', () => {
        this.$delete(this.trees, this._uid)
      })
    }
    this.$watch('nodes', this.nodesWatcher, {immediate: true})
    this.$watch('level', (level, oldLevel) => {
      for (const node of this.nodes) {
        this.getMetaByNode(node).level = level
      }
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
