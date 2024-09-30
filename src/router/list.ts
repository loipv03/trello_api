import express from 'express'
import { listControllers } from '../controller/list'

const listRouter = express.Router()

listRouter.get('/lists', listControllers.getAllList)
listRouter.get('/list/:id', listControllers.getOneList)
listRouter.post('/list', listControllers.createList)
listRouter.patch('/list/:id', listControllers.updateList)
listRouter.delete('/list/:id', listControllers.deleteList)

export default listRouter