import gql from 'graphql-tag'

export const mutationTypes = {
  ADD_STAFF: 'addTransaction',
}

export const queryTypes = {
  GET_TRANSACTIONS: 'getTransactions',
}

export const mutations = {
  [mutationTypes.ADD_STAFF]: gql`
    mutation createStaff($staff: StaffInput!) {
      createStaff(staff: $staff) {
          id
          user {
            username
            password
            email
            userProfile{
              address
              fullName
              dateOfBirth
              noNik
              phoneNumber
            }
          }
          role {
            name
          }
      }
    }
  `,
}

export const queries = {
  [queryTypes.GET_TRANSACTIONS]: gql`
    query transactions {
      transactions {
        paymentStatus
        totalPrice
        status
        date
        id
        name
      }
    }
  `
}
