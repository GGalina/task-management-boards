import { Schema, model } from 'mongoose';
import Joi from 'joi';
import { IBoard, IColumn, ICard } from '../types/board';

export const COLUMN_NAMES = ['ToDo', 'In Progress', 'Done'] as const;

// --- Subschemas ---
const cardSchema = new Schema<ICard>(
    {
        title: { type: String, required: true },
        description: { type: String, default: '' },
    },
    {
        _id: true,
    },
);

const columnSchema = new Schema<IColumn>(
    {
        name: { type: String, enum: COLUMN_NAMES, required: true },
        cards: { type: [cardSchema], default: [] },
    },
    {
        _id: false,
    },
);

// --- Main Board Schema ---
const boardSchema = new Schema<IBoard>(
    {
        name: { type: String, required: true },
        columns: {
            type: [columnSchema],
            default: COLUMN_NAMES.map((name) => ({ name, cards: [] })),
        },
    },
    {
        versionKey: false,
        timestamps: true,
    },
);

// --- Joi Schemas ---
export const boardAddSchema = Joi.object({ name: Joi.string().required() });
export const boardUpdateSchema = Joi.object({ name: Joi.string().required() });

export const cardAddSchema = Joi.object({
    columnName: Joi.string()
        .valid(...COLUMN_NAMES)
        .required(),
    title: Joi.string().required(),
    description: Joi.string().allow(''),
});

export const cardUpdateSchema = Joi.object({
    columnName: Joi.string()
        .valid(...COLUMN_NAMES)
        .required(),
    title: Joi.string().required(),
    description: Joi.string().allow(''),
});

export const cardMoveSchema = Joi.object({
    fromColumn: Joi.string()
        .valid(...COLUMN_NAMES)
        .required(),
    toColumn: Joi.string()
        .valid(...COLUMN_NAMES)
        .required(),
    toIndex: Joi.number().min(0),
});

export const schemas = {
    boardAddSchema,
    boardUpdateSchema,
    cardAddSchema,
    cardUpdateSchema,
    cardMoveSchema,
};

// --- Model ---
export const Board = model<IBoard>('Board', boardSchema);
