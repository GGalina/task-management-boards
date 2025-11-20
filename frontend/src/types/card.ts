export type Card = {
  _id: string;
  title: string;
  description?: string;
  column: 'todo' | 'inprogress' | 'done';
  order: number;
};

export type CardFormProps = {
  initialData?: Partial<Card>;
  onSubmit: (data: { title: string; description?: string; cardId?: string }) => void;
  onClose: () => void;
  titleText?: string;
};

export type CardItemProps = {
  card: Card;
  onEdit?: (card: Card) => void;
  onDelete?: (card: Card) => void;
};
