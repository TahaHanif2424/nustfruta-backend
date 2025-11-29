const mongoose = require('mongoose');
const Product = require('../models/Product');

// Hardcoded MongoDB URI
const MONGODB_URI = 'mongodb+srv://tahahanif009_db_user:abd24hui@shahzil.fqysiha.mongodb.net/NustFruta?retryWrites=true&w=majority&appName=shahzil';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const listProducts = async () => {
  try {
    const products = await Product.find({});

    if (products.length === 0) {
    } else {
      products.forEach((product, index) => {
      });
    }

    process.exit(0);
  } catch (error) {
    console.error('Error listing products:', error);
    process.exit(1);
  }
};

listProducts();
