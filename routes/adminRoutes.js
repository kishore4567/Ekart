const express = require('express');
const router = express.Router();
const path = require('path');
const adminController = require('../controllers/adminController');

// Admin login route
router.post('/login', adminController.login);

// Admin signup route
router.post('/signup', adminController.signup); // Add this line

// Routes for admin operations
router.post('/addProduct', adminController.addProduct);
router.delete('/deleteProduct/:id', adminController.deleteProduct);
router.put('/updateProduct/:id', adminController.updateProduct);
router.get('/displayProduct', adminController.displayProduct);

// Route to serve addProduct.html
router.get('/addProductPage', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/addProduct.html'));
});

// Route to serve deleteProduct.html
router.get('/deleteProductPage', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/deleteProduct.html'));
});

// Route to serve login.html
router.get('/loginPage', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
});

//Route to serve signup.html
router.get('/signupPage', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/signup.html'));
});
router.get('/updateProductPage', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/updateProduct.html'));
  });

module.exports = router;
