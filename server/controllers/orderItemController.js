const {OrderItem, Product} = require('../models')

const createOrderItem = async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error });
    }
}

const getOrderItems = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
}

const getOrderItemById = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order', error });
    }
}

const updateOrderItem = async (req, res) => {
    try {
        const [updated] = await Order.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedOrder = await Order.findByPk(req.params.id);
            res.status(200).json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating order', error });
    }
}


const deleteOrderItem = async (req, res) => {
    try {
        const deleted = await Order.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Order Item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting order', error });
    }
}


module.exports = {
    createOrderItem,
    getOrderItems,
    getOrderItemById,
    updateOrderItem,
    deleteOrderItem
}