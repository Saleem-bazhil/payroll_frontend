import { api } from "../api/Api";

const ENDPOINTS = {
  BASE: "/api/auth/users/",
  BY_ID: (id) => `/api/auth/users/${id}/`,
};

export const userService = {
  getAll: async (params = {}) => {
    const { data } = await api.get(ENDPOINTS.BASE, { params });
    return data;
  },
  create: async (payload) => {
    const { data } = await api.post(ENDPOINTS.BASE, payload);
    return data;
  },
  update: async (id, payload) => {
    const { data } = await api.put(ENDPOINTS.BY_ID(id), payload);
    return data;
  },
  patch: async (id, payload) => {
    const { data } = await api.patch(ENDPOINTS.BY_ID(id), payload);
    return data;
  },
  delete: async (id) => {
    await api.delete(ENDPOINTS.BY_ID(id));
  },
};
