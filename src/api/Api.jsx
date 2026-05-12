import  axios  from "axios";

export const Base_URL = "http://127.0.0.1:8000";

export const api = new axios.create({
  baseURL: Base_URL,
  headers: {
    "Content-Type": "application/json",
  },
});