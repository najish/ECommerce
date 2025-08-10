const { Product } = require('../models')
const { getRedisClient, logger } = require('../utils')

const getProducts = async (req, res) => {
  try {
    const cacheKey = 'products:all'
    const redisClient = getRedisClient()
    // 1️⃣ Check Redis Cache
    const cachedProducts = await redisClient.get(cacheKey)
    if (cachedProducts) {
      logger.info('response from redis')
      return res.json(JSON.parse(cachedProducts)) // Return cached response
    }

    // 2️⃣ Fetch from DB if not in cache
    const products = await Product.findAll({ include: 'category' })

    // 3️⃣ Cache the response in Redis for 1 hour (3600 seconds)
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(products))

    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: 'category',
    })
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const createProduct = async (req, res) => {
  try {
    let imageUrl = req.file ? req.file.filename : null
    imageUrl = `uploads/${imageUrl}`
    const data = {
      ...req.body,
      imageUrl,
    }
    console.log(data)
    await Product.create(data)
    res.status(201).json({ message: 'Product has been added ❤️' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const updateProduct = async (req, res) => {
  try {
    const [updated] = await Product.update(req.body, {
      where: { id: req.params.id },
    })
    if (!updated) return res.status(404).json({ message: 'Product not found' })
    res.json({ message: 'Product updated' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.destroy({ where: { id: req.params.id } })
    if (!deleted) return res.status(404).json({ message: 'Product not found' })
    res.json({ message: 'Product deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
}
