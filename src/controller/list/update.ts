import { Request, Response, NextFunction } from 'express';
import Board from '../../model/board';
import { boardSchema } from '../../schema/board';
import mongoose from 'mongoose';
import { createError } from '../../utils/errorUtils'

const updateBoard = async (req: Request, res: Response, next: NextFunction) => {
    const { error } = boardSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const err = createError('Validation Error', 400, error.details.map(err => err.message));
        return next(err);
    }

    try {
        const { id } = req.params;
        const updateData = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid board ID' });
        }

        const board = await Board.findByIdAndUpdate(id, updateData, { new: true });

        if (!board) {
            return res.status(404).json({ message: 'Board not found' });
        }

        res.status(200).json({
            message: 'update successfully',
            board
        });
    } catch (err) {
        next(err);
    }
}

export default updateBoard