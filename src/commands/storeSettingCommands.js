import gql from 'graphql-tag'

export const mutationTypes = {
  UPDATE_STORE_SETTINGS: 'updateStoreSettings'
}

export const queryTypes = {
  GET_STORE: 'getStore'
}

export const mutations = {
  [mutationTypes.UPDATE_STORE_SETTINGS]: gql`
    mutation updateStore(
      $name: String!,
      $phoneNumber: String!,
      $address: String!
    ){
      updateStore(name: $name, phoneNumber: $phoneNumber, address: $address){
        name
        phoneNumber
        address
        id
      }
    }
  `,
}

export const queries = {
  [queryTypes.GET_STORE]: gql`
    query store{
      store{
        name
        phoneNumber
        address
        id
      }
    }
  `,
}
