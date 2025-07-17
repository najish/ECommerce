const {Cart} = require('../models/');

const createCart = async (req, res) => {
    try {
        const cart = await Cart.create(req.body);
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error creating cart', error });
    }
}

const getCarts = async (req, res) => {
    try {
        const carts = await Cart.findAll();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching carts', error });
    }
};

const getCartById = async (req, res) => {
    try {
        const cart = await Cart.findByPk(req.params.id);
        if (cart) {
            res.status(200).json(cart);
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart', error });
    }
}


const updateCart = async (req, res) => {
    try {
        const [updated] = await Cart.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedCart = await Cart.findByPk(req.params.id);
            res.status(200).json(updatedCart);
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating cart', error });
    }
}

const deleteCart = async (req, res) => {
    try {
        const deleted = await Cart.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting cart', error });
    }
}


module.exports = {
    createCart,
    getCarts,
    getCartById,
    updateCart,
    deleteCart
};




