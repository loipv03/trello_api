import User from '../../model/user'
import bcrypt from 'bcryptjs'
import { IUser, AuthenticatedRequest } from '../../interface/user'
import { loginSchema } from '../../schema/auth'
import { Response, NextFunction } from 'express'
import { createError } from '../../utils/errorUtils'
import { ErrorResponse } from '../../middleware/errorMiddleware'
import generateToken from '../../utils/jwtUtils'

const login = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { email, password } = req.body as IUser

    let errResponse: ErrorResponse
    const { error } = loginSchema.validate(req.body, { abortEarly: false })
    if (error) {
        errResponse = createError('Validation Error', 400, error.details.map(err => err.message))
        return next(errResponse)
    }

    try {
        const user: IUser | null = await User.findOne({ email, isActive: 'true' });
        if (!user) {
            errResponse = createError("Account not found", 404)
            return next(errResponse)
        }

        const isMatch = await bcrypt.compare(password, String(user?.password))
        if (!isMatch) {
            errResponse = createError("Incorrect password", 401)
            return next(errResponse)
        }

        const access_token = generateToken(String(user?._id), '15m')
        const refresh_Token = generateToken(String(user?._id), '7d')


        res.cookie('access_token', access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'production',
            sameSite: 'none'
        });

        res.cookie('refresh_token', refresh_Token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'production',
            sameSite: 'none'
        });

        return res.status(200).json({
            message: 'Login success',
        });
    } catch (error) {
        next(error)
    }
}

export default login