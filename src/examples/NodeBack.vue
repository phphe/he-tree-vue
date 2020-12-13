<!-- this is an example -->
<template lang="pug">
div
  h2 Node Back
  Tree.tree-with-nodeba-back(:value="treeData" ref="tree")
    template(v-slot:default="{node, index, path, tree}")
      b(v-if="node.children && node.children.length > 0" @click="tree.toggleFold(node, path)") {{node.$folded ? '+' : '-'}}&nbsp;
      input(type="checkbox" :checked="node.$checked" @change="tree.toggleCheck(node, path)")
      | &nbsp;
      span {{node.text}}
  hr
  Tree.tree-with-nodeba-back(:value="treeData2" ref="tree2")
</template>

<script>
import * as hp from 'helper-js'
import Tree from '@/components/Tree.vue'
import fold from '@/plugins/fold.js'
import check from '@/plugins/check.js'
import Draggable from '@/plugins/draggable/Draggable.vue'

const MixedTree = Tree.mixPlugins([fold, check, Draggable])

export default {
  components: {Tree: MixedTree},
  data() {
    return {
      treeData: [
        {text: 'node 1', children: [
          {text: 'node 1-0'},
          {text: 'node 1-1'},
          {text: 'node 1-2'},
          {text: 'node 1-3'},
          {text: 'node 1-4'},
          {text: 'node 1-5'},
          {text: 'node 1-6'},
          {text: 'node 1-7'},
          {text: 'node 1-8'},
          {text: 'node 1-9'},
        ]},
      ],
      treeData2: [
        {text: 'node 1', children: [
          {text: 'node 1-0'},
          {text: 'node 1-1'},
          {text: 'node 1-2'},
          {text: 'node 1-3'},
          {text: 'node 1-4'},
          {text: 'node 1-5'},
          {text: 'node 1-6'},
          {text: 'node 1-7'},
          {text: 'node 1-8'},
          {text: 'node 1-9'},
        ]},
      ],
    }
  },
  // computed: {},
  // watch: {},
  methods: {},
  // created() {},
  mounted() {
  },
}
</script>

<style>
.tree-with-nodeba-back .tree-node-back:hover{
  background: #e2e2e2;
}
</style>
