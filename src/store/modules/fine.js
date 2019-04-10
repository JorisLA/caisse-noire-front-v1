import EventService from "@/services/EventService";

export const namespaced = true;

export const state = {
  fines: [],
  fine: {},
  totalRows: 0,
  lastUuid: ""
};

export const mutations = {
  ADD_FINE(state, fine) {
    state.fines.push(fine);
  }
};

export const actions = {
  addFine({ commit, dispatch }, payload) {
    EventService.addFine(payload)
      .then(() => {
        commit("ADD_FINE", payload);

        const notification = {
          type: "success",
          message: "The fine has been updated"
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
  }
};

export const getters = {};
