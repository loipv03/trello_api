import { Request, Response, NextFunction } from 'express';
import List from '../../model/list';
import Board from '../../model/board';
import { listSchema } from '../../schema/list';
import { createError } from '../../utils/errorUtils';
import { IList } from '../../interface/list'

const createList = async (req: Request, res: Response, next: NextFunction) => {
    const { error } = listSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const err = createError('Validation Error', 400, error.details.map(err => err.message))
        return next(err);
    }


    try {
        const { boardId }: IList = req.body
        const boardExists = await Board.findById({ _id: boardId })
        if (!boardExists) {
            const err = createError('Board does not exist', 400)
            return next(err);
        }

        const newList = await List.create(req.body);
        res.status(201).json({
            message: 'Create successfully',
            newList
        });

        await Board.findByIdAndUpdate(
            boardId,
            { $push: { lists: newList._id } },
            { new: true }
        );

    } catch (err) {
        next(err);
    }
};

export default createList