const router = require('express').Router()
const { productController } = require('../controllers')

const upload = require('../middlewares/upload')

const validate = require('../middlewares/validateMiddleware')
const {
  createProductSchema,
  updateProductSchema,
} = require('../validations/productValidation')

router.get('/', productController.getProducts)
router.post(
  '/',
  upload.single('imageUrl'),
  validate(createProductSchema),
  productController.createProduct
)
router.get('/:id', productController.getProductById)
router.put(
  '/:id',
  validate(updateProductSchema),
  productController.updateProduct
)
router.delete('/:id', productController.deleteProduct)

module.exports = router
