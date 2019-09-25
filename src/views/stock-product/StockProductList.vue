<template>
  <div class="category-list">
    <div>
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
// const getStockProductsQuery = () => {
//   const { GET_PRODUCT_STOCKS } = queryTypes
//   const getStockProductsQuery = queries[GET_PRODUCT_STOCKS]

//   return getStockProductsQuery
// }

export default {
  props: ['productStocks'],
  data() {
    return {
      fields: [
        'no',
        'name',
      ],
      // productStocks: [],
    }
  },
  // apollo: {
  //   productStocks: getStockProductsQuery(),
  // },
  computed: {
  
  },
  mounted () {
    
  }
}
</script>