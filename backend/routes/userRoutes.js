const express = require('express');
const userController = require('../controller/userController');
const router = express.Router();

// Route to handle user signup
router.post('/signUp', userController.Signup);
router.post('/signIn',userController.Signin);
module.exports = router;
