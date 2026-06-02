import { useEffect, useState, useRef } from 'react';
import { useRealtime } from '../../hooks/useRealtime';
import { defaultTopologyPayload } from '../topologyData';
import { networkApi } from '../../api/networkApi';
import { topologySignature } from '../../utils/topologyCompare';

/**
 * Topology data from RealtimeProvider (socket) with REST bootstrap on first load.
 */
export const useTopologyRealtime = () => {
  const { topology: liveTopology, isLive } = useRealtime();
  const [topology, setTopology] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const lastSigRef = useRef('');

  // REST bootstrap when socket has not sent topology yet
  useEffect(() => {
    let active = true;
    networkApi
      .getTopology()
      .then((res) => {
        if (!active || !res.data?.nodes?.length) return;
        const sig = topologySignature(res.data);
        if (sig !== lastSigRef.current) {
          lastSigRef.current = sig;
          setTopology(res.data);
        }
      })
      .catch(() => {
        if (active) {
          setTopology(defaultTopologyPayload);
          setError('Using offline topology preview');
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  // Apply live socket topology only when values actually change
  useEffect(() => {
    if (!liveTopology?.nodes?.length) return;
    const sig = topologySignature(liveTopology);
    if (sig === lastSigRef.current) return;
    lastSigRef.current = sig;
    setTopology(liveTopology);
    setLoading(false);
  }, [liveTopology]);

  return { topology, loading, error, isLive };
};
