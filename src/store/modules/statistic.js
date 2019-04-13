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
  fetchStatistics({ dispatch }) {
    return EventService.getStatistics()
      .then(response => {
        return response.data;
        // commit("ADD_STATISTICS", response.data.teams);
      })
      .catch(error => {
        console.log(error.response.status);
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
