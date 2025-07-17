// validations/cartItemValidation.js
const Joi = require('joi');

const createCartItemSchema = Joi.object({
  cartId: Joi.number().integer().positive().required().messages({
    'any.required': 'Cart ID is required',
    'number.base': 'Cart ID must be a number',
    'number.integer': 'Cart ID must be an integer',
    'number.positive': 'Cart ID must be a positive number'
  }),
  productId: Joi.number().integer().positive().required().messages({
    'any.required': 'Product ID is required',
    'number.base': 'Product ID must be a number',
    'number.integer': 'Product ID must be an integer',
    'number.positive': 'Product ID must be a positive number'
  }),
  quantity: Joi.number().integer().min(1).default(1).messages({
    'number.base': 'Quantity must be a number',
    'number.integer': 'Quantity must be an integer',
    'number.min': 'Quantity must be at least 1'
  })
});

const updateCartItemSchema = Joi.object({
  quantity: Joi.number().integer().min(1).required().messages({
    'any.required': 'Quantity is required for update',
    'number.base': 'Quantity must be a number',
    'number.integer': 'Quantity must be an integer',
    'number.min': 'Quantity must be at least 1'
  })
});

module.exports = {
  createCartItemSchema,
  updateCartItemSchema
};
