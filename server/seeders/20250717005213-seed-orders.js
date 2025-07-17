'use strict';
const fs = require('fs');
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const filePath = path.join(__dirname, 'data', 'orders.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const orders = JSON.parse(rawData);

    const now = new Date();
    const ordersWithTimestamps = orders.map(order => ({
      ...order,
      createdAt: now,
      updatedAt: now
    }));

    await queryInterface.bulkInsert('Orders', ordersWithTimestamps, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders', null, {});
  }
};
