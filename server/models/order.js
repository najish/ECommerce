'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     */
    static associate(models) {
      // ✅ One order belongs to one user
      Order.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
      })

      // ✅ One order has many order items (optional if you have an OrderItem model)
      Order.hasMany(models.OrderItem, {
        foreignKey: 'orderId',
        as: 'orderItems',
      })
    }
  }

  Order.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending', // Default order status
      },
      paymentMode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Order',
      tableName: 'orders',
      timestamps: true,
    }
  )

  return Order
}
