/**
 * Seeds dummy admin user for local development.
 * Password is hashed automatically by the User model pre-save hook.
 *
 * Demo credentials (documented only — change in production):
 *   Email:    admin@stpi.com
 *   Password: Admin123
 */
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const DEMO_ADMIN = {
  name: 'STPI Administrator',
  email: 'admin@stpi.com',
  password: 'Admin123',
  role: 'super_admin',
};

const seedAdmin = async () => {
  const uri =
    process.env.MONGO_URI ||
    process.env.MONGODB_URI ||
    'mongodb://127.0.0.1:27017/stpi_network';

  await mongoose.connect(uri);

  const existing = await User.findOne({ email: DEMO_ADMIN.email });
  if (existing) {
    // Re-apply demo password so local login always matches Admin123
    existing.password = DEMO_ADMIN.password;
    existing.name = DEMO_ADMIN.name;
    existing.role = 'super_admin';
    await existing.save();
    console.log('Admin user updated (demo password reset):', DEMO_ADMIN.email);
  } else {
    await User.create(DEMO_ADMIN);
    console.log('Admin user created:', DEMO_ADMIN.email);
  }

  console.log('Use demo login: admin@stpi.com / Admin123');
  await mongoose.disconnect();
};

if (require.main === module) {
  seedAdmin().catch((err) => {
    console.error('Admin seed failed:', err.message);
    process.exit(1);
  });
}

module.exports = { seedAdmin, DEMO_ADMIN };
