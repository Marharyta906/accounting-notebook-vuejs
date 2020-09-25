<template>
  <div class="list row">

    <div class="col-md-6">
      <h4>Transactions List</h4>
      <ul class="list-group">
        <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(transaction, index) in transactions"
            :key="index"
            @click="setActiveTransaction(transaction, index)"
        >
          <a href="#">
            <p class="badge credit" v-if="transaction.type==='CREDIT'">{{ transaction.type }} {{ transaction.amount }}</p>
            <p v-else class="badge debit">{{ transaction.type }} {{ transaction.amount }}</p>
          </a>

        </li>
      </ul>

    </div>
    <div class="col-md-6">
      <div v-if="currentTransaction">
        <h3>Transaction</h3>
        <div>
          <label><strong>Type:</strong></label> {{ currentTransaction.type }}
        </div>
        <div>
          <label><strong>Amount:</strong></label> {{ currentTransaction.amount }}
        </div>
        <div>
          <label><strong>Data:</strong></label> {{currentTransaction.effectiveDate }}
        </div>

      </div>
      <p v-if="! transactions.length">
        <b>There are no transactions for now</b>
      </p>
    </div>
  </div>
</template>

<script>
  import TransactionsDataService from "../services/TransactionsDataService";

  export default {
    name: "transactions-list",
    data() {
      return {
        transactions: [],
        currentTransaction: null,
        currentIndex: -1
      };
    },
    methods: {
      retrieveTransactions() {
        TransactionsDataService.getAll()
        .then(response => {
          this.transactions = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
      },

      setActiveTransaction(transaction, index) {
        this.currentTransaction = transaction;
        this.currentIndex = index;
      }

    },
    mounted() {
      this.retrieveTransactions();
    }
  };
</script>

<style>
  .list {
    text-align: left;
    max-width: 750px;
    margin: auto;
  }

  .credit {
    color: #212529;
    background-color: #ffc107;
  }

  .debit {
    background-color: #228B22;
    color: #ffc107;
  }
</style>
