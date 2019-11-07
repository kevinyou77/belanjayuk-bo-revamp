const state = {
  selectedProducts: [],
  selectedProductDetail: [],
  error: '',
}

const actions = {
  addSelectedProduct ({ commit, state }, newProduct) {
    return new Promise ((resolve, reject) => {
      const filteredSelectedProducts = state.selectedProducts.filter (item => item.id === newProduct.id)
      const hasSelectedProductDetail = filteredSelectedProducts.find (item => (
        item.productDetail.find (pd => pd.id === newProduct.productDetail[0].id)
      ))
      
      if (hasSelectedProductDetail) {
        reject(false)
        return
      }

      commit('addSelectedProduct', newProduct)
      resolve(true)
    })
  },
  injectSelectedProducts ({ commit }, products) {
    commit('injectSelectedProducts', products)
  },
  removeSelectedProduct ({ commit }, selectedProductInfo) {
    const filteredSelectedProducts = state.selectedProducts.filter(item => {
      return item.productDetail[0].id !== selectedProductInfo.productDetailId
    })

    commit ('modifySelectedProduct', filteredSelectedProducts)
  },
  updateSelectedProduct ({ commit }, { SKU, stock }) {
    const targetProduct = { ...state.selectedProducts.filter(item => item.SKU === SKU) }
    targetProduct.stock = stock

    commit('modifySelectedProduct', targetProduct)
  },
  removeAllSelectedProducts ({ commit }) {
    commit('modifySelectedProduct', [])
  },
  setErrorMessage ({ commit }, errorMessage) {
    commit('setErrorMessage', errorMessage)
  },
  setSelectedProductDetail ({ commit }, productDetail) {
    commit ('addSelectedProductDetail', productDetail)
  },
}

const mutations = {
  addSelectedProduct (state, newProduct) {
    state.selectedProducts = [
      ...state.selectedProducts,
      newProduct,
    ]
  },
  injectSelectedProducts (state, products) {
    state.selectedProducts = [
      ...products,
    ]
  },
  addSelectedProductDetail (state, newProduct) {
    state.selectedProducts = [
      ...state.selectedProductDetail,
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
