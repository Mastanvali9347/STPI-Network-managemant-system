const express = require('express');
const {
  getDevices,
  getAnalytics,
  getWifi,
  getAlerts,
  getUsers,
  getTopology,
  getDashboard,
} = require('../controllers/networkController');

const router = express.Router();

// Primary monitoring API (simulated live data)
router.get('/devices', getDevices);
router.get('/analytics', getAnalytics);
router.get('/wifi', getWifi);
router.get('/alerts', getAlerts);

// Additional routes used by dashboard pages
router.get('/users', getUsers);
router.get('/topology', getTopology);
router.get('/dashboard', getDashboard);

module.exports = router;
