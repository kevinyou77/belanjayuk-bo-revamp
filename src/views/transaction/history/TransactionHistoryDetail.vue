<template>
  <div>
    <div class="box-underline">
      <span class="heading heading-default">
        Detil Transaksi
      </span>
    </div>

    <div
      v-if="loading"
      class="transaction-detail-fail">Data failed to load</div>
    <div 
      v-else
      class="transaction-detail">

      <div
        class="transaction-detail-id">
        <div class="detail-left">
          <h2>TRANSAKSI NOMOR </h2> 
          <h1>#{{ transaction.id }}</h1>
        </div>
        <div class="detail-right">
          <canvas class="transaction-qr"></canvas>
        </div>
      </div>


      <div class="transaction-detail-info">
        <div class="transaction-detail-customer">
          <div class="transaction-detail-customer-wrapper">
            <div class="transaction-detail-customer-wrapper-fields">
              <h2>Pelanggan</h2>
            </div>
            <div class="transaction-detail-customer-wrapper-fields">
              Nama lengkap:
            </div>
            <div class="transaction-detail-customer-wrapper-fields">
              Email:
            </div>
            <div class="transaction-detail-customer-wrapper-fields">
              Alamat:
            </div>
            <div class="transaction-detail-customer-wrapper-fields">
              Nomor telepon:
            </div>
          </div>

          <div class="transaction-detail-customer-content">
            <div class="transaction-detail-customer-content-item">
              &nbsp;
            </div>
            <div class="transaction-detail-customer-content-item">
              {{ transaction.customer.user.email }}
            </div>
            <div class="transaction-detail-customer-content-item">
              {{ transaction.customer.user.userProfile.fullName }}
            </div>
            <div class="transaction-detail-customer-content-item">
              {{ transaction.customer.user.userProfile.address }}
            </div>
            <div class="transaction-detail-customer-content-item">
              {{ transaction.customer.user.userProfile.phoneNumber }}
            </div>
          </div>
        </div>

        <div class="transaction-detail-staff">
          <div class="transaction-detail-staff-wrapper">
            <div class="transaction-detail-staff-wrapper-fields">
              <h2>Kasir</h2>
            </div>
            <div class="transaction-detail-staff-wrapper-fields">
              Nama lengkap:
            </div>
            <div class="transaction-detail-staff-wrapper-fields">
              Email:
            </div>
            <div class="transaction-detail-staff-wrapper-fields">
              Alamat:
            </div>
            <div class="transaction-detail-staff-wrapper-fields">
              Nomor telepon:
            </div>
          </div>

          <div class="transaction-detail-staff-content">
            <div class="transaction-detail-staff-content-item">
              &nbsp;
            </div>
            <div class="transaction-detail-staff-content-item">
              {{ transaction.staff.user.email }}
            </div>
            <div class="transaction-detail-staff-content-item">
              {{ transaction.staff.user.userProfile.fullName }}
            </div>
            <div class="transaction-detail-staff-content-item">
              {{ transaction.staff.user.userProfile.address }}
            </div>
            <div class="transaction-detail-staff-content-item">
              {{ transaction.staff.user.userProfile.phoneNumber }}
            </div>
          </div>
        </div>
      </div>

      <div class="transaction-detail-products">
        <div class="transaction-detail-products-wrapper">
          <div class="transaction-detail-products-title">
            <h2>Produk yang dibeli</h2>
          </div>
          <div 
            v-for="(item, index) in transaction.transactionDetail"
            :key="index"
            class="transaction-detail-products-items">
              <div class="items-left">
                <img
                  :src="item.productDetail.product.imageUrl"
                  height="100"
                  width="100"
                  alt="">
              </div>

              <div class="items-right">
                <div class="items-title-wrapper">
                  <div class="items-title">
                    Nama Produk
                  </div>
                  <div class="items-title">
                    Harga beli
                  </div>
                  <div class="items-title">
                    Harga jual
                  </div>
                  <div class="items-title">
                    Jumlah pembelian
                  </div>
                  <div class="items-title">
                    Nama stok produk
                  </div>
                </div>

                <div class="items-content-wrapper">
                  <div class="items-content">
                    :  {{ item.productDetail.product.name }}
                  </div>
                  <div class="items-content">
                    :  {{ item.productDetail.purchasingPrice }}
                  </div>
                  <div class="items-content">
                    :  {{ item.productDetail.sellingPrice }}
                  </div>
                  <div class="items-content">
                    :  {{ item.numberOfPurchase }}
                  </div>
                  <div class="items-content">
                    :  {{ item.productDetail.productStock.name }}
                  </div>
                </div>
              </div>
          </div>
        </div>

        <div class="transaction-detail-summary">
          <div class="title">
            Summary
          </div>

          <div class="summary">
            <div class="transaction-detail-summary-title">
              <span>Jumlah pembayaran</span>
              <span>Hutang</span>
              <span>Untung</span>
              <span>Total harga</span>
            </div>
            <div class="transaction-detail-summary-content">
              <span>: Rp.{{ transaction.payment.amountOfPayment }}</span>
              <span>: Rp.{{ transaction.payment.debt }}</span>
              <span>: Rp.{{ transaction.profit }}</span>
              <span>: Rp.{{ transaction.totalPrice  }}</span>
            </div>
          </div>
          
          <b-button
            @click="print()"
            type="submit" 
            variant="primary">
            Cetak bon
          </b-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import QRCode from 'qrcode'
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
    print () {
      this.$router.push(`/transaction/history/print/${this.transactionId}`)
    },
    renderQR () {
      const canvas = document.querySelector('.transaction-qr')
      QRCode.toCanvas(canvas, this.transaction.id, (err) => {
        if (err) {
          console.log(err)
          return
        }

        console.log('success')
      })
    }
  },
  mounted () {
    this.$apollo.query({
      query: getTransaction(),
      variables: { transactionId: this.$route.params.id }
    })
    .then (res => {
      this.transaction = res.data.transaction
      this.loading = false
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