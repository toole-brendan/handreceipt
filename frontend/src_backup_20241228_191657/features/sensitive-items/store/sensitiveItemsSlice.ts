import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SensitiveItem } from '../types/SensitiveItem';

interface SensitiveItemsState {
  items: SensitiveItem[];
  selectedItem: SensitiveItem | null;
  loading: boolean;
  error: string | null;
}

const isDevelopment = process.env.NODE_ENV === 'development';

// Mock data for development
const mockItems: SensitiveItem[] = isDevelopment ? [
  {
    id: '1',
    name: 'Night Vision Goggles',
    serialNumber: 'NVG-123456',
    category: 'Optics',
    lastVerification: '2024-01-27T10:00:00Z',
    nextVerification: '2024-01-28T19:00:00Z',
    location: 'Arms Room',
    status: 'needs_verification'
  },
  {
    id: '2',
    name: 'M4 Carbine',
    serialNumber: 'M4-789012',
    category: 'Weapons',
    lastVerification: '2024-01-27T10:00:00Z',
    nextVerification: '2024-01-28T19:00:00Z',
    location: 'Arms Room',
    status: 'verified'
  },
  {
    id: '3',
    name: 'Thermal Scope',
    serialNumber: 'TS-345678',
    category: 'Optics',
    lastVerification: '2024-01-26T10:00:00Z',
    nextVerification: '2024-01-28T19:00:00Z',
    location: 'Storage',
    status: 'overdue'
  }
] : [];

const initialState: SensitiveItemsState = {
  items: mockItems,
  selectedItem: null,
  loading: false,
  error: null
};

const sensitiveItemsSlice = createSlice({
  name: 'sensitiveItems',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<SensitiveItem[]>) => {
      state.items = action.payload;
    },
    setSelectedItem: (state, action: PayloadAction<SensitiveItem | null>) => {
      state.selectedItem = action.payload;
    },
    updateItemStatus: (state, action: PayloadAction<{ itemId: string; status: SensitiveItem['status'] }>) => {
      const item = state.items.find(item => item.id === action.payload.itemId);
      if (item) {
        item.status = action.payload.status;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const { 
  setItems, 
  setSelectedItem, 
  updateItemStatus,
  setLoading,
  setError
} = sensitiveItemsSlice.actions;

export default sensitiveItemsSlice.reducer; 