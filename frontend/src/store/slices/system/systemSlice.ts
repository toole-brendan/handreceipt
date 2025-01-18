import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { SystemConfig, SystemHealth, SystemMetrics, Alert } from '@/features/system/types';
import { RootState } from '@/store/store';

interface SystemState {
  config: SystemConfig | null;
  health: SystemHealth | null;
  metrics: SystemMetrics | null;
  alerts: Alert[];
  loading: boolean;
  error: string | null;
}

const initialState: SystemState = {
  config: null,
  health: null,
  metrics: null,
  alerts: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchSystemHealth = createAsyncThunk(
  'system/fetchHealth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/system/health');
      if (!response.ok) throw new Error('Failed to fetch system health');
      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const fetchSystemMetrics = createAsyncThunk(
  'system/fetchMetrics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/system/metrics');
      if (!response.ok) throw new Error('Failed to fetch system metrics');
      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const fetchSystemConfig = createAsyncThunk(
  'system/fetchConfig',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/system/config');
      if (!response.ok) throw new Error('Failed to fetch system config');
      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<Alert>) => {
      state.alerts.push(action.payload);
    },
    removeAlert: (state, action: PayloadAction<string>) => {
      state.alerts = state.alerts.filter(alert => alert.id !== action.payload);
    },
    clearAlerts: (state) => {
      state.alerts = [];
    },
    updateConfig: (state, action: PayloadAction<Partial<SystemConfig>>) => {
      if (state.config) {
        state.config = { ...state.config, ...action.payload };
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch health
      .addCase(fetchSystemHealth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSystemHealth.fulfilled, (state, action) => {
        state.loading = false;
        state.health = action.payload;
      })
      .addCase(fetchSystemHealth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch metrics
      .addCase(fetchSystemMetrics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSystemMetrics.fulfilled, (state, action) => {
        state.loading = false;
        state.metrics = action.payload;
      })
      .addCase(fetchSystemMetrics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch config
      .addCase(fetchSystemConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSystemConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.config = action.payload;
      })
      .addCase(fetchSystemConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Selectors
export const selectSystemHealth = (state: RootState) => state.system.health;
export const selectSystemMetrics = (state: RootState) => state.system.metrics;
export const selectSystemConfig = (state: RootState) => state.system.config;
export const selectAllAlerts = (state: RootState) => state.system.alerts;
export const selectSystemLoading = (state: RootState) => state.system.loading;
export const selectSystemError = (state: RootState) => state.system.error;

// Memoized selectors
export const selectCriticalAlerts = (state: RootState) =>
  state.system.alerts.filter((alert: Alert) => alert.severity === 'critical');

export const selectServiceStatus = (state: RootState, serviceName: string) =>
  state.system.health?.services[serviceName]?.status || 'down';

export const { addAlert, removeAlert, clearAlerts, updateConfig, clearError } = systemSlice.actions;
export default systemSlice.reducer; 