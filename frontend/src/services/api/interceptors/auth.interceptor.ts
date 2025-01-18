import { ApiError } from '../types';

export interface RequestInterceptor {
  onRequest?: (config: RequestInit) => RequestInit;
  onResponse?: (response: Response) => Response | Promise<Response>;
  onError?: (error: ApiError) => void;
}

export const authInterceptor: RequestInterceptor = {
  onRequest: (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  
  onResponse: async (response) => {
    if (response.status === 401) {
      // Handle token expiration
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return response;
  },
  
  onError: (error) => {
    if (error.code === 'AUTH_ERROR') {
      // Handle authentication errors
      console.error('Authentication error:', error.message);
    }
  },
}; 