import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../../middleware/errorMiddleware';
import User from '../../model/user';
import { createError } from '../../utils/errorUtils';

const activateUser = async (req: Request, res: Response, next: NextFunction) => {
    let errResponse: ErrorResponse

    try {
        const { id } = req.params
        const user = await User.findOneAndUpdate(
            { _id: id, isActive: false },
            { $set: { isActive: true } },
            { new: true }
        );

        if (!user) {
            errResponse = createError('Account not found', 404)
            return next(errResponse)
        }

        return res.status(200).json({
            message: "Account activation successful"
        });

    } catch (error) {
        next(error)
    }
}

export default activateUser