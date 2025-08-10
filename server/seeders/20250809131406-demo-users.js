'use strict'
const fs = require('fs')
const path = require('path')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const usersData = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'data/users.json'), 'utf8')
    )
    await queryInterface.bulkInsert('users', usersData, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  },
}
