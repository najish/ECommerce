'use strict'
const fs = require('fs')
const path = require('path')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const filePath = path.join(__dirname, 'data', 'carts.json')
    const rawData = fs.readFileSync(filePath, 'utf-8')
    const carts = JSON.parse(rawData)

    const timestamp = new Date()

    const timestampedCarts = carts.map((cart) => ({
      ...cart,
      createdAt: timestamp,
      updatedAt: timestamp,
    }))

    await queryInterface.bulkInsert('carts', timestampedCarts, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('carts', null, {})
  },
}
