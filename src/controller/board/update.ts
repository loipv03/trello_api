import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../interface/user'
import Board from '../../model/Board';
import { boardSchema, updateBoardSchema } from '../../schema/board';
import mongoose from 'mongoose';
import { createError } from '../../utils/errorUtils'
import { ErrorResponse } from '../../middleware/errorMiddleware';
import { IBoard } from '../../interface/board';

const updateBoard = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userId: string = req.user_id as string

    let errResponse: ErrorResponse

    const { error } = updateBoardSchema.validate(req.body, { abortEarly: false });
    if (error) {
        errResponse = createError('Validation Error', 400, error.details.map(err => err.message));
        return next(errResponse);
    }

    try {
        const { id } = req.params;
        const updateData: IBoard = req.body as IBoard;

        const board = await Board.findOne({
            _id: id,
            members: { $elemMatch: { userId: userId, role: 'admin' } }
        });

        if (!board) {
            errResponse = createError('Board not found or you do not have permission to edit.', 404)
            return next(errResponse)
        }

        const updateBoard = await Board.findByIdAndUpdate(id, updateData, { new: true });

        res.status(200).json({
            message: 'update successfully',
            updateBoard
        });
    } catch (err) {
        next(err);
    }
}

export default updateBoard