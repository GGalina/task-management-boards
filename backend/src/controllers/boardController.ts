import { Request, Response, NextFunction } from 'express';
import { Board } from '../models/board';
import handleMongooseError from '../helpers/handleMongooseError';
import HttpError from '../helpers/HttpError';
import { IBoard, IDragDropRequest } from '../types/board';

// --- Boards ---
export const createBoard = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const board = await Board.create({ name: req.body.name });

        res.status(201).json(board);
    } catch (err: unknown) {
        if (err instanceof HttpError) {
            next(err);
        } else {
            handleMongooseError(err, req, res, next);
        }
    }
};

export const getBoardById = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { boardId } = req.params;
        const board = await Board.findById(boardId);
        if (!board) throw new HttpError(404, 'Board not found');

        res.json(board);
    } catch (err: unknown) {
        if (err instanceof HttpError) {
            next(err);
        } else {
            handleMongooseError(err, req, res, next);
        }
    }
};

export const updateBoard = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { boardId } = req.params;
        const board = await Board.findByIdAndUpdate(boardId, req.body, {
            new: true,
        });
        if (!board) throw new HttpError(404, 'Board not found');

        res.json(board);
    } catch (err: unknown) {
        if (err instanceof HttpError) {
            next(err);
        } else {
            handleMongooseError(err, req, res, next);
        }
    }
};

export const deleteBoard = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { boardId } = req.params;
        const board = await Board.findByIdAndDelete(boardId);
        if (!board) throw new HttpError(404, 'Board not found');

        res.status(200).json({ message: 'The board is deleted successfully' });
    } catch (err: unknown) {
        if (err instanceof HttpError) {
            next(err);
        } else {
            handleMongooseError(err, req, res, next);
        }
    }
};

// --- Cards ---
export const addCard = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { boardId } = req.params;
        const { columnName, title, description } = req.body;

        const board = await Board.findById(boardId);
        if (!board) throw new HttpError(404, 'Board not found');

        const column = board.columns.find((col) => col.name === columnName);
        if (!column) throw new HttpError(400, 'Invalid column name');

        column.cards.push({ title, description: description || '' });
        await board.save();

        res.status(201).json(board);
    } catch (err: unknown) {
        if (err instanceof HttpError) {
            next(err);
        } else {
            handleMongooseError(err, req, res, next);
        }
    }
};

export const updateCard = async (
    req: Request<
        { boardId: string; cardId: string },
        unknown,
        { title?: string; description?: string; columnName?: string }
    >,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { boardId, cardId } = req.params;
        const { title, description, columnName } = req.body;

        const board = await Board.findById(boardId);
        if (!board) throw new HttpError(404, 'Board not found');

        // Find current column containing the card
        const currentColumn = board.columns.find((col) => col.cards.id(cardId));
        if (!currentColumn) throw new HttpError(404, 'Card not found');

        const card = currentColumn.cards.id(cardId);
        if (!card) throw new HttpError(404, 'Card not found');

        // Update card fields
        if (title !== undefined) card.title = title;
        if (description !== undefined) card.description = description;

        // Move card to another column if requested
        if (columnName && columnName !== currentColumn.name) {
            const targetColumn = board.columns.find(
                (col) => col.name === columnName,
            );
            if (!targetColumn)
                throw new HttpError(400, 'Invalid target column');

            // Remove from current column
            currentColumn.cards.pull(card._id);

            // Push a new object into target column with same id
            targetColumn.cards.push({
                _id: card._id,
                title: card.title,
                description: card.description,
            });
        }

        await board.save();
        res.json(board);
    } catch (err: unknown) {
        if (err instanceof HttpError) {
            next(err);
        } else {
            handleMongooseError(err, req, res, next);
        }
    }
};

export const deleteCard = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { boardId, cardId } = req.params;

        const board = await Board.findById(boardId);
        if (!board) throw new HttpError(404, 'Board not found');

        // Find which column contains this card
        const column = board.columns.find((col) =>
            col.cards.some((card) => card._id.equals(cardId)),
        );
        if (!column) throw new HttpError(404, 'Card not found');

        // Remove the card
        column.cards.id(cardId)?.deleteOne();

        await board.save();

        res.status(200).json(board);
    } catch (err: unknown) {
        if (err instanceof HttpError) {
            next(err);
        } else {
            handleMongooseError(err, req, res, next);
        }
    }
};

// --- Drag and Drop ---
export const moveCard = async (
    req: Request<
        { boardId: string; cardId: string },
        unknown,
        IDragDropRequest
    >,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { boardId, cardId } = req.params;
        const { fromColumn, toColumn, toIndex } = req.body;

        if (!fromColumn || !toColumn)
            throw new HttpError(400, 'Missing required fields');

        // Find board
        const board: IBoard | null = await Board.findById(boardId);
        if (!board) throw new HttpError(404, 'Board not found');

        // Find source and target columns
        const sourceCol = board.columns.find((c) => c.name === fromColumn);
        const targetCol = board.columns.find((c) => c.name === toColumn);
        if (!sourceCol || !targetCol)
            throw new HttpError(400, 'Column not found');

        // Find the card in source column
        const card = sourceCol.cards.id(cardId);
        if (!card) throw new HttpError(404, 'Card not found');

        // Remove from source
        sourceCol.cards.pull(card._id);

        // Insert into target at toIndex or at the end
        if (
            typeof toIndex === 'number' &&
            toIndex >= 0 &&
            toIndex <= targetCol.cards.length
        ) {
            targetCol.cards.splice(toIndex, 0, card);
        } else {
            targetCol.cards.push(card);
        }

        // Save the updated board
        await board.save();

        res.json(board);
    } catch (err: unknown) {
        if (err instanceof HttpError) {
            next(err);
        } else {
            handleMongooseError(err, req, res, next);
        }
    }
};
