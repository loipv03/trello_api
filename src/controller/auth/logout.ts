import { Response, NextFunction, Request } from "express";

const logout = (_req: Request, res: Response, next: NextFunction) => {
    try {
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
