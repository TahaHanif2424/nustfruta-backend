const mongoose = require('mongoose');
const Admin = require('../models/Admin');

// Hardcoded configuration
const MONGODB_URI = 'mongodb+srv://tahahanif009_db_user:abd24hui@shahzil.fqysiha.mongodb.net/nustfruta?retryWrites=true&w=majority&appName=shahzil';
const ADMIN_USERNAME = 'admin';
const ADMIN_EMAIL = 'admin@nustfruta.com';
const ADMIN_PASSWORD = 'admin123';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const seedAdmin = async () => {
  try {
    const adminUsername = ADMIN_USERNAME;
    const adminEmail = ADMIN_EMAIL;
    const adminPassword = ADMIN_PASSWORD;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: adminUsername });

    if (existingAdmin) {
      process.exit(0);
    }

    // Create admin
    const admin = await Admin.create({
      username: adminUsername,
      email: adminEmail,
      password: adminPassword
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
