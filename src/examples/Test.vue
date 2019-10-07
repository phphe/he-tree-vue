<!-- this is an example -->
<template lang="pug">
div
  h2 Test
  button(@click="flickOnDrop") flick on drop
  | &nbsp;
  hr
  .test-trees
    Tree.test-tree.mr(:value="treeData1" unfoldAllAtBeginning ref="tree1")
      div(slot-scope="{node, meta, root}")
        input(type="checkbox" v-model="meta.checked" @change="root.afterCheckChanged(node)")
        | &nbsp;
        span {{node.text}}
    Tree.test-tree.mr(:value="treeData2" unfoldAllAtBeginning ref="tree2")
      div(slot-scope="{node, meta, root}")
        b(v-if="node.children && node.children.length > 0" @click="root.toggleFold(node)") {{meta.folded ? '+' : '-'}}&nbsp;
        input(type="checkbox" v-model="meta.checked" @change="root.afterCheckChanged(node)")
        | &nbsp;
        span {{node.text}} {{meta.nodes && meta.nodes.length}}
    div.mr
      h3 ID Mode
      Tree.test-tree(:value="idModeData" unfoldAllAtBeginning idMode ref="tree3")
        div(slot-scope="{node, meta, root}")
          b(v-if="node.children && node.children.length > 0" @click="root.toggleFold(node)") {{meta.folded ? '+' : '-'}}&nbsp;
          input(type="checkbox" v-model="meta.checked" @change="root.afterCheckChanged(node)")
          | &nbsp;
          span {{node.text}} {{meta.nodes && meta.nodes.length}}
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
      idModeData: [
        {id: 1, text: 'node 1', children: [
          {id: 10, text: 'node 1-0'},
          {id: 11, text: 'node 1-1'},
          {id: 12, text: 'node 1-2'},
          {id: 13, text: 'node 1-3'},
          {id: 14, text: 'node 1-4'},
          {id: 15, text: 'node 1-5'},
          {id: 16, text: 'node 1-6'},
          {id: 17, text: 'node 1-7'},
          {id: 18, text: 'node 1-8'},
          {id: 19, text: 'node 1-9'},
        ]},
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
