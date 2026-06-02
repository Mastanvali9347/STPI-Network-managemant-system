require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Alert = require('../models/Alert');
const NetworkDevice = require('../models/NetworkDevice');
const { DEMO_ADMIN } = require('./adminSeed');
const { sampleAlerts, sampleTopology } = require('../utils/dummyData');

const seed = async () => {
  const uri =
    process.env.MONGO_URI ||
    process.env.MONGODB_URI ||
    'mongodb://127.0.0.1:27017/stpi_network';

  await mongoose.connect(uri);

  await User.deleteMany({});
  await Alert.deleteMany({});
  await NetworkDevice.deleteMany({});

  // Password hashed via User model pre-save hook
  await User.create(DEMO_ADMIN);

  await Alert.insertMany(
    sampleAlerts.map(({ severity, title, message, source, acknowledged }) => ({
      severity,
      title,
      message,
      source,
      acknowledged,
    }))
  );

  await NetworkDevice.insertMany(
    sampleTopology.nodes.map((node) => ({
      deviceId: node.id,
      label: node.label,
      type: node.type,
      status: node.status,
    }))
  );

  console.log('Full seed completed.');
  console.log('Demo login: admin@stpi.com / Admin123');
  await mongoose.disconnect();
};

seed().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
