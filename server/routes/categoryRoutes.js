const router = require('express').Router()
const {createCategory, getCategories, updateCategory, deleteCategory, getCategoryById } = require('../controllers/categoryController')  
const validate = require('../middlewares/validateMiddleware')
const { createCategorySchema, updateCategorySchema } = require('../validations/categoryValidation')


router.post('/', validate(createCategorySchema), createCategory)
router.get('/', getCategories)
router.get('/:id', getCategoryById)
router.put('/:id', validate(updateCategorySchema), updateCategory)
router.delete('/:id', deleteCategory)
module.exports = router
