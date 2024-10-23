import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../../interface/user";

const checkLogin = (_req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        return res.status(200).json({
            message: "ok",
        });
    } catch (error) {
        next(error)
    }
}

export default checkLogin