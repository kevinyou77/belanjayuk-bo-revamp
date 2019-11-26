<template>
  <div>
    <List
      key="`list`"
      :items="transactions"
      :fields="transactionHistoryFields"
      :actions="transactionHistoryActions()"
       />
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
      transactionsHasMore: false,
      transactionHistoryFields: [
        'no',
        { key: 'customer.user.userProfile.fullName', label: 'Full name' },
        { key: 'customer.user.userProfile.phoneNumber', label: 'Phone Number' },
        { key: 'customer.user.userProfile.address', label: 'Address' },
        { key: 'staff.user.userProfile.fullName', label: 'Kasir' },
        { key: 'totalPrice', label: 'Total Price' },
        { key: 'actions', label: 'Actions' }
      ],
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
          limit: 10,
          status: 2
        }
      })
      .then (res => {
        const { transactionsWithLimit } = res.data
        const { transactions } = transactionsWithLimit
        this.transactions = transactions
      })
      .catch (err => {
        console.log(err, 'something went wrong')
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
  },
  updated () {
    console.log(this.transactions, 'tx')
  }
}
</script>