import Vue from 'vue'
import router from './router'
import store from './store'
import Main from './views/Main.vue'
import { apolloProvider } from './config/apolloProvider'
import '../src/styles/index.scss'
import BootstrapVue from 'bootstrap-vue'

Vue.config.productionTip = false

Vue.use(BootstrapVue)

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(Main),
}).$mount('#app')