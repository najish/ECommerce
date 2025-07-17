const router = require('express').Router();
const {createCart, getCartById, getCarts, updateCart, deleteCart} = require('../controllers/cartController');
const validate = require('../middlewares/validateMiddleware');
const {createCartSchema, updateCartSchema} = require('../validations/cartValidation');

router.post('/', validate(createCartSchema), createCart);
router.get('/', getCarts);
router.get('/:id', getCartById);
router.put('/:id', validate(updateCartSchema), updateCart);
router.delete('/:id', deleteCart);

module.exports = router;
