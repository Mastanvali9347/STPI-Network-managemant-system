/**
 * Live WiFi metrics simulation — joins, disconnects, roaming (educational only).
 * WiFi only online during office hours (7 AM - 7 PM).
 */

const { FLOORS, isOfficeHours } = require('../data/enterpriseSsids');

const jitter = (v, r = 5) => Math.max(0, Math.round((v + (Math.random() * r * 2 - r)) * 10) / 10);

const pickStatus = (s) => {
  // WiFi offline outside office hours
  if (!isOfficeHours()) {
    return 'offline';
  }
  if (s === 'offline' && Math.random() > 0.8) return 'online';
  const roll = Math.random();
  if (roll > 0.97) return 'offline';
  if (roll > 0.9) return 'warning';
  return s === 'offline' ? 'offline' : 'online';
};

let liveState = new Map();
let clients = [];
let recentEvents = [];

const initClientPool = (networks) => {
  const manufacturers = ['Apple', 'Dell', 'HP', 'Samsung', 'Lenovo', 'Cisco'];
  const osTypes = ['Windows 11', 'macOS', 'iOS', 'Android', 'Linux'];
  clients = [];
  let id = 1;
  networks.forEach((n) => {
    // Only create clients for online networks
    if (n.status === 'offline') return;
    const count = Math.min(4, Math.max(1, Math.floor((n.connectedUsers || 5) / 8)));
    for (let i = 0; i < count; i++) {
      clients.push({
        id: `wc-${id++}`,
        deviceName: `${manufacturers[id % manufacturers.length]}-Client-${id}`,
        macAddress: `AA:BB:${String(id).padStart(2, '0')}:CC:DD:${String((id * 7) % 99).padStart(2, '0')}`,
        ipAddress: `10.${n.vlan || 10}.${Math.floor(id / 10)}.${(id % 200) + 10}`,
        osType: osTypes[id % osTypes.length],
        manufacturer: manufacturers[id % manufacturers.length],
        signalStrength: jitter(n.signalStrength || -55, 8),
        uploadSpeed: jitter(5, 4),
        downloadSpeed: jitter(25, 12),
        ssid: n.wifiName || n.ssid,
        accessPoint: n.accessPoint,
        floor: n.floor,
        status: 'online',
        connectedMinutes: jitter(120, 60),
      });
    }
  });
};


const tickNetworks = (networks) => {
  return networks.map((n) => {
    const key = n.id || n.ssid;
    const prev = liveState.get(key) || n;
    const status = pickStatus(prev.status || 'online');
    const updated = {
      ...n,
      wifiName: n.wifiName || n.ssid,
      status,
      connectedUsers: status === 'offline' ? 0 : jitter(prev.connectedUsers ?? 12, 6),
      signalStrength: status === 'offline' ? -100 : jitter(prev.signalStrength ?? -55, 5),
      bandwidthMbps: status === 'offline' ? 0 : jitter(prev.bandwidthMbps ?? 45, 20),
      packetLoss: status === 'offline' ? 100 : jitter(prev.packetLoss ?? 0.2, 0.15),
      latencyMs: status === 'offline' ? 0 : jitter(prev.latencyMs ?? 12, status === 'warning' ? 15 : 5),
      channelUtilization: status === 'offline' ? 0 : jitter(prev.channelUtilization ?? 42, 12),
    };
    liveState.set(key, updated);
    return updated;
  });
};

const simulateEvents = (networks) => {
  const events = [];
  // Only generate events for online networks
  const onlineNetworks = networks.filter((n) => n.status !== 'offline');
  if (onlineNetworks.length > 0 && Math.random() > 0.7) {
    const net = onlineNetworks[Math.floor(Math.random() * onlineNetworks.length)];
    const types = ['join', 'disconnect', 'roam'];
    const type = types[Math.floor(Math.random() * types.length)];
    events.push({
      id: `we-${Date.now()}`,
      type,
      ssid: net.wifiName,
      message:
        type === 'join'
          ? `Client joined ${net.wifiName}`
          : type === 'disconnect'
            ? `Client left ${net.wifiName}`
            : `Client roamed to ${net.accessPoint}`,
      timestamp: new Date().toISOString(),
    });
  }
  recentEvents = [...events, ...recentEvents].slice(0, 30);
  return events;
};

const tickClients = (networks) => {
  // Remove clients from offline networks
  const onlineNetworks = networks.filter((n) => n.status !== 'offline');
  const onlineSsids = new Set(onlineNetworks.map((n) => n.ssid || n.wifiName));
  
  clients = clients
    .filter((c) => onlineSsids.has(c.ssid))
    .map((c) => ({
      ...c,
      status: pickStatus(c.status),
      signalStrength: jitter(c.signalStrength, 4),
      uploadSpeed: jitter(c.uploadSpeed, 2),
      downloadSpeed: jitter(c.downloadSpeed, 6),
      connectedMinutes: c.connectedMinutes + (Math.random() > 0.5 ? 0.05 : 0),
    }));
  return [...clients];
};

const getFloorStats = (networks) =>
  FLOORS.map((floor) => {
    const onFloor = networks.filter((n) => n.floor === floor);
    return {
      floor,
      activeAps: [...new Set(onFloor.map((n) => n.accessPoint))].length,
      ssidCount: onFloor.length,
      users: onFloor.reduce((s, n) => s + (n.connectedUsers || 0), 0),
      bandwidthMbps: Math.round(onFloor.reduce((s, n) => s + (n.bandwidthMbps || 0), 0)),
      avgSignal: onFloor.length
        ? Math.round(onFloor.reduce((s, n) => s + n.signalStrength, 0) / onFloor.length)
        : 0,
    };
  });

const getWifiAnalytics = (networks, clients) => {
  const online = networks.filter((n) => n.status === 'online').length;
  return {
    totalSsids: networks.length,
    totalAps: [...new Set(networks.map((n) => n.accessPoint))].length,
    connectedDevices: clients.filter((c) => c.status === 'online').length,
    peakTrafficMbps: Math.round(networks.reduce((s, n) => s + (n.bandwidthMbps || 0), 0)),
    internetSpeedMbps: jitter(940, 40),
    avgLatencyMs: jitter(18, 5),
    packetLossPercent: jitter(0.3, 0.2),
    networkUptimePercent: jitter(99.5, 0.3),
    onlineSsids: online,
    offlineSsids: networks.filter((n) => n.status === 'offline').length,
  };
};

module.exports = {
  tickNetworks,
  simulateEvents,
  tickClients,
  initClientPool,
  getFloorStats,
  getWifiAnalytics,
  getRecentEvents: () => recentEvents,
};
