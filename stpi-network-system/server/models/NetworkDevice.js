const mongoose = require('mongoose');

const networkDeviceSchema = new mongoose.Schema(
  {
    deviceId: { type: String, required: true, unique: true },
    label: { type: String, required: true },
    type: { type: String, enum: ['router', 'switch', 'accessPoint', 'firewall', 'cloud'], required: true },
    status: { type: String, enum: ['online', 'offline', 'warning'], default: 'online' },
    floor: { type: Number },
    metadata: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

module.exports = mongoose.model('NetworkDevice', networkDeviceSchema);
