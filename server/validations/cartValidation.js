// validations/cartValidation.js

const Joi = require('joi');

const createCartSchema = Joi.object({
  userId: Joi.number().integer().required()
});

const updateCartSchema = Joi.object({
  userId: Joi.number().integer().optional()
}).min(1);

module.exports = {
  createCartSchema,
  updateCartSchema
};
