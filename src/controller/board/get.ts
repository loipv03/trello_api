import { Request, Response, NextFunction } from 'express';
import Board from '../../model/Board';

const getOneBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const board = await Board.findById(id).populate('members').populate('lists');

        if (!board) {
            return res.status(404).json({ message: 'Board not found' });
        }

        res.status(200).json(board);
    } catch (err) {
        next(err);
    }
};

export default getOneBoard;
