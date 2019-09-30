<template>
  <div class="products">
    <div class="products-content">
      <div class="products-content-header">
        <div class="box-underline">
          <span class="heading heading-default">Daftar Produk</span>
        </div>

         <b-button
          @click="showAddProductModal()"
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

    <!-- ADD MODAL -->
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

    <!-- EDIT MODAL -->
    <b-modal
      id="edit-product-modal"
      hide-footer>
      <div class="box-underline">
        <span class="heading heading-default">Edit produk</span>
      </div>
        <transition
          tag="div"
          name="slide-fade"
          mode="out-in">
          <EditProduct
            v-if="!formFinalStep"
            key="`edit-product`"
            :editProductData="editProductData"
            :productFields="addProductFields"
            :onProductAddConfirmed="onProductAddConfirmed" />

          <transition-group
            v-else
            tag="div"
            name="fade"
            mode="out-in">
            <EditProductDetail
              key="`detail`"
              :productDetailFields="productDetailInput"
              :onProductDetailAdd="onProductDetailAdd" />

            <List
              key="`list`"
              :items="editProductDetailInputArray"
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

import EditProduct from './edit/EditProduct'
import EditProductDetail from './edit/EditProductDetail'

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

const getProductQuery = () => {
  const { GET_PRODUCT } = queryTypes
  const getProducts = queries[GET_PRODUCT]
  
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

const editProductMutation = () => {
  const { UPDATE_PRODUCT } = mutationTypes
  const updateProduct = mutations[UPDATE_PRODUCT]

  return updateProduct
}

export default {
  components: {
    ProductList,
    AddProduct,
    AddProductDetail,
    EditProduct,
    EditProductDetail,
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
      editProductDetailInputArray: [],
      formFinalStep: false,
    }
  },
  computed: {
    isFormConditionFulfilled () {
      return this.productDetailInputArray.length !== 0
    }
  },
  methods: {
    resetForm () {
      this.addProductFields = {
        name: '',
        SKU: '',
        stock: '',
        categoryId: null,
      }

      this.productDetailInput = {
        productStockId: null,
        tempId: {
          id: '',
          name: '',
        },
        sellingPrice: '',
        purchasePrice: '',
        value: '',
        productId: '',
      }
      this.productDetailInputArray = []
    },
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
    onProductEdit (id) {
      this.$apollo.queries.editProductData.refetch({ name: id }).then (res => {
        this.showEditProductModal()
      })
      .catch (err => console.log(err))
    },
    handleAddProductMutation () {
      this.$apollo.mutate({
        mutation: addProductMutation(),
        variables: {
          ...this.constructMutationVariables()
        }
      })
      .then (res => {
        console.log(res)
      })
      .catch (err => {
        console.log(err)
      })
    },
    onProductAddConfirmed () {
      this.formFinalStep = !this.formFinalStep
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

      this.productDetailInputArray = [
        ...this.productDetailInputArray,
        { ...newProductDetail }
      ]
    },
    onProductDetailDelete (productDetail) {
      this.productDetailInputArray = this.productDetailInputArray.filter(
        item => item.productStockId !== productDetail.productStockId
      )
    },
    constructMutationVariables () {
      const { stock } = this.addProductFields
      this.addProductFields.stock = parseInt(stock)

      const productFields = { ...this.addProductFields }

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
    showEditProductModal () {
      this.$bvModal.show('edit-product-modal')
    },
    productDetailListActions () {
      return [
        {
          name: 'Delete',
          handle: this.onProductDetailDelete,
          variant: 'danger',
        }
      ]
    },
    editProductActions () {
      return [
         {
          name: 'Edit',
          handle: this,
          variant: 'danger',
        },
        {
          name: 'Delete',
          handle: this.onProductDetailDelete,
          variant: 'danger',
        }
      ]
    },
  },
  apollo: {
    products: getProductsQuery(),
    editProductData: getProductQuery(),
  },
}
</script>