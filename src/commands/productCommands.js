import gql from 'graphql-tag'

export const mutationTypes = {
  ADD_PRODUCT: 'addProduct',
  ADD_PRODUCT_DETAIL: 'addProductDetail',
  UPDATE_PRODUCT: 'updateProduct',
  DELETE_PRODUCT: 'deleteProduct',
  DELETE_PRODUCT_DETAIL: 'deleteProductDetail'
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
  `,
  [mutationTypes.DELETE_PRODUCT]: gql`
    mutation deleteProduct($id: String!){
      deleteProduct(id: $id)
    }
  `,
  [mutationTypes.ADD_PRODUCT_DETAIL]: gql`
    mutation createProductDetail($productDetail: ProductDetailInput!){
      createProductDetail(productDetail: $productDetail){
        value
      }
    }
  `,
  [mutationTypes.DELETE_PRODUCT_DETAIL]: gql`
    mutation deleteProductDetail($id: String!) {
      deleteProductDetail(id: $id)
    }
  `
}

export const queries = {
  [queryTypes.GET_PRODUCT]: gql`
    query product($productId: String!) {
      product(productId: $productId) {
        SKU
        name
        stock
        imageUrl
        status
        id
        productDetail {
          id
          value
          purchasePrice
          sellingPrice
          status
          productStock {
            id
            name
          }
        }
        category {
          id
          name
        }
      }
    }
  `,
  [queryTypes.GET_PRODUCTS]: gql`
    query products {
      products {
        id
        name
        SKU
        stock
        status
        imageUrl
        productDetail {
          id
          value
          purchasePrice
          sellingPrice
          status
          productStock {
            id
            name
          }
        }
        category {
          id
          name
        }
      }
    }
  `
}