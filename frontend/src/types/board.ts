import type { Card } from './card';

export type Board = {
  _id: string;
  name: string;
  hashId: string;
  columns: {
    todo: Card[];
    inprogress: Card[];
    done: Card[];
  };
};
