export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me'
  },
  RESCUE_REQUESTS: {
    LIST: '/rescue-requests',
    CREATE: '/rescue-requests',
    DETAIL: (id) => `/rescue-requests/${id}`,
    UPDATE_STATUS: (id) => `/rescue-requests/${id}/status`,
    ASSIGN: (id) => `/rescue-requests/${id}/assign`
  },
  TEAMS: {
    LIST: '/teams',
    DETAIL: (id) => `/teams/${id}`,
    MISSIONS: (id) => `/teams/${id}/missions`
  },
  VEHICLES: {
    LIST: '/vehicles',
    CREATE: '/vehicles',
    UPDATE: (id) => `/vehicles/${id}`
  },
  SUPPLIES: {
    LIST: '/supplies',
    CREATE: '/supplies',
    UPDATE: (id) => `/supplies/${id}`,
    DISTRIBUTE: '/supplies/distribute'
  },
  USERS: {
    LIST: '/users',
    CREATE: '/users',
    UPDATE: (id) => `/users/${id}`,
    DELETE: (id) => `/users/${id}`
  },
  STATISTICS: {
    DASHBOARD: '/statistics/dashboard',
    RESOURCES: '/statistics/resources'
  }
};
