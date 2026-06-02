const express = require('express');
const { register, login, getProfile, changePassword } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected route — requires valid JWT
router.get('/profile', authMiddleware, getProfile);
router.put('/password', authMiddleware, changePassword);

module.exports = router;
