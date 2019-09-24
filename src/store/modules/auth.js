const state = {
  loggedIn: false,
}

const actions = {
  authenticate ({ commit }) {
    return new Promise((resolve) => {
      commit('setLoggedIn', true)
      resolve(state.loggedIn)
    })
  },
  logout ({ commit }) {
    commit('setLoggedIn', false)
  },
  appendUserInputArr ({ commit }, userInput) {
    commit ('appendUserInputArr', userInput)
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
  namespaced: true
}
