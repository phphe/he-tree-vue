<!-- this is an example -->
<template lang="pug">
div
  h2 Base
  Tree(:value="originalData" :foldAllAtBeginning="false" ref="tree")
    div(slot-scope="{node, meta, root}")
      b(v-if="node.children && node.children.length > 0" @click="meta.folded=!meta.folded") {{meta.folded ? '+' : '-'}}&nbsp;
      span {{node.text}}
</template>

<script>
import Tree from '@/components/Tree.vue'
import Draggable from '@/plugins/draggable/Draggable.vue'

const MixedTree = {
  name: 'Tree',
  extends: Tree,
  mixins: [Draggable],
}

export default {
  components: {Tree: MixedTree},
  data() {
    return {
      originalData: [
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
      data: null,
    }
  },
  // computed: {},
  // watch: {},
  methods: {
    tree1Change(node, targetTree) {
      this.data = targetTree.getPureData()
    },
  },
  // created() {},
  mounted() {
  },
}
</script>

<style>
</style>
