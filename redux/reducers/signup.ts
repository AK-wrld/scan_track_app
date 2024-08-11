import { createSlice } from "@reduxjs/toolkit";
import { signupApi } from "../api/Authentication";

interface UsersState {
  loading: boolean;
  currentRequestId: undefined | string;
  userData: any;
  error: any;
}
const initialState = {
  loading: false,
  currentRequestId: undefined,
  userData: null,
  error: null,
} as UsersState;

export const signupSlice = createSlice({
    name: "Signup",
    initialState: initialState,
    reducers:{
        resetSignup: () => initialState,
    },
    extraReducers(builder) {
        builder
        .addCase(signupApi.pending, (state, action) => {
            state.loading = true;
            state.currentRequestId = action.meta.requestId;
          })
          .addCase(signupApi.fulfilled, (state, action) => {
            const { requestId } = action.meta;
            if (state.loading && state.currentRequestId === requestId) {
              state.loading = false;
              state.currentRequestId = undefined;
              state.userData = action.payload?.data;
            }
          })
          .addCase(signupApi.rejected, (state, action) => {
            const { requestId } = action.meta;
            if (state.loading && state.currentRequestId === requestId) {
              state.loading = false;
              state.currentRequestId = undefined;
              state.error = action.error;
            }
          })
    },
}) 

export const {resetSignup} = signupSlice.actions
export default signupSlice.reducer