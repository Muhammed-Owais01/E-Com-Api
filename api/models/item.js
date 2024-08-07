const { DataTypes } = require("sequelize");
const sequelize = require("../../db");
const User = require('../models/user');

module.exports = sequelize.define('Item', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        itemname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(1024),
            allowNull: false
        },
        itemImage: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "no_image.png"
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            },
        }
    },
    {
        tableName: "Item"
    }
);

