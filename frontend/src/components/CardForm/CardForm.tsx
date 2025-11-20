import React, { useState } from 'react'; 
import Modal from '../Modal/Modal';
import CloseIcon from '../../assets/close.svg';
import type { CardFormProps } from '../../types/card';
import { Form, Input, TextArea, Button, Title, CloseButton } from './CardForm.styled';

const CardForm: React.FC<CardFormProps> = ({
  initialData = {},
  onSubmit,
  onClose,
  titleText = "Create Card",
}) => {

  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      cardId: initialData._id,
    });
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <Form onSubmit={handleSubmit}>

        <CloseButton type="button" onClick={onClose}>
          <img src={CloseIcon} alt="close" />
        </CloseButton>

        <Title>{titleText}</Title>

        <Input
          placeholder="Title"
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