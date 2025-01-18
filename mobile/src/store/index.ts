import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiErrorMiddleware } from './middleware/apiErrorMiddleware';
import { loggingMiddleware } from './middleware/loggingMiddleware';
import { offlineMiddleware } from './middleware/offlineMiddleware';
import rootReducer from './slices';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'offline', 'settings']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: true,
    }).concat([
      apiErrorMiddleware,
      loggingMiddleware,
      offlineMiddleware,
    ]),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 