import { api } from '@/services/api';
import { ApiResponse } from '@/services/api/types';
import { SecurityClassification } from '@/types/shared';

export interface AuthCredentials {
  username: string;
  password: string;
}

export interface AuthUser {
  id: string;
  classification: SecurityClassification;
  permissions: string[];
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export class AuthError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export const authService = {
  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new AuthError(error.message, 'AUTH_LOGIN_FAILED');
      }
      throw new AuthError('Authentication failed', 'AUTH_LOGIN_FAILED');
    }
  },

  async logout(): Promise<void> {
    try {
      await api.post<void>('/auth/logout', {});
      localStorage.removeItem('token');
    } catch (error) {
      console.warn('Logout failed:', error);
      // Still remove token even if API call fails
      localStorage.removeItem('token');
    }
  },

  async refreshToken(): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/refresh', {});
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new AuthError(error.message, 'AUTH_REFRESH_FAILED');
      }
      throw new AuthError('Token refresh failed', 'AUTH_REFRESH_FAILED');
    }
  },

  getAuthHeader(token: string = localStorage.getItem('token') || '') {
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }
}; 