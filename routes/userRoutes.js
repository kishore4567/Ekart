const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require('../controllers/userController');

// Route to display products to users
router.get('/products', userController.getProducts);

// Route to serve products.html
router.get('/productsPage', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/products.html'));
});

module.exports = router;
