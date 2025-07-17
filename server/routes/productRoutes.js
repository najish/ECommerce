const router = require('express').Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

const validate = require('../middlewares/validateMiddleware');
const { createProductSchema, updateProductSchema } = require('../validations/productValidation');

router.get('/', getProducts);
router.post('/', validate(createProductSchema), createProduct);
router.get('/:id', getProductById);
router.put('/:id', validate(updateProductSchema), updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
