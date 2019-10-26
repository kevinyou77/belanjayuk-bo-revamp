<template>
  <div class="transaction-selected">
    <div class="transaction-selected-list">
      <div
        v-if="selectedProducts.length === 0"
        class="transaction-selected-list-empty"
        >
      </div>
      <div
        v-else
        v-for="(item, index) in selectedProducts"
        class="transaction-selected-list-item"
        :key="index"
        >
          <div class="transaction-selected-list-item-image">
            <img :src="item.image"
              width="100"
              heigh="100" alt="">
          </div>

          <div class="transaction-selected-list-item-info">
            <span class="font font-default font-bold">
            {{ item.name }}
            </span>
            <span class="font font-default font-bold">
              {{ item.SKU }}
            </span>
            <span class="font font-default font-bold">
              {{ item.stock }}
            </span>
          </div>

          <div class="transaction-selected-list-item-action">
            <button
              @click="deleteSelectedProduct(item.SKU)"
              class="button button-default"
             >Delete</button>
          </div>
      </div>
    </div>

    <div class="transaction-selected-info">
      <div class="transaction-selected-info-total">
        Total harga: {{ totalPrice }}
      </div>

      <button
        @click="checkout()"
        class="button button-primary"
        >
        Checkout
      </button>
    </div>

    <b-modal
      id="checkout-confirmation-modal"
      hide-footer>
        <b-button
          @click="handleAddProductMutation()"
          key="`finalize button`"
          variant="primary"
          class="mt-3" 
          block >
          Simpan produk
        </b-button>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mutations, mutationTypes } from '../../commands/transactionCommands'

const checkoutMutation = () => {
  const { CHECKOUT } = mutationTypes
  return mutations[CHECKOUT]
}

export default {
  computed: {
    ...mapState({
      selectedProducts: state => state.transaction.selectedProducts,
    }),
    totalPrice () {
      return this.selectedProducts.reduce ((total, item) => total + item.productDetail.sellingPrice, 0)
    },
    isSelectedProductsEmpty () {
      return this.selectedProducts.length === 0
    },
  },
  methods: {
    deleteSelectedProduct (SKU) {
      this.$store.dispatch('transaction/removeSelectedProduct', SKU)
    },
    showCheckoutModal () {
      if (this.isSelectedProductsEmpty) {
        store.dispatch('transaction/setErrorMessage', 'Keranjang kosong!')
        this.$bvModal.show('error-modal')

        return
      }

      this.$bvModal.show('checkout-confirmation-modal')
    },
    checkout () {
      const transactionParameters = {
        transactionId: sessionStorage.getItem('transactionId'),
        customerId: '',
        staffId: '',
        detail: [
          ...this.selectedProducts
        ]
      }
      this.$apollo.mutate({
        mutation: checkoutMutation(),
        variables: {
          transaction: transactionParameters,
        }
      })
      .then (res => {

      })
      .catch (err => console.log(err))
    }
  },
}
</script>