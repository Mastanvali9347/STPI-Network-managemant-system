/** Socket.IO event names — must match server/sockets/index.js */
export const SOCKET_EVENTS = {
  NETWORK_STATUS: 'network-status',
  DEVICE_UPDATE: 'device-update',
  WIFI_UPDATE: 'wifi-update',
  ALERT_UPDATE: 'alert-update',
  ANALYTICS_UPDATE: 'analytics-update',
  USERS_UPDATE: 'users-update',
  TOPOLOGY_UPDATE: 'topology-update',
  /** Single batched payload — preferred over individual events */
  MONITORING_SNAPSHOT: 'monitoring-snapshot',
  SUBSCRIBE: 'monitoring:subscribe',
};
