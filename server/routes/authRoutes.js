const router = require('express').Router()
const { authController } = require('../controllers')
const validate = require('../middlewares/validateMiddleware')
const { authValidation } = require('../validations')
const { createDynamicMulter } = require('../middlewares')
const jwt = require('jsonwebtoken')

router.post(
  '/login',
  validate(authValidation.loginSchema),
  authController.login
)
router.post(
  '/signup',
  validate(authValidation.signUpSchema),
  authController.signup
)
router.post(
  '/forgot-password',
  validate(authValidation.forgotPasswordSchema),
  authController.forgotPassword
)
router.post('/verify-otp', authController.verifyOtp)
router.post(
  '/change-password',
  validate(authValidation.changePasswordSchema),
  authController.changePassword
)
router.post(
  '/upload-profile',
  createDynamicMulter({ folderName: 'profile', fieldName: 'imageUrl' }),
  validate(authValidation.profileImageSchema),
  authController.uploadProfileImage
)

router.post('/google', authController.googleSignIn)

module.exports = router
