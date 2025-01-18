import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

export const errorHandler: Middleware<{}, RootState> = (store) => (next) => (action) => {
  try {
    return next(action);
  } catch (error) {
    console.error('Error in action:', action, error);
    // Dispatch error action with type safety
    store.dispatch({
      type: 'error/set',
      payload: error instanceof Error ? error.message : 'An unknown error occurred'
    });
    return error;
  }
}; 