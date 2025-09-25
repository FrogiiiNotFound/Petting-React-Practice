import { configureStore } from '@reduxjs/toolkit';
import auth from './Slices/authSlice.ts';
import navigation from './Slices/navigationSlice.ts';
import search from './Slices/searchSlice.ts';
import pets from './Slices/petsSlice.ts';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    auth,
    navigation,
    search,
    pets
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type AppDispatch = typeof store.dispatch;
