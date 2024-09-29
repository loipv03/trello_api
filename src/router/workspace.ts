import express from 'express'
import { workspaceControllers } from '../controller/workspace'
import authenticate from '../middleware/authenticate'

const workspaceRouter = express.Router()

workspaceRouter.post('/workspace', authenticate, workspaceControllers.createWorkspace)
workspaceRouter.patch('/workspace/:id', authenticate, workspaceControllers.updateWorkspace)
workspaceRouter.delete('/workspace/:id', authenticate, workspaceControllers.deleteWorkspace)
workspaceRouter.get('/workspaces', authenticate, workspaceControllers.getAllWorkspace)
workspaceRouter.get('/workspace/:id', authenticate, workspaceControllers.getOneWorkspace)

export default workspaceRouter