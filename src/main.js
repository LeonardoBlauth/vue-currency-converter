import Vue from "vue";
import App from "./App.vue";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import money from "v-money";

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import axios from "axios";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(money, { decimal: ".", precision: 2 });
Vue.component("v-select", vSelect);

Vue.config.productionTip = false;

const $api = axios.create({
  baseURL: "https://api.exchangerate.host/",
  headers: {
    common: {
      "X-Requested-With": "XMLHttpResquest",
    },
  },
});

Vue.prototype.$api = $api;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
