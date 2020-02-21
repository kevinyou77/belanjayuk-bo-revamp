<template>
  <div class="transaction-history-print">
    <div
      v-if="loading"
      >Data failed to load</div>
    <div 
      v-else
      >

      <div style="text-align: center; font-size: 7px">
        <h2 class="header">TRANSAKSI NOMOR</h2> 
        <h1 class="print-id">#{{ transaction.id }}</h1>
        <h2 class="header">{{ dateFormat(transaction.date) }}</h2>
      </div><br>

      <h2 class="header">Pelanggan</h2>
      <div class="pelanggan">
        <div class="right">
          <div>{{ transaction.customer.user.userProfile.fullName }}</div>
          <div>{{ transaction.customer.user.email }}</div>
          <div>{{ transaction.customer.user.userProfile.address }}</div>
          <div>{{ transaction.customer.user.userProfile.phoneNumber }}</div>
        </div>
      </div>
      <br>

      <h2 class="header">Kasir</h2>
      <div class="pelanggan">
        <div class="right">
          <div>{{ transaction.staff.user.userProfile.fullName }}</div>
          <div>{{ transaction.staff.user.email }}</div>
          <div>{{ transaction.staff.user.userProfile.address }}</div>
          <div>{{ transaction.staff.user.userProfile.phoneNumber }}</div>
        </div>
      </div>
      <br>

      <div>
        <div>
          <div >
            <h2 style="text-align: center">=================================</h2>
          </div>
          <div 
            v-for="(item, index) in transaction.transactionDetail"
            :key="index"
            >

              <div>
                <div>
                  <div class="detail-list">
                    <span>{{ item.numberOfPurchases }} {{ item.productDetail.productStock.name }}</span>
                    <span>{{ item.productDetail.product.name }}</span>
                    <span>Rp.{{ item.productDetail.sellingPrice }}</span>
                  </div>

                </div>
              </div>
          </div>
          <h2 style="text-align: center">=================================</h2>
        </div>
      </div><br>

      <span>Jumlah pembayaran</span><br><span>Rp.{{ transaction.payment.amountOfPayment }}</span><br>
      <span>Hutang</span><br><span>Rp.{{ transaction.payment.debt }}</span><br>
      <span>Total harga</span><br><span>Rp.{{ transaction.totalPrice  }}</span><br>
    </div>

  </div>
</template>

<script>
import {
  queryTypes,
  queries,
} from '../../../commands/transactionCommands'
import dateFormat from '../../../utils/dateFormat'

const getTransaction = () => {
  const { GET_TRANSACTION } = queryTypes
  return queries[GET_TRANSACTION]
}

export default {
  data () {
    return {
      transaction: {},
      transactionId: this.$route.params.id,
      loading: true,
      dateFormat,
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
      console.log(this.transaction, 'txxx')
      this.loading = false
    })
    .catch (err => {
      this.loading = false
    })
  },
}
</script>