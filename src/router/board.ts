import express from 'express'
import authenticate from '../middleware/authenticate'
import { boardControllers } from '../controller/board'

const boardRouter = express.Router()

boardRouter.post('/board', authenticate, boardControllers.createBoard)
boardRouter.get('/boards', boardControllers.getAllBoard)
boardRouter.get('/board/:id', boardControllers.getOneBoard)
boardRouter.patch('/board/:id', boardControllers.updateBoard)
boardRouter.delete('/board/:id', boardControllers.deleteBoard)

export default boardRouter