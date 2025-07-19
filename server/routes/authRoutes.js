const router = require('express').Router();
const { login, signup, forgotPassword, changePassword,verifyOtp, resetPassword } = require('../controllers/authController');
const validate = require('../middlewares/validateMiddleware');
const { loginSchema } = require('../validations/loginValidation');
const { signUpSchema } = require('../validations/signUpValidation');
const { forgotPasswordSchema } = require('../validations/forgotPasswordValidation');
const { changePasswordSchema} = require('../validations/changePasswordValidation')

const jwt = require('jsonwebtoken');

router.post('/login', validate(loginSchema), login);
router.post('/signup', validate(signUpSchema), signup);
router.post('/forgot-password',validate(forgotPasswordSchema),forgotPassword)
router.post('/verify-otp', verifyOtp)
router.post('/change-password',validate(changePasswordSchema),changePassword )

module.exports = router;
