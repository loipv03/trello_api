import { Request, Response, NextFunction } from 'express';
import Workspace from '../../model/workspace';

const getAllWorkspace = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const workspace = await Workspace.paginate({}, { page: Number(page), limit: Number(limit) });

        res.status(200).json(workspace);
    } catch (err) {
        next(err);
    }
}

export default getAllWorkspace