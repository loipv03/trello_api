import express from 'express'
import { boardControllers } from '../controller/board'

const boardRouter = express.Router()

boardRouter.post('/board', boardControllers.createBoard)
boardRouter.get('/board', boardControllers.getAllBoard)
boardRouter.get('/board', boardControllers.getOneBoard)
boardRouter.patch('/board', boardControllers.createBoard)
boardRouter.delete('/board', boardControllers.createBoard)

export default boardRouter