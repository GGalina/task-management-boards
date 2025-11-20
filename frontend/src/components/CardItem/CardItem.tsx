import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import IconButton from '../IconButton/IconButton';
import EditIcon from '../../assets/edit.svg';
import DeleteIcon from '../../assets/delete.svg';
import type { CardItemProps } from '../../types/card';
import { 
  CardWrapper, 
  CardTitle, 
  CardDescription, 
  CardButtonsWrapper } from './CardItem.styled';

const CardItem: React.FC<CardItemProps> = ({ card, onEdit, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card._id,
  });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    touchAction: 'none',
    visibility: isDragging ? 'hidden' : 'visible',
  };

  return (
    <CardWrapper ref={setNodeRef} style={style} {...attributes}>
      <CardTitle {...listeners}>{card.title}</CardTitle>

      {card.description && <CardDescription>{card.description}</CardDescription>}

      <CardButtonsWrapper>

        {onEdit && (
          <IconButton
            variant="edit"
            icon={EditIcon}
            onClick={(e) => {
              e.stopPropagation();
              onEdit(card);
            }}
          />
        )}

        {onDelete && (
          <IconButton
            variant="delete"
            icon={DeleteIcon}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(card);
            }}
          />
        )}
        
      </CardButtonsWrapper>
    </CardWrapper>
  );
};

export default CardItem;
