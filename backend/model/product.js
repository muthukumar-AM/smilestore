const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    units: {
        type: String,
        required: true,
        
    },
    productCode: {
        type: String,
        required: true,
        unique: true, // Ensure productCode is unique
    },
    productSKU: {
        type: String,
        required: true,
        unique: true, // Ensure productSKU is unique
    },
    regularPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    salePrice: {
        type: Number,
        min: 0,
        default: null,
    },
    inStock: {
        type: Boolean,
        default: true,
    },
    images: [{
        type: String, // Assuming the images are stored as URLs
    }],
}, {
    timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);
