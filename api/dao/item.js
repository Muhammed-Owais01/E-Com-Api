const Item = require('../models/item');
const User = require('../models/user');

exports.getById = async (itemId) => {
    return await Item.findByPk(itemId, {
        attributes: {
            exclude: ['userId']
        },
        include: {
            association: 'creator',
            attributes: ['id', 'username']
        }
    });
};

exports.getAll = async (options) => 
    await Item.findAll(options);

exports.countAll = async (items) => await items.length;

exports.create = async (item) => 
    await Item.create(item);


exports.update = async (item) =>
    await Item.update(item,{ where: { id: item.id } });

exports.delete = async (itemId) =>
    await Item.destroy({ where: { id: itemId } });