import { useEffect, useState, useRef } from 'react';
import { connectSocket, onConnectionStatus, isSocketAvailable } from '../services/socketService';
import { SOCKET_EVENTS } from '../utils/socketEvents';
import { scheduleFrame } from '../utils/scheduleFrame';

const initialState = {
  networkStatus: null,
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
 * Subscribes to batched monitoring-snapshot Socket.IO events (one per tick).
 * Falls back to unavailable state if backend is not configured.
 */
export const useRealtimeMonitoring = () => {
  const [data, setData] = useState(initialState);
  const [connectionStatus, setConnectionStatus] = useState(
    isSocketAvailable() ? 'connecting' : 'unavailable'
  );
  const pendingRef = useRef(null);

  useEffect(() => {
    // If Socket.IO is not available, stay in unavailable state
    if (!isSocketAvailable()) {
      console.log('[Realtime] Socket.IO unavailable - using fallback mode');
      setConnectionStatus('unavailable');
      return;
    }

    const unsubStatus = onConnectionStatus((status) => {
      console.log('[Realtime] Connection status changed:', status);
      setConnectionStatus(status);
    });

    const socket = connectSocket();

    // Handle case where socket failed to initialize
    if (!socket) {
      console.warn('[Realtime] Socket connection returned null');
      setConnectionStatus('unavailable');
      return unsubStatus;
    }

    const flushSnapshot = () => {
      const snapshot = pendingRef.current;
      pendingRef.current = null;
      if (!snapshot) return;

      setData((prev) => ({
        networkStatus: snapshot.networkStatus ?? prev.networkStatus,
        devices: snapshot.devices ?? prev.devices,
        wifi: snapshot.wifi ?? prev.wifi,
        alerts: snapshot.alerts ?? prev.alerts,
        analytics: snapshot.analytics ?? prev.analytics,
        users: snapshot.users ?? prev.users,
        topology: snapshot.topology ?? prev.topology,
        wifiClients: snapshot.wifiClients ?? prev.wifiClients,
        wifiEvents: snapshot.wifiEvents ?? prev.wifiEvents,
        floorStats: snapshot.floorStats ?? prev.floorStats,
        wifiAnalytics: snapshot.wifiAnalytics ?? prev.wifiAnalytics,
        summary: snapshot.summary ?? snapshot.analytics?.summary ?? prev.summary,
      }));
    };

    const onSnapshot = (snapshot) => {
      pendingRef.current = snapshot;
      scheduleFrame(flushSnapshot);
    };

    socket.on(SOCKET_EVENTS.MONITORING_SNAPSHOT, onSnapshot);

    if (socket.connected) {
      socket.emit(SOCKET_EVENTS.SUBSCRIBE);
      setConnectionStatus('connected');
    }

    return () => {
      unsubStatus();
      socket.off(SOCKET_EVENTS.MONITORING_SNAPSHOT, onSnapshot);
    };
  }, []);

  const isLive = connectionStatus === 'connected' || connectionStatus === 'reconnected';

  return {
    ...data,
    connectionStatus,
    isLive,
    isSocketAvailable: isSocketAvailable(),
  };
};
