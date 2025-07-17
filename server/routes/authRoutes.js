const router = require('express').Router();
const { login, signup } = require('../controllers/authController');
const validate = require('../middlewares/validateMiddleware');
const { loginSchema } = require('../validations/loginValidation');
const { signUpSchema } = require('../validations/signUpValidation');

router.post('/login', validate(loginSchema), login);
router.post('/signup', validate(signUpSchema), signup);

module.exports = router;
