const state = {
  loggedIn: false,
}

const actions = {
  authenticate ({ commit }) {
    commit('setLoggedIn', true)
  },
  logout ({ commit }) {
    commit('setLoggedIn', false)
  },
}

const mutations = {
  setLoggedIn (state, loggedIn) {
    state.loggedIn = loggedIn;
  },
}

export default {
  state,
  actions,
  mutations,
  namespaced: true,
}
