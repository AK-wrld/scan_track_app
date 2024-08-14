import {createAsyncThunk} from '@reduxjs/toolkit';
import {TSignup} from '../../models/SignupModel';
import {useCustomAxios} from '../../lib/customAxios';
import {API_ENDPOINTS} from '../../Globals/constants';

export const signupApi = createAsyncThunk(
  'user/signup',
  async (reqBody: TSignup) => {
    console.warn(reqBody);
    const {axiosPost} = useCustomAxios();
    try {
      console.warn(API_ENDPOINTS.signup);
      const response = await axiosPost(API_ENDPOINTS.signup, reqBody);
      console.warn(response);
      return {data: response.data, status: response.status};
    } catch (error: any) {
      console.warn('workeddd');
      return error.response.data;
    }
  },
);
