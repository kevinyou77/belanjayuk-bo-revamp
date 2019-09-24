import gql from 'graphql-tag'

export const mutationTypes = {
  ADD_PRODUCT: 'addProduct',
  UPDATE_PRODUCT: 'updateProduct',
}

export const queryTypes = {
  GET_PRODUCT: 'getProduct',
  GET_PRODUCTS: 'getProducts',
  GET_PRODUCT_DETAIL: 'getProductDetail',
}

export const mutations = {
  [mutationTypes.ADD_PRODUCT]: gql`
    mutation addProduct(
      $product: ProductInput!
    ) {
      createProduct(product: $product) {
        SKU
        name
        stock
        status
        id
        category{
          name
          id
        }
        productDetail {
          value
          status
          id
          productStock {
            id
            name
          }
          sellingPrice
          purchasePrice
          product {
            id
            name
          }
        }
      }
    }
  `,
  [mutationTypes.UPDATE_PRODUCT]: gql`
    mutation updateProduct(
      $productId: String!,
      $categoryId: String!,
      $name: String!
    ) {
      updateProduct(
        productId: $productId,
        categoryId: $categoryId,
        name: $name
      ) {
        SKU
        name
        stock
        stock
        id
        category {
          id
          name
        }
        productDetail {
          id
          value
          sellingPrice
          purchasePrice
        }
      }
    }
  `
}

export const queries = {
  [queryTypes.GET_PRODUCT]: gql`
    query datas {
      roles {
        id
        name
      }
    }
  `,
  [queryTypes.GET_PRODUCTS]: gql`
    query products {
      products {
        id
        name
        productDetail {
          id
          value
          purchasePrice
          sellingPrice
        }
      }
    }
  `
}