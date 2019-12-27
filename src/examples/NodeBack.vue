<!-- this is an example -->
<template lang="pug">
div
  h2 Node Back
  button(@click="$refs.tree.showNodeBack([0,3], {style: 'background: #FFEB3B;'})") Show back of 1-3
  br
  button(@click="$refs.tree.showNodeBack([0,4], {style: 'background: #FFEB3B;', persistent: true})") Show back of 1-4 persistent
  br
  button(@click="$refs.tree.hideNodeBack([0,4])") hide back of 1-4
  Tree(:value="treeData" idMode ref="tree")
    div(slot-scope="{node, index, path, tree}")
      b(v-if="node.children && node.children.length > 0" @click="tree.toggleFold(node, path)") {{node.$folded ? '+' : '-'}}&nbsp;
      input(type="checkbox" v-model="node.$checked" @change="tree.toggleCheck(node, path)")
      | &nbsp;
      span {{node.text}}
</template>

<script>
import * as hp from 'helper-js'
import Tree from '@/components/Tree.vue'
import fold from '@/plugins/fold.js'
import check from '@/plugins/check.js'
import NodeBack from '@/plugins/NodeBack.vue'
import Draggable from '@/plugins/draggable/Draggable.vue'

const MixedTree = Tree.mixPlugins([fold, check, NodeBack, Draggable])

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
</style>
