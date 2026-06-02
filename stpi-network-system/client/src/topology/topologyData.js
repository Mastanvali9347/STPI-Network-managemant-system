/**
 * Client-side enterprise topology — mirrors server/data/topologyEnterprise.js.
 * Used for offline fallback and initial layout before Socket.IO connects.
 */

export const TOPOLOGY_POSITIONS = {
  internet: { x: 400, y: 0 },
  'fw-main': { x: 400, y: 90 },
  'core-router': { x: 400, y: 180 },
  'core-sw': { x: 400, y: 280 },
  'sw-floor1': { x: 80, y: 400 },
  'sw-floor2': { x: 240, y: 400 },
  'sw-server-room': { x: 400, y: 400 },
  'sw-conf-hall': { x: 560, y: 400 },
  'sw-admin': { x: 720, y: 400 },
  'ap-floor1': { x: 40, y: 540 },
  'ap-floor2': { x: 200, y: 540 },
  'srv-db': { x: 340, y: 540 },
  'srv-app': { x: 460, y: 540 },
  'ap-conf': { x: 560, y: 540 },
  'ap-admin': { x: 720, y: 540 },
};

const baseNodes = [
  { id: 'internet', nodeType: 'internet', label: 'Internet Gateway', ipAddress: '203.0.113.1', floor: 'WAN', status: 'online', traffic: 920, latency: 4, activeUsers: 0, uptime: 99.99 },
  { id: 'fw-main', nodeType: 'firewall', label: 'Firewall FW-01', ipAddress: '10.0.0.2', floor: 'DMZ', status: 'online', traffic: 510, latency: 6, activeUsers: 0, uptime: 99.9 },
  { id: 'core-router', nodeType: 'router', label: 'Core Router CR-01', ipAddress: '10.0.0.1', floor: 'Core', status: 'online', traffic: 420, latency: 12, activeUsers: 28, uptime: 99.8 },
  { id: 'core-sw', nodeType: 'switch', label: 'Core Switch CS-01', ipAddress: '10.0.0.10', floor: 'Core', status: 'online', traffic: 680, latency: 5, activeUsers: 0, uptime: 99.7 },
  { id: 'sw-floor1', nodeType: 'switch', label: 'Floor 1 Switch', ipAddress: '10.0.1.10', floor: 'Floor 1', status: 'online', traffic: 310, latency: 8, activeUsers: 0, uptime: 99.5 },
  { id: 'sw-floor2', nodeType: 'switch', label: 'Floor 2 Switch', ipAddress: '10.0.1.11', floor: 'Floor 2', status: 'online', traffic: 290, latency: 9, activeUsers: 0, uptime: 99.4 },
  { id: 'sw-server-room', nodeType: 'switch', label: 'Server Room Switch', ipAddress: '10.0.3.10', floor: 'Server Room', status: 'online', traffic: 410, latency: 7, activeUsers: 0, uptime: 99.8 },
  { id: 'sw-conf-hall', nodeType: 'switch', label: 'Conference Hall Switch', ipAddress: '10.0.4.10', floor: 'Conference Hall', status: 'online', traffic: 220, latency: 11, activeUsers: 0, uptime: 99.2 },
  { id: 'sw-admin', nodeType: 'switch', label: 'Admin Office Switch', ipAddress: '10.0.5.10', floor: 'Admin Office', status: 'online', traffic: 175, latency: 8, activeUsers: 0, uptime: 99.6 },
  { id: 'ap-floor1', nodeType: 'wifi', label: 'AP Floor 1', ipAddress: '10.0.2.10', floor: 'Floor 1', status: 'online', traffic: 195, latency: 14, activeUsers: 24, uptime: 98.9 },
  { id: 'ap-floor2', nodeType: 'wifi', label: 'AP Floor 2', ipAddress: '10.0.2.21', floor: 'Floor 2', status: 'online', traffic: 240, latency: 15, activeUsers: 31, uptime: 99.1 },
  { id: 'ap-conf', nodeType: 'wifi', label: 'AP Conference Hall', ipAddress: '10.0.2.20', floor: 'Conference Hall', status: 'warning', traffic: 180, latency: 45, activeUsers: 22, uptime: 97.2 },
  { id: 'ap-admin', nodeType: 'wifi', label: 'AP Admin Office', ipAddress: '10.0.2.30', floor: 'Admin Office', status: 'online', traffic: 88, latency: 18, activeUsers: 8, uptime: 99.0 },
  { id: 'srv-db', nodeType: 'server', label: 'DB Server', ipAddress: '10.0.3.50', floor: 'Server Room', status: 'online', traffic: 340, latency: 3, activeUsers: 2, uptime: 99.95 },
  { id: 'srv-app', nodeType: 'server', label: 'App Server', ipAddress: '10.0.3.51', floor: 'Server Room', status: 'online', traffic: 520, latency: 6, activeUsers: 4, uptime: 99.5 },
];

