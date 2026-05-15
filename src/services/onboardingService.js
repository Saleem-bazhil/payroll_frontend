import { api } from "../api/Api";

const ENDPOINTS = {
    BASE: "/api/onboarding/",
    BY_ID: (id) => `/api/onboarding/${id}/`,
};

export const onboardingService = {
    getAll: async (params = {}) => {
        const { data } = await api.get(ENDPOINTS.BASE, { params });
        return data;
    },

    getById: async (id) => {
        const { data } = await api.get(ENDPOINTS.BY_ID(id));
        return data;
    },

    create: async (formData) => {
        const { data } = await api.post(ENDPOINTS.BASE, formData);
        return data;
    },

    update: async (id, formData) => {
        const { data } = await api.put(ENDPOINTS.BY_ID(id), formData);
        return data;
    },

    delete: async (id) => {
        await api.delete(ENDPOINTS.BY_ID(id));
        return id;
    },
};
