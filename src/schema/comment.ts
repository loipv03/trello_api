import Joi from 'joi';

const commentSchema = Joi.object({
    text: Joi.string()
        .required(),
    userId: Joi.string()
        .hex()
        .length(24)
        .required(),
    cardId: Joi.string()
        .hex()
        .length(24)
        .required(),
});

export { commentSchema };
