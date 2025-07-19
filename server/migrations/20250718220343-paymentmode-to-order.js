'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('orders', 'paymentMode', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'cod' // or 'online', set based on your default logic
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('orders', 'paymentMode');
  }
};
