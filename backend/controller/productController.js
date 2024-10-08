// controllers/categoryController.js
const Category = require('../model/category');
const Product = require('../model/product');
const path = require('path');

exports.createCategory = async (req, res) => {
  try {
    const { categoryName, status } = req.body;
    const image = req.file ? req.file.filename : null; // Get image filename from multer

    const newCategory = new Category({
      categoryName,
      image,
     
      status
      
    });

    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Failed to create category.' });
  }
};

exports.displayCategory=async(req,res)=>{
    try {
        const categories = await Category.find(); // Fetch all categories from the database
        if (categories.length === 0) {
            return res.status(200).json({ message: 'No categories found.' });
        }
        res.status(200).json(categories); // Return the categories as JSON
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Failed to fetch categories.' }); // Return error response
    }
    
}


exports.addProduct = async (req, res) => {
  try {
      const { title, category, quantity, units, productCode, productSKU, regularPrice, salePrice, inStock } = req.body;
      
      // Map the uploaded images to their paths
      const images = req.files.map(file => file.path);

      const product = new Product({
          title,
          category,
          quantity,
          units,
          productCode,
          productSKU,
          regularPrice,
          salePrice,
          inStock,
          images, // Save the image paths
      });

      await product.save();
      res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    console.log(error);
      if (error.code === 11000) {
          return res.status(400).json({ message: 'Product code or SKU already exists' });
      }
      res.status(400).json({ message: 'Error adding product', error: error.message });
  }
};


exports.displayProduct=async(req,res)=>{
  try {
      const products = await Product.find(); // Fetch all categories from the database
      if (products.length === 0) {
          return res.status(200).json({ message: 'Np Products found.' });
      }
      res.status(200).json(products); // Return the categories as JSON
  } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Failed to fetch products.' }); // Return error response
  }
  
}
