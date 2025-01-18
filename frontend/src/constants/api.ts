export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh'
  },
  PROPERTY: {
    GET_ALL: '/api/property',
    TRANSFER: '/api/property/transfer',
    MAINTENANCE: '/api/property/maintenance'
  },
  PERSONNEL: '/api/personnel',
  REPORTS: '/api/reports'
} as const;
