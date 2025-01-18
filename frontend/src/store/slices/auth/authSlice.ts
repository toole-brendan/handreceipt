import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authService, User } from '@/services/auth';
import { wsService } from '@/services/websocket';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  mfaVerified: boolean;
}

const isDevelopment = process.env.NODE_ENV === 'development';

// Clear persisted state in development mode
if (isDevelopment) {
  localStorage.removeItem('appState');
  localStorage.removeItem('token');
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  mfaVerified: false
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { username: string; password: string }) => {
    const response = await authService.login(credentials);
    localStorage.setItem('token', response.token);
    wsService.connect(); // Connect WebSocket after successful login
    return response;
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('appState');
    wsService.disconnect();
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setMfaVerified: (state, action: PayloadAction<boolean>) => {
      state.mfaVerified = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.mfaVerified = false; // Reset MFA status on new login
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.mfaVerified = false;
      });
  }
});

export const { clearError, updateUser, setMfaVerified } = authSlice.actions;
export default authSlice.reducer; 