import  axios  from "axios";
import { getAccessToken } from "@/auth/rbac";

export const Base_URL = "http://127.0.0.1:8000";

export const api = new axios.create({
  baseURL: Base_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
