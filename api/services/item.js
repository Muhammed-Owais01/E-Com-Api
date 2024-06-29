const ItemDAO = require('../dao/item');
const parseQuery = require('../utils/parseQuery');
const path = require('path');
const fs = require('fs');
const deleteFile = require('../utils/deleteFile');

exports.getItemById = async (itemId) => {
    const item = await ItemDAO.getById(itemId);
    
    if (!item) throw {
        status: 404,
        message: "Item not found"
    }

    return item;
}

exports.getAllItems = async (limit, page) => {
    const docs = await ItemDAO.getAll(parseQuery(limit, page));

    if (!docs) throw {
        status: 404,
        message: "Could not find items"
    }

    return {
        count: await ItemDAO.countAll(docs),
        items: docs
    }
}

exports.getImageById = async (itemId) => {
    const item = await this.getItemById(itemId);

    const filePath = path.join(__dirname, '../../uploads', item.itemImage);
    if (!fs.existsSync(filePath)) {
        return res.status(500).json({ message: 'File not found after upload' });
    }

    return filePath;
}

exports.createItem = async (item, file) => {
    return await ItemDAO.create({
        itemname: item.itemname,
        price: item.price,
        description: item.description,
        itemImage: file?.filename,
        userId: item.userId
    })
}

exports.updateItem = async (newItem, username, file) => {
    const item = await ItemDAO.getById(newItem.id);
    
    if (item.creator.username !== username) throw {
        status: 403,
        message: "You cannot change this post"
    }

    if (file)
        deleteFile(item.itemImage);

    await ItemDAO.update({ ...newItem, itemImage: file.filename });
}

exports.deleteItem = async (itemId) => {
    const item = await ItemDAO.getById(itemId);

    if (!item) throw {
        status: 404,
        message: "Item does not exist"
    }

    if (item.itemImage)
        deleteFile(item.itemImage);

    await ItemDAO.delete(itemId);
}