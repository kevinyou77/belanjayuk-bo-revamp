import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import transaction from './modules/transaction'
import purchase from './modules/purchase'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    transaction,
    purchase,
  }
})