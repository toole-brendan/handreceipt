import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Define which parts of the state to persist
const PERSISTED_KEYS: (keyof RootState)[] = ['auth', 'property', 'personnel'];

// Load persisted state from localStorage
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('appState');
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading state:', err);
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state: RootState) => {
  try {
    // Only persist specific slices of state
    const persistedState = PERSISTED_KEYS.reduce((acc, key) => ({
      ...acc,
      [key]: state[key]
    }), {});

    localStorage.setItem('appState', JSON.stringify(persistedState));
  } catch (err) {
    console.error('Error saving state:', err);
  }
};

// Debounce save operation to prevent excessive writes
const debounce = <F extends (...args: any[]) => any>(
  func: F,
  wait: number
) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<F>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const debouncedSaveState = debounce(saveState, 1000);

export const persistenceMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
  const result = next(action);
  
  // Save state after it has been updated
  debouncedSaveState(store.getState());
  
  return result;
}; 