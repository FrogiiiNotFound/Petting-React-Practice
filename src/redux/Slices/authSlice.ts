import type { ApiResponse } from '@/types/Api';
import type { formValues, RegisterFormValue } from '@/types/Forms';
import type { editedData, IAuthState, UserData } from '@/types/Slices/AuthSlice';
import { API_BASE_URL } from '@/utils/constants';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import type { RootState } from '../store';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: RegisterFormValue, thunkApi) => {
    try {
      const response: AxiosResponse<ApiResponse> = await axios.post(
        `${API_BASE_URL}/user`,
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const loginUser = createAsyncThunk('auth/loginUser', async (data: formValues, thunkApi) => {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.get(`${API_BASE_URL}/user/login`, {
      params: {
        data,
      },
    });

    return response.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async (data, thunkApi) => {
  try {
    const response = axios.get(`${API_BASE_URL}/user/logout`);
    thunkApi.dispatch(isAuthHandle(false));

    return response;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const getUserData = createAsyncThunk(
  'auth/getUserData',
  async (data: formValues, thunkApi) => {
    try {
      const response: AxiosResponse<UserData> = await axios.get(
        `${API_BASE_URL}/user/${data.login}`,
        {
          headers: {
            api_key: 'special-key',
          },
        },
      );
      thunkApi.dispatch(setUserData(response.data));
      thunkApi.dispatch(isAuthHandle(true));

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const changeUserData = createAsyncThunk(
  'auth/changeUserData',
  async (data: editedData, thunkApi) => {
    const { getState } = thunkApi;
    const state = getState() as RootState;
    const { userData } = state.auth;

    const editedData = {
      id: 0,
      ...data,
      email: userData.email,
      phone: userData.phone,
      password: userData.password,
      userStatus: 0,
    };

    try {
      const response = await axios.put(`${API_BASE_URL}/user/${userData.username}`, editedData);
      thunkApi.dispatch(setUserData(editedData));

      return response.data;
    } catch (error: any) {
      console.log(error);

      return thunkApi.rejectWithValue(error.message);
    }
  },
);

const initialState: IAuthState = {
  isAuth: false,
  userData: {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    isAuthHandle(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    setUserData(state, action: PayloadAction<UserData>) {
      state.userData = action.payload;
    },
  },
});

export const authSelector = (state: RootState) => state.auth;

export const { isAuthHandle, setUserData } = authSlice.actions;

export default authSlice.reducer;
