export type Card = {
  _id: string;
  title: string;
  description?: string;
  column: 'todo' | 'inprogress' | 'done';
  order: number;
};
