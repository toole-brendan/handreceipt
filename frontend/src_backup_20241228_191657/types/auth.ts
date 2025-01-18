import { BaseEntity } from './shared';

export interface User extends BaseEntity {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  rank?: string;
  role: UserRole;
  unit?: string;
  permissions: string[];
  classification: string;
  isActive: boolean;
  lastLogin?: string;
}

export type UserRole = 'ADMIN' | 'COMMANDER' | 'OFFICER' | 'NCO' | 'SOLDIER';

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface MFAConfig {
  enabled: boolean;
  method: 'app' | 'sms' | 'email';
  verified: boolean;
}

export interface SecuritySettings {
  mfa: MFAConfig;
  lastPasswordChange: string;
  passwordExpiresIn: number;
  sessionTimeout: number;
} 