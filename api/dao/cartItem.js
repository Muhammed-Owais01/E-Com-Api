const { Op } = require('sequelize');
const CartItem = require('../models/cartItem');

exports.getItem = async (item) =>
    await CartItem.findOne(
        { where: {
            [Op.and]: [{ cartId: item.cartId }, { itemId: item.itemId }] 
        }
    });

exports.getAll = async (cartId) =>
    await CartItem.findAll({ where: { cartId: cartId }, 
        include: 'item'
    })

exports.addItem = async (item) =>
    await CartItem.create(item);

exports.updateQuantity = async (item) =>
    await CartItem.update({ quantity: item.quantity }, 
        { where: {
            [Op.and]: [{ cartId: item.cartId }, { itemId: item.itemId }] 
        }
    });

exports.deleteItem = async (item) => 
    await CartItem.destroy(
        { where: {
            [Op.and]: [{ cartId: item.cartId }, { itemId: item.itemId }] 
        }
    });