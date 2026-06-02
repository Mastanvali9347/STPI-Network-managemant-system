const mongoose = require('mongoose');

/**
 * Connect to MongoDB using MONGO_URI from environment.
 * Falls back to MONGODB_URI for backward compatibility.
 */
const connectDB = async () => {
  const uri =
    process.env.MONGO_URI ||
    process.env.MONGODB_URI ||
    'mongodb://127.0.0.1:27017/stpi_network';

  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.warn('Auth and persistence require a running MongoDB instance.');
  }
};

module.exports = connectDB;
