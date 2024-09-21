import express from 'express'
import { authControlllers } from '../controller/auth'

const authRouter = express.Router()

authRouter.post('/signup', authControlllers.signup)
authRouter.post('/login', authControlllers.login)
authRouter.post('/logout', authControlllers.logout)

export default authRouter