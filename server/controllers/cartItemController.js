const { CartItem } = require('../models/')

const createCartItem = async (req, res) => {
  try {
    const cartItem = await CartItem.create(req.body)
    res.status(201).json(cartItem)
  } catch (error) {
    res.status(500).json({ message: 'Error creating cart item', error })
  } 
}

const getCartItems = async (req, res) => {
  try {
    const cartItems = await CartItem.findAll()
    res.status(200).json(cartItems)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart items', error })
  }
}

const getCartItemById = async (req, res) => {
  try {
    const cartItem = await CartItem.findByPk(req.params.id)
    if (cartItem) {
      res.status(200).json(cartItem)
    } else {
      res.status(404).json({ message: 'Cart item not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart item', error })
  }
}

const updateCartItem = async (req, res) => {
  try {
    const [updated] = await CartItem.update(req.body, {
      where: { id: req.params.id },
    })
    if (updated) {
      const updatedCartItem = await CartItem.findByPk(req.params.id)
      res.status(200).json(updatedCartItem)
    } else {
      res.status(404).json({ message: 'Cart item not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart item', error })
  }
}

const deleteCartItem = async (req, res) => {
  try {
    const deleted = await CartItem.destroy({
      where: { id: req.params.id },
    })
    if (deleted) {
      res.status(204).send()
    } else {
      res.status(404).json({ message: 'Cart item not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting cart item', error })
  }
}

module.exports = {
  createCartItem,
  getCartItems,
  getCartItemById,
  updateCartItem,
  deleteCartItem,
}
