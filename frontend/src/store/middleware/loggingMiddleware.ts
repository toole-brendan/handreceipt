import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const loggingMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
  if (process.env.NODE_ENV === 'development') {
    console.group(`Action: ${action.type}`);
    console.log('Previous State:', store.getState());
    console.log('Action:', action);
    const result = next(action);
    console.log('Next State:', store.getState());
    console.groupEnd();
    return result;
  }
  return next(action);
}; 