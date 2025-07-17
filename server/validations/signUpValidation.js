const Joi = require('joi');

const signUpSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Confirm password does not match'
  }),
  role: Joi.string().valid('user', 'admin').optional()
});

module.exports = {
    signUpSchema
}