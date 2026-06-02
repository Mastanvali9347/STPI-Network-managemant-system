import { useEffect, useState } from 'react';
import {
  Server,
  Wifi,
  Users,
  Gauge,
  Bell,
  Zap,
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { StatCard } from '../components/monitoring/StatCard';
import { ConnectionStatus } from '../components/monitoring/ConnectionStatus';
import { DeviceTable } from '../components/monitoring/DeviceTable';
import {
  BandwidthChart,
  UsersChart,
  TrafficChart,
  DeviceHealthChart,
} from '../components/monitoring/NetworkChart';
import { StatCardSkeleton, ChartSkeleton } from '../components/monitoring/Skeleton';
import { useRealtime } from '../hooks/useRealtime';
import { formatNumber } from '../utils/formatters';
import { AIInsightsPanel } from '../components/insights/AIInsightsPanel';
import { enterpriseApi } from '../api/enterpriseApi';

export const DashboardPage = () => {
  const {
    summary,
    networkStatus,
    devices,
    analytics,
    alerts,
    connectionStatus,
    isLive,
  } = useRealtime();

  const [insights, setInsights] = useState({ insights: [], recommendations: [] });

  useEffect(() => {
    enterpriseApi.getInsights().then((res) => setInsights(res.data)).catch(() => {});
  }, []);

  const loading = !summary && !analytics;

  const openAlerts =
    alerts?.filter((a) => !a.acknowledged && a.severity !== 'info').length ?? 0;

  const offlineCount = (devices || []).filter((d) => d.status === 'offline').length;

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-linear-to-r from-slate-900 via-slate-900 to-cyan-950/30 p-6 backdrop-blur-xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Network Command Center
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Simulated enterprise monitoring · updates every 3s
            </p>
          </div>
          <ConnectionStatus status={connectionStatus} isLive={isLive} />
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
          <StatCard
            label="Total Devices"
            value={summary?.totalDevices ?? 0}
            icon={Server}
            accent="cyan"
            live={isLive}
          />
          <StatCard
            label="Online Devices"
            value={summary?.onlineDevices ?? 0}
            icon={Server}
            accent="emerald"
            live={isLive}
          />
          <StatCard
            label="Offline Devices"
            value={offlineCount}
            icon={Server}
            accent="rose"
            live={isLive}
          />
          <StatCard
            label="Active WiFi"
            value={summary?.activeWifiNetworks ?? 0}
            icon={Wifi}
            accent="blue"
            live={isLive}
          />
          <StatCard
            label="Connected Users"
            value={formatNumber(summary?.connectedUsers ?? 0)}
            icon={Users}
            accent="cyan"
            live={isLive}
          />
          <StatCard
            label="Internet Speed"
            value={`${Math.round(networkStatus?.internetSpeedMbps ?? 0)} Mbps`}
            icon={Zap}
            accent="amber"
            trend="Simulated WAN"
            live={isLive}
          />
          <StatCard
            label="Alerts"
            value={openAlerts || summary?.openAlerts || 0}
            icon={Bell}
            accent="rose"
            live={isLive}
          />
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
          <p className="text-xs text-slate-500">Network load</p>
          <p className="text-lg font-bold text-cyan-400 flex items-center gap-2">
            <Gauge className="h-4 w-4" />
            {networkStatus?.bandwidthUsagePercent ?? '—'}%
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
          <p className="text-xs text-slate-500">Avg latency</p>
          <p className="text-lg font-bold text-white">
            {networkStatus?.avgLatencyMs ?? '—'} ms
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
          <p className="text-xs text-slate-500">Uptime</p>
          <p className="text-lg font-bold text-emerald-400">
            {networkStatus?.uptimePercent ?? '—'}%
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
          <p className="text-xs text-slate-500">Overall status</p>
          <p className="text-lg font-bold capitalize text-amber-400">
            {networkStatus?.overall ?? '—'}
          </p>
        </div>
      </div>

      <Card title="Network insights" subtitle="AI-style recommendations (simulated)" className="bg-white/5! border-white/10!">
        <AIInsightsPanel
          insights={insights.insights}
          recommendations={insights.recommendations}
          loading={loading}
        />
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Bandwidth usage" subtitle="Live Mbps (simulated)" className="bg-white/5! border-white/10!">
          {loading ? (
            <ChartSkeleton />
          ) : (
            <BandwidthChart data={analytics?.bandwidth} />
          )}
        </Card>
        <Card title="Connected users" subtitle="Live session count" className="bg-white/5! border-white/10!">
          {loading ? (
            <ChartSkeleton />
          ) : (
            <UsersChart data={analytics?.connectedUsers} />
          )}
        </Card>
        <Card title="Traffic monitoring" subtitle="Segment throughput" className="bg-white/5! border-white/10!">
          {loading ? (
            <ChartSkeleton />
          ) : (
            <TrafficChart data={analytics?.traffic} />
          )}
        </Card>
        <Card title="Device health" subtitle="Online vs offline" className="bg-white/5! border-white/10!">
          {loading ? (
            <ChartSkeleton />
          ) : (
            <DeviceHealthChart data={analytics?.deviceHealth} />
          )}
        </Card>
      </div>

      <Card
        title="Infrastructure devices"
        subtitle="Live device-update stream"
        className="bg-white/5! border-white/10!"
      >
        {devices?.length ? (
          <DeviceTable devices={devices} />
        ) : (
          <ChartSkeleton />
        )}
      </Card>
    </div>
  );
};
