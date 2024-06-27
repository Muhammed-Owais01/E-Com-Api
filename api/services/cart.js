const CartItemDAO = require('../dao/cartItem');
const CartDAO = require('../dao/cart');
const ItemDAO = require('../dao/item');

exports.getAllCartItems = async (userId) => {
    const cart = await CartDAO.getCart(userId);
    if (!cart) throw {
        status: 404,
        message: "Cart does not exist"
    }

    const items = await CartItemDAO.getAll(cart.id);

    if (!items) throw {
        status: 404,
        message: "Could not find items"
    }
    
    return {
        count: await CartDAO.countAll(items),
        items: items
    }
}

exports.addItemToCart = async (cartItem) => {
    const item = await ItemDAO.getById(cartItem.itemId);
    if (!item) throw {
        status: 404,
        message: "Item does not exist"
    }

    const cart = await CartDAO.getCart(cartItem.userId);
    if (!cart) throw {
        status: 404,
        message: "Cart does not exist"
    }

    return await CartItemDAO.addItem({ cartId: cart.id, ...cartItem });
}

exports.updateQuantity = async (cartItem) => {
    const cart = await CartDAO.getCart(cartItem.userId);

    if (!cart) throw {
        status: 404,
        message: "Cart does not exist"
    }

    const item = await CartItemDAO.getItem({ cartId: cart.id, ...cartItem });

    if (!item) throw {
        status: 404,
        message: "Item does not exist"
    }
    
    return await CartItemDAO.updateQuantity({ cartId: cart.id, ...cartItem });
}

exports.deleteFromCart = async (cartItem) => {
    const cart = await CartDAO.getCart(cartItem.userId);

    if (!cart) throw {
        status: 404,
        message: "Cart does not exist"
    }

    const item = await CartItemDAO.getItem({ cartId: cart.id, ...cartItem });

    if (!item) throw {
        status: 404,
        message: "Item does not exist"
    }

    return await CartItemDAO.deleteItem({ cartId: cart.id, ...cartItem });
} 