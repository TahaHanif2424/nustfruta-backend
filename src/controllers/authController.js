const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const {
  sendSuccess,
  sendError,
  sendValidationError,
  sendUnauthorized
} = require('../utils/responseHandler');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d'
  });
};

// @desc    Login admin
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return sendValidationError(res, 'Please provide username and password');
    }

    // Check if admin exists
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return sendUnauthorized(res, 'Invalid credentials');
    }

    // Check password
    const isPasswordValid = await admin.comparePassword(password);

    if (!isPasswordValid) {
      return sendUnauthorized(res, 'Invalid credentials');
    }

    // Generate token
    const token = generateToken(admin._id);

    return sendSuccess(res, {
      data: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        token
      }
    });
  } catch (error) {
    return sendError(res, 'Server error', 500, error);
  }
};

// @desc    Register admin (only for initial setup)
// @route   POST /api/auth/register
// @access  Public (should be protected in production)
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return sendValidationError(res, 'Please provide all required fields');
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ $or: [{ username }, { email }] });

    if (existingAdmin) {
      return sendValidationError(res, 'Admin already exists');
    }

    // Create admin
    const admin = await Admin.create({
      username,
      email,
      password
    });

    // Generate token
    const token = generateToken(admin._id);

    return sendSuccess(res, {
      data: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        token
      }
    }, 201);
  } catch (error) {
    return sendError(res, 'Server error', 500, error);
  }
};

// @desc    Get current admin
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');

    return sendSuccess(res, { data: admin });
  } catch (error) {
    return sendError(res, 'Server error', 500, error);
  }
};

module.exports = {
  login,
  register,
  getMe
};
