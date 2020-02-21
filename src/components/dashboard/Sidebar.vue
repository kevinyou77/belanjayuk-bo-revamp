<template>
  <div class="sidebar">
    <img 
      src="../../assets/logo-horizontal.png"
      alt=""
      width="150"
      height="39">
    
    <div class="navigation">
      <div class="navigation-list">
        <a
          v-if="isAdmin"
          :href="$router.resolve('/dashboard').href" 
          >
          <div class="navigation-list-item">
            <span class="font font-default">Dashboard<i class="right"></i></span>
          </div>
        </a>

        <a
          v-if="isCashier || isAdmin"
          :href="$router.resolve('/transaction/history').href">
          <div class="navigation-list-item">
            <span class="font font-default">Riwayat Penjualan<i class="right"></i></span>
          </div>
        </a>

        <a
          v-if="isCashier || isAdmin"
          :href="$router.resolve('/transaction').href">
          <div class="navigation-list-item">
            <span class="font font-default">Penjualan<i class="right"></i></span>
          </div>
        </a>

        <template v-if="isAdmin">
          <a :href="$router.resolve('/purchase').href">
            <div class="navigation-list-item">
              <span class="font font-default">Pembelian<i class="right"></i></span>
            </div>
          </a>

          <a :href="$router.resolve('/debt').href">
            <div class="navigation-list-item">
              <span class="font font-default">
                Hutang
                <i class="right"></i>
              </span>
            </div>
          </a>

          <a :href="$router.resolve('/refund').href">
            <div class="navigation-list-item">
              <span class="font font-default">
                Pengembalian
                <i class="right"></i>
              </span>
            </div>
          </a>

          <a :href="$router.resolve('/supplier').href">
            <div class="navigation-list-item">
              <span class="font font-default">Supplier<i class="right"></i></span>
            </div>
          </a>

          <a :href="$router.resolve('/products').href">
            <div class="navigation-list-item">
              <span class="font font-default">Produk<i class="right"></i></span>
            </div>
          </a>

          <a :href="$router.resolve('/category').href">
            <div class="navigation-list-item">
              <span class="font font-default">Kategori<i class="right"></i></span>
            </div>
          </a>

          <a :href="$router.resolve('/customers').href">
            <div class="navigation-list-item">
              <span class="font font-default">Pelanggan<i class="right"></i></span>
            </div>
          </a>
          
          <a :href="$router.resolve('/stock-products').href">
            <div class="navigation-list-item">
              <span class="font font-default">
                Stok Produk
                <i class="right"></i>
              </span>
            </div>
          </a>

          <a :href="$router.resolve('/staff').href">
            <div class="navigation-list-item">
              <span class="font font-default">
                Staff
                <i class="right"></i>
              </span>
            </div>
          </a>

          <a :href="$router.resolve('/store-settings').href">
            <div class="navigation-list-item">
              <span class="font font-default">
                Pengaturan Toko
                <i class="right"></i>
              </span>
            </div>
          </a>
        </template>

        <router-link @click.native="onLogout()" to="/logout">
          <div class="navigation-list-item">
            <span class="font font-default">
              Keluar
              <i class="right"></i>
            </span>
          </div>
        </router-link>

      </div>
    </div>
    
  </div>
</template>

<script>

export default {
  name: 'sidebar',
  methods: {
    onLogout () {
      sessionStorage.setItem('loggedIn', 0)
      this.$store.dispatch('auth/logout')
    },
  },
  computed: {
    isCashier () {
      const role = sessionStorage.getItem('roleName')
      return role.toLowerCase() === 'cashier'
    },
    isAdmin () {
      const role = sessionStorage.getItem('roleName')
      return role.toLowerCase() === 'admin'
    }
  }
}
</script>