<template>
  <div class="category-list">
    <div>
      <b-table
        :fields="fields"
        :items="categories"
        :per-page="perPage"
        :current-page="currentPage">
        <template v-slot:cell(no)="data">
          {{ data.index + 1 }}
        </template>

        <template v-slot:cell(actions)="row">
          <b-button
            @click="onCategoryDelete(row.item)" 
            variant="danger" 
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
export default {
  props: [
    'categories',
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
      currentPage: 1,
      perPage: 10,
    }
  },
  computed: {
    rows () {
      return this.categories.length
    },
  }
}
</script>