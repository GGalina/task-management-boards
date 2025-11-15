import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import api from '../api/apiClient';
import type { Board} from '../types/board';
import type { Card } from '../types/card';
import { toast } from 'react-toastify';

type BoardsState = {
  currentBoard?: Board | null;
  loading: boolean;
  error?: string | null;
};

const initialState: BoardsState = { currentBoard: null, loading: false, error: null };

// Async thunks
export const fetchBoard = createAsyncThunk('boards/fetchBoard', async (id: string) => {
  const { data } = await api.get(`/boards/${id}`);
  return data;
});

export const createBoard = createAsyncThunk('boards/createBoard', async (name: string) => {
  const { data } = await api.post('/boards', { name });
  toast.success('Board created successfully!');
  return data;
});

export const updateBoard = createAsyncThunk(
  'boards/updateBoard',
  async ({ id, name }: { id: string; name: string }) => {
    const { data } = await api.put(`/boards/${id}`, { name });
    toast.success('Board updated successfully!');
    return data;
  }
);

export const deleteBoard = createAsyncThunk('boards/deleteBoard', async (id: string) => {
  await api.delete(`/boards/${id}`);
  toast.success('Board deleted successfully!');
  return id;
});

// Slice
const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setCurrentBoard(state, action: PayloadAction<Board | null>) {
      state.currentBoard = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoard.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchBoard.fulfilled, (state, action) => { state.loading = false; state.currentBoard = action.payload; })
      .addCase(fetchBoard.rejected, (state, action) => { state.loading = false; state.error = action.error.message ?? 'Error'; })
      .addCase(createBoard.fulfilled, (state, action) => { state.currentBoard = action.payload; })
      .addCase(updateBoard.fulfilled, (state, action) => { state.currentBoard = action.payload; })
      .addCase(deleteBoard.fulfilled, (state) => { state.currentBoard = null; });
  },
});

export const { setCurrentBoard } = boardsSlice.actions;
export default boardsSlice.reducer;
