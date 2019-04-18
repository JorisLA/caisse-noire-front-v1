import EventService from "@/services/EventService";

export const namespaced = true;

export const state = {
  statistics: []
};

export const mutations = {
  ADD_STATISTICS(state, statistics) {
    state.statistics = statistics;
  }
};

export const actions = {
  fetchStatistics({ commit, dispatch }) {
    return EventService.getStatistics()
      .then(response => {
        commit("ADD_STATISTICS", response.data.teams);
        return response.data;
      })
      .catch(error => {
        if (error.response.status == 404) {
          return error.response.data;
        }
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
