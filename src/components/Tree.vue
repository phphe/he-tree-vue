<script>
import * as hp from 'helper-js'
import * as th from 'tree-helper'

const template = function (h) {
  // convert undefined to empty str
  const noUndefined = (str) => str ? str : ''
  // tree tpl, to render recursively
  const childrenListTpl = (nodes, parent, parentPath) => {
    const indentStyle = {paddingLeft: parentPath.length * this.indent + 'px'}
    const branchTpl = (node, index) => {
      const path = [...parentPath, index]
      const transitionComponent = this.foldingTransition || 'transition'
      const slotDefault = () => {
        const original = () => {
          if (this.$scopedSlots.default) {
            return this.$scopedSlots.default({node, index, path, tree: this})
          } else if (this.$slots.default) {
            return this.$slots.default
          } else {
            return node.text
          }
        }
        if (this.overrideSlot_default) {
          return this.overrideSlotDefault(original)
        } else {
          return original()
        }
      }
      let nodebackStyle = indentStyle
      if (node.$nodeBackStyle) {
        nodebackStyle = {...nodebackStyle, ...node.$nodeBackStyle}
      }
      return <div class={`tree-branch ${noUndefined(node.$branchClass)}`}
        style={node.$branchStyle}
        data-tree-node-path={path.join(',')}
      >
        <div class={`tree-node-back ${noUndefined(node.$nodeBackClass)}`} style={nodebackStyle}>
          <div class={`tree-node ${noUndefined(node.$nodeClass)}`} style={node.$nodeStyle}>
            {slotDefault()}
          </div>
        </div>
        {(node.children && node.children.length) > 0 && <transitionComponent name={this.$props.foldingTransitionName}>
          {!node.$folded && childrenListTpl(node.children, node, path)}
        </transitionComponent>}
      </div>
    }
    return <div class={`tree-children ${noUndefined(parent && parent.$childrenClass)}`}
      style={parent && parent.$childrenStyle}
    >
      {nodes.map(branchTpl)}
    </div>
  }
  return <div class="he-tree tree-root" data-tree-id={this._uid}>
    {this.blockHeader && this.blockHeader()}
    {childrenListTpl(this.value, null, [])}
    {this.blockFooter && this.blockFooter()}
  </div>
}

const trees = {}

const Tree = {
  render: template,
  props: {
    value: {},
    indent: {default: 20},
  },
  // components: {},
  data() {
    return {
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
          currentPath = hp.arrayWithoutEnd(currentPath, 1)
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
      return hp.arrayWithoutEnd(this.getAllNodesByPath(path), 1)
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
        return hp.joinFunctionsByNext(hooks)(...args)
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
      mixPlugins: this.mixPlugins,
    }
    MixedTree._afterMetaCreateds = plugins.map(v => v.afterMetaCreated).filter(v => v)
    return MixedTree
  },
}
export default Tree

</script>

<style>
.he-tree .tree-node{
  border: 1px solid #ccc;
  margin-bottom: 5px;
  padding: 5px;
}
</style>
