import EventService from "@/services/EventService";

export const namespaced = true;

export const state = {
  teams: []
};

export const mutations = {
  ADD_TEAMS(state, teams) {
    state.teams = teams;
  }
};

export const actions = {
  fetchTeams({ commit, dispatch }) {
    return EventService.getTeams()
      .then(response => {
        commit("ADD_TEAMS", response.data.teams);
      })
      .catch(error => {
        const notification = {
          type: "danger",
          message: "There was a credential problem"
        };
        dispatch("notification/add", notification, { root: true });
        throw error;
      });
  }
};

export const getters = {};
