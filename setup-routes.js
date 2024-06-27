const UserRouter = require('./api/routes/user');
const ItemRouter = require('./api/routes/item');
const CartRouter = require('./api/routes/cart');

module.exports = app => 
    app.use('/user', UserRouter)
    .use('/item', ItemRouter)
    .use('/cart', CartRouter)