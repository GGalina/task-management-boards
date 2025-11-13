import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';
import HttpError from '../helpers/HttpError';

export const validateIds = (ids: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        for (const id of ids) {
            const value = req.params[id];
            if (!value || !isValidObjectId(value)) {
                return next(
                    new HttpError(400, `${id} is not a valid ObjectId`),
                );
            }
        }
        next();
    };
};
