import { useMemo } from 'react';
import { useRealtime } from './useRealtime';

/** Client-side search across live monitoring data */
export const useGlobalSearch = (query = '') => {
  const { devices, wifi, alerts } = useRealtime();
  const q = query.toLowerCase().trim();

  return useMemo(() => {
    if (!q) return { devices: [], wifi: [], alerts: [], total: 0 };

    const deviceHits = (devices || []).filter(
      (d) =>
        d.deviceName?.toLowerCase().includes(q) ||
        d.ipAddress?.toLowerCase().includes(q) ||
        d.location?.toLowerCase().includes(q) ||
        d.floor?.toLowerCase().includes(q)
    );

    const wifiHits = (wifi || []).filter((w) => w.wifiName?.toLowerCase().includes(q));

    const alertHits = (alerts || []).filter(
      (a) =>
        a.title?.toLowerCase().includes(q) ||
        a.message?.toLowerCase().includes(q) ||
        a.source?.toLowerCase().includes(q)
    );

    return {
      devices: deviceHits,
      wifi: wifiHits,
      alerts: alertHits,
      total: deviceHits.length + wifiHits.length + alertHits.length,
    };
  }, [q, devices, wifi, alerts]);
};
