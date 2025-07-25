const Joi = require('joi');

const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('user', 'admin').optional()
});

const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(100),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  role: Joi.string().valid('user', 'admin')
});

const profileImageSchema = Joi.object({
  userId: Joi.number().integer().required(),
});


module.exports = {
  createUserSchema,
  updateUserSchema,
  profileImageSchema
};
