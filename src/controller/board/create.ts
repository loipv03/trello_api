import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../interface/user'
import Board from '../../model/board';
import List from '../../model/list';
import { boardSchema } from '../../schema/board';
import { createError } from '../../utils/errorUtils';
import { IBoard } from '../../interface/board';

const createBoard = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userId: string = req.user_id as string
    const { error } = boardSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const err = createError('Validation Error', 400, error.details.map(err => err.message))
        return next(err);
    }

    try {
        const newBoard = await Board.create({
            ...req.body,
            members: [
                {
                    userId,
                    role: 'admin'
                }
            ]
        } as IBoard);

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