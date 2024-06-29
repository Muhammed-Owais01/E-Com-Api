const express = require('express');
const router = express.Router();

const ItemController = require('../controllers/item');
const checkAuth = require('../middleware/check-auth');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg')
    {
        cb(null, true);
    } else {cb(null, false)};
};

const upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 5},
    fileFilter: fileFilter
});

router.get('/:itemId', ItemController.get_item);

router.get('/', ItemController.get_all_items);

router.get('/image/:itemId', ItemController.get_image);

router.post('/', checkAuth, upload.single('itemImage'), ItemController.create_item);

router.patch('/:itemId', checkAuth, upload.single('itemImage'), ItemController.update_item);

router.delete('/:itemId', checkAuth, ItemController.delete_item);

module.exports = router;