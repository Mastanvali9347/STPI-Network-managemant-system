import { useEffect, useState } from 'react';
import { connectSocket, isSocketAvailable } from '../services/socketService';

/**
 * Hook for metrics from Socket.IO server
 * Gracefully handles unavailable backend
 */
export const useSocketMetrics = () => {
  const [metrics, setMetrics] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // If socket is not available, don't try to connect
    if (!isSocketAvailable()) {
      console.log('[Metrics] Socket.IO unavailable');
      setConnected(false);
      return;
    }

    const socket = connectSocket();

    // Handle case where socket failed to initialize
    if (!socket) {
      console.warn('[Metrics] Socket connection returned null');
      setConnected(false);
      return;
    }

    const onConnect = () => {
      console.log('[Metrics] Connected');
      setConnected(true);
    };
    
    const onDisconnect = () => {
      console.log('[Metrics] Disconnected');
      setConnected(false);
    };
    
    const onMetrics = (data) => {
      setMetrics(data);
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('network:metrics', onMetrics);

    try {
      socket.emit('alerts:subscribe');
    } catch (err) {
      console.warn('[Metrics] Failed to emit alerts:subscribe', err);
    }

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('network:metrics', onMetrics);
    };
  }, []);

  return { metrics, connected, socketAvailable: isSocketAvailable() };
};
