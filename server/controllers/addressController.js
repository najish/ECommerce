const { Addresses } = require('../models');
const { addressSchema } = require('../validations/addressValidation');

// Add Address
const createAddress = async (req, res) => {
  try {
    const { error } = addressSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const address = await Addresses.create(req.body);
    return res.status(201).json({ message: 'Address created', address });
  } catch (err) {
    return res.status(500).json({ error: 'Server Error', details: err.message });
  }
};

// Get All Addresses
const getAllAddresses = async (req, res) => {
  try {
    const addresses = await Addresses.findAll();
    return res.status(200).json(addresses);
  } catch (err) {
    return res.status(500).json({ error: 'Server Error', details: err.message });
  }
};

// Get Address by ID
const getAddressesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const addresses = await Addresses.findAll({
      where: { userId: userId }
    });
    return res.status(200).json(addresses);
  } catch (err) {
    return res.status(500).json({ error: 'Server Error', details: err.message });
  }
};


// Update Address
const updateAddress = async (req, res) => {
  try {
    const { error } = addressSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const address = await Addresses.findByPk(req.params.id);
    if (!address) return res.status(404).json({ error: 'Address not found' });

    await address.update(req.body);
    return res.status(200).json({ message: 'Address updated', address });
  } catch (err) {
    return res.status(500).json({ error: 'Server Error', details: err.message });
  }
};

// Delete Address
const deleteAddress = async (req, res) => {
  try {
    const address = await Addresses.findByPk(req.params.id);
    if (!address) return res.status(404).json({ error: 'Address not found' });

    await address.destroy();
    return res.status(200).json({ message: 'Address deleted' });
  } catch (err) {
    return res.status(500).json({ error: 'Server Error', details: err.message });
  }
};



module.exports = {getAllAddresses, getAddressesByUserId,createAddress,updateAddress, deleteAddress}