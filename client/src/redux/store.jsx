import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '../redux/dataSlice';
import notesReducer from '../redux/dataSlice';

export const store = configureStore({
  reducer: {
    data: dataReducer,
    notes: notesReducer
  },
});
