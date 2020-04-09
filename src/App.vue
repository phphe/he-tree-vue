<!-- this is an example -->
<template lang="pug">
#app
  h3 These are just some simple examples.
  .flex
    BaseTree.mr
    NodeBackTree.mr
    ThirdCase.mr
    //- DraggableProTree.mr
</template>

<script>
import BaseTree from '@/examples/Base'
import NodeBackTree from '@/examples/NodeBack'
import ThirdCase from '@/examples/ThirdCase.vue'
// import DraggableProTree from '@/examples/DraggablePro'

export default {
  components: {BaseTree, NodeBackTree, ThirdCase},
  // data() {
  //   return {}
  // },
  // computed: {},
  // watch: {},
  // methods: {},
  // created() {},
  // mounted() {},
}
</script>

<style>
#app{
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
// ===============
.he-tree{
  border: 1px solid #ccc;
  padding: 20px;
  display: inline-block;
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
