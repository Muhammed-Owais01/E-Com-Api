const ItemDAO = require('../dao/item');
const parseQuery = require('../utils/parseQuery');

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

exports.createItem = async (item) => {
    return await ItemDAO.create({
        itemname: item.itemname,
        price: item.price,
        description: item.description,
        userId: item.userId
    })
}

exports.updateItem = async (newItem, userData) => {
    const item = await ItemDAO.getById(newItem.id);
    console.log("Username by item: " + item.creator.username);
    console.log("Username by userData: " + userData.username);
    if (item.creator.username !== userData.username) throw {
        status: 403,
        message: "You cannot change this post"
    }

    await ItemDAO.update(...item);
}

exports.deleteItem = async (itemId) => {
    const item = await ItemDAO.getById(itemId);

    if (!item) throw {
        status: 404,
        message: "Item does not exist"
    }

    await ItemDAO.delete(itemId);
}