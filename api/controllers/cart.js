const CartService = require('../services/cart');
const asyncHandler = require('../utils/asyncHandler');

exports.get_all_items = asyncHandler(async (req, res, next) => {
    const { count, items } = await CartService.getAllCartItems(req.userData.userId);
    let total = 0;

    return res.status(200).json({
        count: count,
        cartId: items[0].cartId,
        items: items.map(item => {
            total += item.quantity * item.item.price;
            return {
                id: item.item.id,
                itemname: item.item.itemname,
                price: item.item.price,
                description: item.item.description,
                quantity: item.quantity
            }
        }),
        total: total
    })
})

exports.add_to_cart = asyncHandler(async (req, res, next) => {
    const item = await CartService.addItemToCart({ userId: req.userData.userId, itemId: req.params.itemId });

    return res.status(200).json({ message: "Added to cart", itemId: item.itemId });
})

exports.update_cart = asyncHandler(async (req, res, next) => {
    const updatedItem = await CartService.updateQuantity({ userId: req.userData.userId, itemId: req.params.itemId, quantity: req.body.quantity });

    return res.status(200).json({ message: "Cart Updated" });
})

exports.delete_from_cart = asyncHandler(async (req, res, next) => {
    const deletedItem = await CartService.deleteFromCart({ userId: req.userData.userId, itemId: req.params.itemId });

    return res.status(200).json({ message: "Item successfully deleted from cart", itemId: deletedItem.itemId });
})