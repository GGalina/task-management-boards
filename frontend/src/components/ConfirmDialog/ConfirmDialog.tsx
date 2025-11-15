import React from 'react';
import Modal from '../Modal/Modal';
import { ButtonsWrapper, Button } from './ConfirmDialog.styled';

type ConfirmDialogProps = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ message, onConfirm, onCancel }) => (
  <Modal onClose={onCancel}>
    <p>{message}</p>
    <ButtonsWrapper>
      <Button onClick={onCancel}>Cancel</Button>
      <Button danger onClick={onConfirm}>Delete</Button>
    </ButtonsWrapper>
  </Modal>
);

export default ConfirmDialog;
