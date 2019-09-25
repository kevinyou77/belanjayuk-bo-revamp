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
        :productStocks="productStocks" />
    </div>
  </div>
</template>

<script>
import {
  mutationTypes,
  mutations,
} from '../../commands/stockProductCommands'
import StockProductList from '../stock-product/StockProductList'
import { queries, queryTypes } from '../../commands/stockProductCommands'

const getStockProductsQuery = () => {
  const { GET_PRODUCT_STOCKS } = queryTypes
  const getStockProductsQuery = queries[GET_PRODUCT_STOCKS]

  return getStockProductsQuery
}

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
      console.log(this.$apollo.queries)
      this.$apollo.queries.productStocks.refetch()
    },
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