const router = require('express').Router()
const { cartController } = require('../controllers')
const validate = require('../middlewares/validateMiddleware')
const {
  createCartSchema,
  updateCartSchema,
} = require('../validations/cartValidation')

router.post('/', validate(createCartSchema), cartController.createCart)
router.get('/', cartController.getCarts)
router.get('/:id', cartController.getCartById)
router.put('/:id', validate(updateCartSchema), cartController.updateCart)
router.delete('/:id', cartController.deleteCart)

module.exports = router
