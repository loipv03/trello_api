import { Request, Response, NextFunction } from 'express';
import Board from '../../model/Board';
import { boardSchema } from '../../schema/board';
import { ErrorResponse } from '../../middleware/errorMiddleware';

const createBoard = async (req: Request, res: Response, next: NextFunction) => {
    const { error } = boardSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const err: ErrorResponse = new Error('Validation Error');
        err.statusCode = 400;
        err.errors = error.details.map(err => err.message);
        return next(err);
    }

    try {
        const newBoard = await Board.create(req.body);
        res.status(201).json({
            message: 'Create successfully',
            newBoard
        });
    } catch (err) {
        next(err);
    }
};

export default createBoard