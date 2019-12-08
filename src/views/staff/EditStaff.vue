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
            id="fullname"
            v-model="editStaffFields.fullName"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Password Sebelumnya"
          label-for="input">
          <b-form-input
            label="Password Sebelumnya"
            id="oldPassword"
            v-model="oldPassword"
            type="password"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Password"
          label-for="input">
          <b-form-input
            label="Password"
            id="password"
            v-model="password"
            type="password"
            required
          ></b-form-input>
          <b-form-invalid-feedback :state="isPasswordValid">
            Tanggal lahir tidak valid
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="isPasswordValid">
            Tanggal lahir valid
          </b-form-valid-feedback>
        </b-form-group>

        <b-form-group
          label="Konfirmasi Password"
          label-for="input">
          <b-form-input
            label="Password"
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            required
          ></b-form-input>
          <b-form-invalid-feedback :state="isConfirmPasswordValid">
            Tanggal lahir tidak valid
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="isConfirmPasswordValid">
            Tanggal lahir valid
          </b-form-valid-feedback>
        </b-form-group>

        <b-form-group
          label="Tanggal Lahir"
          label-for="input">
          <b-form-input
            label="Tanggal lahir"
            id="tanggalLahir"
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
            id="email"
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
            id="nomorTelepon"
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
            id="alamat"
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
            id="nik"
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
          @click="onStaffEditClick(editStaffFields.staffId)"
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
import {
  mutationTypes as authMutationTypes,
  mutations as authMutations,
} from '../../commands/loginCommands'
import moment from 'moment'

const getAllRoles = () => {
  const { GET_ROLES } = queryTypes
  const getRoles = queries[GET_ROLES]

  return getRoles
}

const changePasswordMutation = () => {
  const { CHANGE_PASSWORD } = authMutationTypes
  return authMutations[CHANGE_PASSWORD]
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
      oldPassword: '',
      password: '',
      confirmPassword: '',
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
      const dob = moment(this.editStaffFields.dateOfBirth)

      console.log(dob, 'momen')
      
      return now.diff(dob, 'days') > 3650
    },
    isOldPasswordValid () {
      return this.oldPassword.length > 5
    },
    isPasswordValid () {
      return this.password.length > 5
    },
    isConfirmPasswordValid () {
      return this.isPasswordValid && (this.password === this.confirmPassword)
    }
  },
  methods: {
    showModal (msg) {
      this.$bvModal.show('error-modal')
    },
    onStaffEditClick (id) {
      console.log(id)
      this.onStaffEdit(id)

      this.$apollo.mutate({
        mutation: changePasswordMutation(),
        variables: {
          oldPassword: this.oldPassword,
          password: this.password,
          confirmPassword: this.confirmPassword
        }
      })
      .then (res => {
        console.log(res, 'resss')
        this.showModal('Password berhasil diubah')
      })
      .catch (err => {
        this.showModal('Password gagal diubah')
        console.log(err)
      })
    },
  },
  apollo: {
    roles: getAllRoles(),
  },
}
</script>