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
        </b-form-group>

          <b-form-group
            label="Password"
            label-for="input">
            <b-form-input
              label="Kata sandi"
              id="input-1"
              v-model="staffFields.password"
              type="text"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Email"
            label-for="input">
            <b-form-input
              label="E-mail"
              id="input-1"
              v-model="staffFields.email"
              type="text"
              required
            ></b-form-input>
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
              v-model="selected"
              class="mb-3">
              <option :value="null">Please select an option</option>
              <option
                v-for="(item, index) in roles"
                :key="index"
                :value="item.id">
                {{ item.name }}
              </option>
            </b-form-select>
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
  methods: {

  },
  apollo: {
    roles: getAllRoles()
  },
}
</script>