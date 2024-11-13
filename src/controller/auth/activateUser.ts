import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../../middleware/errorMiddleware';
import User from '../../model/user';
import { IUser } from '../../interface/user'
import { createError } from '../../utils/errorUtils';
import jwt from 'jsonwebtoken'
import generateToken from '../../utils/jwtUtils';

interface IToken {
    user: { _id: string },
}

const activateUser = async (req: Request, res: Response, next: NextFunction) => {
    let errResponse: ErrorResponse

    try {
        const { token } = req.params
        const payload = jwt.verify(token, String(process.env.JWT_SECRET)) as unknown as IToken

        const user = await User.findOneAndUpdate(
            { _id: payload.user._id, isActive: false },
            { $set: { isActive: true } },
            { new: true }
        ) as IUser

        if (!user) {
            errResponse = createError('Account not found or has already been activated.', 404)
            return next(errResponse)
        }

        const access_token = generateToken(String(user?._id), '15m')
        const refresh_token = generateToken(String(user?._id), '7d')

        return res.status(200).json({
            message: "Account activation successful",
            data: {
                access_token,
                refresh_token
            },
        });
    } catch (error) {
        if (error instanceof Error && error.name === "JsonWebTokenError") {
            errResponse = createError("Invalid Token.", 400)
            return next(errResponse)
        }

        if (error instanceof Error && error.name === "TokenExpiredError") {
            errResponse = createError("Token has expired.", 400)
            return next(errResponse)
        }
        next(error)
    }
}

export default activateUser