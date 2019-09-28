<template>
  <div class="products-add-form">
    <!-- <ApolloMutation
        :mutation="addStaffMutation"
        @done="onAddStaffMutationDone"
      > -->
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
            required
          ></b-form-input>
          <!-- <b-form-invalid-feedback :state="isUsernameValid">
            Nama stok produk harus lebih dari 1 huruf
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="isUsernameValid">
            Nama stok produk valid
          </b-form-valid-feedback> -->
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
          </b-form-group>

          <b-form-group
            label="Jenis kategori"
            label-for="input"
            >
            <div v-if="$apollo.queries.categories.loading">Loading...</div>
            <b-form-select
              v-else 
              v-model="productFields.category"
              class="mb-3">
              <option :value="null">Please select an option</option>
              <option
                v-for="(item, index) in categories"
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
              v-model="productFields.stock"
              type="number"
              required
            ></b-form-input>
            <!-- <b-form-invalid-feedback :state="isPhoneNumberValid">
              Nomor telepon tidak valid (format: 08xx)
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="isPhoneNumberValid">
              Nama stok produk valid
            </b-form-valid-feedback> -->
          </b-form-group>

           <b-button
            @click="onProductAddConfirmed()"
            variant="success"
            class="mt-3" 
            block
          >
            Simpan
          </b-button>
  

    <!-- </ApolloMutation> -->
  </div>
</template>

<script>
import {
  queryTypes as categoryQueryTypes,
  queries as categoryQueries
} from '../../commands/categoryCommands'

const getCategoryQuery = () => {
  const { GET_CATEGORIES } = categoryQueryTypes
  const getCategories = categoryQueries[GET_CATEGORIES]

  return getCategories
}


export default {
  props: [
    'productFields',
    'onProductAddConfirmed',
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
    // isUsernameValid () {
    //   return this.productFields.username.length > 3
    // },
    // isPasswordValid () {
    //   const letter = /[a-zA-Z]/
    //   const number = /[0-9]/
    //   const valid = number.test(this.productFields.password) && letter.test(this.productFields.password)

    //   return valid
    // },
    // isEmailValid () {
    //   const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    //   return emailRegex.test(this.productFields.email)
    // },
    // isRoleValid () {
    //   return this.productFields.roleId !== null
    // },
    // isPhoneNumberValid () {
    //   let phoneNumber = (this.productFields.phoneNumber || '').trim()
    //   if (!phoneNumber) {
    //     return false
    //   }
    //   phoneNumber = phoneNumber.replace(/^0*/, '')
    //   if (!/^\d{9,12}$/.test(phoneNumber)) {
    //     return false
    //   }
    // },
    // isAddressValid () {
    //   return this.productFields.address.length > 5
    // },
    // isNoNikValid () {
    //   return this.productFields.noNik.length === 16
    // },
    // isBirthDateValid () {
    //   const dob = new Date(this.productFields.dateOfBirth)
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