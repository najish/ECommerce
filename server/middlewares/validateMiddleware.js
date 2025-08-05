const fs = require('fs')
const path = require('path')

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false })

    if (error) {
      // Delete uploaded file if validation fails
      if (req.file) {
        const filePath = path.join(__dirname, '../uploads/', req.file.filename)
        fs.unlink(filePath, (err) => {
          if (err) console.error('Error deleting file:', err)
        })
      }

      return res.status(400).json({
        status: 'error',
        errors: error.details.map((e) => e.message),
      })
    }

    // ✅ If no validation error, proceed to next middleware
    next()
  }
}

module.exports = validate
