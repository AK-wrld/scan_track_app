import {createSlice} from '@reduxjs/toolkit';
import {loginApi} from '../api/Authentication';

interface UsersState {
  loading: boolean;
  currentRequestId: undefined | string;
  
  error: any;
  authToken: string;
  userId: string;
}
const initialState = {
  loading: false,
  currentRequestId: undefined,
  authToken: '',
  userId: '',
  error: null,
} as UsersState;

export const loginSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    resetLogin: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(loginApi.pending, (state, action) => {
        state.loading = true;
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(loginApi.fulfilled, (state, action) => {
        const {requestId} = action.meta;
        if (state.loading && state.currentRequestId === requestId) {
          if(action.payload) {

            console.log("yoooooo",action.payload?.status)
            state.loading = false;
            state.currentRequestId = undefined;
            state.authToken = action.payload?.data?.token;
            state.userId = action.payload?.data?.userId;
          }
          else {
            console.log("didnt login")
          }
          // console.log("User data",state.authToken,state.userId)
        }
      })
      .addCase(loginApi.rejected, (state, action) => {
        console.log('Error:', action.error);
        const {requestId} = action.meta;
        if (state.loading && state.currentRequestId === requestId) {
          state.loading = false;
          state.currentRequestId = undefined;
          state.error = action.error;
        }
      });
  },
});

export const {resetLogin} = loginSlice.actions;
export default loginSlice.reducer;
