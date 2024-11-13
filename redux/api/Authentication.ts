import {createAsyncThunk} from '@reduxjs/toolkit';
import {TLogin, TSignup} from '../../models/Authentication';
import {API_ENDPOINTS} from '../../Globals/constants';
import { useCustomAxios } from '../../lib/customAxios';

export const signupApi = createAsyncThunk(
  'user/signup',
  async (reqBody: TSignup, {rejectWithValue}) => {
    // Debugging: Log the request body
    console.log('Request Body:', reqBody);
    
     const {axiosPost} = useCustomAxios();
    try {
      console.log('API Endpoint:', API_ENDPOINTS.signup);
      
      const response = await axiosPost(API_ENDPOINTS.signup, reqBody);
      
      console.log('Response:', response);
      
      return {data: response.data, status: response.status};
    }catch (error: any) {
      console.log('Error');
     return rejectWithValue(error.response.data)
    }
  },
);
export const loginApi = createAsyncThunk(
  'user/signup',
  async (reqBody: TLogin, {rejectWithValue}) => {
    // Debugging: Log the request body
    console.log('Request Body:', reqBody);
    
     const {axiosPost} = useCustomAxios();
    try {
      console.log('API Endpoint:', API_ENDPOINTS.login);
      
      const response = await axiosPost(API_ENDPOINTS.login, reqBody);
      
      console.log('Response:', response);
      
      return {data: response.data, status: response.status};
    }catch (error: any) {
      console.log('Error');
      return rejectWithValue(error.response.data)
    }
  },
);