<template>
  <div class="products-add-form">
    <b-form-group
      id="input-group-1"
      label="SKU"
      label-for="SKU"
      description="SKU akan terisi secara otomatis apabila kosong"
    >
      <b-form-input
        id="sku"
        v-model="productFields.SKU"
        type="text"
        :value="productData"
        required
      ></b-form-input>
      <b-form-invalid-feedback :state="isSkuValid">
        SKU harus lebih dari 3 huruf
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group
      label="Nama produk"
      label-for="input">
      <b-form-input
        id="input-1"
        v-model="productFields.name"
        type="text"
        required
      ></b-form-input>
      <b-form-invalid-feedback :state="isProductNameValid">
        Nama produk harus lebih dari 3 huruf
      </b-form-invalid-feedback>
    </b-form-group>
    <b-form-group
      label="Jenis kategori"
      label-for="input"
      >
      <div v-if="$apollo.queries.categories.loading">Loading...</div>
      <b-form-select
        v-else
        v-model="productFields.categoryId"
        class="mb-3">
        <option :value="null">Please select an option</option>
        <option
          v-for="(item, index) in categories"
          :key="index"
          :value="item.id">
          {{ item.name }}
        </option>
      </b-form-select>
      <b-form-invalid-feedback :state="isCategoryValid">
        Kategori harus dipilih!
      </b-form-invalid-feedback>
    </b-form-group>
    <b-form-group
      label="Jumlah stok"
      label-for="input">
      <b-form-input
        label="Jumlah stok"
        id="input-1"
        v-model="productFields.stock"
        type="number"
        required
      ></b-form-input>
      <b-form-invalid-feedback :state="isStockValid">
        Stok produk harus lebih dari 0!
      </b-form-invalid-feedback>
    </b-form-group>

    <b-button
      @click="onProductAddConfirmed()"
      variant="success"
      class="mt-3" 
      :disabled="!isFormValid"
      block
    >
      Lanjut input detil produk
    </b-button>
  </div>
</template>

<script>
import {
  queryTypes as categoryQueryTypes,
  queries as categoryQueries
} from '../../../commands/categoryCommands'

const getCategoryQuery = () => {
  const { GET_CATEGORIES } = categoryQueryTypes
  const getCategories = categoryQueries[GET_CATEGORIES]

  return getCategories
}

export default {
  props: [
    'productFields',
    'onProductAddConfirmed',
    'productData'
  ],
  data () {
    return {
      selected: null,
      categories: [],
    }
  },
  apollo: {
    categories: getCategoryQuery(),
  },
  computed: {
    isSkuValid () {
      return this.productFields.SKU.length > 3 || this.productFields.SKU === ''
    },
    isProductNameValid () {
      return this.productFields.name.length > 3
    },
    isCategoryValid () {
      return this.productFields.categoryId !== null
    },
    isStockValid () {
      return this.productFields.stock > 0
    },
    isFormValid () {
      return (
        this.isSkuValid
        && this.isProductNameValid
        && this.isCategoryValid
        && this.isStockValid
      )
    },
  },
}
</script>