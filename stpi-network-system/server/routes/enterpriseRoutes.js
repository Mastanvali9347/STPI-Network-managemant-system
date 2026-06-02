const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const deviceController = require('../controllers/deviceController');
const enterpriseController = require('../controllers/enterpriseController');

const router = express.Router();
router.use(authMiddleware);

// Device management
router.get('/devices', deviceController.listDevices);
router.get('/devices/:id', deviceController.getDevice);
router.post('/devices', deviceController.createDevice);
router.put('/devices/:id', deviceController.updateDevice);
router.delete('/devices/:id', deviceController.deleteDevice);
router.patch('/devices/:id/toggle', deviceController.toggleDevice);

// Analytics, insights, reports, search
router.get('/analytics/extended', enterpriseController.getExtendedAnalytics);
router.get('/insights', enterpriseController.getInsights);
router.get('/reports', enterpriseController.getReport);
router.get('/search', enterpriseController.globalSearch);

module.exports = router;
