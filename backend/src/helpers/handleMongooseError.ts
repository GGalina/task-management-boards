import { Error as MongooseError } from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import HttpError from './HttpError';

// Type guard for MongoServerError
const isMongoServerError = (error: unknown): error is { name: string; code: number } => {
    return (
        typeof error === 'object' &&
        error !== null &&
        'name' in error &&
        'code' in error &&
        (error as { name: unknown; code: unknown }).name === 'MongoServerError' &&
        (error as { name: unknown; code: unknown }).code === 11000
    );
};

const handleMongooseError = (
    error: unknown,
    _req: Request,
    _res: Response,
    next: NextFunction
) => {
    if (error instanceof MongooseError.ValidationError) {
        next(new HttpError(400, error.message));
    } else if (isMongoServerError(error)) {
        next(new HttpError(409, 'Duplicate key error'));
    } else {
        next(new HttpError(500, 'Database error'));
    }
};

export default handleMongooseError;
