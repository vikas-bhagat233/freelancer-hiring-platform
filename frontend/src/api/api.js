import axios from "axios";

/**
 * Axios instance for backend communication
 * Render backend URL will go here
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

/**
 * Attach token automatically
 */
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default api;
