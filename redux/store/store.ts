import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import signupReducer from '../reducers/signup';
import dashboardSlice from '../reducers/dashboard';

const reducers = combineReducers({
  signup: signupReducer,
  dashboard: dashboardSlice,
});

export const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
