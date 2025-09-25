import type { IAuthState } from '@/types/Slices/NavigationSlice';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: IAuthState = {
  activeLink: '/',
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setActiveLink(state, action: PayloadAction<string>) {
      state.activeLink = action.payload;
    },
  },
});

export const { setActiveLink } = navigationSlice.actions;

export default navigationSlice.reducer;
