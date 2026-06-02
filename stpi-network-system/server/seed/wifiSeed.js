/**
 * Seed encrypted WiFi credentials for all enterprise SSIDs.
 * Run: npm run seed:wifi
 */
require('dotenv').config();
const wifiManagement = require('../services/wifiManagementService');
const connectDB = require('../config/db');

const run = async () => {
  await connectDB();
  const result = await wifiManagement.seedVault();
  console.log('WiFi vault seeded:', result);
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
