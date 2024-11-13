import { createAsyncThunk } from "@reduxjs/toolkit";
import { TLocationVerification } from "../../models/Location";
import { useCustomAxios } from "../../lib/customAxios";
import { API_ENDPOINTS } from "../../Globals/constants";

export const locationVerificationApi = createAsyncThunk(
    "event/location/verify",
    async (reqBody: TLocationVerification, {rejectWithValue}) => {
        console.log("Request Body: ",reqBody)
        const {axiosPost} = useCustomAxios();
        try {
        console.log("API Endpoint:",API_ENDPOINTS.verifyLocation);
        
        const response = await axiosPost(API_ENDPOINTS.verifyLocation, reqBody);
        
        console.log("Response:", response.data);
    
        return { data: response.data, status: response.status };
        } catch (error: any) {
            
        return rejectWithValue(error.response.data);
        }
    }
)