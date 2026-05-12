import { api } from "../api/Api";

const ENDPOINTS = {
  BASE: "/api/attendance/",
  BY_ID: (id) => `/api/attendance/${id}/`,
  BULK: "/api/attendance/bulk/",
  STATS: "/api/attendance/stats/",
};

export const attendanceService = {

  getAll: async (params = {}) => {
    const { data } = await api.get(ENDPOINTS.BASE, { params });
    return data;
  },

  getById: async (id) => {
    const { data } = await api.get(ENDPOINTS.BY_ID(id));
    return data;
  },

  create: async (attendanceData) => {
    const { data } = await api.post(ENDPOINTS.BASE, attendanceData);
    return data;
  },

  update: async (id, attendanceData) => {
    const { data } = await api.put(ENDPOINTS.BY_ID(id), attendanceData);
    return data;
  },

  patch: async (id, partialData) => {
    const { data } = await api.patch(ENDPOINTS.BY_ID(id), partialData);
    return data;
  },

  delete: async (id) => {
    await api.delete(ENDPOINTS.BY_ID(id));
    return id;
  },

  bulkCreate: async (attendanceArray) => {
    const { data } = await api.post(ENDPOINTS.BULK, attendanceArray);
    return data;
  },

  getStats: async () => {
    const { data } = await api.get(ENDPOINTS.STATS);
    return data;
  },
};
