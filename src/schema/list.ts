import Joi from 'joi';

const listSchema = Joi.object({
    name: Joi.string()
        .required(),
    boardId: Joi.string()
        .hex()
        .length(24)
        .required(),
    cards: Joi.array()
        .items(Joi.string().hex().length(24))
        .optional()
});

export { listSchema };
