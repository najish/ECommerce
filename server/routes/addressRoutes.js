const express = require('express');
const router = express.Router();
const {addressController} = require('../controllers');

router.post('/', addressController.createAddress);
router.get('/', addressController.getAllAddresses);
router.get('/:userId', addressController.getAddressesByUserId);
router.put('/:id', addressController.updateAddress);
router.delete('/:id', addressController.deleteAddress);

module.exports = router;
