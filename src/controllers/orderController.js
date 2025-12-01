const Order = require('../models/Order');
const Product = require('../models/Product');
const Revenue = require('../models/Revenue');

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private (Admin only)
const getOrders = async (req, res) => {
  try {
    const { status } = req.query;

    // Build filter
    const filter = {};
    if (status) filter.status = status;

    const orders = await Order.find(filter)
      .populate('items.product', 'name image')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private (Admin only)
const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product', 'name image price');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Create order
// @route   POST /api/orders
// @access  Public
const createOrder = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
    }

    const {
      customerName,
      customerPhone,
      customerEmail,
      hostelName,
      roomNumber,
      items,
      paymentMethod,
      notes,
      isPaid
    } = req.body;

    // Validate required fields
    if (!customerName || !customerPhone || !hostelName || !roomNumber || !items || items.length === 0) {
      if (process.env.NODE_ENV === 'development') {
      }
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Calculate total amount and validate products
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.product}`
        });
      }

      if (!product.inStock) {
        return res.status(400).json({
          success: false,
          message: `Product out of stock: ${product.name}`
        });
      }

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity
      });
    }

    // Create order
    const order = await Order.create({
      customerName,
      customerPhone,
      customerEmail,
      hostelName,
      roomNumber,
      items: orderItems,
      totalAmount,
      paymentMethod,
      notes,
      isPaid: isPaid === true ? true : false
    });

    // Update total revenue
    let revenue = await Revenue.findOne();
    if (!revenue) {
      // Create revenue document if it doesn't exist
      revenue = await Revenue.create({
        totalRevenue: totalAmount,
        lastUpdated: new Date()
      });
    } else {
      // Update existing revenue
      revenue.totalRevenue += totalAmount;
      revenue.lastUpdated = new Date();
      await revenue.save();
    }

    if (process.env.NODE_ENV === 'development') {
    }
    res.status(201).json({
      success: true,
      data: order
    });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('=== Order Creation Error ===');
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      console.error('Error details:', error);
    }
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private (Admin only)
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Please provide status'
      });
    }

    const validStatuses = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    order.status = status;
    await order.save();

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update order payment status
// @route   PUT /api/orders/:id/payment
// @access  Private (Admin only)
const updatePaymentStatus = async (req, res) => {
  try {
    const { isPaid } = req.body;

    if (typeof isPaid !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: 'Please provide isPaid as a boolean value'
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    order.isPaid = isPaid;
    await order.save();

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update order
// @route   PUT /api/orders/:id
// @access  Private (Admin only)
const updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.json({
      success: true,
      data: updatedOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private (Admin only)
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Update total revenue (subtract deleted order amount)
    const revenue = await Revenue.findOne();
    if (revenue) {
      revenue.totalRevenue -= order.totalAmount;
      revenue.lastUpdated = new Date();
      await revenue.save();
    }

    await Order.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Order deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get order statistics
// @route   GET /api/orders/stats
// @access  Private (Admin only)
const getOrderStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: 'pending' });
    const confirmedOrders = await Order.countDocuments({ status: 'confirmed' });
    const deliveredOrders = await Order.countDocuments({ status: 'delivered' });

    const totalRevenue = await Order.aggregate([
      { $match: { status: 'delivered' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    res.json({
      success: true,
      data: {
        totalOrders,
        pendingOrders,
        confirmedOrders,
        deliveredOrders,
        totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get orders by customer phone number
// @route   GET /api/orders/customer/:phone
// @access  Public
const getOrdersByPhone = async (req, res) => {
  try {
    const { phone } = req.params;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required'
      });
    }

    const orders = await Order.find({ customerPhone: phone })
      .populate('items.product', 'name image price')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Search orders by date range
// @route   GET /api/orders/search
// @access  Private (Admin only)
const searchOrdersByDate = async (req, res) => {
  try {
    const { startDate, endDate, status } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Please provide startDate and endDate'
      });
    }

    // Parse dates and set time boundaries
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    // Build filter
    const filter = {
      createdAt: {
        $gte: start,
        $lte: end
      }
    };

    // Add status filter if provided
    if (status) {
      filter.status = status;
    }

    const orders = await Order.find(filter)
      .populate('items.product', 'name image')
      .sort({ createdAt: -1 });

    // Calculate total revenue for the date range
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    res.json({
      success: true,
      count: orders.length,
      totalRevenue,
      dateRange: {
        start: start.toISOString(),
        end: end.toISOString()
      },
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get total revenue
// @route   GET /api/orders/revenue/total
// @access  Private (Admin only)
const getTotalRevenue = async (req, res) => {
  try {
    let revenue = await Revenue.findOne();

    if (!revenue) {
      // Create revenue document if it doesn't exist
      revenue = await Revenue.create({
        totalRevenue: 0,
        lastUpdated: new Date()
      });
    }

    res.json({
      success: true,
      data: {
        totalRevenue: revenue.totalRevenue,
        lastUpdated: revenue.lastUpdated
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
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
};
