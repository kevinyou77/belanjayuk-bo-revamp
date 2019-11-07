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
            <img :src="item.imageUrl"
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
        label=""
        label-for="input">
        Nama pelanggan
        <div v-if="$apollo.queries.customers.loading">Loading...</div>
        <b-form-select
          v-else 
          v-model="customerId"
          class="mb-3">
          <option :value="``">Please select an option</option>
          <option
            v-for="(item, index) in customers"
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
      v-if="checkoutResultData !== {}"
      id="confirm-payment-modal"
      hide-footer>
        <div class="details">
          <div 
            v-for="(item, index) in checkoutResultData.details"
            :key="index"
            class="details-item">
              <div class="details-item-box">
                <span class="details-item-box-title">
                  SKU
                </span>
                <span 
                  class="details-item-box-info">
                  : {{ item.productDetail.product.SKU }}
                </span>
              </div>
              
              <div class="details-item-box">
                <span class="details-item-box-title">
                  Nama produk 
                </span>
                <span 
                  class="details-item-box-info">
                  : {{ item.productDetail.product.name }}
                </span>
              </div>
              
              <div class="details-item-box">
                <span class="details-item-box-title">
                  Nama stok produk
                </span>
                <span 
                  class="details-item-box-info">
                  : {{ item.productDetail.productStock.name }}
                </span>
              </div>

              <div class="details-item-box">
                <span class="details-item-box-title">
                  Di beli
                </span>
                <span 
                  class="details-item-box-info">
                  : {{ item.numberOfPurchases }}
                </span>
              </div>

              <div class="details-item-box">
                <span class="details-item-box-title">
                  Stok tersedia
                </span>
                <span 
                  class="details-item-box-info">
                  : {{ item.productDetail.value }}
                </span>
              </div>

              <div
                class="details-item-box">
                <span
                  v-if="isProductStockFulfilled(item.numberOfPurchases, item.productDetail.value)"
                  class="details-item-box-available">
                  Tersedia!
                </span>
                <span
                  v-else
                  class="details-item-box-unavailable">
                  Produk tidak tersedia!
                </span>
              </div>
          </div>

          <div class="total">
            {{ checkoutResultData.totalPrice }}
          </div>
        </div>

         <b-form-group
          label="Pembayaran sejumlah"
          label-for="input">
          <b-form-input
            id="input-1"
            v-model="amountOfPayment"
            type="number"
            required
          />
          <b-form-invalid-feedback :state="isAmountOfPaymentValid">
            Pembayaran lebih banyak daripada total
          </b-form-invalid-feedback>
        </b-form-group>

        <b-button
          @click="completePayment()"
          key="`finalize button`"
          variant="primary"
          class="mt-3" 
          block >
          Bayar
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
  queryTypes as customerQueryTypes,
  queries as customerQueries,
} from '../../commands/customerCommands'

const getCustomersQuery = () => {
  const { GET_CUSTOMERS } = customerQueryTypes
  return customerQueries[GET_CUSTOMERS]
}

const checkoutMutation = () => {
  const { CHECKOUT } = mutationTypes
  return mutations[CHECKOUT]
}

const completePaymentMutation = () => {
  const { COMPLETE_TRANSACTION } = mutationTypes
  return mutations[COMPLETE_TRANSACTION]
}

export default {
  data () {
    return {
      customers: [],
      customerId: '',
      error: '',
      checkoutResultData: {},
      isAllProductAvailable: true,
      amountOfPayment: 0,
    }
  },
  computed: {
    ...mapState({
      selectedProducts: state => state.purchase.selectedProducts,
    }),
    totalPrice () {
      return this.selectedProducts.reduce ((total, item) => total + item.productDetail.sellingPrice, 0)
    },
    isSelectedProductsEmpty () {
      return this.selectedProducts.length === 0
    },
    isAmountOfPaymentValid () {
      return this.amountOfPayment > 0 || this.amountOfPayment <= this.checkoutResultData.totalPrice
    }
  },
  methods: {
    deleteSelectedProduct (item) {
      const selectedProductInfo = {
        SKU: item.SKU,
        productDetailId: item.productDetail[0].id,
      }
      this.$store.dispatch('purchase/removeSelectedProduct', selectedProductInfo)
    },
    showCheckoutModal () {
      if (this.isSelectedProductsEmpty) {
        this.$store.dispatch('purchase/setErrorMessage', 'Keranjang kosong!')
        this.$bvModal.show('error-modal')

        return
      }

      this.$bvModal.show('checkout-confirmation-modal')
    },
    checkout () {
      if (this.customerId === '') {
        this.error = 'Nama pelanggan harus diisi!'
        this.$bvModal.show('error-modal')

        return
      }

      const flattendProductDetail = this.selectedProducts.reduce((prev, { productDetail }) => {
        const detail = {
          productDetailId: productDetail[0].id,
          numberOfPurchase: productDetail[0].value
        }
        return [ ...prev, detail ]
      }, [])

      const transactionParameters = {
        transactionId: sessionStorage.getItem('transactionId'),
        customerId: this.customerId,
        staffId: sessionStorage.getItem('staffId'),
        detail: flattendProductDetail,
      }

      this.$apollo.mutate({
        mutation: checkoutMutation(),
        variables: {
          transaction: transactionParameters,
        }
      })
      .then (res => {
        this.checkoutResultData = res.data.checkout
        this.$bvModal.show('confirm-payment-modal')
      })
      .catch (err => {
        this.error = 'Terjadi masalah, coba lagi!'
        this.$bvModal.show('error-modal')
      })
    },
    completePayment () {
      this.$apollo.mutate({
        mutation: completePaymentMutation(),
        variables: {
          transactionId: sessionStorage.getItem('transactionId'),
          amountOfPayment: parseInt(this.amountOfPayment),
        }
      })
      .then (res => {
        localStorage.removeItem('products')

        this.error = 'Berhasil membayar!'
        this.$bvModal.show('error-modal')
      })
      .catch (err => {
        this.error = 'Terjadi masalah, coba lagi!'
        this.$bvModal.show('error-modal')
      })
    },
    isProductStockFulfilled (numberOfPurchases, availableStock) {
      const available = numberOfPurchases === availableStock

      !available && (this.isAllProductAvailable = false)

      return available
    },
    remainingDebt () {
      return checkoutResultData.totalPrice === this.amountOfPayment
    }
  },
  apollo: {
    customers: getCustomersQuery(),
  },
}
</script>