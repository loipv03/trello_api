import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import List from '../../model/list';
import { createError } from '../../utils/errorUtils';

const updateList = async (req: Request, res: Response, next: NextFunction) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { positions } = req.body;
        const { id } = req.params
        const list = await List.findById(id);
        if (!list) {
            return next(createError('List not found', 404));
        }
        const oldPosition = list.positions;


        const updateCondition = oldPosition < positions
            ? { positions: { $gt: oldPosition, $lte: positions } }
            : { positions: { $gte: positions, $lt: oldPosition } }

        const changePositions = oldPosition < positions ? -1 : 1

        await Promise.all([
            List.findByIdAndUpdate(id, req.body, { new: true }).session(session),
            List.updateMany(updateCondition, { $inc: { positions: changePositions } }, { session })
        ])

        await session.commitTransaction();
        res.status(200).json({ message: 'List moved successfully', list: list });
    } catch (err) {
        await session.abortTransaction();
        next(err);
    } finally {
        session.endSession();
    }
};

export default updateList;
