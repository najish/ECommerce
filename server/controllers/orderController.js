const { Order, Product, User, OrderItem } = require('../models')

const getStatus = async (req, res) => {
  try {
    const ORDER_STATUSES = [
      'pending',
      'placed',
      'confirmed',
      'shipped',
      'delivered',
      'cancelled',
    ]

    const status = Order.rawAttributes.status.values

    res.json(status)
  } catch (err) {
    console.log('failed to load the status')
  }
}

const getOrderByUserId = async (req, res) => {
  try {
    const { id } = req.params

    const user = await User.findByPk(id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const orders = await Order.findAll({
      where: { userId: id },
      include: [
        {
          model: OrderItem,
          as: 'orderItems',
          include: [
            {
              model: Product,
              as: 'product',
              attributes: ['id', 'name', 'price', 'description', 'imageUrl'], // select fields you want
            },
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
    })

    return res.status(200).json({ orders })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body)
    res.status(201).json(order)
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error })
  }
}

const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll()
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error })
  }
}

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id)
    if (order) {
      res.status(200).json(order)
    } else {
      res.status(404).json({ message: 'Order not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error })
  }
}

const updateOrder = async (req, res) => {
  try {
    const [updated] = await Order.update(req.body, {
      where: { id: req.params.id },
    })
    if (updated) {
      const updatedOrder = await Order.findByPk(req.params.id)
      res.status(200).json(updatedOrder)
    } else {
      res.status(404).json({ message: 'Order not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error })
  }
}

const deleteOrder = async (req, res) => {
  try {
    const deleted = await Order.destroy({
      where: { id: req.params.id },
    })
    if (deleted) {
      res.status(204).send()
    } else {
      res.status(404).json({ message: 'Order not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error })
  }
}

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrderByUserId,
  getStatus,
}
