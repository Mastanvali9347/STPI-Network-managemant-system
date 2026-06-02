import { useEffect, useState } from 'react';
import { Wifi } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { ConnectionStatus } from '../components/monitoring/ConnectionStatus';
import { WifiTable } from '../components/monitoring/WifiTable';
import { WifiLiveEvents } from '../components/wifi/WifiLiveEvents';
import { useRealtime } from '../hooks/useRealtime';
import { wifiApi } from '../api/wifiApi';

export const WifiPage = () => {
  const { wifiEvents, connectionStatus, isLive } = useRealtime();
  const [networks, setNetworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);

    wifiApi
      .getNetworks()
      .then((res) => {
        if (!active) return;
        setNetworks(res.data.networks || res.data);
      })
      .catch(() => {
        if (active) setError('Failed to load WiFi networks.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-linear-to-r from-slate-900 via-slate-900 to-cyan-950/30 p-6 backdrop-blur-xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">WiFi Management</h1>
            <p className="text-sm text-slate-400 mt-1">
              View active SSIDs, live events, and simulated client activity.
            </p>
          </div>
          <ConnectionStatus status={connectionStatus} isLive={isLive} />
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-100">
          {error}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <Card title="WiFi networks" subtitle="Active wireless SSIDs">
          {loading ? (
            <div className="space-y-4">
              {[...Array(4)].map((_, idx) => (
                <div key={idx} className="h-24 rounded-xl bg-slate-800/60 animate-pulse" />
              ))}
            </div>
          ) : (
            <WifiTable networks={networks} />
          )}
        </Card>

        <Card title="Live WiFi events" subtitle="Join/disconnect activity">
          <WifiLiveEvents events={wifiEvents || []} />
        </Card>
      </div>
    </div>
  );
};