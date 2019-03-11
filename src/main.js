import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import "bootstrap/dist/css/bootstrap.css";
import BootstrapVue from "bootstrap-vue";
import VueI18n from "vue-i18n";
import messages from "./lang/i18n";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCog,
  faGlobeEurope,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faCog);
library.add(faGlobeEurope);
library.add(faPlusCircle);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueI18n);

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: "fr", // set locale
  messages // set locale messages
});

new Vue({
  router,
  store,
  i18n,
  data: {
    teams: ""
  },
  render: function(h) {
    return h(App);
  }
}).$mount("#app");
