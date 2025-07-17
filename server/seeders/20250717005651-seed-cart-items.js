'use strict';

const fs = require('fs');
const path = require('path');

module.exports = {
  async up(queryInterface, Sequelize) {
    const cartItemsRaw = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'data/cartItems.json'), 'utf8')
    );

    const timestamp = new Date();

    const cartItems = cartItemsRaw.map(item => ({
      ...item,
      createdAt: timestamp,
      updatedAt: timestamp
    }));

    await queryInterface.bulkInsert('cart_items', cartItems, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cart_items', null, {});
  }
};
