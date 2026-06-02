/**
 * Simulated device inventory — in-memory CRUD for educational admin panel.
 */

const seedDevices = () => [
  {
    id: 'dev-router-core',
    deviceName: 'Router-Core-01',
    ipAddress: '10.0.0.1',
    type: 'router',
    status: 'online',
    location: 'Core Datacenter',
    floor: 'Core',
    uptime: 99.8,
    traffic: 420,
    latency: 12,
    activeUsers: 28,
    enabled: true,
  },
  {
    id: 'dev-fw-main',
    deviceName: 'Firewall-Main',
    ipAddress: '10.0.0.2',
    type: 'firewall',
    status: 'online',
    location: 'DMZ',
    floor: 'Core',
    uptime: 99.9,
    traffic: 510,
    latency: 6,
    activeUsers: 0,
    enabled: true,
  },
  {
    id: 'dev-switch-f1',
    deviceName: 'Switch-Floor1',
    ipAddress: '10.0.1.10',
    type: 'switch',
    status: 'online',
    location: 'Floor 1 IDF',
    floor: 'Floor 1',
    uptime: 99.5,
    traffic: 310,
    latency: 8,
    activeUsers: 18,
    enabled: true,
  },
  {
    id: 'dev-ap-conf',
    deviceName: 'AP-ConferenceHall',
    ipAddress: '10.0.2.20',
    type: 'accessPoint',
    status: 'warning',
    location: 'Conference Hall',
    floor: 'Conference Hall',
    uptime: 97.2,
    traffic: 180,
    latency: 45,
    activeUsers: 22,
    enabled: true,
  },
  {
    id: 'dev-ap-f2',
    deviceName: 'AP-Floor2',
    ipAddress: '10.0.2.21',
    type: 'accessPoint',
    status: 'online',
    location: 'Floor 2 East',
    floor: 'Floor 2',
    uptime: 99.1,
    traffic: 240,
    latency: 15,
    activeUsers: 31,
    enabled: true,
  },
  {
    id: 'dev-sw-srv',
    deviceName: 'Switch-ServerRoom',
    ipAddress: '10.0.3.10',
    type: 'switch',
    status: 'online',
    location: 'Server Room',
    floor: 'Server Room',
    uptime: 99.7,
    traffic: 410,
    latency: 7,
    activeUsers: 0,
    enabled: true,
  },
];

let devices = seedDevices();

const getAll = () => devices.map((d) => ({ ...d }));

const getById = (id) => devices.find((d) => d.id === id);

const create = (payload) => {
  const id = `dev-${Date.now()}`;
  const device = {
    id,
    deviceName: payload.deviceName,
    ipAddress: payload.ipAddress,
    type: payload.type || 'switch',
    status: payload.status || 'online',
    location: payload.location || 'Unassigned',
    floor: payload.floor || 'Floor 1',
    uptime: payload.uptime ?? 99,
    traffic: payload.traffic ?? 100,
    latency: payload.latency ?? 10,
    activeUsers: payload.activeUsers ?? 0,
    enabled: payload.enabled !== false,
  };
  devices.push(device);
  return { ...device };
};

const update = (id, payload) => {
  const idx = devices.findIndex((d) => d.id === id);
  if (idx === -1) return null;
  devices[idx] = { ...devices[idx], ...payload, id };
  return { ...devices[idx] };
};

const remove = (id) => {
  const before = devices.length;
  devices = devices.filter((d) => d.id !== id);
  return devices.length < before;
};

const toggleEnabled = (id) => {
  const device = getById(id);
  if (!device) return null;
  device.enabled = !device.enabled;
  return { ...device };
};

/** Devices included in live simulation ticks */
const getSimulatedDevices = () => devices.filter((d) => d.enabled !== false);

const syncFromSimulator = (simDevices) => {
  simDevices.forEach((sim) => {
    const idx = devices.findIndex((d) => d.id === sim.id);
    if (idx >= 0) {
      devices[idx] = { ...devices[idx], ...sim };
    }
  });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  toggleEnabled,
  getSimulatedDevices,
  syncFromSimulator,
};
