const upload = require('./upload')
const validate = require('./validateMiddleware')
const createDynamicMulter = require('./dynamicMulter')

module.exports = {upload, validate, createDynamicMulter}