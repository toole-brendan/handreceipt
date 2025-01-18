export interface User {
  id: string;
  name: string;
  rank: string;
  role: 'officer' | 'nco' | 'soldier';
  classification: string;
  permissions: string[];
}

interface AuthResponse {
  token: string;
  user: User;
}

export const authService = {
  async login(credentials: { username: string; password: string }): Promise<AuthResponse> {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      throw new Error('Authentication failed');
    }
    
    return response.json();
  },

  setAuthHeader(token: string) {
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }
}; 