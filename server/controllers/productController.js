// Simulated in-memory products (used only for mock responses)
const sampleProducts = [
  { id: 1, name: 'Product A', price: 100, description: 'Description A' },
  { id: 2, name: 'Product B', price: 150, description: 'Description B' },
];

const addProduct = async (req, res) => {
  const { name, price, description } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: 'Product name and price are required' });
  }

  const newProduct = {
    id: Date.now(),
    name,
    price,
    description,
  };

  // Simulate saving to DB (you can later push to sampleProducts if needed)
  res.status(201).json({ message: 'Product added successfully', product: newProduct });
};

const getProducts = (req, res) => {
  res.status(200).json({ products: sampleProducts });
};

const getProductById = (req, res) => {
  const productId = parseInt(req.params.id);

  const product = sampleProducts.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.status(200).json({ product });
};

const deleteProduct = (req, res) => {
  const productId = parseInt(req.params.id);

  const product = sampleProducts.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  // Simulate deletion
  res.status(200).json({ message: `Product with ID ${productId} deleted` });
};

const editProduct = (req, res) => {
  const productId = parseInt(req.params.id);
  const { name, price, description } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: 'Product name and price are required' });
  }

  const product = sampleProducts.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const updatedProduct = { id: productId, name, price, description };

  // Simulate DB update
  res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
};

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  deleteProduct,
  editProduct,
};
