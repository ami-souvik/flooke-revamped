/**
 * Company              : Cloudkaptan Consultancy Services Pvt. Ltd.
 * File Name            : index.js
 * Created Date         : 02/01/2023
 * Developed By         : SOUVIK DEY
 * Description          : This is a store for all the reducers
 * Last Modified Date   : 02/01/2023
 * Last Modified By     : WASIM IQBAL
 */

import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createWhitelistFilter } from 'redux-persist-transform-filter';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import dataReducer from './slice/dataSlice';

export interface RootState {
  data: {
    records: {};
  };
}

// Combine reducers
const reducers = combineReducers({
  data: dataReducer,
});

// Persist config
const persistConf = {
  key: '@data',
  storage: AsyncStorage,
};

// Persisted reducer craete for session
const persistedReducer = persistReducer(persistConf, reducers);

// Store config
const store = configureStore({
  reducer: persistedReducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }),
  // devTools: process.env.NODE_ENV !== 'production',
});

// Persited store
// export const persistor = persistStore(store);
export default store;
