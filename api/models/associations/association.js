const Item = require('../item');
const User = require('../user');

const setupAssociation = () => {
    Item.belongsTo(User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'creator'
    });
}

module.exports = setupAssociation;