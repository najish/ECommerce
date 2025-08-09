'use strict'
const fs = require('fs')
const path = require('path')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const carts = JSON.parse(
      fs.readFileSync(path.join(__dirname, './data/carts.json'), 'utf8')
    )
    await queryInterface.bulkInsert('carts', carts, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('carts', null, {})
  },
}
