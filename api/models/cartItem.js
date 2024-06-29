const { DataTypes } = require("sequelize");
const sequelize = require("../../db");
const Cart = require('./cart');
const Item = require('./item');

module.exports = sequelize.define('CartItem', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        cartId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Cart,
                key: 'id'
            }
        },
        itemId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Item,
                key: 'id'
            }
        }
    },
    {
        tableName: "CartItem"
    }
);