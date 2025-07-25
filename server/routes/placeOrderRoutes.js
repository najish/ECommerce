const router = require('express').Router();
const { Order, OrderItem, Product, User, sequelize } = require('../models');

router.post('/', async (req, res) => {
  const { addressId, paymentMethod, items, userId } = req.body;

  const t = await sequelize.transaction();

  try {
    // Validate user
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Calculate total
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Create Order
    const newOrder = await Order.create({
      userId,
      addressId,
      paymentMethod,
      status: 'placed',
      total
    }, { transaction: t });

    const orderItems = [];

    for (const item of items) {
      const product = await Product.findByPk(item.id, { transaction: t });

      if (!product) {
        throw new Error(`Product with ID ${item.id} not found`);
      }

      if (product.stock < item.quantity) {
        throw new Error(`Not enough stock for product: ${product.name}`);
      }

      // Reduce stock
      product.stock -= item.quantity;
      await product.save({ transaction: t });

      // Create order item
      const orderItem = await OrderItem.create({
        orderId: newOrder.id,
        productId: product.id,
        quantity: item.quantity,
        price: item.price
      }, { transaction: t });

      orderItems.push(orderItem);
    }

    await t.commit();

    res.status(201).json({
      message: 'Order placed successfully',
      order: newOrder,
      items: orderItems,
      totalAmount: total
    });

  } catch (error) {
    await t.rollback();
    console.error('Order placement error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
