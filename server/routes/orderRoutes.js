const router = require('express').Router()

const validate = require('../middlewares/validateMiddleware')
const { createOrderSchema, updateOrderSchema } = require('../validations/orderValidation')
const { createOrder, getOrders, getOrderById,updateOrder, deleteOrder } = require('../controllers/orderController')



router.post('/', validate(createOrderSchema), createOrder)
router.get('/', getOrders) 
router.get('/:id', getOrderById)
router.put('/:id', validate(updateOrderSchema), updateOrder)
router.delete('/:id', deleteOrder)


module.exports = router