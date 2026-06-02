import { useEffect, useState } from 'react';
import { networkApi } from '../api/networkApi';

export const useNetworkData = (fetcher, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetcher()
      .then((res) => {
        if (active) setData(res.data);
      })
      .catch((err) => {
        if (active) setError(err.message || 'Failed to load data');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, deps);

  return { data, loading, error };
};

export const useDashboard = () => useNetworkData(networkApi.getDashboard);
export const useTopology = () => useNetworkData(networkApi.getTopology);
export const useWifi = () => useNetworkData(networkApi.getWifi);
export const useConnectedUsers = () => useNetworkData(networkApi.getUsers);
export const useAlerts = () => useNetworkData(networkApi.getAlerts);
export const useAnalytics = () => useNetworkData(networkApi.getAnalytics);
