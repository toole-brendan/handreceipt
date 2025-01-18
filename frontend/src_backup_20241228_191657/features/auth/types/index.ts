/**
 * Role represents the user's role in the system
 */
export type Role = 'officer' | 'nco' | 'soldier';

/**
 * User represents a user in the system
 */
export interface User {
  id: string;
  name: string;
  rank: string;
  unit: string;
  role: Role;
}

/**
 * AuthState represents the authentication state in the Redux store
 */
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

/**
 * RootState type for auth slice
 */
export interface RootState {
  auth: AuthState;
} 