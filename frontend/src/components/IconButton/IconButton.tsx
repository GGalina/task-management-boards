import React from 'react';
import type { IconButtonProps } from '../../types/ui';
import { IconButtonStyled } from './IconButton.styled';

const IconButton: React.FC<IconButtonProps> = ({ variant, onClick, children, icon }) => (
  <IconButtonStyled $variant={variant} onClick={onClick}>
    {icon && <img src={icon} alt={variant} />}
    {children}
  </IconButtonStyled>
);

export default IconButton;
