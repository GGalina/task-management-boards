import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import { Form, Input, Button } from './BoardForm.styled';

type BoardFormProps = {
  initialName?: string;
  onSubmit: (name: string) => void;
  onClose: () => void;
};

const BoardForm: React.FC<BoardFormProps> = ({ initialName = '', onSubmit, onClose }) => {
  const [name, setName] = useState(initialName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name);
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <Form onSubmit={handleSubmit}>
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
