'use strict'
const fs = require('fs')
const path = require('path')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'data/users.json'), 'utf8')
    )

    const timestamp = new Date()

    const timestampedUsers = users.map((user) => ({
      ...user,
      createdAt: timestamp,
      updatedAt: timestamp,
    }))

    await queryInterface.bulkInsert('users', timestampedUsers, {}) // lowercase 'users'
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {}) // lowercase 'users'
  },
}
