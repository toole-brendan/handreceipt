import { Middleware, isRejectedWithValue } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}

export const apiErrorMiddleware: Middleware<{}, RootState> = () => (next) => (action) => {
  // Check if this action is a rejected API call
  if (isRejectedWithValue(action)) {
    const error = action.payload as ApiError;
    
    // Log the error
    console.error('API Error:', {
      type: action.type,
      error: error.message,
      code: error.code,
      details: error.details,
      meta: action.meta
    });

    // You could dispatch additional actions here, like showing a toast notification
    // store.dispatch(showErrorNotification(error.message));

    // You could also report to an error tracking service like Sentry
    // Sentry.captureException(new Error(error.message), {
    //   extra: {
    //     type: action.type,
    //     code: error.code,
    //     details: error.details
    //   }
    // });
  }

  return next(action);
}; 