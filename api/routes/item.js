const express = require('express');
const router = express.Router();

const ItemController = require('../controllers/item');
const checkAuth = require('../middleware/check-auth');

router.get('/:itemId', ItemController.get_item);

router.get('/', ItemController.get_all_items);

router.post('/', checkAuth, ItemController.create_item);

router.patch('/:itemId', checkAuth, ItemController.update_item);

router.delete('/:itemId', checkAuth, ItemController.delete_item);

module.exports = router;