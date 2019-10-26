<template>
  <div class="staff-add-form">
    <!-- <ApolloMutation
        :mutation="addStaffMutation"
        @done="onAddStaffMutationDone"
      > -->

          <b-form-group
            label="Nama Lengkap"
            label-for="input">
            <b-form-input
              id="input-1"
              v-model="customerFields.fullName"
              type="text"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Nomor telepon"
            label-for="input">
            <b-form-input
              label="Nomor telepon"
              id="input-1"
              v-model="customerFields.phoneNumber"
              type="text"
              required
            ></b-form-input>
            <b-form-invalid-feedback :state="isPhoneNumberValid">
              Nomor telepon tidak valid (format: 08xx)
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="isPhoneNumberValid">
              Nama stok produk valid
            </b-form-valid-feedback>
          </b-form-group>

          <b-form-group
            label="Alamat"
            label-for="input">
            <b-form-input
              label="Alamat"
              id="input-1"
              v-model="customerFields.address"
              type="text"
              required
            ></b-form-input>
            <b-form-invalid-feedback :state="isAddressValid">
              Alamat tidak valid
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="isAddressValid">
              Alamat valid
            </b-form-valid-feedback>
          </b-form-group>

          <b-button
            @click="editCustomerMutation()"
           type="submit" variant="primary">Simpan</b-button>

    <!-- </ApolloMutation> -->
  </div>
</template>

<script>
export default {
  props: [
    'customerFields',
    'editCustomerMutation',
  ],
  computed: {
    isUsernameValid () {
      return this.customerFields.username.length > 3
    },
    isPasswordValid () {
      const letter = /[a-zA-Z]/
      const number = /[0-9]/
      const valid = number.test(this.customerFields.password) && letter.test(this.customerFields.password)

      return valid
    },
    isEmailValid () {
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      return emailRegex.test(this.customerFields.email)
    },
    isPhoneNumberValid () {
      let phoneNumber = (this.customerFields.phoneNumber || '').trim()
      if (!phoneNumber) {
        return false
      }
      phoneNumber = phoneNumber.replace(/^0*/, '')
      if (!/^\d{9,12}$/.test(phoneNumber)) {
        return false
      }
    },
    isAddressValid () {
      return this.customerFields.address.length > 5
    },
  },
}
</script>