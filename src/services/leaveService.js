import { api } from "../api/Api";

const ENDPOINTS = {
  BASE: "/api/leave-requests/",
  BY_ID: (id) => `/api/leave-requests/${id}/`,
  APPROVE: (id) => `/api/leave-requests/${id}/approve/`,
  REJECT: (id) => `/api/leave-requests/${id}/reject/`,
};

export const leaveService = {
  getAll: async (params = {}) => {
    const { data } = await api.get(ENDPOINTS.BASE, { params });
    return data;
  },

  getById: async (id) => {
    const { data } = await api.get(ENDPOINTS.BY_ID(id));
    return data;
  },

  create: async (leaveData) => {
    const { data } = await api.post(ENDPOINTS.BASE, leaveData);
    return data;
  },

  approve: async (id) => {
    const { data } = await api.post(ENDPOINTS.APPROVE(id));
    return data;
  },

  reject: async (id) => {
    const { data } = await api.post(ENDPOINTS.REJECT(id));
    return data;
  },

  delete: async (id) => {
    await api.delete(ENDPOINTS.BY_ID(id));
    return id;
  },
};
