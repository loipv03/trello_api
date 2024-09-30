import { Request, Response, NextFunction } from 'express';
import { createError } from '../../utils/errorUtils';
import List from '../../model/list';

const getOneList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const list = await List.findById(id).populate('cards');

        if (!list) {
            const err = createError('List not found', 404)
            return next(err)
        }

        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
};

export default getOneList;
