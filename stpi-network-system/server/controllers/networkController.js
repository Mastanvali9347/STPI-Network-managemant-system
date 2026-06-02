const networkSimulator = require('../services/networkSimulator');

/** GET /api/network/devices — simulated device inventory */
const getDevices = (req, res) => {
  res.json(networkSimulator.getDevices());
};

/** GET /api/network/analytics — charts + summary */
const getAnalytics = (req, res) => {
  res.json(networkSimulator.getAnalytics());
};

/** GET /api/network/wifi — SSID list (passwords masked) */
const getWifi = (req, res) => {
  res.json(networkSimulator.getWifi());
};

/** GET /api/network/alerts — alert feed */
const getAlerts = (req, res) => {
  res.json(networkSimulator.getAlerts());
};

/** GET /api/network/users — connected clients */
const getUsers = (req, res) => {
  res.json(networkSimulator.getUsers());
};

/** GET /api/network/topology — enterprise graph for React Flow */
const getTopology = (req, res) => {
  res.json(networkSimulator.getTopology());
};

/** GET /api/network/dashboard — summary cards */
const getDashboard = (req, res) => {
  const { summary, networkStatus } = networkSimulator.getSnapshot();
  res.json({ ...summary, ...networkStatus });
};

module.exports = {
  getDevices,
  getAnalytics,
  getWifi,
  getAlerts,
  getUsers,
  getTopology,
  getDashboard,
};
