<template>
  <div>
    <div class="box-underline">
      <span class="heading heading-default">Detil Transaksi</span>
    </div>

    <div
      v-if="loading"
      class="transaction-detail-fail">Data failed to load</div>
    <div 
      v-else
      class="transaction-detail">

      <div
        class="transaction-detail-id">
        TRANSAKSI NOMOR #{{ transaction.id }}
      </div>

      <div class="transaction-detail-info">
        <div class="transaction-detail-customer">
          <div class="transaction-detail-customer-wrapper">
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
      <div 
        v-for="(item, index) in transaction.transactionDetail"
        :key="index"
        class="transaction-detail-items">
        number of purchase{{ item.numberOfPurchase }}

        purchasing price {{ item.productDetail.purchasingPrice }}
        selling price {{ item.productDetail.sellingPrice }}
        product name {{ item.productDetail.product.name }}
        Image url {{ item.productDetail.product.imageUrl }}
        product stock {{ item.productDetail.productStock.name }}

      </div>

      <div class="transaction-detail-summary">
        <div class="transaction-detail-summary-title">
          <span>Amount of Payment</span>
          <span>Debt</span>
          <span>Profile</span>
          <span>Total Price</span>
        </div>
        <div class="transaction-detail-summary-content">
          <span>{{ transaction.payment.amountOfPayment }}</span>
          <span>{{ transaction.payment.debt }}</span>
          <span>{{ transaction.profit }}</span>
          <span>{{ transaction.totalPrice  }}</span>
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