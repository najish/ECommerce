const Joi = require('joi');

const createOrderSchema = Joi.object({
  userId: Joi.number().integer().required(),
  totalAmount: Joi.number().precision(2).required(),
  status: Joi.string().valid('pending', 'confirmed', 'shipped', 'delivered').default('pending'),
  // Add more fields based on your Order model
});

const updateOrderSchema = Joi.object({
  userId: Joi.number().integer(),
  totalAmount: Joi.number().precision(2),
  status: Joi.string().valid('pending', 'confirmed', 'shipped', 'delivered'),
  // Add more fields based on your Order model
});

module.exports = {
  createOrderSchema,
  updateOrderSchema
}