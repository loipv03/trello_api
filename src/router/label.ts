import express from 'express'
import { labelControllers } from '../controller/label'

const labelRouter = express.Router()

labelRouter.post('/label', labelControllers.createLabel)

export default labelRouter