import styled from 'styled-components';

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;

export const Button = styled.button<{ danger?: boolean }>`
  padding: 6px 12px;
  margin-left: 8px;
  border: none;
  border-radius: 4px;
  background-color: ${({ danger }) => (danger ? '#d32f2f' : '#1976d2')};
  color: white;
  cursor: pointer;
`;
