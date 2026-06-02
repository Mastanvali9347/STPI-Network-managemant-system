const User = require('../models/User');
const { toPublicUser, signToken, isDbReady } = require('../utils/authHelpers');

const ensureDatabase = (res) => {
  if (!isDbReady()) {
    res.status(503).json({
      message: 'Database unavailable. Start MongoDB and run npm run seed.',
    });
    return false;
  }
  return true;
};

/**
 * POST /api/auth/register — Create admin account (demo / initial setup).
 */
const register = async (req, res, next) => {
  try {
    if (!ensureDatabase(res)) return;

    const { name, email, password, role } = req.body;

    if (!name?.trim() || !email?.trim() || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' });
    }

    const exists = await User.findOne({ email: email.toLowerCase().trim() });
    if (exists) {
      return res.status(409).json({ message: 'An account with this email already exists' });
    }

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role: ['super_admin', 'network_admin', 'viewer', 'admin', 'operator'].includes(role)
        ? role === 'admin'
          ? 'super_admin'
          : role === 'operator'
            ? 'network_admin'
            : role
        : 'network_admin',
    });

    const token = signToken(user);

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: toPublicUser(user),
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Email already registered' });
    }
    next(error);
  }
};

/**
 * POST /api/auth/login — Validate credentials and return JWT.
 */
const login = async (req, res, next) => {
  try {
    if (!ensureDatabase(res)) return;

    const { email, password } = req.body;

    if (!email?.trim() || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = signToken(user);

    res.json({
      message: 'Login successful',
      token,
      user: toPublicUser(user),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/auth/profile — Return authenticated user (no password).
 */
const getProfile = async (req, res) => {
  res.json({
    user: toPublicUser(req.user),
  });
};

/**
 * PUT /api/auth/password — Change password for logged-in user.
 */
const changePassword = async (req, res, next) => {
  try {
    if (!ensureDatabase(res)) return;

    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current and new password are required' });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ message: 'New password must be at least 8 characters' });
    }

    const user = await User.findById(req.user.id || req.user._id).select('+password');
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getProfile, changePassword };
