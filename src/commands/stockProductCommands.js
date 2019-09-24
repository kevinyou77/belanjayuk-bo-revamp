import gql from 'graphql-tag'

export const mutationTypes = {
  ADD_STOCK_PRODUCT: 'addProduct',
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
}

export const queries = {
  [queryTypes.GET_PRODUCT_STOCKS]: gql`
    query datas {
      productStocks {
        id
        name
      }
    }
  `,
}