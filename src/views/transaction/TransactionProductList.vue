<template>
  <div class="transaction-list">
    <div>
      <span class="heading heading-default">Transaksi</span>
    </div>

    <div class="transaction-list-search-bar">
      <b-form-input
        v-model="searchQuery"
        placeholder="Cari produk..."></b-form-input>
    </div>

    <div class="transaction-list-content">
      <!-- <div class="loading" v-if="$apollo.queries.products.loading">Loading</div> -->
      <div class="transaction-list-content-item"
        v-for="(product, index) in filteredProductList"
        @click="handleTransactionItemOnClick(product)"
        :key="index">
        <img
          :src="product.imageUrl"
          width="120"
          height="120">
        <div class="font font-default font-bold">{{ product.name }}</div>
        <div class="font font-default">{{ product.SKU }}</div>
        <div class="font font-default">{{ product.stock }}</div>
      </div>
    </div>

    <b-modal
      @hidden="resetSelectedProductData()"
      id="transaction-product-modal"
      hide-footer>

      <div class="transaction-product-modal">
        <div class="transaction-product-modal-info">
          <img 
            :src="selectedProduct.image"
            height="150"
            width="150" />

          <div class="transaction-product-modal-desc">
            <span class="font font-medium font-bold">{{ selectedProduct.name }}</span>
            <span class="font font-default">SKU: {{ selectedProduct.SKU }}</span>
            <span class="font font-default">Stok tersedia: {{ selectedProduct.stock }}</span>
            <span class="font font-default">Harga: {{ sellingPrice }}</span>

            <span class="font font-default">Total harga: {{ totalPrice }}</span>
<!-- console.log(this.selectedProduct.productDetail[0].productStock.id, 'od') -->
            <b-form-group
              label="Stok produk"
              label-for="input"
              >
              <b-form-select
                v-model="productStockId"
                class="mb-3">
                <option :value="null">Please select an option</option>
                <option
                  v-for="(item, index) in selectedProduct.productDetail"
                  :key="index"
                  :value="item.productStock.id">
                  {{ item.productStock.name }}
                </option>
              </b-form-select>
            </b-form-group>

             <b-form-group
              label="Jumlah stok"
              label-for="input">
              <b-form-input
                label="Jumlah stok"
                id="input-1"
                v-model="stockAmount"
                type="number"
                required
              ></b-form-input>
              <b-form-invalid-feedback :state="isStockValid">
                Jumlah stok tidak mencukupi
              </b-form-invalid-feedback>
            </b-form-group>
          </div>
        </div>
        <button
          @click="handleTransactionModalAdd(selectedProduct)"
          class="button button-primary">
          Tambah
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { queries, queryTypes } from '../../commands/productCommands'
import { mapState } from 'vuex'

const getProductsQuery = () => {
  const { GET_PRODUCTS } = queryTypes
  const getProducts = queries[GET_PRODUCTS]

  return getProducts
}

export default {
  data () {
    return {
      stockAmount: 0,
      selectedProduct: {
        name: '',
        SKU: '',
        stock: 0,
        image: '',
        productDetail: [
          {
            sellingPrice: 0,
            productStock: {
              id: '',
              name: '',
            }
          }
        ],
      },
      productStockId: '',
      products: [],
      searchQuery: '',
    }
  },
  computed: {
    ...mapState({
      selectedProducts: state => state.transaction.selectedProducts,
    }),
    filteredProductList () {
      return this.products.filter(item => {
        return (
          item.SKU.toLowerCase().includes(this.searchQuery)
          || item.name.toLowerCase().includes(this.searchQuery)
        )
      })
    },
    isStockValid () {
      return this.stockAmount <= this.selectedProduct.stock
    },
    productDetailItem () {
      const { productDetail } = this.selectedProduct
      return productDetail.find(item => item.productStock.id === this.productStockId)
    },
    totalPrice () {
      if (this.stockAmount === 0 || this.stockAmount === '') return 0

      return this.stockAmount * this.productDetailItem.sellingPrice
    },
    sellingPrice () {
      if (this.productStockId === '') return 0

      return this.productDetailItem.sellingPrice
    }
  },
  methods: {
    showFailedToast () {
      this.$bvToast.toast(`Oops`, {
        title: 'Produk telah sudah ada di cart',
        autoHideDelay: 1000,
        toaster: 'b-toaster-top-center'
      })
    },
    showSuccessToast () {
      this.$bvToast.toast(`Mantul!`, {
        title: 'Produk sukses ditambah kedalam cart',
        autoHideDelay: 1000,
        toaster: 'b-toaster-top-center'
      })
    },
    showModal () {
      this.$bvModal.show('transaction-product-modal')
    },
    handleTransactionItemOnClick (newProduct) {
      this.selectedProduct = { ...newProduct }
      this.showModal()
    },
    handleTransactionModalAdd (newProduct) {
      const product = { ...newProduct }
      const { productDetail } = product
      const filteredProductDetail = productDetail.filter(item => item.productStock.id === this.productStockId)

      filteredProductDetail[0].stockAmount = this.stockAmount
      product.productDetail = filteredProductDetail

      this.$store.dispatch('transaction/addSelectedProduct', product)
        .then(res => {
          this.showSuccessToast()
          localStorage.setItem('products', JSON.stringify(this.selectedProducts))
          console.log(this.selectedProducts)
        })
        .catch(err => this.showFailedToast())

      this.$bvModal.hide('transaction-product-modal')
      this.showSuccessToast()
    },
    resetSelectedProductData () {
      this.productStockId = ''
      this.stockAmount = 0
      this.selectedProduct = {
        name: '',
        SKU: '',
        stock: 0,
        image: '',
        productDetail: [
          {
            sellingPrice: 0,
            productStock: {
              id: '',
              name: '',
            }
          }
        ],
      }
    }
  },
  apollo: {
    products: getProductsQuery()
  },
}
</script>