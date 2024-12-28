// controllers/adminController.js

const Admin = require('../models/Admin');
const Product = require('../models/Product');


// Admin login
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username });
        if (!admin || admin.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.signup = async (req, res) => {
    const { username, password } = req.body;
    try {
        const newAdmin = new Admin({ username, password });
        await newAdmin.save();
        res.status(201).json({ message: 'Admin signup successful' });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Add product
exports.addProduct = async (req, res) => {
    const { id, name, price, description } = req.body;
    try {
        const newProduct = new Product({ id, name, price, description });
        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully' });
    } catch (err) {
        console.error('Add product error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete product
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
try {
    console.log(`Attempting to delete product with id: ${id}`);
    
    // Validate the id format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.error('Invalid product ID format');
        return res.status(400).json({ message: 'Invalid product ID format' });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);
    
    if (!deletedProduct) {
        console.error('Product not found');
        return res.status(404).json({ message: 'Product not found' });
    }

    console.log(`Product with id: ${id} deleted successfully`);
    res.status(200).json({ message: 'Product deleted successfully' });
} catch (err) {
    console.error('Delete product error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
}
};

// Update product
exports.updateProduct = async (req, res) => {
    const { id } = req.params; // Extract id from req.params instead of req.body
    const { name, price, description } = req.body;
    try {
        await Product.findByIdAndUpdate(id, { name, price, description });
        res.status(200).json({ message: 'Product updated successfully' });
    } catch (err) {
        console.error('Update product error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Display products
exports.displayProduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        console.error('Display product error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};


// Admin get product by ID
exports.getProductById = async (req, res) => {
    const { productName } = req.params;
    try {
        const product = await Product.findOne({ name: productName });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (err) {
        console.error('Error retrieving product:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
