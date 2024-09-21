import Joi from 'joi';

const userSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().lowercase().trim().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    avatar: Joi.string().uri().default(''),
    isActive: Joi.boolean().default(false),
});

export const loginSchema = Joi.object({
    email: userSchema.extract('email'),
    password: userSchema.extract('password')
});

export default userSchema;