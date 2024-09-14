import { Request, Response, NextFunction } from 'express';

export interface ErrorResponse extends Error {
    statusCode?: number;
    errors?: string[];
}

const errorHandler = (err: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    const errors = err.errors || [];

    return res.status(statusCode).json({
        message,
        errors: errors.length ? errors : undefined,
    });
};

export default errorHandler;
