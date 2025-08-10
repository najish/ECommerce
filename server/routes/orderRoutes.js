const router = require('express').Router()

const validate = require('../middlewares/validateMiddleware')
const {
  createOrderSchema,
  updateOrderSchema,
} = require('../validations/orderValidation')
const { orderController } = require('../controllers')

router.post('/', validate(createOrderSchema), orderController.createOrder)
router.get('/', orderController.getOrders)
router.get('/status', orderController.getStatus)
router.get('/:id/products', orderController.getOrderByUserId)
router.get('/:id', orderController.getOrderById)
router.put('/:id', validate(updateOrderSchema), orderController.updateOrder)
router.delete('/:id', orderController.deleteOrder)

module.exports = router
