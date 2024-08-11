import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import signupReducer from '../reducers/signup'

const reducers = combineReducers({
  signup: signupReducer
});



export const store = configureStore({
    reducer: reducers,
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
