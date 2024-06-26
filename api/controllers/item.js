const ItemService = require('../services/item');
const asyncHandler = require('../utils/asyncHandler');

exports.get_item = asyncHandler(async (req, res, next) => {
    const item = await ItemService.getItemById(req.params.itemId);
    
    return res.status(200).json({ item: item });
})

exports.get_all_items = asyncHandler(async (req, res, next) => {
    let { limit , page } = req.query;

    const { count, items } = await ItemService.getAllItems(limit, page);

    return res.status(200).json({
        count: count,
        items: items.map(item => {
            return {
                id: item.id,
                itemname: item.itemname,
                price: item.price,
                description: item.description,
                userId: item.userId
            }
        })
    })
})

exports.create_item = asyncHandler(async (req, res, next ) => {
    const item = await ItemService.createItem({
        ...req.body,
        userId: req.userData.userId
    })

    return res.status(200).json({ message: "Item created", post_id: item.id });
});

exports.update_item = asyncHandler(async (req, res, next) => {
    const updatedItem = await ItemService.updateItem({ id: req.params.itemId, ...req.body }, req.userData.username);

    return res.status(200).json({ message: "Item updated" });
})

exports.delete_item = asyncHandler(async (req, res, next) => {
    const deletedItem = await ItemService.deleteItem({ itemId: req.params.itemId });

    return res.status(200).json({ message: "Item deleted" });
})