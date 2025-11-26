const mongoose = require('mongoose');
const Product = require('../models/Product');

// Hardcoded MongoDB URI
const MONGODB_URI = 'mongodb+srv://tahahanif009_db_user:abd24hui@shahzil.fqysiha.mongodb.net/nustfruta?retryWrites=true&w=majority&appName=shahzil';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const sampleProducts = [
  {
    name: 'Fresh Apples',
    description: 'Crisp and sweet, perfect for snacking',
    price: 150,
    unit: 'kg',
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=400&h=400&fit=crop',
    inStock: true,
    featured: true
  },
  {
    name: 'Bananas',
    description: 'Energy-packed and delicious',
    price: 120,
    unit: 'dozen',
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400&h=400&fit=crop',
    inStock: true,
    featured: true
  },
  {
    name: 'Fresh Oranges',
    description: 'Juicy and vitamin C rich',
    price: 180,
    unit: 'kg',
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=400&fit=crop',
    inStock: true,
    featured: true
  },
  {
    name: 'Strawberries',
    description: 'Sweet and fresh berries',
    price: 300,
    unit: 'box',
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop',
    inStock: true,
    featured: true
  },
  {
    name: 'Mangoes',
    description: 'Sweet and juicy Pakistani mangoes',
    price: 200,
    unit: 'kg',
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=400&fit=crop',
    inStock: true,
    featured: false
  },
  {
    name: 'Grapes',
    description: 'Fresh seedless grapes',
    price: 250,
    unit: 'kg',
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1599819177626-b0ba80c58295?w=400&h=400&fit=crop',
    inStock: true,
    featured: false
  }
];

const seedProducts = async () => {
  try {
    // Clear existing products
    await Product.deleteMany({});
    console.log('Existing products cleared');

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log(`${sampleProducts.length} sample products created successfully`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
