import Joi from "joi";
import { memberSchema } from "./board";

const workspaceSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(500).allow(null, ''),
    boards: Joi.array()
        .items(Joi.string().hex().length(24))
        .optional(),
})

export const updateworkspaceSchema = workspaceSchema.keys({
    members: Joi.array()
        .items(memberSchema).min(1).required(),
})

export default workspaceSchema