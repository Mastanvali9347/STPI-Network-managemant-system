/**
 * Socket.IO Configuration
 * Handles production Vercel deployment where backend may not be available
 */

const isDev = import.meta.env.MODE === 'development';
const envSocketUrl = import.meta.env.VITE_SOCKET_URL?.trim();
const envApiUrl = import.meta.env.VITE_API_URL?.trim();

/**
 * Resolve Socket.IO server URL
 * Priority:
 * 1. VITE_SOCKET_URL (explicit socket URL)
 * 2. VITE_API_URL (derive from API URL)
 * 3. localhost:5001 (development)
 * 4. null (production with no backend)
 */
const resolveSocketUrl = () => {
  if (envSocketUrl) {
    console.log('[Socket.IO] Using VITE_SOCKET_URL:', envSocketUrl);
    return envSocketUrl;
  }

  if (envApiUrl) {
    const socketUrl = envApiUrl.replace(/\/api\/?$/, '');
    console.log('[Socket.IO] Derived from VITE_API_URL:', socketUrl);
    return socketUrl;
  }

  if (isDev) {
    console.log('[Socket.IO] Using development default: http://localhost:5001');
    return 'http://localhost:5001';
  }

  console.warn('[Socket.IO] No backend URL configured. Socket.IO disabled.');
  return null;
};

export const SOCKET_URL = resolveSocketUrl();
export const SOCKET_AVAILABLE = SOCKET_URL !== null;

/**
 * Socket.IO Connection Options
 */
export const SOCKET_OPTIONS = {
  transports: ['websocket', 'polling'],
  autoConnect: SOCKET_AVAILABLE,
  reconnection: SOCKET_AVAILABLE,
  reconnectionAttempts: SOCKET_AVAILABLE ? 10 : 0,
  reconnectionDelay: 2000,
  reconnectionDelayMax: 5000,
  connectionTimeout: 5000,
};

/**
 * Fallback data when Socket.IO is unavailable
 */
export const FALLBACK_DATA = {
  networkStatus: {
    overall: 'degraded',
    uptimePercent: 0,
    internetSpeedMbps: 0,
    bandwidthUsagePercent: 0,
    packetsPerSecond: 0,
    avgLatencyMs: 0,
    timestamp: new Date().toISOString(),
  },
  devices: [],
  wifi: [],
  alerts: [],
  analytics: null,
  summary: null,
  users: [],
  topology: null,
  wifiClients: [],
  wifiEvents: [],
  floorStats: [],
  wifiAnalytics: null,
};

/**
 * Log initialization info
 */
if (SOCKET_AVAILABLE) {
  console.log('[Socket.IO] Initialization:');
  console.log('  URL:', SOCKET_URL);
  console.log('  Transports:', SOCKET_OPTIONS.transports);
  console.log('  Reconnection:', SOCKET_OPTIONS.reconnection);
} else {
  console.warn('[Socket.IO] Socket.IO is DISABLED - no backend available');
  console.warn('  To enable Socket.IO, set:');
  console.warn('  - VITE_SOCKET_URL, or');
  console.warn('  - VITE_API_URL');
  console.warn('  Application will use API fallback instead.');
}
