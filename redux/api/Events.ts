import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "../../Globals/constants";
import { useCustomAxios } from "../../lib/customAxios";
import { TGetRegisteredEvents, TRegStatus, TRegisterEvent } from "../../models/Event";

export const getAllEvents = createAsyncThunk(
    "events/getAllEvents",
    async () => {
        const {axiosGet} = useCustomAxios();
        try {
        console.log("API Endpoint:", API_ENDPOINTS.getEvents);
    
        const response = await axiosGet(API_ENDPOINTS.getEvents);
    
        console.log("Response:", response.data);
    
        return { data: response.data, status: response.status };
        } catch (error: any) {
        console.log("Error");
        }
    }
)
export const registerEvent = createAsyncThunk(
    "participant/event/register",
    async (reqBody:TRegisterEvent,{rejectWithValue}) => {
        const {axiosPost} = useCustomAxios();
        try {
        console.log("API Endpoint:", API_ENDPOINTS.registerEvent);
    
        const response = await axiosPost(API_ENDPOINTS.registerEvent,reqBody);
            
        console.log("Response:", response.data);
    
        return { data: response.data, status: response.status };
        } catch (error: any) {
           
        rejectWithValue(error)
        }
    }
)
export const checkRegStatus = createAsyncThunk(
    "event/participant/register/status",
    async (reqBody:TRegStatus,{rejectWithValue}) => {
        const {axiosPost} = useCustomAxios();
        try {
        console.log("API Endpoint:", API_ENDPOINTS.checkRegisterationStatus);
    
        const response = await axiosPost(API_ENDPOINTS.checkRegisterationStatus,reqBody);
    
        console.log("Response:", response.data);
    
        return { data: response.data, status: response.status };
        } catch (error: any) {
            console.log("hello")
        rejectWithValue(error)
        }
    }
)
export const getRegisteredEventsApi = createAsyncThunk(
    "event/participant/registered",
    async (reqBody:TGetRegisteredEvents,{rejectWithValue}) => {
        console.log("Request Body:", reqBody);
        const {axiosPost} = useCustomAxios();
        try {
        console.log("API Endpoint:", API_ENDPOINTS.getRegisteredEvents);
    
        const response = await axiosPost(API_ENDPOINTS.getRegisteredEvents,reqBody);
    
        console.log("Response:", response.data);
    
        return { data: response.data, status: response.status };
        } catch (error: any) {
        rejectWithValue(error)
        }
    }
)
