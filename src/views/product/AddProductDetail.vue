<template>
  <div class="products-detail-form">
    <!-- <ApolloMutation
        :mutation="addStaffMutation"
        @done="onAddStaffMutationDone"
      > -->

      <b-form-group
        label="Harga beli"
        label-for="input">
        <b-form-input
          id="input-1"
          v-model="productDetailFields.purchasePrice"
          type="number"
          required
        />
        <b-form-invalid-feedback :state="isPurchasePriceValid">
          Harga beli harus lebih dari 0!
        </b-form-invalid-feedback>
      </b-form-group>
        
      <b-form-group
        id="input-group-1"
        label="Harga jual"
        label-for="sellingPrice"
      >
        <b-form-input
          id="sellingPrice"
          v-model="productDetailFields.sellingPrice"
          type="number"
          required
        />
        <b-form-invalid-feedback :state="isSellingPriceValid">
          Harga jual harus lebih dari 0!
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        label="Jenis stok"
        label-for="input">

        <div v-if="$apollo.queries.productStocks.loading">Loading...</div>
        <b-form-select
          v-else 
          v-model="productDetailFields.tempId"
          class="mb-3">
          <option :value="{id: '', name: ''}">Please select an option</option>
          <option
            v-for="(item, index) in productStocks"
            :key="index"
            :value="{id: item.id, name: item.name}">
            {{ item.name }}
          </option>
        </b-form-select>
        <b-form-invalid-feedback :state="isProductStockTypeValid">
          Pilih unit stok!
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
        label="Nilai stok"
        label-for="input">
        <b-form-input
          label="Nilai stok"
          id="input-1"
          v-model="productDetailFields.value"
          type="number"
          required
        />
        <b-form-invalid-feedback :state="isValueValid">
          Stok per unit harus lebih dari 0!
        </b-form-invalid-feedback>
            <!-- <b-form-invalid-feedback :state="isPhoneNumberValid">
              Nomor telepon tidak valid (format: 08xx)
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="isPhoneNumberValid">
              Nama stok produk valid
            </b-form-valid-feedback> -->
      </b-form-group>

      <b-button
        @click="onProductDetailAdd(productDetailFields)"
        variant="success"
        class="mt-3" 
        block >
        Simpan detail produk
      </b-button>

    <!-- </ApolloMutation> -->
  </div>
</template>

<script>
// sellingPrice: 0,
//       purchasePrice: 0,
//       value: 0,
//      productStockType: '',

import {
  queryTypes,
  queries,
} from '../../commands/stockProductCommands'

const getProductStocks = () => {
  const { GET_PRODUCT_STOCKS } = queryTypes
  const getProductStocks = queries[GET_PRODUCT_STOCKS]

  return getProductStocks
}

export default {
  props: [
    'productDetailFields',
    'onProductDetailAdd',
  ],
  data () {
    return {
      selected: null,
      productStocks: [],
    }
  },
  apollo: {
    productStocks: getProductStocks(),
  },
  computed: {
    isSellingPriceValid () {
      return this.productDetailFields.sellingPrice > 0
    },
    isPurchasePriceValid () {
      return this.productDetailFields.purchasePrice > 0
    },
    isValueValid () {
      return this.productDetailFields.value > 0
    },
    isProductStockTypeValid () {
      return this.productDetailFields.productStockId !== null
    },
  },
}
</script>