const baseEdges = [
  { id: 'e-inet-fw', source: 'internet', target: 'fw-main', health: 'online' },
  { id: 'e-fw-router', source: 'fw-main', target: 'core-router', health: 'online' },
  { id: 'e-router-coresw', source: 'core-router', target: 'core-sw', health: 'online' },
  { id: 'e-core-f1', source: 'core-sw', target: 'sw-floor1', health: 'online' },
  { id: 'e-core-f2', source: 'core-sw', target: 'sw-floor2', health: 'online' },
  { id: 'e-core-srv', source: 'core-sw', target: 'sw-server-room', health: 'online' },
  { id: 'e-core-conf', source: 'core-sw', target: 'sw-conf-hall', health: 'warning' },
  { id: 'e-core-admin', source: 'core-sw', target: 'sw-admin', health: 'online' },
  { id: 'e-f1-ap', source: 'sw-floor1', target: 'ap-floor1', health: 'online' },
  { id: 'e-f2-ap', source: 'sw-floor2', target: 'ap-floor2', health: 'online' },
  { id: 'e-conf-ap', source: 'sw-conf-hall', target: 'ap-conf', health: 'warning' },
  { id: 'e-admin-ap', source: 'sw-admin', target: 'ap-admin', health: 'online' },
  { id: 'e-srv-db', source: 'sw-server-room', target: 'srv-db', health: 'online' },
  { id: 'e-srv-app', source: 'sw-server-room', target: 'srv-app', health: 'online' },
];

export const defaultTopologyPayload = {
  nodes: baseNodes.map((n) => ({
    ...n,
    position: TOPOLOGY_POSITIONS[n.id],
  })),
  edges: baseEdges.map((e) => ({ ...e, animated: true, trafficLoad: 200 })),
  metrics: {
    totalDevices: baseNodes.length,
    onlineDevices: baseNodes.filter((n) => n.status === 'online').length,
    failedDevices: 0,
    onlinePercent: 93,
    activeTrafficMbps: 420,
    warningDevices: 1,
  },
};

/** Convert API/socket payload into React Flow nodes. */
export const toFlowNodes = (topologyNodes = [], selectedId = null) =>
  topologyNodes.map((node) => ({
    id: node.id,
    type: node.nodeType,
    position: node.position || TOPOLOGY_POSITIONS[node.id] || { x: 0, y: 0 },
    data: {
      label: node.label,
      nodeType: node.nodeType,
      ipAddress: node.ipAddress,
      floor: node.floor,
      status: node.status,
      traffic: node.traffic,
      latency: node.latency,
      activeUsers: node.activeUsers,
      uptime: node.uptime,
      selected: node.id === selectedId,
    },
  }));

/** Convert API/socket payload into React Flow edges. */
export const toFlowEdges = (topologyEdges = []) =>
  topologyEdges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    type: 'traffic',
    animated: edge.animated !== false && edge.health !== 'offline',
    data: {
      health: edge.health || 'online',
      trafficLoad: edge.trafficLoad ?? 0,
    },
  }));
