<template>
  <div class="category-list">
    <div>
      <b-table
        :fields="fields"
        :items="productStocks"
        :current-page="currentPage"
        :per-page="perPage">
        <template v-slot:cell(no)="data">
          {{ data.index + 1 }}
        </template>

         <template v-slot:cell(actions)="row">
            <b-button 
              variant="danger" 
              @click="onProductDelete(row.item, row.index, $event.target)" 
              class="mr-1">
              Delete
            </b-button>
          </template>
      </b-table>

      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
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
  props: [
    'productStocks',
    'onProductEdit',
    'onProductDelete',
  ],
  data() {
    return {
      fields: [
        'no',
        'name',
        { key: 'actions', label: 'Actions' }
      ],
      currentPage: 1,
      perPage: 10,
    }
  },
  computed: {
    rows () {
      return this.productStocks.length
    }
  },
}
</script>