const router = require('express').Router();
const {
  getProducts,
  getProductById,
  addProduct,
  editProduct,
  deleteProduct
} = require('../controllers/productController');

// GET /
router.get('/', (req, res) => {
  res.send('Product route is working');
});

// POST /add
router.post('/add', addProduct);

// GET /list
router.get('/list', getProducts);

// GET /:id
router.get('/:id', getProductById);

// PUT /:id
router.put('/:id', editProduct);

// DELETE /:id
router.delete('/:id', deleteProduct);

module.exports = router;
