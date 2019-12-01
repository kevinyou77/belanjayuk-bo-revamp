<template>
  <div class="customer transaction-history">
    <div class="staff-content">
      <div class="box-underline">
        <span class="heading heading-default">Riwayat Penjualan</span>
          <b-form-group
            label="Sortir berdasarkan"
            label-for="input">
              <b-form-select
                v-model="status"
                @change="handleStatusChange()"
                class="mb-3">
                <!-- <option :value="null">Please select an option</option> -->
                <option
                  v-for="(item, index) in transactionStatus"
                  :key="index"
                  :value="item.id">
                  {{ item.name }}
                </option>
              </b-form-select>
          </b-form-group>
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
    
  </div>
</template>
<script>
import {
  queryTypes,
  queries,
} from '../../../commands/transactionCommands'
import List from '../../../components/common/List'

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

export default {
  components: {
    List,
  },
  data () {
    return {
      transactions: [],
      transactionsById: [],
      status: 1,
      pageSize: 0,
      hasNextData: true,
      isLoading: true,
      hasError: false,
      transactionHistoryFields: [
        'no',
        { key: 'customer.user.userProfile.fullName', label: 'Full name' },
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
      ]
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
          name: 'More',
          handle: this.goToDetail,
          variant: 'danger',
        }
      ]
    },
    handleStatusChange () {
      this.pageSize = 20
      this.getAllTransactionData()
    }
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