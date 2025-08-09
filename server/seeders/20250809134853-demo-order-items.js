'use strict'
const fs = require('fs')
const path = require('path')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const orderItems = JSON.parse(
      fs.readFileSync(path.join(__dirname, './data/orderItems.json'), 'utf8')
    )
    await queryInterface.bulkInsert('order_items', orderItems, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('order_items', null, {})
  },
}
