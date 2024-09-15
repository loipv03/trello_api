import express from 'express'
import { listControllers } from '../controller/list'

const listRouter = express.Router()

listRouter.post('/list', listControllers.createList)

export default listRouter