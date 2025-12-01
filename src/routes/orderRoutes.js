const express = require('express');
const router = express.Router();
const {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
  updatePaymentStatus,
  updateOrder,
  deleteOrder,
  getOrderStats,
  getOrdersByPhone,
  getTotalRevenue,
  searchOrdersByDate
} = require('../controllers/orderController');
const authMiddleware = require('../middleware/auth');

// Public routes
router.post('/', createOrder);
router.get('/customer/:phone', getOrdersByPhone);

// Private routes (Admin only)
router.get('/', getOrders);
router.get('/search', searchOrdersByDate);
router.get('/stats', getOrderStats);
router.get('/revenue/total', getTotalRevenue);
router.get('/:id',  getOrder);
router.put('/:id/status',  updateOrderStatus);
router.put('/:id/payment',  updatePaymentStatus);
router.put('/:id',  updateOrder);
router.delete('/:id',  deleteOrder);

module.exports = router;
