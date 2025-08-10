'use strict'
const fs = require('fs')
const path = require('path')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const addresses = JSON.parse(
      fs.readFileSync(path.join(__dirname, './data/addresses.json'), 'utf8')
    )
    await queryInterface.bulkInsert('addresses', addresses, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('addresses', null, {})
  },
}
