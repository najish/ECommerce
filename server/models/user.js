'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here if needed
      // e.g., User.hasMany(models.Order)
      User.hasMany(models.Order, { foreignKey: 'userId' });
      User.hasOne(models.Cart, { foreignKey: 'userId' });
      User.hasMany(models.Token, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
    }
  }

  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user' // Optional default
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true // Adds createdAt and updatedAt
  });

  return User;
};
