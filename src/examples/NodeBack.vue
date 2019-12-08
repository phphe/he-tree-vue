<!-- this is an example -->
<template lang="pug">
div
  h2 Node Back
  Tree(:value="idModeData" unfoldAllAtBeginning idMode ref="tree3")
    div(slot-scope="{node, meta, root}")
      input(type="checkbox" v-model="meta.checked" @change="root.afterCheckChanged(node)")
      | &nbsp;
      span {{node.text}}
</template>

<script>
import * as hp from 'helper-js'
import MixedTree from './NodeBackTree.vue'

export default {
  components: {Tree: MixedTree},
  data() {
    return {
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
</style>
