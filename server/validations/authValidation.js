const Joi = require('joi')

const changePasswordSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    'string.min': 'Minimum 6 characters required',
    'any.required': 'Password is required',
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.only': 'Passwords do not match',
    'any.required': 'Confirm Password is required',
  }),
  token: Joi.string().optional(),
})

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required',
  }),
})

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
})

const signUpSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Confirm password does not match',
  }),
  role: Joi.string().valid('user', 'admin').optional(),
})

const profileImageSchema = Joi.object({
  userId: Joi.number().integer().required(),
})

module.exports = {
  changePasswordSchema,
  forgotPasswordSchema,
  loginSchema,
  signUpSchema,
  profileImageSchema,
}
