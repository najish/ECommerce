const Joi = require('joi')

const createCategorySchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.empty': 'Category name is required',
    'string.min': 'Category name must be at least 2 characters long',
    'string.max': 'Category name must be less than 100 characters',
  }),
})

const updateCategorySchema = Joi.object({
  name: Joi.string().min(2).max(100).messages({
    'string.min': 'Category name must be at least 2 characters long',
    'string.max': 'Category name must be less than 100 characters',
  }),
})

module.exports = {
  createCategorySchema,
  updateCategorySchema,
}
