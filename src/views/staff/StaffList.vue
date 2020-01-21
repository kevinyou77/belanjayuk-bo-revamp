<template>
  <div class="category-list">
    <div class="box-underline">
      <span class="heading heading-default">STAFFS</span>
       <b-button
          @click="showAddStaffModal()"
          variant="primary"
          class="mt-3" >
          + TAMBAH STAFF
        </b-button>
    </div>
    <div>
      <b-table
        :fields="fields"
        :items="staffList"
        :per-page="10"
        :current-page="currentPage">
        <template v-slot:cell(no)="data">
          {{ data.index + 1 }}
        </template>

         <!-- <template v-slot:row-details="row">
           
         </template> -->

        <template v-slot:cell(dateOfBirth)="row">
          <p>{{ new Date(row.item.user.userProfile.dateOfBirth).toLocaleDateString() }}</p>
        </template>

         <template v-slot:cell(actions)="row">
            <b-button 
              variant="primary" 
              @click="onStaffEdit(row.item.id)" 
              class="mr-1">
              Edit
            </b-button>
            <b-button 
              variant="danger" 
              @click="onStaffDelete(row.item.id)" 
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
    'staffList',
    'onStaffEdit',
    'onStaffDelete',
  ],
  data() {
    return {
      fields: [
        'no',
        { key: 'user.userProfile.fullName', label: 'Nama lengkap' },
        { key: 'user.username', label: 'Nama pengguna' },
        { key: 'user.userProfile.address', label: 'Alamat' },
        { key: 'user.userProfile.phoneNumber', label: 'Nomor telepon' },
        { key: 'user.email', label: 'E-mail' },
        { key: 'dateOfBirth', label: 'Tanggal Lahir' },
        { key: 'role.name', label: 'Peran' },
        { key: 'actions', label: 'Aksi' }
      ],
      currentPage: 0,
    }
  },
  computed: {
    rows () {
      return this.staffList.length
    }
  },
  methods: {
    showAddStaffModal () {
      this.$bvModal.show('add-staff')
    },
  },
  mounted () {
    console.log(this.staffList)
  }
}
</script>