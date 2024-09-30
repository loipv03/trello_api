import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { ErrorResponse } from "../../middleware/errorMiddleware";
import { updateCardSchema } from "../../schema/card";
import { createError } from "../../utils/errorUtils";
import { ICard } from "../../interface/card";
import Card from "../../model/card";



const updateCard = async (req: Request, res: Response, next: NextFunction) => {
    const session = await mongoose.startSession()
    session.startTransaction()

    let errResponse: ErrorResponse

    const { error } = updateCardSchema.validate(req.body, { abortEarly: false })
    if (error) {
        errResponse = createError("Validation Error", 400, error.details.map(err => err.message))
    }

    const { positions }: ICard = req.body as ICard
    const { id } = req.params

    try {

        const card = await Card.findById(id).session(session)
        if (!card) {
            return next(createError('Card not found', 404));
        }
        const oldPosition = card.positions;

        const updateCondition = oldPosition < positions
            ? { positions: { $gt: oldPosition, $lte: positions } }
            : { positions: { $gte: positions, $lt: oldPosition } }

        const changePositions = oldPosition < positions ? -1 : 1
        await Card.updateMany(updateCondition, { $inc: { positions: changePositions } }, { session })

        const newCard = await Card.findByIdAndUpdate(id, req.body, { new: true }).session(session)

        await session.commitTransaction();
        res.status(200).json({ message: 'Update successfully', list: newCard });
    } catch (error) {
        await session.abortTransaction();
        next(error);
    } finally {
        session.endSession();
    }

}

export default updateCard