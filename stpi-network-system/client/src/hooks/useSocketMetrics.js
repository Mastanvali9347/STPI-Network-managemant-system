import { useEffect, useState } from 'react';
import { connectSocket } from '../services/socketService';

export const useSocketMetrics = () => {
  const [metrics, setMetrics] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = connectSocket();

    const onConnect = () => setConnected(true);
    const onDisconnect = () => setConnected(false);
    const onMetrics = (data) => setMetrics(data);

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('network:metrics', onMetrics);

    socket.emit('alerts:subscribe');

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('network:metrics', onMetrics);
    };
  }, []);

  return { metrics, connected };
};
