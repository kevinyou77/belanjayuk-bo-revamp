<template>
  <div class="category-list">
    <div class="box-underline">
      <span class="heading heading-default">INPUT STAFF</span>
       <b-button
          @click="showAddStaffModal()"
          variant="primary"
          class="mt-3" >
          TAMBAH PRODUK
        </b-button>
    </div>
    <div>
      <b-table
        :fields="fields"
        :items="staffList">
        <template v-slot:cell(no)="data">
          {{ data.index + 1 }}
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
              @click="onStaffDelete(row.item, row.index, $event.target)" 
              class="mr-1">
              Delete
            </b-button>
          </template>
      </b-table>
    </div>
  </div>
</template>

<script>
// query{
//   staffs{
//     status
//     id
//     user {
//       username
//       userProfile {
//         fullName
// 			}
//     }
//     role {
//       name
//     }
//   }
// }

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
        { key: 'user.username', label: 'Nama pengguna' },
        { key: 'user.userProfile.fullName', label: 'Nama lengkap' },
        { key: 'role.name', label: 'Peran' },
        { key: 'actions', label: 'Aksi' }
      ],
    }
  },
  methods: {
    showAddStaffModal () {
      this.$bvModal.show('add-staff')
    },
  },
}
</script>