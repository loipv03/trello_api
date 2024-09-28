import { Request, Response, NextFunction } from 'express';
import Card from '../../model/card';
import List from '../../model/list';
import { cardSchema } from '../../schema/card';
import { createError } from '../../utils/errorUtils';
import { IList } from '../../interface/list'
import { ICard } from '../../interface/card';
import Board from '../../model/board';

const createCard = async (req: Request, res: Response, next: NextFunction) => {
    const { error } = cardSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const err = createError('Validation Error', 400, error.details.map(err => err.message))
        return next(err);
    }

    try {
        const { listId, boardId }: ICard = req.body
        const listExists = await List.findById({ _id: listId })
        if (!listExists) {
            const err = createError('List does not exist', 400)
            return next(err);
        }

        const newCard = await Card.create({
            ...req.body as ICard,
            startDate: new Date()
        } as ICard);
        res.status(201).json({
            message: 'Create successfully',
            newCard
        });

        await List.findByIdAndUpdate(
            listId,
            { $push: { cards: newCard._id } },
            { new: true }
        );
        await Board.findByIdAndUpdate(
            boardId,
            { $push: { cards: newCard._id } },
            { new: true }
        );

    } catch (err) {
        next(err);
    }
};

export default createCard