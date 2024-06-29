const fs = require('fs');

module.exports = filePath => {
    fs.unlink(`./uploads/${filePath}`, (err) => console.log(`./uploads/${filePath}` + err));
}