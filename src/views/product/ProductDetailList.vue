<template>
  <div class="category-list">
    <div>
      <b-table
        :fields="fields"
        :items="productDetails">
        <template v-slot:cell(no)="data">
          {{ data.index + 1 }}
        </template>

        <template v-slot:cell(actions)="row">
          <b-button
            @click="onProductDetailDelete(row.item)" 
            variant="danger" 
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
    'productDetails',
    'onCategoryEdit',
    'onCategoryDelete',
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