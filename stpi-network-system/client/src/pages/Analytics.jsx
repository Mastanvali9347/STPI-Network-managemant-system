import { useEffect, useState } from 'react';
import {
  Server,
  Wifi,
  Users,
  Gauge,
  Bell,
  Zap,
  Activity,
  Radio,
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { ConnectionStatus } from '../components/monitoring/ConnectionStatus';
import { ChartSkeleton } from '../components/monitoring/Skeleton';
import { AnimatedStatCard } from '../components/analytics/AnimatedStatCard';
import { ChartRangeFilter } from '../components/analytics/ChartRangeFilter';
import {
  BandwidthLineChart,
  TrafficAreaChart,
  FloorUsersBarChart,
  DeviceCategoryPieChart,
  HealthRadarChart,
} from '../components/analytics/AdvancedCharts';
import { HeatmapGrid } from '../components/analytics/HeatmapGrid';
import { AIInsightsPanel } from '../components/insights/AIInsightsPanel';
import { enterpriseApi } from '../api/enterpriseApi';
import { useRealtime } from '../hooks/useRealtime';

export const AnalyticsPage = () => {
  const { connectionStatus, isLive } = useRealtime();
  const [range, setRange] = useState('24h');
  const [data, setData] = useState(null);
  const [insights, setInsights] = useState({ insights: [], recommendations: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    Promise.all([
      enterpriseApi.getExtendedAnalytics(range),
      enterpriseApi.getInsights(),
    ])
      .then(([analyticsRes, insightsRes]) => {
        if (active) {
          setData(analyticsRes.data);
          setInsights(insightsRes.data);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [range]);

  const k = data?.kpis || {};

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Advanced Analytics</h1>
          <p className="text-sm text-slate-400">Enterprise metrics · simulated historical data</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <ChartRangeFilter value={range} onChange={setRange} />
          <ConnectionStatus status={connectionStatus} isLive={isLive} />
        </div>
      </div>

      {loading ? (
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-20 rounded-xl bg-slate-800/60 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          <AnimatedStatCard label="Total Devices" value={k.totalDevices} icon={Server} live={isLive} />
          <AnimatedStatCard label="Online" value={k.onlineDevices} accent="emerald" icon={Activity} live={isLive} />
          <AnimatedStatCard label="Offline" value={k.offlineDevices} accent="rose" icon={Server} live={isLive} />
          <AnimatedStatCard label="WiFi Networks" value={k.activeWifiNetworks} icon={Wifi} live={isLive} />
          <AnimatedStatCard label="Connected Users" value={k.connectedUsers} icon={Users} live={isLive} />
          <AnimatedStatCard label="Bandwidth" value={k.bandwidthUsagePercent} suffix="%" icon={Gauge} accent="amber" live={isLive} />
          <AnimatedStatCard label="Internet" value={k.internetSpeedMbps} suffix=" Mbps" icon={Zap} live={isLive} />
          <AnimatedStatCard label="Alerts" value={k.alertCount} accent="rose" icon={Bell} live={isLive} />
          <AnimatedStatCard label="Packet Traffic" value={k.packetTraffic} icon={Radio} accent="violet" live={isLive} />
          <AnimatedStatCard label="Health" value={k.deviceHealthPercent} suffix="%" accent="emerald" live={isLive} />
        </div>
      )}

      <Card title="AI insights" className="bg-white/5! border-white/10!">
        <AIInsightsPanel
          insights={insights.insights}
          recommendations={insights.recommendations}
          loading={loading}
        />
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Bandwidth (line)" subtitle={`Range: ${range}`} className="bg-white/5! border-white/10!">
          {loading ? <ChartSkeleton /> : <BandwidthLineChart data={data?.bandwidth} />}
        </Card>
        <Card title="Traffic analysis (area)" className="bg-white/5! border-white/10!">
          {loading ? <ChartSkeleton /> : <TrafficAreaChart data={data?.traffic} />}
        </Card>
        <Card title="Floor-wise users (bar)" className="bg-white/5! border-white/10!">
          {loading ? <ChartSkeleton /> : <FloorUsersBarChart data={data?.floorUsers} />}
        </Card>
        <Card title="Device categories (pie)" className="bg-white/5! border-white/10!">
          {loading ? <ChartSkeleton /> : <DeviceCategoryPieChart data={data?.deviceCategories} />}
        </Card>
        <Card title="Network health (radar)" className="bg-white/5! border-white/10!">
          {loading ? <ChartSkeleton /> : <HealthRadarChart data={data?.networkHealthRadar} />}
        </Card>
        <Card title="Utilization heatmap" className="bg-white/5! border-white/10!">
          {loading ? <ChartSkeleton /> : <HeatmapGrid data={data?.heatmap} />}
        </Card>
      </div>
    </div>
  );
};
