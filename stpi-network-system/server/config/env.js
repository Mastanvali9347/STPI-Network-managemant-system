require('dotenv').config();

const parseClientUrls = (value) =>
  value
    ? value.split(',').map((item) => item.trim()).filter(Boolean)
    : ['http://localhost:5173'];

module.exports = {
  port: process.env.PORT || 5001,
  mongoUri:
    process.env.MONGO_URI ||
    process.env.MONGODB_URI ||
    'mongodb://127.0.0.1:27017/stpi_network',
  jwtSecret: process.env.JWT_SECRET || 'stpi_dev_secret_change_in_production',
  clientUrls: parseClientUrls(process.env.CLIENT_URL),
  nodeEnv: process.env.NODE_ENV || 'development',
};
