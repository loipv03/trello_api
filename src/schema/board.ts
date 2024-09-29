import Joi from 'joi';

export const memberSchema = Joi.object({
    userId: Joi.string()
        .hex()
        .length(24)
        .required(),
    role: Joi.string()
        .valid('admin', 'member', 'viewer')
        .default('member')
});

const boardSchema = Joi.object({
    name: Joi.string()
        .required(),
    description: Joi.string()
        .optional(),
    workspaceId: Joi.string().required(),
    lists: Joi.array()
        .items(Joi.string().hex().length(24))
        .optional(),
});

const updateBoardSchema = boardSchema.keys({
    members: Joi.array()
        .items(memberSchema).min(1).required(),
})

export { boardSchema, updateBoardSchema };
