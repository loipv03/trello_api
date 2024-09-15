import Joi from 'joi';

export const cardSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow(null, '').optional(),
    listId: Joi.string().required(),
    members: Joi.array().items(Joi.string()).optional(),
    dueDate: Joi.date().optional(),
    labels: Joi.array().items(Joi.string()).optional(),
    attachments: Joi.array().items(Joi.string()).optional(),
    comments: Joi.array().items(Joi.string()).optional(),
});
