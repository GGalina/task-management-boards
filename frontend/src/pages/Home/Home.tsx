import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedRedux';
import { fetchBoard, createBoard, updateBoard, deleteBoard } from '../../redux/boardsSlice';
import type { Board } from '../../types/board';
import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';
import BoardForm from '../../components/BoardForm/BoardForm';
import CardForm from '../../components/CardForm/CardForm';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog';
import BoardColumn from '../../components/BoardColumn/BoardColumn';
import { Container, ActionsWrapper, Input, ColumnsWrapper, SearchBtn, CreateBtn, EditBtn, DeleteBtn } from './Home.styled';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentBoard, loading, error } = useAppSelector((state) => state.boards);

  const [boardId, setBoardId] = useState('');
  const [showBoardForm, setShowBoardForm] = useState(false);
  const [editBoard, setEditBoard] = useState<Board | null>(null);
  const [showCardFormColumn, setShowCardFormColumn] = useState<keyof Board['columns'] | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSearch = () => {
    if (boardId.trim()) {
      dispatch(fetchBoard(boardId));
    }
  };

  const handleCreateBoard = (name: string) => {
    dispatch(createBoard(name));
  };

  const handleEditBoard = (name: string) => {
    if (currentBoard) {
      dispatch(updateBoard({ id: currentBoard._id, name }));
    }
  };

  const handleDeleteBoard = () => {
    if (currentBoard) {
      dispatch(deleteBoard(currentBoard._id));
      setShowDeleteConfirm(false);
    }
  };

  const handleAddCard = (column: keyof Board['columns'], title: string, description?: string) => {
    if (!currentBoard) return;
    // For demo purposes, we'll just push a card locally
    const newCard = {
      _id: Date.now().toString(),
      title,
      description,
      column,
      order: currentBoard.columns[column].length,
    };
    currentBoard.columns[column].push(newCard);
    setShowCardFormColumn(null);
  };

  return (
    <Container>
      <Header />
      <ActionsWrapper>
        <Input
          placeholder="Enter board ID"
          value={boardId}
          onChange={(e) => setBoardId(e.target.value)}
        />
        <SearchBtn onClick={handleSearch}>Search</SearchBtn>
        <CreateBtn onClick={() => setShowBoardForm(true)}>Create Board</CreateBtn>
      </ActionsWrapper>

      {loading && <Loader />}
      {error && <p>{error}</p>}
      {!loading && !currentBoard && !error && <p>No board selected</p>}

      {currentBoard && (
        <>
          <div style={{ marginBottom: '12px' }}>
            <EditBtn onClick={() => setEditBoard(currentBoard)}>Edit Board</EditBtn>
            <DeleteBtn onClick={() => setShowDeleteConfirm(true)}>Delete Board</DeleteBtn>
          </div>
          <ColumnsWrapper>
            {(['todo', 'inprogress', 'done'] as const).map((col) => (
              <BoardColumn
                key={col}
                title={col.toUpperCase()}
                cards={currentBoard.columns[col]}
                onAddCard={() => setShowCardFormColumn(col)}
              />
            ))}
          </ColumnsWrapper>
        </>
      )}

      {showBoardForm && (
        <BoardForm
          onSubmit={handleCreateBoard}
          onClose={() => setShowBoardForm(false)}
        />
      )}

      {editBoard && (
        <BoardForm
          initialName={editBoard.name}
          onSubmit={handleEditBoard}
          onClose={() => setEditBoard(null)}
        />
      )}

      {showCardFormColumn && (
        <CardForm
          onSubmit={(data) => handleAddCard(showCardFormColumn, data.title, data.description)}
          onClose={() => setShowCardFormColumn(null)}
        />
      )}

      {showDeleteConfirm && (
        <ConfirmDialog
          message="Are you sure you want to delete this board?"
          onConfirm={handleDeleteBoard}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </Container>
  );
};

export default Home;
