const mongoose = require('mongoose');

const wifiNetworkSchema = new mongoose.Schema(
  {
    ssid: { type: String, required: true, unique: true, trim: true },
    passwordEncrypted: { type: String, required: true, select: false },
    securityType: {
      type: String,
      default: 'WPA2-Enterprise',
      enum: ['WPA3-Enterprise', 'WPA2-Enterprise', 'WPA2-Personal', 'WPA3-Personal', 'Open'],
    },
    floor: { type: String, default: 'Floor 1' },
    accessPoint: { type: String, default: 'AP-Floor1' },
    vlan: { type: Number, default: 10 },
    enabled: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('WifiNetwork', wifiNetworkSchema);
