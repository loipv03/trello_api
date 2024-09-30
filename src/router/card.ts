import express from 'express'
import { cardControllers } from '../controller/card'

const cardRouter = express.Router()

cardRouter.get('/cards', cardControllers.getAllCard)
cardRouter.get('/card/:id', cardControllers.getOneCard)
cardRouter.post('/cards', cardControllers.createCard)
cardRouter.patch('/card/:id', cardControllers.updateCard)

export default cardRouter