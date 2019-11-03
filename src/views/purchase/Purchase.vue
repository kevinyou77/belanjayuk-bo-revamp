<template>
  <div class="transaction">
    <PurchaseProductList />
    <PurchaseSelectedProduct />
    <b-modal id="error-modal">
      <span class="heading heading-default">{{ error }}</span>
    </b-modal>
  </div>
</template>

<script>
import PurchaseProductList from "./PurchaseProductList"
import PurchaseSelectedProduct from './PurchaseSelectedProduct'
import { mutations, mutationTypes } from '../../commands/purchaseCommands'
import { mapState } from 'vuex'

const createTransactionIdMutation = () => {
  const { CREATE_PURCHASE_ID } = mutationTypes
  return mutations[CREATE_PURCHASE_ID]
}

export default {
  components: {
    PurchaseProductList,
    PurchaseSelectedProduct,
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
        if (localStorage.getItem('products')) {
          this.$store.dispatch('transaction/injectSelectedProducts')
          next()
          return
        }

        if (!sessionStorage.getItem('purchaseId')) {
          sessionStorage.removeItem('purchaseId')
        }

        console.log(res)

        sessionStorage.setItem (
          'purchaseId',
          res.data.createPurchasesTransaction.purchasesTransactionId
        )
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