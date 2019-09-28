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
  computed: {
    productIsEmpty () {
      return this.products.length === 0
    }
  },
}
</script>