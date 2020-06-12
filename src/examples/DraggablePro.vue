<!-- this is an example -->
<template lang="pug">
.DraggablePro
  h2 Draggable Pro (cross tree)
  .flex
    Tree.ml(:value="treeData" ref="tree" triggerClass="trigger" crossTree)
      div(slot-scope="{node, index, path, tree}")
        button.trigger drag
        div(style="width:.5em;height:1em;display:inline-block;")
        b(v-if="node.children && node.children.length > 0" @click="tree.toggleFold(node, path)") {{node.$folded ? '+' : '-'}}&nbsp;
        input(type="checkbox" :checked="node.$checked" @change="tree.toggleCheck(node, path)")
        | &nbsp;
        span {{node.text}}
    .ml
      b Empty Tree
      Tree(:value="treeDataEmpty" ref="tree4" crossTree)
      hr
      Tree(:value="treeData2" ref="tree" triggerClass="trigger" crossTree)
        div(slot-scope="{node, index, path, tree}")
          button.trigger drag
          div(style="width:.5em;height:1em;display:inline-block;")
          b(v-if="node.children && node.children.length > 0" @click="tree.toggleFold(node, path)") {{node.$folded ? '+' : '-'}}&nbsp;
          input(type="checkbox" :checked="node.$checked" @change="tree.toggleCheck(node, path)")
          | &nbsp;
          span {{node.text}}
    .ml
      h3 Clone when drag
      Tree(:value="treeData3" ref="tree" triggerClass="trigger" crossTree cloneWhenDrag)
        div(slot-scope="{node, index, path, tree}")
          button.trigger drag
          div(style="width:.5em;height:1em;display:inline-block;")
          b(v-if="node.children && node.children.length > 0" @click="tree.toggleFold(node, path)") {{node.$folded ? '+' : '-'}}&nbsp;
          input(type="checkbox" :checked="node.$checked" @change="tree.toggleCheck(node, path)")
          | &nbsp;
          span {{node.text}}
    .ml
      h3 Max level (2)
      Tree(:value="treeData3" ref="tree" triggerClass="trigger" crossTree :maxLevel="2")
        div(slot-scope="{node, index, path, tree}")
          button.trigger drag
          div(style="width:.5em;height:1em;display:inline-block;")
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
import DraggablePro from "../../../he-tree-vue-pro";

DraggablePro.LICENSE_NUMBER = 'your license number'

const MixedTree = Tree.mixPlugins([fold, check, Draggable, DraggablePro])

export default {
  components: {
    Tree: MixedTree
  },
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
      treeData2: [
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
      treeData3: [
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
      ],
      treeDataEmpty: [],
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
.DraggablePro{
}
</style>
