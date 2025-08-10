'use strict'
const fs = require('fs')
const path = require('path')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const products = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'data/products.json'), 'utf8')
    )
    await queryInterface.bulkInsert('products', products, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {})
  },
}
