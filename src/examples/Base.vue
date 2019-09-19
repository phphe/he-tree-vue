<!-- this is an example -->
<template lang="pug">
div
  h2 Base
  .base-trees
    Tree.base-tree(:value="treeData1" unfoldAllAtBeginning ref="tree")
      div(slot-scope="{node, meta, root}")
        b(v-if="node.children && node.children.length > 0" @click="root.toggleFold(node)") {{meta.folded ? '+' : '-'}}&nbsp;
        input(type="checkbox" v-model="meta.checked" @change="root.afterCheckChanged(node)")
        | &nbsp;
        span {{node.text}}
    Tree.base-tree.base-tree2(:value="treeData2" unfoldAllAtBeginning ref="tree")
      div(slot-scope="{node, meta, root}")
        b(v-if="node.children && node.children.length > 0" @click="root.toggleFold(node)") {{meta.folded ? '+' : '-'}}&nbsp;
        input(type="checkbox" v-model="meta.checked" @change="root.afterCheckChanged(node)")
        | &nbsp;
        span {{node.text}}
    div(style="position: fixed;width: 500px;height: 200px;background: teal;opacity: 0.2;")
</template>

<script>
import Tree from '@/components/Tree.vue'
import fold from '@/plugins/fold.js'
import check from '@/plugins/check.js'
import Draggable from '@/plugins/draggable/Draggable.vue'

const MixedTree = Tree.mixPlugins([fold, check, Draggable])

export default {
  components: {Tree: MixedTree},
  data() {
    return {
      treeData1: [
        {text: 'node 1', children: [
          {text: 'node 1-1'},
          {text: 'node 1-2'},
          {text: 'node 1-1'},
          {text: 'node 1-2'},
          {text: 'node 1-1'},
          {text: 'node 1-2'},
          {text: 'node 1-1'},
          {text: 'node 1-2'},
          {text: 'node 1-1'},
          {text: 'node 1-2'},
          {text: 'node 1-1'},
          {text: 'node 1-2'},
        ]},
        {text: 'node 2', children: [
          {text: 'node 1-1'},
          {text: 'node 1-2'},
          {text: 'node 1-1'},
          {text: 'node 1-2'},
          {text: 'node 1-1'},
          {text: 'node 1-2'},
          {text: 'node 1-1'},
          {text: 'node 1-2'},
          {text: 'node 1-1'},
          {text: 'node 1-2'},
          {text: 'node 1-1'},
          {text: 'node 1-2'},
        ]},
        {text: 'node 3'},
        {text: 'node 4'},
        {text: 'node 4', droppable: false},
        {text: 'node 5', children: [
          {text: 'node 1'},
          {text: 'node 2', children: [
            {text: 'node 3'},
            {text: 'node 4'},
          ]},
          {text: 'node 2', droppable: false, children: [
            {text: 'node 3'},
            {text: 'node 4'},
          ]},
          {text: 'node 2', children: [
            {text: 'node 3'},
            {text: 'node 4', droppable: false},
          ]},
          {text: 'node 3'},
          {text: 'node 4'},
          {text: 'node 3'},
          {text: 'node 4'},
          {text: 'node 3'},
          {text: 'node 4'},
          {text: 'node 3'},
          {text: 'node 4'},
        ]},
      ],
      treeData2: [
        {text: 'node 1', children: [
          {text: 'node 1-1'},
          {text: 'node 1-2'},
          {text: 'node 1-1'},
          {text: 'node 1-2'},
          {text: 'node 1-1'},
          {text: 'node 1-2'},
          {text: 'node 1-1'},
          {text: 'node 1-2'},
          {text: 'node 1-1'},
          {text: 'node 1-2'},
          {text: 'node 1-1'},
          {text: 'node 1-2'},
        ]},
        {text: 'node 2', children: [
          {text: 'node 1-1'},
          {text: 'node 1-2'},
          {text: 'node 1-1'},
          {text: 'node 1-2'},
          {text: 'node 1-1'},
          {text: 'node 1-2'},
          {text: 'node 1-1'},
          {text: 'node 1-2'},
          {text: 'node 1-1'},
          {text: 'node 1-2'},
          {text: 'node 1-1'},
          {text: 'node 1-2'},
        ]},
        {text: 'node 3'},
        {text: 'node 4'},
        {text: 'node 4', droppable: false},
        {text: 'node 5', children: [
          {text: 'node 1'},
          {text: 'node 2', children: [
            {text: 'node 3'},
            {text: 'node 4'},
          ]},
          {text: 'node 2', droppable: false, children: [
            {text: 'node 3'},
            {text: 'node 4'},
          ]},
          {text: 'node 2', children: [
            {text: 'node 3'},
            {text: 'node 4', droppable: false},
          ]},
          {text: 'node 3'},
          {text: 'node 4'},
          {text: 'node 3'},
          {text: 'node 4'},
          {text: 'node 3'},
          {text: 'node 4'},
          {text: 'node 3'},
          {text: 'node 4'},
        ]},
      ],
    }
  },
  // computed: {},
  // watch: {},
  // methods: {},
  // created() {},
  mounted() {
  },
}
</script>

<style>
.base-trees{
  display: flex;
}
.base-tree2{
  margin-left: 50px;
}
</style>
