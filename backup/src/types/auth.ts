export enum UserRole {
  OFFICER = 'OFFICER',
  NCO = 'NCO',
  SOLDIER = 'SOLDIER',
}

export interface User {
  id: string;
  name: string;
  rank: string;
  unit: string;
  role: UserRole;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
} 