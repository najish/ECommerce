'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Define associations here
     */
    static associate(models) {
      // ✅ A cart belongs to one user
      Cart.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE'
      });

      // ✅ A cart has many cart items
      Cart.hasMany(models.CartItem, {
        foreignKey: 'cartId',
        as: 'items',
        onDelete: 'CASCADE'
      });
    }
  }

  Cart.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Cart',
    tableName: 'carts',
    timestamps: true
  });

  return Cart;
};
