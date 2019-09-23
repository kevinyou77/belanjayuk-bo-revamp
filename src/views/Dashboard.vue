<template>
  <div class="dashboard">
    <Sidebar />
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/dashboard/Sidebar'

export default {
  components: {
    Sidebar,
  }
}
</script>