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
  updatePlayer(payload) {
    return apiClient.put(`/players/${payload["uuid"]}`, payload);
  },
  signinPlayer(payload) {
    return apiClient.post("/players/signin", payload);
  },
  signupPlayer(payload) {
    return apiClient.post("/players/signup", payload);
  },
  sendFines() {
    return apiClient.post(`/players/fines`);
  },
  paidFines(playerId) {
    return apiClient.delete(`/players/${playerId}/fine`);
  },
  getHistory(playerId) {
    return apiClient.get(`/players/${playerId}/fine`);
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
  getStatistics() {
    return apiClient.get(`/statistics`);
  }
};
