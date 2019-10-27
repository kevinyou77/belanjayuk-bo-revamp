<template>
  <div class="login">
    <div class="login-wrapper">
      <ApolloMutation
        :mutation="loginMutation"
        :variables="{
          username,
          password
        }"
        @done="onMutationDone">
        <template v-slot="{ mutate, loading, error, done }">
          <div class="login-wrapper-content">
            <img 
              class="login-wrapper-content-image"
              src="../assets/logo.png"
              alt=""
              width="150"
              height="180" />

            <div class="login-wrapper-content-form form form-column form-center">
              <input 
                type="text"
                class="form-input-text"
                placeholder="Username"
                v-model="username" />

              <input
               type="password"
               class="form-input-text"
               placeholder="Password"
               v-model="password" />
              
              <button 
                :disabled="loading"
                @click="mutate()"
                class="button-primary">
                <span class="text-default">
                  Masuk
                </span>
              </button>

              <p v-if="error">An error occured: {{ error }}</p>
              <p v-if="done">An error occured: {{ done }}</p>
            </div>
          </div>
        </template>
      </ApolloMutation>
      
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {
  mutations,
  mutationTypes,
} from '../commands/loginCommands'

export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
    }
  },
  computed: {
    ...mapState({
      loggedIn: state => state.auth.loggedIn,
    }),
    loginMutation () {
      const { LOGIN } = mutationTypes
      const authenticateQuery = mutations[LOGIN]

      return authenticateQuery
    },
  },
  methods: {
    onMutationDone (res) {
      if (!res.data) return

      const {
        bearerToken,
        roleName,
        username,
        id,
      } = res.data.login

      sessionStorage.setItem('bearerToken', bearerToken)
      sessionStorage.setItem('roleName', roleName)
      sessionStorage.setItem('username', username)
      sessionStorage.setItem('staffId', id)

      this.$store.dispatch('auth/authenticate')
      this.$router.push('/dashboard')
    }
  },
  mounted () {
    // this.tryAuth()
  },
}
</script>