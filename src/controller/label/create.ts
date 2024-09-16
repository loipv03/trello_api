import { Request, Response, NextFunction } from 'express';
import Card from '../../model/card';
import Label from '../../model/label';
import { labelSchema } from '../../schema/label';
import { createError } from '../../utils/errorUtils';
import { ILabel } from '../../interface/label';

const createLabel = async (req: Request, res: Response, next: NextFunction) => {
    const { error } = labelSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const err = createError('Validation Error', 400, error.details.map(err => err.message))
        return next(err);
    }

    try {
        const { cardId }: ILabel = req?.body
        if (cardId) {
            const cardExists = await Card.findById({ _id: cardId })
            if (!cardExists) {
                const err = createError('Card does not exist', 400)
                return next(err);
            }
        }

        const newLabel = await Label.create(req.body);
        res.status(201).json({
            message: 'Create successfully',
            newLabel
        });

        cardId && await Card.findByIdAndUpdate(
            cardId,
            { $push: { cards: newLabel._id } },
            { new: true }
        );

    } catch (err) {
        next(err);
    }
};

export default createLabel