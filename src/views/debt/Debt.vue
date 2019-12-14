<template>
  <div class="debt">
    <div class="debt-content">
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
        :actions="transactionHistoryActions()" />

      <p
        v-if="!hasNextData">Semua data telah ditampilkan</p>
    </div>

    <b-modal
      id="debt-modal"
      hide-footer>
      <div class="debt-modal-wrapper">
        <span class="heading heading-default">Informasi</span>
        
        <div class="debt-modal-wrapper-info">
          <span class="">Nama lengkap: {{ selectedDebt.fullName }}</span>
          <span class="">Nomor telepon: {{ selectedDebt.phoneNumber }}</span>
          <span class="">Alamat: {{ selectedDebt.address }}</span>

          <span class="">Hutang: {{ selectedDebt.debt }}</span>
          <!-- <span class="">{{ selectedDebt.amountOfPayment }}</span> -->

          <br>
          <br>

          <b-form-group
            id="input-group-1"
            label="Jumlah pembayaran"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="amountOfPayment"
              type="text"
              required
            ></b-form-input>

            <b-form-invalid-feedback :state="isAmountOfPaymentValid">
              Input harus sama dengan hutang
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="isAmountOfPaymentValid">
              Input valid
            </b-form-valid-feedback>
          </b-form-group>

          <b-button
            variant="primary"
            @click="handlePayOffDebt(selectedDebt.id)">
              Bayar hutang
          </b-button>
        </div>
      </div>
    </b-modal>

    <b-modal
      id="error-modal"
      hide-footer>
        <p>{{ error }}</p>
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
  computed: {
    isAmountOfPaymentValid () {
      return this.amountOfPayment == (this.selectedDebt.debt)
    }
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
      error: '',
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
      console.log(id, 'id')
      this.$apollo.mutate({
        mutation: payOffDebtMutation(),
        variables: {
          transactionId: id,
          amountPaid: parseInt(this.amountOfPayment)
        }
      })
      .then (res => {
        this.showModal('Data berhasil di ubah!')
      })
      .catch (err => {
        this.showModal(err)
      })
    },
    handlePayOffDebtButton (item) {
      const selectedDebt = {
        phoneNumber: item.customer.user.userProfile.phoneNumber,
        address: item.customer.user.userProfile.address,
        fullName: item.customer.user.userProfile.fullName,
        debt: item.payment.debt,
        amountOfPayment: item.payment.amountOfPayment,
        id: item.id
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
    },
    showModal (msg) {
      this.error = msg
      this.$bvModal.show('error-modal')
    },
  },
}
</script>