<template>
  <div class="sidebar" v-if="loggedIn">
    <img 
      src="../../assets/logo-horizontal.png"
      alt=""
      width="150"
      height="39">
    
    <div class="navigation">
      <div class="navigation-list">
        <router-link to="/category">
          <div class="navigation-list-item">
            <span class="font font-default">Product<i class="right"></i></span>
          </div>
        </router-link>

        <router-link to="/category">
          <div class="navigation-list-item">
            <span class="font font-default">Categories<i class="right"></i></span>
          </div>
        </router-link>
        
        <router-link to="/category">
          <div class="navigation-list-item">
            <span class="font font-default">
              Staff
              <i class="right"></i>
            </span>
          </div>
        </router-link>
        
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'sidebar',
  computed: {
    ...mapState({
      loggedIn: state => state.auth.loggedIn,
    })
  },
}
</script>