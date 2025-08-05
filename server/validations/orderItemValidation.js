const Joi = require('joi')

const createOrderItemSchema = Joi.object({
  orderId: Joi.number().integer().required(),
  productId: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).required(),
  price: Joi.number().precision(2).positive().required(),
})

const updateOrderItemSchema = Joi.object({
  quantity: Joi.number().integer().min(1).optional(),
  price: Joi.number().precision(2).positive().optional(),
}).min(1)

module.exports = {
  createOrderItemSchema,
  updateOrderItemSchema,
}
