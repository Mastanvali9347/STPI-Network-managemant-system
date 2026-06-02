require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5001,
  mongoUri:
    process.env.MONGO_URI ||
    process.env.MONGODB_URI ||
    'mongodb://127.0.0.1:27017/stpi_network',
  jwtSecret: process.env.JWT_SECRET || 'stpi_dev_secret_change_in_production',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  nodeEnv: process.env.NODE_ENV || 'development',
};
