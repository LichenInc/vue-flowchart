import Vue from 'vue'

//PLUGINS
// const vm = new Vue({
//   el: '#app',
//   data: {
//       currentActivity: 'home'
//   }
// })

import app from './app.vue'

const App = Vue.extend(app)

window.onload = function () {
  const t = document.createElement('div')
  t.setAttribute('id', 'app')
  console.log(window.document)
  window.document.body.appendChild(t)
  const vm = new App().$mount('#app')
}
// const vm = new App().$mount('#app')
