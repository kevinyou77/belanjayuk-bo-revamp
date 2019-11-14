const state = {
  loggedIn: false,
  hasAction: false,
}

const actions = {
  authenticate ({ commit }) {
    commit('setLoggedIn', true)
  },
  logout ({ commit }) {
    commit('setLoggedIn', false)
  },
  toggleAction ({ commit, state }) {
    commit ('setHasAction', !state.hasAction)
  }
}

const mutations = {
  setLoggedIn (state, loggedIn) {
    state.loggedIn = loggedIn;
  },
  setHasAction (state, hasAction) {
    state.hasAction = hasAction
  }
}

export default {
  state,
  actions,
  mutations,
  namespaced: true,
}
