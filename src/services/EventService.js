import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API,
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: process.env.TOKEN
  }
});

export default {
  addAccount(payload) {
    return apiClient.post("/accounts", payload);
  }
};
