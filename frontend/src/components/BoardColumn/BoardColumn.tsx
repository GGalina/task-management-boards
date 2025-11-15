import React from 'react';
import type { Card } from '../../types/card';
import CardItem from '../CardItem/CardItem';
import { ColumnWrapper, ColumnTitle, AddCardButton } from './BoardColumn.styled';

type BoardColumnProps = {
  title: string;
  cards: Card[];
  onAddCard: () => void;
};

const BoardColumn: React.FC<BoardColumnProps> = ({ title, cards, onAddCard }) => {
  return (
    <ColumnWrapper>
      <ColumnTitle>{title}</ColumnTitle>
      {cards.map(card => <CardItem key={card._id} card={card} />)}
      <AddCardButton onClick={onAddCard}>Add Card</AddCardButton>
    </ColumnWrapper>
  );
};

export default BoardColumn;
