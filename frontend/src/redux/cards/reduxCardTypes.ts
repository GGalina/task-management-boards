export type CreateCardPayload = {
  boardId: string;
  columnName: 'ToDo' | 'In Progress' | 'Done'; 
  title: string;
  description?: string;
};

export type UpdateCardPayload = {
  boardId: string;
  cardId: string;
  columnName: 'ToDo' | 'In Progress' | 'Done'; 
  title: string;
  description?: string;
};

export type DeleteCardPayload = {
  boardId: string;
  cardId: string;
};

export type MoveCardPayload = {
  boardId: string;
  cardId: string;
  fromColumn: string;
  toColumn: string;
  toIndex: number;
};
