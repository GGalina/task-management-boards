import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/apiClient';
import type { Board } from '../../types/board';
import { toast } from 'react-toastify';
import type {
  CreateCardPayload,
  UpdateCardPayload,
  DeleteCardPayload,
  MoveCardPayload,
} from './reduxCardTypes';

export const createCard = createAsyncThunk<Board, CreateCardPayload>(
  'cards/createCard',
  async ({ boardId, columnName, title, description }, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/boards/${boardId}/cards`, {
        columnName,
        title,
        description,
      });
      toast.success('Card created successfully!');
      return data;
    } catch (error: unknown) {
      let message = 'Unknown error';
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const updateCard = createAsyncThunk<Board, UpdateCardPayload>(
  'cards/updateCard',
  async ({ boardId, cardId, columnName, title, description }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/boards/${boardId}/cards/${cardId}`, {
        columnName,
        title,
        description,
      });
      toast.success('Card updated successfully!');
      return data;
    } catch (error: unknown) {
      let message = 'Unknown error';
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const deleteCard = createAsyncThunk<Board, DeleteCardPayload>(
  'cards/deleteCard',
  async ({ boardId, cardId }, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/boards/${boardId}/cards/${cardId}`);
      toast.success('Card deleted successfully!');
      return data;
    } catch (error: unknown) {
      let message = 'Unknown error';
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const moveCard = createAsyncThunk<Board, MoveCardPayload>(
  'cards/moveCard',
  async ({ boardId, cardId, fromColumn, toColumn, toIndex }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/boards/${boardId}/cards/${cardId}/move`, {
        fromColumn,
        toColumn,
        toIndex,
      });
      return data;
    } catch (error: unknown) {
      let message = 'Unknown error';
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      return rejectWithValue(message);
    }
  },
);
