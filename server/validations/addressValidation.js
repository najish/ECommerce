const Joi = require('joi')

const addressSchema = Joi.object({
  userId: Joi.number().integer().required(),
  landmark: Joi.string().allow('', null),
  street: Joi.string().required(),
  city: Joi.string().required(),
  district: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
  pincode: Joi.string()
    .required()
    .pattern(/^\d{5,10}$/)
    .messages({
      'string.pattern.base': 'Pincode must be between 5 and 10 digits.',
    }),
})

module.exports = {
  addressSchema,
}
