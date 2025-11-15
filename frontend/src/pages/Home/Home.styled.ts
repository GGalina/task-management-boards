import styled from 'styled-components';

export const Container = styled.div`
    padding: 24px;
`;

export const ActionsWrapper = styled.div`
    display: flex;
    gap: 12px;
    margin-bottom: 24px;
`;

export const Input = styled.input`
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #bfb9b9ff;
    flex: 1;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:focus {
        border-color: #7ba38a;   
        box-shadow: 0 0 0 2px rgba(51, 201, 106, 0.25);
        outline: none;
    }
`;

export const SearchBtn = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  background-color: #7ba38a;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #8fc8a0;
`;

export const CreateBtn = styled.button`

`;

export const EditBtn = styled.button`

`;

export const DeleteBtn = styled.button`

`;

export const ColumnsWrapper = styled.div`
  display: flex;
  gap: 16px;
`;
