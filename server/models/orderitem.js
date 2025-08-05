'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Define associations
     */
    static associate(models) {
      // ✅ Each OrderItem belongs to one Order
      OrderItem.belongsTo(models.Order, {
        foreignKey: 'orderId',
        as: 'order',
        onDelete: 'CASCADE',
      })

      // ✅ Each OrderItem belongs to one Product
      OrderItem.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product',
        onDelete: 'CASCADE',
      })
    }
  }

  OrderItem.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      orderId: {
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
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'OrderItem',
      tableName: 'order_items',
      timestamps: true,
    }
  )

  return OrderItem
}
