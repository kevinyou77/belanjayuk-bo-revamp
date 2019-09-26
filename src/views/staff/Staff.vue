<template>
  <div class="category">
    <div class="category-content">
      <h1>Input staff</h1>
      <AddStaff
        :staffFields="staffFields"
        :addStaffMutation="addStaffMutation"
        :onAddStaffMutationDone="onAddStaffMutationDone" />
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
      },
      roles: [],
      staff: {},
    }
  },
  methods: {
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
            dateOfBirth: new Date().now,
          },
        },
        roles: [],
      }
    },
    addStaffMutation () {
      console.log(this.addStaffVariables())
      this.$apollo.mutate({
        mutation: addStaffQuery(),
        variables: this.addStaffVariables(),
      })
      .then ((data) => {
        console.log(data)
      })
      .catch (err => {
        console.log(err)
      })
    }
  },
}
</script>