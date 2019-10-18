<template>
  <div class="staff">
    <div class="staff-content">

      <div v-if="$apollo.queries.staffs.loading">Loading...</div>
      <StaffList
        v-else
        :staffList="staffs"
        :onStaffDelete="() => {}"
        :onStaffEdit="onStaffEdit" />

      <b-modal id="add-staff" hide-footer>
        <div class="box-underline">
          <span class="heading heading-default">INPUT STAFF</span>
        </div>

        <AddStaff
          :staffFields="staffFields"
          :addStaffMutation="addStaffMutation"
          :onAddStaffMutationDone="onAddStaffMutationDone" />
      </b-modal>

      <b-modal id="edit-staff" hide-footer>
        <div class="box-underline">
          <span class="heading heading-default">EDIT STAFF</span>
        </div>

        <EditStaff
          :editStaffFields="editStaffFields"
          :onStaffEdit="onStaffEditMutation"
          :editStaffQuery="editStaffQuery"
          />
      </b-modal>

      <b-modal id="error-modal">
        <span class="heading heading-default">{{ error }}</span>
      </b-modal>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import AddStaff from './AddStaff'
import StaffList from './StaffList'
import EditStaff from './EditStaff'
import {
  mutationTypes, mutations,
  queryTypes, queries,
} from '../../commands/staffCommands'

const addStaffMutation = () => {
  const { ADD_STAFF } = mutationTypes
  const addStaff = mutations[ADD_STAFF]

  return addStaff
}

const editStaffMutation = () => {
  const { EDIT_STAFF } = mutationTypes
  const editStaff = mutations[EDIT_STAFF]

  return editStaff
}

const getStaffQuery = () => {
  const { GET_STAFF } = queryTypes
  const getStaff = queries[GET_STAFF]

  return getStaff
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
    EditStaff,
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
        phoneNumber: '',
        roleId: null,
      },
      editStaffFields: {
        staffId: '',
        username: '',
        password: '',
        email: '',
        fullName: '',
        address: '',
        noNik: '',
        dateOfBirth: '',
        phoneNumber: '',
        roleId: null,
      },
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
    },
    onStaffEditMutation (staffId) {
      this.editStaffFields.dateOfBirth = new Date(this.editStaffFields.dateOfBirth).getTime()

      this.$apollo.mutate({
        mutation: editStaffMutation(),
        variables: {
          ...this.editStaffFields,
        }
      })
      .then (res => {
        
      })
    },
    editStaffQuery (id, cb) {
      console.log(id)
      this.$apollo.query({
        query: getStaffQuery(),
        variables: { staffId: id },
      })
      .then (data => {
        cb (data)
      })
      .catch (err => {
        console.log(err)
        this.showModal('Data gagal dimuat')
      })
    },
    onStaffEdit (id) {
      this.editStaffQuery(id, (data) => {
        const {
          user,
          role,
        } = data.data.staff

        const {
          id,
          name
        } = role

        const {
          username,
          email,
          userProfile,
        } = user

        const {
          address,
          dateOfBirth,
          noNik,
          phoneNumber,
          fullName,
        } = userProfile

        this.editStaffFields = {
          staffId: id,
          username,
          email,
          address,
          noNik,
          phoneNumber,
          fullName,
          roleId: id
        }

        console.log(this.editStaffFields)
        this.$bvModal.show('edit-staff')
      })
    }
  },
  apollo: {
    staffs: staffListQuery(),
  }
}
</script>