import { io } from 'socket.io-client';
import { SOCKET_URL, SOCKET_AVAILABLE, SOCKET_OPTIONS } from '../config/socket';
import { SOCKET_EVENTS } from '../utils/socketEvents';

let socket = null;
const listeners = new Set();
let isAvailable = SOCKET_AVAILABLE;

const notifyStatus = (status, detail = null) => {
  listeners.forEach((fn) => fn(status, detail));
};

/**
 * Gracefully handle Socket.IO unavailability
 * When no backend is available, all functions return null/no-op
 */
export const connectSocket = () => {
  // If backend is not available, return null (don't crash)
  if (!isAvailable) {
    notifyStatus('unavailable', 'Backend Socket.IO server not configured');
    return null;
  }

  if (socket?.connected) return socket;

  if (!socket) {
    try {
      socket = io(SOCKET_URL, SOCKET_OPTIONS);

      socket.on('connect', () => {
        console.log('[Socket.IO] Connected');
        notifyStatus('connected');
        socket.emit(SOCKET_EVENTS.SUBSCRIBE);
      });

      socket.on('disconnect', (reason) => {
        console.log('[Socket.IO] Disconnected:', reason);
        notifyStatus('disconnected', reason);
      });

      socket.io.on('reconnect', (attempt) => {
        console.log('[Socket.IO] Reconnected after', attempt, 'attempt(s)');
        notifyStatus('reconnected', attempt);
        socket?.emit(SOCKET_EVENTS.SUBSCRIBE);
      });

      socket.io.on('reconnect_attempt', (attempt) => {
        console.log('[Socket.IO] Reconnection attempt', attempt);
        notifyStatus('reconnecting');
      });

      socket.io.on('reconnect_failed', () => {
        console.warn('[Socket.IO] Reconnection failed');
        notifyStatus('error', 'Reconnection failed');
      });

      socket.on('connect_error', (err) => {
        console.error('[Socket.IO] Connection error:', err.message);
        notifyStatus('error', err.message);
      });

      socket.on('error', (err) => {
        console.error('[Socket.IO] Error:', err);
        notifyStatus('error', err);
      });
    } catch (err) {
      console.error('[Socket.IO] Failed to initialize:', err.message);
      isAvailable = false;
      socket = null;
      notifyStatus('unavailable', err.message);
      return null;
    }
  } else if (!socket.connected && isAvailable) {
    socket.connect();
  }

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    notifyStatus('disconnected');
  }
};

export const getSocket = () => socket;

/**
 * Check if Socket.IO is available
 */
export const isSocketAvailable = () => isAvailable;

/**
 * Listen to connection status changes
 */
export const onConnectionStatus = (callback) => {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

