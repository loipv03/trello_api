import { Response, NextFunction } from 'express';
import { AuthenticatedRequest, IUser } from '../../interface/user'
import Board from '../../model/board';
import { createError } from '../../utils/errorUtils'
import { ErrorResponse } from '../../middleware/errorMiddleware';
import { IBoard } from '../../interface/board';
import User from '../../model/user';
import { updateworkspaceSchema } from '../../schema/workspace';
import { IWorkspace } from '../../interface/workspace';
import Workspace from '../../model/workspace';

const updateWorkspace = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userId: string = req.user_id as string

    let errResponse: ErrorResponse

    const { error } = updateworkspaceSchema.validate(req.body, { abortEarly: false });
    if (error) {
        errResponse = createError('Validation Error', 400, error.details.map(err => err.message));
        return next(errResponse);
    }

    try {
        const { id } = req.params;
        const workspace: IWorkspace = req.body as IWorkspace;

        const userIds = workspace.members.map(member => member.userId.toString())

        const existingUsers: IUser[] = await User.find({ _id: { $in: userIds } });


        const existingUserIds = existingUsers.map(user => String(user._id))

        const nonExistentUserIds = userIds.filter(userId => !existingUserIds.includes(userId));

        if (nonExistentUserIds.length > 0) {
            return res.status(400).json({
                error: `The following userId do not exist: ${nonExistentUserIds.join(', ')}`
            });
        }

        const updateWorkspace = await Workspace.findOneAndUpdate(
            {
                _id: id,
                members: { $elemMatch: { userId: userId, role: 'admin' } }
            },
            workspace, { new: true });

        if (!updateWorkspace) {
            errResponse = createError('Workspace not found or you do not have permission to edit.', 404)
            return next(errResponse)
        }

        res.status(200).json({
            message: 'update successfully',
            updateWorkspace
        });
    } catch (err) {
        next(err);
    }
}

export default updateWorkspace