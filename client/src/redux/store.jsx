import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '../redux/dataSlice';
import notesReducer from '../redux/notesSlice';

export const store = configureStore({
  reducer: {
    data: dataReducer,
    notes: notesReducer
  },
});
