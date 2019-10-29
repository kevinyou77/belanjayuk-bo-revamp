import gql from 'graphql-tag'

export const mutationTypes = {
  CREATE_TRANSACTION_ID: 'createTransactionId',
  CHECKOUT: 'checkout',
  COMPLETE_TRANSACTION: 'createTransaction',
}

export const queryTypes = {
  GET_TRANSACTIONS: 'getTransactions',
  GET_TRANSACTIONS_BY_STATUS: 'getTransactionsByStatus',
  GET_TRANSACTION_DETAIL: 'getTransactionDetail',
}

export const mutations = {
  [mutationTypes.CREATE_TRANSACTION_ID]: gql`
    mutation {
      createTransaction {
        status
        transactionId
      }
    }
  `,
  [mutationTypes.CHECKOUT]: gql`
    mutation checkout ($transaction: TransactionInput!) {
      checkout(transaction: $transaction) {
        status
        details {
          numberOfPurchases
        }
      }
    }
  `,
  [mutationTypes.COMPLETE_TRANSACTION]: gql`
    mutation completePayment ($transactionId: String!) {
      completePayment(transactionId: $transactionId){
        status
        details {
          numberOfPurchases
        }
      }
    }
  `
}

export const queries = {
  [queryTypes.GET_TRANSACTIONS]: gql`
    query transactions {
      transactionsWithLimit(limit: 10){
        totalCount
        hasNextData
        transactions {
          paymentStatus
          totalPrice
          status
          id
          date
          staff {
            status
            id
            user {
              username
              userProfile {
                fullName
              }
            }
            role {
              id
              name
            }
          }
          customer {
            status
            id
            user {
              username
              password
              email
              userProfile {
                fullName
                phoneNumber
                address
                noNik
                dateOfBirth
                id
              }
            }
            role {
              name
              id
            }
          } 
        }
      }
    }
  `,
  [queryTypes.GET_TRANSACTIONS_BY_STATUS]: gql`
    query transactions($status: Int!) {
      transactions (status: $status) { 
        paymentStatus
        totalPrice
        status
        date
        id
        staff {
          user {
            username
            userProfile {
              fullName
            }
          }
        }
        customer {
          user {
            username
            userProfile {
              fullName
            }
          }
        }
      }
    }
  `,
  // [queryTypes.GET_TRANSACTION_DETAIL]: gql`
  //   transactions(transactionId: String!) {
  //     paymentStatus
  //     totalPrice
  //     status
  //     date
  //     id
  //     staff {
  //       user {
  //         username
  //         userProfile {
  //           fullName
  //         }
  //       }
  //       role
  //     }
  //     customer {
  //       user {
  //         username
  //         userProfile {
  //           fullName
  //         }
  //       }
  //     }
  //   }
  // }
  // `,
}
