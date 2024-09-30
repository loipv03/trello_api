import { Request, Response, NextFunction } from 'express';
import { createError } from '../../utils/errorUtils';
import Card from '../../model/card';

const getAllCard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { page = 1, limit = 10, sort = 'positions' } = req.query;

        const card = await Card.paginate({},
            {
                page: Number(page),
                limit: Number(limit),
                sort: { [sort as string]: 1 }
            });

        if (!card) {
            const err = createError('List not found', 404)
            return next(err)
        }

        res.status(200).json(card);
    } catch (err) {
        next(err);
    }
};

export default getAllCard;
