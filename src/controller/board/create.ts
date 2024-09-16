import { Request, Response, NextFunction } from 'express';
import Board from '../../model/Board';
import List from '../../model/list';
import { boardSchema } from '../../schema/board';
import { createError } from '../../utils/errorUtils';

const createBoard = async (req: Request, res: Response, next: NextFunction) => {
    const { error } = boardSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const err = createError('Validation Error', 400, error.details.map(err => err.message))
        return next(err);
    }

    try {
        const newBoard = await Board.create(req.body);

        const defaultLists = ['Todo', 'InProgress', 'Done'];
        const listIds: string[] = []

        for (const listName of defaultLists) {
            const list = await List.create({ name: listName, boardId: newBoard._id });
            listIds.push(String(list._id));
        }

        newBoard.lists = listIds
        await newBoard.save()

        res.status(201).json({
            message: 'Create successfully',
            newBoard
        });
    } catch (err) {
        next(err);
    }
};

export default createBoard