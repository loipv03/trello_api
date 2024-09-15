import { Request, Response, NextFunction } from 'express';
import Board from '../../model/Board';
import { boardSchema } from '../../schema/board';
import { createError } from '../../utils/errorUtils';

const createBoard = async (req: Request, res: Response, next: NextFunction) => {
    const { error } = boardSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const err = createError('Validation Error', 400, error.details.map(err => err.message))
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