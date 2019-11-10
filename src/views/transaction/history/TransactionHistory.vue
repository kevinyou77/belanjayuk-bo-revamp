<template>
  <div>
    <List
      key="`list`"
      :items="transactions"
       />
  </div>
</template>
<script>
import {
  queryTypes,
  queries,
} from '../../../commands/transactionCommands'
import List from '../../../components/common/List'

// const getTransactionsQuery = () => {
//   const { GET_TRANSACTIONS } = queryTypes
//   const getTransactions = queries[GET_TRANSACTIONS]

//   return getTransactions
// }

const getTransactionsByIdQuery = () => {
  const { GET_TRANSACTIONS_BY_STATUS } = queryTypes
  const getTransactionByStatus = queries[GET_TRANSACTIONS_BY_STATUS]

  return getTransactionByStatus
}

const getTransactions = () => {
  const { GET_TRANSACTIONS } = queryTypes
  return queries[GET_TRANSACTIONS]
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
    }
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
          limit: 10
        }
      })
      .then (res => {
        console.log(res, 'tx success')
      })
      .catch (err => {
        console.log(err, 'something went wrong')
      })
    },
    getAllTransactionDataByStatus () {
      this.$apollo.query({
        query: getTransactionsByIdQuery(),
        variables: {
          status: 3
        }
      })
      .then (res => console.log(res, 'status success'))
      .catch (err => console.log(err, 'error data status'))
    }
  },
  mounted () {
    this.getAllTransactionData()
    this.getAllTransactionDataByStatus()
  },
  updated () {
    console.log(this.transactions)
  }
}
</script>