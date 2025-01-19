export enum UserRole {
  OFFICER = 'OFFICER',
  NCO = 'NCO',
  SOLDIER = 'SOLDIER',
}

export type ClearanceLevel = 'UNCLASSIFIED' | 'CONFIDENTIAL' | 'SECRET' | 'TOP_SECRET';

export interface User {
  id: string;
  name: string;
  rank: string;
  unit: string;
  role: UserRole;
  clearanceLevel: ClearanceLevel;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
    username?: string;
    password?: string;
    cacId?: string;
    certificate?: string;
}

export interface LoginResult {
    success: boolean;
    error?: string;
} 