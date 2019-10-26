<template>
  <div class="staff">
    <div class="staff-content">

      <div v-if="$apollo.queries.customers.loading">Loading...</div>
      <List
        key="`list`"
        :items="customers"
        :fields="customerDetailListFields"
        :actions="customerDetailListActions()"
        :header="header" />

      <b-modal id="add-customer" hide-footer>
        <div class="box-underline">
          <span class="heading heading-default">INPUT CUSTOMERS</span>
        </div>

        <AddCustomer
          :customerFields="customerFields"
          :addCustomerMutation="addCustomerMutation" />
      </b-modal>

      <b-modal id="edit-staff" hide-footer>
        <div class="box-underline">
          <span class="heading heading-default">EDIT STAFF</span>
        </div>

        <EditCustomer
          :customerFields="editCustomerFields"
          :editCustomerMutation="onCustomerEditMutation"
          />
      </b-modal>

      <b-modal id="error-modal">
        <span class="heading heading-default">{{ error }}</span>
      </b-modal>
    </div>
  </div>
</template>

<script>
import AddCustomer from './AddCustomer'
import EditCustomer from './EditCustomer'
import List from '../../components/common/List'
import {
  mutationTypes, mutations,
  queryTypes, queries,
} from '../../commands/customerCommands'
import dateFormat from '../../utils/dateFormat'

const getCustomersQuery = () => {
  const { GET_CUSTOMERS } = queryTypes
  return queries[GET_CUSTOMERS]
}

const getCustomerQuery = () => {
  const { GET_CUSTOMER } = queryTypes
  return queries[GET_CUSTOMER]
}

const addCustomerMutation = () => {
  const { ADD_CUSTOMER } = mutationTypes
  return mutations[ADD_CUSTOMER]
}

const editCustomerMutation = () => {
  const { EDIT_CUSTOMER } = mutationTypes
  return mutations[EDIT_CUSTOMER]
}

const deleteCustomerMutation = () => {
  const { DELETE_CUSTOMER } = mutationTypes
  return mutations[DELETE_CUSTOMER]
}

export default {
  components: {
    List,
    AddCustomer,
    EditCustomer,
  },
  data () {
    return {
      customers: [],
      customerDetailListFields: [
        'no',
        { key: 'user.userProfile.fullName', label: 'Nama lengkap' },
        { key: 'user.userProfile.address', label: 'Alamat' },
        { key: 'user.userProfile.phoneNumber', label: 'Nomor telepon' },
        { key: 'actions', label: 'Aksi' }
      ],
      header: {
        title: "Input Customer",
        actions: [
          {
            action: () => {
              this.$bvModal.show('add-customer')
            },
            actionTitle: 'TAMBAH PELANGGAN',
          }
        ],
      },
      customerFields: {
        email: '',
        fullName: '',
        address: '',
        noNik: '12313',
        dateOfBirth: new Date().getTime(),
        phoneNumber: '',
      },
      editCustomerFields: {
        customerId: '',
        fullName: '',
        address: '',
        noNik: '12313',
        dateOfBirth: new Date().getTime(),
        phoneNumber: '',
      },
      error: '',
    }
    //   editCustomerFields: {
    //     staffId: '',
    //     staffEmail: '',
    //     fullName: '',
    //     address: '',
    //     noNik: '',
    //     dateOfBirth: '',
    //     phoneNumber: '',
    //     roleId: null,
    //   },
    //   error: '',
    // }
  },
  methods: {
    customerDetailListActions () {
      return [
        {
          name: 'Update',
          handle: this.onCustomerEdit
        },
        {
          name: 'Delete',
          handle: this.deleteCustomerMutation,
          variant: 'danger',
        }
      ]
    },
    // clearFields () {
    //   Object.keys(this.staffFields).forEach(item => {
    //     if (item === 'roleId') {
    //       this.staffFields[item] = null
    //       return
    //     }

    //     this.staffFields[item] = ''
    //   })
    // },
    showModal (msg) {
      this.error = msg
      this.$bvModal.show('error-modal')
    },
    // onAddStaffMutationDone () {
    //   console.log('hehe')
    // },
    addCustomerVariables () {
      const {
        fullName,
        phoneNumber,
        address,
        noNik,
        dateOfBirth,
      } = this.customerFields

      return {
        customer: {
          fullName,
          phoneNumber,
          address,
          noNik,
          dateOfBirth,
        }
      }
    },
    addCustomerMutation () {
      this.$apollo.mutate({
        mutation: addCustomerMutation(),
        variables: this.addCustomerVariables(),
      })
      .then ((data) => {
        this.showModal('Data sukses di input')
        // this.clearFields()
      })
      .catch (err => {
        this.showModal('Data gagal di input, mohon cek kembali data yang di isi')
      })
    },
    deleteCustomerMutation ({ id }) {
      console.log(id)
      this.$apollo.mutate({
        mutation: deleteCustomerMutation(),
        variables: { id }
      })
      .then (data => {
        this.showModal('Data sukses di hapus')
      })
      .catch (err => {
        this.showModal('Data gagal di hapus')
      })
    },
    onCustomerEditMutation () {
      const newStaffFields = { ...this.editCustomerFields }

      console.log(newStaffFields, 'edit try')

      this.$apollo.mutate({
        mutation: editCustomerMutation(),
        variables: newStaffFields
      })
      .then (res => {
        this.showModal('Data berhasil di ubah!')
      })
      .catch (err => console.log(err))
    },
    editCustomerQuery ({ id }, cb) {
      console.log(id)
      this.$apollo.query({
        query: getCustomerQuery(),
        variables: { customerId: id },
      })
      .then (data => {
        cb (data)
      })
      .catch (err => {
        console.log(err)
        this.showModal('Data gagal dimuat')
      })
    },
    onCustomerEdit (id) {
      this.editCustomerQuery(id, (data) => {
        console.log(data)

        const {
          id: customerId,
          user,
          role,
        } = data.data.customer

        const {
          userProfile,
        } = user

        const {
          address,
          phoneNumber,
          fullName,
        } = userProfile

        this.editCustomerFields.address = address
        this.editCustomerFields.phoneNumber = phoneNumber
        this.editCustomerFields.fullName = fullName
        this.editCustomerFields.customerId = customerId

        this.$bvModal.show('edit-staff')
      })
    }
  },
  apollo: {
    customers: getCustomersQuery(),
  },
  updated () {
    console.log(this.customers)
  }
}
</script>