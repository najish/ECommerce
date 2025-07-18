const router = require('express').Router();
const { Order, OrderItem, Product, User, sequelize } = require('../models');

router.post('/', async (req, res) => {
  const { address, paymentMethod, items, user } = req.body;

  console.log(req.body);

  const t = await sequelize.transaction();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  console.log("Total:", total);

  try {
    // 1. Create Order
    const newOrder = await Order.create({
      userId: user.id,
      address,
      paymentMethod,
      status: 'placed',
      total // Only if your Order model has totalAmount field
    }, { transaction: t });

    // 2. Process each item
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
        price: item.price,
      }, { transaction: t });

      orderItems.push(orderItem);
    }

    // 3. Commit transaction
    await t.commit();

    res.status(201).json({
      message: 'Order placed successfully',
      order: newOrder,
      items: orderItems,
      totalAmount: total
    });

  } catch (error) {
    await t.rollback();
    console.error('Order placement error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
