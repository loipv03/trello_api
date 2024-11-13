import { Response, NextFunction } from "express";
import { createError } from '../utils/errorUtils'
import jwt from 'jsonwebtoken'
import { AuthenticatedRequest, IUser } from "../interface/user";
import User from "../model/user";
import { ErrorResponse } from "./errorMiddleware";


const authenticate = async (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
    let errResponse: ErrorResponse

    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
        errResponse = createError('You must log in to perform this action.', 401);
        return next(errResponse);
    }

    const JWT_SECRET: string = process.env.JWT_SECRET as string

    try {
        const payload = jwt.verify(token, JWT_SECRET) as { user: IUser };

        const user = await User.findById(payload?.user?._id);
        if (!user) {
            errResponse = createError("User does not exist", 404);
            return next(errResponse);
        }

        req.user_id = String(user._id);
        next();
    } catch (error) {
        if (error instanceof Error && error.name === "JsonWebTokenError") {
            errResponse = createError("Invalid Token", 400)
            return next(errResponse)
        }

        if (error instanceof Error && error.name === "TokenExpiredError") {
            errResponse = createError("Token has expired", 400)
            return next(errResponse)
        }
        next(error)
    }
}

export default authenticate