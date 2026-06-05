const wifiManagement = require('../services/wifiManagementService');
const { buildReport } = require('../services/reportsService');
const networkSimulator = require('../services/networkSimulator');
const { can } = require('../utils/rbac');

exports.listNetworks = async (req, res, next) => {
  try {
    const live = await wifiManagement.tick();
    let networks = live.networks;
    const { q, status, band, floor, signal } = req.query;

    if (q) networks = wifiManagement.searchNetworks(networks, q);
    if (status && status !== 'all') networks = networks.filter((n) => n.status === status);
    if (band && band !== 'all') networks = networks.filter((n) => n.frequency === band);
    if (floor && floor !== 'all') networks = networks.filter((n) => n.floor === floor);
    if (signal === 'weak') networks = networks.filter((n) => n.signalStrength < -70);
    if (signal === 'good') networks = networks.filter((n) => n.signalStrength >= -65);

    res.json({
      networks,
      floorStats: live.floorStats,
      analytics: live.analytics,
      events: live.events,
      canRevealPassword: req.user ? can(req.user.role, 'REVEAL_WIFI_PASSWORD') : false,
    });
  } catch (e) {
    next(e);
  }
};

exports.listClients = async (req, res, next) => {
  try {
    const live = await wifiManagement.tick();
    let clients = live.clients;
    const { q, ssid, floor, status } = req.query;
    if (ssid) clients = clients.filter((c) => c.ssid === ssid);
    if (floor) clients = clients.filter((c) => c.floor === floor);
    if (status && status !== 'all') clients = clients.filter((c) => c.status === status);
    if (q) {
      const term = q.toLowerCase();
      clients = clients.filter(
        (c) =>
          c.deviceName?.toLowerCase().includes(term) ||
          c.macAddress?.toLowerCase().includes(term) ||
          c.ipAddress?.includes(term)
      );
    }
    res.json({ clients, total: clients.length });
  } catch (e) {
    next(e);
  }
};

exports.revealPassword = async (req, res, next) => {
  try {
    const { adminPassword } = req.body;
    if (!adminPassword) {
      return res.status(400).json({ message: 'Admin password required for verification' });
    }
    const result = await wifiManagement.revealPassword(
      req,
      req.params.id,
      adminPassword
    );
    if (result.error) {
      return res.status(result.status).json({ message: result.error });
    }
    res.json({ ssid: result.ssid, password: result.password });
  } catch (e) {
    next(e);
  }
};

exports.getAccessLogs = async (req, res, next) => {
  try {
    const logs = await wifiManagement.getAccessLogs();
    res.json(logs);
  } catch (e) {
    next(e);
  }
};

exports.exportWifiReport = async (req, res, next) => {
  try {
    const live = await wifiManagement.tick();
    const snapshot = networkSimulator.getSnapshot();
    const report = buildReport(req.query.period || 'daily', snapshot);
    report.wifiNetworks = live.networks;
    report.wifiClients = live.clients;
    report.wifiAnalytics = live.analytics;
    res.json(report);
  } catch (e) {
    next(e);
  }
};
