<template>
  <div class="category-list">
    <div v-if="$apollo.queries.productStocks.loading">Loading...</div>
    <div v-else>
      <b-table
        :fields="fields"
        :items="productStocks">
        <template v-slot:cell(no)="data">
          {{ data.index + 1 }}
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import { queries, queryTypes } from '../../commands/stockProductCommands'


const getStockProductsQuery = () => {
  const { GET_PRODUCT_STOCKS } = queryTypes
  const getStockProductsQuery = queries[GET_PRODUCT_STOCKS]

  return getStockProductsQuery
}

export default {
 
  data() {
    return {
      fields: [
        'no',
        'name',
      ],
      productStocks: [],
    }
  },
  apollo: {
    productStocks: getStockProductsQuery(),
  },
  computed: {
  
  },
  
}
</script>