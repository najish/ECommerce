const router = require('express').Router();
const { authController } = require('../controllers');
const validate = require('../middlewares/validateMiddleware');
const {authValidation} = require('../validations')

const jwt = require('jsonwebtoken');

router.post('/login', validate(authValidation.loginSchema), authController.login);
router.post('/signup', validate(authValidation.signUpSchema), authController.signup);
router.post('/forgot-password',validate(authValidation.forgotPasswordSchema),authController.forgotPassword)
router.post('/verify-otp', authController.verifyOtp)
router.post('/change-password',validate(authValidation.changePasswordSchema),authController.changePassword)

module.exports = router;
