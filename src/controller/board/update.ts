import { Response, NextFunction } from 'express';
import { AuthenticatedRequest, IUser } from '../../interface/user'
import Board from '../../model/board';
import { updateBoardSchema } from '../../schema/board';
import { createError } from '../../utils/errorUtils'
import { ErrorResponse } from '../../middleware/errorMiddleware';
import { IBoard } from '../../interface/board';
import User from '../../model/user';

const updateBoard = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let errResponse: ErrorResponse

    try {
        const userId: string = req.user_id as string
        const { id } = req.params;
        const board: IBoard = req.body as IBoard;

        const { error } = updateBoardSchema.validate(board, { abortEarly: false });
        if (error) {
            errResponse = createError('Validation Error', 400, error.details.map(err => err.message));
            return next(errResponse);
        }

        const userIds = board.members.map(member => member.userId.toString())

        const existingUsers: IUser[] = await User.find({ _id: { $in: userIds } });


        const existingUserIds = existingUsers.map(user => String(user._id))

        const nonExistentUserIds = userIds.filter(userId => !existingUserIds.includes(userId));

        if (nonExistentUserIds.length > 0) {
            return res.status(400).json({
                error: `The following userId do not exist: ${nonExistentUserIds.join(', ')}`
            });
        }

        const updateBoard = await Board.findOneAndUpdate(
            {
                _id: id,
                members: { $elemMatch: { userId: userId, role: 'admin' } }
            },
            board, { new: true });

        if (!updateBoard) {
            errResponse = createError('Board not found or you do not have permission to edit.', 404)
            return next(errResponse)
        }

        res.status(200).json({
            message: 'update successfully',
            updateBoard
        });
    } catch (err) {
        next(err);
    }
}

export default updateBoard