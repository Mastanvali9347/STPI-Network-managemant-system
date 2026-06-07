const mongoose = require('mongoose');

const { mongoUri } = require('./env');

mongoose.connection.on('connected', () => {
  console.log('MongoDB connection established');
});

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err.message);
});

/**
 * Connect to MongoDB using validated URI from environment config.
 */
const connectDB = async () => {
  const uri = mongoUri;

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.warn('Auth and persistence require a running MongoDB instance.');
  }
};

module.exports = connectDB;
