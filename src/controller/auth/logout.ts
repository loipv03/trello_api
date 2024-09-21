import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../../interface/user";
import { ErrorResponse } from "../../middleware/errorMiddleware";
import { createError } from "../../utils/errorUtils";

const logout = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let errResponse: ErrorResponse

    try {
        const token = req.cookies?.access_token;

        if (!token) {
            errResponse = createError("Người dùng chưa đăng nhập hoặc đã hết hạn phiên", 400)
            return next(errResponse)
        }

        res.clearCookie('access_token', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
        });

        res.clearCookie('refresh_token', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
        });

        return res.status(200).json({
            message: "Logout sucsess",
        });

    } catch (error) {
        next(error);
    }
};

export default logout;
