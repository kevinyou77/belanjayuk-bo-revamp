const state = {
  selectedProducts: [],
}

const actions = {
  addSelectedProduct ({ commit }, newProduct) {
    commit(newProduct)
  },
  removeSelectedProduct ({ commit }, SKU) {
    const filteredSelectedProducts = state.selectedProducts.filter(item => item.SKU !== SKU)
    commit ('modifySelectedProduct', filteredSelectedProducts)
  },
  updateSelectedProduct ({ commit }, { SKU, stock }) {
    const targetProduct = { ...state.selectedProducts.filter(item => item.SKU === SKU) }
    targetProduct.stock = stock

    commit('modifySelectedProduct', targetProduct)
  }
}

const mutations = {
  addSelectedProducts (state, newProduct) {
    state.selectedProducts = [
      ...state.selectedProducts,
      newProduct,
    ]
  },
  modifySelectedProduct (state, selectedProducts) {
    state.selectedProducts = selectedProducts
  },
}

export default {
  state,
  actions,
  mutations,
  namespaced: true,
}
