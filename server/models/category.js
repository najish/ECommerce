'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     */
    static associate(models) {
      // ✅ One category has many products
      Category.hasMany(models.Product, {
        foreignKey: 'categoryId',
        as: 'products',
        onDelete: 'CASCADE'
      });
    }
  }

  Category.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    timestamps: true
  });

  return Category;
};
