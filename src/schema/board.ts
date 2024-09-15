import Joi from 'joi';

const memberSchema = Joi.object({
    userId: Joi.string()
        .hex()
        .length(24)
        .required(),
    role: Joi.string()
        .valid('Admin', 'Member', 'Viewer')
        .default('Admin')
});

const boardSchema = Joi.object({
    name: Joi.string()
        .required(),
    description: Joi.string()
        .optional(),
    members: Joi.array()
        .items(memberSchema)
        .optional(),
    lists: Joi.array()
        .items(Joi.string().hex().length(24))
        .optional(),
});

export { boardSchema };
