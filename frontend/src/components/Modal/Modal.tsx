import React from 'react';
import type { ModalProps } from '../../types/ui';
import { Overlay, ModalContent } from './Modal.styled';

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <Overlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>{children}</ModalContent>
    </Overlay>
  );
};

export default Modal;
