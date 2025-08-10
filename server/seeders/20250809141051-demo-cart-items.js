'use strict'
const fs = require('fs')
const path = require('path')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const cart_items = JSON.parse(
      fs.readFileSync(path.join(__dirname, './data/cartItems.json'), 'utf8')
    )
    await queryInterface.bulkInsert('cart_items', cart_items, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cart_items', null, {})
  },
}
