<template>
  <div class="products">
    <div class="products-content">
      <div class="box-underline">
        <span class="heading heading-default">Daftar Produk</span>
      </div>
      
      <ProductList
        :products="products"
        :onProductDelete="onProductDelete"
        :onProductEdit="onProductEdit" />
    </div>
    
  </div>
</template>

<script>
import ProductList from './ProductList'
import { queries, mutations, queryTypes, mutationTypes } from '../../commands/productCommands'

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

export default {
  components: {
    ProductList,
  },
  data () {
    return {
      products: [],
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
    onProductEdit () {

    },
  },
  apollo: {
    products: getProductsQuery()
  }
}
</script>