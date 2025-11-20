import styled from 'styled-components';

export const ColumnWrapper = styled.div`
  background-color: #edeaeaff;
  border: 1px solid #bfb9b9ff;
  border-radius: 8px;
  padding: 16px;
  width: 300px;
  min-height: calc(100vh - 40px);

  display: flex;
  flex-direction: column;
  align-items: center;

  transition: width 0.2s ease;

  /* Responsive widths */
  @media (max-width: 1200px) {
    width: 260px;
  }

  @media (max-width: 900px) {
    width: 220px;
  }

  @media (max-width: 600px) {
    width: 180px;
  }
`;

export const ColumnTitle = styled.h3`
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  text-align: center;
`;

export const AddCardButton = styled.button`
  width: 80%;
  font-weight: 500;
  font-size: 14px;
  padding: 6px 0;
  border: none;
  color: white;
  border-radius: 4px;
  background-color: #7ba38a;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  &:hover {
    filter: brightness(1.1);
  }
`;
