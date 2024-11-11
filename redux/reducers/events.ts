import {createSlice} from '@reduxjs/toolkit';
import { checkRegStatus, getAllEvents, getRegisteredEventsApi, registerEvent } from '../api/Events';

interface EventState {
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
} as EventState;

export const eventSlice = createSlice({
  name: 'events',
  initialState: initialState,
  reducers: {
    resetEvents: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(getAllEvents.pending, (state, action) => {
        state.loading = true;
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(getAllEvents.fulfilled, (state, action) => {
        const {requestId} = action.meta;
        if (state.loading && state.currentRequestId === requestId) {
          state.loading = false;
          state.currentRequestId = undefined;
          state.data = action.payload?.data;
        }
      })
      .addCase(getAllEvents.rejected, (state, action) => {
        const {requestId} = action.meta;
        if (state.loading && state.currentRequestId === requestId) {
          state.loading = false;
          state.currentRequestId = undefined;
          state.error = action.error;
        }
      })
      .addCase(checkRegStatus.pending, (state, action) => {
        state.loading = true;
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(checkRegStatus.fulfilled, (state, action) => {
        const {requestId} = action.meta;
        if (state.loading && state.currentRequestId === requestId) {
          state.loading = false;
          state.currentRequestId = undefined;
          state.data = action.payload?.data;
        }
      })
      .addCase(checkRegStatus.rejected, (state, action) => {
        const {requestId} = action.meta;
        if (state.loading && state.currentRequestId === requestId) {
          state.loading = false;
          state.currentRequestId = undefined;
          state.error = action.error;
        }
      })
      .addCase(registerEvent.pending, (state, action) => {
        state.loading = true;
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(registerEvent.fulfilled, (state, action) => {
        const {requestId} = action.meta;
        if (state.loading && state.currentRequestId === requestId) {
          state.loading = false;
          state.currentRequestId = undefined;
          state.data = action.payload?.data;
        }
      })
      .addCase(registerEvent.rejected, (state, action) => {
        const {requestId} = action.meta;
        if (state.loading && state.currentRequestId === requestId) {
          state.loading = false;
          state.currentRequestId = undefined;
          state.error = action.error;
        }
      })
      .addCase(getRegisteredEventsApi.pending, (state, action) => {
        state.loading = true;
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(getRegisteredEventsApi.fulfilled, (state, action) => {
        const {requestId} = action.meta;
        if (state.loading && state.currentRequestId === requestId) {
          state.loading = false;
          state.currentRequestId = undefined;
          state.data = action.payload?.data;
        }
      })
      .addCase(getRegisteredEventsApi.rejected, (state, action) => {
        const {requestId} = action.meta;
        if (state.loading && state.currentRequestId === requestId) {
          state.loading = false;
          state.currentRequestId = undefined;
          state.error = action.error;
        }
      })
  },
});

export const {resetEvents} = eventSlice.actions;
export default eventSlice.reducer;
