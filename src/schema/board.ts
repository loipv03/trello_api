import Joi from 'joi';

const memberSchema = Joi.object({
    userId: Joi.string()
        .hex()
        .length(24)
        .required(),
    role: Joi.string()
        .valid('admin', 'member', 'viewer')
        .default('admin')
});

const boardSchema = Joi.object({
    name: Joi.string()
        .required(),
    description: Joi.string()
        .optional(),
    lists: Joi.array()
        .items(Joi.string().hex().length(24))
        .optional(),
});

const updateBoardSchema = boardSchema.keys({
    members: Joi.array()
        .items(memberSchema).min(1).required(),
})

export { boardSchema, updateBoardSchema };
