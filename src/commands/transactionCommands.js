import gql from 'graphql-tag'

export const mutationTypes = {
  CREATE_TRANSACTION_ID: 'createTransactionId',
  CHECKOUT: 'checkout',
  COMPLETE_TRANSACTION: 'createTransaction',
  PAY_OFF_DEBT: 'payOffDebt',
  REFUND_TRANSACTION: 'refundTransaction',
  COMPLETE_REFUND: 'completeRefund'
}

export const queryTypes = {
  GET_TRANSACTIONS: 'getTransactions',
  GET_TRANSACTION: 'getTransaction',
  GET_TRANSACTIONS_BY_STATUS: 'getTransactionsByStatus',
  GET_TRANSACTION_DETAIL: 'getTransactionDetail',
  GET_TRANSACTION_BY_PAYMENT_STATUS: 'getTransactionByPaymentStatus'
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
  `,
  [mutationTypes.PAY_OFF_DEBT]: gql`
    mutation(
      $transactionId: String!, 
      $amountPaid: BigDecimal!){
      payOffDebt(
        transactionId: $transactionId,
        amountPaid: $amountPaid
      ){
        paymentStatus
        totalPrice
        profit
        status
        date
        id
        transactionDetail
        staff
        customer
        payment
      }
    }  
  `,
  [mutationTypes.REFUND_TRANSACTION]: gql`
    mutation (
      $transactionId: String!
    ) {
      refundTransaction(transactionId: $transactionId){
        totalRefund
        totalPrice
        transactionDetails
      }
    }
  `,
  [mutationTypes.COMPLETE_REFUND]: gql`
    mutation(
      $transactionId: String!
    ) {
      completeRefund(transactionId: $transactionId){
        paymentStatus
        totalPrice
        profit
        status
        date
        id
        transactionDetail
        staff
        customer
        payment
      }
    }
  `
}

export const queries = {
  [queryTypes.GET_TRANSACTIONS]: gql`
    query ($limit: Int!, $status: Int!) {
      transactionsWithLimit(limit: $limit, status: $status) {
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
    query transaction($transactionId: String!,) {
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
  `,
  [queryTypes.GET_TRANSACTION_BY_PAYMENT_STATUS]: gql`
    query transactionsByPaymentStatus ($paymentStatus: Int!) {
      transactionsByPaymentStatus (paymentStatus: $paymentStatus) { 
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
              phoneNumber
              address
            }
          }
        }
        payment {
          debt
          amountOfPayment
          id
        }
        customer {
          user {
            username
            userProfile {
              fullName
              phoneNumber
              address
            }
          }
        }
      }
    }
  `
}
