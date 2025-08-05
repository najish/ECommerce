const router = require('express').Router()

// import all the controllers here

const userController = require('./userController')
const productController = require('./productController')
const categoryController = require('./categoryController')
const orderController = require('./orderController')
const orderItemController = require('./orderItemController')
const cartController = require('./cartController')
const cartItemController = require('./cartItemController')
const authController = require('./authController')
const addressController = require('./addressController')

module.exports = {
  userController,
  productController,
  categoryController,
  orderController,
  orderItemController,
  cartController,
  cartItemController,
  authController,
  addressController,
}
