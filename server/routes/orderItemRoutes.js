const router = require('express').Router()

const validate = require('../middlewares/validateMiddleware')
const { createOrderItemSchema,
  updateOrderItemSchema } = require('../validations/orderItemValidation')

const { orderItemController} = require('../controllers')

router.post('/', validate(createOrderItemSchema), orderItemController.createOrderItem)
router.get('/', orderItemController.getOrderItems)
router.get('/:id', orderItemController.getOrderItemById)
router.put('/:id', validate(updateOrderItemSchema), orderItemController.updateOrderItem)
router.delete('/:id', orderItemController.deleteOrderItem)


module.exports = router