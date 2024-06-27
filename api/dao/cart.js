const Cart = require('../models/cart');

exports.getCart = async (userId) =>
    await Cart.findOne({ where: { userId: userId } });

// exports.getAll = async (userId) => 
//     await Cart.findAll({ where: { userId: userId } }, 
//         { include: { model: 'items', include: { model: 'item' } } });

exports.countAll = async (items) => await items.length;

exports.create = async (userId) =>
    await Cart.create({ userId: userId });
