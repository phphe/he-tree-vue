<!-- this is an example -->
<template lang="pug">
.InScrollBox
  h2 In scroll box
  .scrollbox(ref="scrollbox")
    Tree(:value="treeData" ref="tree" edgeScroll @after-move="afterMove")
      div(slot-scope="{node, index, path, tree}")
        b(v-if="node.children && node.children.length > 0" @click="tree.toggleFold(node, path)") {{node.$folded ? '+' : '-'}}&nbsp;
        input(type="checkbox" :checked="node.$checked" @change="tree.toggleCheck(node, path)")
        | &nbsp;
        span {{node.text}}
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
        {text: 'node 1', $droppable: true, children: [
          {text: 'node 1-0'},
        ]},
        {text: 'node 2', $droppable: true, children: [
          {text: 'node 2-0'},
        ]},
        {text: 'node 3', $droppable: true, children: [
          {text: 'node 3-0'},
        ]},
        {text: 'node 4', $droppable: true, children: [
          {text: 'node 4-0'},
        ]},
        {text: 'node 5', $droppable: true},
        {text: 'node 6', $droppable: true},
        {text: 'node 7', $droppable: true},
        {text: 'node 8', $droppable: true},
        {text: 'node 9', $droppable: true},
      ],
    }
  },
  // computed: {},
  // watch: {},
  methods: {
    afterMove(store) {
      const closestBranch = store.oneMoveStore?.info?.closestBranch
      const {placeholder} = store
      if (closestBranch && placeholder) {
        if (placeholder.parentElement.parentElement === closestBranch) {
          // is child
          console.log('child');
        } else if (placeholder.nextSibling === closestBranch) {
          // is previous sibling
          console.log('previous');
        } else if (placeholder.previousSibling === closestBranch) {
          // is next sibling
          console.log('next');
        }
      }
    },
  },
  // created() {},
  mounted() {
  },
}
</script>

<style>
.InScrollBox .scrollbox{
  height: 300px;
  overflow: auto;
}
</style>
