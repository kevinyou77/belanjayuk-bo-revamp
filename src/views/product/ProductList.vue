<template>
  <div class="products-list">
    <div>
      <div v-if="productIsEmpty">
        <span class="font font-medium">
          Tidak ada produk
        </span>
      </div>
      <b-table
        v-else
        :fields="fields"
        :current-page="currentPage"
        :per-page="10"
        :items="products">

        <template v-slot:cell(no)="data">
          {{ data.index + 1 }}
        </template>

         <template v-slot:cell(actions)="row">
            <b-button 
              variant="primary" 
              @click="onProductEdit(row.item.id)" 
              class="mr-1">
              Edit
            </b-button>
            <b-button 
              variant="danger" 
              @click="onProductDelete(row.item.id)" 
              class="mr-1">
              Delete
            </b-button>
          </template>
      </b-table>

      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="10"
        aria-controls="my-table"
      ></b-pagination>
    </div>
  </div>
</template>

<script>

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
      currentPage: 1,
    }
  },
  computed: {
    productIsEmpty () {
      return this.products.length === 0
    },
    rows () {
      return this.products.length
    },
  },
}
</script>