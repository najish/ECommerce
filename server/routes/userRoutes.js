const router = require('express').Router();
const {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} = require('../controllers/userController');


const validate = require('../middlewares/validateMiddleware');
const { createUserSchema, updateUserSchema } = require('../validations/userValidation');

router.post('/', validate(createUserSchema), createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', validate(updateUserSchema), updateUser);
router.delete('/:id', deleteUser);

module.exports = router;