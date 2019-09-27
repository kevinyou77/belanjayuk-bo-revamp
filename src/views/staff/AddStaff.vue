<template>
  <div>
    <!-- <ApolloMutation
        :mutation="addStaffMutation"
        @done="onAddStaffMutationDone"
      > -->
        <b-form-group
          id="input-group-1"
          label="Nama pengguna"
          label-for="Username"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            id="username"
            v-model="staffFields.username"
            type="text"
            required
          ></b-form-input>
          <b-form-invalid-feedback :state="isUsernameValid">
            Nama stok produk harus lebih dari 1 huruf
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="isUsernameValid">
            Nama stok produk valid
          </b-form-valid-feedback>
        </b-form-group>

          <b-form-group
            label="Password"
            label-for="input">
            <b-form-input
              label="Kata sandi"
              id="input-1"
              v-model="staffFields.password"
              type="password"
              required
            ></b-form-input>
            <b-form-invalid-feedback :state="isPasswordValid">
              Password harus mengandung huruf dan angka
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="isPasswordValid">
              Password valid
            </b-form-valid-feedback>
          </b-form-group>

          <b-form-group
            label="Tanggal Lahir"
            label-for="input">
            <b-form-input
              label="Tanggal lahir"
              id="input-1"
              v-model="staffFields.dateOfBirth"
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
              v-model="staffFields.email"
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
            label="Nama Lengkap"
            label-for="input">
            <b-form-input
              id="input-1"
              v-model="staffFields.fullName"
              type="text"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Peran"
            label-for="input"
            >
            <div v-if="$apollo.queries.roles.loading">Loading...</div>
            <b-form-select
              v-else 
              v-model="staffFields.roleId"
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
              v-model="staffFields.phoneNumber"
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
              v-model="staffFields.address"
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
              v-model="staffFields.noNik"
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
            @click="addStaffMutation()"
           type="submit" variant="primary">Simpan</b-button>

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
import { queryTypes, queries } from '../../commands/staffCommands'

const getAllRoles = () => {
  const { GET_ROLES } = queryTypes
  const getRoles = queries[GET_ROLES]

  return getRoles
}

export default {
  props: [
    'staffFields',
    'onAddStaffMutationDone',
    'addStaffMutation',
  ],
  data () {
    return {
      selected: null,
    }
  },
  computed: {
    isUsernameValid () {
      return this.staffFields.username.length > 3
    },
    isPasswordValid () {
      const letter = /[a-zA-Z]/
      const number = /[0-9]/
      const valid = number.test(this.staffFields.password) && letter.test(this.staffFields.password)

      return valid
    },
    isEmailValid () {
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      return emailRegex.test(this.staffFields.email)
    },
    isRoleValid () {
      return this.staffFields.roleId !== null
    },
    isPhoneNumberValid () {
      let phoneNumber = (this.staffFields.phoneNumber || '').trim()
      if (!phoneNumber) {
        return false
      }
      phoneNumber = phoneNumber.replace(/^0*/, '')
      if (!/^\d{9,12}$/.test(phoneNumber)) {
        return false
      }
    },
    isAddressValid () {
      return this.staffFields.address.length > 5
    },
    isNoNikValid () {
      return this.staffFields.noNik.length === 16
    },
    isBirthDateValid () {
      const dob = new Date(this.staffFields.dateOfBirth)
      const year = dob.getFullYear()
      const month = dob.getMonth()
      const day = dob.getDay()
      console.log(year)
      console.log(month)
      console.log(day)
      return new Date(year + 18, month - 1, day) <= new Date();
    }
  },
  apollo: {
    roles: getAllRoles()
  },
}
</script>