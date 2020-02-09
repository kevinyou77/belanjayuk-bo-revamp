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
              Nama telepon valid
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
            @click="addCustomerMutation()"
           type="submit" variant="primary">Simpan</b-button>

    <!-- </ApolloMutation> -->
  </div>
</template>

<script>
export default {
  props: [
    'customerFields',
    'onAddCustomerMutationDone',
    'addCustomerMutation',
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