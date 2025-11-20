import React, { useState, ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedRedux';

import {
  fetchBoard,
  createBoard,
  updateBoard,
  deleteBoard,
} from '../../redux/boards/boardsOperations';
import { createCard, updateCard, deleteCard, moveCard } from '../../redux/cards/cardsOperations';

import type { Board } from '../../types/board';
import type { Card } from '../../types/card';

import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';
import CardForm from '../../components/CardForm/CardForm';
import CardItem from '../../components/CardItem/CardItem';
import BoardForm from '../../components/BoardForm/BoardForm';
import IconButton from '../../components/IconButton/IconButton';
import BoardColumn from '../../components/BoardColumn/BoardColumn';

import PlusIcon from '../../assets/plus.svg';
import EditIcon from '../../assets/edit.svg';
import DeleteIcon from '../../assets/delete.svg';

import {
  Container,
  ActionsWrapper,
  Input,
  ColumnsWrapper,
  BoardHeader,
  BoardInfo,
  BoardTitle,
  BoardId,
  ButtonsContainer,
  SearchBtn,
  CreateBtn,
  Error,
} from './Home.styled';

import {
  DndContext,
  DragStartEvent,
  DragEndEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

export type ColumnKey = 'todo' | 'inprogress' | 'done';

const COLUMN_TITLES: Record<ColumnKey, string> = {
  todo: 'To Do',
  inprogress: 'In Progress',
  done: 'Done',
};

const COLUMN_BACKEND_NAMES: Record<ColumnKey, 'ToDo' | 'In Progress' | 'Done'> = {
  todo: 'ToDo',
  inprogress: 'In Progress',
  done: 'Done',
};

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentBoard, loading, error } = useAppSelector((state) => state.boards);

  const [boardId, setBoardId] = useState('');
  const [showBoardForm, setShowBoardForm] = useState(false);
  const [editBoard, setEditBoard] = useState<Board | null>(null);
  const [showCardFormColumn, setShowCardFormColumn] = useState<ColumnKey | null>(null);
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [activeCard, setActiveCard] = useState<Card | null>(null);

  /** Column helpers */
  const getColumnCards = (backendName: 'ToDo' | 'In Progress' | 'Done') =>
    currentBoard?.columns.find((col) => col.name === backendName)?.cards ?? [];

  const getColumnKeyByCard = (cardId: string): ColumnKey | null => {
    if (!currentBoard) return null;
    for (const key of ['todo', 'inprogress', 'done'] as ColumnKey[]) {
      const backend = COLUMN_BACKEND_NAMES[key];
      const col = currentBoard.columns.find((c) => c.name === backend);
      if (col?.cards.some((c) => c._id === cardId)) return key;
    }
    return null;
  };

  /** Board handlers */
  const handleBoardIdChange = (e: ChangeEvent<HTMLInputElement>) => setBoardId(e.target.value);

  const handleSearchBoard = () => boardId && dispatch(fetchBoard(boardId));

  const handleCreateBoard = (name: string) => {
    dispatch(createBoard(name));
    setShowBoardForm(false);
  };

  const handleDeleteBoard = () => {
    if (!currentBoard) return;
    dispatch(deleteBoard(currentBoard._id));
  };

  const handleEditBoard = () => {
    if (!currentBoard) return;
    setEditBoard(currentBoard);
  };

  /** Card handlers */
  const handleCardEdit = (card: Card, col: ColumnKey) => {
    setEditingCard(card);
    setShowCardFormColumn(col);
  };

  const handleCardDelete = (card: Card) => {
    if (!currentBoard) return;
    dispatch(deleteCard({ boardId: currentBoard._id, cardId: card._id }));
  };

  const handleCardCreate = (title: string, description?: string) => {
    if (!currentBoard || !showCardFormColumn) return;
    dispatch(
      createCard({
        boardId: currentBoard._id,
        columnName: COLUMN_BACKEND_NAMES[showCardFormColumn],
        title,
        description,
      }),
    );
    setShowCardFormColumn(null);
  };

  const handleCardUpdate = (card: Card, title: string, description?: string) => {
    if (!currentBoard) return;
    const colKey = getColumnKeyByCard(card._id)!;
    dispatch(
      updateCard({
        boardId: currentBoard._id,
        cardId: card._id,
        columnName: COLUMN_BACKEND_NAMES[colKey],
        title,
        description,
      }),
    );
    setEditingCard(null);
    setShowCardFormColumn(null);
  };

  /** Drag and drop */
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = (event: DragStartEvent) => {
    const id = event.active.id.toString();
    const colKey = getColumnKeyByCard(id);
    if (!colKey) return;
    const card = getColumnCards(COLUMN_BACKEND_NAMES[colKey]).find((c) => c._id === id);
    if (card) setActiveCard(card);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveCard(null);
    if (!currentBoard || !over) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    const fromColumnKey = getColumnKeyByCard(activeId);
    const toColumnKey = getColumnKeyByCard(overId) ?? (over.id as ColumnKey);
    if (!fromColumnKey || !toColumnKey) return;

    const toCards = getColumnCards(COLUMN_BACKEND_NAMES[toColumnKey]);
    const overIndex = toCards.findIndex((c) => c._id === overId);
    const newIndex = overIndex >= 0 ? overIndex : toCards.length;

    dispatch(
      moveCard({
        boardId: currentBoard._id,
        cardId: activeId,
        fromColumn: COLUMN_BACKEND_NAMES[fromColumnKey],
        toColumn: COLUMN_BACKEND_NAMES[toColumnKey],
        toIndex: newIndex,
      }),
    );
  };

  return (
    <Container>
      <Header />

      <ActionsWrapper>
        <Input placeholder="Enter board ID" value={boardId} onChange={handleBoardIdChange} />
        <SearchBtn onClick={handleSearchBoard}>Search</SearchBtn>
        <CreateBtn onClick={() => setShowBoardForm(true)}>
          <img src={PlusIcon} width={22} height={22} alt="" /> Create board
        </CreateBtn>
      </ActionsWrapper>

      {loading && <Loader />}
      {error && <Error>{error}</Error>}

      {currentBoard && (
        <>
          <BoardHeader>
            <BoardInfo>
              <BoardTitle>{currentBoard.name}</BoardTitle>
              <BoardId>Board ID: {currentBoard._id}</BoardId>
            </BoardInfo>

            <ButtonsContainer>
              <IconButton variant="edit" icon={EditIcon} onClick={handleEditBoard}>
                Edit
              </IconButton>
              <IconButton variant="delete" icon={DeleteIcon} onClick={handleDeleteBoard}>
                Delete
              </IconButton>
            </ButtonsContainer>
          </BoardHeader>

          <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <ColumnsWrapper>
              {(['todo', 'inprogress', 'done'] as ColumnKey[]).map((col) => (
                <BoardColumn
                  key={col}
                  droppableId={col}
                  title={COLUMN_TITLES[col]}
                  cards={getColumnCards(COLUMN_BACKEND_NAMES[col])}
                  onAddCard={() => setShowCardFormColumn(col)}
                  onEditCard={(card) => handleCardEdit(card, col)}
                  onDeleteCard={handleCardDelete}
                />
              ))}
            </ColumnsWrapper>

            <DragOverlay adjustScale={false}>
              {activeCard ? <CardItem card={activeCard} /> : null}
            </DragOverlay>
          </DndContext>
        </>
      )}

      {showBoardForm && (
        <BoardForm
          title="Create Board"
          onSubmit={handleCreateBoard}
          onClose={() => setShowBoardForm(false)}
        />
      )}

      {editBoard && (
        <BoardForm
          title="Edit Board"
          initialName={editBoard.name}
          onSubmit={(name) => {
            if (!editBoard) return;
            dispatch(updateBoard({ id: editBoard._id, name }));
            setEditBoard(null);
          }}
          onClose={() => setEditBoard(null)}
        />
      )}

      {(showCardFormColumn || editingCard) && (
        <CardForm
          initialData={editingCard || undefined}
          titleText={editingCard ? 'Update Card' : 'Create Card'}
          onSubmit={(data) => {
            if (editingCard) handleCardUpdate(editingCard, data.title, data.description);
            else if (showCardFormColumn) handleCardCreate(data.title, data.description);
          }}
          onClose={() => {
            setEditingCard(null);
            setShowCardFormColumn(null);
          }}
        />
      )}
    </Container>
  );
};

export default Home;
