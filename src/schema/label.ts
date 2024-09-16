import Joi from 'joi';

const labelSchema = Joi.object({
    name: Joi.string()
        .required(),
    color: Joi.string()
        .required(),
    cardId: Joi.string()
        .hex()
        .length(24)
        .optional(),
});

export { labelSchema };
