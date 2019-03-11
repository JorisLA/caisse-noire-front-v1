import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API,
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
  getPlayers(path) {
    return apiClient.get(path);
  },
  getHistory(playerId) {
    return apiClient.get(`/bills/${playerId}`);
  },
  signinPlayer(payload) {
    return apiClient.post("/signin", payload);
  },
  signupPlayer(payload) {
    return apiClient.post("/signup", payload);
  },
  getTeams() {
    return apiClient.get("/teams");
  }
};
