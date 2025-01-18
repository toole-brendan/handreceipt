import { configureStore, Middleware, ThunkAction, Action, ThunkMiddleware, combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth';
import { propertyReducer } from './slices/property';
import { personnelReducer } from './slices/personnel';
import { systemReducer } from './slices/system';
import { 
  loggingMiddleware, 
  persistenceMiddleware, 
  apiErrorMiddleware,
  loadState 
} from './middleware';
import sensitiveItemsReducer from '@/features/sensitive-items/store/sensitiveItemsSlice';

// Create the root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  property: propertyReducer,
  personnel: personnelReducer,
  system: systemReducer,
  sensitiveItems: sensitiveItemsReducer,
});

// Define root state interface
export type RootState = ReturnType<typeof rootReducer>;

// Load persisted state
const preloadedState = loadState();

// Configure middleware
const customMiddleware: Middleware[] = [
  loggingMiddleware,
  persistenceMiddleware,
  apiErrorMiddleware,
];

// Configure store
export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) => {
    const defaultMiddleware = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/login'],
        ignoredActionPaths: ['payload.user'],
        ignoredPaths: ['auth.user'],
      },
    });
    return defaultMiddleware.concat(customMiddleware);
  },
  devTools: process.env.NODE_ENV !== 'production',
});

// Infer types from store
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;