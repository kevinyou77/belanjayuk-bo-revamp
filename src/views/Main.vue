<template>
  <div class="dashboard">
    <Sidebar v-show="loggedIn" />
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/dashboard/Sidebar'
import { mapState } from 'vuex'

export default {
  components: {
    Sidebar,
  },
  computed: {
    ...mapState({
      loggedInFromStore: state => state.auth.loggedIn,
    }),
    loggedIn () {
      return this.loggedInFromStore || (sessionStorage.getItem('bearerToken') !== null)
    },
  },
}
</script>