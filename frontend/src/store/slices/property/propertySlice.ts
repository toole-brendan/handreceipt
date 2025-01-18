import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Property, PropertyTransfer, SensitiveItem, Verification } from '@/features/property/types';
import { RootState } from '@/store/store';

interface PropertyState {
  items: Property[];
  transfers: PropertyTransfer[];
  sensitiveItems: SensitiveItem[];
  verifications: Verification[];
  selectedItem: Property | null;
  loading: boolean;
  error: string | null;
}

const initialState: PropertyState = {
  items: [],
  transfers: [],
  sensitiveItems: [],
  verifications: [],
  selectedItem: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchProperties = createAsyncThunk(
  'property/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/properties');
      if (!response.ok) throw new Error('Failed to fetch properties');
      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const transferProperty = createAsyncThunk(
  'property/transfer',
  async ({ propertyId, toPersonId }: { propertyId: string; toPersonId: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/properties/${propertyId}/transfer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toPersonId }),
      });
      if (!response.ok) throw new Error('Failed to transfer property');
      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    setSelectedItem: (state, action: PayloadAction<Property | null>) => {
      state.selectedItem = action.payload;
    },
    updatePropertyStatus: (state, action: PayloadAction<{ id: string; status: Property['status'] }>) => {
      const property = state.items.find(item => item.id === action.payload.id);
      if (property) {
        property.status = action.payload.status;
      }
    },
    addVerification: (state, action: PayloadAction<Verification>) => {
      state.verifications.push(action.payload);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch properties
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Transfer property
      .addCase(transferProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(transferProperty.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProperty = action.payload;
        const index = state.items.findIndex((item: Property) => item.id === updatedProperty.id);
        if (index !== -1) {
          state.items[index] = updatedProperty;
        }
      })
      .addCase(transferProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Selectors
export const selectAllProperties = (state: RootState) => state.property.items;
export const selectPropertyById = (state: RootState, id: string) => 
  state.property.items.find((item: Property) => item.id === id);
export const selectSensitiveItems = (state: RootState) => state.property.sensitiveItems;
export const selectPropertyLoading = (state: RootState) => state.property.loading;
export const selectPropertyError = (state: RootState) => state.property.error;

export const { setSelectedItem, updatePropertyStatus, addVerification, clearError } = propertySlice.actions;
export default propertySlice.reducer; 