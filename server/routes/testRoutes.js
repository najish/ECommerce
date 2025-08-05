const router = require('express').Router()
const upload = require('../middlewares/upload')
const validate = require('../middlewares/validateMiddleware')
const { testValidationSchema } = require('../validations/testValidation')
const db = require('../models')
const Token = db.Token

router.get('/', (req, res) => {
  res.json({ message: 'Test route is working!' })
})

router.post('/', (req, res) => {
  res.json({ receivedData: req.body })
})

router.post(
  '/upload',
  upload.single('imageUrl'),
  validate(testValidationSchema),
  (req, res) => {
    console.log(req.file) // uploaded file info
    console.log(req.body) // other form data
    res.send('File uploaded successfully!')
  }
)

router.get('/tokens', async (req, res) => {
  try {
    const tokens = await Token.findAll()
    return res.json(tokens)
  } catch (error) {
    console.error(error)
    return res.send('tokens not found error')
  }
})

module.exports = router
