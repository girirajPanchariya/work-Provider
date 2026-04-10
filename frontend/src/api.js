import axios from "axios";

const LOCAL_URL = "http://localhost:4000";
const LIVE_URL = "https://work-provider-1.onrender.com";

const api = axios.create({
  baseURL: LOCAL_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// fallback logic
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.code === "ERR_NETWORK" || error.response?.status >= 500) {
      // switch to live server
      error.config.baseURL = LIVE_URL;
      return axios.request(error.config);
    }
    return Promise.reject(error);
  }
);

export default api;