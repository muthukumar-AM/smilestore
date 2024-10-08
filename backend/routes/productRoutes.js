// routes/categoryRoutes.js
const path=require('path');
const express = require('express');
const multer = require('multer');
const categoryController = require('../controller/productController');
const productController=require('../controller/productController');

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../uploads')); // Use a relative path
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Use a unique filename
    },
  });

const upload = multer({ storage });

// Create a new category
router.post('/addCategory', upload.single('image'), categoryController.createCategory);
router.get('/categories',categoryController.displayCategory);
router.post('/addProduct',upload.array('images', 5),productController.addProduct);
router.get('/products',productController.displayProduct);

module.exports = router;
