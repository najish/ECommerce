// validations/testValidation.js
const Joi = require('joi')

const testValidationSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 2 characters',
    'string.max': 'Name cannot exceed 50 characters',
  }),

  age: Joi.number().integer().min(0).max(120).required().messages({
    'number.base': 'Age must be a number',
    'number.min': 'Age must be a positive number',
    'number.max': 'Age must be less than 120',
    'any.required': 'Age is required',
  }),

  address: Joi.string().min(5).max(100).required().messages({
    'string.empty': 'Address is required',
    'string.min': 'Address must be at least 5 characters',
    'string.max': 'Address cannot exceed 100 characters',
  }),
})

module.exports = { testValidationSchema }
