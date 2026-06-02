/**
 * Simulated enterprise network monitoring — generates dummy live metrics only.
 * NOT a network scanner or intrusion tool.
 */

const topologySimulator = require('./topologySimulator');
const deviceManagement = require('./deviceManagementService');
const wifiManagement = require('./wifiManagementService');

const BASE_DEVICES = [
  {
    id: 'dev-router-core',
    deviceName: 'Router-Core-01',
    ipAddress: '10.0.0.1',
    type: 'router',
    status: 'online',
    uptime: 99.8,
    traffic: 420,
    latency: 12,
    activeUsers: 28,
  },
  {
    id: 'dev-switch-f1',
    deviceName: 'Switch-Floor1',
    ipAddress: '10.0.1.10',
    type: 'switch',
    status: 'online',
    uptime: 99.5,
    traffic: 310,
    latency: 8,
    activeUsers: 18,
  },
  {
    id: 'dev-ap-conf',
    deviceName: 'AP-ConferenceHall',
    ipAddress: '10.0.2.20',
    type: 'accessPoint',
    status: 'warning',
    uptime: 97.2,
    traffic: 180,
    latency: 45,
    activeUsers: 22,
  },
  {
    id: 'dev-ap-f2',
    deviceName: 'AP-Floor2',
    ipAddress: '10.0.2.21',
    type: 'accessPoint',
    status: 'online',
    uptime: 99.1,
    traffic: 240,
    latency: 15,
    activeUsers: 31,
  },
  {
    id: 'dev-fw-main',
    deviceName: 'Firewall-Main',
    ipAddress: '10.0.0.2',
    type: 'firewall',
    status: 'online',
    uptime: 99.9,
    traffic: 510,
    latency: 6,
    activeUsers: 0,
  },
];

const BASE_WIFI = [
  {
    id: 'wifi-corp',
    wifiName: 'STPI-Corporate',
    status: 'online',
    connectedUsers: 42,
    frequency: '5 GHz',
    signalStrength: -48,
    password: '********',
    channel: 36,
  },
  {
    id: 'wifi-guest',
    wifiName: 'STPI-Guest',
    status: 'online',
    connectedUsers: 18,
    frequency: '2.4 GHz',
    signalStrength: -62,
    password: '********',
    channel: 6,
  },
  {
    id: 'wifi-iot',
    wifiName: 'STPI-IoT',
    status: 'warning',
    connectedUsers: 7,
    frequency: '2.4 GHz',
    signalStrength: -71,
    password: '********',
    channel: 11,
  },
];

const BASE_USERS = [
  {
    id: 'u1',
    deviceName: 'MacBook-Pro-Finance',
    ipAddress: '10.10.10.45',
    macAddress: 'AA:BB:CC:11:22:01',
    status: 'online',
    uploadSpeed: 12.4,
    downloadSpeed: 48.2,
    ssid: 'STPI-Corporate',
  },
  {
    id: 'u2',
    deviceName: 'iPhone-15-Exec',
    ipAddress: '10.10.10.78',
    macAddress: 'AA:BB:CC:11:22:02',
    status: 'online',
    uploadSpeed: 4.1,
    downloadSpeed: 22.8,
    ssid: 'STPI-Corporate',
  },
  {
    id: 'u3',
    deviceName: 'Android-Tablet-Guest',
    ipAddress: '10.20.10.12',
    macAddress: 'AA:BB:CC:11:22:03',
    status: 'online',
    uploadSpeed: 2.2,
    downloadSpeed: 14.5,
    ssid: 'STPI-Guest',
  },
  {
    id: 'u4',
    deviceName: 'IoT-Gateway-Floor2',
    ipAddress: '10.30.10.5',
    macAddress: 'AA:BB:CC:11:22:04',
    status: 'warning',
    uploadSpeed: 0.8,
    downloadSpeed: 3.2,
    ssid: 'STPI-IoT',
  },
];

