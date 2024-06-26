const Item = require('../models/item');

exports.getById = async (itemId) =>
    await Item.findByPk(itemId, {
        include: 'creator'
    });

exports.getAll = async (options) => 
    await Item.findAll(options);

exports.countAll = async (items) => await items.length;

exports.create = async (item) => {
    return await Item.create({
        itemname: item.itemname,
        price: item.price,
        description: item.description,
        userId: item.userId
    })
}

exports.update = async (item) =>
    await Item.update(item,{ where: { id: item.id } });

exports.delete = async (itemId) =>
    await Item.destroy({ where: { id: itemId } });