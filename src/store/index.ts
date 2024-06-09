import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from './auth';
import notificationReducer from './notification'
import dataUpdateReducer from './dataUpdate';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key:'root',
    storage: AsyncStorage
}

const reducer = combineReducers({
    auth: authReducer,
    notification: notificationReducer,
    dataUpdate: dataUpdateReducer
})
const persistedReducer = persistReducer(persistConfig,reducer)
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>

export default store;