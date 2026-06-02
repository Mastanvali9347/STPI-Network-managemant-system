const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env');

/** Build a safe user object for API responses (no password). */
const toPublicUser = (user) => {
  if (!user) return null;
  return {
    id: user._id?.toString() || user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
};

/** Sign JWT with user id, email, and role. */
const signToken = (user) =>
  jwt.sign(
    {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    },
    jwtSecret,
    { expiresIn: '8h' }
  );

const isDbReady = () => require('mongoose').connection.readyState === 1;

module.exports = { toPublicUser, signToken, isDbReady };
