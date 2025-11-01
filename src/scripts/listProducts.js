const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const listProducts = async () => {
  try {
    const products = await Product.find({});

    if (products.length === 0) {
      console.log('\n⚠️  No products found in database!');
      console.log('Run "npm run seed:products" to create sample products.\n');
    } else {
      console.log(`\n✅ Found ${products.length} products:\n`);
      products.forEach((product, index) => {
        console.log(`${index + 1}. ${product.name}`);
        console.log(`   ID: ${product._id}`);
        console.log(`   Price: Rs. ${product.price}/${product.unit}`);
        console.log(`   In Stock: ${product.inStock ? 'Yes' : 'No'}`);
        console.log('');
      });
    }

    process.exit(0);
  } catch (error) {
    console.error('Error listing products:', error);
    process.exit(1);
  }
};

listProducts();
