import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './user/userSlice';
import staffReducer from './staff/staffSlice';
import accessReducer from './access/accessSlice'; // Import the accessSlice reducer

// Combine existing reducers with accessReducer
const rootReducer = combineReducers({
  user: userReducer,
  staff: staffReducer,
  access: accessReducer, // Add accessReducer to rootReducer
});

// Configure Redux Persist
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  whitelist: ['user', 'staff'], // Whitelist user and staff slices for persistence
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Configure Redux Persist store
export const persistor = persistStore(store);

export default { store, persistor };
