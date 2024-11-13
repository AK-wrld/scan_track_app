import { createAsyncThunk } from "@reduxjs/toolkit";
import { useCustomAxios } from "../../lib/customAxios";
import { API_ENDPOINTS } from "../../Globals/constants";
import { TQr } from "../../models/QrModel";

export const sendQrRegister = createAsyncThunk(
    "qr/send/register/event",
    async (reqBody: TQr, {rejectWithValue}) => {
        const {axiosPost} = useCustomAxios();
        try {
        console.log("API Endpoint:",reqBody.link);
        const obj = {
            timeOfScan: reqBody.timestamp,
            userId: reqBody.userId,
        }
        console.log(obj)
        const response = await axiosPost(reqBody.link, obj);
    
        console.log("Response:", response.data);
    
        return { data: response.data, status: response.status };
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)