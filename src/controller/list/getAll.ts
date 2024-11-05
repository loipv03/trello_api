import { Request, Response, NextFunction } from 'express';
import List from '../../model/list';

const getAllList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const { docs: lists } = await List.paginate({}, { page: Number(page), limit: Number(limit) });

        res.status(200).json(lists);
    } catch (err) {
        next(err);
    }
}

export default getAllList