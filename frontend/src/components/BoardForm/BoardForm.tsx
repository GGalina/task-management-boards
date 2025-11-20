import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import CloseIcon from '../../assets/close.svg';
import type { BoardFormProps } from '../../types/board';
import { Form, Input, Button, Title, CloseButton } from './BoardForm.styled';

const BoardForm: React.FC<BoardFormProps> = ({ title, initialName = '', onSubmit, onClose }) => {
  const [name, setName] = useState(initialName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name);
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <Form onSubmit={handleSubmit}>
        <CloseButton type="button" onClick={onClose}>
          <img src={CloseIcon} alt="close" />
        </CloseButton>

        <Title>{title || 'Create New Board'}</Title>

        <Input
          placeholder="Board Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Button type="submit">Save</Button>
      </Form>
    </Modal>
  );
};

export default BoardForm;
