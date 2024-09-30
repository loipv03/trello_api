import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import List from '../../model/list';
import { createError } from '../../utils/errorUtils';
import { updateListSchema } from '../../schema/list';
import { ErrorResponse } from '../../middleware/errorMiddleware';

const updateList = async (req: Request, res: Response, next: NextFunction) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    let errResponse: ErrorResponse

    const { positions } = req.body;
    const { id } = req.params

    const { error } = updateListSchema.validate(req.body, { abortEarly: false })
    if (error) {
        errResponse = createError("Validation Error", 400, error.details.map(err => err.message))
        return next(errResponse)
    }

    try {
        const list = await List.findById(id);
        if (!list) {
            return next(createError('List not found', 404));
        }
        const oldPositions = list.positions;

        const updateCondition = oldPositions < positions
            ? { positions: { $gt: oldPositions, $lte: positions } }
            : { positions: { $gte: positions, $lt: oldPositions } }

        const changePositions = oldPositions < positions ? -1 : 1

        await List.updateMany(updateCondition, { $inc: { positions: changePositions } }, { session })

        const newList = await List.findByIdAndUpdate(id, req.body, { new: true }).session(session)

        await session.commitTransaction();
        res.status(200).json({ message: 'Update successfully', list: newList });
    } catch (err) {
        await session.abortTransaction();
        next(err);
    } finally {
        session.endSession();
    }
};

export default updateList;
