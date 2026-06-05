const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { requirePermission } = require('../middleware/rbacMiddleware');
const wifiController = require('../controllers/wifiController');
const { isOfficeHours, OFFICE_HOURS } = require('../data/enterpriseSsids');

const router = express.Router();

// Debug endpoint - shows current time and office hours status
router.get('/debug/time', (req, res) => {
  const now = new Date();
  const hour = now.getHours();
  const isOnline = isOfficeHours();
  
  res.json({
    currentTime: now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    currentHour: hour,
    officeHoursStart: OFFICE_HOURS.START,
    officeHoursEnd: OFFICE_HOURS.END,
    isOfficeHours: isOnline,
    status: isOnline ? '🟢 ONLINE (Office Hours)' : '🔴 OFFLINE (Outside Hours)',
  });
});

// Public WiFi data (no auth required for basic queries)
router.get('/networks', wifiController.listNetworks);
router.get('/clients', wifiController.listClients);

// Protected routes (auth + permission required)
router.post(
  '/networks/:id/reveal-password',
  authMiddleware,
  requirePermission('REVEAL_WIFI_PASSWORD'),
  wifiController.revealPassword
);
router.get(
  '/access-logs',
  authMiddleware,
  requirePermission('VIEW_AUDIT_LOGS'),
  wifiController.getAccessLogs
);
router.get(
  '/reports/export',
  authMiddleware,
  requirePermission('EXPORT_REPORTS'),
  wifiController.exportWifiReport
);

module.exports = router;

