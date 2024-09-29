import { Request, Response, NextFunction } from 'express';
import Workspace from '../../model/workspace';
import { createError } from '../../utils/errorUtils';

const getOneWorkspace = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const workspace = await Workspace.findById(id).populate('members').populate('boards');

        if (!workspace) {
            const err = createError('Workspace not found', 404)
            return next(err)
        }

        res.status(200).json(workspace);
    } catch (err) {
        next(err);
    }
};

export default getOneWorkspace;
