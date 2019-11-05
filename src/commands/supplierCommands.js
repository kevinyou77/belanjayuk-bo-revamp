import gql from 'graphql-tag'

export const mutationTypes = {
  ADD_SUPPLIER: 'addSupplier',
  EDIT_SUPPLIER: 'editSupplier',
  DELETE_SUPPLIER: 'deleteCustomer',
}

export const queryTypes = {
  GET_SUPPLIERS: 'getSuppliers',
  GET_SUPPLIER: 'getSupplier'
}

export const mutations = {
  [mutationTypes.ADD_SUPPLIER]: gql`
    mutation createSupplier (
      $name: String!,
      $phoneNumber: String!,
      $address: String!
    ) {
      createSupplier(name: $name, phoneNumber: $phoneNumber, address: $address){
        name
        phoneNumber
        address
        status
        id
      }
    }
  `,
  [mutationTypes.DELETE_SUPPLIER]: gql`
    mutation deleteSupplier ($id: String!) {
      deleteSupplier(id: $id)
    }
  `,
  [mutationTypes.EDIT_SUPPLIER]: gql`
    mutation updateSupplier (
      $id: String!,
      $name: String!,
      $phoneNumber: String!,
      $address: String!
    ) {
      updateSupplier(
        id: $id,
        name: $name,
        phoneNumber: $phoneNumber,
        address: $address
      ){
        name
        phoneNumber
        address
        status
        id
      }
    }
  `,
}

export const queries = {
  [queryTypes.GET_SUPPLIERS]: gql`
    query suppliers {
      suppliers{
        name
        phoneNumber
        address
        status
        id
      }
    }
  `,
  [queryTypes.GET_SUPPLIER]: gql`
    query supplier ($supplierId: String!) {
      supplier(supplierId: $supplierId){
        name
        phoneNumber
        address
        status
        id
      }
    }
  `,
}
