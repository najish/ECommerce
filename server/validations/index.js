const userValidation = require('./userValidation')
const productValidation = require('./productValidation')
const categoryValidation = require('./categoryValidation')
const orderValidation = require('./orderValidation')
const orderItemValidation = require('./orderItemValidation')
const cartValidation = require('./cartValidation')
const cartItemValidation = require('./cartItemValidation')
const authValidation = require('./authValidation')
const testValidation = require('./testValidation')


module.exports = {
    userValidation, productValidation, categoryValidation, orderItemValidation, orderValidation, cartItemValidation, cartValidation, authValidation, testValidation
}
