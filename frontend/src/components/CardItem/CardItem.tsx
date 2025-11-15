import React from 'react';
import type { Card } from '../../types/card';
import { CardWrapper, CardTitle, CardDescription } from './CardItem.styled';

type CardItemProps = { card: Card };

const CardItem: React.FC<CardItemProps> = ({ card }) => (
  <CardWrapper>
    <CardTitle>{card.title}</CardTitle>
    {card.description && <CardDescription>{card.description}</CardDescription>}
  </CardWrapper>
);

export default CardItem;
