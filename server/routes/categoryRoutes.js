const router = require('express').Router()
const {categoryController} = require('../controllers')  
const validate = require('../middlewares/validateMiddleware')
const { createCategorySchema, updateCategorySchema } = require('../validations/categoryValidation')


router.post('/', validate(createCategorySchema), categoryController.createCategory)
router.get('/', categoryController.getCategories)
router.get('/:id', categoryController.getCategoryById)
router.put('/:id', validate(updateCategorySchema), categoryController.updateCategory)
router.delete('/:id', categoryController.deleteCategory)
module.exports = router
