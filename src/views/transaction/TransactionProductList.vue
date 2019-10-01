<template>
  <div class="transaction-list">
    <div class="transaction-list-search-bar">
      <b-form-input
        v-model="searchQuery"
        placeholder="Cari produk..."></b-form-input>
    </div>

    <div class="transaction-list-content">
      <!-- <div class="loading" v-if="$apollo.queries.products.loading">Loading</div> -->
      <div class="transaction-list-content-item"
        v-for="(product, index) in filteredProductList"
        :key="index">
        <img 
          :src="product.image"
          width="120"
          height="120">
        {{ product.SKU }}
        {{ product.name }}
        {{ product.stock }}
      </div>
    </div>
  </div>
</template>

<script>
import { queries, queryTypes } from '../../commands/productCommands'

const getProductsQuery = () => {
  const { GET_PRODUCTS } = queryTypes
  const getProducts = queries[GET_PRODUCTS]

  return getProducts
}

export default {
  data () {
    return {
      products: [
        // {
        //   SKU: '1232131232',
        //   name: 'apaan',
        //   stock: 123,
        //   image: 'https://i5.walmartimages.ca/images/Large/172/111/6000200172111.jpg'
        // },
        // {
        //   SKU: '5675676',
        //   name: 'nestle',
        //   stock: 123,
        //   image: 'https://i5.walmartimages.ca/images/Large/172/111/6000200172111.jpg'
        // },
        // {
        //   SKU: '4534524',
        //   name: 'lays',
        //   stock: 123,
        //   image: 'https://i5.walmartimages.ca/images/Large/172/111/6000200172111.jpg'
        // },
        // {
        //   SKU: '789789789',
        //   name: 'nice',
        //   stock: 123,
        //   image: 'https://i5.walmartimages.ca/images/Large/172/111/6000200172111.jpg'
        // },
      ],
      searchQuery: '',
    }
  },
  computed: {
    filteredProductList () {
      return this.products.filter(item => {
        return (
          item.SKU.toLowerCase().includes(this.searchQuery)
          || item.name.toLowerCase().includes(this.searchQuery)
        )
      })
    }
  },
  apollo: {
    products: getProductsQuery()
  },
  updated () {
    console.log(this.products)
  }
}
</script>