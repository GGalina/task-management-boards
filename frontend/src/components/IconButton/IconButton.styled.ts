import styled from 'styled-components';

interface IconButtonProps {
  $variant: 'edit' | 'delete';
}

export const IconButtonStyled = styled.button<IconButtonProps>`
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;

  background-color: ${({ $variant }) => ($variant === 'edit' ? '#7ba38a' : '#e57373')};
  color: white;

  &:hover {
    filter: brightness(1.1);
  }

  img {
    width: 16px;
    height: 16px;
  }
`;
