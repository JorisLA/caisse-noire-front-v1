import Vue from "vue";
import Vuex from "vuex";
import * as notification from "@/store/modules/notification.js";
import * as account from "@/store/modules/account.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    notification,
    account
  },
  state: {
    langs: ["fr", "en"]
  }
});
