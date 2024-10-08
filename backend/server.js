// server.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Routes = require('./routes/productRoutes');
const userRoutes=require('./routes/userRoutes');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files

// Routes
app.use('/api', Routes);
app.use('/api/user', userRoutes)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
