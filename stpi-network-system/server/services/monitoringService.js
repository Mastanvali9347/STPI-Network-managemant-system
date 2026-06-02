const { sampleDashboardMetrics } = require('../utils/dummyData');

const jitter = (value, range = 5) => {
  const delta = Math.floor(Math.random() * range * 2) - range;
  return Math.max(0, value + delta);
};

const generateLiveMetrics = () => ({
  ...sampleDashboardMetrics,
  networkLoad: jitter(sampleDashboardMetrics.networkLoad, 8),
  activeConnections: jitter(sampleDashboardMetrics.activeConnections, 3),
  packetsPerSecond: jitter(sampleDashboardMetrics.packetsPerSecond, 800),
  avgLatencyMs: jitter(sampleDashboardMetrics.avgLatencyMs, 4),
  wifiUtilization: jitter(sampleDashboardMetrics.wifiUtilization, 6),
  timestamp: new Date().toISOString(),
});

module.exports = { generateLiveMetrics };
