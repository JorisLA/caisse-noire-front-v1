import EventService from "@/services/EventService";

export const namespaced = true;

export const state = {
  accounts: [],
  account: {}
};

export const mutations = {
  ADD_ACCOUNT(state, account) {
    state.accounts.push(account);
  }
};

export const actions = {
  addAccount({ commit, dispatch }, payload) {
    EventService.addAccount(payload)
      .then(() => {
        commit("ADD_ACCOUNT", payload);

        const notification = {
          type: "success",
          message: "The account has been created"
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
  getAccountByUUID: state => uuid => {
    return state.accounts.find(account => account.account_id === uuid);
  },
  getAccounts: state => {
    return state.accounts;
  }
};
