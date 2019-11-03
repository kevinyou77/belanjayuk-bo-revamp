import gql from 'graphql-tag'

export const mutationTypes = {
  CREATE_PURCHASE_ID: 'createPurchaseId',
  CHECKOUT: 'checkout',
  COMPLETE_PAYMENT_PURCHASE: 'completePaymentPurchase',
}

export const queryTypes = {
  GET_TRANSACTIONS: 'getTransactions',
  GET_TRANSACTIONS_BY_STATUS: 'getTransactionsByStatus',
  GET_TRANSACTION_DETAIL: 'getTransactionDetail',
}

export const mutations = {
  [mutationTypes.CREATE_PURCHASE_ID]: gql`
    mutation{
      createPurchasesTransaction{
        status
        purchasesTransactionId
      }
    }
  `,
  [mutationTypes.CHECKOUT]: gql`
    mutation checkoutPurchases ($purchaseTransaction: PurchasesTransactionInput!) {
      checkoutPurchases(purchasesTransaction: $purchaseTransaction){
        status
        totalPrice
        debt
        details {
          numberOfPurchases
          id
          purchasesTransactionId
          productDetail {
            value
            status
            productStock {
              name
              id
            }
            sellingPrice
            purchasePrice
            product {
              SKU
              name
            }
          }
        }
      }
    }
  `,
  [mutationTypes.COMPLETE_PAYMENT_PURCHASE]: gql`
    mutation completePayment (
      $purchasesTransactionId: String!,
      $amountOfPayment: BigDecimal!
    ) {
      completePayment(
        purchasesTransactionId: $purchasesTransactionId,
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
