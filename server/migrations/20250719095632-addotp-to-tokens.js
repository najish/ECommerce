'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Adds the 'otp' column to the 'tokens' table
    await queryInterface.addColumn('tokens', 'otp', {
      type: DataTypes.INTEGER,
      allowNull: true, // Set to false if OTP must always exist
    });
  },

  async down(queryInterface, Sequelize) {
    // Removes the 'otp' column if the migration is rolled back
    await queryInterface.removeColumn('tokens', 'otp');
  }
};
