import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { signupApi } from "../api/Authentication";

interface DashboardState {
  currentTab:string
}
const initialState = {
  currentTab:"Registered_Events"
} as DashboardState;

export const dashboardSlice = createSlice({
    name: "Signup",
    initialState: initialState,
    reducers:{
        resetSignup: () => initialState,
        handleTabChange: (state, action: PayloadAction<string>) => {
            state.currentTab = action.payload;
        }
    },
}) 

export const {resetSignup,handleTabChange} = dashboardSlice.actions
export default dashboardSlice.reducer