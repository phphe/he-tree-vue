<!-- this is an example -->
<template lang="pug">
div
  h2 Test
  button(@click="flickOnDrop") flick on drop
  | &nbsp;
  hr
  .test-trees
    Tree.test-tree(:value="treeData1" unfoldAllAtBeginning ref="tree1")
      div(slot-scope="{node, meta, root}")
        input(type="checkbox" v-model="meta.checked" @change="root.afterCheckChanged(node)")
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
      treeData1: [
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
        {text: 'node 2', children: [
          {text: 'node 2-0'},
          {text: 'node 2-1'},
          {text: 'node 2-2'},
          {text: 'node 2-3'},
          {text: 'node 2-4'},
          {text: 'node 2-5'},
          {text: 'node 2-6'},
          {text: 'node 2-7'},
          {text: 'node 2-8'},
          {text: 'node 2-9'},
        ]},
        {text: 'node 3'},
        {text: 'node 4'},
        {text: 'node 4'},
      ],
    }
  },
  // computed: {},
  // watch: {},
  methods: {
    async flickOnDrop() {
      const {tree1} = this.$refs
      const treeEl = tree1.$el
      const clonedTreeEl = treeEl.cloneNode(true)
      hp.removeEl(clonedTreeEl.querySelector('.tree-branch'))
      hp.backupAttr(treeEl, 'style')
      hp.insertBefore(clonedTreeEl, treeEl)
      treeEl.style.display = 'none'
      tree1.value.splice(0, 1)
      await hp.waitTime(100)
      hp.removeEl(clonedTreeEl)
      hp.restoreAttr(treeEl, 'style')
    },
  },
  // created() {},
  mounted() {
  },
}
</script>

<style>
.test-trees{
  display: flex;
}
</style>
