<template>
  <div class="main">
    <Sidebar v-if="loggedIn && !hasAction" />
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
      hasAction: state => state.auth.hasAction
    }),
    loggedIn () {
      return this.loggedInFromStore || (sessionStorage.getItem('bearerToken') !== null)
    },
  },
}
</script>