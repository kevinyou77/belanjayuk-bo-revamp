<template>
  <div class="sidebar">
    <img 
      src="../../assets/logo-horizontal.png"
      alt=""
      width="150"
      height="39">
    
    <div class="navigation">
      <div class="navigation-list">
        <router-link to="/transaction">
          <div class="navigation-list-item">
            <span class="font font-default">Penjualan<i class="right"></i></span>
          </div>
        </router-link>

        <router-link to="/transaction/history">
          <div class="navigation-list-item">
            <span class="font font-default">Riwayat Penjualan<i class="right"></i></span>
          </div>
        </router-link>

        <router-link to="/products">
          <div class="navigation-list-item">
            <span class="font font-default">Produk<i class="right"></i></span>
          </div>
        </router-link>

        <router-link to="/category">
          <div class="navigation-list-item">
            <span class="font font-default">Kategori<i class="right"></i></span>
          </div>
        </router-link>
        
        <router-link to="/stock-products">
          <div class="navigation-list-item">
            <span class="font font-default">
              Stok Produk
              <i class="right"></i>
            </span>
          </div>
        </router-link>

        <router-link to="/staff">
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

export default {
  name: 'sidebar',
  computed: {
    
  },
}
</script>