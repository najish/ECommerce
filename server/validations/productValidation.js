const Joi = require('joi')

const createProductSchema = Joi.object({
  name: Joi.string().min(2).max(255).required().messages({
    'string.empty': 'Product name is required',
    'string.min': 'Product name must be at least 2 characters',
    'string.max': 'Product name must be less than 255 characters',
  }),

  description: Joi.string().allow(null, '').max(1000).messages({
    'string.max': 'Description must be less than 1000 characters',
  }),

  price: Joi.number().positive().precision(2).required().messages({
    'number.base': 'Price must be a number',
    'number.positive': 'Price must be a positive number',
  }),

  stock: Joi.number().integer().min(0).required().messages({
    'number.base': 'Stock must be a number',
    'number.integer': 'Stock must be an integer',
    'number.min': 'Stock cannot be negative',
  }),

  categoryId: Joi.number().integer().required().messages({
    'number.base': 'Category ID must be a number',
    'any.required': 'Category ID is required',
  }),
})

const updateProductSchema = Joi.object({
  name: Joi.string().min(2).max(255).messages({
    'string.min': 'Product name must be at least 2 characters',
    'string.max': 'Product name must be less than 255 characters',
  }),

  description: Joi.string().allow(null, '').max(1000).messages({
    'string.max': 'Description must be less than 1000 characters',
  }),

  price: Joi.number().positive().precision(2).messages({
    'number.base': 'Price must be a number',
    'number.positive': 'Price must be a positive number',
  }),

  stock: Joi.number().integer().min(0).messages({
    'number.base': 'Stock must be a number',
    'number.integer': 'Stock must be an integer',
    'number.min': 'Stock cannot be negative',
  }),

  categoryId: Joi.number().integer().messages({
    'number.base': 'Category ID must be a number',
    'number.integer': 'Category ID must be an integer',
  }),
})

module.exports = {
  createProductSchema,
  updateProductSchema,
}
