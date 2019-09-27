<template>
  <div class="products-list">
    <div>
      <b-table
        :fields="fields"
        :items="products">
        <template v-slot:cell(no)="data">
          {{ data.index + 1 }}
        </template>

         <template v-slot:cell(actions)="row">
            <b-button 
              variant="danger" 
              @click="onProductDelete(row.item.id)" 
              class="mr-1">
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
    'products',
    'onProductEdit',
    'onProductDelete',
  ],
  data() {
    return {
      fields: [
        'SKU',
        'name',
        'stock',
        { key: 'category.name', label: 'Category' },
        { key: 'actions', label: 'Actions' }
      ],
    }
  },
}
</script>