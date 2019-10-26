<template>
  <div class="transaction">
    <TransactionProductList />
    <TransactionSelectedProduct />
    <b-modal id="error-modal">
      <span class="heading heading-default">{{ error }}</span>
    </b-modal>
  </div>
</template>

<script>
import TransactionProductList from "./TransactionProductList"
import TransactionSelectedProduct from './TransactionSelectedProduct'
import { mutations, mutationTypes } from '../../commands/transactionCommands'
import { mapState } from 'vuex'

const createTransactionIdMutation = () => {
  const { CREATE_TRANSACTION_ID } = mutationTypes
  return mutations[CREATE_TRANSACTION_ID]
}

export default {
  components: {
    TransactionProductList,
    TransactionSelectedProduct,
  },
  computed: {
    ...mapState({
      error: state => state.transaction.error,
    }),
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$apollo.mutate({
        mutation: createTransactionIdMutation()
      })
      .then (res => {
        if (!sessionStorage.getItem('transactionId')) {
          sessionStorage.removeItem('transactionId')
        }

        sessionStorage.setItem ('transactionId', res.data.createTransaction.transactionId)
        next()
      })
      .catch (err => {
        console.log(err)
      })
    })
  },
  apollo: {

  }
}
</script>