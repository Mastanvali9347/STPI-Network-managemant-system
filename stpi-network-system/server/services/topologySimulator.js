/**
 * Merges live device metrics into the enterprise topology graph.
 * All data is simulated — for educational / NOC-style visualization only.
 */

const { topologyEnterprise } = require('../data/topologyEnterprise');

const jitter = (value, range = 5) => {
  const delta = Math.random() * range * 2 - range;
  return Math.max(0, Math.round((value + delta) * 10) / 10);
};

/** Maps topology node id → simulator device id (when linked). */
const NODE_DEVICE_MAP = {
  'core-router': 'dev-router-core',
  'fw-main': 'dev-fw-main',
  'sw-floor1': 'dev-switch-f1',
  'ap-conf': 'dev-ap-conf',
  'ap-floor2': 'dev-ap-f2',
};

/** Default metrics per node when not tied to a device record. */
const DEFAULT_METRICS = {
  internet: { traffic: 920, latency: 4, activeUsers: 0, uptime: 99.99 },
  'core-sw': { traffic: 680, latency: 5, activeUsers: 0, uptime: 99.7 },
  'sw-floor2': { traffic: 290, latency: 9, activeUsers: 0, uptime: 99.4 },
  'sw-server-room': { traffic: 410, latency: 7, activeUsers: 0, uptime: 99.8 },
  'sw-conf-hall': { traffic: 220, latency: 11, activeUsers: 0, uptime: 99.2 },
  'sw-admin': { traffic: 175, latency: 8, activeUsers: 0, uptime: 99.6 },
  'ap-floor1': { traffic: 195, latency: 14, activeUsers: 24, uptime: 98.9 },
  'ap-admin': { traffic: 88, latency: 18, activeUsers: 8, uptime: 99.0 },
  'srv-db': { traffic: 340, latency: 3, activeUsers: 2, uptime: 99.95 },
  'srv-app': { traffic: 520, latency: 6, activeUsers: 4, uptime: 99.5 },
};

let nodeMetrics = {};

const initMetrics = () => {
  topologyEnterprise.nodes.forEach((n) => {
    const defaults = DEFAULT_METRICS[n.id] || {
      traffic: jitter(200, 80),
      latency: jitter(12, 8),
      activeUsers: n.nodeType === 'wifi' ? jitter(20, 10) : 0,
      uptime: jitter(99, 1),
    };
    nodeMetrics[n.id] = {
      status: 'online',
      ...defaults,
    };
  });
};

initMetrics();

const pickStatus = (current) => {
  if (current === 'offline' && Math.random() > 0.75) return 'online';
  const roll = Math.random();
  if (roll > 0.96) return 'offline';
  if (roll > 0.87) return 'warning';
  return current === 'offline' ? 'offline' : 'online';
};

/**
 * Advance topology metrics one tick; optionally sync from device list.
 */
const tickTopology = (devices = []) => {
  const deviceById = Object.fromEntries(devices.map((d) => [d.id, d]));

  topologyEnterprise.nodes.forEach((node) => {
    const linkedId = NODE_DEVICE_MAP[node.id];
    const device = linkedId ? deviceById[linkedId] : null;

    if (device) {
      nodeMetrics[node.id] = {
        status: device.status,
        traffic: device.traffic,
        latency: device.latency,
        activeUsers: device.activeUsers,
        uptime: device.uptime,
      };
      return;
    }

    const prev = nodeMetrics[node.id] || {};
    const status = pickStatus(prev.status || 'online');
    nodeMetrics[node.id] = {
      status,
      traffic: jitter(prev.traffic ?? 200, 35),
      latency: jitter(prev.latency ?? 10, status === 'warning' ? 12 : 5),
      activeUsers: jitter(prev.activeUsers ?? 0, 3),
      uptime: jitter(status === 'online' ? 99 : 86, 2),
    };
  });

  return buildTopologyPayload();
};

const edgeHealth = (sourceId, targetId) => {
  const a = nodeMetrics[sourceId]?.status ?? 'online';
  const b = nodeMetrics[targetId]?.status ?? 'online';
  if (a === 'offline' || b === 'offline') return 'offline';
  if (a === 'warning' || b === 'warning') return 'warning';
  return 'online';
};

const buildTopologyPayload = () => {
  const nodes = topologyEnterprise.nodes.map((n) => ({
    ...n,
    ...nodeMetrics[n.id],
    position: topologyEnterprise.positions[n.id],
  }));

  const edges = topologyEnterprise.edges.map((e) => {
    const health = edgeHealth(e.source, e.target);
    const srcTraffic = nodeMetrics[e.source]?.traffic ?? 0;
    const tgtTraffic = nodeMetrics[e.target]?.traffic ?? 0;
    return {
      ...e,
      health,
      trafficLoad: Math.round((srcTraffic + tgtTraffic) / 2),
      animated: health !== 'offline',
    };
  });

  const online = nodes.filter((n) => n.status === 'online').length;
  const failed = nodes.filter((n) => n.status === 'offline').length;
  const totalTraffic = nodes.reduce((s, n) => s + (n.traffic || 0), 0);

  return {
    nodes,
    edges,
    metrics: {
      totalDevices: nodes.length,
      onlineDevices: online,
      failedDevices: failed,
      onlinePercent: Math.round((online / nodes.length) * 100),
      activeTrafficMbps: Math.round(totalTraffic / 10),
      warningDevices: nodes.filter((n) => n.status === 'warning').length,
    },
    timestamp: new Date().toISOString(),
  };
};

const getTopology = () => buildTopologyPayload();

module.exports = {
  tickTopology,
  getTopology,
  topologyEnterprise,
};
