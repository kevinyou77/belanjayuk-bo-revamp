<template>
  <div class="category-list">
    <div v-if="$apollo.queries.categories.loading">Loading...</div>
    <div v-else>
      <b-table
        :fields="fields"
        :items="categories">
        <template v-slot:cell(no)="data">
          {{ data.index + 1 }}
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import { queries, queryTypes } from '../../commands/categoryCommands.js'


const getCategoryQuery = () => {
  const { GET_CATEGORIES } = queryTypes
  const getCategories = queries[GET_CATEGORIES]

  return getCategories
}

export default {
 
  data() {
    return {
      fields: [
        'no',
        'name',
      ],
      categories: [],
    }
  },
  methods: {
    getCategoryQuery () {
      const { GET_CATEGORIES } = queryTypes
      const getCategories = queries[GET_CATEGORIES]

      return getCategories
    },
  },
  apollo: {
    categories: getCategoryQuery(),
  },
  computed: {
    
  },
  mounted () {
    console.log(this.categories)
  },
  
}
</script>