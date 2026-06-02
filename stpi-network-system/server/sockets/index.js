const networkSimulator = require('../services/networkSimulator');
const wifiManagement = require('../services/wifiManagementService');

const MONITORING_ROOM = 'monitoring';
const EMIT_INTERVAL_MS = 3000;

let broadcastInterval = null;

/**
 * Modular Socket.IO setup — connection logs + interval-based live emits.
 */
const initSockets = (io) => {
  io.on('connection', (socket) => {
    console.log(`[Socket.IO] Client connected: ${socket.id}`);

    socket.join(MONITORING_ROOM);

    emitFullSnapshot(socket, networkSimulator.getSnapshot()).catch((err) =>
      console.error('[Socket.IO] Initial snapshot failed:', err.message)
    );

    socket.on('monitoring:subscribe', () => {
      socket.join(MONITORING_ROOM);
      emitFullSnapshot(socket, networkSimulator.getSnapshot()).catch(() => {});
    });

    socket.on('disconnect', (reason) => {
      console.log(`[Socket.IO] Client disconnected: ${socket.id} (${reason})`);
    });

    socket.on('error', (err) => {
      console.error(`[Socket.IO] Socket error ${socket.id}:`, err.message);
    });
  });

  // Global broadcast every 3 seconds to all monitoring clients
  if (broadcastInterval) clearInterval(broadcastInterval);

  broadcastInterval = setInterval(async () => {
    try {
      await wifiManagement.tick();
    } catch (err) {
      console.error('[WiFi] tick error:', err.message);
    }
    const snapshot = networkSimulator.tick();

    io.to(MONITORING_ROOM).emit('monitoring-snapshot', {
      networkStatus: snapshot.networkStatus,
      devices: snapshot.devices,
      wifi: snapshot.wifi,
      wifiClients: snapshot.wifiClients,
      wifiEvents: snapshot.wifiEvents,
      floorStats: snapshot.floorStats,
      wifiAnalytics: snapshot.wifiAnalytics,
      analytics: snapshot.analytics,
      users: snapshot.users,
      topology: snapshot.topology,
      alerts: snapshot.alerts,
      summary: snapshot.summary,
      newAlert: snapshot.newAlert || null,
    });
  }, EMIT_INTERVAL_MS);

  console.log(`[Socket.IO] Live monitoring broadcasts every ${EMIT_INTERVAL_MS / 1000}s`);
};

/** Push all channels to a single socket (initial load). */
const emitFullSnapshot = async (socket, snapshot) => {
  try {
    await wifiManagement.tick();
    snapshot = networkSimulator.getSnapshot();
  } catch {
    /* use provided snapshot */
  }
  socket.emit('monitoring-snapshot', {
    networkStatus: snapshot.networkStatus,
    devices: snapshot.devices,
    wifi: snapshot.wifi,
    wifiClients: snapshot.wifiClients,
    wifiEvents: snapshot.wifiEvents,
    floorStats: snapshot.floorStats,
    wifiAnalytics: snapshot.wifiAnalytics,
    analytics: snapshot.analytics,
    users: snapshot.users,
    topology: snapshot.topology,
    alerts: snapshot.alerts,
    summary: snapshot.summary,
    newAlert: null,
  });
};

module.exports = { initSockets, MONITORING_ROOM, EMIT_INTERVAL_MS };
