import { Error as MongooseError } from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import HttpError from './HttpError';

const handleMongooseError = (
    error: unknown,
    _req: Request,
    _res: Response,
    next: NextFunction
) => {
    if (error instanceof MongooseError.ValidationError) {
        next(new HttpError(400, error.message));
    } else if (
        typeof error === 'object' &&
        error !== null &&
        'name' in error &&
        (error as any).name === 'MongoServerError' &&
        'code' in error &&
        (error as any).code === 11000
    ) {
        next(new HttpError(409, 'Duplicate key error'));
    } else {
        next(new HttpError(500, 'Database error'));
    }
};

export default handleMongooseError;
