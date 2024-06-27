const express = require('express');
const router = express.Router();

const CartController = require('../controllers/cart');
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, CartController.get_all_items);

router.post('/:itemId', checkAuth, CartController.add_to_cart);

router.patch('/:itemId', checkAuth, CartController.update_cart);

router.delete('/:itemId', checkAuth, CartController.delete_from_cart);

module.exports = router;