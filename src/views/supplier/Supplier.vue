<template>
  <div class="staff">
    <div class="staff-content">

      <div v-if="$apollo.queries.suppliers.loading">Loading...</div>
      <SupplierList
        v-else
        :supplierList="suppliers"
        :onSupplierDelete="onSupplierDelete"
        :onSupplierEdit="onSupplierEdit" />

      <b-modal id="add-supplier" hide-footer>
        <div class="box-underline">
          <span class="heading heading-default">INPUT SUPPLIER</span>
        </div>

        <AddSupplier
          :supplierFields="supplierFields"
          :addSupplierMutation="addSupplierMutation" />
      </b-modal>

      <b-modal id="edit-supplier" hide-footer>
        <div class="box-underline">
          <span class="heading heading-default">EDIT SUPPLIER</span>
        </div>

        <EditSupplier
          :supplierFields="editSupplierFields"
          :editSupplierMutation="onSupplierEditMutation"
          />
      </b-modal>

      <b-modal 
        ok-only
        id="error-modal">
        <span class="heading heading-default">{{ error }}</span>
      </b-modal>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import AddSupplier from './AddSupplier'
import EditSupplier from './EditSupplier'
import SupplierList from './SupplierList'
import {
  mutationTypes, mutations,
  queryTypes, queries,
} from '../../commands/supplierCommands'
import dateFormat from '../../utils/dateFormat'

const addSupplierMutation = () => {
  const { ADD_SUPPLIER } = mutationTypes
  const addSupplier = mutations[ADD_SUPPLIER]

  return addSupplier
}

const deleteSupplierMutation = () => {
  const { DELETE_SUPPLIER } = mutationTypes
  return mutations[DELETE_SUPPLIER]
}

const editSupplierMutation = () => {
  const { EDIT_SUPPLIER } = mutationTypes
  const editSupplier = mutations[EDIT_SUPPLIER]

  return editSupplier
}

const getSupplierQuery = () => {
  const { GET_SUPPLIER } = queryTypes
  const getSupplier = queries[GET_SUPPLIER]

  return getSupplier
}

const supplierListQuery = () => {
  const { GET_SUPPLIERS } = queryTypes
  const getSuppliers = queries[GET_SUPPLIERS]

  return getSuppliers
}

export default {
  components: {
    AddSupplier,
    EditSupplier,
    SupplierList,
  },
  data () {
    return {
      supplierFields: {
        name: '',
        address: '',
        phoneNumber: '',
      },
      editSupplierFields: {
        id: '',
        name: '',
        address: '',
        phoneNumber: '',
      },
      error: '',
      suppliers: [],
    }
  },
  methods: {
    clearFields () {
      Object.keys(this.supplierFields).forEach(item => {
        this.supplierFields[item] = ''
      })
    },
    showModal (msg) {
      this.error = msg
      this.$bvModal.show('error-modal')
    },
    addSupplierMutation () {
      this.$apollo.mutate({
        mutation: addSupplierMutation(),
        variables: { ...this.supplierFields },
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
    onSupplierEditMutation () {
      this.$apollo.mutate({
        mutation: editSupplierMutation(),
        variables: { 
          ...this.editSupplierFields
        },
      })
      .then (res => {
        this.showModal('Data berhasil di ubah!')

        this.$router.go(0)
      })
      .catch (err => console.log(err))
    },
    editSupplier (id, cb) {
      this.$apollo.query({
        query: getSupplierQuery(),
        variables: { supplierId: id },
      })
      .then (data => {
        cb (data)
      })
      .catch (err => {
        console.log(err)
        this.showModal('Data gagal dimuat')
      })
    },
    onSupplierEdit (id) {
      this.editSupplier(id, (data) => {
        const {
          id,
          name,
          address,
          phoneNumber,
        } = data.data.supplier

        this.editSupplierFields = {
          name,
          address,
          phoneNumber,
          id,
        }

        this.$bvModal.show('edit-supplier')
      })
    },
    onSupplierDelete (id) {
      this.$apollo.mutate({
        mutation: deleteSupplierMutation(),
        variables: { id }
      })
      .then (data => {
        this.showModal('Data berhasil dihapus')

        this.$router.go(0)
      })
      .catch (err => {
        console.log(err)
        this.showModal('Data gagal dihapus')
      })
    }
  },
  apollo: {
    suppliers: supplierListQuery(),
  }
}
</script>