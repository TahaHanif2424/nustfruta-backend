const mongoose = require('mongoose');
const Order = require('../models/Order');
const Revenue = require('../models/Revenue');

// Hardcoded MongoDB URI
const MONGO_URI = 'mongodb+srv://tahahanif009_db_user:abd24hui@shahzil.fqysiha.mongodb.net/NustFruta?retryWrites=true&w=majority&appName=shahzil';

const calculateRevenue = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);

    // Calculate total revenue from all orders
    const result = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalAmount' }
        }
      }
    ]);

    const totalRevenue = result.length > 0 ? result[0].totalRevenue : 0;

    // Update or create revenue document
    let revenue = await Revenue.findOne();

    if (!revenue) {
      revenue = await Revenue.create({
        totalRevenue: totalRevenue,
        lastUpdated: new Date()
      });
    } else {
      revenue.totalRevenue = totalRevenue;
      revenue.lastUpdated = new Date();
      await revenue.save();
    }

    process.exit(0);
  } catch (error) {
    console.error('Error calculating revenue:', error);
    process.exit(1);
  }
};

calculateRevenue();
