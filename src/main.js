import Vue from 'vue'
import router from './router'
import store from './store'
import Dashboard from './views/Dashboard.vue'
import { apolloProvider } from './config/apolloProvider'
import '../src/styles/index.scss'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(Dashboard),
}).$mount('#app')