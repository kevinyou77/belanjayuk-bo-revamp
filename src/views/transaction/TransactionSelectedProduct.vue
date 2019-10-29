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
            <!-- <img :src="item.image"
              width="100"
              heigh="100" alt=""> -->
          </div>

          <div class="transaction-selected-list-item-info">
            <span class="font font-default font-bold">
            {{ item.name }}
            </span>
            <span class="font font-default font-bold">
              {{ item.SKU }}
            </span>
            <span class="font font-default font-bold">
              <span 
                v-for="(detail, index) in item.productDetail"
                :key="index"
                class="font font-default font-bold">
                  Name: {{ item.productDetail[0].productStock.name }}
                  Value: {{ item.productDetail[0].value }}
                  Total: {{ item.productDetail[0].value * item.productDetail[0].sellingPrice }}
              </span>
            </span>
          </div>

          <div class="transaction-selected-list-item-action">
            <button
              @click="deleteSelectedProduct(item)"
              class="button button-default"
             >Delete</button>
          </div>
      </div>
    </div>

    <div class="transaction-selected-info">
      <b-form-group
        label="Jenis stok"
        label-for="input">

        <div v-if="$apollo.queries.staffs.loading">Loading...</div>
        <b-form-select
          v-else 
          v-model="customerId"
          class="mb-3">
          <option :value="``">Please select an option</option>
          <option
            v-for="(item, index) in staffs"
            :key="index"
            :value="item.id">
            {{ item.user.userProfile.fullName }}
          </option>
        </b-form-select>
        <!-- <b-form-invalid-feedback :state="isProductStockTypeValid">
          Pilih unit stok!
        </b-form-invalid-feedback> -->
      </b-form-group>

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

    <b-modal
      id="error-modal">
      {{ error }}
    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mutations, mutationTypes } from '../../commands/transactionCommands'
import {
  queries as staffQueries,
  queryTypes as staffQueryTypes
} from '../../commands/staffCommands'

const getCustomersQuery = () => {
  const { GET_CUSTOMERS } = staffQueryTypes
  return staffQueries[GET_CUSTOMERS]
}

const checkoutMutation = () => {
  const { CHECKOUT } = mutationTypes
  return mutations[CHECKOUT]
}

// const completePaymentMutation = () => {
//   const { COMPLETE_PAYMENT } = mutationTypes
//   return mutations[COMPLETE_PAYMENT]
// }

export default {
  data () {
    return {
      staffs: [],
      customerId: '',
      error: '',
    }
  },
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
    deleteSelectedProduct (item) {
      const selectedProductInfo = {
        SKU: item.SKU,
        productDetailId: item.productDetail[0].id,
      }
      this.$store.dispatch('transaction/removeSelectedProduct', selectedProductInfo)
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
      if (this.customerId === '') {
        console.log(this.selectedProducts)
        this.error = 'Nama pelanggan harus diisi!'
        this.$bvModal.show('error-modal')

        return
      }

      const transactionParameters = {
        transactionId: sessionStorage.getItem('transactionId'),
        customerId: this.customerId,
        staffId: sessionStorage.getItem('staffId'),
        detail: [
          ...this.selectedProducts
        ],
      }
      this.$apollo.mutate({
        mutation: checkoutMutation(),
        variables: {
          transaction: transactionParameters,
        }
      })
      .then (res => {
        console.log(res, 'berhasil')
      })
      .catch (err => {
        console.log(err, 'someshit happened')
      })
    }
  },
  updated () {
    console.log(this.selectedProducts)
    console.log(this.customerId)
  },
  apollo: {
    staffs: getCustomersQuery()
  }
}
</script>