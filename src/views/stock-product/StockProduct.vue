<template>
  <div class="category">
    <div class="category-content">
      <AddStockProduct
        :addStockProductMutation="addStockProductMutation"
        :stockProductName="stockProductName"
        :onStockProductMutationDone="onStockProductMutationDone"
      />

      <div v-if="$apollo.queries.productStocks.loading">Loading...</div>
      <StockProductList v-else
        :productStocks="productStocks"
        :onProductEdit="onStockProductListItemEdit"
        :onProductDelete="onStockProductListItemDelete" />

      <b-modal id="my-modal">
        <EditStockProduct
          :addStockProductMutation="addStockProductMutation"
          :stockProductName="stockProductName"
          :onStockProductMutationDone="onStockProductMutationDone"
        />
      </b-modal>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import StockProductList from '../stock-product/StockProductList'
import AddStockProduct from './AddStockProduct'
import { queries, mutations, queryTypes, mutationTypes } from '../../commands/stockProductCommands'

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

export default {
  components: {
    StockProductList,
    AddStockProduct,
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
      this.$bvModal.show()
    },
    onStockProductListItemDelete (item, index, target) {
      this.deleteStockProduct(item.id)
    },
    deleteStockProduct (id) {
      this.$apollo.mutate({
        mutation: deleteStockProductQuery(),
        variables: {
          id,
        }
      })
      .then ((data) => {
        this.productStocks = this.productStocks.filter ((item, i) => item.id !== id)
      })
      .catch (err => {
        
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