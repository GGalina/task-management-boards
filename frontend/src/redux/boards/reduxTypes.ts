import type { Board } from '../../types/board';

export type BoardsState = {
  currentBoard: Board | null;
  loading: boolean;
  error: string | null;
};

export type UpdateBoardPayload = {
  id: string;
  name: string;
};
