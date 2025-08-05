'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     * Define associations
     */
    static associate(models) {
      // ✅ A cart item belongs to a cart
      CartItem.belongsTo(models.Cart, {
        foreignKey: 'cartId',
        as: 'cart',
        onDelete: 'CASCADE',
      })

      // ✅ A cart item belongs to a product
      CartItem.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product',
        onDelete: 'CASCADE',
      })
    }
  }

  CartItem.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: 'CartItem',
      tableName: 'cart_items',
      timestamps: true,
    }
  )

  return CartItem
}
