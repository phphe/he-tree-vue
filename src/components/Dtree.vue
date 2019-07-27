//- <template lang="pug">
//- .
//- </template>

<script>
export default {
  props: {
    // indent: {type: Number, default: 16},
    activatedClass: {default: 'active'},
    openedClass: {default: 'open'},
    space: {type: Number, default: 10}, // space between node, unit px
    childrenTransitionName: {}, // there are issues under draggable tree
    customInnerBack: {},
  },
  // components: {},
  data() {
    return {}
  },
  // computed: {},
  // watch: {},
  // methods: {},
  // created() {},
  // mounted() {},
}
</script>

//- <style lang="scss">
//- .{}
//- </style>