const ALERT_TEMPLATES = [
  {
    severity: 'critical',
    title: 'Router offline',
    message: 'Router-Core-01 stopped responding to health checks.',
    source: 'Router-Core-01',
  },
  {
    severity: 'warning',
    title: 'High latency detected',
    message: 'AP-ConferenceHall average latency exceeded 40ms threshold.',
    source: 'AP-ConferenceHall',
  },
  {
    severity: 'warning',
    title: 'Excess bandwidth usage',
    message: 'Floor 2 segment using 92% of allocated bandwidth.',
    source: 'Switch-Floor1',
  },
  {
    severity: 'info',
    title: 'Device back online',
    message: 'AP-Floor2 reconnected and is operating normally.',
    source: 'AP-Floor2',
  },
];

const jitter = (value, range = 5) => {
  const delta = (Math.random() * range * 2 - range);
  return Math.max(0, Math.round((value + delta) * 10) / 10);
};

const pickStatus = (baseStatus) => {
  if (baseStatus === 'offline') return 'offline';
  const roll = Math.random();
  if (roll > 0.97) return 'offline';
  if (roll > 0.88) return 'warning';
  return 'online';
};

let state = {
  devices: structuredClone(deviceManagement.getSimulatedDevices()),
  wifi: structuredClone(BASE_WIFI),
  users: structuredClone(BASE_USERS),
  alerts: [],
  bandwidthHistory: [],
  usersHistory: [],
  trafficHistory: [],
  tick: 0,
};

const pushHistory = (arr, point, max = 20) => {
  arr.push(point);
  if (arr.length > max) arr.shift();
};

const initHistory = () => {
  const now = Date.now();
  for (let i = 19; i >= 0; i--) {
    const t = new Date(now - i * 3000).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    pushHistory(state.bandwidthHistory, {
      time: t,
      inbound: jitter(280, 80),
      outbound: jitter(210, 60),
    });
    pushHistory(state.usersHistory, { time: t, users: jitter(67, 8) });
    pushHistory(state.trafficHistory, {
      time: t,
      traffic: jitter(380, 100),
    });
  }
};

initHistory();

const maybePushAlert = () => {
  if (Math.random() > 0.92) {
    const template =
      ALERT_TEMPLATES[Math.floor(Math.random() * ALERT_TEMPLATES.length)];
    const alert = {
      id: `alert-${Date.now()}`,
      ...template,
      timestamp: new Date().toISOString(),
      acknowledged: false,
    };
    state.alerts = [alert, ...state.alerts].slice(0, 30);
    return alert;
  }
  return null;
};

if (!state.alerts.length) {
  state.alerts = ALERT_TEMPLATES.slice(0, 3).map((t, i) => ({
    id: `seed-${i}`,
    ...t,
    timestamp: new Date(Date.now() - (i + 1) * 600000).toISOString(),
    acknowledged: false,
  }));
}

/**
 * Advance simulation by one tick — call every 3 seconds from socket layer.
 */
const tick = () => {
  state.tick += 1;
  const timeLabel = new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  state.devices = state.devices.map((d) => {
    const status = pickStatus(d.status === 'offline' && Math.random() > 0.7 ? 'online' : d.status);
    return {
      ...d,
      status,
      uptime: jitter(status === 'online' ? 99 : 85, 2),
      traffic: jitter(d.traffic, 40),
      latency: jitter(d.latency, status === 'warning' ? 15 : 5),
      activeUsers: jitter(d.activeUsers, 4),
    };
  });

  const wifiLive = wifiManagement.getCachedTick();
  if (wifiLive?.networks?.length) {
    state.wifi = wifiLive.networks.map((w) => ({ ...w, password: '********' }));
  } else {
    state.wifi = state.wifi.map((w) => ({
      ...w,
      status: pickStatus(w.status),
      connectedUsers: jitter(w.connectedUsers, 6),
      signalStrength: jitter(w.signalStrength, 4),
      password: '********',
    }));
  }

  state.users = state.users.map((u) => ({
    ...u,
    status: pickStatus(u.status),
    uploadSpeed: jitter(u.uploadSpeed, 3),
    downloadSpeed: jitter(u.downloadSpeed, 8),
  }));

  const inbound = jitter(320, 90);
  const outbound = jitter(250, 70);
  pushHistory(state.bandwidthHistory, { time: timeLabel, inbound, outbound });
  pushHistory(state.usersHistory, {
    time: timeLabel,
    users: state.users.filter((u) => u.status === 'online').length + jitter(60, 5),
  });
  pushHistory(state.trafficHistory, {
    time: timeLabel,
    traffic: state.devices.reduce((s, d) => s + d.traffic, 0) / state.devices.length,
  });

  deviceManagement.syncFromSimulator(state.devices);

  const newAlert = maybePushAlert();
  const topology = topologySimulator.tickTopology(state.devices);

  return buildSnapshot(newAlert, topology);
};

