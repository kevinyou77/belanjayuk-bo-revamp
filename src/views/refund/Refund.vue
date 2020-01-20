<template>
  <div class="customer transaction-history">
    <div class="staff-content">
      <div class="box-underline">
        <span class="heading heading-default">Pengembalian</span>
      </div>
      <div
        v-if="isLoading"
        class="loading">
        <p>Memuat</p>
      </div>
      <div 
        v-else-if="hasError"
        class="error">
        <p>Terjadi masalah dalam memuat data</p>
      </div>
      <List
        v-else
        key="`list`"
        :items="transactions"
        :fields="transactionHistoryFields"
        :actions="transactionHistoryActions()"
        />

      <p
        v-if="!hasNextData">Semua data telah ditampilkan</p>
    </div>

    <b-modal 
      hide-footer
      id="refund-modal">
      <div
        v-for="(item, index) in refundInformation.transactionDetails"
        :key="index"
        class="refund-modal-div"
        >
        <img
          :src="item.productDetail.product.imageUrl"
          width="100"
          height="100"
         />
        <div class="info">
          <div>
            <span class="font-default">Nama produk:</span><br>
            <span class="font-default">Stok</span><br>
            <span class="font-default">Harga jual</span><br>
            <span class="font-default">Harga beli</span><br>
            <span class="font-default">Kategori</span><br>
            <span class="font-default">Total harga</span><br>
          </div>
          <div>
            <span class="font-default">: {{ item.productDetail.product.name }}</span><br>
            <span class="font-default">: {{ item.numberOfPurchases }} {{ item.productDetail.productStock.name }}</span><br>
            <span class="font-default">: {{ item.productDetail.product.category.name }}</span><br>
            <span class="font-default">: Rp.{{ item.productDetail.sellingPrice }}</span><br>
            <span class="font-default">: Rp.{{ item.productDetail.purchasePrice }}</span><br>
            <span class="font-default">: Rp.{{ item.productDetail.value *  item.productDetail.purchasePrice}}</span><br>
          </div>
        </div>
      </div>

      <div class="total">
        <span class="font-medium">Total harga: Rp.{{ refundInformation.totalPrice }}</span>
        <span class="font-medium">Total pengembalian: Rp.{{ refundInformation.totalRefund }}</span>
      </div>
      
      <b-button
        block
        @click="completeRefundTransaction()"
        type="submit" variant="primary">Kembalikan</b-button>
    </b-modal>

    <b-modal id="success-modal">
      <span class="heading heading-default">Berhasil melakukan pengembalian</span>
    </b-modal>

    <b-modal id="error-modal">
      <span class="heading heading-default">{{ error }}</span>
    </b-modal>
    
  </div>
</template>
<script>
import {
  queryTypes,
  queries,
  mutationTypes,
  mutations,
} from '../../commands/transactionCommands'
import List from '../../components/common/List'

const getTransactionsByIdQuery = () => {
  const { GET_TRANSACTIONS_BY_STATUS } = queryTypes
  const getTransactionByStatus = queries[GET_TRANSACTIONS_BY_STATUS]

  return getTransactionByStatus
}

const getTransactions = () => {
  const { GET_TRANSACTIONS } = queryTypes
  return queries[GET_TRANSACTIONS]
}

const getTransaction = () => {
  const { GET_TRANSACTION } = queryTypes
  return queries[GET_TRANSACTION]
}

const refundTransaction = () => {
  const { REFUND_TRANSACTION } = mutationTypes
  return mutations[REFUND_TRANSACTION]
}

const completeRefundTransactionMutation = () => {
  const { COMPLETE_REFUND } = mutationTypes
  return mutations[COMPLETE_REFUND]
}

