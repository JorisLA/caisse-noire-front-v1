import Vue from "vue";
import Vuex from "vuex";
import * as player from "@/store/modules/player";
import * as notification from "@/store/modules/notification.js";
import * as team from "@/store/modules/team.js";
import * as fine from "@/store/modules/fine.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    player,
    notification,
    team,
    fine
  },
  state: {
    langs: ["fr", "en"]
  }
});
