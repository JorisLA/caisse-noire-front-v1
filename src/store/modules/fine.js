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
  },
  SET_FINES(state, fines) {
    state.fines = fines;
  },
  SET_TOTAL_ROWS(state, totalRows) {
    state.totalRows = totalRows;
  },
  SET_LAST_UUID(state, lastUuid) {
    state.lastUuid = lastUuid;
  },
  UPDATE_FINE(state, payload) {
    var foundFine = state.fines.findIndex(
      fine => fine.uuid === payload["fineUuid"]
    );
    state.fines[foundFine]["label"] = payload["label"];
    state.fines[foundFine]["cost"] = payload["cost"];
  },
  DELETE_FINE(state, fineToRemove) {
    state.fines = state.fines.filter(fine => fine.id !== fineToRemove.id);
  }
};

export const actions = {
  setTotalRows({ commit }, totalRows) {
    commit("SET_TOTAL_ROWS", totalRows);
  },
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
  },
  updateFine({ commit, dispatch }, payload) {
    EventService.updateFine(payload)
      .then(response => {
        var fine = getters.getFineByUUID(payload["uuid"]);
        if (fine) {
          var tmp = {
            fineUuid: payload["uuid"],
            label: response.data.label,
            cost: response.data.cost
          };
          commit("UPDATE_FINE", tmp);

          const notification = {
            type: "success",
            message: "The fine has been updated"
          };
          dispatch("notification/add", notification, { root: true });
        }
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
  deleteFine({ commit, dispatch }, payload) {
    EventService.deleteFine(payload)
      .then(() => {
        var fine = getters.getFineByUUID(payload["uuid"]);
        if (fine) {
          commit("DELETE_FINE", fine);

          const notification = {
            type: "success",
            message: "The fine has been deleted"
          };
          dispatch("notification/add", notification, { root: true });
        }
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
  fetchFines({ commit, dispatch }, path) {
    return EventService.getFines(path)
      .then(response => {
        const items = response.data.fines;
        commit("SET_FINES", items);
        commit("SET_TOTAL_ROWS", response.data.full_count);
        if (items.length > 0) {
          commit("SET_LAST_UUID", items[items.length - 1].uuid);
        }
        return items;
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
  sendFines({ dispatch }) {
    return EventService.sendFines()
      .then(() => {
        const notification = {
          type: "success",
          message: "Fines has been sent"
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
  paidFines({ dispatch }, playerUuid) {
    return EventService.paidFines(playerUuid)
      .then(() => {
        const notification = {
          type: "success",
          message: "Fines has been paid"
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

export const getters = {
  getFineByUUID: state => uuid => {
    return state.fines.find(fine => fine.uuid === uuid);
  }
};
