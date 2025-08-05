'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate(models) {
      // Each token belongs to one user
      Token.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      })
    }
  }

  Token.init(
    {
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      otp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Token',
      tableName: 'tokens', // force lowercase table name
      timestamps: true, // includes createdAt and updatedAt
    }
  )

  return Token
}
