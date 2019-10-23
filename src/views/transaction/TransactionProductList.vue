<template>
  <div class="transaction-list">
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
          :src="product.image"
          width="120"
          height="120">
        <div class="font font-default font-bold">{{ product.name }}</div>
        <div class="font font-default">{{ product.SKU }}</div>
        <div class="font font-default">{{ product.stock }}</div>
      </div>
    </div>

    <b-modal
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
            <span class="font font-default">Harga: {{ selectedProduct.productDetail.sellingPrice }}</span>

            <span class="font font-default">Total harga: {{ totalPrice }}</span>

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

// const getProductsQuery = () => {
//   const { GET_PRODUCTS } = queryTypes
//   const getProducts = queries[GET_PRODUCTS]

//   return getProducts
// }

export default {
  data () {
    return {
      stockAmount: 0,
      selectedProduct: {
        name: '',
        SKU: '',
        stock: 0,
        image: '',
        productDetail: {
          sellingPrice: 0,
        },
      },
      products: [
        {
          SKU: '1232131232',
          name: 'Lays Seaweed',
          stock: 123,
          image: 'https://i5.walmartimages.ca/images/Large/172/111/6000200172111.jpg',
          productDetail: {
            sellingPrice: 20000
          }
        },
        {
          SKU: '5675676',
          name: 'Nestle Nestum',
          stock: 123,
          image: 'https://i5.walmartimages.ca/images/Large/172/111/6000200172111.jpg',
          productDetail: {
            sellingPrice: 20000
          }
        },
        {
          SKU: '4534524',
          name: 'Nestle Coffee 45g',
          stock: 123,
          image: 'https://i5.walmartimages.ca/images/Large/172/111/6000200172111.jpg',
          productDetail: {
            sellingPrice: 20000
          }
        },
        {
          SKU: '789789789',
          name: 'UC Orange Water 500ml',
          stock: 123,
          image: 'https://i5.walmartimages.ca/images/Large/172/111/6000200172111.jpg',
          productDetail: {
            sellingPrice: 20000
          }
        },
      ],
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
    totalPrice () {
      if (this.stockAmount === 0) return 0
      return this.stockAmount * this.selectedProduct.productDetail.sellingPrice
    }
  },
  methods: {
    showToast () {
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
      const itemExistsInSelectedProduct = this.selectedProducts.find(item => item.SKU === newProduct.SKU)
      if (itemExistsInSelectedProduct) {
        this.showToast()
        return
      }

      this.$store.dispatch('transaction/addSelectedProduct', newProduct)
      this.$bvModal.hide('transaction-product-modal')
      this.showSuccessToast()
    }
    // handleTransactionItemOnClick(newProduct) {
    //   const itemExistsInSelectedProduct = this.selectedProducts.find(item => item.SKU === newProduct.SKU)
    //   console.log(itemExistsInSelectedProduct)
    //   console.log(newProduct.SKU)
    //   if (itemExistsInSelectedProduct) {
    //     this.showToast()
    //     return
    //   }

    //   this.$store.dispatch('transaction/addSelectedProduct', newProduct)
    // }
  },
  // apollo: {
  //   products: getProductsQuery()
  // },
  // updated () {
  //   console.log(this.products)
  // }
}
</script>