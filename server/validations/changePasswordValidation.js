const Joi = require('joi');

const changePasswordSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    'string.min': 'Minimum 6 characters required',
    'any.required': 'Password is required',
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.only': 'Passwords do not match',
    'any.required': 'Confirm Password is required'
  }),
  token: Joi.string().optional()
});

module.exports = {
  changePasswordSchema
};
