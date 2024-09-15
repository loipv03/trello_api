import express from 'express'
import { cardControllers } from '../controller/card'

const cardRouter = express.Router()

cardRouter.post('/cards', cardControllers.createCard)

export default cardRouter