import React from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import CardItem from '../CardItem/CardItem';
import type { BoardColumnProps } from '../../types/board';
import { ColumnWrapper, ColumnTitle, AddCardButton } from './BoardColumn.styled';

const BoardColumn: React.FC<BoardColumnProps> = ({
  droppableId,
  title,
  cards,
  onAddCard,
  onEditCard,
  onDeleteCard
  }) => {

  const { setNodeRef } = useDroppable({
    id: droppableId,
  });

  return (
    <ColumnWrapper ref={setNodeRef}>
      <ColumnTitle>{title}</ColumnTitle>

      <SortableContext items={cards.map(c => c._id)} strategy={verticalListSortingStrategy}>
        {cards.map(card => (
          <CardItem
            key={card._id}
            card={card}
            onEdit={onEditCard}
            onDelete={onDeleteCard}
          />
        ))}
      </SortableContext>

      <AddCardButton onClick={onAddCard}>+ Add Card</AddCardButton>
    </ColumnWrapper>
  );
};

export default BoardColumn;
