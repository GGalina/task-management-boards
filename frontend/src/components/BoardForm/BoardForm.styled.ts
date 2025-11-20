import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Title = styled.h3`
  font-family: 'Roboto', sans-serif;
  font-size: 18px; 
  font-weight: 600;
  line-height: 1.6;
  margin: 0 0 16px 0;
  text-align: center;
  color: #151414ff;
`;

export const Input = styled.input`
  padding: 8px;
  margin-bottom: 12px;
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

export const Button = styled.button`
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

export const CloseButton = styled.button`
  position: absolute;
  top: -16px;
  right: -16px;
  padding: 4px;
  border: none;
  background: transparent;
  cursor: pointer;

  img {
    width: 12px;
    height: 12px;
  }

  &:hover img {
    opacity: 0.8; 
  }
`;
