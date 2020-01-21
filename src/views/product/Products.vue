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
          + TAMBAH PRODUK
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
            v-if="!editFormFinalStep"
            key="`edit-product`"
            :productFields="editProductFields"
            :onProductAddConfirmed="onEditProductAddConfirmed"
            :updateProduct="updateProduct" />

          <transition-group
            v-else
            tag="div"
            name="fade"
            mode="out-in">
            <EditProductDetail
              key="`product detail`"
              :productDetailFields="editProductDetailInput"
              :onProductAddConfirmed="onEditProductAddConfirmed"
              :onProductDetailAdd="onEditProductDetailAdd" />

            <List
              key="`editlist`"
              :items="editProductDetailInputArray"
              :fields="productDetailListFields"
              :actions="editProductDetailListActions()" />

            <b-button
              @click="handleEditProductMutation()"
              key="`finalize button`"
              variant="primary"
              class="mt-3" 
              :disabled="!isEditFormConditionFulfilled"
              block >
              Simpan produk
            </b-button>
          </transition-group>
        </transition>
    </b-modal>


    <b-modal id="error-modal">
      <span class="heading heading-default">{{ error }}</span>
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

const editProductDetailMutation = () => {
  const { ADD_PRODUCT_DETAIL } = mutationTypes
  return mutations[ADD_PRODUCT_DETAIL]
}

const deleteProductDetailMutation = () => {
  const { DELETE_PRODUCT_DETAIL } = mutationTypes
  return mutations[DELETE_PRODUCT_DETAIL]
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
        stock: 0,
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
      editProductFields: {
        name: '',
        SKU: '',
        stock: 0,
        categoryId: null,
      },
      editProductDetailInput: {
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
      formFinalStep: false,
      editFormFinalStep: false,
      error: '',
      productId: null,
    }
  },
  computed: {
    isFormConditionFulfilled () {
      return this.productDetailInputArray.length !== 0
    },
    isEditFormConditionFulfilled () {
      return this.editProductDetailInputArray.length !== 0
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
        this.products = this.products.filter ((item, i) => item.id !== id)
      })
      .catch (err => console.log(err))
    },
    onProductEdit (id) {
      this.$apollo.query({
        query: getProductQuery(),
        variables: { productId: id }
      }).then (res => {
        this.editProductFields = {
          name: res.data.product.name,
          SKU: res.data.product.SKU,
          stock: res.data.product.stock,
          categoryId: res.data.product.category.id,
        }

        this.productId = res.data.product.id
        console.log(res.data.product.productDetail, 'testestste')
        this.editProductDetailInputArray = res.data.product.productDetail.map(item => {
          console.log(item.status)
          if (!item.status) return
          return {
            productStockId: item.productStock.id,
            tempId: {
              id: item.productStock.id,
              name: item.productStock.name,
            },
            sellingPrice: item.sellingPrice,
            purchasePrice: item.purchasePrice,
            value: item.value,
            productId: item.id,
          }
        })

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
        this.showModal("Data berhasil di input!")
      })
      .catch (err => {
        this.showModal("Terjadi kesalahan, mohon coba lagi!")
      })
    },
    handleEditProductMutation () {
      this.$apollo.mutate({
        mutation: editProductMutation(),
        variables: {
          ...this.constructEditMutationVariables()
        }
      })
      .then (res => {
        this.showModal("Data berhasil di ubah!")
      })
      .catch (err => {
        this.showModal("Terjadi kesalahan, coba lagi!!")
      })
    },
    onProductAddConfirmed () {
      this.formFinalStep = !this.formFinalStep
    },
    onEditProductAddConfirmed () {
      this.editFormFinalStep = !this.editFormFinalStep
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
    onEditProductDetailAdd (newProductDetail) {
      const {
        sellingPrice,
        purchasePrice,
        value,
        tempId,
      } = newProductDetail

      newProductDetail.sellingPrice = parseInt(sellingPrice)
      newProductDetail.purchasePrice = parseInt(purchasePrice)
      newProductDetail.value = parseInt(value)
      newProductDetail.productStockId = tempId.id

      this.$apollo.mutate({
        mutation: editProductDetailMutation(),
        variables: {
          productDetail: {
            productStockId: tempId.id,
            sellingPrice: parseInt(sellingPrice),
            purchasePrice: parseInt(purchasePrice),
            value: parseInt(value),
            productId: this.productId,
          }
        }
      })
      .then(res => {
        this.editProductDetailInputArray = [
          ...this.editProductDetailInputArray,
          { ...newProductDetail }
        ]
      })
      .catch (err => {
        console.log(err)
      })
    },
    onProductDetailDelete (productDetail) {
      this.productDetailInputArray = this.productDetailInputArray.filter(
        item => item.productStockId !== productDetail.productStockId
      )
    },
    onProductDetailEditDelete (productDetail) {
      console.log(productDetail, 'del')
      this.$apollo.mutate({
        mutation: deleteProductDetailMutation(),
        variables: { id: productDetail.productId }
      })
      .then (res => {
        console.log(res)
        this.editProductDetailInputArray = this.editProductDetailInputArray.filter(
          item => item.productStockId !== productDetail.productStockId
        )
      })
      .catch (res => {
        this.showModal("Terjadi kesalahan, coba lagi!")
      })

      console.log(this.editProductDetailInputArray, 'after')
    },
    constructMutationVariables () {
      const { stock } = this.addProductFields
      this.addProductFields.stock = parseInt(stock)

      const productFields = { ...this.addProductFields }
      productFields.imageUrl = 'https://images.unsplash.com/photo-1572946281197-6129946d463f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1982&q=80'
      console.log(productFields, 'pf')
      
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
    constructEditMutationVariables () {
      const { stock } = this.editProductFields
      this.editProductFields.stock = parseInt(stock)

      const productFields = { ...this.editProductFields }
      delete productFields.imageUrl
      // productFields.imageUrl = 'https://images.unsplash.com/photo-1572946281197-6129946d463f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1982&q=80'
      console.log(productFields, 'pf')
      
      return {
        product: {
          ...productFields,
          // productDetailInput: [
          //   ...this.editProductDetailInputArray.map (item => {
          //     delete item.tempId
          //     return item
          //   })
          // ]
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
    editProductDetailListActions () {
      return [
        {
          name: 'Delete',
          handle: this.onProductDetailEditDelete,
          variant: 'danger',
        }
      ]
    },
    editProductActions () {
      return [
         {
          name: 'Edit',
          handle: () => {},
          variant: 'danger',
        },
        {
          name: 'Delete',
          handle: () => {},
          variant: 'danger',
        }
      ]
    },
    showModal (msg) {
      this.error = msg
      this.$bvModal.show('error-modal')
    },
    updateProduct () {
      this.$apollo.mutate({
        mutation: editProductMutation(),
        variables: {
          productId: this.productId,
          categoryId: this.editProductFields.categoryId,
          name: this.editProductFields.name
        }
      })
      .then (res => {
        this.showModal('Data berhasil diubah!')
      })
      .catch (_ => {
        this.showModal('Terjadi masalah, coba lagi!')
      })
    },
  },
  apollo: {
    products: getProductsQuery(),
  },
}
</script>