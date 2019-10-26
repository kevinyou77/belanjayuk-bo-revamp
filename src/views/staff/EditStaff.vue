<template>
  <div class="staff-edit-form">
    <!-- <ApolloMutation
        :mutation="editStaffMutation"
        @done="onEditStaffMutationDone"
      > -->
    <template>
      <b-form-group
          label="Nama Lengkap"
          label-for="input">
          <b-form-input
            id="input-1"
            v-model="editStaffFields.fullName"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Tanggal Lahir"
          label-for="input">
          <b-form-input
            label="Tanggal lahir"
            id="input-1"
            v-model="editStaffFields.dateOfBirth"
            type="date"
            required
          ></b-form-input>
          <b-form-invalid-feedback :state="isBirthDateValid">
            Tanggal lahir tidak valid
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="isBirthDateValid">
            Tanggal lahir valid
          </b-form-valid-feedback>
        </b-form-group>

        <b-form-group
          label="Email"
          label-for="input">
          <b-form-input
            label="E-mail"
            id="input-1"
            v-model="editStaffFields.staffEmail"
            type="email"
            required
          ></b-form-input>
          <b-form-invalid-feedback :state="isEmailValid">
            Email tidak valid
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="isEmailValid">
            Email valid
          </b-form-valid-feedback>
        </b-form-group>

        <b-form-group
          label="Peran"
          label-for="input"
          >
          <div v-if="$apollo.queries.roles.loading">Loading...</div>
          <b-form-select
            v-else 
            v-model="editStaffFields.roleId"
            class="mb-3">
            <option :value="null">Please select an option</option>
            <option
              v-for="(item, index) in roles"
              :key="index"
              :value="item.id">
              {{ item.name }}
            </option>
          </b-form-select>
          <b-form-invalid-feedback :state="isRoleValid">
            Pilih peran
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          label="Nomor telepon"
          label-for="input">
          <b-form-input
            label="Nomor telepon"
            id="input-1"
            v-model="editStaffFields.phoneNumber"
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
            v-model="editStaffFields.address"
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

        <b-form-group
          label="No NIK"
          label-for="input">
          <b-form-input
            label="No nik"
            id="input-1"
            v-model="editStaffFields.noNik"
            type="text"
            required
          ></b-form-input>
          <b-form-invalid-feedback :state="isNoNikValid">
            NIK tidak valid
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="isNoNikValid">
            NIK valid
          </b-form-valid-feedback>
        </b-form-group>

        <b-button
          @click="onStaffEdit(editStaffFields.staffId)"
          type="submit" variant="primary">Simpan</b-button>
    </template>

    <!-- </ApolloMutation> -->
  </div>
</template>

<script>
// const { username, password, email } = values
// const userInput = {
//   username,
//   password,
//   email,
// }
// const userProfileInput = {
//   fullName,
//   phoneNumber,
//   address,
//   noNik,
//   dateOfBirth: processedDob,
// }
import {
  queryTypes, queries,
  mutationTypes, mutations,
} from '../../commands/staffCommands'
import moment from 'moment'

const getAllRoles = () => {
  const { GET_ROLES } = queryTypes
  const getRoles = queries[GET_ROLES]

  return getRoles
}

export default {
  props: [
    'editStaffFields',
    'onEditStaffMutationDone',
    'editStaffQuery',
    'onStaffEdit',
  ],
  data () {
    return {
      selected: null,
      loading: true,
    }
  },
  computed: {
    isUsernameValid () {
      return this.editStaffFields.username.length > 3
    },
    isEmailValid () {
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      return emailRegex.test(this.editStaffFields.staffEmail)
    },
    isRoleValid () {
      return this.editStaffFields.roleId !== null
    },
    isPhoneNumberValid () {
      let phoneNumber = (this.editStaffFields.phoneNumber || '').trim()
      if (!phoneNumber) {
        return false
      }
      phoneNumber = phoneNumber.replace(/^0*/, '')
      if (!/^\d{9,12}$/.test(phoneNumber)) {
        return false
      }
    },
    isAddressValid () {
      return this.editStaffFields.address.length > 5
    },
    isNoNikValid () {
      return this.editStaffFields.noNik.length === 16
    },
    isBirthDateValid () {
      const now = moment()
      const dob = moment(new Date(this.editStaffFields.dateOfBirth))
      
      return now.diff(dob, 'days') > 3650
    },
  },
  methods: {
    onStaffEditButtonPress (id, cb) {
      this.onStaffEdit(id)
    }
  },
  apollo: {
    roles: getAllRoles(),
  },
}
</script>