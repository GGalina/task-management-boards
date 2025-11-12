import { Error as MongooseError } from 'mongoose';
import { NextFunction } from 'express';
import HttpError from './HttpError';

const handleMongooseError = (
    error: any,
    _req: any,
    _res: any,
    next: NextFunction
    ) => {
    if (error instanceof MongooseError.ValidationError) {
        next(new HttpError(400, error.message));
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
        next(new HttpError(409, 'Duplicate key error'));
    } else {
        next(new HttpError(500, 'Database error'));
    }
};

export default handleMongooseError;
