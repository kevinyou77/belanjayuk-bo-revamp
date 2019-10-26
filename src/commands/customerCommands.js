import gql from 'graphql-tag'

export const mutationTypes = {
  ADD_CUSTOMER: 'addCustomer',
  EDIT_CUSTOMER: 'editCustomer',
  DELETE_CUSTOMER: 'deleteCustomer',
}

export const queryTypes = {
  GET_CUSTOMERS: 'getCustomers',
  GET_CUSTOMER: 'getCustomer'
}

export const mutations = {
  [mutationTypes.ADD_CUSTOMER]: gql`
    mutation createCustomer($customer: UserProfileInput!) {
      createCustomer(customer: $customer){
        id
      }
    }
  `,
  [mutationTypes.DELETE_CUSTOMER]: gql`
    mutation deleteCustomer($id: String!) {
      deleteCustomer(id: $id)
    }
  `,
  [mutationTypes.EDIT_CUSTOMER]: gql`
    mutation updateCustomer(
      $customerId: String!, 
      $fullName: String!, 
      $phoneNumber: String!, 
      $address: String!, 
      $noNik: String!, 
      $dateOfBirth: Long!
    ) {
      updateCustomer(
        customerId: $customerId, 
        fullName: $fullName, 
        phoneNumber: $phoneNumber, 
        address: $address, 
        noNik: $noNik, 
        dateOfBirth: $dateOfBirth
      ){
        status
        id
      }
    }
  `,
}

export const queries = {
  [queryTypes.GET_CUSTOMERS]: gql`
    query customerList {
      customers {
        status
        id
        user {
          username
          email
          userProfile {
            fullName
            dateOfBirth
            address
            noNik
            phoneNumber
          }
        }
      }
    }
  `,
  [queryTypes.GET_CUSTOMER]: gql`
    query customer ($customerId: String!) {
      customer(customerId: $customerId){
        status
        id
        user {
          username
          email
          userProfile {
            fullName
            dateOfBirth
            address
            noNik
            phoneNumber
          }
        }
      }
    }
  `,
}
