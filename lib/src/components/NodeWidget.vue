<script>

  // import { map } from 'lodash-es'

  export default {
    name: "NodeWidget",
    props: {
			engine: {
        required: true,
      },
			node: {
        required: true,
      },
		},
    data() {
      return {
        mouseDown: false,
      }
    },
    methods: {
      onMouseDown(){
        this.engine.setSelectedNode(this.node)
      }
    },
    computed: {
      styles() {
        return {
          top: `${this.node.y}px`,
          left: `${this.node.x}px`,
        }
      },
      classes() {
        const linksNode = this.engine.getNodeLinks(this.node)
        let gotEnteringLinks = false
        let gotOuterLinks = false
        if (linksNode.length > 0) {
          if (linksNode.filter(e => e.source === this.node.id).length > 0) {
            gotEnteringLinks = true
          }
          if (linksNode.filter(e => e.target === this.node.id).length > 0) {
            gotOuterLinks = true
          }
        }
        return 'node'+ (this.engine.state.selectedNode && this.engine.state.selectedNode.id == this.node.id ? ' selected' : '') + (gotEnteringLinks ? ' inner-link-active' : '') + (gotOuterLinks ? ' outer-link-active' : '')
      },
    },
  }

</script>

<template>

  <div :style="styles" :class="classes" :data-nodeid="node.id" @mousedown="onMouseDown">
    <slot></slot>
  </div>


</template>

<style lang="scss">

</style>
