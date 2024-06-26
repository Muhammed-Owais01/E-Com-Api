const http = require('http');
const app = require('./app');
const sequelize = require('./db');
const setupAssociation = require('./api/models/associations/association');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

(async() => {
    try {
        await sequelize.authenticate();
        setupAssociation();

        await sequelize.sync({ alter: true });
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})()

console.log(`https:://localhost:${port}`);

server.listen(port);