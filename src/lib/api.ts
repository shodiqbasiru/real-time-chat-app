import axios from "axios";
import { useAuthStore } from "./stores/auth.store";

const api = axios.create({
  baseURL: "http://localhost:7720/api/v1",
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
