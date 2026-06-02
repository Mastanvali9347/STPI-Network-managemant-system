const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema(
  {
    severity: { type: String, enum: ['info', 'warning', 'critical'], required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    source: { type: String, default: 'system' },
    acknowledged: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Alert', alertSchema);
