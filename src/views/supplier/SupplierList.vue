<template>
  <div class="category-list">
    <div class="box-underline">
      <span class="heading heading-default">INPUT STAFF</span>
       <b-button
          @click="showAddStaffModal()"
          variant="primary"
          class="mt-3" >
          + TAMBAH PRODUK
        </b-button>
    </div>
    <div>
      <b-table
        :fields="fields"
        :items="supplierList"
        :per-page="10"
        :current-page="currentPage">
        <template v-slot:cell(no)="data">
          {{ data.index + 1 }}
        </template>

         <template v-slot:cell(actions)="row">
            <b-button 
              variant="primary" 
              @click="onSupplierEdit(row.item.id)" 
              class="mr-1">
              Edit
            </b-button>
            <b-button 
              variant="danger" 
              @click="onSupplierDelete(row.item.id)" 
              class="mr-1">
              Delete
            </b-button>
          </template>
      </b-table>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="10"
        aria-controls="my-table"
      ></b-pagination>
    </div>
  </div>
</template>

<script>

export default {
  props: [
    'supplierList',
    'onSupplierEdit',
    'onSupplierDelete',
  ],
  data() {
    return {
      fields: [
        'no',
        { key: 'name', label: 'Nama lengkap' },
        { key: 'phoneNumber', label: 'Nomor telepon' },
        { key: 'address', label: 'Alamat' },
        { key: 'actions', label: 'Aksi' }
      ],
      currentPage: 0,
    }
  },
  computed: {
    rows () {
      return this.supplierList.length
    }
  },
  methods: {
    showAddStaffModal () {
      this.$bvModal.show('add-supplier')
    },
  },
  mounted () {
    console.log(this.supplierList)
  }
}
</script>