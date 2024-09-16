import { Request, Response, NextFunction } from 'express';
import Board from '../../model/Board';
import mongoose from 'mongoose';
import { createError } from '../../utils/errorUtils';


const deleteBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            const err = createError('Invalid id', 400)
            return next(err);
        }

        const result = await Board.findByIdAndDelete(id);

        if (!result) {
            const err = createError('Board not found', 404)
            return next(err);
        }

        res.status(200).json({ message: 'Board deleted successfully' });
    } catch (err) {
        next(err);
    }
}

export default deleteBoard