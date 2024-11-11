import {createSlice} from '@reduxjs/toolkit';
import { getAllEvents } from '../api/Events';
import { sendQrRegister } from '../api/Qr';

interface QrState {
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
} as QrState;

export const qrSlice = createSlice({
  name: 'qr',
  initialState: initialState,
  reducers: {
    resetQr: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(sendQrRegister.pending, (state, action) => {
        state.loading = true;
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(sendQrRegister.fulfilled, (state, action) => {
        const {requestId} = action.meta;
        if (state.loading && state.currentRequestId === requestId) {
          state.loading = false;
          state.currentRequestId = undefined;
          state.data = action.payload?.data;
        }
      })
      .addCase(sendQrRegister.rejected, (state, action) => {
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

export const {resetQr} = qrSlice.actions;
export default qrSlice.reducer;
