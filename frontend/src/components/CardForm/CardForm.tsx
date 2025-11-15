import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import { Form, Input, TextArea, Button } from './CardForm.styled';
import type { Card } from '../../types/card';

type CardFormProps = {
  initialData?: Partial<Card>;
  onSubmit: (data: { title: string; description?: string }) => void;
  onClose: () => void;
};

const CardForm: React.FC<CardFormProps> = ({ initialData = {}, onSubmit, onClose }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [description, setDescription] = useState(initialData.description || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description });
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="Card Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextArea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button type="submit">Save</Button>
      </Form>
    </Modal>
  );
};

export default CardForm;
