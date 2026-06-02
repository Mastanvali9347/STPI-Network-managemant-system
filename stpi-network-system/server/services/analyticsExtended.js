/**
 * Generates time-range analytics for charts (simulated historical data).
 */

const RANGES = ['today', '24h', '7d', '30d'];

const jitter = (v, r = 0.15) => v * (1 + (Math.random() * 2 - 1) * r);

const labelsForRange = (range) => {
  if (range === '7d') {
    return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  }
  if (range === '30d') {
    return Array.from({ length: 30 }, (_, i) => `D${i + 1}`);
  }
  return Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);
};

const getExtendedAnalytics = (range = '24h', snapshot = {}) => {
  const labels = labelsForRange(range);
  const devices = snapshot.devices || [];
  const online = devices.filter((d) => d.status === 'online').length;
  const offline = devices.filter((d) => d.status === 'offline').length;

  const bandwidth = labels.map((time) => ({
    time,
    inbound: Math.round(jitter(280 + Math.random() * 120)),
    outbound: Math.round(jitter(210 + Math.random() * 90)),
  }));

  const traffic = labels.map((time) => ({
    time,
    traffic: Math.round(jitter(350 + Math.random() * 150)),
  }));

  const connectedUsers = labels.map((time) => ({
    time,
    users: Math.round(jitter(65 + Math.random() * 25)),
  }));

  const floorUsers = [
    { floor: 'Floor 1', users: 24 },
    { floor: 'Floor 2', users: 31 },
    { floor: 'Server Room', users: 6 },
    { floor: 'Conference Hall', users: 22 },
    { floor: 'Admin Office', users: 12 },
    { floor: 'Core', users: 8 },
  ];

  const deviceCategories = [
    { name: 'Routers', value: devices.filter((d) => d.type === 'router').length || 1 },
    { name: 'Switches', value: devices.filter((d) => d.type === 'switch').length || 2 },
    { name: 'Access Points', value: devices.filter((d) => d.type === 'accessPoint').length || 2 },
    { name: 'Firewalls', value: devices.filter((d) => d.type === 'firewall').length || 1 },
    { name: 'Servers', value: devices.filter((d) => d.type === 'server').length || 0 },
  ].filter((c) => c.value > 0);

  const networkHealthRadar = [
    { metric: 'Uptime', score: snapshot.networkStatus?.uptimePercent ?? 99 },
    { metric: 'Latency', score: Math.max(0, 100 - (snapshot.networkStatus?.avgLatencyMs ?? 20)) },
    { metric: 'Bandwidth', score: 100 - (snapshot.networkStatus?.bandwidthUsagePercent ?? 30) },
    { metric: 'WiFi', score: 88 },
    { metric: 'Security', score: 94 },
    { metric: 'Devices', score: devices.length ? Math.round((online / devices.length) * 100) : 95 },
  ];

  const heatmap = [];
  const hours = ['08', '10', '12', '14', '16', '18'];
  const floors = ['F1', 'F2', 'SRV', 'Conf', 'Admin'];
  hours.forEach((h) => {
    floors.forEach((f) => {
      heatmap.push({ hour: h, floor: f, load: Math.round(Math.random() * 100) });
    });
  });

  const total = devices.length || 6;
  const healthPercent = total ? Math.round((online / total) * 100) : 0;

  return {
    range,
    bandwidth,
    traffic,
    connectedUsers,
    floorUsers,
    deviceCategories,
    networkHealthRadar,
    heatmap,
    kpis: {
      totalDevices: total,
      onlineDevices: online,
      offlineDevices: offline,
      activeWifiNetworks: snapshot.wifi?.filter((w) => w.status === 'online').length ?? 3,
      connectedUsers: snapshot.summary?.connectedUsers ?? 67,
      bandwidthUsagePercent: snapshot.networkStatus?.bandwidthUsagePercent ?? 68,
      internetSpeedMbps: snapshot.networkStatus?.internetSpeedMbps ?? 940,
      alertCount: snapshot.alerts?.length ?? 0,
      packetTraffic: snapshot.networkStatus?.packetsPerSecond ?? 12400,
      deviceHealthPercent: healthPercent,
    },
  };
};

module.exports = { getExtendedAnalytics, RANGES };
