// models/Product.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id:{type:String, required:true},
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true }
});

module.exports = mongoose.model('Product', productSchema);