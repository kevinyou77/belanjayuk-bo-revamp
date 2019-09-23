<template>
  <div>
    ini login
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'login',
  computed: {
    ...mapState({
      loggedIn: state => state.auth.loggedIn,
    })
  },
  methods: {
    tryAuth() {
      console.log(this.loggedIn)
      this.$store.dispatch('auth/authenticate').then (res => {
        console.log(res, 'success')
      })
    }
  },
  mounted () {
    this.tryAuth()
  },
}
</script>