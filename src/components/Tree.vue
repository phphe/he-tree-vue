<script>
import * as hp from 'helper-js'
import * as th from 'tree-helper'
import * as tdhp from '@/todo-utils'

const template = function (h) {
  const treeTpl = (nodes, isRoot, parentPath) => {
    const branchTpl = (node, index) => {
      const path = [...parentPath, index]
      const slotDefault = () => {
        if (this.$scopedSlots.default) {
          return this.$scopedSlots.default({node, index, path, tree: this})
        } else if (this.$slots.default) {
          return this.$slots.default
        } else {
          return node.text
        }
      }
      return <div class="tree-branch" data-tree-node-path={path.join(',')}>
        <div class="tree-node">{slotDefault()}</div>
        {(node.children && node.children.length) > 0 && <transition name={this.$props.foldingTransition}>
          {!node.$folded && treeTpl(node.children, false, path)}
        </transition>}
      </div>
    }
    return <div class={`${isRoot ? 'he-tree tree-root' : ''} tree-children`} data-tree-id={isRoot ? this._uid : false}>
      {nodes.map(branchTpl)}
    </div>
  }
  return treeTpl(this.value, true, [])
}

const trees = {}

const Tree = {
  render: template,
  props: {
    value: {},
  },
  // components: {},
  data() {
    return {
      DOM_ID_PREFIX: 'he_tree',
      trees,
    }
  },
  // computed: {},
  // watch: {},
  methods: {
    * iteratePath(path, opt = {}) {
      if (!opt.reverse) {
        let prevPath = []
        let prevNode
        let prevChildren = this.value
        for (const index of path) {
          const currentPath = [...prevPath, index]
          const currentNode = prevChildren[index]
          yield {path: currentPath, node: currentNode}
          prevPath = currentPath
          prevNode = currentNode
          prevChildren = currentNode.children
        }
      } else {
        const allReversedNodes = this.getAllNodesByPath(path)
        allReversedNodes.reverse()
        let currentPath = path.slice()
        for (const node of allReversedNodes) {
          yield {path: currentPath, node: node}
          currentPath = tdhp.arrayWithoutEnd(currentPath, 1)
        }
      }
    },
    traverseDescendants(nodeOrNodes, handler) {
      return th.depthFirstSearch(nodeOrNodes, handler)
    },
    getTreeVmByTreeEl(treeEl) {
      return this.trees[treeEl.getAttribute('data-tree-id')]
    },
    getAllNodesByPath(path) {
      const nodes = []
      for (const {node} of this.iteratePath(path)) {
        nodes.push(node)
      }
      return nodes
    },
    getNodeByPath(path) {
      return hp.arrayLast(this.getAllNodesByPath(path))
    },
    getPathByBranchEl(branchEl) {
      return branchEl.getAttribute('data-tree-node-path').split(',').map(v => parseInt(v))
    },
    getBranchElByPath(path) {
      return this.$el.querySelector(`[data-tree-node-path='${path.join(',')}']`)
    },
    getNodeByBranchEl(branchEl) {
      return this.getNodeByPath(this.getPathByBranchEl(branchEl))
    },
    getNodeParentByPath(path) {
      return tdhp.arrayWithoutEnd(this.getAllNodesByPath(path), 1)
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
    this.$set(this.trees, this._uid, this)
    this.$once('hook:beforeDestroy', () => {
      this.$delete(this.trees, this._uid)
    })
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
