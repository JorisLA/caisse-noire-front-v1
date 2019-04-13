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
  updatePlayer(payload) {
    return apiClient.put(`/players/${payload["uuid"]}`, payload);
  },
  signinPlayer(payload) {
    return apiClient.post("/signin", payload);
  },
  signupPlayer(payload) {
    return apiClient.post("/signup", payload);
  },
  getTeams() {
    return apiClient.get("/teams");
  },
  addFine(payload) {
    return apiClient.post("/fines", payload);
  },
  getFines(path) {
    return apiClient.get(path);
  },
  updateFine(payload) {
    return apiClient.put(`/fines/${payload["uuid"]}`, payload);
  },
  deleteFine(payload) {
    return apiClient.delete(`/fines/${payload["uuid"]}`, payload);
  },
  sendFines() {
    return apiClient.post(`/bills`);
  },
  paidFines(playerId) {
    return apiClient.delete(`/bills/${playerId}`);
  },
  getStatistics() {
    return apiClient.get(`/statistic`);
  }
};
