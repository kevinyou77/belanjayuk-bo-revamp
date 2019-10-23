<template>
  <div class="category">
    <div class="category-content">
      <div class="box-underline">
        <span class="heading heading-default">Kategori</span>
      </div>

      <div class="category-content-list">
        <ApolloMutation
          :mutation="addCategoryMutation"
          :variables="{ name: categoryName }"
          @done="onAddCategoryMutationDone"
        >
          <template v-slot="{ mutate, loading, error, done }">
            <b-form-group
              id="input-group-1"
              label="Nama kategori:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="categoryName"
                type="text"
                required
              ></b-form-input>

              <b-button
                @click="mutate()"
              type="submit" variant="primary">Simpan</b-button>
            </b-form-group>

            <p v-if="error">An error occured: {{ error }}</p>
            <p v-if="done">An error occured: {{ done }}</p>
          </template>
        </ApolloMutation>

        <div v-if="$apollo.queries.categories.loading">Loading...</div>
        <CategoryList
          :categories="categories"
          :onCategoryEdit="() => {}"
          :onCategoryDelete="onCategoryDelete" v-else />
      </div>
    </div>
  </div>
</template>

<script>
import {
  mutationTypes,
  mutations,
  queryTypes,
  queries,
} from '../../commands/categoryCommands'
import CategoryList from '../category/CategoryList'
import StockProduct from '../stock-product/StockProduct'

const deleteCategoryQuery = () => {
  const { DELETE_CATEGORY } = mutationTypes
  const deleteQuery = mutations[DELETE_CATEGORY]

  return deleteQuery
}

const getCategoryQuery = () => {
  const { GET_CATEGORIES } = queryTypes
  const getCategories = queries[GET_CATEGORIES]

  return getCategories
}

export default {
  components: {
    CategoryList,
    StockProduct,
  },
  data () {
    return {
      categoryName: '',
      categories: [],
    }
  },
  methods: {
    onAddCategoryMutationDone(res) {
      this.$apollo.queries.categories.refetch()
      this.categoryName = ''
    },
    onCategoryDelete (category) {
      this.$apollo.mutate({
        mutation: deleteCategoryQuery(),
        variables: {
          id: category.id,
        }
      })
      .then ((data) => {
        this.categories = this.categories.filter ((item, i) => item.id !== category.id)
      })
      .catch (err => {
        
      })
    }
  },
  computed: {
    addCategoryMutation () {
      const { ADD_CATEGORY } = mutationTypes
      const addMutation = mutations[ADD_CATEGORY]

      return addMutation
    },
  },
  apollo: {
    categories: getCategoryQuery(),
  },
}
</script>