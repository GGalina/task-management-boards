import type { Card } from './card';
import type { ColumnKey } from '../pages/Home/Home';

export type BoardColumn = {
  name: 'ToDo' | 'In Progress' | 'Done';
  cards: Card[];
};

export type Board = {
  _id: string;
  name: string;
  columns: BoardColumn[];
  createdAt?: string;
  updatedAt?: string;
};

export type BoardFormProps = {
  title?: string;
  initialName?: string;
  onSubmit: (name: string) => void;
  onClose: () => void;
};

export type BoardColumnProps = {
  droppableId: ColumnKey;
  title: string;
  cards: Card[];
  onAddCard: () => void;
  onEditCard: (card: Card) => void;
  onDeleteCard: (card: Card) => void;
};
