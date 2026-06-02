const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { requirePermission } = require('../middleware/rbacMiddleware');
const wifiController = require('../controllers/wifiController');

const router = express.Router();
router.use(authMiddleware);

router.get(
  '/networks',
  requirePermission('VIEW_WIFI_DASHBOARD'),
  wifiController.listNetworks
);
router.get(
  '/clients',
  requirePermission('VIEW_WIFI_DASHBOARD'),
  wifiController.listClients
);
router.post(
  '/networks/:id/reveal-password',
  requirePermission('REVEAL_WIFI_PASSWORD'),
  wifiController.revealPassword
);
router.get(
  '/access-logs',
  requirePermission('VIEW_AUDIT_LOGS'),
  wifiController.getAccessLogs
);
router.get(
  '/reports/export',
  requirePermission('EXPORT_REPORTS'),
  wifiController.exportWifiReport
);

module.exports = router;