export default {
  components: {
    List,
  },
  data () {
    return {
      error: '',
      transactions: [],
      transactionsById: [],
      status: 4,
      pageSize: 20,
      hasNextData: true,
      isLoading: true,
      hasError: false,
      transactionHistoryFields: [
        'no',
        { key: 'id', label: 'ID Transaksi' },
        { key: 'customer.user.userProfile.fullName', label: 'Nama Pelanggan' },
        { key: 'customer.user.userProfile.phoneNumber', label: 'Phone Number' },
        { key: 'customer.user.userProfile.address', label: 'Address' },
        { key: 'staff.user.userProfile.fullName', label: 'Kasir' },
        { key: 'totalPrice', label: 'Total Price' },
        { key: 'actions', label: 'Actions' }
      ],
      transactionStatus: [
        {
          id: 1,
          name: 'On process'
        },
        {
          id: 2,
          name: 'On checker'
        },
        {
          id: 3,
          name: 'Completed'
        },
        {
          id: 4,
          name: 'On refund'
        }
      ],
      selectedDebt: {
        phoneNumber: '',
        address: '',
        fullName: '',
        debt: '',
        amountOfPayment: '',
      },
      refundInformation: false,
      currentTransactionId: '',
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getAllTransactionData()
      // vm.getAllTransactionDataByStatus()
    })
  },
  methods: {
    onTransactionStatusTabClick () {
      this.$apollo.query({
        query: getTransactionsByIdQuery(),
        variables: { status: this.status }
      })
      .then (res => this.transactionsById = [ ...res.data.transactions ])
      .catch (err => console.log(err))
    },
    onAllTransactionsTabClick () {
      this.$apollo.query({ query: getTransactions() })
      .then (res => {
        const { hasNextData, totalCount } = res.data.transactionsWithLimit
        this.transactions = [ ...res.data.transactionsWithLimit.transactions ]
      })
      .catch (err => console.log(err))
    },
    getAllTransactionData () {
      this.$apollo.query({
        query: getTransactions(),
        variables: {
          limit: this.pageSize,
          status: this.status
        }
      })
      .then (res => {
        const { transactionsWithLimit } = res.data
        const { transactions, hasNextData } = transactionsWithLimit

        this.hasNextData = hasNextData
        this.transactions = [
          ...transactions
        ]
        this.isLoading = false
      })
      .catch (err => {
        console.log(err, 'something went wrong')
        this.isLoading = false
        this.hasError = true
      })
    },
    getAllTransactionDataByStatus () {
      this.$apollo.query({
        query: getTransactionsByIdQuery(),
        variables: {
          status: this.status
        }
      })
      .then (res => console.log(res, 'status success'))
      .catch (err => console.log(err, 'error data status'))
    },
    goToDetail ({ id }) {
      this.$router.push(`/transaction/history/${id}`)
    },
    transactionHistoryActions () {
      return [
        {
          name: 'Kembalikan',
          handle: this.refundTransaction,
          variant: 'danger',
        }
      ]
    },
    handleStatusChange () {
      this.pageSize = 20
      this.getAllTransactionData()
    },
    refundTransaction (tx) {
      this.currentTransactionId = tx.id

      this.$apollo.mutate({
        mutation: refundTransaction(),
        variables: { transactionId: tx.id }
      })
      .then (res => {
        this.refundInformation = { ...res.data.refundTransaction }
        this.$bvModal.show('refund-modal')
        console.log('refund tx')
      })
      .catch (err => {
        console.log(err, 'error')
      })
    },
    completeRefundTransaction () {
      this.$apollo.mutate({
        mutation: completeRefundTransactionMutation(),
        variables: { transactionId: this.currentTransactionId }
      })
      .then (res => {
        this.showModal('Data berhasil di ubah!')
        console.log(res, 'complete refund')
      })
      .catch (err => {
        this.showModal('Terjadi masalah, mohon coba lagi')
        console.log(err, 'error complete refund')
      })
    },
    showModal (msg) {
      this.error = msg
      this.$bvModal.show('error-modal')
    },
  },
  mounted () {
    document.onscroll = () => {
      const isBottom = document.documentElement.scrollTop + window.innerHeight == document.documentElement.scrollHeight
      if (isBottom && this.hasNextData) {
        this.pageSize = this.pageSize + 20
        console.log(this.pageSize)
        this.getAllTransactionData()
      }
    }
  }
}
</script>