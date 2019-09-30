<template>
  <div class="transaction">
    <TransactionProductList />
    <TransactionSelectedProduct />
  </div>
</template>

<script>
import TransactionProductList from "./TransactionProductList"
import TransactionSelectedProduct from './TransactionSelectedProduct'

export default {
  components: {
    TransactionProductList,
    TransactionSelectedProduct,
  },
}
</script>