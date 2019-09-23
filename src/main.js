import Vue from 'vue'
import router from './router'
import store from './store'
import '../src/styles/index.scss'
import Dashboard from './views/Dashboard.vue'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(Dashboard),
}).$mount('#app')
