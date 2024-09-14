import { Request, Response, NextFunction } from 'express';
import Board from '../../model/Board';
import mongoose from 'mongoose';

const deleteBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid board ID' });
        }

        const result = await Board.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'Board not found' });
        }

        res.status(200).json({ message: 'Board deleted successfully' });
    } catch (err) {
        next(err);
    }
}

export default deleteBoard