const { DataTypes } = require("sequelize");
const sequelize = require("../../db");
const User = require('./user');

module.exports = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
});