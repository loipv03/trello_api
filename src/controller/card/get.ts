import { Request, Response, NextFunction } from 'express';
import { createError } from '../../utils/errorUtils';
import Card from '../../model/card';

const getOneCard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const card = await Card.findById(id).populate('labels').populate('attachments').populate('comments');

        if (!card) {
            const err = createError('List not found', 404)
            return next(err)
        }

        res.status(200).json(card);
    } catch (err) {
        next(err);
    }
};

export default getOneCard;
