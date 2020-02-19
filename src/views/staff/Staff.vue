<template>
  <div class="staff">
    <div class="staff-content">

      <div v-if="$apollo.queries.staffs.loading">Loading...</div>
      <StaffList
        v-else
        :staffList="staffs"
        :onStaffDelete="onStaffDelete"
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
import AddStaff from './AddStaff'
import StaffList from './StaffList'
import EditStaff from './EditStaff'
import {
  mutationTypes, mutations,
  queryTypes, queries,
} from '../../commands/staffCommands'
import dateFormat from '../../utils/dateFormat'

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

const deleteStaffMutation = () => {
  const { DELETE_STAFF } = mutationTypes

  return mutations[DELETE_STAFF]
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
        staffEmail: '',
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
            email,
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
    onStaffDelete (staffId) {
      this.$apollo.mutate({
        mutation: deleteStaffMutation(),
        variables: { staffId }
      })
      .then ((data) => {
        this.$apollo.queries.staffs.refetch()
        console.log(data)
      })
      .catch ((err) => {
        console.log(err)
      })
    },
    addStaffMutation () {
      this.$apollo.mutate({
        mutation: addStaffMutation(),
        variables: this.addStaffVariables(),
      })
      .then ((data) => {
        this.showModal('Data sukses di input')
        this.clearFields()

        this.$router.go(0)
      })
      .catch (err => {
        this.showModal('Data gagal di input, mohon cek kembali data yang di isi')
      })
    },
    onStaffEditMutation (staffId) {
      const newStaffFields = { ...this.editStaffFields }
      newStaffFields.dateOfBirth = new Date(this.editStaffFields.dateOfBirth).getTime()
      console.log(newStaffFields, 'edit try')

      this.$apollo.mutate({
        mutation: editStaffMutation(),
        variables: newStaffFields
      })
      .then (res => {
        this.showModal('Data berhasil di ubah!')
      })
      .catch (err => {
        this.showModal('Data gagal diubah, coba lagi')
        console.log(err)
      })
    },
    editStaffQuery (id, cb) {
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
          id: staffId,
          user,
          role,
        } = data.data.staff

        const {
          id,
          name
        } = role

        const {
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
          staffId,
          staffEmail: email,
          address,
          noNik,
          phoneNumber,
          fullName,
          roleId: id,
          dateOfBirth: dateFormat(dateOfBirth),
        }

        this.$bvModal.show('edit-staff')
      })
    }
  },
  apollo: {
    staffs: staffListQuery(),
  }
}
</script>