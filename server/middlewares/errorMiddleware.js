const AppError = require('../utils/AppError')

const errorHandler = (err, req, res, next) => {
  console.error(`[Error] ${err.message}`)

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500
  const message = err.message || 'Internal Server Erorr'

  if (err.name === 'ValidationError') {
    statusCode = 400
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ')
  }

  if (err.name === 'UnauthorizedError') {
    statusCode = 401
    message = 'Invalid token'
  }

  if (err.code === 11000) {
    // MongoDB duplicate key error
    statusCode = 400
    message = 'Duplicate field value entered'
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

module.exports = { errorHandler }
