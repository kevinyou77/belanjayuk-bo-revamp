<template>
  <div class="products">
    <div class="products-content">
      <div class="products-content-header">
        <div class="box-underline">
          <span class="heading heading-default">Daftar Produk</span>
        </div>

         <b-button
          variant="primary"
          class="mt-3" >
          TAMBAH PRODUK
        </b-button>
      </div>
  
      <ProductList
        :products="products"
        :onProductDelete="onProductDelete"
        :onProductEdit="onProductEdit" />
    </div>
    <b-modal
      id="add-product-modal"
      hide-footer>
      <div class="box-underline">
        <span class="heading heading-default">Tambah</span>
      </div>

      <transition name="fade" mode="out-in">
        <AddProduct
          v-if="!switched"
          :productFields="addProductFields"
          :onProductAddConfirmed="onProductAddConfirmed" />

        <AddProductDetail
          v-else
          :productDetailFields="productDetailInput"
          :onProductDetailAdd="onProductDetailAdd" />
      </transition>

      

        <b-button
          @click="switched = !switched"
          variant="success"
          class="mt-3" 
          block >
          Simpan
        </b-button>
    </b-modal>
  </div>
</template>

<script>
import ProductList from './ProductList'
import AddProduct from './AddProduct'
import AddProductDetail from './AddProductDetail'
import {
  queries,
  mutations,
  queryTypes,
  mutationTypes
} from '../../commands/productCommands'

const getProductsQuery = () => {
  const { GET_PRODUCTS } = queryTypes
  const getProducts = queries[GET_PRODUCTS]

  return getProducts
}

const deleteProductMutation = () => {
  const { DELETE_PRODUCT } = mutationTypes
  const deleteProduct = mutations[DELETE_PRODUCT]

  return deleteProduct
}

const addProductMutation = () => {
  const { ADD_PRODUCT } = mutationTypes
  const addProduct = mutations[ADD_PRODUCT]

  return addProduct
}

export default {
  components: {
    ProductList,
    AddProduct,
    AddProductDetail,
  },
  data () {
    return {
      products: [],
      addProductFields: {
        name: '',
        SKU: '',
        stock: '',
        category: null,
      },
      productDetailInput: {
        productStockId: null,
        sellingPrice: '',
        purchasePrice: '',
        value: '',
        productId: '',
      },
      productDetailInputArray: [],
      switched: false,
    }
  },
  methods: {
    onProductDelete (id) {
      this.$apollo.mutate({
        mutation: deleteProductMutation(),
        variables: {
          id
        }
      })
      .then (res => {
        console.log(res)
        this.products = this.products.filter ((item, i) => item.id !== id)
      })
      .catch (err => console.log(err))
    },
    addProductMutation () {
      this.$apollo.mutate({
        mutation: addProductMutation(),
        variables: {
          ...this.constructMutationVariables()
        }
      })
      .then (res => {
        console.log(res)
      })
      .catch (err => console.log(err))
    },
    onProductAddConfirmed () {

    },
    onProductEdit () {

    },
    onProductDetailAdd (newProductDetail) {
      this.productDetailInputArray = [
        ...this.productDetailInput,
        { ...newProductDetail }
      ]
    },
    constructMutationVariables () {
      const productFields = {
        ...this.addProductFields
      }

      return {
        product: {
          productFields,
          productDetailInput: [
            ...this.productDetailInputArray
          ]
        }
      }
    },
    showAddProductModal () {
      this.$bvModal.show('add-product-modal')
    }
  },
  apollo: {
    products: getProductsQuery(),
  },
  mounted () {
    this.showAddProductModal()
  }
}
</script>