const mongoose = require('mongoose');

const wifiAccessLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userEmail: { type: String, required: true },
    userRole: { type: String, required: true },
    ssid: { type: String, required: true },
    action: {
      type: String,
      enum: ['reveal_password', 'copy_password', 'export_wifi'],
      required: true,
    },
    ipAddress: { type: String },
    success: { type: Boolean, default: true },
  },
  { timestamps: true }
);

wifiAccessLogSchema.index({ createdAt: -1 });

module.exports = mongoose.model('WifiAccessLog', wifiAccessLogSchema);
