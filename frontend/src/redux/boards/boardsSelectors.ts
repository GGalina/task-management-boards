import type { RootState } from '../store';

export const selectCurrentBoard = (state: RootState) => state.boards.currentBoard;
export const selectBoardsLoading = (state: RootState) => state.boards.loading;
export const selectBoardsError = (state: RootState) => state.boards.error;
