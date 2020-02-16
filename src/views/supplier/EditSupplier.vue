<template>
  <div class="staff-add-form">
    <b-form-group
      id="input-group-1"
      label="Nama pengguna"
      label-for="name"
      description="We'll never share your email with anyone else."
    >
      <b-form-input
        id="name"
        v-model="supplierFields.name"
        type="text"
        required
      ></b-form-input>
      <b-form-invalid-feedback :state="isUsernameValid">
        Nama supplier harus lebih dari 1 huruf
      </b-form-invalid-feedback>
      <b-form-valid-feedback :state="isUsernameValid">
        Nama supplier valid
      </b-form-valid-feedback>
    </b-form-group>

      <b-form-group
        label="Nomor telepon"
        label-for="input">
        <b-form-input
          label="Nomor telepon"
          id="input-1"
          v-model="supplierFields.phoneNumber"
          type="text"
          required
        ></b-form-input>
        <b-form-invalid-feedback :state="isPhoneNumberValid">
          Nomor telepon tidak valid (format: 08xx)
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="isPhoneNumberValid">
          Nomor telepon valid
        </b-form-valid-feedback>
      </b-form-group>

      <b-form-group
        label="Alamat"
        label-for="input">
        <b-form-input
          label="Alamat"
          id="input-1"
          v-model="supplierFields.address"
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
            @click="editSupplierMutation()"
           type="submit" variant="primary">Simpan</b-button>
  </div>
</template>

<script>

export default {
  props: [
    'supplierFields',
    'editSupplierMutation',
  ],
  data () {
    return {
      selected: null,
    }
  },
  computed: {
    isUsernameValid () {
      return this.supplierFields.name.length > 3
    },
    isPhoneNumberValid () {
      let phoneNumber = (this.supplierFields.phoneNumber || '').trim()
      if (!phoneNumber) {
        return false
      }
      phoneNumber = phoneNumber.replace(/^0*/, '')
      if (!/^\d{9,12}$/.test(phoneNumber)) {
        return false
      }

      return true
    },
    isAddressValid () {
      return this.supplierFields.address.length > 5
    },
  },
}
</script>