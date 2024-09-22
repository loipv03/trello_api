import { Request, Response, NextFunction } from 'express';
import Board from '../../model/board';

const getAllBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const boards = await Board.paginate({}, { page: Number(page), limit: Number(limit) });

        res.status(200).json(boards);
    } catch (err) {
        next(err);
    }
}

export default getAllBoard