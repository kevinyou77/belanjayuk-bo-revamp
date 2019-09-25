<template>
  <div class="category-list">
    <div>
      <b-table
        :fields="fields"
        :items="productStocks">
        <template v-slot:cell(no)="data">
          {{ data.index + 1 }}
        </template>

         <template v-slot:cell(actions)="row">
            <b-button variant="success" @click="onProductEdit(row.item, row.index, $event.target)" class="mr-1">
              Edit
            </b-button>
            <b-button variant="danger" @click="onProductDelete(row.item, row.index, $event.target)" class="mr-1">
              Delete
            </b-button>
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
    }
  },
}
</script>