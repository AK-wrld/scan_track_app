import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import signupReducer from '../reducers/signup';
import loginReducer from '../reducers/login';
import dashboardSlice from '../reducers/dashboard';
import eventSlice from '../reducers/events';
import qrSlice from '../reducers/qr';
const reducers = combineReducers({
  signup: signupReducer,
  login: loginReducer,
  dashboard: dashboardSlice,
  events: eventSlice,
  qr: qrSlice,
});

export const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
