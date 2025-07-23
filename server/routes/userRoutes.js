const router = require('express').Router();
const {userController} = require('../controllers')


const validate = require('../middlewares/validateMiddleware');
const { createUserSchema, updateUserSchema } = require('../validations/userValidation');

const {userValidation} = require('../validations')

router.post('/', validate(userValidation.createUserSchema), userController.createUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', validate(userValidation.updateUserSchema), userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;