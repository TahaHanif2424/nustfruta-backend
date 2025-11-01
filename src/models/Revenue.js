const mongoose = require('mongoose');

const revenueSchema = new mongoose.Schema({
  totalRevenue: {
    type: Number,
    default: 0,
    required: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Revenue', revenueSchema);
