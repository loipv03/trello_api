import User from '../../model/user'
import { IUser, AuthenticatedRequest } from '../../interface/user'
import userSchema from '../../schema/auth'
import { Response, NextFunction } from 'express'
import { createError } from '../../utils/errorUtils'
import { ErrorResponse } from '../../middleware/errorMiddleware'
import sendEmail from '../../config/mailer'
import generateToken from '../../utils/jwtUtils'

const signup = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { name, email, } = req.body as IUser

    interface IBodySignup extends IUser {
        confirmPassword?: string
    }

    let errResponse: ErrorResponse

    let duplicate_err_message: string[] = []

    try {
        const { error } = userSchema.validate(req.body, { abortEarly: false })
        if (error) {
            errResponse = createError('Validation Error', 400, error.details.map(err => err.message))
            return next(errResponse)
        }

        const userExists = await User.findOne({ $or: [{ name }, { email }] });
        if (userExists) {
            if (userExists.name === name) {
                duplicate_err_message.push("Username has existed");
            }
            if (userExists.email === email) {
                duplicate_err_message.push("Email has existed");
            }
        }
        if (duplicate_err_message.length) {
            errResponse = createError("Duplicate", 400, duplicate_err_message)
            return next(errResponse)
        }

        const newUser = await User.create({
            ...req.body,
            confirmPassword: undefined
        } as IBodySignup)

        const origin = req.get('Origin')

        const tokenActivate = generateToken(String(newUser._id), '1d')

        await sendEmail(email, `${String(origin)}/activate/${tokenActivate}`)

        return res.status(200).json({
            message: 'Please check your email to activate your account'
        })
    } catch (error) {
        next(error)
    }
}

export default signup