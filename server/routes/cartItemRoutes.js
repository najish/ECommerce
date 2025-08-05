const router = require('express').Router()
const { cartItemController } = require('../controllers')
const validate = require('../middlewares/validateMiddleware')
const { cartItemValidation } = require('../validations')

router.post(
  '/',
  validate(cartItemValidation.createCartItemSchema),
  cartItemController.createCartItem
)
router.get('/', cartItemController.getCartItems)
router.get('/:id', cartItemController.getCartItemById)
router.put(
  '/:id',
  validate(cartItemValidation.updateCartItemSchema),
  cartItemController.updateCartItem
)
router.delete('/:id', cartItemController.deleteCartItem)

module.exports = router
