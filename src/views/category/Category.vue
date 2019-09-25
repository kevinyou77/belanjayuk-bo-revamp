<template>
  <div class="category">
    <div class="category-content">
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

      <CategoryList />
    </div>
  </div>
</template>

<script>
import {
  mutationTypes,
  mutations,
} from '../../commands/categoryCommands'
import CategoryList from '../category/CategoryList'

export default {
  components: {
    CategoryList,
  },
  data () {
    return {
      categoryName: '',
    }
  },
  methods: {
    onAddCategoryMutationDone(res) {
      console.log(res)
    },
  },
  computed: {
    addCategoryMutation () {
      const { ADD_CATEGORY } = mutationTypes
      const addMutation = mutations[ADD_CATEGORY]

      return addMutation
    },
  },
}
</script>