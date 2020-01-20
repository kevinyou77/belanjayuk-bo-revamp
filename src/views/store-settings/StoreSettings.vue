<template>
  <div class="store">
    <!-- <div v-if="$apollo.queries.store.loading">Loading...</div> -->
    <div class="store-content">
      <div class="box-underline">
        <span class="heading heading-default">Pengaturan Toko</span>
      </div>
        <b-form-group
          id="input-group-1"
          label="Nama"
          label-for="nama"
        >
          <b-form-input
            v-model="store.name"
            id="name"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-1"
          label="Nomor Telepon"
          label-for="phoneNumber"
        >
          <b-form-input
            v-model="store.phoneNumber"
            id="phoneNumber"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-1"
          label="Alamat"
          label-for="Alamat"
        >
          <b-form-input
            v-model="store.address"
            id="alamat"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <b-button
          @click="updateStoreSettings()"
          variant="success"
          class="mt-3" 
          block
        >
          Simpan pengaturan
        </b-button>

        <b-modal id="error-modal">
          <span class="heading heading-default">{{ error }}</span>
        </b-modal>
      </div>
    </div>
</template>

<script>

import { 
  queries,
  queryTypes,
  mutationTypes,
  mutations,
} from '../../commands/storeSettingCommands'

const getStoreSettingsQuery = () => {
  const { GET_STORE } = queryTypes
  return queries[GET_STORE]
}

const updateStoreSettingsMutation = () => {
  const { UPDATE_STORE_SETTINGS } = mutationTypes
  return mutations[UPDATE_STORE_SETTINGS]
}

export default {
  data () {
    return {
      selected: null,
      store: {
        name: '',
        phoneNumber: '',
        address: '',
      },
      error: '',
    }
  },
  methods: {
    getStoreSettings () {
      this.$apollo.query({
        query: getStoreSettingsQuery()
      })
      .then(res => {
        console.log(res.data)

        if (res.data.store == null) return

        this.store = {
          ...res.data.store
        }
      })
      .catch (err => {
        console.log(err)
      })
    },
    updateStoreSettings () {
      const {
        name,
        phoneNumber,
        address,
      } = this.store

      this.$apollo.mutate({
        mutation: updateStoreSettingsMutation(),
        variables: {
          name,
          phoneNumber,
          address,
        }
      })
      .then ((res) => {
        this.showModal("Data berhasil di ubah")
      })
      .catch ((err) => {
        console.log(err)
        this.showModal("Terjadi masalah, coba lagi!")
      })
    },
    showModal (msg) {
      this.error = msg
      this.$bvModal.show('error-modal')
    },
  },
  mounted() {
    this.getStoreSettings()
  }
  // apollo: {
  //   store: getStoreSettingsQuery(),
  // },
  // updated () {
  //   console.log(this.store)
  // }
}
</script>