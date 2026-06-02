const networkSimulator = require('../services/networkSimulator');
const { getExtendedAnalytics } = require('../services/analyticsExtended');
const { generateInsights } = require('../services/insightsService');
const { buildReport } = require('../services/reportsService');
const deviceManagement = require('../services/deviceManagementService');

exports.getExtendedAnalytics = (req, res) => {
  const range = req.query.range || '24h';
  const snapshot = networkSimulator.getSnapshot();
  res.json(getExtendedAnalytics(range, snapshot));
};

exports.getInsights = (req, res) => {
  res.json(generateInsights(networkSimulator.getSnapshot()));
};

exports.getReport = (req, res) => {
  const period = req.query.period || 'daily';
  res.json(buildReport(period, networkSimulator.getSnapshot()));
};

exports.globalSearch = (req, res) => {
  const q = (req.query.q || '').toLowerCase().trim();
  if (!q) return res.json({ devices: [], wifi: [], alerts: [] });

  const snapshot = networkSimulator.getSnapshot();
  const devices = deviceManagement
    .getAll()
    .filter(
      (d) =>
        d.deviceName?.toLowerCase().includes(q) ||
        d.ipAddress?.toLowerCase().includes(q) ||
        d.location?.toLowerCase().includes(q) ||
        d.floor?.toLowerCase().includes(q)
    )
    .slice(0, 20);

  const wifi = (snapshot.wifi || []).filter(
    (w) => w.wifiName?.toLowerCase().includes(q)
  );

  const alerts = (snapshot.alerts || []).filter(
    (a) =>
      a.title?.toLowerCase().includes(q) ||
      a.message?.toLowerCase().includes(q) ||
      a.source?.toLowerCase().includes(q)
  );

  res.json({ devices, wifi, alerts });
};
