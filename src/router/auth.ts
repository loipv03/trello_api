import express from 'express'
import { authControlllers } from '../controller/auth'
import authenticate from '../middleware/authenticate'

const authRouter = express.Router()

authRouter.post('/signup', authControlllers.signup)
authRouter.post('/login', authControlllers.login)
authRouter.post('/logout', authControlllers.logout)
authRouter.get('/user/activate/?:id', authControlllers.activateUser)

export default authRouter