'use strict'
const fs = require('fs')
const path = require('path')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const filePath = path.join(__dirname, 'data', 'categories.json')
    const rawData = fs.readFileSync(filePath, 'utf-8')
    const categories = JSON.parse(rawData)

    // Add timestamps if your table uses them
    const timestamp = new Date()
    categories.forEach((category) => {
      category.createdAt = timestamp
      category.updatedAt = timestamp
    })

    await queryInterface.bulkInsert('Categories', categories, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {})
  },
}
