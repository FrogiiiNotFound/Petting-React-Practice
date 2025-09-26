import type { IPetsState } from '@/types/Slices/PetsSlice';
import type { TPetInfo } from '@/types/Slices/SearchSlice';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type {} from './searchSlice';
import { API_BASE_URL } from '@/utils/constants';
import axios from 'axios';

export const addPet = createAsyncThunk('pets/addPet', async (data: TPetInfo, thunkApi) => {
  try {
    const response = axios.post(`${API_BASE_URL}/pets`, {
      headers: {
        api_key: 'special-key',
      },
      params: {
        data,
      },
    });

    console.log('Добавление питомца успешно завершено');
    return response;
  } catch (error: any) {
    thunkApi.rejectWithValue(error.message);
  }
});

export const receivePet = createAsyncThunk(
  'pets/receivePet',
  async (id: string | undefined, thunkApi) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/pet/${id}`);

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

const initialState: IPetsState = {
  myPets: [],
};

const petsSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {
    addMyPet(state, action: PayloadAction<TPetInfo>) {
      state.myPets.push(action.payload);
    },
  },
});

export const petsSelector = (state: RootState) => state.pets;

export const { addMyPet } = petsSlice.actions;

export default petsSlice.reducer;
