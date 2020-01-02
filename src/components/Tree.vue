<script>
import * as hp from 'helper-js'
import * as vf from 'vue-functions'
import * as ut from '../utils.js'

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
    return <div class={`tree-children ${noUndefined(parent===this.rootNode && 'tree-root')} ${noUndefined(parent.$childrenClass)}`}
      style={parent.$childrenStyle}
    >
      {nodes.map(branchTpl)}
    </div>
  }
  return <div class="he-tree" data-tree-id={this._uid}>
    {this.blockHeader && this.blockHeader()}
    {childrenListTpl(this.rootNode.children, this.rootNode, [])}
    {this.blockFooter && this.blockFooter()}
  </div>
}

const trees = {}

const Tree = {
  render: template,
  mixins: [
    vf.updatablePropsEvenUnbound({
      value: {$localName: 'treeData'},
    }),
    vf.hookHelper,
  ],
  props: {
    indent: {default: 20},
    rootNode: {default: is => ({})},
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
    // todo move iteratePath, getAllNodesByPath, getNodeByPath to helper-js
    * iteratePath(path, opt = {}) {
      if (!opt.reverse) {
        let prevPath = []
        let prevNode
        let prevChildren = this.treeData
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
    walkTreeData: ut.walkTreeData,
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
    cloneTreeData: ut.cloneTreeData,
    // return cloned new tree data without property witch starts with `$`
    getPureTreeData(treeData=this.treeData) {
      return ut.getPureTreeData(treeData)
    },
  },
  created() {
    //
    const updateRootNode = () => { this.$set(this.rootNode, 'children', this.treeData) }
    this.$watch('rootNode', updateRootNode, {immediate: true})
    this.$watch('treeData', updateRootNode, {immediate: true})
    //
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
