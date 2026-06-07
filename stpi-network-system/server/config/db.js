const mongoose = require('mongoose');
const { mongoUri } = require('./env');

const MAX_RETRIES = 5;
const RETRY_INTERVAL_MS = 5000;

// Centralized connection event monitoring
mongoose.connection.on('connected', () => {
  console.log('✅ [MongoDB] Connection established successfully');
});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ [MongoDB] Disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ [MongoDB] Error:', err.message);
});

mongoose.connection.on('reconnected', () => {
  console.log('🔄 [MongoDB] Reconnection successful');
});

/**
 * Robust MongoDB connection wrapper with retry logic
 */
const connectDB = async (retryCount = 0) => {
  try {
    // URL Encoding Check: If the URI contains unencoded '@' or ':' in the password section it will throw.
    // We expect the user to provide a correct URI, but we can log a hint.
    if (mongoUri && mongoUri.includes('@') && mongoUri.split('@')[0].includes(':', 10)) {
       // Basic check for nested colon in user:pass part
    }

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 8000, // Wait up to 8 seconds for server selection
      socketTimeoutMS: 45000,
    });
    
    return true;
  } catch (error) {
    console.error(`❌ [MongoDB] Connection attempt ${retryCount + 1} failed:`, error.message);

    if (error.message.includes('whitelist') || error.message.includes('IP address')) {
      console.warn('💡 [Atlas Tip] Your Render IP is likely blocked. Enable 0.0.0.0/0 in MongoDB Atlas Network Access.');
    } else if (error.message.includes('Authentication failed')) {
      console.warn('💡 [Atlas Tip] Invalid credentials. Check your MONGO_URI username and password.');
    }

    if (retryCount < MAX_RETRIES) {
      console.log(`⏳ [MongoDB] Retrying in ${RETRY_INTERVAL_MS / 1000}s...`);
      setTimeout(() => connectDB(retryCount + 1), RETRY_INTERVAL_MS);
    } else {
      console.error('🔥 [MongoDB] Max retries reached. Platform will run in memory-only mode.');
    }
    
    return false;
  }
};

module.exports = connectDB;
