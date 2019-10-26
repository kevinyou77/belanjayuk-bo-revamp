const state = {
  selectedProducts: [],
  error: '',
}

const actions = {
  addSelectedProduct ({ commit }, newProduct) {
    commit('addSelectedProduct', newProduct)
  },
  removeSelectedProduct ({ commit }, SKU) {
    const filteredSelectedProducts = state.selectedProducts.filter(item => item.SKU !== SKU)
    commit ('modifySelectedProduct', filteredSelectedProducts)
  },
  updateSelectedProduct ({ commit }, { SKU, stock }) {
    const targetProduct = { ...state.selectedProducts.filter(item => item.SKU === SKU) }
    targetProduct.stock = stock

    commit('modifySelectedProduct', targetProduct)
  },
  setErrorMessage ({ commit }, errorMessage) {
    commit('setErrorMessage', errorMessage)
  }
}

const mutations = {
  addSelectedProduct (state, newProduct) {
    state.selectedProducts = [
      ...state.selectedProducts,
      newProduct,
    ]
  },
  modifySelectedProduct (state, selectedProducts) {
    state.selectedProducts = selectedProducts
  },
  setErrroMessage (state, errorMessage) {
    state.errorMessage = errorMessage
  },
}

export default {
  state,
  actions,
  mutations,
  namespaced: true,
}
