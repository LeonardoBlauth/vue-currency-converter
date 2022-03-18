<template>
  <div class="row d-flex justify-content-center">
    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="true"
    ></loading>

    <b-card class="col-10 col-lg-6 col-md-8 col-sm-10" :title="title">
      <b-card-text class="mt-5">
        <div class="row d-flex justify-content-around mb-4">
          <v-select
            class="col-6"
            :options="options"
            label="value"
            placeholder="From"
            v-model="currencyFrom"
          >
          </v-select>

          <v-select
            class="col-6"
            :options="options"
            label="value"
            placeholder="To"
            v-model="currencyTo"
          >
          </v-select>
        </div>

        <div class="d-flex justify-content-center align-items-center mb-4">
          <money
            id="amount"
            class="col-6 col-lg-3 col-md-4 col-sm-5"
            v-model="amount"
            :suffix="getSuffixFrom()"
          ></money>
        </div>

        <div class="row d-flex justify-content-center">
          <b-button
            :disabled="isNotConvertable()"
            class="col-10 btn"
            variant="primary"
            @click="getConvertedAmount()"
            >Convert</b-button
          >
        </div>

        <div class="mt-5">
          <p class="fw-bold">
            Converted Amount:
            <money
              id="amount"
              class="col-6 col-lg-3 col-md-4 col-sm-5"
              v-model="convertedAmount"
              :suffix="getSuffixTo()"
              disabled
            ></money>
          </p>
        </div>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  name: "CurrencyConverter",

  data() {
    return {
      isLoading: false,
      title: "Currency Converter",
      currencies: [],
      currencyFrom: null,
      currencyTo: null,
      convertedAmount: 0,
      options: [],
      amount: 0,
    };
  },

  components: {
    Loading,
  },

  methods: {
    getCurrencies() {
      this.isLoading = true;

      this.$api
        .get("symbols")
        .then((res) => {
          this.currencies = res.data.symbols;
        })
        .then(() => {
          Object.entries(this.currencies).forEach((currency) => {
            this.options.push({
              value: currency[1].code,
            });
          });
        })
        .then(() => {
          this.isLoading = false;
        });
    },

    getConvertedAmount() {
      this.isLoading = true;

      this.$api
        .get("convert", {
          params: {
            from: this.currencyFrom.value,
            to: this.currencyTo.value,
            amount: this.amount,
            places: 2,
          },
        })
        .then((res) => {
          this.convertedAmount = res.data.result || 0;
        })
        .then(() => {
          this.isLoading = false;
        });
    },

    getSuffixTo() {
      return this.currencyTo !== null ? ` ${this.currencyTo.value}` : "";
    },

    getSuffixFrom() {
      return this.currencyFrom !== null ? ` ${this.currencyFrom.value}` : "";
    },

    isNotConvertable() {
      return this.currencyFrom === null || this.currencyTo === null;
    },
  },

  mounted() {
    this.getCurrencies();
  },
};
</script>

<style scoped></style>
