import express from 'express'
import { commentControllers } from '../controller/comment'

const commentRouter = express.Router()

commentRouter.post('/comment', commentControllers.createComment)

export default commentRouter