<template>
  <div class="category">
    <div class="category-content">
      <ApolloMutation
          :mutation="addStockProductMutation"
          :variables="{ name: stockProductName }"
          @done="onStockProductMutationDone"
        >
        <template v-slot="{ mutate, loading, error, done }">
          <b-form-group
            id="input-group-1"
            label="Nama stok produk:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="stockProductName"
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

      <StockProductList />
    </div>
  </div>
</template>

<script>
import {
  mutationTypes,
  mutations,
} from '../../commands/stockProductCommands'
import StockProductList from '../stock-product/StockProductList'

export default {
  components: {
    StockProductList,
  },
  data () {
    return {
      stockProductName: '',
    }
  },
  methods: {
    onStockProductMutationDone(res) {
      console.log(res)
    },
  },
  computed: {
    addStockProductMutation () {
      const { ADD_STOCK_PRODUCT } = mutationTypes
      const addMutation = mutations[ADD_STOCK_PRODUCT]

      return addMutation
    },
  },
}
</script>