const router = require('express').Router()

const validate = require('../middlewares/validateMiddleware')
const { createOrderItemSchema,
  updateOrderItemSchema } = require('../validations/orderItemValidation')

const { createOrderItem, getOrderItems, getOrderItemById, updateOrderItem, deleteOrderItem } = require('../controllers/orderItemController')

router.post('/', validate(createOrderItemSchema), createOrderItem)
router.get('/', getOrderItems)
router.get('/:id', getOrderItemById)
router.put('/:id', validate(updateOrderItemSchema), updateOrderItem)
router.delete('/:id', deleteOrderItem)


module.exports = router