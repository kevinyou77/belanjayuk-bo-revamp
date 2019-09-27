<template>
  <div class="category">
    <div class="category-content">
      <h1>Input staff</h1>
      <AddStaff
        :staffFields="staffFields"
        :addStaffMutation="addStaffMutation"
        :onAddStaffMutationDone="onAddStaffMutationDone" />

      <b-modal id="error-modal">
        {{ error }}
      </b-modal>
    </div>
  </div>
</template>

<script>
// const processedValues = {
//       staff: {
//         userInput: {
//           ...userInput,
//         },
//         userProfileInput: {
//           ...userProfileInput,
//         },
//         roleId,
//       },
//     }
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

import { mutationTypes, mutations } from '../../commands/staffCommands'

const addStaffQuery = () => {
  const { ADD_STAFF } = mutationTypes
  const addStaff = mutations[ADD_STAFF]

  return addStaff
}

import AddStaff from './AddStaff'

export default {
  components: {
    AddStaff,
  },
  data () {
    return {
      staffFields: {
        username: '',
        password: '',
        email: '',
        fullName: '',
        address: '',
        noNik: '',
        dateOfBirth: '',
        roleId: null,
      },
      staff: {},
      error: '',
    }
  },
  methods: {
    clearFields () {
      Object.keys(this.staffFields).forEach(item => {
        if (item === 'roleId') {
          this.staffFields[item] = null
          return
        }

        this.staffFields[item] = ''
      })
    },
    showModal (msg) {
      this.error = msg
      this.$bvModal.show('error-modal')
    },
    onAddStaffMutationDone () {
      console.log('hehe')
    },
    addStaffVariables () {
      const {
        username,
        password,
        email,
        fullName,
        phoneNumber,
        address,
        noNik,
        dateOfBirth,
        roleId,
      } = this.staffFields

      return {
        staff: {
          userInput: {
            username,
            password,
            email
          },
          userProfileInput: {
            fullName,
            phoneNumber,
            address,
            noNik,
            dateOfBirth: new Date(dateOfBirth).getTime(),
          },
          roleId,
        }
      }
    },
    addStaffMutation () {
      console.log(this.addStaffVariables())
      this.$apollo.mutate({
        mutation: addStaffQuery(),
        variables: this.addStaffVariables(),
      })
      .then ((data) => {
        this.showModal('Data sukses di input')
        this.clearFields()
      })
      .catch (err => {
        this.showModal('Data gagal di input, mohon cek kembali data yang di isi')
      })
    }
  },
}
</script>