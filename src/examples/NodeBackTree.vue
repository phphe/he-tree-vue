<template lang="pug">
.tree-children(:class="{'he-tree tree-root': isRoot}")
  .tree-branch(v-for="(node, i) in nodes" :key="metas[i].id" :id="metas[i].DOMId")
    .tree-node(@mouseenter="showNodeBack(node)" @mouseleave="hideNodeBack(node)")
      slot(:node="node" :meta="metas[i]" :root="root") {{node.text}}
    transition(v-if="node.children && node.children.length > 0" :name="root.foldingTransition")
      Tree(v-if="!metas[i].folded" :value="node.children" :privateProps="{...childPrivateProps, parent: node}")
        template(slot-scope="props")
          slot(:node="props.node" :meta="props.meta" :root="props.root") {{node.text}}
</template>

<script>
import Tree from '@/components/Tree.vue'
import fold from '@/plugins/fold.js'
import check from '@/plugins/check.js'
import Draggable from '@/plugins/draggable/Draggable.vue'
import NodeBack from '@/plugins/NodeBack.vue'

const MixedTree = Tree.mixPlugins([fold, check, Draggable, NodeBack])

export default MixedTree
</script>
