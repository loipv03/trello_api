import express from 'express'
import { authControlllers } from '../controller/auth'
import authenticate from '../middleware/authenticate'
import upload from '../config/cloudinary'

const authRouter = express.Router()

authRouter.post('/signup', authControlllers.signup)
authRouter.post('/login', authControlllers.login)
authRouter.post('/logout', authenticate, authControlllers.logout)
authRouter.patch('/uploadAvatar', authenticate, upload.single('avatar'), authControlllers.uploadAvatar)
authRouter.get('/activate/?:token', authControlllers.activateUser)

export default authRouter