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

const createPurchaseIdMutation = () => {
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
      error: state => state.purchase.error,
    }),
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$apollo.mutate({
        mutation: createPurchaseIdMutation()
      })
      .then (res => {
        const existingPurchaseProducts = localStorage.getItem('purchaseProducts')
        if (existingPurchaseProducts) {
          vm.$store.dispatch('purchase/injectSelectedProducts', JSON.parse(existingPurchaseProducts))

          next()
          return
        }

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