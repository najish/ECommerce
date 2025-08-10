'use strict'
const fs = require('fs')
const path = require('path')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const orders = JSON.parse(
      fs.readFileSync(path.join(__dirname, './data/orders.json'), 'utf8')
    )
    await queryInterface.bulkInsert('orders', orders, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('orders', null, {})
  },
}
