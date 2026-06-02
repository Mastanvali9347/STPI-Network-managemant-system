/**
 * Enterprise WiFi management — vault + live simulation merge.
 */

const WifiNetwork = require('../models/WifiNetwork');
const WifiAccessLog = require('../models/WifiAccessLog');
const User = require('../models/User');
const { encrypt, decrypt } = require('../utils/cryptoVault');
const { isDbReady } = require('../utils/authHelpers');
const { enterpriseSsids, demoPasswordFor } = require('../data/enterpriseSsids');
const wifiSimulator = require('./wifiSimulatorService');
const mongoose = require('mongoose');

let memoryVault = [];
let lastTick = { networks: [], clients: [], floorStats: [], analytics: {}, events: [] };

const slugId = (ssid) => `wifi-${ssid.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

const buildLiveNetwork = (meta, dbRecord = null) => ({
  id: dbRecord?._id?.toString() || slugId(meta.ssid),
  ssid: meta.ssid,
  wifiName: meta.ssid,
  securityType: dbRecord?.securityType || meta.security,
  floor: dbRecord?.floor || meta.floor,
  accessPoint: dbRecord?.accessPoint || meta.ap,
  frequency: meta.band,
  channel: meta.channel,
  vlan: dbRecord?.vlan ?? meta.vlan,
  status: 'online',
  connectedUsers: 8 + Math.floor(Math.random() * 24),
  signalStrength: -45 - Math.floor(Math.random() * 30),
  bandwidthMbps: 30 + Math.floor(Math.random() * 80),
  password: '********',
  hasVault: !!dbRecord || memoryVault.some((m) => m.ssid === meta.ssid),
});

/** Load networks for API list (no plaintext passwords) */
const getNetworks = async () => {
  if (isDbReady()) {
    const docs = await WifiNetwork.find({ enabled: true }).lean();
    const bySsid = Object.fromEntries(docs.map((d) => [d.ssid, d]));
    return enterpriseSsids.map((meta) => buildLiveNetwork(meta, bySsid[meta.ssid]));
  }
  return enterpriseSsids.map((meta) => {
    const mem = memoryVault.find((m) => m.ssid === meta.ssid);
    return buildLiveNetwork(meta, mem ? { ...mem, _id: mem.id } : null);
  });
};

const tick = async () => {
  let base = await getNetworks();
  base = wifiSimulator.tickNetworks(base);
  if (!wifiSimulator.getRecentEvents().length && base.length) {
    wifiSimulator.initClientPool(base);
  }
  wifiSimulator.simulateEvents(base);
  const clients = wifiSimulator.tickClients();
  lastTick = {
    networks: base,
    clients,
    floorStats: wifiSimulator.getFloorStats(base),
    analytics: wifiSimulator.getWifiAnalytics(base, clients),
    events: wifiSimulator.getRecentEvents(),
  };
  return lastTick;
};

const getCachedTick = () => lastTick;

const logAccess = async (req, ssid, action, success = true) => {
  const entry = {
    userId: req.user._id,
    userEmail: req.user.email,
    userRole: req.user.role,
    ssid,
    action,
    ipAddress: req.ip,
    success,
  };
  if (isDbReady()) {
    await WifiAccessLog.create(entry);
  }
};

const revealPassword = async (req, networkId, adminPassword) => {
  const user = await User.findById(req.user.id || req.user._id).select('+password');
  const valid = await user.comparePassword(adminPassword);
  if (!valid) {
    await logAccess(req, networkId, 'reveal_password', false);
    return { error: 'Invalid admin password', status: 401 };
  }

  let ssid = networkId;
  let encrypted = null;

  if (isDbReady() && mongoose.isValidObjectId(networkId)) {
    const doc = await WifiNetwork.findById(networkId).select('+passwordEncrypted');
    if (!doc) return { error: 'Network not found', status: 404 };
    ssid = doc.ssid;
    encrypted = doc.passwordEncrypted;
  } else {
    const mem = memoryVault.find((m) => m.id === networkId || m.ssid === networkId);
    if (!mem) return { error: 'Network not found', status: 404 };
    ssid = mem.ssid;
    encrypted = mem.passwordEncrypted;
  }

  const plaintext = decrypt(encrypted);
  await logAccess(req, ssid, 'reveal_password', true);

  return { ssid, password: plaintext };
};

const seedVault = async () => {
  if (!isDbReady()) {
    memoryVault = enterpriseSsids.map((meta) => ({
      id: slugId(meta.ssid),
      ssid: meta.ssid,
      passwordEncrypted: encrypt(demoPasswordFor(meta.ssid)),
      securityType: meta.security,
      floor: meta.floor,
      accessPoint: meta.ap,
      vlan: meta.vlan,
      enabled: true,
    }));
    return { mode: 'memory', count: memoryVault.length };
  }

  let created = 0;
  for (const meta of enterpriseSsids) {
    const exists = await WifiNetwork.findOne({ ssid: meta.ssid });
    if (exists) continue;
    await WifiNetwork.create({
      ssid: meta.ssid,
      passwordEncrypted: encrypt(demoPasswordFor(meta.ssid)),
      securityType: meta.security,
      floor: meta.floor,
      accessPoint: meta.ap,
      vlan: meta.vlan,
    });
    created++;
  }
  return { mode: 'mongodb', created };
};

const getAccessLogs = async (limit = 50) => {
  if (!isDbReady()) return [];
  return WifiAccessLog.find().sort({ createdAt: -1 }).limit(limit).lean();
};

const searchNetworks = (networks, q) => {
  const term = q.toLowerCase();
  return networks.filter(
    (n) =>
      n.ssid?.toLowerCase().includes(term) ||
      n.accessPoint?.toLowerCase().includes(term) ||
      n.floor?.toLowerCase().includes(term)
  );
};

module.exports = {
  getNetworks,
  tick,
  getCachedTick,
  revealPassword,
  seedVault,
  getAccessLogs,
  searchNetworks,
};
