import { io } from 'socket.io-client';
import { SOCKET_URL } from '../utils/constants';
import { SOCKET_EVENTS } from '../utils/socketEvents';

let socket = null;
const listeners = new Set();

const notifyStatus = (status, detail = null) => {
  listeners.forEach((fn) => fn(status, detail));
};

/**
 * Socket.IO client with reconnect and error handling.
 */
export const connectSocket = () => {
  if (socket?.connected) return socket;

  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 2000,
    });

    socket.on('connect', () => {
      notifyStatus('connected');
      socket.emit(SOCKET_EVENTS.SUBSCRIBE);
    });

    socket.on('disconnect', (reason) => {
      notifyStatus('disconnected', reason);
    });

    socket.io.on('reconnect', (attempt) => {
      notifyStatus('reconnected', attempt);
      socket.emit(SOCKET_EVENTS.SUBSCRIBE);
    });

    socket.io.on('reconnect_attempt', () => {
      notifyStatus('reconnecting');
    });

    socket.io.on('reconnect_failed', () => {
      notifyStatus('error', 'Reconnection failed');
    });

    socket.on('connect_error', (err) => {
      notifyStatus('error', err.message);
    });
  } else if (!socket.connected) {
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

export const onConnectionStatus = (callback) => {
  listeners.add(callback);
  return () => listeners.delete(callback);
};
