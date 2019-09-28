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
          type="text"
          required
        />
      </b-form-group>
        
      <b-form-group
        id="input-group-1"
        label="Harga jual"
        label-for="sellingPrice"
      >
        <b-form-input
          id="sellingPrice"
          v-model="productDetailFields.sellingPrice"
          type="text"
          required
        />
        <!-- <b-form-invalid-feedback :state="isUsernameValid">
          Nama stok produk harus lebih dari 1 huruf
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="isUsernameValid">
          Nama stok produk valid
        </b-form-valid-feedback> -->
      </b-form-group>

          

      <b-form-group
        label="Jenis stok"
        label-for="input">

        <div v-if="$apollo.queries.productStocks.loading">Loading...</div>
        <b-form-select
          v-else 
          v-model="productDetailFields.productStockId"
          class="mb-3">
          <option :value="null">Please select an option</option>
          <option
            v-for="(item, index) in productStocks"
            :key="index"
            :value="item.id">
            {{ item.name }}
          </option>
        </b-form-select>
        <!-- <b-form-invalid-feedback :state="isRoleValid">
          Pilih peran
        </b-form-invalid-feedback> -->
      </b-form-group>
      <b-form-group
        label="Jumlah stok"
        label-for="input">
        <b-form-input
          label="Jumlah stok"
          id="input-1"
          v-model="productDetailFields.value"
          type="number"
          required
        />
            <!-- <b-form-invalid-feedback :state="isPhoneNumberValid">
              Nomor telepon tidak valid (format: 08xx)
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="isPhoneNumberValid">
              Nama stok produk valid
            </b-form-valid-feedback> -->
      </b-form-group>

      <b-button
        variant="success"
        class="mt-3" 
        block >
        Simpan
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
    // isUsernameValid () {
    //   return this.productDetailFields.username.length > 3
    // },
    // isPasswordValid () {
    //   const letter = /[a-zA-Z]/
    //   const number = /[0-9]/
    //   const valid = number.test(this.productDetailFields.password) && letter.test(this.productDetailFields.password)

    //   return valid
    // },
    // isEmailValid () {
    //   const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    //   return emailRegex.test(this.productDetailFields.email)
    // },
    // isRoleValid () {
    //   return this.productDetailFields.roleId !== null
    // },
    // isPhoneNumberValid () {
    //   let phoneNumber = (this.productDetailFields.phoneNumber || '').trim()
    //   if (!phoneNumber) {
    //     return false
    //   }
    //   phoneNumber = phoneNumber.replace(/^0*/, '')
    //   if (!/^\d{9,12}$/.test(phoneNumber)) {
    //     return false
    //   }
    // },
    // isAddressValid () {
    //   return this.productDetailFields.address.length > 5
    // },
    // isNoNikValid () {
    //   return this.productDetailFields.noNik.length === 16
    // },
    // isBirthDateValid () {
    //   const dob = new Date(this.productDetailFields.dateOfBirth)
    //   const year = dob.getFullYear()
    //   const month = dob.getMonth()
    //   const day = dob.getDay()

    //   return new Date(year + 18, month - 1, day) <= new Date();
    // }
  },
  // apollo: {
  //   roles: getAllRoles()
  // },
}
</script>