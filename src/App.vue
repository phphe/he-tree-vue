<!-- this is an example -->
<template lang="pug">
#app
  h3 These are just some simple examples. For show and test.
  .flex
    BaseTree.mr
    NodeBackTree.mr
    ThirdCase.mr
    DragTransition.mr
    InScrollBox.mr
    CustomTrigger.mr
    RTLTree.mr
    DraggableProTree.mr
</template>

<script>
import BaseTree from '@/examples/Base'
import NodeBackTree from '@/examples/NodeBack'
import ThirdCase from '@/examples/ThirdCase.vue'
import DragTransition from '@/examples/DragTransition.vue'
import InScrollBox from '@/examples/InScrollBox.vue'
import CustomTrigger from '@/examples/CustomTrigger.vue'
import RTLTree from '@/examples/RTLTree.vue'
import {defineAsyncComponent }  from 'vue'

export default {
  components: {BaseTree, NodeBackTree, ThirdCase, DragTransition, InScrollBox, CustomTrigger, RTLTree,
    // DraggableProTree: defineAsyncComponent (() => import('@/examples/DraggablePro')),
  },
  data() {
    return {
      a:{b:123}
    }
  },
  // computed: {},
  // watch: {},
  // methods: {},
  created() {
  },
  // mounted() {},
}
</script>

<style>
#app{
  width: 3000px;
  overflow: auto;
}
.flex{
  display: flex;
}
.ml{
  margin-left: 1em;
}
.mr{
  margin-right: 1em;
}
.he-tree{
  border: 1px solid #ccc;
  padding: 20px;
}
.tree-node{
}
.tree-node-inner{
  padding: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
}
.draggable-placeholder{
}
.draggable-placeholder-inner{
  border: 1px dashed #0088F8;
  box-sizing: border-box;
  background: rgba(0, 136, 249, 0.09);
  color: #0088f9;
  text-align: center;
  padding: 0;
  display: flex;
  align-items: center;
}
</style>
