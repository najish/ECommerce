const express = require('express')
const router = express.Router()

// import all the routes here

const userRoutes = require('./userRoutes')
const productRoutes = require('./productRoutes')
const categoryRoutes = require('./productRoutes')
const orderRoutes = require('./orderRoutes')
const orderItemsRoutes = require('./orderItemRoutes')
const cartRoutes = require('./cartRoutes')
const cartItemsRoutes = require('./cartItemRoutes')
const authRoutes = require('./authRoutes')
const testRoutes = require('./testRoutes')
const placeOrderRoutes = require('./placeOrderRoutes')
const addressRoutes = require('./addressRoutes')

// routes will be here

router.use('/auth', authRoutes)
router.use('/products', productRoutes)
router.use('/orders', orderRoutes)
router.use('/orderItems', orderItemsRoutes)
router.use('/categories', categoryRoutes)
router.use('/cart', cartRoutes)
router.use('/cartItems', cartItemsRoutes)
router.use('/users', userRoutes)
router.use('/placeOrder', placeOrderRoutes)
router.use('/test', testRoutes)
router.use('/address', addressRoutes)

module.exports = router
