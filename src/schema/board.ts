import Joi from 'joi';

export const boardSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional().allow(null, ''),
    members: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)),
    lists: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)),
});

