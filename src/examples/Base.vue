<!-- this is an example -->
<template lang="pug">
div
  h2 Base
  .base-trees.flex
    Tree.base-tree(:value="treeData1" ref="tree1")
      //- div(slot-scope="{node, index}") {{node}}
    Tree.base-tree.ml(:value="treeData1" ref="tree2")
      div(slot-scope="{node, index, path, tree}")
        b(v-if="node.children && node.children.length > 0" @click="tree.toggleFold(node, path)") {{node.$folded ? '+' : '-'}}&nbsp;
        input(type="checkbox" v-model="node.$checked" @change="tree.toggleCheck(node, path)")
        | &nbsp;
        span {{node.text}}
    .ml
      b Empty Tree
      Tree.base-tree(:value="treeDataEmpty" ref="tree4")
      hr
      b Fola all after mounted:
      Tree.base-tree(:value="treeData2" ref="tree3" foldAllAfterMounted)
        div(slot-scope="{node, index, path, tree}")
          b(v-if="node.children && node.children.length > 0" @click="tree.toggleFold(node, path)") {{node.$folded ? '+' : '-'}}&nbsp;
          input(type="checkbox" v-model="node.$checked" @change="tree.toggleCheck(node, path)")
          | &nbsp;
          span {{node.text}}
    div(style="position: absolute;width: 180px;height: 100px;background: teal;opacity: 0.2;display: flex;justify-content: center;align-items: center;font-size: 40px;color: #fffc;") MASK
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
      treeDataEmpty: [],
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
