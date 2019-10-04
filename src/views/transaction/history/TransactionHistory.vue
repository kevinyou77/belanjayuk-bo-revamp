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

const getTransactionsQuery = () => {
  const { GET_TRANSACTIONS } = queryTypes
  const getTransactions = queries[GET_TRANSACTIONS]

  return getTransactions
}

export default {
  components: {
    List,
  },
  data () {
    return {
      transactions: [],
    }
  },
  apollo: {
    transactions: getTransactionsQuery()
  },
  mounted () {
    console.log('heheh')
  },
  updated () {
    console.log(this.transactions)
  }
}
</script>