/** Reload devices from management inventory (after CRUD). */
const refreshDevices = () => {
  state.devices = structuredClone(deviceManagement.getSimulatedDevices());
};

const buildSnapshot = (newAlert = null, topology = null) => {
  const onlineDevices = state.devices.filter((d) => d.status === 'online').length;
  const connectedUsers = state.users.filter((u) => u.status === 'online').length;
  const openAlerts = state.alerts.filter(
    (a) => !a.acknowledged && a.severity !== 'info'
  ).length;

  const networkStatus = {
    overall:
      state.devices.some((d) => d.status === 'offline')
        ? 'degraded'
        : state.devices.some((d) => d.status === 'warning')
          ? 'warning'
          : 'healthy',
    uptimePercent: jitter(99.2, 0.3),
    internetSpeedMbps: jitter(940, 40),
    bandwidthUsagePercent: jitter(68, 10),
    packetsPerSecond: jitter(12400, 1500),
    avgLatencyMs: jitter(
      state.devices.reduce((s, d) => s + d.latency, 0) / state.devices.length,
      3
    ),
    timestamp: new Date().toISOString(),
  };

  const summary = {
    totalDevices: state.devices.length,
    onlineDevices,
    activeWifiNetworks: state.wifi.filter((w) => w.status === 'online').length,
    connectedUsers:
      state.users.filter((u) => u.status === 'online').length +
      Math.round(state.wifi.reduce((s, w) => s + w.connectedUsers, 0) / state.wifi.length),
    internetSpeedMbps: networkStatus.internetSpeedMbps,
    alertsCount: state.alerts.length,
    openAlerts,
  };

  const analytics = {
    bandwidth: [...state.bandwidthHistory],
    connectedUsers: [...state.usersHistory],
    traffic: [...state.trafficHistory],
    deviceHealth: [
      { name: 'Routers', online: 1, total: 1 },
      { name: 'Switches', online: 1, total: 1 },
      { name: 'Access Points', online: state.devices.filter((d) => d.type === 'accessPoint' && d.status === 'online').length, total: 2 },
      { name: 'Firewalls', online: 1, total: 1 },
    ],
    summary,
  };

  const wifiLive = wifiManagement.getCachedTick();

  return {
    networkStatus,
    devices: [...state.devices],
    wifi: [...state.wifi],
    users: wifiLive?.clients?.length
      ? wifiLive.clients.map((c) => ({
          id: c.id,
          deviceName: c.deviceName,
          ipAddress: c.ipAddress,
          macAddress: c.macAddress,
          status: c.status,
          uploadSpeed: c.uploadSpeed,
          downloadSpeed: c.downloadSpeed,
          ssid: c.ssid,
        }))
      : [...state.users],
    wifiClients: wifiLive?.clients || [],
    wifiEvents: wifiLive?.events || [],
    floorStats: wifiLive?.floorStats || [],
    wifiAnalytics: wifiLive?.analytics || null,
    alerts: [...state.alerts],
    analytics,
    summary,
    topology: topology || topologySimulator.getTopology(),
    newAlert,
  };
};

const getDevices = () => deviceManagement.getAll();
const getWifi = () => [...state.wifi];
const getAlerts = () => [...state.alerts];
const getAnalytics = () => buildSnapshot().analytics;
const getUsers = () => [...state.users];
const getSnapshot = () => buildSnapshot();

const getTopology = () => topologySimulator.getTopology();

module.exports = {
  tick,
  getDevices,
  getWifi,
  getAlerts,
  getAnalytics,
  getUsers,
  getSnapshot,
  getTopology,
  refreshDevices,
  BASE_DEVICES,
  BASE_WIFI,
};
