import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { ISearchState, TPetInfo } from '@/types/Slices/SearchSlice';
import axios from 'axios';

export const searchAllPets = createAsyncThunk('search/searchAllPets', async (data, thunkApi) => {
  try {
    const responseItems = await axios.get(
      'https://petstore.swagger.io/v2/pet/findByStatus?status=available',
      {
        headers: {
          accept: 'application/json',
        },
      },
    );
    thunkApi.dispatch(setAvailablePets(responseItems.data));
    
  } catch (error: any) {
    thunkApi.rejectWithValue(error.message);
  }
});

const initialState: ISearchState = {
  currentPage: 1,
  availablePets: [],
};

const authSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    onPageChange(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setAvailablePets(state, action: PayloadAction<TPetInfo[]>) {
      state.availablePets = action.payload;
    },
  },
});

export const searchFilter = (state: RootState) => state.search;

export const { onPageChange, setAvailablePets } = authSlice.actions;

export default authSlice.reducer;
