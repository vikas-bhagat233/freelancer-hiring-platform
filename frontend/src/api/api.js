import axios from "axios";

/**
 * Axios instance for backend communication
 * Render backend URL will go here
 */
const rawBaseUrl = import.meta.env.VITE_API_URL;
const normalizedBaseUrl = rawBaseUrl ? rawBaseUrl.replace(/\/+$/, "") : "";
const apiBaseUrl = normalizedBaseUrl
  ? normalizedBaseUrl.endsWith("/api")
    ? normalizedBaseUrl
    : `${normalizedBaseUrl}/api`
  : "/api";

const api = axios.create({
  baseURL: apiBaseUrl,
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
