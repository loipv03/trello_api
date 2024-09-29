import { Request, Response, NextFunction } from 'express';
import Board from '../../model/board';
import { createError } from '../../utils/errorUtils';

const getOneBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const board = await Board.findById(id).populate('members').populate('lists').populate('cards');

        if (!board) {
            const err = createError('Board not found', 404)
            return next(err)
        }

        res.status(200).json(board);
    } catch (err) {
        next(err);
    }
};

export default getOneBoard;
