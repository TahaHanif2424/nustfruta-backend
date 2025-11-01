const express = require('express');
const router = express.Router();
const { login, register, getMe } = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// Public routes
router.post('/login', login);
router.post('/register', register);

// Private routes
router.get('/me', authMiddleware, getMe);

module.exports = router;
