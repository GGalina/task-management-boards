import { Types, Document } from 'mongoose';

// --- Card interface ---//
export interface ICard {
  _id?: Types.ObjectId;
  title: string;
  description?: string;
}

// --- Column interface ---//
export interface IColumn {
  name: 'ToDo' | 'In Progress' | 'Done';
  cards: Types.DocumentArray<ICard>; 
};

// --- Board interface ---//
export interface IBoard extends Document {
  name: string;
  columns: Types.DocumentArray<IColumn>;
  createdAt?: Date;
  updatedAt?: Date;
};

// --- Drag and drop interface ---//
export interface IDragDropRequest {
  fromColumn: 'ToDo' | 'In Progress' | 'Done';
  toColumn: 'ToDo' | 'In Progress' | 'Done';
  toIndex?: number;
};
