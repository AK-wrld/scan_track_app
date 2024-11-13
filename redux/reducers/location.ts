import {createSlice} from '@reduxjs/toolkit';
import { getAllEvents } from '../api/Events';
import { sendQrRegister } from '../api/Qr';
import { locationVerificationApi } from '../api/Location';

interface LocationState {
  loading: boolean;
  currentRequestId: undefined | string;
  data: any;
  error: any;
}
const initialState = {
  loading: false,
  currentRequestId: undefined,
  data: null,
  error: null,
} as LocationState;

export const locationSlice = createSlice({
  name: 'location',
  initialState: initialState,
  reducers: {
    resetLocation: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(locationVerificationApi.pending, (state, action) => {
        state.loading = true;
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(locationVerificationApi.fulfilled, (state, action) => {
        const {requestId} = action.meta;
        if (state.loading && state.currentRequestId === requestId) {
          state.loading = false;
          state.currentRequestId = undefined;
          state.data = action.payload?.data;
        }
      })
      .addCase(locationVerificationApi.rejected, (state, action) => {
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

export const {resetLocation} = locationSlice.actions;
export default locationSlice.reducer;
