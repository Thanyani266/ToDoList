import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
  const response = await axios.get('https://to-do-list-mu-green.vercel.app/notes'); 
  return response.data;
});

export const createNote = createAsyncThunk('notes/createNote', async (newNote) => {
  const response = await axios.post('https://to-do-list-mu-green.vercel.app/note', newNote); 
  return response.data;
});
  
export const updateNote = createAsyncThunk('notes/updateNote', async (updatedNote) => {
  const response = await axios.put(`https://to-do-list-mu-green.vercel.app/note/${updatedNote.id}`, updatedNote); 
  return response.data;
});

export const deleteNote = createAsyncThunk('notes/deleteNote', async (noteId) => {
  await axios.delete(`https://to-do-list-mu-green.vercel.app/note/${noteId}`); // Replace with your Node.js API endpoint
  return noteId;
});

export const getSingleNote = createAsyncThunk('notes/getSingleNote', async (noteId) => {
  const response = await axios.get(`https://to-do-list-mu-green.vercel.app/note/${noteId}`);
  return response.data;
});


  const notesSlice = createSlice({
    name: 'notes',
    initialState: { items: [], status: 'idle', selectedNote: null },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchNotes.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchNotes.fulfilled, (state, action) => {
          state.items = action.payload;
          state.status = 'succeeded';
        })
        .addCase(fetchNotes.rejected, (state) => {
          state.status = 'failed';
        })
        .addCase(createNote.fulfilled, (state, action) => {
          state.items.push(action.payload);
        })
        .addCase(updateNote.fulfilled, (state, action) => {
          const index = state.items.findIndex(note => note.id === action.payload.id);
          if (index !== -1) {
            state.items[index] = action.payload;
          }
        })
        .addCase(deleteNote.fulfilled, (state, action) => {
          state.items = state.items.filter(note => note.id !== action.payload);
        })
        .addCase(getSingleNote.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(getSingleNote.fulfilled, (state, action) => {
          state.selectedNote = action.payload;
          state.status = 'succeeded';
        })
        .addCase(getSingleNote.rejected, (state) => {
          state.status = 'failed';
        });
    },
  });

export default notesSlice.reducer;
