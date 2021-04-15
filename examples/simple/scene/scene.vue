<script>
  import vueFlowchart from '../../../index.js'
  import fixtureDatas from '../../../test/fixtureDatas.js'
  import customWidget from './custom/CustomWidget.vue'
  export default {
    components: {
      vueFlowchart,
    },
    data() {
      return {
        data: {
          links: [
            {id: '4474b70f-f4fa-47c7-9291-0750b8958abf', points: [{x: 123.90, y: 70}, {x: 9.49, y: 52}], source: '113f6315-e1b0-420c-9cbf-d5128206e94d', sourcePort: 'out', target: 'fccd3403-7bd6-4c7b-a172-ecaed9d746c5', targetPort: 'in'},
            {id: 'd1b98e20-6b49-4785-8a6f-67d642f696e6', points: [{x: 97.85, y: 346}, {x: 9.49, y: 52}], source: 'fccd3403-7bd6-4c7b-a172-ecaed9d746c5', sourcePort: 'out', target: '113f6315-e1b0-420c-9cbf-d5128206e94d', targetPort: 'in'},
            {id: 'a88bc563-22a0-4f2d-9c1c-be8f07312bd4', points: [{x: 97.87, y: 346}, {x: 9.49, y: 52}], source: 'fccd3403-7bd6-4c7b-a172-ecaed9d746c5', sourcePort: 'out', target: '113f6315-e1b0-420c-9cbf-d5128206e94d', targetPort: 'in'},
          ],
          nodes: [
            { id: '113f6315-e1b0-420c-9cbf-d5128206e94d', type: 'default', x: -66, y: 2, data: { name: 'laurent fait un test', inPorts: ['in'], outPorts: ['out']}},
            { id: 'fccd3403-7bd6-4c7b-a172-ecaed9d746c5', type: 'default', x: 111, y: 295, data: { name: '2 fds', inPorts: ['in'], outPorts: ['out']}}
          ]
        },
        // data: null,
        templates: [
          ['custom', customWidget],
        ],
        options: {
          onEdgeRemove() {
            const confirm = window.confirm('Are you sure to delete this link ?')
            return Promise.resolve(confirm)
          },
          onNodeRemove() {
            const confirm = window.confirm('Are you sure to delete this node ?')
            return Promise.resolve(confirm)
          },
          onEdgeUpdate() {
            const confirm = window.confirm('Are you sure you want to connect ?')
            return Promise.resolve(confirm)
          },
        },
      }
    },
    mounted() {
      // setInterval(() => {
      //   this.data = fixtureDatas()
      //   console.log(this.data);
      // }, 1000)
    },
    methods: {
      log(...args) {
        console.log(...args);
      },
      addNode() {
        const flowchart = this.$refs.flowchart
        const node = {
          id: flowchart.engine.UID(),
          type: 'default',
          data: {
            name: "New node",
            inPorts: ['in'], 
            outPorts: ['out']
          },
          x: Math.random(5) * 100 ,
          y: Math.random(5) * 100
        }
        this.data.nodes.push(node)
        // flowchart.addNode(node)
      },
      removeRandomNode() {
        const flowchart = this.$refs.flowchart
        const nodes = Object.values(flowchart.engine.state.nodes)
        const id = nodes[Math.round(Math.random(nodes.length - 1))]
        flowchart.removeNode(id)
      },
      recenter () {
        // on remets le zoom par défaut
        this.$refs.flowchart.engine.recenter()
      },
      zoomIn () {
        this.$refs.flowchart.engine.zoomIn()
      },
      zoomOut () {
        this.$refs.flowchart.engine.zoomOut()
      }
    },
  }

</script>

<template lang="jade">

div.scene
  button(type="button", @click="addNode") Add a node
  button(type="button", @click="removeRandomNode") Remove a node
  button(type='button', @click='recenter') Recentrer le contenu
  button(type='button', @click='zoomIn') zoomIn
  button(type='button', @click='zoomOut') zoomOut
  vue-flowchart(
    ref="flowchart",
    :data="data",
    :node-templates="templates",
    :options="options",
    @link:select="log('selected link', $arguments)",
    @link:add="log('new link', $arguments)",
    @link:remove="log('deleted link', $arguments)",
    @node:select="log('selected node', $arguments)",
    @node:add="log('new node', $arguments)",
    @node:remove="log('deleted node', $arguments)",
  )
  //- customWidget(slot="custom")

</template>

<style lang="css">
.scene {
  width: 100%;
  height: 100%;
}

</style>
