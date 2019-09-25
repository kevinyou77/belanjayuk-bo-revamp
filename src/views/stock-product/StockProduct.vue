<template>
  <div class="category">
    <div class="category-content">
      <ApolloMutation
          :mutation="addStockProductMutation"
          :variables="{ name: stockProductName }"
          @done="onStockProductMutationDone"
        >
        <template v-slot="{ mutate, loading, error, done }">
          <b-form-group
            id="input-group-1"
            label="Nama stok produk:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="stockProductName"
              type="text"
              required
            ></b-form-input>

            <b-button
              @click="mutate()"
             type="submit" variant="primary">Simpan</b-button>
          </b-form-group>

          <p v-if="error">An error occured: {{ error }}</p>
          <p v-if="done">An error occured: {{ done }}</p>
        </template>
      </ApolloMutation>

      <div v-if="$apollo.queries.productStocks.loading">Loading...</div>
      <StockProductList v-else
        :productStocks="productStocks"
        :onProductEdit="onStockProductListItemEdit"
        :onProductDelete="onStockProductListItemDelete" />
    </div>
  </div>
</template>

<script>
import StockProductList from '../stock-product/StockProductList'
import { queries, mutations, queryTypes, mutationTypes } from '../../commands/stockProductCommands'
import gql from 'graphql-tag'

const getStockProductsQuery = () => {
  const { GET_PRODUCT_STOCKS } = queryTypes
  const getStockProductsQuery = queries[GET_PRODUCT_STOCKS]

  return getStockProductsQuery
}

const deleteStockProductQuery = () => {
  const { DELETE_STOCK_PRODUCT } = mutationTypes
  const deleteQuery = mutations[DELETE_STOCK_PRODUCT]

  return deleteQuery
}

console.log(deleteStockProductQuery())

export default {
  components: {
    StockProductList,
  },
  data () {
    return {
      stockProductName: '',
      productStocks: [],
    }
  },
  methods: {
    onStockProductMutationDone(res) {
      this.$apollo.queries.productStocks.refetch()
      this.stockProductName = ''
    },
    onStockProductListItemEdit (item, index, target) {
      console.log(item)
      console.log(index)
      console.log(target)
    },
    onStockProductListItemDelete (item, index, target) {
      this.deleteStockProduct(item.id)
      console.log(item.id)
      console.log(index)
      console.log(target)
    },
    deleteStockProduct (id) {
      this.productStocks = this.productStocks.filter ((item, i) => item.id !== id)
      this.$apollo.mutate({
        mutation: deleteStockProductQuery(),
        variables: {
          id,
        }
      }).then ((data) => {
        console.log(data)
      })
    }
  },
  computed: {
    addStockProductMutation () {
      const { ADD_STOCK_PRODUCT } = mutationTypes
      const addMutation = mutations[ADD_STOCK_PRODUCT]

      return addMutation
    },
  },
  apollo: {
    productStocks: getStockProductsQuery(),

  },
  
}
</script>