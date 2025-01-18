import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Personnel, Unit, HandReceipt, PropertyTransfer } from '@/features/personnel/types';
import { RootState } from '@/store/store';

interface PersonnelState {
  personnel: Personnel[];
  units: Unit[];
  handReceipts: HandReceipt[];
  transfers: PropertyTransfer[];
  selectedPerson: Personnel | null;
  selectedUnit: Unit | null;
  filters: {
    unit: string | null;
    status: string | null;
    searchQuery: string;
  };
  loading: boolean;
  error: string | null;
}

const initialState: PersonnelState = {
  personnel: [],
  units: [],
  handReceipts: [],
  transfers: [],
  selectedPerson: null,
  selectedUnit: null,
  filters: {
    unit: null,
    status: null,
    searchQuery: '',
  },
  loading: false,
  error: null,
};

// Async thunks
export const fetchPersonnel = createAsyncThunk(
  'personnel/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/personnel');
      if (!response.ok) throw new Error('Failed to fetch personnel');
      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const fetchUnits = createAsyncThunk(
  'personnel/fetchUnits',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/units');
      if (!response.ok) throw new Error('Failed to fetch units');
      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const updatePersonnel = createAsyncThunk(
  'personnel/update',
  async ({ id, data }: { id: string; data: Partial<Personnel> }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/personnel/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update personnel');
      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

const personnelSlice = createSlice({
  name: 'personnel',
  initialState,
  reducers: {
    setSelectedPerson: (state, action: PayloadAction<Personnel | null>) => {
      state.selectedPerson = action.payload;
    },
    setSelectedUnit: (state, action: PayloadAction<Unit | null>) => {
      state.selectedUnit = action.payload;
    },
    updateFilters: (state, action: PayloadAction<Partial<PersonnelState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch personnel
      .addCase(fetchPersonnel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPersonnel.fulfilled, (state, action) => {
        state.loading = false;
        state.personnel = action.payload;
      })
      .addCase(fetchPersonnel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch units
      .addCase(fetchUnits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUnits.fulfilled, (state, action) => {
        state.loading = false;
        state.units = action.payload;
      })
      .addCase(fetchUnits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update personnel
      .addCase(updatePersonnel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePersonnel.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.personnel.findIndex((p: Personnel) => p.id === action.payload.id);
        if (index !== -1) {
          state.personnel[index] = action.payload;
        }
      })
      .addCase(updatePersonnel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Selectors
export const selectAllPersonnel = (state: RootState) => state.personnel.personnel;
export const selectAllUnits = (state: RootState) => state.personnel.units;
export const selectPersonnelById = (state: RootState, id: string) =>
  state.personnel.personnel.find((p: Personnel) => p.id === id);
export const selectUnitById = (state: RootState, id: string) =>
  state.personnel.units.find((u: Unit) => u.id === id);
export const selectPersonnelLoading = (state: RootState) => state.personnel.loading;
export const selectPersonnelError = (state: RootState) => state.personnel.error;
export const selectPersonnelFilters = (state: RootState) => state.personnel.filters;

// Memoized selectors for filtered data
export const selectFilteredPersonnel = (state: RootState) => {
  const { unit, status, searchQuery } = state.personnel.filters;
  return state.personnel.personnel.filter((person: Personnel) => {
    const matchesUnit = !unit || person.unitId === unit;
    const matchesStatus = !status || person.status === status;
    const matchesSearch = !searchQuery || 
      `${person.firstName} ${person.lastName} ${person.rank}`.toLowerCase()
        .includes(searchQuery.toLowerCase());
    return matchesUnit && matchesStatus && matchesSearch;
  });
};

export const { setSelectedPerson, setSelectedUnit, updateFilters, clearError } = personnelSlice.actions;
export default personnelSlice.reducer; 