'use strict'
const fs = require('fs')
const path = require('path')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const categories = JSON.parse(
      fs.readFileSync(path.join(__dirname, './data/categories.json'), 'utf8')
    )
    await queryInterface.bulkInsert('categories', categories, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {})
  },
}
