import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Board } from '../../types/board';
import type { BoardsState } from './reduxTypes';
import { fetchBoard, createBoard, updateBoard, deleteBoard } from './boardsOperations';
import { createCard, updateCard, deleteCard, moveCard } from '../cards/cardsOperations';

const initialState: BoardsState = {
  currentBoard: null,
  loading: false,
  error: null,
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setCurrentBoard(state, action: PayloadAction<Board | null>) {
      state.currentBoard = action.payload;
    },
  },
  extraReducers: (builder) => {
    // ---------------- Board operations ----------------
    builder
      .addCase(createBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBoard = action.payload;
      })
      .addCase(createBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? action.error.message ?? 'Error';
      })

      .addCase(fetchBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBoard = action.payload;
      })
      .addCase(fetchBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error';
        state.currentBoard = null;
      })

      .addCase(updateBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBoard = action.payload;
      })
      .addCase(updateBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error';
      })

      .addCase(deleteBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBoard.fulfilled, (state) => {
        state.loading = false;
        state.currentBoard = null;
      })
      .addCase(deleteBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Error';
      });

    // ---------------- Card operations ----------------
    builder
      .addCase(createCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCard.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBoard = action.payload;
      })
      .addCase(createCard.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Error';
      })

      .addCase(updateCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBoard = action.payload;
      })
      .addCase(updateCard.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Error';
      })

      .addCase(deleteCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBoard = action.payload;
      })
      .addCase(deleteCard.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Error';
      })

      .addCase(moveCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(moveCard.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBoard = action.payload;
      })
      .addCase(moveCard.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Error';
      });
  },
});

export const { setCurrentBoard } = boardsSlice.actions;
export default boardsSlice.reducer;
