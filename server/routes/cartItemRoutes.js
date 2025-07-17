const router = require('express').Router();
const {createCartItem,
  getCartItems,
  getCartItemById,
  updateCartItem,
  deleteCartItem} = require('../controllers/cartItemController');
const validate = require('../middlewares/validateMiddleware');
const {createCartItemSchema, updateCartItemSchema} = require('../validations/cartItemValidation');

router.post('/', validate(createCartItemSchema), createCartItem);
router.get('/', getCartItems);
router.get('/:id', getCartItemById);
router.put('/:id', validate(updateCartItemSchema), updateCartItem);
router.delete('/:id', deleteCartItem);

module.exports = router;
