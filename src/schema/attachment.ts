import Joi from 'joi';

const attachmentSchema = Joi.object({
    filename: Joi.string().required(),
    url: Joi.string().uri().required(),
    fileType: Joi.string().required(),
    size: Joi.number().positive().required(),
    cardId: Joi.string().hex().length(24).required()
});

export default attachmentSchema;
