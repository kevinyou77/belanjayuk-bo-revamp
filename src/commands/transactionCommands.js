import gql from 'graphql-tag'

export const mutationTypes = {
  CREATE_TRANSACTION_ID: 'createTransactionId',
  CHECKOUT: 'checkout',
  COMPLETE_TRANSACTION: 'createTransaction',
}

export const queryTypes = {
  GET_TRANSACTIONS: 'getTransactions',
  GET_TRANSACTION: 'getTransaction',
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
        totalPrice
        debt
        details {
          numberOfPurchases
          status
          productDetail {
            value
            productStock {
              id
              name
            }
            product {
              SKU
              name
            }
          }
        }
      }
    }
  `,
  [mutationTypes.COMPLETE_TRANSACTION]: gql`
    mutation completePayment (
      $transactionId: String!,
      $amountOfPayment: BigDecimal!
    ) {
      completePayment(
        transactionId: $transactionId,
        amountOfPayment: $amountOfPayment
      ){
        status
        totalPrice
        debt
        details {
          numberOfPurchases
        }
      }
    }
  `
}

export const queries = {
  [queryTypes.GET_TRANSACTIONS]: gql`
    query ($limit: Int!) {
      transactionsWithLimit(limit: $limit) {
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
  [queryTypes.GET_TRANSACTION]: gql`
    query transaction($transactionId: String!) {
      transaction(transactionId: $transactionId){
        paymentStatus
        totalPrice
        profit
        status
        date
        id
        transactionDetail {
          numberOfPurchases
          status
          id
          transactionID
          productDetail {
            value
            status
            id
            productStock {
              name
              status
              id
            }
            sellingPrice
            purchasePrice
            product {
              SKU
              name
              stock
              imageUrl
              status
              id
              category {
                name
                status
                id
              } 
            }
          }
        } 
        staff {
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
        } 
        payment {
          debt
          amountOfPayment
          id
        }
      }
    }
  `
}
