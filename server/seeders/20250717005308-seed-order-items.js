'use strict'
const fs = require('fs')
const path = require('path')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const filePath = path.join(__dirname, 'data', 'orderItems.json')
    const rawData = fs.readFileSync(filePath, 'utf-8')
    const orderItems = JSON.parse(rawData)

    const timestamp = new Date()

    const timestampedItems = orderItems.map((item) => ({
      ...item,
      createdAt: timestamp,
      updatedAt: timestamp,
    }))

    await queryInterface.bulkInsert('order_items', timestampedItems, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('order_items', null, {})
  },
}
