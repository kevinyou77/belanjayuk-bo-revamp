<template>
  <div class="staff">
    <div class="staff-content">

      <div v-if="$apollo.queries.staffs.loading">Loading...</div>
      <StaffList
        v-else
        :staffList="staffs"
        :onStaffDelete="() => {}"
        :onStaffEdit="() => {}" />

      <b-modal id="add-staff" hide-footer>
        <div class="box-underline">
          <span class="heading heading-default">INPUT STAFF</span>
        </div>

        <AddStaff
          :staffFields="staffFields"
          :addStaffMutation="addStaffMutation"
          :onAddStaffMutationDone="onAddStaffMutationDone" />
      </b-modal>

      <b-modal id="error-modal">
        <span class="heading heading-default">{{ error }}</span>
      </b-modal>
    </div>
  </div>
</template>

<script>
import AddStaff from './AddStaff'
import StaffList from './StaffList'
import {
  mutationTypes, mutations,
  queryTypes, queries,
} from '../../commands/staffCommands'

const addStaffMutation = () => {
  const { ADD_STAFF } = mutationTypes
  const addStaff = mutations[ADD_STAFF]

  return addStaff
}

const staffListQuery = () => {
  const { GET_STAFFS } =  queries
  const staffList = queries[GET_STAFFS]

  return staffList
}

export default {
  components: {
    AddStaff,
    StaffList,
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
      this.$apollo.mutate({
        mutation: addStaffMutation(),
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
  apollo: {
    staffs: staffListQuery(),
  }
}
</script>