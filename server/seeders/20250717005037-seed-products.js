'use strict'
const fs = require('fs')
const path = require('path')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const productsFilePath = path.join(__dirname, 'data', 'products.json')
    const rawData = fs.readFileSync(productsFilePath, 'utf-8')
    const products = JSON.parse(rawData)

    const timestamp = new Date()
    const productsWithTimestamps = products.map((product) => ({
      ...product,
      createdAt: timestamp,
      updatedAt: timestamp,
    }))

    await queryInterface.bulkInsert('Products', productsWithTimestamps, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {})
  },
}
