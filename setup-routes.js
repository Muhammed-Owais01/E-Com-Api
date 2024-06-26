const UserRouter = require('./api/routes/user');
const ItemRouter = require('./api/routes/item');

module.exports = app => 
    app.use('/user', UserRouter)
    .use('/item', ItemRouter)