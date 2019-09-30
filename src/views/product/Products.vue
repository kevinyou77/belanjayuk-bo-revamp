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

    <!-- MODAL -->
    <b-modal
      id="add-product-modal"
      hide-footer>
      <div class="box-underline">
        <span class="heading heading-default">Tambah Produk</span>
      </div>
        <transition
          tag="div"
          name="slide-fade"
          mode="out-in">
          <AddProduct
            v-if="!formFinalStep"
            key="`addproduct`"
            :productFields="addProductFields"
            :onProductAddConfirmed="onProductAddConfirmed" />
          <transition-group
            v-else
            tag="div"
            name="fade"
            mode="out-in">
            <AddProductDetail
              key="`detail`"
              :productDetailFields="productDetailInput"
              :onProductDetailAdd="onProductDetailAdd" />

            <List
              key="`list`"
              :items="productDetailInputArray"
              :fields="productDetailListFields"
              :actions="productDetailListActions()" />

            <b-button
              @click="handleAddProductMutation()"
              key="`finalize button`"
              variant="primary"
              class="mt-3" 
              :disabled="!isFormConditionFulfilled"
              block >
              Simpan produk
            </b-button>
          </transition-group>
        </transition>
    </b-modal>
  </div>
</template>

<script>
import ProductList from './ProductList'
import AddProduct from './AddProduct'
import AddProductDetail from './AddProductDetail'
import List from '../../components/common/List'
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
    List,
  },
  data () {
    return {
      products: [],
      addProductFields: {
        name: '',
        SKU: '',
        stock: '',
        categoryId: null,
      },
      productDetailInput: {
        productStockId: null,
        tempId: {
          id: '',
          name: '',
        },
        sellingPrice: '',
        purchasePrice: '',
        value: '',
        productId: '',
      },
      productDetailListFields: [
        'purchasePrice',
        'sellingPrice',
        { key: 'tempId.name', label: 'Unit stok' },
        { key: 'value', label: 'Jumlah stok per unit stok' },
        { key: 'actions', label: 'Aksi' }
      ],
      productDetailInputArray: [],
      formFinalStep: false,
    }
  },
  computed: {
    isFormConditionFulfilled () {
      return this.productDetailInputArray.length !== 0
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
    handleAddProductMutation () {
      console.log(this.constructMutationVariables())
      this.$apollo.mutate({
        mutation: addProductMutation(),
        variables: {
          ...this.constructMutationVariables()
        }
      })
      .then (res => {
        console.log(res)
        console.log('mantul')
      })
      .catch (err => {
        console.log(err)
        console.log('error')
      })
    },
    onProductAddConfirmed () {
      this.formFinalStep = !this.formFinalStep
    },
    onProductEdit () {

    },
    onProductDetailAdd (newProductDetail) {
      const {
        sellingPrice,
        purchasePrice,
        value,
        productStockId,
        tempId,
      } = newProductDetail

      newProductDetail.sellingPrice = parseInt(sellingPrice)
      newProductDetail.purchasePrice = parseInt(purchasePrice)
      newProductDetail.value = parseInt(value)
      newProductDetail.productStockId = tempId.id
      // newProductDetail.productStockId = `${productStockId.id}`

      console.log(productStockId, 'psi')
      console.log(newProductDetail, 'npd')

      this.productDetailInputArray = [
        ...this.productDetailInputArray,
        { ...newProductDetail }
      ]
    },
    onProductDetailDelete (productDetail) {
      console.log(productDetail, 'id')
      this.productDetailInputArray = this.productDetailInputArray.filter(
        item => item.productStockId !== productDetail.productStockId
      )
    },
    constructMutationVariables () {
      const { stock } = this.addProductFields
      this.addProductFields.stock = parseInt(stock)

      const productFields = {
        ...this.addProductFields
      }

      return {
        product: {
          ...productFields,
          productDetailInput: [
            ...this.productDetailInputArray.map (item => {
              delete item.tempId
              return item
            })
          ]
        }
      }
    },
    showAddProductModal () {
      this.$bvModal.show('add-product-modal')
    },
    productDetailListActions () {
      return [
        {
          name: 'Delete',
          handle: this.onProductDetailDelete,
          variant: 'danger',
        }
      ]
    }
  },
  apollo: {
    products: getProductsQuery(),
  },
  mounted () {
    this.showAddProductModal()
    console.log(this.products)
  },
  updated () {
    console.log(this.products)
  }
}
</script>