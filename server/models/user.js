'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Order, { foreignKey: 'userId' })
      User.hasOne(models.Cart, { foreignKey: 'userId' })
      User.hasMany(models.Token, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      })
      User.hasMany(models.Addresses, {
        foreignKey: 'userId',
        as: 'addresses',
        onDelete: 'CASCADE',
      })
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true, // ✅ allow null if using Google
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      googleId: {
        // ✅ NEW FIELD
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
    }
  )

  return User
}
