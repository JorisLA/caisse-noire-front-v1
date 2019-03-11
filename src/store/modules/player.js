import axios from "axios";
import EventService from "@/services/EventService";

export const namespaced = true;

export const state = {
  players: [],
  player: {},
  token: "",
  banker: false,
  totalRows: 0,
  playerFines: [],
  lastUuid: ""
};

export const mutations = {
  ADD_PLAYER(state, player) {
    state.players.push(player);
  },
  SET_PLAYERS(state, players) {
    state.players = players;
  },
  SET_PLAYER(state, player) {
    state.player = player;
  },
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_BANKER(state, banker) {
    state.banker = banker;
  },
  REMOVE_TOKEN(state) {
    state.token = "";
  },
  SET_TOTAL_ROWS(state, totalRows) {
    state.totalRows = totalRows;
  },
  SET_PLAYER_FINES(state, playerFines) {
    state.playerFines = playerFines;
  },
  SET_LAST_UUID(state, lastUuid) {
    state.lastUuid = lastUuid;
  }
};

export const actions = {
  setTotalRows({ commit }, totalRows) {
    commit("SET_TOTAL_ROWS", totalRows);
  },
  fetchPlayers({ commit, dispatch }, path) {
    return EventService.getPlayers(path)
      .then(response => {
        const items = response.data.players;
        commit("SET_PLAYERS", items);
        commit("SET_TOTAL_ROWS", response.data.full_count);
        commit("SET_PLAYER_FINES", response.data.fines);
        commit("SET_LAST_UUID", items[items.length - 1].uuid);
        return response.data.players;
      })
      .catch(error => {
        const notification = {
          type: "danger",
          message: "There was a credential problem"
        };
        dispatch("notification/add", notification, { root: true });
        throw error;
      });
  },
  signupPlayer({ commit, dispatch }, player) {
    EventService.signupPlayer(player)
      .then(() => {
        commit("ADD_PLAYER", player);
        const notification = {
          type: "success",
          message: "Your account has been created"
        };
        dispatch("notification/add", notification, { root: true });
      })
      .catch(error => {
        const notification = {
          type: "danger",
          message: "There was a credential problem"
        };
        dispatch("notification/add", notification, { root: true });
        throw error;
      });
  },
  signinPlayer({ commit, dispatch }, player) {
    return EventService.signinPlayer(player)
      .then(response => {
        axios.defaults.headers.common["x-access-token"] = response.data.token;
        // commit("SET_PLAYER", player);
        commit("SET_TOKEN", response.data.token);
        commit("SET_BANKER", response.data.banker);
      })
      .catch(error => {
        const notification = {
          type: "danger",
          message: "There was a credential problem"
        };
        dispatch("notification/add", notification, { root: true });
        throw error;
      });
  },
  signoutPlayer({ commit }) {
    commit("REMOVE_TOKEN");
  }
};

export const getters = {
  isConnected: state => {
    return state.token ? true : false;
  },
  isBanker: state => {
    return state.banker;
  }
};
