<template>
  <div class="category-list">
    <div>
      <b-table
        :fields="fields"
        :items="categories">
        <template v-slot:cell(no)="data">
          {{ data.index + 1 }}
        </template>

        <template v-slot:cell(actions)="row">
          <b-button 
            variant="danger" 
            @click="onCategoryDelete(row.item, row.index, $event.target)" 
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
    }
  },
  methods: {
  },
  computed: {
    
  },
  mounted () {
    console.log(this.categories)
  },
  
}
</script>