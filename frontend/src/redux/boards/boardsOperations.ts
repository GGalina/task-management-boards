import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/apiClient';
import { toast } from 'react-toastify';
import type { Board } from '../../types/board';

export const createBoard = createAsyncThunk<Board, string>(
    'boards/createBoard',
    async (name, { rejectWithValue }) => {
        try {
            const { data } = await api.post<Board>('/boards', { name });
            toast.success('Board created successfully!');
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
    }
);

export const fetchBoard = createAsyncThunk<Board, string>(
    'boards/fetchBoard',
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await api.get<Board>(`/boards/${id}`);
            return data;
        } catch (error: unknown) {
            let message = 'Unknown error';

            if (axios.isAxiosError(error)) {
                message = error.response?.data?.message || error.message;
            } else if (error instanceof Error) {
                message = error.message;
            }

            toast.error("Board not found");
            return rejectWithValue(message);
        }
    }
);

export const updateBoard = createAsyncThunk<Board, { id: string; name: string }>(
    'boards/updateBoard',
    async ({ id, name }, { rejectWithValue }) => {
        try {
            const { data } = await api.patch<Board>(`/boards/${id}`, { name });
            toast.success('Board updated successfully!');
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
    }
);

export const deleteBoard = createAsyncThunk<string, string>(
  'boards/deleteBoard',
  async (id, { rejectWithValue }) => {
    try{
        const { data } = await api.delete(`/boards/${id}`);
        toast.success('Board deleted successfully!');
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
    }
);


