import gql from 'graphql-tag'

export const mutationTypes = {
  ADD_STOCK_PRODUCT: 'addProductStock',
  DELETE_STOCK_PRODUCT: 'deleteStockProduct',
}

export const queryTypes = {
  GET_PRODUCT_STOCKS: 'getProductStocks',
}

export const mutations = {
  [mutationTypes.ADD_STOCK_PRODUCT]: gql`
    mutation productStocks($name: String!) {
      createProductStock(name: $name) {
        id
        name
      }
    }
  `,
  [mutationTypes.DELETE_STOCK_PRODUCT]: gql`
    mutation productStocks($id: String!) {
      deleteProductStock(id: $id)
    }
  `
}

export const queries = {
  [queryTypes.GET_PRODUCT_STOCKS]: gql`
    query productStocks {
      productStocks {
        id
        name
      }
    }
  `,
}