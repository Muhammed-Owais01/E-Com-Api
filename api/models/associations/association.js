const Item = require('../item');
const User = require('../user');
const CartItem = require('../cartItem');
const Cart = require('../cart');

const setupAssociation = () => {
    Item.belongsTo(User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        as: 'creator'
    });

    CartItem.belongsTo(Item, {
        foreignKey: 'itemId',
        onDelete: 'CASCADE',
        as: 'item'
    })

    Cart.hasMany(CartItem, {
        foreignKey: 'cartId',
        onDelete: 'CASCADE',
        as: 'items'
    })

    Cart.belongsTo(User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        as: 'user'
    })
    
}

module.exports = setupAssociation;