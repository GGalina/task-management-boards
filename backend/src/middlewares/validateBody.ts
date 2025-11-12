import { Request, Response, NextFunction } from 'express';
import HttpError from '../helpers/HttpError';
import Joi from 'joi';

export const validateBody = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.body || Object.keys(req.body).length === 0) {
            return next(new HttpError(400, 'Missing fields in request body'));
        }

        // Validate with Joi
        const { error } = schema.validate(req.body, { abortEarly: true });
        if (error) {
            return next(
                new HttpError(400, `Missing or invalid field: ${error.details[0].path.join('.')}`)
            );
        }

        next();
    };
};
