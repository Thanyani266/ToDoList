import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchData = createAsyncThunk('tasks/fetchData', async () => {
  const response = await axios.get(
    'https://to-do-list-mu-green.vercel.app/tasks'
  );
  return response.data;
});

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (newTask) => {
    const response = await axios.post(
      'https://to-do-list-mu-green.vercel.app/task',
      newTask
    );
    return response.data;
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (updatedTask) => {
    const response = await axios.put(
      `https://to-do-list-mu-green.vercel.app/task/${updatedTask.id}`,
      updatedTask
    );
    return response.data;
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId) => {
    await axios.delete(`https://to-do-list-mu-green.vercel.app/task/${taskId}`); // Replace with your Node.js API endpoint
    return taskId;
  }
);

export const getSingleTask = createAsyncThunk(
  'tasks/getSingleTask',
  async (taskId) => {
    const response = await axios.get(
      `https://to-do-list-mu-green.vercel.app/task/${taskId}`
    );
    return response.data;
  }
);

const dataSlice = createSlice({
  name: 'tasks',
  initialState: { items: [], status: 'idle', selectedTask: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((task) => task.id !== action.payload);
      })
      .addCase(getSingleTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSingleTask.fulfilled, (state, action) => {
        state.selectedTask = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getSingleTask.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default dataSlice.reducer;
