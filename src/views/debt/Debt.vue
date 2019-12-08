<template>
  <div class="customer transaction-history">
    <div class="staff-content">
      <div class="box-underline">
        <span class="heading heading-default">Daftar Hutang</span>
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

    <b-modal id="debt-modal">
      <span class="heading heading-default">Hutang</span>

      <span class="">{{ selectedDebt.fullName }}</span>
      <span class="">{{ selectedDebt.phoneNumber }}</span>
      <span class="">{{ selectedDebt.address }}</span>

      <span class="">{{ selectedDebt.debt }}</span>
      <span class="">{{ selectedDebt.amountOfPayment }}</span>

      <button
        @click="handlePayOffDebt()">
          Bayar hutang
      </button>
    </b-modal>
  </div>
</template>

<script>
import {
  queryTypes,
  queries,
  mutationTypes,
  mutations
} from '../../commands/transactionCommands'
import List from '../../components/common/List'

const getTransactionsByIdQuery = () => {
  const { GET_TRANSACTION_BY_PAYMENT_STATUS } = queryTypes
  const getTransactionByStatus = queries[GET_TRANSACTION_BY_PAYMENT_STATUS]

  return getTransactionByStatus
}

const payOffDebtMutation = () => {
  const { PAY_OFF_DEBT } = mutationTypes
  return mutations[PAY_OFF_DEBT]
}

export default {
  components: {
    List,
  },
  data () {
    return {
      transactions: [],
      transactionsById: [],
      status: 2,
      pageSize: 0,
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
        { key: 'payment.debt', label: 'Total Hutang' },
        { key: 'actions', label: 'Actions' }
      ],
      selectedDebt: {
        phoneNumber: '',
        address: '',
        fullName: '',
        debt: '',
        amountOfPayment: '',
      },
      amountOfPayment: 0,
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getAllTransactionDataByStatus()
      // vm.getAllTransactionDataByStatus()
    })
  },
  methods: {
    getAllTransactionDataByStatus () {
      this.$apollo.query({
        query: getTransactionsByIdQuery(),
        variables: {
          paymentStatus: this.status
        }
      })
      .then (res => {
        this.transactions = [ ...res.data.transactionsByPaymentStatus ]
        this.isLoading = false
      })
      .catch (err => console.log(err, 'error data status'))
    },
    handlePayOffDebt (id) {
      this.$apollo.mutate({
        mutation: payOffDebtMutation(),
        variables: {
          transactionId: id,
          amountOfPayment: this.amountOfPayment
        }
      })
      .then (res => {
        this.showModal('Data berhasil di ubah!')
      })
      .catch (err => console.log(err))
    },
    handlePayOffDebtButton (item) {
      const selectedDebt = {
        phoneNumber: item.customer.user.userProfile.phoneNumber,
        address: item.customer.user.userProfile.address,
        fullName: item.customer.user.userProfile.fullName,
        debt: item.payment.debt,
        amountOfPayment: item.payment.amountOfPayment,
      }

      this.selectedDebt = { ...selectedDebt }

      this.$bvModal.show('debt-modal')
    },
    transactionHistoryActions () {
      return [
        {
          name: 'Bayar hutang',
          handle: this.handlePayOffDebtButton,
          variant: 'success',
        }
      ]
    },
    handleStatusChange () {
      this.pageSize = 20
      this.getAllTransactionData()
    }
  },
}
</script>