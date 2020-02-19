<template>
  <div class="">
    <div>
      <span>Detil Transaksi</span>
    </div>

    <div
      v-if="loading"
      >Data failed to load</div>
    <div 
      v-else
      >

      <div>
        <h2>TRANSAKSI NOMOR </h2> 
        <h1>#{{ transaction.id }}</h1>
      </div>

      <div>
        <div>
          <div>
            <div>
              <h2>Pelanggan</h2>
            </div>
            <div>
              Nama lengkap: {{ transaction.customer.user.userProfile.fullName }}
            </div>
            <div>
              Email: {{ transaction.customer.user.email }}
            </div>
            <div>
              Alamat: {{ transaction.customer.user.userProfile.address }}
            </div>
            <div>
              Nomor telepon: {{ transaction.customer.user.userProfile.phoneNumber }}
            </div>
          </div>
        </div>

        <div>
          <div>
            <div>
              <h2>Kasir</h2>
            </div>
            <div>
              Nama lengkap: {{ transaction.staff.user.userProfile.fullName }}
            </div>
            <div>
              Email: {{ transaction.staff.user.email }}
            </div>
            <div>
              Alamat: {{ transaction.staff.user.userProfile.address }}
            </div>
            <div>
              Nomor telepon: {{ transaction.staff.user.userProfile.phoneNumber }}
            </div>
          </div>
        </div>
      </div>

      <div>
        <div>
          <div>
            <h2>Produk yang dibeli</h2>
          </div>
          <div 
            v-for="(item, index) in transaction.transactionDetail"
            :key="index"
            >
              <div>
                <img
                  :src="item.productDetail.product.imageUrl"
                  height="100"
                  width="100"
                  alt="">
              </div>

              <div >
                <div>
                  <div>
                    Nama Produk
                  </div>
                  <div>
                    Harga beli
                  </div>
                  <div>
                    Harga jual
                  </div>
                  <div>
                    Jumlah pembelian
                  </div>
                  <div>
                    Nama stok produk
                  </div>
                </div>

                <div>
                  <div>
                    :  {{ item.productDetail.product.name }}
                  </div>
                  <div>
                    :  {{ item.productDetail.purchasingPrice }}
                  </div>
                  <div>
                    :  {{ item.productDetail.sellingPrice }}
                  </div>
                  <div>
                    :  {{ item.numberOfPurchase }}
                  </div>
                  <div>
                    :  {{ item.productDetail.productStock.name }}
                  </div>
                </div>
              </div>
          </div>
        </div>

        <div>
          <div>
            Summary
          </div>

          <div>
            <div>
              <span>Jumlah pembayaran</span>
              <span>Hutang</span>
              <span>Untung</span>
              <span>Total harga</span>
            </div>
            <div>
              <span>: Rp.{{ transaction.payment.amountOfPayment }}</span>
              <span>: Rp.{{ transaction.payment.debt }}</span>
              <span>: Rp.{{ transaction.profit }}</span>
              <span>: Rp.{{ transaction.totalPrice  }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {
  queryTypes,
  queries,
} from '../../../commands/transactionCommands'

const getTransaction = () => {
  const { GET_TRANSACTION } = queryTypes
  return queries[GET_TRANSACTION]
}

export default {
  data () {
    return {
      transaction: {},
      transactionId: this.$route.params.id,
      loading: true
    }
  },
  methods: {
  
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.dispatch('auth/toggleAction')
    })
  },
  beforeRouteLeave (to, from, next) {
    next(vm => {
      vm.$store.dispatch('auth/toggleAction')
    })
  },
  destroyed () {
    this.$store.dispatch('auth/toggleAction')
  },
  mounted () {
    this.$apollo.query({
      query: getTransaction(),
      variables: { transactionId: this.$route.params.id }
    })
    .then (res => {
      this.transaction = res.data.transaction
      console.log(this.transaction)
      this.loading = false
    })
    .catch (err => {
      this.loading = false
    })
  },
}
</script>