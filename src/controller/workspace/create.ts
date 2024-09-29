import { Response, NextFunction } from "express";
import workspaceSchema from "../../schema/workspace";
import { createError } from "../../utils/errorUtils";
import Workspace from "../../model/workspace";
import { IWorkspace } from "../../interface/workspace";
import { AuthenticatedRequest } from "../../interface/user";

const createWorkspace = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userId: string = req.user_id as string

    const { error } = workspaceSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const err = createError('Validation Error', 400, error.details.map(err => err.message))
        return next(err);
    }
    try {
        const newWorkspace = await Workspace.create({
            ...req.body,
            members: [
                {
                    userId,
                    role: 'admin'
                }
            ]
        } as IWorkspace)

        return res.status(201).json({
            message: "Workspace created successfully",
            workspace: newWorkspace
        });
    } catch (error) {
        next(error)
    }
}

export default createWorkspace