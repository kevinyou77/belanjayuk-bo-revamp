<template>
  <div class="transaction-history-print">
    <div
      v-if="loading"
      >Data failed to load</div>
    <div 
      v-else
      >

      <div style="text-align: center; font-size: 10px">
        <h2 class="header" style="font-size: 10px">{{ store.name }}</h2> 
        <h2 class="header" style="font-size: 10px">{{ store.address }}</h2> 
        <h2 class="header" style="font-size: 10px">{{ store.phoneNumber }}</h2><br>

        <h2 class="header" style="font-size: 10px">TRANSAKSI NOMOR</h2> 
        <h1 class="print-id" style="font-size: 8px">#{{ transaction.id }}</h1>
        <h2 class="header" style="font-size: 8px">{{ dateFormat(transaction.date) }}</h2>
      </div><br>

      <div class="pelanggan">
        <div class="left">
          <h2 class="header">Pelanggan</h2>
          <div>{{ transaction.customer.user.userProfile.fullName }}</div>
          <div>{{ transaction.customer.user.userProfile.phoneNumber }}</div>
          <br>
          <h2 class="header">Kasir</h2>
          <div>{{ transaction.staff.user.userProfile.fullName }}</div>
        </div>
        <div 
          class="right">
          <canvas 
            width="50"
            height="50"
            class="transaction-qr-print"></canvas>
        </div>
      </div>
      <br>
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
              <div v-if="item.status != 4">
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
import { 
  queries as storeSettingQueries,
  queryTypes as storeSettingsQueryTypes,
} from '../../../commands/storeSettingCommands'

import dateFormat from '../../../utils/dateFormat'
import QRCode from 'qrcode'

const getTransaction = () => {
  const { GET_TRANSACTION } = queryTypes
  return queries[GET_TRANSACTION]
}

const getStoreSettingsQuery = () => {
  const { GET_STORE } = storeSettingsQueryTypes
  return storeSettingQueries[GET_STORE]
}

export default {
  data () {
    return {
      transaction: {},
      transactionId: this.$route.params.id,
      loading: true,
      dateFormat,
      store: {}
    }
  },
  methods: {
    renderQR () {
      var opts = {
        width: 70,
      }
      const canvas = document.querySelector('.transaction-qr-print')
      QRCode.toCanvas(canvas, this.transaction.id, opts, (err) => {
        if (err) {
          return
        }
      })
    },
    fetchStoreSettings(onFetchComplete) {
      this.$apollo.query({
        query: getStoreSettingsQuery()
      })
      .then(res => {
        console.log(res.data)

        if (res.data.store == null) return

        this.store = {
          ...res.data.store
        }

        onFetchComplete()
      })
      .catch (err => {
        console.log(err)
      })
    }
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
    .then (async res => {
      this.fetchStoreSettings(() => {
        this.fetchStoreSettings()
        this.transaction = res.data.transaction
        console.log(this.transaction, 'txxx')
        this.loading = false
      })
      
    })
    .catch (err => {
      this.loading = false
    })
  },
  updated () {
    this.renderQR()
  }
}
</script>