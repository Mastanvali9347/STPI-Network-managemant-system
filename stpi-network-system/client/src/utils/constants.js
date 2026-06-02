export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5001';

export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  ANALYTICS: '/analytics',
  TOPOLOGY: '/topology',
  DEVICES: '/devices',
  WIFI: '/wifi',
  USERS: '/users',
  ALERTS: '/alerts',
  REPORTS: '/reports',
  SETTINGS: '/settings',
};
