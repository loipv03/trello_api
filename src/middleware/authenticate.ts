import { Response, NextFunction } from "express";
import { createError } from '../utils/errorUtils'
import jwt from 'jsonwebtoken'
import { AuthenticatedRequest, IUser } from "../interface/user";
import User from "../model/user";
import { ErrorResponse } from "./errorMiddleware";


const authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let errResponse: ErrorResponse

    const token = req.cookies?.access_token;
    if (!token) {
        errResponse = createError('Bạn phải đăng nhập để thực hiện hành động này', 401);
        return next(errResponse);
    }

    const JWT_SECRET: string = process.env.JWT_SECRET as string

    try {
        const payload = jwt.verify(token, JWT_SECRET) as { user: IUser };

        const user = await User.findById(payload?.user?._id);
        if (!user) {
            errResponse = createError("Người dùng không tồn tại", 404);
            return next(errResponse);
        }

        req.user_id = String(user._id);
        next();
    } catch (error) {
        if (error instanceof Error && error.name === "JsonWebTokenError") {
            errResponse = createError("Token không hợp lệ", 400)
            return next(errResponse)
        }

        if (error instanceof Error && error.name === "TokenExpiredError") {
            errResponse = createError("Token đã hết hạn", 400)
            return next(errResponse)
        }
        next(error)
    }
}

export default authenticate