import styled from 'styled-components';

export const CardWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  background-color: #ffffff;
  padding: 12px;
  border-radius: 6px;
  padding-bottom: 40px;
  margin-bottom: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  cursor: grab;
  box-sizing: border-box;
  position: relative; 
`;

export const CardTitle = styled.h4`
  font-family: 'Roboto', sans-serif;
  font-size: 16px; 
  font-weight: 600;
  margin-bottom: 10px;
  color: #1d1d1d;
  word-break: break-word;
`;

export const CardDescription = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 14px; 
  font-weight: 400;
  color: #555555;
  word-break: break-word;
`;

export const CardButtonsWrapper = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  display: flex;
  gap: 6px; 
`;