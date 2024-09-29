import createWorkspace from "./create"
import deleteWorkspace from "./delete"
import getOneWorkspace from "./get"
import getAllWorkspace from "./getAll"
import updateWorkspace from "./update"

export const workspaceControllers = { createWorkspace, updateWorkspace, getAllWorkspace, getOneWorkspace, deleteWorkspace }