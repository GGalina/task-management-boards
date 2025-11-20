import styled from 'styled-components';

export const Container = styled.div`
  padding: 24px;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
`;

export const Input = styled.input`
  max-width: 600px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #bfb9b9ff;
  flex: 1;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:focus {
    border-color: #7ba38a;
    box-shadow: 0 0 0 2px rgba(51, 201, 106, 0.25);
    outline: none;
  }
`;

export const ColumnsWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

export const BoardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const BoardInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BoardTitle = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.6;
  margin-bottom: 8px;
  color: #151414ff;
`;

export const BoardId = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.6;
  margin-bottom: 8px;
  color: #393636ff;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const SearchBtn = styled.button`
    padding: 8px 16px;
    border-radius: 4px;
    font-weight: 500;
    font-size: 14px;
    border: none;
    background-color: #7ba38a;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #8fc8a0;
`;

export const CreateBtn = styled.button`
  font-weight: 500;
  font-size: 14px;
  padding: 0 16px;
  border-radius: 4px;
  border: none;
  background-color: #43c474ff;
  color: white;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #75c58dff;
  }
`;

export const Error = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  margin: 8px 16px;
  color: #c52222ff;
`;
