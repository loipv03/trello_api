import { Request, Response, NextFunction } from 'express';
import Card from '../../model/card';
import Comment from '../../model/comment';
import { commentSchema } from '../../schema/comment';
import { createError } from '../../utils/errorUtils';
import { ILabel } from '../../interface/label';

const createComment = async (req: Request, res: Response, next: NextFunction) => {
    const { error } = commentSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const err = createError('Validation Error', 400, error.details.map(err => err.message))
        return next(err);
    }

    try {
        const { cardId }: ILabel = req.body
        const cardExists = await Card.findById({ _id: cardId })
        if (!cardExists) {
            const err = createError('Card does not exist', 400)
            return next(err);
        }

        const newComment = await Comment.create(req.body);
        res.status(201).json({
            message: 'Create successfully',
            newComment
        });

        cardId && await Card.findByIdAndUpdate(
            cardId,
            { $push: { cards: newComment._id } },
            { new: true }
        );

    } catch (err) {
        next(err);
    }
};

export default createComment