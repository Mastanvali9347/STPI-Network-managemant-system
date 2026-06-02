const sampleTopology = {
  nodes: [
    {
      id: 'internet',
      type: 'cloud',
      label: 'Internet Gateway',
      status: 'online',
      ip: '103.25.45.1',
    },
    {
      id: 'fw-main',
      type: 'firewall',
      label: 'Main Firewall',
      status: 'online',
      ip: '10.0.0.1',
    },
    {
      id: 'router-core',
      type: 'router',
      label: 'Core Router',
      status: 'online',
      ip: '10.0.0.254',
    },
    {
      id: 'core-switch',
      type: 'switch',
      label: 'Core Switch',
      status: 'online',
      ip: '10.0.1.1',
    },
    {
      id: 'floor2-switch',
      type: 'switch',
      label: 'Floor 2 Switch',
      status: 'online',
      ip: '10.0.2.1',
    },
    {
      id: 'floor3-switch',
      type: 'switch',
      label: 'Floor 3 Switch',
      status: 'warning',
      ip: '10.0.3.1',
    },
    {
      id: 'ap-stpi',
      type: 'accessPoint',
      label: 'STPI-RUCKUS',
      status: 'online',
      ip: '10.10.1.1',
    },
    {
      id: 'ap-hysea',
      type: 'accessPoint',
      label: 'HYSEA_5G',
      status: 'online',
      ip: '10.10.2.1',
    },
    {
      id: 'ap-image',
      type: 'accessPoint',
      label: 'IMAGE-GUEST',
      status: 'online',
      ip: '10.10.3.1',
    },
    {
      id: 'ap-csod',
      type: 'accessPoint',
      label: 'CSOD-Employee',
      status: 'online',
      ip: '10.10.4.1',
    },
  ],

  edges: [
    { id: 'e1', source: 'internet', target: 'fw-main' },
    { id: 'e2', source: 'fw-main', target: 'router-core' },
    { id: 'e3', source: 'router-core', target: 'core-switch' },
    { id: 'e4', source: 'core-switch', target: 'floor2-switch' },
    { id: 'e5', source: 'core-switch', target: 'floor3-switch' },
    { id: 'e6', source: 'floor2-switch', target: 'ap-stpi' },
    { id: 'e7', source: 'floor2-switch', target: 'ap-hysea' },
    { id: 'e8', source: 'floor3-switch', target: 'ap-image' },
    { id: 'e9', source: 'floor3-switch', target: 'ap-csod' },
  ],
};

const sampleWifiNetworks = [
  {
    ssid: 'STPI-RUCKUS',
    band: '5 GHz',
    channel: 44,
    security: 'WPA2-Enterprise',
    clients: 38,
    status: 'active',
    vlan: 10,
  },
  {
    ssid: 'STPI-GUEST',
    band: '2.4 GHz',
    channel: 6,
    security: 'WPA2-Personal',
    clients: 25,
    status: 'active',
    vlan: 15,
  },
  {
    ssid: 'STPI-LEGACY',
    band: '2.4 GHz',
    channel: 1,
    security: 'WEP',
    clients: 5,
    status: 'warning',
    vlan: 5,
  },
  {
    ssid: 'HYSEA_5G',
    band: '5 GHz',
    channel: 149,
    security: 'WPA2-Personal',
    clients: 21,
    status: 'active',
    vlan: 20,
  },
  {
    ssid: 'IMAGE-GUEST',
    band: '2.4 GHz',
    channel: 11,
    security: 'WPA2-Personal',
    clients: 12,
    status: 'active',
    vlan: 30,
  },
  {
    ssid: 'CSOD-Employee',
    band: '5 GHz',
    channel: 36,
    security: 'WPA3-Enterprise',
    clients: 45,
    status: 'active',
    vlan: 40,
  },
  {
    ssid: 'SPARK-Employee',
    band: '5 GHz',
    channel: 48,
    security: 'WPA2-Enterprise',
    clients: 17,
    status: 'active',
    vlan: 50,
  },
];

const sampleConnectedUsers = [
  {
    id: 'u1',
    name: 'Anish Laptop',
    device: 'Dell Latitude',
    ip: '10.10.10.45',
    mac: '8C:BD:37:55:66:3F',
    ssid: 'STPI-RUCKUS',
    floor: 2,
    signal: -48,
    bandwidth: '28 Mbps',
  },

  {
    id: 'u2',
    name: 'Durga Mobile',
    device: 'iPhone',
    ip: '10.10.10.78',
    mac: 'A1:B2:C3:D4:E5:F6',
    ssid: 'HYSEA_5G',
    floor: 3,
    signal: -60,
    bandwidth: '14 Mbps',
  },

  {
    id: 'u3',
    name: 'Guest User',
    device: 'Android Device',
    ip: '10.20.10.12',
    mac: 'AA:BB:CC:11:22:03',
    ssid: 'IMAGE-GUEST',
    floor: 1,
    signal: -70,
    bandwidth: '8 Mbps',
  },

  {
    id: 'u4',
    name: 'Office Staff',
    device: 'MacBook Pro',
    ip: '10.30.10.5',
    mac: 'DD:EE:FF:11:22:44',
    ssid: 'CSOD-Employee',
    floor: 2,
    signal: -52,
    bandwidth: '34 Mbps',
  },
];

const sampleAlerts = [
  {
    id: 'a1',
    severity: 'warning',
    title: 'Floor 3 Switch High Latency',
    message: 'Latency exceeded threshold value.',
    source: 'floor3-switch',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    acknowledged: false,
  },

  {
    id: 'a2',
    severity: 'critical',
    title: 'IMAGE-GUEST Traffic Spike',
    message: 'Guest network bandwidth usage unusually high.',
    source: 'ap-image',
    timestamp: new Date(Date.now() - 900000).toISOString(),
    acknowledged: false,
  },

  {
    id: 'a3',
    severity: 'info',
    title: 'Scheduled Maintenance',
    message: 'Core router firmware update scheduled at 2 AM.',
    source: 'router-core',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    acknowledged: true,
  },
];

const sampleAnalytics = {
  bandwidth: [
    { time: '00:00', inbound: 120, outbound: 90 },
    { time: '04:00', inbound: 95, outbound: 72 },
    { time: '08:00', inbound: 410, outbound: 300 },
    { time: '12:00', inbound: 620, outbound: 520 },
    { time: '16:00', inbound: 540, outbound: 470 },
    { time: '20:00', inbound: 360, outbound: 280 },
  ],

  deviceHealth: [
    { name: 'Routers', online: 3, total: 3 },
    { name: 'Switches', online: 5, total: 6 },
    { name: 'Access Points', online: 14, total: 15 },
    { name: 'Firewalls', online: 2, total: 2 },
  ],

  summary: {
    totalDevices: 26,
    onlineDevices: 24,
    activeUsers: 133,
    openAlerts: 2,
    uptimePercent: 99.4,
  },
};

const sampleDashboardMetrics = {
  networkLoad: 72,
  activeConnections: 133,
  packetsPerSecond: 18600,
  avgLatencyMs: 21,
  wifiUtilization: 63,
  threatScore: 8,
};

module.exports = {
  sampleTopology,
  sampleWifiNetworks,
  sampleConnectedUsers,
  sampleAlerts,
  sampleAnalytics,
  sampleDashboardMetrics,
};